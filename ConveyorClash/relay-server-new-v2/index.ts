/**
 * Conveyor Clash Relay Server v14
 * -----------------------------------------------------------------
 * Improvements over v13:
 *  - Supports up to 4 peers per room (2v2 team mode).
 *  - Each peer is assigned a mechIndex (0..3) and team on join.
 *  - Host can broadcast room_state + start_game to all guests.
 *  - Rate limiting per peer (max 60 msg/sec) — prevents flooding.
 *  - Better cleanup: stale peers removed every 60s (was 5min).
 *  - Larger WS maxPayload (1 MB) to handle big game states.
 *  - Health endpoint reports per-room breakdown.
 *  - Graceful handling of peer disconnect during team mode (notify host).
 *
 * Transport: dual WebSocket + HTTP long-polling (unchanged).
 * Deployable on Render, Fly.io, Railway, or any Node host.
 */

import { createServer, IncomingMessage, ServerResponse } from "http";
import { WebSocketServer, WebSocket } from "ws";

const PORT = parseInt(process.env.PORT || "3042");
const MAX_PEERS_PER_ROOM = 4;
const MAX_MSG_PER_SEC = 120;          // per-peer rate limit
const RATE_WINDOW_MS = 1000;
const ROOM_MAX_AGE_MS = 2 * 60 * 60 * 1000;  // 2h
const PEER_INACTIVE_MS = 10 * 60 * 1000;     // 10min
const WS_MAX_PAYLOAD = 1 << 20;              // 1 MB

// ============ Types ============
interface Peer {
  type: "ws" | "poll";
  ws?: WebSocket;
  sessionId?: string;
  messageQueue: any[];
  waitingRes?: ServerResponse | null;
  waitingTimer?: NodeJS.Timeout | null;
  lastActive: number;
  roomCode?: string;
  mechIndex?: number;     // 0..3 — assigned by server
  team?: number;          // 0 or 1
  isHost?: boolean;
  name?: string;
  color?: string;
  shape?: string;
  // rate limiting
  msgTimestamps: number[];
}

interface Room {
  peers: (Peer | null)[];   // index 0..3 = mechIndex
  code: string;
  mode: string;             // '1v1' | '2v2'
  createdAt: number;
  started: boolean;
}

// ============ State ============
const rooms = new Map<string, Room>();
const wsToPeer = new Map<WebSocket, Peer>();
const sessions = new Map<string, Peer>();

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}
function generateSessionId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 16; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// ============ Rate limiting ============
function rateLimitOk(peer: Peer): boolean {
  const now = Date.now();
  peer.msgTimestamps = peer.msgTimestamps.filter(t => now - t < RATE_WINDOW_MS);
  if (peer.msgTimestamps.length >= MAX_MSG_PER_SEC) return false;
  peer.msgTimestamps.push(now);
  return true;
}

