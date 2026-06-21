/**
 * WebSocket + HTTP Polling Relay Server for Conveyor Clash
 *
 * Dual-transport relay: both WebSocket and HTTP long-polling.
 * This ensures connectivity through ANY proxy/tunnel, including
 * localtunnel, ngrok, and corporate firewalls that block WebSocket.
 *
 * Priority: WebSocket first (low latency), HTTP polling fallback (works everywhere)
 *
 * Deployment-ready:
 * - Uses PORT environment variable (required by Amvera/Render/Railway)
 * - HTTP health check at GET / and GET /health
 * - WebSocket at path / and /ws
 * - HTTP polling at POST /poll/open, POST /poll/send, GET /poll/recv, POST /poll/close
 * - Full CORS support for cross-origin requests from GitHub Pages
 */

import { createServer, IncomingMessage, ServerResponse } from "http";
import { WebSocketServer, WebSocket } from "ws";

const PORT = parseInt(process.env.PORT || "3042");

// ============ Types ============

interface Peer {
  type: "ws" | "poll";
  ws?: WebSocket;
  sessionId?: string;
  messageQueue: any[];
  waitingRes?: ServerResponse | null;
  waitingTimer?: NodeJS.Timeout | null;
  lastActive: number; // timestamp of last activity
}

interface Room {
  host: Peer;
  guest: Peer | null;
  code: string;
  createdAt: number;
}

// ============ State ============

const rooms = new Map<string, Room>();
const wsToPeer = new Map<WebSocket, Peer>();
const sessions = new Map<string, Peer>();

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateSessionId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// ============ Peer helpers ============

function peerSend(peer: Peer, msg: any): void {
  peer.lastActive = Date.now();

  if (peer.type === "ws" && peer.ws && peer.ws.readyState === WebSocket.OPEN) {
    try {
      peer.ws.send(JSON.stringify(msg));
    } catch (e) {
      console.error("[relay] Error sending WS message:", e);
    }
  } else if (peer.type === "poll") {
    peer.messageQueue.push(msg);
    // If a long-poll is waiting, respond immediately
    if (peer.waitingRes) {
      const res = peer.waitingRes;
      peer.waitingRes = null;
      if (peer.waitingTimer) {
        clearTimeout(peer.waitingTimer);
        peer.waitingTimer = null;
      }
      sendPollResponse(res, peer.messageQueue);
      peer.messageQueue = [];
    }
  }
}

function sendPollResponse(res: ServerResponse, messages: any[]): void {
  try {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store",
    });
    res.end(JSON.stringify({ messages }));
  } catch (e) {
    // Response might have been closed already
  }
}

function findRoomByPeer(peer: Peer): { room: Room; role: "host" | "guest" } | null {
  for (const [, room] of rooms) {
    if (room.host === peer) return { room, role: "host" };
    if (room.guest === peer) return { room, role: "guest" };
  }
  return null;
}