// ============ Peer helpers ============
function peerSend(peer: Peer, msg: any): void {
  peer.lastActive = Date.now();
  if (peer.type === "ws" && peer.ws && peer.ws.readyState === WebSocket.OPEN) {
    try { peer.ws.send(JSON.stringify(msg)); }
    catch (e) { console.error("[relay] WS send error:", e); }
  } else if (peer.type === "poll") {
    peer.messageQueue.push(msg);
    if (peer.waitingRes) {
      const res = peer.waitingRes;
      peer.waitingRes = null;
      if (peer.waitingTimer) { clearTimeout(peer.waitingTimer); peer.waitingTimer = null; }
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
  } catch (e) { /* response closed */ }
}

function findRoomByPeer(peer: Peer): { room: Room; mechIndex: number } | null {
  if (!peer.roomCode) return null;
  const room = rooms.get(peer.roomCode);
  if (!room) return null;
  for (let i = 0; i < room.peers.length; i++) {
    if (room.peers[i] === peer) return { room, mechIndex: i };
  }
  return null;
}

function broadcastToRoom(room: Room, msg: any, excludePeer?: Peer): void {
  for (const p of room.peers) {
    if (!p || p === excludePeer) continue;
    peerSend(p, msg);
  }
}

// Assign next free slot. For 2v2 prefer balancing teams.
function assignSlot(room: Room, preferredTeam?: number): number {
  const n = room.mode === "2v2" ? 4 : 2;
  // Count current occupants per team
  let team0 = 0, team1 = 0;
  for (let i = 0; i < n; i++) if (room.peers[i]) { if (teamOf(i) === 0) team0++; else team1++; }
  // If preferred team specified and has space, use it
  if (preferredTeam !== undefined) {
    for (let i = 0; i < n; i++) {
      if (!room.peers[i] && teamOf(i) === preferredTeam) return i;
    }
  }
  // Otherwise pick the first empty slot (host always 0)
  for (let i = 0; i < n; i++) if (!room.peers[i]) return i;
  return -1;
}
function teamOf(mechIndex: number): number {
  return mechIndex < 2 ? 0 : 1;
}

function cleanupRoom(code: string, reason?: string): void {
  const room = rooms.get(code);
  if (!room) return;
  console.log(`[relay] Cleaning up room ${code}${reason ? " (" + reason + ")" : ""}`);
  const disconnectMsg = { action: "peer_disconnected", reason: reason || "room_closed" };
  for (const p of room.peers) {
    if (!p) continue;
    try { peerSend(p, disconnectMsg); } catch {}
    if (p.type === "poll" && p.sessionId) sessions.delete(p.sessionId);
    if (p.waitingRes) {
      try { p.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
      if (p.waitingTimer) clearTimeout(p.waitingTimer);
    }
  }
  rooms.delete(code);
}

function removePeerFromRoom(peer: Peer, reason?: string): void {
  const info = findRoomByPeer(peer);
  if (!info) return;
  const { room, mechIndex } = info;
  room.peers[mechIndex] = null;
  peer.roomCode = undefined;
  peer.mechIndex = undefined;
  // Notify remaining peers which mech disconnected
  broadcastToRoom(room, { action: "peer_disconnected", mechIndex, reason: reason || "left" });
  // If room empty, remove it
  if (room.peers.every(p => !p)) {
    cleanupRoom(room.code, "empty");
  }
}

// ============ Message handling ============
function handleMessage(peer: Peer, msg: any): void {
  if (!rateLimitOk(peer)) {
    peerSend(peer, { action: "error", message: "Rate limit exceeded" });
    return;
  }
  peer.lastActive = Date.now();

  switch (msg.action) {
    case "create": {
      removePeerFromRoom(peer);
      let code = generateCode();
      while (rooms.has(code)) code = generateCode();
      const mode = msg.mode === "2v2" ? "2v2" : "1v1";
      const n = mode === "2v2" ? 4 : 2;
      const room: Room = {
        peers: new Array(n).fill(null),
        code,
        mode,
        createdAt: Date.now(),
        started: false,
      };
      room.peers[0] = peer;
      rooms.set(code, room);
      peer.roomCode = code;
      peer.mechIndex = 0;
      peer.team = 0;
      peer.isHost = true;
      if (msg.color) peer.color = msg.color;
      if (msg.shape) peer.shape = msg.shape;
      if (msg.name) peer.name = msg.name;
      peerSend(peer, { action: "created", roomId: code, mechIndex: 0, team: 0, mode });
      console.log(`[relay] Room ${code} created (${mode}, ${peer.type})`);
      break;
    }
    case "join": {
      const code = msg.roomId?.toString().toUpperCase().trim();
      if (!code) { peerSend(peer, { action: "error", message: "No room ID provided" }); return; }
      const room = rooms.get(code);
      if (!room) { peerSend(peer, { action: "error", message: "Room not found" }); return; }
      if (room.started) { peerSend(peer, { action: "error", message: "Game already started" }); return; }
      const slot = assignSlot(room, msg.team);
      if (slot < 0) { peerSend(peer, { action: "error", message: "Room is full" }); return; }
      removePeerFromRoom(peer);
      room.peers[slot] = peer;
      peer.roomCode = code;
      peer.mechIndex = slot;
      peer.team = teamOf(slot);
      peer.isHost = false;
      if (msg.color) peer.color = msg.color;
      if (msg.shape) peer.shape = msg.shape;
      if (msg.name) peer.name = msg.name;
      peerSend(peer, { action: "joined", roomId: code, mechIndex: slot, team: peer.team, mode: room.mode });
      // Notify host (and others) of the new peer
      const hostPeer = room.peers[0];
      if (hostPeer) {
        peerSend(hostPeer, {
          action: "peer_connected",
          mechIndex: slot,
          team: peer.team,
          name: peer.name,
          color: peer.color,
          shape: peer.shape,
        });
      }
      // Also broadcast updated room roster to everyone
      broadcastRoomState(room);
      console.log(`[relay] Guest joined room ${code} as mech ${slot} (team ${peer.team})`);
      break;
    }
    case "room_state_broadcast": {
      // Only host should broadcast this
      if (!peer.isHost) return;
      const info = findRoomByPeer(peer);
      if (!info) return;
      broadcastToRoom(info.room, { action: "room_state", mode: msg.mode || info.room.mode, slots: msg.slots, started: msg.started || false }, peer);
      break;
    }
    case "start_game": {
      if (!peer.isHost) return;
      const info = findRoomByPeer(peer);
      if (!info) return;
      info.room.started = true;
      broadcastToRoom(info.room, { action: "start_game", mode: info.room.mode });
      console.log(`[relay] Game started in room ${info.room.code}`);
      break;
    }
    case "data": {
      const info = findRoomByPeer(peer);
      if (!info) { peerSend(peer, { action: "error", message: "Not in a room" }); return; }
      // Broadcast to all OTHER peers in the room (so 2v2 guests all receive host state)
      broadcastToRoom(info.room, { action: "data", payload: msg.payload }, peer);
      break;
    }
    case "ping": { peerSend(peer, { action: "pong" }); break; }
    case "_open": break; // no-op
    default: break; // ignore unknown
  }
}

function broadcastRoomState(room: Room): void {
  const slots = room.peers.map((p, i) => p ? {
    role: i === 0 ? "host" : "guest",
    mechIdx: i,
    team: teamOf(i),
    name: p.name || ("Player" + (i + 1)),
    color: p.color,
    shape: p.shape,
  } : { role: "empty", mechIdx: i, team: teamOf(i), name: "" });
  broadcastToRoom(room, { action: "room_state", mode: room.mode, slots, started: room.started });
}

// ============ HTTP server ============
function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
    req.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch { resolve({}); } });
    req.on("error", reject);
  });
}
function corsHeaders(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  corsHeaders(res);
  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }
  const url = new URL(req.url || "/", `http://0.0.0.0:${PORT}`);

  // Health
  if (url.pathname === "/" || url.pathname === "/health") {
    const roomList = Array.from(rooms.values()).map(r => ({
      code: r.code, mode: r.mode, peers: r.peers.filter(p => p).length, started: r.started, age: Math.floor((Date.now() - r.createdAt) / 1000),
    }));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "ok",
      service: "conveyor-clash-relay-v14",
      version: "14.0.0",
      rooms: rooms.size,
      wsConnections: wss.clients.size,
      pollSessions: sessions.size,
      uptime: Math.floor(process.uptime()),
      transports: ["websocket", "polling"],
      roomList,
    }));
    return;
  }

  // ===== HTTP Polling =====
  if (url.pathname === "/poll/open" && req.method === "POST") {
    const msg = await parseBody(req);
    const sessionId = generateSessionId();
    const peer: Peer = {
      type: "poll", sessionId, messageQueue: [], waitingRes: null, waitingTimer: null,
      lastActive: Date.now(), msgTimestamps: [],
    };
    sessions.set(sessionId, peer);
    handleMessage(peer, msg);
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Cache-Control": "no-cache, no-store" });
    res.end(JSON.stringify({ sessionId, messages: peer.messageQueue.splice(0) }));
    return;
  }
  if (url.pathname === "/poll/send" && req.method === "POST") {
    const body = await parseBody(req);
    const sessionId = body.sessionId;
    const peer = sessions.get(sessionId);
    if (!peer) { res.writeHead(403, { "Content-Type": "application/json" }); res.end(JSON.stringify({ error: "Invalid session" })); return; }
    handleMessage(peer, body);
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Cache-Control": "no-cache, no-store" });
    res.end(JSON.stringify({ messages: peer.messageQueue.splice(0) }));
    return;
  }
  if (url.pathname === "/poll/recv" && req.method === "GET") {
    const sessionId = url.searchParams.get("sessionId");
    const peer = sessions.get(sessionId || "");
    if (!peer) { res.writeHead(403, { "Content-Type": "application/json" }); res.end(JSON.stringify({ error: "Invalid session" })); return; }
    peer.lastActive = Date.now();
    if (peer.messageQueue.length > 0) { sendPollResponse(res, peer.messageQueue.splice(0)); return; }
    peer.waitingRes = res;
    peer.waitingTimer = setTimeout(() => {
      if (peer.waitingRes === res) { peer.waitingRes = null; peer.waitingTimer = null; sendPollResponse(res, []); }
    }, 25000);
    req.on("close", () => {
      if (peer.waitingRes === res) {
        peer.waitingRes = null;
        if (peer.waitingTimer) { clearTimeout(peer.waitingTimer); peer.waitingTimer = null; }
      }
    });
    return;
  }
  if (url.pathname === "/poll/close" && req.method === "POST") {
    const body = await parseBody(req);
    const peer = sessions.get(body.sessionId);
    if (peer) {
      removePeerFromRoom(peer, "closed");
      sessions.delete(body.sessionId);
      if (peer.waitingRes) {
        try { peer.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
        if (peer.waitingTimer) clearTimeout(peer.waitingTimer);
      }
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

// ============ WebSocket server ============
const wss = new WebSocketServer({ server, path: "/", maxPayload: WS_MAX_PAYLOAD });

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  console.log(`[relay] WS connect from ${clientIp} (total: ${wss.clients.size})`);
  const peer: Peer = {
    type: "ws", ws, messageQueue: [], waitingRes: null,
    lastActive: Date.now(), msgTimestamps: [],
  };
  wsToPeer.set(ws, peer);

  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) ws.ping();
    else clearInterval(pingInterval);
  }, 30000);

  ws.on("message", (raw: Buffer) => {
    let msg: any;
    try { msg = JSON.parse(raw.toString()); }
    catch { peerSend(peer, { action: "error", message: "Invalid JSON" }); return; }
    handleMessage(peer, msg);
  });
  ws.on("close", () => {
    clearInterval(pingInterval);
    removePeerFromRoom(peer, "ws_close");
    wsToPeer.delete(ws);
  });
  ws.on("error", (err: Error) => {
    console.error(`[relay] WS error: ${err.message}`);
    clearInterval(pingInterval);
    removePeerFromRoom(peer, "ws_error");
    wsToPeer.delete(ws);
  });
  ws.on("pong", () => { peer.lastActive = Date.now(); });
});

// ============ Cleanup (60s) ============
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) {
    if (now - room.createdAt > ROOM_MAX_AGE_MS) { cleanupRoom(code, "stale"); continue; }
    // Remove inactive peers
    for (let i = 0; i < room.peers.length; i++) {
      const p = room.peers[i];
      if (!p) continue;
      if (now - p.lastActive > PEER_INACTIVE_MS) {
        console.log(`[relay] Removing inactive peer from room ${code} slot ${i}`);
        room.peers[i] = null;
        p.roomCode = undefined;
        if (p.type === "poll" && p.sessionId) sessions.delete(p.sessionId);
        if (p.waitingRes) {
          try { p.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
          if (p.waitingTimer) clearTimeout(p.waitingTimer);
        }
        broadcastToRoom(room, { action: "peer_disconnected", mechIndex: i, reason: "inactive" });
      }
    }
    if (room.peers.every(p => !p)) cleanupRoom(code, "empty");
  }
  // Clean orphaned sessions
  for (const [sessionId, peer] of sessions) {
    if (!peer.roomCode && now - peer.lastActive > 5 * 60 * 1000) {
      if (peer.waitingRes) {
        try { peer.waitingRes.end(JSON.stringify({ messages: [] })); } catch {}
        if (peer.waitingTimer) clearTimeout(peer.waitingTimer);
      }
      sessions.delete(sessionId);
    }
  }
  console.log(`[relay] Stats: ${rooms.size} rooms, ${wss.clients.size} WS, ${sessions.size} poll sessions`);
}, 60 * 1000);

// ============ Start ============
server.listen(PORT, "0.0.0.0", () => {
  console.log(`=============================================`);
  console.log(`  Conveyor Clash Relay Server v14`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Health: http://0.0.0.0:${PORT}/health`);
  console.log(`  WebSocket: ws://0.0.0.0:${PORT}/`);
  console.log(`  Polling: http://0.0.0.0:${PORT}/poll/{open,send,recv,close}`);
  console.log(`  Max peers/room: ${MAX_PEERS_PER_ROOM}`);
  console.log(`  Rate limit: ${MAX_MSG_PER_SEC} msg/sec per peer`);
  console.log(`  WS max payload: ${WS_MAX_PAYLOAD} bytes`);
  console.log(`=============================================`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[relay] SIGTERM received, shutting down...");
  for (const code of Array.from(rooms.keys())) cleanupRoom(code, "shutdown");
  server.close();
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("[relay] SIGINT received, shutting down...");
  for (const code of Array.from(rooms.keys())) cleanupRoom(code, "shutdown");
  server.close();
  process.exit(0);
});