function cleanupRoom(code: string): void {
  const room = rooms.get(code);
  if (!room) return;

  console.log(`[relay] Cleaning up room: ${code}`);

  // Notify peers
  const disconnectMsg = { action: "peer_disconnected" };
  peerSend(room.host, disconnectMsg);
  if (room.guest) peerSend(room.guest, disconnectMsg);

  // Clean up sessions
  if (room.host.type === "poll" && room.host.sessionId) {
    sessions.delete(room.host.sessionId);
  }
  if (room.guest && room.guest.type === "poll" && room.guest.sessionId) {
    sessions.delete(room.guest.sessionId);
  }

  // Cancel any pending long-polls
  if (room.host.waitingRes) {
    try { room.host.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
    if (room.host.waitingTimer) clearTimeout(room.host.waitingTimer);
  }
  if (room.guest && room.guest.waitingRes) {
    try { room.guest.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
    if (room.guest.waitingTimer) clearTimeout(room.guest.waitingTimer);
  }

  rooms.delete(code);
}

function removePeerFromRoom(peer: Peer): void {
  const info = findRoomByPeer(peer);
  if (!info) return;
  cleanupRoom(info.room.code);
}

// ============ Message handling (shared for WS and polling) ============

function handleMessage(peer: Peer, msg: any): void {
  peer.lastActive = Date.now();

  switch (msg.action) {
    case "create": {
      removePeerFromRoom(peer);

      let code = generateCode();
      while (rooms.has(code)) {
        code = generateCode();
      }

      const room: Room = {
        host: peer,
        guest: null,
        code,
        createdAt: Date.now(),
      };
      rooms.set(code, room);

      peerSend(peer, { action: "created", roomId: code });
      console.log(`[relay] Room created: ${code} (${peer.type})`);
      break;
    }

    case "join": {
      const code = msg.roomId?.toString().toUpperCase().trim();
      if (!code) {
        peerSend(peer, { action: "error", message: "No room ID provided" });
        return;
      }

      const room = rooms.get(code);
      if (!room) {
        peerSend(peer, { action: "error", message: "Room not found" });
        return;
      }

      if (room.guest) {
        peerSend(peer, { action: "error", message: "Room is full (2 players max)" });
        return;
      }

      removePeerFromRoom(peer);

      room.guest = peer;

      // Notify both
      peerSend(peer, { action: "joined", roomId: code });
      peerSend(room.host, { action: "peer_connected" });

      console.log(`[relay] Guest joined room: ${code} (${peer.type})`);
      break;
    }

    case "data": {
      const info = findRoomByPeer(peer);
      if (!info) {
        peerSend(peer, { action: "error", message: "Not in a room" });
        return;
      }

      const target = info.role === "host" ? info.room.guest : info.room.host;
      if (target) {
        peerSend(target, { action: "data", payload: msg.payload });
      }
      break;
    }

    case "ping": {
      peerSend(peer, { action: "pong" });
      break;
    }

    case "_open":
      // No-op: used by HTTP polling client to establish session without action
      break;

    default:
      // Silently ignore unknown actions (don't error on stale client messages)
      break;
  }
}

// ============ HTTP Server ============

function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); }
      catch { resolve({}); }
    });
    req.on("error", reject);
  });
}

function corsHeaders(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400"); // 24h cache preflight
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  corsHeaders(res);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://0.0.0.0:${PORT}`);

  // Health check endpoints
  if (url.pathname === "/" || url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        service: "conveyor-clash-relay",
        rooms: rooms.size,
        wsConnections: wss.clients.size,
        pollSessions: sessions.size,
        uptime: Math.floor(process.uptime()),
        transports: ["websocket", "polling"],
      })
    );
    return;
  }

  // ============ HTTP Polling Endpoints ============

  // POST /poll/open — Create a polling session
  if (url.pathname === "/poll/open" && req.method === "POST") {
    const msg = await parseBody(req);
    const sessionId = generateSessionId();

    const peer: Peer = {
      type: "poll",
      sessionId,
      messageQueue: [],
      waitingRes: null,
      waitingTimer: null,
      lastActive: Date.now(),
    };

    sessions.set(sessionId, peer);

    // Handle the action (create/join)
    handleMessage(peer, msg);

    // Return session ID + any queued messages (like "created" response)
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store",
    });
    res.end(
      JSON.stringify({
        sessionId,
        messages: peer.messageQueue.splice(0),
      })
    );
    return;
  }

  // POST /poll/send — Send a message
  if (url.pathname === "/poll/send" && req.method === "POST") {
    const body = await parseBody(req);
    const sessionId = body.sessionId;
    const peer = sessions.get(sessionId);

    if (!peer) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid session" }));
      return;
    }

    // Process the message
    handleMessage(peer, body);

    // Return any messages that were queued as a result (e.g., error responses)
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store",
    });
    res.end(JSON.stringify({ messages: peer.messageQueue.splice(0) }));
    return;
  }

  // GET /poll/recv — Long-poll for messages (25s timeout)
  if (url.pathname === "/poll/recv" && req.method === "GET") {
    const sessionId = url.searchParams.get("sessionId");
    const peer = sessions.get(sessionId || "");

    if (!peer) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid session" }));
      return;
    }

    peer.lastActive = Date.now();

    // If there are already queued messages, respond immediately
    if (peer.messageQueue.length > 0) {
      sendPollResponse(res, peer.messageQueue.splice(0));
      return;
    }

    // Otherwise, hold the connection open (long-poll)
    peer.waitingRes = res;

    // Set timeout (25 seconds)
    peer.waitingTimer = setTimeout(() => {
      if (peer.waitingRes === res) {
        peer.waitingRes = null;
        peer.waitingTimer = null;
        sendPollResponse(res, []);
      }
    }, 25000);

    // Clean up on client disconnect
    req.on("close", () => {
      if (peer.waitingRes === res) {
        peer.waitingRes = null;
        if (peer.waitingTimer) {
          clearTimeout(peer.waitingTimer);
          peer.waitingTimer = null;
        }
      }
    });
    return;
  }

  // POST /poll/close — Close a polling session
  if (url.pathname === "/poll/close" && req.method === "POST") {
    const body = await parseBody(req);
    const sessionId = body.sessionId;
    const peer = sessions.get(sessionId);

    if (peer) {
      removePeerFromRoom(peer);
      sessions.delete(sessionId);
      // Cancel any pending long-poll
      if (peer.waitingRes) {
        try { peer.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
        if (peer.waitingTimer) clearTimeout(peer.waitingTimer);
      }
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // 404 for everything else
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

// ============ WebSocket Server ============

const wss = new WebSocketServer({ server, path: "/" });

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  console.log(`[relay] WS client connected from ${clientIp} (total: ${wss.clients.size})`);

  const peer: Peer = {
    type: "ws",
    ws,
    messageQueue: [],
    waitingRes: null,
    lastActive: Date.now(),
  };
  wsToPeer.set(ws, peer);

  // Set a ping interval to detect dead connections
  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    } else {
      clearInterval(pingInterval);
    }
  }, 30000);

  ws.on("message", (raw: Buffer) => {
    let msg: any;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      peerSend(peer, { action: "error", message: "Invalid JSON" });
      return;
    }
    handleMessage(peer, msg);
  });

  ws.on("close", () => {
    console.log(`[relay] WS client disconnected`);
    clearInterval(pingInterval);
    removePeerFromRoom(peer);
    wsToPeer.delete(ws);
  });

  ws.on("error", (err: Error) => {
    console.error(`[relay] WS client error:`, err.message);
    clearInterval(pingInterval);
    removePeerFromRoom(peer);
    wsToPeer.delete(ws);
  });

  ws.on("pong", () => {
    peer.lastActive = Date.now();
  });
});

// ============ Cleanup stale rooms and sessions ============

setInterval(() => {
  const now = Date.now();

  // Clean up stale rooms (> 2 hours)
  for (const [code, room] of rooms) {
    if (now - room.createdAt > 2 * 60 * 60 * 1000) {
      console.log(`[relay] Cleaning up stale room: ${code}`);
      cleanupRoom(code);
    }
  }

  // Clean up orphaned/inactive sessions (no room, older than 5 min, or inactive > 10 min)
  for (const [sessionId, peer] of sessions) {
    const inRoom = findRoomByPeer(peer);
    const inactive = now - peer.lastActive > 10 * 60 * 1000;
    if ((!inRoom && peer.messageQueue.length === 0 && now - peer.lastActive > 5 * 60 * 1000) || inactive) {
      if (peer.waitingRes) {
        try { peer.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
        if (peer.waitingTimer) clearTimeout(peer.waitingTimer);
      }
      sessions.delete(sessionId);
    }
  }

  // Log stats
  console.log(`[relay] Stats: ${rooms.size} rooms, ${wss.clients.size} WS, ${sessions.size} poll sessions`);
}, 5 * 60 * 1000);

// ============ Start ============

server.listen(PORT, "0.0.0.0", () => {
  console.log(`=============================================`);
  console.log(`  Conveyor Clash Relay Server`);
  console.log(`  Running on port ${PORT}`);
  console.log(`  Health: http://0.0.0.0:${PORT}/health`);
  console.log(`  WebSocket: ws://0.0.0.0:${PORT}/`);
  console.log(`  Polling: http://0.0.0.0:${PORT}/poll/open|send|recv|close`);
  console.log(`  Dual transport: WS + HTTP polling`);
  console.log(`=============================================`);
});
