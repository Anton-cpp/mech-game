/* CONVEYOR CLASH v15 — Production Build */
/* Bundled: 2026-06-18 03:13 */
/* Original: 12 modules → 1 bundle */

'use strict';

/* === constants.js === */

/**
 * CONVEYOR CLASH v15 — Constants & Configuration
 * All game constants, enums, and static data configured in one place.
 * Change values here without touching any other file.
 */

CC.CONFIG = {
  // Grid
  CELL: 40,
  COLS: 40,
  ROWS: 22,
  get W() { return this.COLS * this.CELL; },
  get H() { return this.ROWS * this.CELL + 20; },

  // Mech
  MECH_R: 16,
  MECH_ACCEL: 1600,
  MECH_FRICTION: 0.88,
  MECH_MAX_SPEED: 260,
  MECH_HP: 120,
  MELEE_DMG_MECH: 28,
  MELEE_RANGE: 52,
  MELEE_HALF_W: 18,
  MELEE_KB: 520,
  MELEE_DUR: 0.28,
  MELEE_CD: 0.75,

  // Dash
  DASH_SPEED: 650,
  DASH_DUR: 0.2,
  DASH_CD: 1.4,
  DASH_DMG: 18,

  // Bullet
  BULLET_SPEED: 480,
  BULLET_DMG: 10,
  BULLET_COST: 4,
  BULLET_LIFE: 2.2,
  SHOOT_CD: 0.2,

  // Shield/Parry
  SHIELD_MAX_HP: 7,
  SHIELD_BREAK_CD: 3.0,
  PARRY_ARC: Math.PI * 0.6,
  PARRY_DIST: 32,

  // Buildings
  CONV_COST: 3,
  CONV_HP: 40,
  WALL_COST: 5,
  WALL_HP: 120,
  TURR_COST: 16,
  TURR_HP: 70,
  TURR_RANGE: 320,
  TURR_DMG: 9,
  TURR_FIRE_RATE: 0.7,
  TURR_ENERGY_COST: 1,
  SPAWNER_COST: 20,
  SPAWNER_HP: 90,
  SPAWNER_INTERVAL: 8,
  MAX_MOBS_PER_SPAWNER: 3,

  // Mobs
  MOB_HP: 30,
  MOB_SPEED: 80,
  MOB_DMG_PLAYER: 5,
  MOB_DMG_BUILDING: 8,
  MOB_ATTACK_CD: 1.0,
  MOB_R: 8,

  // Cooldowns
  TURRET_PLACE_CD: 5,
  SPAWNER_PLACE_CD: 8,
  CONV_PLACE_CD: 2,

  // Energy
  START_ENERGY: 50,
  NODE_RATE: 3.5,
  BASE_ENERGY_RATE: 0.8,
  MAX_ENERGY: 350,

  // Core
  CORE_SIZE: 80,
  CORE_HP: 600,
  RESPAWN_TIME: 3.5,

  // Upgrades
  UPG_STRIKE_COSTS: [50, 100, 160],
  UPG_BULLET_COSTS: [60, 130, 220],
  UPG_FORT_COSTS: [60, 110, 170],
  MAX_UPG_LEVEL: 3,
  FORT_HP_BONUS: [0, 25, 50, 80],

  // Power-ups
  PU_SPEED: 1, PU_SHIELD: 2, PU_RAPID: 3,
  PU_SPAWN_MIN: 20, PU_SPAWN_MAX: 30,
  PU_SPEED_MULT: 1.4, PU_SPEED_DUR: 8,
  PU_SHIELD_HP: 40,
  PU_RAPID_MULT: 0.5, PU_RAPID_DUR: 6,

  // Lava
  LAVA_DMG_PER_SEC: 15,
  LAVA_COLS_MIN: 18, LAVA_COLS_MAX: 21,

  // Network
  TICK: 1 / 30,
  DEFAULT_RELAY_URL: 'https://test-anton21532.amvera.io',

  // Limits
  MAX_PARTICLES: 300,
  MAX_FLOATING_TEXTS: 80,
  MAX_BUILD_FLASHES: 30,
  MAX_KILL_FEED: 6,
  MAX_LAVA_BUBBLES: 60,
};

// ---- Color Schemes ----
CC.COLORS = {
  P1: {
    C: '#0ff', CONN: '#0cc', CONN_BDR: '#0ee',
    DISC: '#184848', DISC_BDR: '#0a8888',
    WALL: '#206060', WALL_BDR: '#0ee',
    TURR: '#185050', TURR_BDR: '#0ff',
    BG: '#0a7a7a', SPAWNER: '#0a5a5a',
    SPAWNER_BDR: '#0ee', MOB: '#0ff',
  },
  P2: {
    C: '#f60', CONN: '#d80', CONN_BDR: '#fa0',
    DISC: '#482010', DISC_BDR: '#885520',
    WALL: '#602010', WALL_BDR: '#e80',
    TURR: '#501808', TURR_BDR: '#f60',
    BG: '#8a3a10', SPAWNER: '#5a2a10',
    SPAWNER_BDR: '#fa0', MOB: '#f60',
  },
};

// Player customization colors
CC.PLAYER_COLORS = ['cyan', 'orange', 'green', 'red', 'purple', 'yellow', 'pink', 'white'];
CC.PLAYER_SHAPES = ['arrow', 'diamond', 'triangle', 'square', 'circle', 'star'];
CC.COLOR_MAP = { cyan: '#0ff', orange: '#f60', green: '#0f0', red: '#f44', purple: '#a0f', yellow: '#ff0', pink: '#f8f', white: '#fff' };
CC.COLOR_BG_MAP = { cyan: '#0a5a5a', orange: '#5a2a10', green: '#0a4a0a', red: '#4a1010', purple: '#3a105a', yellow: '#4a4a0a', pink: '#4a2040', white: '#555' };

// Color accessor helpers using CC.CONFIG (for backward compat)
CC.pcc = (p, conn) => p === 0 ? (conn ? CC.COLORS.P1.CONN : CC.COLORS.P1.DISC) : (conn ? CC.COLORS.P2.CONN : CC.COLORS.P2.DISC);
CC.pcb = (p, conn) => p === 0 ? (conn ? CC.COLORS.P1.CONN_BDR : CC.COLORS.P1.DISC_BDR) : (conn ? CC.COLORS.P2.CONN_BDR : CC.COLORS.P2.DISC_BDR);
CC.pwc = (p) => p === 0 ? CC.COLORS.P1.WALL : CC.COLORS.P2.WALL;
CC.pwb = (p) => p === 0 ? CC.COLORS.P1.WALL_BDR : CC.COLORS.P2.WALL_BDR;
CC.ptc = (p) => p === 0 ? CC.COLORS.P1.TURR : CC.COLORS.P2.TURR;
CC.ptb = (p) => p === 0 ? CC.COLORS.P1.TURR_BDR : CC.COLORS.P2.TURR_BDR;
CC.pcol = (p) => p === 0 ? CC.COLORS.P1.C : CC.COLORS.P2.C;
CC.pbg  = (p) => p === 0 ? CC.COLORS.P1.BG : CC.COLORS.P2.BG;
CC.psc  = (p) => p === 0 ? CC.COLORS.P1.SPAWNER : CC.COLORS.P2.SPAWNER;
CC.psb  = (p) => p === 0 ? CC.COLORS.P1.SPAWNER_BDR : CC.COLORS.P2.SPAWNER_BDR;
CC.pmc  = (p) => p === 0 ? CC.COLORS.P1.MOB : CC.COLORS.P2.MOB;

// ---- Map Layout ----
CC.NODE_POSITIONS = [
  { gx: 8,  gy: 4,  ownerPriority: 0  },  // P1 top
  { gx: 8,  gy: 17, ownerPriority: 0  },  // P1 bottom
  { gx: 19, gy: 11, ownerPriority: -1 },  // CENTER left
  { gx: 20, gy: 11, ownerPriority: -1 },  // CENTER right
  { gx: 31, gy: 4,  ownerPriority: 1  },  // P2 top
  { gx: 31, gy: 17, ownerPriority: 1  },  // P2 bottom
];
CC.CORE_CENTERS = [{ x: 120, y: 440 }, { x: 1480, y: 440 }];
CC.SPAWN_POINTS = [{ x: 220, y: 440 }, { x: 1380, y: 440 }];

window.CC = CC;



/* === utils.js === */

/**
 * CONVEYOR CLASH v15 — Utility Functions
 * Math, geometry, collision detection. Pure functions, no side effects.
 */
const C = CC.CONFIG;

// ---- Math ----
CC.clamp = (v, l, h) => v < l ? l : v > h ? h : v;
CC.rng = (a, b) => a + Math.random() * (b - a);
CC.rngInt = (a, b) => Math.floor(CC.rng(a, b + 1));
CC.normAngle = (a) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
CC.lerp = (a, b, t) => a + (b - a) * t;

// ---- Grid / Coordinate ----
CC.gridCtr = (gx, gy) => ({ x: gx * C.CELL + C.CELL / 2, y: gy * C.CELL + C.CELL / 2 });
CC.toGrid = (px, py) => ({ gx: Math.floor(px / C.CELL), gy: Math.floor(py / C.CELL) });
CC.gxToPixel = (gx) => gx * C.CELL;
CC.gyToPixel = (gy) => gy * C.CELL;
CC.cellBox = (gx, gy) => ({ x: gx * C.CELL, y: gy * C.CELL, w: C.CELL, h: C.CELL });

// ---- Collision Detection ----
CC.rectCircle = (rx, ry, rw, rh, cx, cy, cr) => {
  const nx = CC.clamp(cx, rx, rx + rw), ny = CC.clamp(cy, ry, ry + rh);
  return Math.hypot(cx - nx, cy - ny) < cr;
};

CC.circleCircle = (x1, y1, r1, x2, y2, r2) => Math.hypot(x1 - x2, y1 - y2) < r1 + r2;

CC.pointInArc = (px, py, cx, cy, facing, arcHalf, dist) => {
  const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy);
  if (d > dist) return false;
  return Math.abs(CC.normAngle(Math.atan2(dy, dx) - facing)) < arcHalf;
};

CC.coreBounds = (core) => ({
  x: core.x - C.CORE_SIZE / 2, y: core.y - C.CORE_SIZE / 2,
  w: C.CORE_SIZE, h: C.CORE_SIZE
});

// Core occupies exactly 2×2 cells — check if point/rect overlaps
CC.overlapsCore = (gx, gy, core) => {
  const cellX1 = gx * C.CELL, cellY1 = gy * C.CELL;
  const cellX2 = (gx + 1) * C.CELL, cellY2 = (gy + 1) * C.CELL;
  const cx1 = core.x - C.CORE_SIZE / 2, cy1 = core.y - C.CORE_SIZE / 2;
  const cx2 = core.x + C.CORE_SIZE / 2, cy2 = core.y + C.CORE_SIZE / 2;
  return cellX1 < cx2 && cellX2 > cx1 && cellY1 < cy2 && cellY2 > cy1;
};

// ---- Manhattan (4-direction) adjacency ----
CC.isAdjacent = (gx1, gy1, gx2, gy2) => Math.abs(gx1 - gx2) + Math.abs(gy1 - gy2) <= 1;

// ---- Velocity Limiting ----
CC.limitSpeed = (vx, vy, maxSpd) => {
  const sp = Math.hypot(vx, vy);
  if (sp > maxSpd) { vx *= maxSpd / sp; vy *= maxSpd / sp; }
  return { vx, vy };
};

// ---- Resolve circle-to-box collision (pushout) ----
CC.pushOutRect = (mx, my, r, bx, by, bw, bh) => {
  const cx = CC.clamp(mx, bx, bx + bw), cy = CC.clamp(my, by, by + bh);
  const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 0.01;
  const ov = r - d;
  if (ov > 0) return { x: mx + dx / d * ov, y: my + dy / d * ov, overlap: ov };
  return { x: mx, y: my, overlap: 0 };
};

window.CC = CC;



/* === sound.js === */

/**
 * CONVEYOR CLASH v15 — Sound Manager
 * Web Audio API synth sounds. No external files needed.
 */

CC.Sound = {
  ctx: null,
  _volume: 0.5,
  enabled: true,

  get volume() { return this._volume; },
  set volume(v) {
    this._volume = CC.clamp(v, 0, 1);
    try { localStorage.setItem('cc_volume', this._volume); } catch (e) {}
  },

  init() {
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.enabled = false; return; }
    try {
      const saved = localStorage.getItem('cc_volume');
      if (saved !== null) this._volume = parseFloat(saved);
    } catch (e) {}
    // Sync DOM slider
    const slider = document.getElementById('volume-slider');
    if (slider) {
      slider.value = Math.round(this._volume * 100);
      const valEl = document.getElementById('volume-val');
      if (valEl) valEl.textContent = Math.round(this._volume * 100) + '%';
    }
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  /** Create a gain node pre-configured with current volume */
  _gain() {
    if (!this.enabled || !this.ctx || this._volume <= 0) return null;
    this.resume();
    const g = this.ctx.createGain();
    g.connect(this.ctx.destination);
    g.gain.value = this._volume;
    return g;
  },

  /** Play a simple oscillator tone */
  _tone(freqStart, freqEnd, duration, gainLevel, type = 'square') {
    const g = this._gain(); if (!g) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freqStart, now);
    if (freqEnd !== freqStart) o.frequency.exponentialRampToValueAtTime(freqEnd, now + duration);
    g.gain.setValueAtTime(gainLevel, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);
    o.connect(g);
    o.start(now);
    o.stop(now + duration);
  },

  /** Play noise burst */
  _noise(duration, gainLevel, decay = 1) {
    const g = this._gain(); if (!g) return;
    const now = this.ctx.currentTime;
    const sampleRate = this.ctx.sampleRate;
    const len = Math.floor(sampleRate * duration);
    const buf = this.ctx.createBuffer(1, len, sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    const s = this.ctx.createBufferSource();
    s.buffer = buf;
    g.gain.setValueAtTime(gainLevel, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);
    s.connect(g);
    s.start(now);
  },

  play(name) {
    switch (name) {
      case 'shoot':      this._tone(800, 800, 0.05, 0.15, 'square'); break;
      case 'melee':      this._noise(0.15, 0.2); break;
      case 'dash':       this._tone(400, 200, 0.12, 0.15, 'sine'); break;
      case 'hit':        this._tone(120, 120, 0.08, 0.2, 'sine'); break;
      case 'building':   this._tone(1200, 600, 0.06, 0.12, 'sine'); break;
      case 'coreHit':    this._tone(80, 80, 0.25, 0.25, 'sine'); break;
      case 'nodeCapture':this._tone(300, 600, 0.15, 0.15, 'sine'); break;
      case 'parry':      this._noise(0.08, 0.2, 3); break;
      case 'death': {
        this._noise(0.4, 0.2, 1.5);
        this._tone(80, 80, 0.4, 0.25, 'sine');
        break;
      }
      case 'victory': {
        [523.25, 659.25, 783.99].forEach((f, i) => {
          const g = CC.Sound._gain(); if (!g) return;
          const now = CC.Sound.ctx.currentTime + i * 0.08;
          const o = CC.Sound.ctx.createOscillator();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, now);
          g.gain.setValueAtTime(0.12, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          o.connect(g);
          o.start(now);
          o.stop(now + 0.4);
        });
        break;
      }
      case 'defeat':     this._tone(400, 150, 0.5, 0.15, 'sine'); break;
    }
  }
};

window.CC = CC;



/* === state.js === */

/**
 * CONVEYOR CLASH v15 — Game State
 * State creation, entity factories, serialization for networking.
 */
const C = CC.CONFIG;
let _buildId = 0;

// ---- Entity Factories ----
CC.makeMech = (p) => ({
  x: CC.SPAWN_POINTS[p].x, y: CC.SPAWN_POINTS[p].y,
  vx: 0, vy: 0, hp: C.MECH_HP, maxHp: C.MECH_HP,
  facing: p === 0 ? 0 : Math.PI,
  dashing: false, dashTimer: 0, dashCd: 0, dashDx: 0, dashDy: 0,
  parrying: false, meleeing: false, meleeTimer: 0, meleeCd: 0, shootCd: 0,
  invTimer: 0, respawnTimer: 0, dead: false, lastDamagedBy: -1,
  shieldHp: C.SHIELD_MAX_HP, shieldCd: 0, shieldBroken: false,
});

CC.makeBuilding = (gx, gy, type, owner) => {
  const stats = CC.Building.STATS[type];
  const b = { id: ++_buildId, type, gx, gy, owner, hp: stats.hp, maxHp: stats.hp, connected: false, fireCd: 0 };
  if (type === 4) { b.spawnTimer = 0; b.mobCount = 0; }
  return b;
};

CC.makeBullet = (x, y, vx, vy, owner, dmg, reflected = false) =>
  ({ x, y, vx, vy, owner, dmg, reflected, life: C.BULLET_LIFE });

CC.makeMob = (x, y, owner, spawnerId) => ({
  x, y, hp: C.MOB_HP, maxHp: C.MOB_HP, owner,
  facing: owner === 0 ? 0 : Math.PI, attackCd: 0, spawnerId,
});

CC.makeNode = (gx, gy, ownerPriority) => ({ gx, gy, owner: -1, ownerPriority });

CC.makeParticle = (x, y, vx, vy, life, color, r) => ({ x, y, vx, vy, life, maxLife: life, color, r });

CC.makePowerUp = (x, y, type) =>
  ({ x, y, type, timer: 30, pulsePhase: Math.random() * Math.PI * 2 });

// ---- Building Stats Lookup ----
CC.Building = {
  TYPES: { CONVEYOR: 1, WALL: 2, TURRET: 3, SPAWNER: 4 },
  STATS: {
    1: { hp: C.CONV_HP, cost: C.CONV_COST, name: 'CONVEYOR', cd: C.CONV_PLACE_CD, cdField: 'convPlaceCd' },
    2: { hp: C.WALL_HP,  cost: C.WALL_COST,  name: 'WALL',      cd: null, cdField: null },
    3: { hp: C.TURR_HP,  cost: C.TURR_COST,  name: 'TURRET',    cd: C.TURRET_PLACE_CD, cdField: 'turretPlaceCd' },
    4: { hp: C.SPAWNER_HP, cost: C.SPAWNER_COST, name: 'SPAWNER', cd: C.SPAWNER_PLACE_CD, cdField: 'spawnerPlaceCd' },
  },
  cost(type) { return this.STATS[type] ? this.STATS[type].cost : 0; },
  hp(type) { return this.STATS[type] ? this.STATS[type].hp : 0; },
  name(type) { return this.STATS[type] ? this.STATS[type].name : 'UNKNOWN'; },
  placeCD(type) { return this.STATS[type] ? this.STATS[type].cd : 0; },
};

// ---- State Factory ----
CC.createGameState = () => ({
  phase: 'countdown',
  countdown: 3.5,
  time: 0,
  winner: -1,
  mechs: [CC.makeMech(0), CC.makeMech(1)],
  cores: [
    { x: CC.CORE_CENTERS[0].x, y: CC.CORE_CENTERS[0].y, hp: C.CORE_HP, maxHp: C.CORE_HP },
    { x: CC.CORE_CENTERS[1].x, y: CC.CORE_CENTERS[1].y, hp: C.CORE_HP, maxHp: C.CORE_HP },
  ],
  energy: [C.START_ENERGY, C.START_ENERGY],
  connectedNodes: [0, 0],
  buildings: [],
  bullets: [],
  tBullets: [],
  nodes: CC.NODE_POSITIONS.map(n => CC.makeNode(n.gx, n.gy, n.ownerPriority)),
  mobs: [],
  turretPlaceCd: [0, 0],
  spawnerPlaceCd: [0, 0],
  convPlaceCd: [0, 0],
  particles: [],
  meleeHitP1: false, meleeHitP2: false,
  botsEliminated: [false, false],
  upgStrike: [0, 0], upgBullet: [0, 0], upgFort: [0, 0],
  powerUps: [],
  puSpawnTimer: CC.rng(C.PU_SPAWN_MIN, C.PU_SPAWN_MAX),
  puSpeedTimer: [0, 0],
  puShieldHp: [0, 0],
  puRapidTimer: [0, 0],
  lavaY: Math.floor(C.ROWS / 2) - 3,
  lavaTimer: 30,
});

// ---- Serialization for Network ----
// Lean copy to avoid transmitting full state every tick
CC.stripStateForNetwork = (gs) => ({
  phase: gs.phase, countdown: gs.countdown, time: gs.time, winner: gs.winner,
  mechs: gs.mechs.map(m => ({
    x: m.x, y: m.y, vx: m.vx, vy: m.vy, hp: m.hp, maxHp: m.maxHp,
    facing: m.facing, dashing: m.dashing, dashTimer: m.dashTimer, dashCd: m.dashCd,
    dashDx: m.dashDx, dashDy: m.dashDy, parrying: m.parrying, meleeing: m.meleeing,
    meleeTimer: m.meleeTimer, meleeCd: m.meleeCd, shootCd: m.shootCd,
    invTimer: m.invTimer, respawnTimer: m.respawnTimer, dead: m.dead,
    lastDamagedBy: m.lastDamagedBy, shieldHp: m.shieldHp || 0,
    shieldCd: m.shieldCd || 0, shieldBroken: m.shieldBroken || false,
  })),
  cores: gs.cores.map(c => ({ x: c.x, y: c.y, hp: c.hp, maxHp: c.maxHp })),
  energy: [...gs.energy], connectedNodes: [...gs.connectedNodes],
  buildings: gs.buildings.map(b => ({
    id: b.id, type: b.type, gx: b.gx, gy: b.gy, owner: b.owner,
    hp: b.hp, maxHp: b.maxHp, connected: b.connected,
    fireCd: b.fireCd || 0, spawnTimer: b.spawnTimer || 0, mobCount: b.mobCount || 0,
  })),
  bullets: gs.bullets.map(b => ({ x: b.x, y: b.y, vx: b.vx, vy: b.vy, owner: b.owner, dmg: b.dmg, reflected: b.reflected, life: b.life })),
  tBullets: gs.tBullets.map(b => ({ x: b.x, y: b.y, vx: b.vx, vy: b.vy, owner: b.owner, dmg: b.dmg, life: b.life, reflected: b.reflected })),
  nodes: gs.nodes.map(n => ({ gx: n.gx, gy: n.gy, owner: n.owner, ownerPriority: n.ownerPriority })),
  mobs: gs.mobs.map(m => ({ x: m.x, y: m.y, hp: m.hp, maxHp: m.maxHp, owner: m.owner, facing: m.facing, attackCd: m.attackCd, spawnerId: m.spawnerId })),
  turretPlaceCd: [...gs.turretPlaceCd], spawnerPlaceCd: [...gs.spawnerPlaceCd],
  convPlaceCd: [...gs.convPlaceCd],
  meleeHitP1: gs.meleeHitP1, meleeHitP2: gs.meleeHitP2,
  botsEliminated: [...gs.botsEliminated],
  upgStrike: [...gs.upgStrike], upgBullet: [...gs.upgBullet], upgFort: [...gs.upgFort],
  powerUps: gs.powerUps.map(pu => ({ x: pu.x, y: pu.y, type: pu.type, timer: pu.timer, pulsePhase: pu.pulsePhase })),
  puSpeedTimer: [...gs.puSpeedTimer], puShieldHp: [...gs.puShieldHp], puRapidTimer: [...gs.puRapidTimer],
  lavaY: gs.lavaY, lavaTimer: gs.lavaTimer,
});

window.CC = CC;



/* === energy.js === */

/**
 * CONVEYOR CLASH v15 — Energy Network
 * BFS-based conveyor connectivity and node capture logic.
 * 
 * FIXED (v15): Center nodes were being double-counted
 * because the outer loop ran for both p=0 and p=1,
 * each incrementing cn[] for center nodes independently.
 * Now owner-priority nodes are handled in the per-player loop,
 * while center nodes (ownerPriority === -1) are processed ONCE
 * in a separate pass after both BFS runs.
 */
const C = CC.CONFIG;

/**
 * Compute connected conveyor networks via BFS from each core,
 * then resolve node ownership with priority rules.
 */
CC.computeEnergy = (gs) => {
  const cn = [0, 0];
  const pInfo = [];

  // --- Phase 1: BFS from each core to find connected conveyors ---
  for (let p = 0; p < 2; p++) {
    const visited = new Set();
    const queue = [];
    const cc = CC.toGrid(gs.cores[p].x, gs.cores[p].y);
    // Core footprint: ~3x3 cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const k = (cc.gx + dx) + ',' + (cc.gy + dy);
        if (!visited.has(k)) { visited.add(k); queue.push({ gx: cc.gx + dx, gy: cc.gy + dy }); }
      }
    }
    const myConv = gs.buildings.filter(b => b.owner === p && b.type === 1);
    let head = 0;
    while (head < queue.length) {
      const { gx, gy } = queue[head++];
      for (const b of myConv) {
        const k = b.gx + ',' + b.gy;
        if (!visited.has(k) && CC.isAdjacent(b.gx, b.gy, gx, gy)) {
          visited.add(k);
          queue.push({ gx: b.gx, gy: b.gy });
        }
      }
    }
    // Mark which conveyors of this player are connected
    for (const b of myConv) b.connected = visited.has(b.gx + ',' + b.gy);
    pInfo.push({ visited, cc });
  }

  // --- Phase 2: Owner-priority nodes (one per half) ---
  for (let p = 0; p < 2; p++) {
    const { visited, cc } = pInfo[p];
    for (const n of gs.nodes) {
      const prio = n.ownerPriority !== undefined ? n.ownerPriority : -1;
      if (prio !== p) continue; // only handle my priority nodes

      let myAdj = false, enAdj = false;
      // Check my connected conveyors
      for (const b of gs.buildings) {
        if (b.type !== 1 || !b.connected) continue;
        if (!CC.isAdjacent(b.gx, b.gy, n.gx, n.gy)) continue;
        if (b.owner === p) myAdj = true;
        else enAdj = true;
      }
      // Core proximity
      if (Math.abs(n.gx - cc.gx) + Math.abs(n.gy - cc.gy) <= 2) myAdj = true;
      const oc = CC.toGrid(gs.cores[1 - p].x, gs.cores[1 - p].y);
      if (Math.abs(n.gx - oc.gx) + Math.abs(n.gy - oc.gy) <= 2) enAdj = true;

      // Owner always captures if adjacent
      if (myAdj) { n.owner = p; cn[p]++; }
      else if (enAdj && !myAdj) { n.owner = 1 - p; cn[1 - p]++; }
    }
  }

  // --- Phase 3: Center nodes (no owner priority) — processed ONCE ---
  // This fixes the v14 bug where center nodes were counted twice
  for (const n of gs.nodes) {
    if (n.ownerPriority !== -1) continue;

    let p0Adj = false, p1Adj = false;
    for (const b of gs.buildings) {
      if (b.type !== 1 || !b.connected) continue;
      if (!CC.isAdjacent(b.gx, b.gy, n.gx, n.gy)) continue;
      if (b.owner === 0) p0Adj = true;
      else p1Adj = true;
    }
    // Core proximity for center
    const cc0 = CC.toGrid(gs.cores[0].x, gs.cores[0].y);
    if (Math.abs(n.gx - cc0.gx) + Math.abs(n.gy - cc0.gy) <= 2) p0Adj = true;
    const cc1 = CC.toGrid(gs.cores[1].x, gs.cores[1].y);
    if (Math.abs(n.gx - cc1.gx) + Math.abs(n.gy - cc1.gy) <= 2) p1Adj = true;

    if (p0Adj && !p1Adj) { n.owner = 0; cn[0]++; }
    else if (!p0Adj && p1Adj) { n.owner = 1; cn[1]++; }
    else if (p0Adj && p1Adj) { n.owner = -1; /* contested */ }
  }

  gs.connectedNodes = cn;
};

/**
 * Check if a building is invulnerable (connected conveyor whose owner is alive).
 */
CC.isConvProtected = (gs, b) => b.type === 1 && b.connected && !gs.mechs[b.owner].dead;

/**
 * Check if a building can be placed at (gx, gy).
 */
CC.canPlaceBuild = (gs, p, gx, gy, type) => {
  if (gx < 0 || gx >= C.COLS || gy < 0 || gy >= C.ROWS) return false;
  // Occupied?
  for (const b of gs.buildings) { if (b.gx === gx && b.gy === gy) return false; }
  // Overlaps core?
  for (const c of gs.cores) { if (CC.overlapsCore(gx, gy, c)) return false; }
  // Overlaps node?
  for (const n of gs.nodes) { if (n.gx === gx && n.gy === gy) return false; }
  // Placement cooldown
  const stats = CC.Building.STATS[type];
  if (stats && stats.cdField && gs[stats.cdField][p] > 0) return false;
  // Can afford?
  if (gs.energy[p] < stats.cost) return false;
  // Placement rules: must be on own side or adjacent to own building/core/node
  const mySide = (p === 0 && gx < 20) || (p === 1 && gx >= 20);
  const adjOwnBld = gs.buildings.some(b => b.owner === p && CC.isAdjacent(b.gx, b.gy, gx, gy));
  const cc = CC.toGrid(gs.cores[p].x, gs.cores[p].y);
  const adjCore = Math.abs(gx - cc.gx) <= 2 && Math.abs(gy - cc.gy) <= 2;
  const adjNode = gs.nodes.some(n => CC.isAdjacent(n.gx, n.gy, gx, gy));
  if (!mySide && !adjOwnBld && !adjCore && !adjNode) return false;
  return true;
};

/**
 * Place a building. Deducts energy, sets cooldowns.
 */
CC.placeBuild = (gs, p, gx, gy, type) => {
  const stats = CC.Building.STATS[type];
  gs.energy[p] -= stats.cost;
  const b = CC.makeBuilding(gx, gy, type, p);
  gs.buildings.push(b);
  if (stats.cdField) gs[stats.cdField][p] = stats.cd || 0;
  return b;
};

window.CC = CC;



/* === combat.js === */

/**
 * CONVEYOR CLASH v15 — Combat Systems
 * Bullets, melee, dash, parry, mobs, turrets, spawners, lava, power-ups.
 * Each subsystem is a pure-update function operating on game state.
 */
const C = CC.CONFIG;

// ---- Damage Application ----
CC.applyDmgToMech = (gs, p, rawDmg) => {
  const fortLv = gs.upgFort[p];
  const reduction = fortLv * 0.05;
  return Math.max(1, Math.round(rawDmg * (1 - reduction)));
};

// ---- Particle Spawning ----
CC.spawnParticles = (gs, x, y, col, n) => {
  if (gs.particles.length > C.MAX_PARTICLES) return;
  for (let i = 0; i < n; i++) {
    const a = CC.rng(0, Math.PI * 2), sp = CC.rng(50, 220);
    gs.particles.push(CC.makeParticle(x, y, Math.cos(a) * sp, Math.sin(a) * sp, CC.rng(0.15, 0.5), col, CC.rng(1.5, 4.5)));
  }
};

CC.spawnHitParticles = (gs, x, y, col) => {
  if (gs.particles.length > C.MAX_PARTICLES) return;
  for (let i = 0; i < 5; i++) {
    const a = CC.rng(0, Math.PI * 2), sp = CC.rng(80, 180);
    gs.particles.push(CC.makeParticle(x, y, Math.cos(a) * sp, Math.sin(a) * sp, CC.rng(0.1, 0.35), col, CC.rng(1, 3)));
  }
};

// ---- Floating Text (delegated to UI) ----
CC.addFloatText = (x, y, text, color) => {
  if (CC.UI && CC.UI.floatingTexts && CC.UI.floatingTexts.length < C.MAX_FLOATING_TEXTS)
    CC.UI.floatingTexts.push({ x: x + CC.rng(-15, 15), y, text, color, timer: 1, maxTimer: 1 });
};
CC.addBuildFlash = (x, y, msg, duration) => {
  if (CC.UI && CC.UI.buildFlashes) {
    if (CC.UI.buildFlashes.length > C.MAX_BUILD_FLASHES) CC.UI.buildFlashes.shift();
    const dur = duration || (msg ? 1.5 : 0.4);
    CC.UI.buildFlashes.push({ x, y, timer: dur, maxTimer: dur, msg: msg || null });
  }
};
CC.addKillFeed = (msg, color) => {
  if (CC.UI && CC.UI.killFeed) {
    CC.UI.killFeed.push({ msg, color, timer: 5, maxTimer: 5 });
    if (CC.UI.killFeed.length > C.MAX_KILL_FEED) CC.UI.killFeed.shift();
  }
};

// ---- Mech Movement & Combat Input Processing ----
CC.processMechInput = (gs, p, inp, dt) => {
  const m = gs.mechs[p];
  if (!inp || m.dead) {
    if (m.dead) {
      m.respawnTimer -= dt;
      if (m.respawnTimer <= 0) CC.respawnMech(gs, p);
    }
    return;
  }

  m.facing = Math.atan2(inp.my - m.y, inp.mx - m.x);

  // Parry
  m.parrying = inp.q && !m.dashing && !m.meleeing;

  // Melee initiation
  if (inp.rmb && !m.meleeing && m.meleeCd <= 0 && !m.dashing && !m.parrying) {
    m.meleeing = true;
    m.meleeTimer = C.MELEE_DUR;
    m.meleeCd = C.MELEE_CD;
    if (p === 0) gs.meleeHitP1 = false; else gs.meleeHitP2 = false;
  }
  if (m.meleeing) {
    m.meleeTimer -= dt;
    if (m.meleeTimer <= 0) m.meleeing = false;
  }
  if (m.meleeCd > 0) m.meleeCd -= dt;

  // Dash
  if (inp.space && !m.dashing && m.dashCd <= 0 && !m.meleeing) {
    m.dashing = true; m.dashTimer = C.DASH_DUR; m.dashCd = C.DASH_CD;
    m.dashDx = Math.cos(m.facing); m.dashDy = Math.sin(m.facing);
    m.invTimer = C.DASH_DUR;
    CC.Sound.play('dash');
  }
  if (m.dashing) { m.dashTimer -= dt; if (m.dashTimer <= 0) m.dashing = false; }
  if (m.dashCd > 0) m.dashCd -= dt;
  if (m.invTimer > 0) m.invTimer -= dt;

  // Shield cooldown
  if (m.shieldCd > 0) {
    m.shieldCd -= dt;
    if (m.shieldCd <= 0) { m.shieldHp = C.SHIELD_MAX_HP; m.shieldBroken = false; }
  }

  // Upgrades (one-shot flags)
  CC.processUpgrades(gs, p, inp);

  // Movement
  if (!m.dashing) {
    let ax = 0, ay = 0;
    if (inp.w) ay = -1; if (inp.s) ay = 1;
    if (inp.a) ax = -1; if (inp.d) ax = 1;
    const len = Math.hypot(ax, ay);
    if (len > 0) { ax /= len; ay /= len; m.vx += ax * C.MECH_ACCEL * dt; m.vy += ay * C.MECH_ACCEL * dt; }
    m.vx *= C.MECH_FRICTION;
    m.vy *= C.MECH_FRICTION;
    let maxSpd = C.MECH_MAX_SPEED;
    if (gs.puSpeedTimer[p] > 0) maxSpd *= C.PU_SPEED_MULT;
    ({ vx: m.vx, vy: m.vy } = CC.limitSpeed(m.vx, m.vy, maxSpd));
  } else {
    m.vx = m.dashDx * C.DASH_SPEED;
    m.vy = m.dashDy * C.DASH_SPEED;
  }
  if (m.parrying) { m.vx *= 0.65; m.vy *= 0.65; }
  m.x += m.vx * dt; m.y += m.vy * dt;
  m.x = CC.clamp(m.x, C.MECH_R, C.W - C.MECH_R);
  m.y = CC.clamp(m.y, C.MECH_R, C.H - C.MECH_R);

  // Shoot
  if (m.shootCd > 0) m.shootCd -= dt;
  let effShootCd = C.SHOOT_CD;
  if (gs.puRapidTimer[p] > 0) effShootCd *= C.PU_RAPID_MULT;
  if (inp.lmb && !m.dashing && !m.parrying && inp.buildMode === 0 && m.shootCd <= 0) {
    if (gs.energy[p] >= C.BULLET_COST) {
      gs.energy[p] -= C.BULLET_COST;
      m.shootCd = effShootCd;
      const bulletLv = gs.upgBullet[p];
      const effSpeed = C.BULLET_SPEED + bulletLv * 300;
      const effDmg = C.BULLET_DMG + bulletLv * 2;
      const bx = m.x + Math.cos(m.facing) * 22, by = m.y + Math.sin(m.facing) * 22;
      gs.bullets.push(CC.makeBullet(bx, by, Math.cos(m.facing) * effSpeed, Math.sin(m.facing) * effSpeed, p, effDmg));
      CC.Sound.play('shoot');
    }
  }

  // Build placement
  if (inp.lmb && inp.buildMode > 0) {
    const gx = Math.floor(inp.mx / C.CELL), gy = Math.floor(inp.my / C.CELL);
    if (gx >= 0 && gx < C.COLS && gy >= 0 && gy < C.ROWS) {
      if (CC.canPlaceBuild(gs, p, gx, gy, inp.buildMode)) {
        CC.placeBuild(gs, p, gx, gy, inp.buildMode);
        const bc = CC.gridCtr(gx, gy);
        CC.addBuildFlash(bc.x, bc.y, null);
        CC.Sound.play('building');
      }
    }
  }
};

// ---- Upgrades ----
CC.processUpgrades = (gs, p, inp) => {
  const m = gs.mechs[p];
  // Strike [E→8]
  if (inp.upgE && gs.upgStrike[p] < C.MAX_UPG_LEVEL && gs.energy[p] >= C.UPG_STRIKE_COSTS[gs.upgStrike[p]]) {
    gs.energy[p] -= C.UPG_STRIKE_COSTS[gs.upgStrike[p]];
    gs.upgStrike[p]++;
    CC.addBuildFlash(C.W / 2, C.H / 2 - 40, 'STRIKE LV' + gs.upgStrike[p], 1.5);
    CC.Sound.play('nodeCapture');
  }
  // Bullet [R→9]
  if (inp.upgR && gs.upgBullet[p] < C.MAX_UPG_LEVEL && gs.energy[p] >= C.UPG_BULLET_COSTS[gs.upgBullet[p]]) {
    gs.energy[p] -= C.UPG_BULLET_COSTS[gs.upgBullet[p]];
    gs.upgBullet[p]++;
    CC.addBuildFlash(C.W / 2, C.H / 2 - 40, 'BULLET LV' + gs.upgBullet[p], 1.5);
    CC.Sound.play('nodeCapture');
  }
  // Fortify [F→0]
  if (inp.upgF && gs.upgFort[p] < C.MAX_UPG_LEVEL && gs.energy[p] >= C.UPG_FORT_COSTS[gs.upgFort[p]]) {
    gs.energy[p] -= C.UPG_FORT_COSTS[gs.upgFort[p]];
    gs.upgFort[p]++;
    const hpB = C.FORT_HP_BONUS[gs.upgFort[p]];
    m.maxHp = C.MECH_HP + hpB;
    m.hp = Math.min(m.hp + hpB, m.maxHp);
    CC.addBuildFlash(C.W / 2, C.H / 2 - 40, 'FORTIFY LV' + gs.upgFort[p], 1.5);
    CC.Sound.play('nodeCapture');
  }
};

// ---- Melee Resolution ----
CC.resolveMelee = (gs, p, dt) => {
  const m = gs.mechs[p];
  if (!m.meleeing || m.dead) return;
  const prog = 1 - m.meleeTimer / C.MELEE_DUR;
  if (prog < 0.2 || prog > 0.75) return;

  const strikeLv = gs.upgStrike[p];
  const effDmg = C.MELEE_DMG_MECH + strikeLv * 7;
  const effRange = C.MELEE_RANGE + strikeLv * 12;
  const effHalfW = strikeLv >= 2 ? C.MELEE_HALF_W + 10 : C.MELEE_HALF_W;
  const hx = m.x + Math.cos(m.facing) * effRange, hy = m.y + Math.sin(m.facing) * effRange;
  const hf = p === 0 ? 'meleeHitP1' : 'meleeHitP2';
  const ep = 1 - p;
  const em = gs.mechs[ep];

  // Vs enemy mech
  if (!em.dead && !gs[hf] && Math.hypot(hx - em.x, hy - em.y) < C.MECH_R + effHalfW && em.invTimer <= 0) {
    const dmg = CC.applyDmgToMech(gs, ep, effDmg);
    em.hp -= dmg;
    em.vx += Math.cos(m.facing) * C.MELEE_KB;
    em.vy += Math.sin(m.facing) * C.MELEE_KB;
    gs[hf] = true;
    CC.spawnParticles(gs, em.x, em.y, '#ff0', 10);
    CC.Sound.play('melee'); CC.Sound.play('hit');
    CC.addFloatText(em.x, em.y - C.MECH_R, '-' + dmg, '#ff0');
    CC.UI.triggerShake(5, 0.15);
    CC.addKillFeed('P' + (p + 1) + ' hit P' + (ep + 1) + '!', '#ff0');
  }

  // Strike Lv3: AoE cleave (wider arc, 50% damage)
  if (strikeLv >= 3 && !gs[hf] && !em.dead && em.invTimer <= 0) {
    const cleaveArc = Math.PI * 0.39;
    const distToEm = Math.hypot(m.x - em.x, m.y - em.y);
    const angToEm = Math.atan2(em.y - m.y, em.x - m.x);
    if (distToEm < effRange + C.MECH_R && Math.abs(CC.normAngle(angToEm - m.facing)) < cleaveArc / 2) {
      const aDmg = CC.applyDmgToMech(gs, ep, Math.round(effDmg * 0.5));
      em.hp -= aDmg;
      em.vx += Math.cos(m.facing) * C.MELEE_KB * 0.5;
      em.vy += Math.sin(m.facing) * C.MELEE_KB * 0.5;
      gs[hf] = true;
      CC.spawnParticles(gs, em.x, em.y, '#ff0', 6);
      CC.Sound.play('melee');
      CC.addFloatText(em.x, em.y - C.MECH_R, '-' + aDmg, '#ff0');
      CC.UI.triggerShake(4, 0.12);
    }
  }

  // Vs buildings
  for (let bi = gs.buildings.length - 1; bi >= 0; bi--) {
    const b = gs.buildings[bi];
    if (b.owner === p) continue;
    if (CC.isConvProtected(gs, b)) continue;
    const bc = CC.gridCtr(b.gx, b.gy);
    if (Math.hypot(hx - bc.x, hy - bc.y) < C.CELL * 0.7 + effHalfW) {
      b.hp -= effDmg;
      CC.spawnParticles(gs, bc.x, bc.y, '#fa0', 8);
      CC.Sound.play('hit');
      CC.addFloatText(bc.x, bc.y, '-' + effDmg, '#fa0');
    }
  }

  // Vs mobs
  for (const mob of gs.mobs) {
    if (mob.owner === p) continue;
    if (Math.hypot(hx - mob.x, hy - mob.y) < C.MOB_R + effHalfW) {
      mob.hp -= effDmg;
      CC.spawnHitParticles(gs, mob.x, mob.y, '#fa0');
      CC.Sound.play('hit');
      CC.addFloatText(mob.x, mob.y - C.MOB_R, '-' + effDmg, '#fa0');
    }
  }

  // Vs core (only if defender dead)
  const eco = gs.cores[ep];
  if (Math.hypot(hx - eco.x, hy - eco.y) < C.CORE_SIZE / 2 + effHalfW && gs.mechs[ep].dead) {
    const coreDmg = Math.round(effDmg * 0.4);
    eco.hp -= coreDmg;
    CC.spawnParticles(gs, eco.x, eco.y, '#f00', 5);
    CC.Sound.play('coreHit');
    CC.addFloatText(eco.x, eco.y - C.CORE_SIZE / 2, '-' + coreDmg, '#f44');
    CC.UI.triggerShake(6, 0.2);
    CC.addKillFeed('P' + (p + 1) + ' hits core!', '#f44');
  }
};

// ---- Collisions: mech vs buildings & cores ----
CC.resolveMechCollisions = (gs) => {
  for (let p = 0; p < 2; p++) {
    const m = gs.mechs[p];
    if (m.dead) continue;
    // vs walls & turrets (not conveyors, those are passable)
    for (const b of gs.buildings) {
      if (b.type === 1) continue;
      if (b.owner === p) continue;
      const box = CC.cellBox(b.gx, b.gy);
      const pushed = CC.pushOutRect(m.x, m.y, C.MECH_R, box.x, box.y, box.w, box.h);
      m.x = pushed.x; m.y = pushed.y;
    }
    // vs cores
    for (const c of gs.cores) {
      const cb = CC.coreBounds(c);
      const pushed = CC.pushOutRect(m.x, m.y, C.MECH_R, cb.x, cb.y, cb.w, cb.h);
      m.x = pushed.x; m.y = pushed.y;
    }
  }

  // Mech vs mech
  const m0 = gs.mechs[0], m1 = gs.mechs[1];
  if (!m0.dead && !m1.dead) {
    const dx = m1.x - m0.x, dy = m1.y - m0.y, d = Math.hypot(dx, dy) || 0.01;
    const ov = C.MECH_R * 2 - d;
    if (ov > 0) {
      const nx = dx / d, ny = dy / d;
      m0.x -= nx * ov / 2; m0.y -= ny * ov / 2;
      m1.x += nx * ov / 2; m1.y += ny * ov / 2;
      const rvx = m0.vx - m1.vx, rvy = m0.vy - m1.vy, dot = rvx * nx + rvy * ny;
      if (dot > 0) {
        m0.vx -= dot * nx * 0.5; m0.vy -= dot * ny * 0.5;
        m1.vx += dot * nx * 0.5; m1.vy += dot * ny * 0.5;
      }
    }
    // Dash collisions
    if (d < C.MECH_R * 2 + 8) {
      if (m0.dashing && m1.invTimer <= 0) CC._dashHit(gs, 1, m0);
      if (m1.dashing && m0.invTimer <= 0) CC._dashHit(gs, 0, m1);
    }
  }
};

CC._dashHit = (gs, victimP, dasher) => {
  const dd = CC.applyDmgToMech(gs, victimP, C.DASH_DMG);
  const vm = gs.mechs[victimP];
  vm.hp -= dd;
  vm.vx += dasher.dashDx * 280;
  vm.vy += dasher.dashDy * 280;
  CC.spawnParticles(gs, vm.x, vm.y, CC.pcol(dasher === gs.mechs[0] ? 0 : 1), 6);
  CC.Sound.play('hit');
  CC.addFloatText(vm.x, vm.y - C.MECH_R, '-' + dd, CC.pcol(dasher === gs.mechs[0] ? 0 : 1));
  CC.UI.triggerShake(4, 0.15);
};

// ---- Bullet Updates ----
CC.updateBullets = (gs, dt) => {
  for (let bi = gs.bullets.length - 1; bi >= 0; bi--) {
    const b = gs.bullets[bi];
    b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
    if (b.life <= 0 || b.x < -10 || b.x > C.W + 10 || b.y < -10 || b.y > C.H + 10) {
      gs.bullets.splice(bi, 1); continue;
    }

    let hit = false;
    // Check mechs (parry first, then body)
    for (let p = 0; p < 2; p++) {
      if (p === b.owner && !b.reflected) continue;
      const m = gs.mechs[p];
      if (m.dead || m.invTimer > 0) continue;

      // Parry reflection
      if (m.parrying && CC.pointInArc(b.x, b.y, m.x, m.y, m.facing, C.PARRY_ARC / 2, C.PARRY_DIST)) {
        if (m.shieldHp > 0 && m.shieldCd <= 0) {
          m.shieldHp--;
          if (m.shieldHp <= 0) {
            m.shieldBroken = true; m.shieldCd = C.SHIELD_BREAK_CD;
            CC.spawnParticles(gs, m.x, m.y, '#88f', 10);
          } else {
            CC.spawnParticles(gs, b.x, b.y, '#aaf', 3);
          }
          hit = true; break;
        } else {
          // Reflect
          const spd = Math.hypot(b.vx, b.vy) * 1.35;
          const refAng = Math.atan2(-b.vy, -b.vx) + CC.rng(-0.15, 0.15);
          b.vx = Math.cos(refAng) * spd; b.vy = Math.sin(refAng) * spd;
          b.owner = p; b.reflected = true;
          b.dmg = Math.ceil(b.dmg * 1.5);
          CC.spawnParticles(gs, b.x, b.y, '#fff', 5);
          CC.Sound.play('parry');
          continue;
        }
      }

      // Body hit
      if (CC.circleCircle(b.x, b.y, 5, m.x, m.y, C.MECH_R)) {
        let bd = b.dmg;
        if (gs.puShieldHp[p] > 0) {
          const abs = Math.min(gs.puShieldHp[p], bd);
          gs.puShieldHp[p] -= abs; bd -= abs;
          if (abs > 0) CC.addFloatText(m.x, m.y - C.MECH_R - 8, 'SHIELD -' + abs, '#08f');
        }
        if (bd > 0) {
          m.hp -= CC.applyDmgToMech(gs, p, bd);
          CC.spawnHitParticles(gs, b.x, b.y, b.reflected ? '#fff' : '#f80');
          CC.Sound.play('hit');
          CC.addFloatText(m.x, m.y - C.MECH_R, '-' + CC.applyDmgToMech(gs, p, bd), '#fff');
        }
        hit = true; break;
      }
    }
    if (hit) { gs.bullets.splice(bi, 1); continue; }

    // Check buildings (skip protected conveyors)
    for (let bbi = gs.buildings.length - 1; bbi >= 0; bbi--) {
      const bld = gs.buildings[bbi];
      if (bld.owner === b.owner && !b.reflected) continue;
      if (CC.isConvProtected(gs, bld)) continue;
      const bc = CC.gridCtr(bld.gx, bld.gy);
      if (CC.rectCircle(bc.x - C.CELL / 2, bc.y - C.CELL / 2, C.CELL, C.CELL, b.x, b.y, 5)) {
        bld.hp -= b.dmg;
        CC.spawnHitParticles(gs, b.x, b.y, '#fa0');
        hit = true; break;
      }
    }
    if (hit) { gs.bullets.splice(bi, 1); continue; }

    // Check cores
    for (let p = 0; p < 2; p++) {
      if (p === b.owner && !b.reflected) continue;
      const co = gs.cores[p];
      if (CC.rectCircle(co.x - C.CORE_SIZE / 2, co.y - C.CORE_SIZE / 2, C.CORE_SIZE, C.CORE_SIZE, b.x, b.y, 5)) {
        if (gs.mechs[p].dead) {
          co.hp -= b.dmg;
          CC.spawnHitParticles(gs, b.x, b.y, '#f44');
          CC.Sound.play('coreHit');
          CC.addFloatText(co.x, co.y - C.CORE_SIZE / 2, '-' + b.dmg, '#f44');
          CC.UI.triggerShake(6, 0.2);
        }
        hit = true; break;
      }
    }
    if (hit) { gs.bullets.splice(bi, 1); continue; }

    // Check mobs
    for (const mob of gs.mobs) {
      if (mob.owner === b.owner) continue;
      if (CC.circleCircle(b.x, b.y, 5, mob.x, mob.y, C.MOB_R)) {
        mob.hp -= b.dmg;
        CC.spawnHitParticles(gs, b.x, b.y, '#fa0');
        hit = true; break;
      }
    }
    // Hit walls (bullet stopper)
    if (!hit) {
      for (const bld of gs.buildings) {
        if (bld.type === 2 && bld.owner !== b.owner) {
          const bc = CC.gridCtr(bld.gx, bld.gy);
          if (CC.rectCircle(bc.x - C.CELL / 2, bc.y - C.CELL / 2, C.CELL, C.CELL, b.x, b.y, 5)) { hit = true; break; }
        }
      }
    }
    if (hit) gs.bullets.splice(bi, 1);
  }
};

// ---- Turret Updates ----
CC.updateTurrets = (gs, dt) => {
  for (const b of gs.buildings) {
    if (b.type !== 3) continue;
    if (b.fireCd === undefined) b.fireCd = 0;
    if (b.fireCd > 0) { b.fireCd -= dt; continue; }

    const bc = CC.gridCtr(b.gx, b.gy);
    const ep = 1 - b.owner;
    const em = gs.mechs[ep];
    let target = null, minD = C.TURR_RANGE;

    if (!em.dead) { const d = Math.hypot(bc.x - em.x, bc.y - em.y); if (d < minD) { minD = d; target = { x: em.x, y: em.y }; } }
    const eco = gs.cores[ep];
    if (!target || Math.hypot(bc.x - eco.x, bc.y - eco.y) < minD) {
      if (em.dead && Math.hypot(bc.x - eco.x, bc.y - eco.y) < minD) { minD = Math.hypot(bc.x - eco.x, bc.y - eco.y); target = { x: eco.x, y: eco.y }; }
    }
    if (target && gs.energy[b.owner] >= C.TURR_ENERGY_COST) {
      gs.energy[b.owner] -= C.TURR_ENERGY_COST;
      b.fireCd = C.TURR_FIRE_RATE;
      const ang = Math.atan2(target.y - bc.y, target.x - bc.x);
      gs.tBullets.push({
        x: bc.x, y: bc.y,
        vx: Math.cos(ang) * C.BULLET_SPEED * 0.85,
        vy: Math.sin(ang) * C.BULLET_SPEED * 0.85,
        owner: b.owner, dmg: C.TURR_DMG, life: 1.4, reflected: false,
      });
      CC.spawnParticles(gs, bc.x + Math.cos(ang) * 20, bc.y + Math.sin(ang) * 20, CC.pcol(b.owner), 3);
    }
  }
};

// ---- Turret Bullet Updates ----
CC.updateTurretBullets = (gs, dt) => {
  for (let bi = gs.tBullets.length - 1; bi >= 0; bi--) {
    const b = gs.tBullets[bi];
    b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
    if (b.life <= 0 || b.x < -10 || b.x > C.W + 10 || b.y < -10 || b.y > C.H + 10) {
      gs.tBullets.splice(bi, 1); continue;
    }
    let hit = false;
    const ep = 1 - b.owner, em = gs.mechs[ep];
    if (!em.dead && em.invTimer <= 0 && CC.circleCircle(b.x, b.y, 4, em.x, em.y, C.MECH_R)) {
      em.hp -= b.dmg; hit = true;
      CC.spawnHitParticles(gs, b.x, b.y, '#fa0');
      CC.addFloatText(em.x, em.y - C.MECH_R, '-' + b.dmg, '#fa0');
      CC.Sound.play('hit');
    }
    if (!hit) {
      for (const bld of gs.buildings) {
        if (bld.owner === b.owner) continue;
        if (CC.isConvProtected(gs, bld)) continue;
        if (bld.type === 2 || bld.type === 4 || bld.type === 3) {
          const bc = CC.gridCtr(bld.gx, bld.gy);
          if (CC.rectCircle(bc.x - C.CELL / 2, bc.y - C.CELL / 2, C.CELL, C.CELL, b.x, b.y, 4)) { bld.hp -= b.dmg; hit = true; break; }
        }
      }
    }
    if (!hit) {
      for (const mob of gs.mobs) {
        if (mob.owner === b.owner) continue;
        if (CC.circleCircle(b.x, b.y, 4, mob.x, mob.y, C.MOB_R)) { mob.hp -= b.dmg; CC.spawnHitParticles(gs, b.x, b.y, '#fa0'); hit = true; break; }
      }
    }
    if (!hit) {
      const eco = gs.cores[ep];
      if (CC.rectCircle(eco.x - C.CORE_SIZE / 2, eco.y - C.CORE_SIZE / 2, C.CORE_SIZE, C.CORE_SIZE, b.x, b.y, 4)) {
        if (em.dead) { eco.hp -= b.dmg; CC.spawnHitParticles(gs, b.x, b.y, '#f44'); CC.Sound.play('coreHit'); CC.addFloatText(eco.x, eco.y - C.CORE_SIZE / 2, '-' + b.dmg, '#f44'); }
        hit = true;
      }
    }
    if (hit) gs.tBullets.splice(bi, 1);
  }
};

// ---- Spawner & Mob Updates ----
CC.updateSpawners = (gs, dt) => {
  for (const b of gs.buildings) {
    if (b.type !== 4) continue;
    if (b.spawnTimer === undefined) b.spawnTimer = 0;
    if (b.mobCount === undefined) b.mobCount = 0;
    b.spawnTimer += dt;
    if (b.spawnTimer >= C.SPAWNER_INTERVAL && b.mobCount < C.MAX_MOBS_PER_SPAWNER) {
      b.spawnTimer = 0;
      const bc = CC.gridCtr(b.gx, b.gy);
      gs.mobs.push(CC.makeMob(bc.x, bc.y, b.owner, b.id));
      b.mobCount++;
      CC.spawnParticles(gs, bc.x, bc.y, CC.pmc(b.owner), 4);
    }
  }
};

CC.updateMobs = (gs, dt) => {
  for (let mi = gs.mobs.length - 1; mi >= 0; mi--) {
    const mob = gs.mobs[mi];
    if (mob.hp <= 0) {
      CC.spawnParticles(gs, mob.x, mob.y, CC.pmc(mob.owner), 6);
      const spawner = gs.buildings.find(b => b.id === mob.spawnerId);
      if (spawner && spawner.mobCount > 0) spawner.mobCount--;
      gs.mobs.splice(mi, 1); continue;
    }

    // Target priority: building > player > core (matches v14)
    let tx = gs.cores[1 - mob.owner].x, ty = gs.cores[1 - mob.owner].y;
    let nearestBldDist = Infinity, nearestBldX = tx, nearestBldY = ty;
    for (const b of gs.buildings) {
      if (b.owner === mob.owner) continue;
      const bc = CC.gridCtr(b.gx, b.gy);
      const d = Math.hypot(mob.x - bc.x, mob.y - bc.y);
      if (d < nearestBldDist) { nearestBldDist = d; nearestBldX = bc.x; nearestBldY = bc.y; }
    }
    const em = gs.mechs[1 - mob.owner];
    if (!em.dead && Math.hypot(mob.x - em.x, mob.y - em.y) < 200) { tx = em.x; ty = em.y; }
    if (nearestBldDist < 200) { tx = nearestBldX; ty = nearestBldY; } // buildings take priority
    const dx = tx - mob.x, dy = ty - mob.y, d = Math.hypot(dx, dy) || 0.01;
    mob.x += (dx / d) * C.MOB_SPEED * dt;
    mob.y += (dy / d) * C.MOB_SPEED * dt;
    mob.facing = Math.atan2(dy, dx);
    mob.x = CC.clamp(mob.x, C.MOB_R, C.W - C.MOB_R);
    mob.y = CC.clamp(mob.y, C.MOB_R, C.H - C.MOB_R);

    if (mob.attackCd > 0) mob.attackCd -= dt;

    // Attack player
    if (!em.dead && mob.attackCd <= 0 && CC.circleCircle(mob.x, mob.y, C.MOB_R, em.x, em.y, C.MECH_R)) {
      if (em.invTimer <= 0) {
        em.hp -= C.MOB_DMG_PLAYER;
        CC.spawnHitParticles(gs, mob.x, mob.y, CC.pmc(mob.owner));
        CC.addFloatText(em.x, em.y - C.MECH_R, '-' + C.MOB_DMG_PLAYER, CC.pmc(mob.owner));
        mob.attackCd = C.MOB_ATTACK_CD;
      }
    }

    // Attack buildings
    if (mob.attackCd <= 0) {
      for (const b of gs.buildings) {
        if (b.owner === mob.owner) continue;
        if (CC.isConvProtected(gs, b)) continue;
        const bc = CC.gridCtr(b.gx, b.gy);
        if (CC.rectCircle(bc.x - C.CELL / 2, bc.y - C.CELL / 2, C.CELL, C.CELL, mob.x, mob.y, C.MOB_R)) {
          b.hp -= C.MOB_DMG_BUILDING;
          CC.spawnHitParticles(gs, bc.x, bc.y, '#fa0');
          mob.attackCd = C.MOB_ATTACK_CD; break;
        }
      }
    }

    // Attack core (defender dead only)
    if (mob.attackCd <= 0) {
      const eco = gs.cores[1 - mob.owner];
      if (CC.rectCircle(eco.x - C.CORE_SIZE / 2, eco.y - C.CORE_SIZE / 2, C.CORE_SIZE, C.CORE_SIZE, mob.x, mob.y, C.MOB_R)) {
        if (gs.mechs[1 - mob.owner].dead) {
          eco.hp -= C.MOB_DMG_BUILDING;
          CC.spawnHitParticles(gs, eco.x, eco.y, '#f44');
          CC.addFloatText(eco.x, eco.y - C.CORE_SIZE / 2, '-' + C.MOB_DMG_BUILDING, '#f44');
          mob.attackCd = C.MOB_ATTACK_CD;
        }
      }
    }
  }
};

// ---- Lava Zone ----
CC.updateLava = (gs, dt) => {
  gs.lavaTimer -= dt;
  if (gs.lavaTimer <= 0) {
    gs.lavaTimer = 30;
    gs.lavaY = CC.clamp(gs.lavaY + CC.rngInt(-2, 2), 2, C.ROWS - 7);
  }
  for (let p = 0; p < 2; p++) {
    const m = gs.mechs[p];
    if (m.dead || m.invTimer > 0) continue;
    const mg = Math.floor(m.y / C.CELL), mgx = Math.floor(m.x / C.CELL);
    if (mgx >= C.LAVA_COLS_MIN && mgx <= C.LAVA_COLS_MAX && mg >= gs.lavaY && mg <= gs.lavaY + 4) {
      m.hp -= CC.applyDmgToMech(gs, p, C.LAVA_DMG_PER_SEC * dt);
      m.lastDamagedBy = 1 - p;
      if (Math.random() < 0.3) CC.UI.addLavaBubble(m.x, m.y);
    }
  }
};

// ---- Power-Up System ----
CC.updatePowerUps = (gs, dt) => {
  gs.puSpawnTimer -= dt;
  if (gs.puSpawnTimer <= 0) {
    const type = [C.PU_SPEED, C.PU_SHIELD, C.PU_RAPID][CC.rngInt(0, 2)];
    const gx = CC.rngInt(17, 22), gy = CC.rngInt(2, C.ROWS - 3);
    const pos = CC.gridCtr(gx, gy);
    gs.powerUps.push(CC.makePowerUp(pos.x, pos.y, type));
    gs.puSpawnTimer = CC.rng(C.PU_SPAWN_MIN, C.PU_SPAWN_MAX);
  }
  for (let pui = gs.powerUps.length - 1; pui >= 0; pui--) {
    const pu = gs.powerUps[pui];
    pu.timer -= dt;
    pu.pulsePhase += dt * 4;
    if (pu.timer <= 0) { gs.powerUps.splice(pui, 1); continue; }
    for (let p = 0; p < 2; p++) {
      const m = gs.mechs[p];
      if (m.dead) continue;
      if (Math.hypot(m.x - pu.x, m.y - pu.y) < C.MECH_R + 18) {
        if (pu.type === C.PU_SPEED)      { gs.puSpeedTimer[p] = C.PU_SPEED_DUR; CC.addFloatText(m.x, m.y - C.MECH_R, 'SPEED!', '#0f0'); }
        else if (pu.type === C.PU_SHIELD) { gs.puShieldHp[p] = C.PU_SHIELD_HP;  CC.addFloatText(m.x, m.y - C.MECH_R, 'SHIELD!', '#08f'); }
        else                               { gs.puRapidTimer[p] = C.PU_RAPID_DUR; CC.addFloatText(m.x, m.y - C.MECH_R, 'RAPID!', '#f44'); }
        CC.Sound.play('nodeCapture');
        CC.spawnParticles(gs, pu.x, pu.y, pu.type === C.PU_SPEED ? '#0f0' : pu.type === C.PU_SHIELD ? '#08f' : '#f44', 8);
        gs.powerUps.splice(pui, 1); break;
      }
    }
  }
  for (let p = 0; p < 2; p++) {
    if (gs.puSpeedTimer[p] > 0) gs.puSpeedTimer[p] -= dt;
    if (gs.puRapidTimer[p] > 0) gs.puRapidTimer[p] -= dt;
  }
};

// ---- Respawning ----
CC.respawnMech = (gs, p) => {
  const m = gs.mechs[p];
  m.dead = false;
  const fortH = C.FORT_HP_BONUS[gs.upgFort[p]];
  m.hp = C.MECH_HP + fortH;
  m.maxHp = C.MECH_HP + fortH;
  m.x = CC.CORE_CENTERS[p].x;
  m.y = CC.CORE_CENTERS[p].y - 50;
  m.vx = 0; m.vy = 0;
  m.invTimer = 1.5;
  m.shieldHp = C.SHIELD_MAX_HP;
  m.shieldCd = 0;
  m.shieldBroken = false;
  CC.spawnParticles(gs, m.x, m.y, CC.pcol(p), 10);
};

// ---- Death & Win Check ----
CC.checkDeaths = (gs) => {
  for (let p = 0; p < 2; p++) {
    const m = gs.mechs[p];
    if (m.hp <= 0 && !m.dead) {
      m.dead = true; m.hp = 0; m.respawnTimer = C.RESPAWN_TIME;
      CC.spawnParticles(gs, m.x, m.y, CC.pcol(p), 15);
      CC.Sound.play('death');
      CC.addKillFeed('P' + (p + 1) + ' eliminated!', '#f44');
      CC.addFloatText(m.x, m.y - C.MECH_R, 'ELIMINATED', '#f44');
      CC.UI.triggerShake(8, 0.3);
    }
    if (gs.cores[p].hp <= 0) {
      gs.phase = 'gameover';
      gs.winner = 1 - p;
      if (gs.winner === CC.Net.hostIndex) CC.Sound.play('victory');
      else CC.Sound.play('defeat');
      CC.addKillFeed(gs.winner === CC.Net.hostIndex ? 'VICTORY!' : 'DEFEAT!', gs.winner === CC.Net.hostIndex ? '#0f0' : '#f44');
    }
  }
};

// ---- Cooldown Ticking ----
CC.tickCooldowns = (gs, dt) => {
  for (let p = 0; p < 2; p++) {
    if (gs.turretPlaceCd[p] > 0) gs.turretPlaceCd[p] -= dt;
    if (gs.spawnerPlaceCd[p] > 0) gs.spawnerPlaceCd[p] -= dt;
    if (gs.convPlaceCd[p] > 0) gs.convPlaceCd[p] -= dt;
  }
};

// ---- Cleanup: Remove dead buildings, orphan mobs ----
CC.cleanupBuildings = (gs) => {
  // Orphan mob cleanup (before removing buildings)
  for (const b of gs.buildings) {
    if (b.type === 4 && b.hp <= 0 && b.mobCount > 0) {
      b.mobCount = 0;
      for (const mob of gs.mobs) { if (mob.spawnerId === b.id) mob.spawnerId = -1; }
    }
  }
  gs.buildings = gs.buildings.filter(b => b.hp > 0 || CC.isConvProtected(gs, b));
};

// ---- Particles Update ----
CC.updateParticles = (gs, dt) => {
  for (let pi = gs.particles.length - 1; pi >= 0; pi--) {
    const p = gs.particles[pi];
    p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt;
    if (p.life <= 0) gs.particles.splice(pi, 1);
  }
};

window.CC = CC;



/* === ai.js === */

/**
 * CONVEYOR CLASH v15 — AI Opponent
 * Strategic bot for solo practice mode.
 * Priorities: kill enemy core when player dead → capture nodes → defend → attack.
 */
const C = CC.CONFIG;

CC.AI = {
  timer: 0, // initialized on first update

  getInput(gs, p) {
    const m = gs.mechs[p], em = gs.mechs[1 - p], eco = gs.cores[1 - p];
    const inp = { w: false, a: false, s: false, d: false, space: false, q: false,
      mx: eco.x, my: eco.y, lmb: false, rmb: false, buildMode: 0,
      upgE: false, upgR: false, upgF: false };

    if (m.dead) return inp;

    if (em.dead) return this._attackCore(gs, p, m, eco, inp);

    // ---- Normal combat vs live enemy ----
    inp.mx = em.x + CC.rng(-30, 30);
    inp.my = em.y + CC.rng(-30, 30);
    const dEn = Math.hypot(m.x - em.x, m.y - em.y), aE = Math.atan2(em.y - m.y, em.x - m.x);

    // Movement
    if (dEn > 220) {
      if (Math.cos(aE) > 0.2) inp.d = true;
      if (Math.cos(aE) < -0.2) inp.a = true;
      if (Math.sin(aE) > 0.2) inp.s = true;
      if (Math.sin(aE) < -0.2) inp.w = true;
    } else if (dEn < 80) {
      if (Math.cos(aE) > 0.3) inp.a = true;
      if (Math.cos(aE) < -0.3) inp.d = true;
      if (Math.random() > 0.5) inp.w = true; else inp.s = true;
    } else {
      inp.w = Math.random() > 0.5; inp.s = !inp.w;
      if (Math.cos(aE) > 0.1) inp.d = true;
    }

    // Retreat when low
    if (m.hp < m.maxHp * 0.25) this._retreat(gs, p, m, inp);

    // Combat
    const enemyInvul = em.invTimer > 0 || em.dashing;
    if (dEn < 450 && m.shootCd <= 0 && !enemyInvul) inp.lmb = true;
    if (gs.energy[p] < C.BULLET_COST + 5) inp.lmb = false;
    if (dEn < 70 && m.meleeCd <= 0) inp.rmb = true;
    if (dEn > 100 && dEn < 300 && m.dashCd <= 0 && (Math.random() < 0.06 || em.hp < em.maxHp * 0.4)) inp.space = true;
    if (dEn < 60 && m.hp < 40 && m.dashCd <= 0 && Math.random() < 0.06) inp.space = true;

    // Parry vs nearby bullets
    for (const b of gs.bullets) {
      if (b.owner === p) continue;
      if (Math.hypot(b.x - m.x, b.y - m.y) < 180) { inp.q = true; break; }
    }
    for (const b of gs.tBullets) {
      if (b.owner === p) continue;
      if (Math.hypot(b.x - m.x, b.y - m.y) < 180) { inp.q = true; break; }
    }

    // Building
    this._build(gs, p, inp);
    // Upgrades
    this._upgrade(gs, p, inp);

    return inp;
  },

  _attackCore(gs, p, m, eco, inp) {
    inp.mx = eco.x + CC.rng(-20, 20);
    inp.my = eco.y + CC.rng(-20, 20);
    const dCore = Math.hypot(m.x - eco.x, m.y - eco.y);
    const aCore = Math.atan2(eco.y - m.y, eco.x - m.x);
    if (dCore > 80) {
      if (Math.cos(aCore) > 0.1) inp.d = true;
      if (Math.cos(aCore) < -0.1) inp.a = true;
      if (Math.sin(aCore) > 0.1) inp.s = true;
      if (Math.sin(aCore) < -0.1) inp.w = true;
    }
    if (dCore < C.CORE_SIZE / 2 + C.MELEE_RANGE && m.meleeCd <= 0) inp.rmb = true;
    if (dCore < 500 && m.shootCd <= 0) inp.lmb = true;
    if (dCore > 60 && dCore < 300 && m.dashCd <= 0 && Math.random() < 0.06) inp.space = true;

    this._build(gs, p, inp);
    this._upgrade(gs, p, inp);
    return inp;
  },

  _retreat(gs, p, m, inp) {
    const corePos = gs.cores[p];
    const dCore = Math.hypot(m.x - corePos.x, m.y - corePos.y);
    const aCore = Math.atan2(corePos.y - m.y, corePos.x - m.x);
    if (dCore > 150) {
      if (Math.cos(aCore) > 0.1) inp.d = true;
      if (Math.cos(aCore) < -0.1) inp.a = true;
      if (Math.sin(aCore) > 0.1) inp.s = true;
      if (Math.sin(aCore) < -0.1) inp.w = true;
    }
    if (m.dashCd <= 0 && dCore > 120) inp.space = true;
  },

  _build(gs, p, inp) {
    this.timer -= C.TICK;
    if (this.timer > 0) return;
    this.timer = CC.rng(0.5, 1.5);

    // Connect to uncaptured nodes
    const un = gs.nodes.filter(n => n.owner !== p);
    if (un.length > 0) {
      const nd = un[CC.rngInt(0, un.length - 1)];
      const cc = CC.toGrid(gs.cores[p].x, gs.cores[p].y);
      let cx = cc.gx, cy = cc.gy;
      const steps = CC.rngInt(2, 5);
      for (let s = 0; s < steps; s++) {
        const dx = Math.sign(nd.gx - cx), dy = Math.sign(nd.gy - cy);
        if (Math.abs(nd.gx - cx) > Math.abs(nd.gy - cy)) cx += dx; else cy += dy;
        if (CC.canPlaceBuild(gs, p, cx, cy, 1)) { CC.placeBuild(gs, p, cx, cy, 1); CC.Sound.play('building'); }
        else break;
      }
    }

    // Turrets near connected conveyors
    if (gs.energy[p] > C.TURR_COST + 10 && Math.random() < 0.4) {
      const myConvs = gs.buildings.filter(b => b.owner === p && b.type === 1 && b.connected);
      if (myConvs.length > 0) {
        const conv = myConvs[CC.rngInt(0, myConvs.length - 1)];
        for (let tries = 0; tries < 8; tries++) {
          const gx = conv.gx + CC.rngInt(-2, 2), gy = conv.gy + CC.rngInt(-2, 2);
          if (CC.canPlaceBuild(gs, p, gx, gy, 3)) { CC.placeBuild(gs, p, gx, gy, 3); CC.Sound.play('building'); break; }
        }
      }
    }

    // Walls between cores
    if (gs.energy[p] > C.WALL_COST + 10 && Math.random() < 0.4) {
      const cc = CC.toGrid(gs.cores[p].x, gs.cores[p].y);
      const ec = CC.toGrid(gs.cores[1 - p].x, gs.cores[1 - p].y);
      const midGx = Math.round((cc.gx + ec.gx) / 2), midGy = Math.round((cc.gy + ec.gy) / 2);
      for (let tries = 0; tries < 12; tries++) {
        const gx = midGx + CC.rngInt(-3, 3), gy = midGy + CC.rngInt(-4, 4);
        if (CC.canPlaceBuild(gs, p, gx, gy, 2)) { CC.placeBuild(gs, p, gx, gy, 2); CC.Sound.play('building'); break; }
      }
    }

    // Spawners near core
    if (gs.energy[p] > C.SPAWNER_COST + 15 && Math.random() < 0.25) {
      const cc = CC.toGrid(gs.cores[p].x, gs.cores[p].y);
      for (let tries = 0; tries < 12; tries++) {
        const gx = cc.gx + CC.rngInt(-5, 5), gy = cc.gy + CC.rngInt(-5, 5);
        if (CC.canPlaceBuild(gs, p, gx, gy, 4)) { CC.placeBuild(gs, p, gx, gy, 4); CC.Sound.play('building'); break; }
      }
    }

    // Rebuild walls when low on buildings
    if (gs.buildings.length < 10 && gs.energy[p] > C.WALL_COST + 5 && Math.random() < 0.5) {
      const cc = CC.toGrid(gs.cores[p].x, gs.cores[p].y);
      for (let tries = 0; tries < 8; tries++) {
        const gx = cc.gx + CC.rngInt(-4, 4), gy = cc.gy + CC.rngInt(-4, 4);
        if (CC.canPlaceBuild(gs, p, gx, gy, 2)) { CC.placeBuild(gs, p, gx, gy, 2); CC.Sound.play('building'); break; }
      }
    }

    // Target enemy disconnected conveyors
    const enemyDisc = gs.buildings.filter(b => b.owner === 1 - p && b.type === 1 && !b.connected);
    if (enemyDisc.length > 0 && gs.energy[p] > C.BULLET_COST) {
      const tgt = enemyDisc[0];
      inp.mx = tgt.gx * C.CELL + C.CELL / 2;
      inp.my = tgt.gy * C.CELL + C.CELL / 2;
    }
  },

  _upgrade(gs, p, inp) {
    const e = gs.energy[p];
    if (e > 150) {
      if (gs.upgStrike[p] < C.MAX_UPG_LEVEL && e > C.UPG_STRIKE_COSTS[gs.upgStrike[p]] + 50 && Math.random() < 0.05) inp.upgE = true;
      if (gs.upgBullet[p] < C.MAX_UPG_LEVEL && e > C.UPG_BULLET_COSTS[gs.upgBullet[p]] + 50 && Math.random() < 0.05) inp.upgR = true;
      if (gs.upgFort[p] < C.MAX_UPG_LEVEL && e > C.UPG_FORT_COSTS[gs.upgFort[p]] + 50 && Math.random() < 0.04) inp.upgF = true;
    } else {
      if (gs.upgStrike[p] < C.MAX_UPG_LEVEL && e > C.UPG_STRIKE_COSTS[gs.upgStrike[p]] + 30 && Math.random() < 0.015) inp.upgE = true;
      if (gs.upgBullet[p] < C.MAX_UPG_LEVEL && e > C.UPG_BULLET_COSTS[gs.upgBullet[p]] + 30 && Math.random() < 0.015) inp.upgR = true;
      if (gs.upgFort[p] < C.MAX_UPG_LEVEL && e > C.UPG_FORT_COSTS[gs.upgFort[p]] + 30 && Math.random() < 0.01) inp.upgF = true;
    }
  },
};

window.CC = CC;



/* === network.js === */

/**
 * CONVEYOR CLASH v15 — Networking
 * Dual-transport: WebSocket (primary) + HTTP polling (fallback).
 * Relay server management, room create/join, ping, reconnect.
 */

CC.Net = {
  // State
  ws: null,
  transport: null,       // 'ws' | 'poll'
  isHost: false,
  hostIndex: 0,          // myIndex
  connected: false,
  roomId: null,
  practiceMode: false,

  // Remote input (guest → host)
  remoteInput: null,
  lastInputSent: 0,

  // Polling
  pollSessionId: null,
  pollRunning: false,

  // Ping
  pingMs: 0,
  lastPingTime: 0,
  pingTimer: null,

  // Reconnect
  reconnectTimer: null,

  // URLs
  relayUrl: '',
  httpBase: '',

  /**
   * Read relay URL from DOM inputs
   */
  readRelayInput() {
    const inp = document.getElementById('relay-url-input');
    if (inp && inp.value.trim()) this.relayUrl = inp.value.trim();
  },

  /**
   * Derive HTTP base from WS URL (or vice versa)
   */
  deriveHttpBase() {
    if (!this.relayUrl) { this.httpBase = ''; return; }
    if (this.relayUrl.startsWith('wss://'))      { this.httpBase = 'https://' + this.relayUrl.slice(6); }
    else if (this.relayUrl.startsWith('ws://'))  { this.httpBase = 'http://' + this.relayUrl.slice(5); }
    else if (this.relayUrl.startsWith('https://')) { this.httpBase = this.relayUrl; this.relayUrl = 'wss://' + this.relayUrl.slice(8); }
    else if (this.relayUrl.startsWith('http://'))  { this.httpBase = this.relayUrl; this.relayUrl = 'ws://' + this.relayUrl.slice(7); }
    else { this.httpBase = 'https://' + this.relayUrl; this.relayUrl = 'wss://' + this.relayUrl; }
  },

  /**
   * Resolve relay URLs from config or URL params
   */
  resolveUrls() {
    const params = new URLSearchParams(location.search);
    if (params.has('relay')) {
      this.relayUrl = params.get('relay');
      this.deriveHttpBase();
      return;
    }
    const sel = document.getElementById('relay-select');
    if (sel && sel.value === 'custom') {
      this.readRelayInput();
      if (this.relayUrl) { this.deriveHttpBase(); return; }
    }
    const D = CC.CONFIG.DEFAULT_RELAY_URL;
    if (D) { this.relayUrl = D; this.deriveHttpBase(); return; }
    // Fallback: derive from page origin
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hproto = location.protocol === 'https:' ? 'https:' : 'http:';
    this.relayUrl = proto + '//' + location.hostname + ':3042';
    this.httpBase = hproto + '//' + location.hostname + ':3042';
  },

  /**
   * Send a JSON message via active transport
   */
  send(msg) {
    if (this.transport === 'ws' && this.ws && this.ws.readyState === WebSocket.OPEN) {
      try { this.ws.send(JSON.stringify(msg)); } catch (e) {}
    } else if (this.transport === 'poll' && this.pollSessionId) {
      fetch(this.httpBase + '/poll/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: this.pollSessionId, ...msg }),
      }).catch(() => {});
    }
  },

  // ---- Ping ----
  sendPing() {
    if (!this.connected) return;
    this.lastPingTime = performance.now();
    this.send({ action: 'ping' });
    if (this.pingTimer) clearTimeout(this.pingTimer);
    this.pingTimer = setTimeout(() => this.sendPing(), 2000);
  },

  // ---- Health check ----
  async preWarm() {
    if (!this.httpBase) return false;
    try {
      const r = await fetch(this.httpBase + '/health', { cache: 'no-store', signal: AbortSignal.timeout(5000) });
      const data = await r.json();
      return data.status === 'ok';
    } catch (e) { return false; }
  },

  // ---- Polling Transport ----
  async pollOpen(msg) {
    try {
      const r = await fetch(this.httpBase + '/poll/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      const data = await r.json();
      if (data.sessionId) {
        this.pollSessionId = data.sessionId;
        this.transport = 'poll';
        this.pollRunning = true;
        this.connected = true;
        if (data.messages) data.messages.forEach(m => CC.Net._handleMessage(m));
        this._pollLoop();
        return true;
      }
    } catch (e) {}
    return false;
  },

  _pollLoop() {
    if (!this.pollRunning || !this.pollSessionId || this.transport !== 'poll') return;
    fetch(this.httpBase + '/poll/recv?sessionId=' + this.pollSessionId, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (data.messages) data.messages.forEach(m => CC.Net._handleMessage(m));
        if (this.pollRunning) this._pollLoop();
      })
      .catch(() => { if (this.pollRunning) setTimeout(() => this._pollLoop(), 500); });
  },

  async pollClose() {
    this.pollRunning = false;
    if (this.pollSessionId) {
      try {
        await fetch(this.httpBase + '/poll/close', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: this.pollSessionId }),
        });
      } catch (e) {}
      this.pollSessionId = null;
    }
  },

  // ---- Connect ----
  connect(onOpen) {
    if (this.ws) { try { this.ws.close(); } catch (e) {} }
    this.pollRunning = false; this.pollSessionId = null;
    this.resolveUrls();

    const rs = document.getElementById('relay-status');
    if (rs) { rs.textContent = 'Relay: connecting...'; rs.className = 'relay-status'; }
    document.getElementById('status').textContent = 'Connecting to relay...';

    this.preWarm().then(warmed => {
      try {
        this.ws = new WebSocket(this.relayUrl);
      } catch (e) {
        this._connectViaPolling(onOpen);
        return;
      }

      const wsTimeout = setTimeout(() => {
        if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
          try { this.ws.close(); } catch (e) {}
          this.ws = null;
          this._connectViaPolling(onOpen);
        }
      }, 4000);

      this.ws.onopen = () => {
        clearTimeout(wsTimeout);
        this.transport = 'ws';
        this.connected = true;
        if (rs) { rs.textContent = 'Relay: WS connected'; rs.className = 'relay-status connected'; }
        this.sendPing();
        if (onOpen) onOpen();
      };

      this.ws.onmessage = (e) => {
        let data;
        try { data = JSON.parse(e.data); } catch (err) { return; }
        this._handleMessage(data);
      };

      this.ws.onclose = () => {
        clearTimeout(wsTimeout);
        this.connected = false;
        if (this.transport === 'ws') {
          if (rs) { rs.textContent = 'Relay: disconnected'; rs.className = 'relay-status error'; }
          // Auto-reconnect during active game
          if (CC.gameState && CC.gameState.phase !== 'gameover' && CC.gameState.phase !== 'menu' && !this.practiceMode) {
            CC.addBuildFlash(CC.CONFIG.W / 2, CC.CONFIG.H / 2, 'RECONNECTING...', 2.0);
            if (!this.reconnectTimer) {
              this.reconnectTimer = setTimeout(() => {
                this.reconnectTimer = null;
                if (CC.gameState && CC.gameState.phase !== 'gameover' && !this.practiceMode) {
                  CC.Net.connect(() => {
                    if (CC.Net.isHost) {
                      CC.Net.send({ action: 'create' });
                    } else {
                      const rid = CC.Net.roomId || document.getElementById('join-input').value.trim().toUpperCase();
                      if (rid) CC.Net.send({ action: 'join', roomId: rid });
                    }
                  });
                }
              }, 2000);
            }
          }
        }
      };

      this.ws.onerror = () => { clearTimeout(wsTimeout); };
    });
  },

  async _connectViaPolling(onOpen) {
    const rs = document.getElementById('relay-status');
    if (rs) { rs.textContent = 'Relay: trying polling...'; rs.className = 'relay-status'; }
    document.getElementById('status').textContent = 'Trying HTTP polling...';
    const ok = await this.pollOpen({ action: '_open' });
    if (ok) {
      if (rs) { rs.textContent = 'Relay: POLL connected'; rs.className = 'relay-status connected'; }
      document.getElementById('status').textContent = '';
      if (onOpen) onOpen();
    } else {
      this.connected = false;
      if (rs) { rs.textContent = 'Relay: error'; rs.className = 'relay-status error'; }
      document.getElementById('status').textContent = 'Cannot connect to relay server.';
    }
  },

  // ---- Message Handler ----
  _handleMessage(data) {
    const C = CC.CONFIG;
    switch (data.action) {
      case 'created':
        this.roomId = data.roomId;
        document.getElementById('menu').style.display = 'none';
        document.getElementById('waiting-screen').style.display = 'flex';
        document.getElementById('waiting-room-id').textContent = this.roomId;
        document.getElementById('status').textContent = '';
        break;

      case 'joined':
        this.roomId = data.roomId;
        document.getElementById('status').textContent = 'Connected! Waiting for game state...';
        break;

      case 'peer_connected':
        document.getElementById('status').textContent = 'Opponent connected!';
        document.getElementById('waiting-screen').style.display = 'none';
        document.getElementById('menu').style.display = 'none';
        CC.gameState = CC.createGameState();
        CC.startGameTicks();
        CC.canvas.focus();
        this.send({ action: 'data', payload: { t: 's', s: CC.stripStateForNetwork(CC.gameState) } });
        break;

      case 'data':
        if (this.isHost) {
          if (data.payload && data.payload.t === 'i') {
            this.remoteInput = {
              w: !!data.payload.w, a: !!data.payload.a, s: !!data.payload.s, d: !!data.payload.d,
              space: !!data.payload.space, q: !!data.payload.q,
              mx: data.payload.mx, my: data.payload.my,
              lmb: !!data.payload.lmb, rmb: !!data.payload.rmb,
              buildMode: data.payload.buildMode || 0,
              upgE: !!data.payload.upgE, upgR: !!data.payload.upgR, upgF: !!data.payload.upgF,
            };
            if (data.payload.playerShape) CC.playerShape = data.payload.playerShape;
            if (data.payload.playerColor) CC.playerColor = data.payload.playerColor;
          }
        } else {
          if (data.payload && data.payload.t === 's') {
            CC.gameState = data.payload.s;
            if (CC.gameState && !CC.gameState.particles) CC.gameState.particles = [];
            CC.Guest.setState(CC.gameState);
            if (!CC.gameTickInterval) CC.startGameTicks();
            if (CC.gameState && CC.gameState.phase !== 'menu') {
              document.getElementById('menu').style.display = 'none';
              document.getElementById('waiting-screen').style.display = 'none';
              CC.canvas.focus();
            }
          }
        }
        break;

      case 'peer_disconnected':
        if (CC.gameState && CC.gameState.phase !== 'gameover') {
          CC.gameState.phase = 'gameover';
          CC.gameState.winner = this.hostIndex;
          CC.addBuildFlash(CC.CONFIG.W / 2, CC.CONFIG.H / 2, 'OPPONENT DISCONNECTED — YOU WIN!', 5);
        }
        break;

      case 'error':
        document.getElementById('status').textContent = 'Error: ' + data.message;
        if (data.message && (data.message.includes('not found') || data.message.includes('Room not found'))) {
          document.getElementById('waiting-screen').style.display = 'none';
          document.getElementById('menu').style.display = 'flex';
        }
        break;

      case 'pong':
        this.pingMs = Math.round(performance.now() - this.lastPingTime);
        break;
    }
  },

  // ---- Disconnect ----
  disconnect() {
    if (this.ws) { try { this.ws.close(); } catch (e) {} }
    this.ws = null;
    this.pollClose();
    this.transport = null;
    this.connected = false;
    this.roomId = null;
    if (this.pingTimer) { clearTimeout(this.pingTimer); this.pingTimer = null; }
    if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
  },
};

window.CC = CC;



/* === renderer.js === */

/**
 * CONVEYOR CLASH v15 — Renderer
 * All canvas drawing: grid, buildings, mechs, cores, nodes, bullets, mobs,
 * power-ups, lava, particles, effects, HUD.
 */
const C = CC.CONFIG;

CC.Renderer = {
  ctx: null,
  W: C.W, H: C.H,

  init(canvas) {
    this.ctx = canvas.getContext('2d');
    canvas.width = C.W; canvas.height = C.H;
    CC.canvas = canvas;
  },

  render(gs) {
    const ctx = this.ctx;
    const shakeX = CC.UI.shakeX, shakeY = CC.UI.shakeY;
    ctx.save();
    ctx.translate(shakeX, shakeY);
    ctx.fillStyle = '#0a0a1e';
    ctx.fillRect(-10, -10, C.W + 20, C.H + 20);

    this._drawGrid(ctx);
    this._drawTerritory(ctx);
    this._drawLava(ctx, gs);
    this._drawBuildFlashes(ctx);
    this._drawBuildings(ctx, gs);
    this._drawNodes(ctx, gs);
    this._drawPowerUps(ctx, gs);
    this._drawCores(ctx, gs);
    this._drawBullets(ctx, gs);
    this._drawMobs(ctx, gs);
    this._drawMechs(ctx, gs);
    this._drawParticles(ctx, gs);
    CC.UI.drawFloatingTexts(ctx);
    CC.UI.drawKillFeed(ctx);
    this._drawBuildPreview(ctx, gs);
    this._drawHUD(ctx, gs);
    ctx.restore();
  },

  _drawGrid(ctx) {
    ctx.strokeStyle = '#181835'; ctx.lineWidth = 0.5;
    for (let x = 0; x <= C.W; x += C.CELL) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, C.H); ctx.stroke(); }
    for (let y = 0; y <= C.H; y += C.CELL) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(C.W, y); ctx.stroke(); }
  },

  _drawTerritory(ctx) {
    ctx.fillStyle = 'rgba(0,80,120,0.08)'; ctx.fillRect(0, 0, C.W / 2, C.H);
    ctx.fillStyle = 'rgba(120,60,0,0.08)'; ctx.fillRect(C.W / 2, 0, C.W / 2, C.H);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(C.W / 2, 0); ctx.lineTo(C.W / 2, C.H); ctx.stroke(); ctx.setLineDash([]);
    const g1 = ctx.createLinearGradient(0, 0, C.W / 2, 0); g1.addColorStop(0, 'rgba(0,150,255,0.06)'); g1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g1; ctx.fillRect(0, 0, C.W / 2, C.H);
    const g2 = ctx.createLinearGradient(C.W / 2, 0, C.W, 0); g2.addColorStop(0, 'rgba(0,0,0,0)'); g2.addColorStop(1, 'rgba(255,100,0,0.06)');
    ctx.fillStyle = g2; ctx.fillRect(C.W / 2, 0, C.W / 2, C.H);
  },

  _drawLava(ctx, gs) {
    const lavaMinY = gs.lavaY, lavaMaxY = lavaMinY + 4;
    const lavaPulse = 0.15 + 0.1 * Math.sin(CC.animTime * 3);
    const lavaX = C.LAVA_COLS_MIN * C.CELL, lavaW = (C.LAVA_COLS_MAX - C.LAVA_COLS_MIN + 1) * C.CELL;
    const lavaYp = lavaMinY * C.CELL, lavaH = (lavaMaxY - lavaMinY + 1) * C.CELL;

    const lg = ctx.createRadialGradient(lavaX + lavaW / 2, lavaYp + lavaH / 2, 20, lavaX + lavaW / 2, lavaYp + lavaH / 2, Math.max(lavaW, lavaH));
    lg.addColorStop(0, 'rgba(255,60,0,' + lavaPulse + ')');
    lg.addColorStop(0.5, 'rgba(200,30,0,' + lavaPulse * 0.5 + ')');
    lg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lg; ctx.fillRect(lavaX - 60, lavaYp - 60, lavaW + 120, lavaH + 120);
    ctx.fillStyle = 'rgba(180,40,0,' + (0.2 + lavaPulse) + ')';
    ctx.fillRect(lavaX, lavaYp, lavaW, lavaH);

    ctx.save();
    for (let hy = lavaYp; hy < lavaYp + lavaH; hy += 8) {
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#f80';
      ctx.fillRect(lavaX + Math.sin(CC.animTime * 3 + hy * 0.1) * 2, hy, lavaW, 4);
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,100,0,' + (0.4 + lavaPulse) + ')'; ctx.lineWidth = 3;
    ctx.strokeRect(lavaX, lavaYp, lavaW, lavaH);

    const bubbles = CC.UI.lavaBubbles;
    for (let bi = bubbles.length - 1; bi >= 0; bi--) {
      const lb = bubbles[bi];
      const a = CC.clamp(lb.life / lb.maxLife, 0, 1);
      ctx.fillStyle = 'rgba(255,120,0,' + a * 0.8 + ')';
      ctx.beginPath(); ctx.arc(lb.x, lb.y, 3 * a, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,100,0,0.6)'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
    ctx.fillText('LAVA ZONE', lavaX + lavaW / 2, lavaYp - 8);
    ctx.fillText('-' + C.LAVA_DMG_PER_SEC + '/s', lavaX + lavaW / 2, lavaYp + lavaH + 14);
  },

  _drawBuildFlashes(ctx) {
    for (const f of CC.UI.buildFlashes) {
      if (f.msg) {
        const a = Math.min(1, f.timer / f.maxTimer);
        ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(f.x - 200, f.y - 25, 400, 50);
        ctx.strokeStyle = '#ff0'; ctx.lineWidth = 2; ctx.strokeRect(f.x - 200, f.y - 25, 400, 50);
        ctx.fillStyle = 'rgba(255,255,0,' + a + ')'; ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(f.msg, f.x, f.y);
      } else {
        const a = f.timer / f.maxTimer;
        ctx.fillStyle = 'rgba(255,255,255,' + a * 0.5 + ')';
        ctx.fillRect(f.x - C.CELL / 2 - 4, f.y - C.CELL / 2 - 4, C.CELL + 8, C.CELL + 8);
      }
    }
  },

  // ---- Buildings ----
  _drawBuildings(ctx, gs) {
    for (const b of gs.buildings) {
      switch (b.type) {
        case 1: this._drawConveyor(ctx, gs, b); break;
        case 2: this._drawWall(ctx, b); break;
        case 3: this._drawTurret(ctx, gs, b); break;
        case 4: this._drawSpawner(ctx, b); break;
      }
    }
    ctx.globalAlpha = 1;
  },

  _drawConveyor(ctx, gs, b) {
    const bc = CC.gridCtr(b.gx, b.gy), conn = b.connected;
    const fill = CC.pcc(b.owner, conn), bdr = CC.pcb(b.owner, conn);
    ctx.fillStyle = fill;
    ctx.fillRect(bc.x - C.CELL / 2 + 2, bc.y - C.CELL / 2 + 2, C.CELL - 4, C.CELL - 4);
    if (conn) {
      ctx.fillStyle = b.owner === 0 ? 'rgba(0,255,255,0.12)' : 'rgba(255,160,0,0.12)';
      ctx.fillRect(bc.x - C.CELL / 2 + 2, bc.y - C.CELL / 2 + 2, C.CELL - 4, C.CELL - 4);
    }
    ctx.strokeStyle = bdr; ctx.lineWidth = conn ? 3 : 2;
    ctx.strokeRect(bc.x - C.CELL / 2 + 2, bc.y - C.CELL / 2 + 2, C.CELL - 4, C.CELL - 4);
    if (conn) {
      ctx.fillStyle = '#0f0'; ctx.beginPath(); ctx.arc(bc.x, bc.y, 4, 0, Math.PI * 2); ctx.fill();
      // Animated arrows
      ctx.save(); ctx.translate(bc.x, bc.y);
      const co = gs.cores[b.owner];
      const ang = Math.atan2(co.y - bc.y, co.x - bc.x);
      const snap = Math.round(ang / (Math.PI / 2)) * (Math.PI / 2);
      ctx.rotate(snap);
      const offset = (CC.animTime * 120) % 28;
      ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.7;
      for (let i = -1; i <= 1; i++) {
        const ox = -14 + i * 28 + offset;
        if (ox > -C.CELL / 2 && ox < C.CELL / 2) {
          ctx.beginPath(); ctx.moveTo(ox - 5, -4); ctx.lineTo(ox + 5, 0); ctx.lineTo(ox - 5, 4); ctx.fill();
        }
      }
      ctx.globalAlpha = 1; ctx.restore();
    } else {
      ctx.fillStyle = '#f44'; ctx.globalAlpha = 0.6;
      ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('x', bc.x, bc.y); ctx.globalAlpha = 1;
    }
  },

  _drawWall(ctx, b) {
    const bc = CC.gridCtr(b.gx, b.gy);
    ctx.fillStyle = CC.pwc(b.owner); ctx.fillRect(bc.x - C.CELL / 2 + 1, bc.y - C.CELL / 2 + 1, C.CELL - 2, C.CELL - 2);
    ctx.strokeStyle = CC.pwb(b.owner); ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.5;
    for (let i = -1; i <= 2; i++) {
      const ox = i * 14;
      ctx.beginPath(); ctx.moveTo(bc.x - C.CELL / 2 + ox, bc.y - C.CELL / 2);
      ctx.lineTo(bc.x - C.CELL / 2 + ox + 14, bc.y + C.CELL / 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bc.x - C.CELL / 2 + ox, bc.y + C.CELL / 2);
      ctx.lineTo(bc.x - C.CELL / 2 + ox + 14, bc.y - C.CELL / 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = CC.pwb(b.owner); ctx.lineWidth = 3;
    ctx.strokeRect(bc.x - C.CELL / 2 + 1, bc.y - C.CELL / 2 + 1, C.CELL - 2, C.CELL - 2);
    this._hpBar(ctx, bc.x - C.CELL / 2, bc.y - C.CELL / 2 - 8, C.CELL, 5, b.hp, b.maxHp);
  },

  _drawTurret(ctx, gs, b) {
    const bc = CC.gridCtr(b.gx, b.gy), col = CC.ptb(b.owner);
    // Range circle
    ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.globalAlpha = 0.15;
    ctx.beginPath(); ctx.arc(bc.x, bc.y, C.TURR_RANGE, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([4, 8]); ctx.globalAlpha = 0.08;
    ctx.beginPath(); ctx.arc(bc.x, bc.y, C.TURR_RANGE, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    // Body
    const ts = 14;
    ctx.fillStyle = CC.ptc(b.owner); ctx.fillRect(bc.x - ts, bc.y - ts, ts * 2, ts * 2);
    ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.strokeRect(bc.x - ts, bc.y - ts, ts * 2, ts * 2);
    // Diamond center
    ctx.fillStyle = col; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.moveTo(bc.x, bc.y - 8); ctx.lineTo(bc.x + 6, bc.y); ctx.lineTo(bc.x, bc.y + 8); ctx.lineTo(bc.x - 6, bc.y); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    // Barrel
    const ep = 1 - b.owner, em = gs.mechs[ep];
    let aimAng = Math.atan2(em.y - bc.y, em.x - bc.x);
    if (em.dead) aimAng = Math.atan2(gs.cores[ep].y - bc.y, gs.cores[ep].x - bc.x);
    ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(bc.x, bc.y); ctx.lineTo(bc.x + Math.cos(aimAng) * 22, bc.y + Math.sin(aimAng) * 22); ctx.stroke();
    ctx.lineCap = 'butt';
    this._hpBar(ctx, bc.x - C.CELL / 2, bc.y - C.CELL / 2 - 8, C.CELL, 5, b.hp, b.maxHp);
  },

  _drawSpawner(ctx, b) {
    const bc = CC.gridCtr(b.gx, b.gy);
    ctx.save(); ctx.translate(bc.x, bc.y); ctx.rotate(Math.PI / 4);
    const sz = 14;
    ctx.fillStyle = CC.psc(b.owner); ctx.fillRect(-sz, -sz, sz * 2, sz * 2);
    ctx.strokeStyle = CC.psb(b.owner); ctx.lineWidth = 2; ctx.strokeRect(-sz, -sz, sz * 2, sz * 2);
    ctx.restore();
    ctx.fillStyle = CC.psb(b.owner); ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('S', bc.x, bc.y + 1);
    this._hpBar(ctx, bc.x - C.CELL / 2, bc.y - C.CELL / 2 - 8, C.CELL, 5, b.hp, b.maxHp);
  },

  _hpBar(ctx, x, y, w, h, hp, maxHp) {
    if (hp >= maxHp) return;
    const pct = hp / maxHp;
    ctx.fillStyle = '#300'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#0c0'; ctx.fillRect(x, y, w * pct, h);
  },

  // ---- Nodes ----
  _drawNodes(ctx, gs) {
    const Col = CC.COLORS;
    for (const n of gs.nodes) {
      const nc = CC.gridCtr(n.gx, n.gy);
      const col = n.owner === 0 ? Col.P1.C : n.owner === 1 ? Col.P2.C : '#8a8';
      const isCenter = n.ownerPriority === -1;
      const glow = n.owner === 0 ? 'rgba(0,255,255,0.2)' : n.owner === 1 ? 'rgba(255,100,0,0.2)' : 'rgba(100,140,100,0.15)';
      const pulse = 1 + Math.sin(CC.animTime * 2.5) * 0.15;

      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(nc.x, nc.y, 30 * pulse, 0, Math.PI * 2); ctx.fill();

      if (n.owner >= 0) {
        const cp = 0.3 + 0.25 * Math.sin(CC.animTime * 3 + n.gx);
        ctx.strokeStyle = n.owner === 0 ? 'rgba(0,255,255,' + cp + ')' : 'rgba(255,102,0,' + cp + ')';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = Math.PI / 3 * i - Math.PI / 6;
          const px = nc.x + 26 * Math.cos(a), py = nc.y + 26 * Math.sin(a);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      }

      ctx.fillStyle = n.owner === 0 ? '#0a3a3a' : n.owner === 1 ? '#3a1a0a' : '#1a1a1a';
      ctx.strokeStyle = col; ctx.lineWidth = isCenter ? 4 : 3;

      if (isCenter) {
        const sides = 8, rot = -Math.PI / 8;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const a = Math.PI / 4 * i + rot;
          const px = nc.x + 22 * Math.cos(a), py = nc.y + 22 * Math.sin(a);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
      } else {
        const sides = 6, rot = -Math.PI / 6;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const a = Math.PI / 3 * i + rot;
          const px = nc.x + 20 * Math.cos(a), py = nc.y + 20 * Math.sin(a);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
      }

      ctx.fillStyle = col; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('E', nc.x, nc.y + 1);

      if (n.owner >= 0) {
        ctx.fillStyle = col; ctx.font = 'bold 9px monospace';
        ctx.fillText('P' + (n.owner + 1), nc.x, nc.y + 26);
      } else {
        ctx.fillStyle = '#666'; ctx.font = '8px monospace';
        ctx.fillText(isCenter ? 'CONTESTED' : 'NEUTRAL', nc.x, nc.y + 26);
      }

      ctx.fillStyle = col; ctx.globalAlpha = 0.4; ctx.font = '7px monospace';
      ctx.fillText(isCenter ? 'CENTER' : 'NRG NODE', nc.x, nc.y - 24); ctx.globalAlpha = 1;
    }
  },

  // ---- Power-Ups ----
  _drawPowerUps(ctx, gs) {
    if (!gs.powerUps) return;
    for (const pu of gs.powerUps) {
      const pulse = 1 + Math.sin(pu.pulsePhase) * 0.2;
      const col = pu.type === C.PU_SPEED ? '#0f0' : pu.type === C.PU_SHIELD ? '#08f' : '#f44';
      const glow = pu.type === C.PU_SPEED ? 'rgba(0,255,0,' : pu.type === C.PU_SHIELD ? 'rgba(0,128,255,' : 'rgba(255,60,60,';
      ctx.fillStyle = glow + (0.1 + 0.05 * Math.sin(pu.pulsePhase)) + ')';
      ctx.beginPath(); ctx.arc(pu.x, pu.y, 20 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.beginPath(); ctx.arc(pu.x, pu.y, 12, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(pu.x, pu.y, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = col; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(pu.type === C.PU_SPEED ? 'S' : pu.type === C.PU_SHIELD ? 'D' : 'R', pu.x, pu.y);
      const tPct = pu.timer / 30;
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(pu.x - 10, pu.y + 14, 20, 3);
      ctx.fillStyle = col; ctx.fillRect(pu.x - 10, pu.y + 14, 20 * tPct, 3);
    }
  },

  // ---- Cores ----
  _drawCores(ctx, gs) {
    for (let p = 0; p < 2; p++) {
      const co = gs.cores[p], col = CC.pcol(p), bg = CC.pbg(p);
      const defenderDead = gs.mechs[p].dead;

      // Tendrils
      const numT = 6; const hpPct = co.hp / co.maxHp;
      for (let t = 0; t < numT; t++) {
        const baseA = Math.PI * 2 / numT * t + CC.animTime * 0.5;
        const len = 16 + 12 * Math.sin(CC.animTime * 3 + t * 1.5) + 8 * hpPct;
        ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.3 + 0.1 * Math.sin(CC.animTime * 4 + t);
        ctx.beginPath(); ctx.moveTo(co.x, co.y);
        for (let s = 1; s <= 5; s++) {
          const frac = s / 5;
          const wobble = Math.sin(CC.animTime * 5 + t * 2 + s * 0.8) * 6 * frac;
          ctx.lineTo(co.x + Math.cos(baseA) * len * frac + Math.cos(baseA + Math.PI / 2) * wobble,
            co.y + Math.sin(baseA) * len * frac + Math.sin(baseA + Math.PI / 2) * wobble);
        }
        ctx.stroke();
        ctx.globalAlpha = 0.5 + 0.2 * Math.sin(CC.animTime * 6 + t * 3);
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(co.x + Math.cos(baseA) * len, co.y + Math.sin(baseA) * len, 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Rotating rings
      for (let ring = 0; ring < 2; ring++) {
        const ringR = C.CORE_SIZE / 2 + 12 + ring * 12;
        const rot = CC.animTime * (ring === 0 ? 0.5 : -0.3);
        ctx.strokeStyle = col; ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.2 + 0.15 * Math.sin(CC.animTime * 3 + ring * 2);
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const a = Math.PI / 4 * i + rot;
          i === 0 ? ctx.moveTo(co.x + Math.cos(a) * ringR, co.y + Math.sin(a) * ringR)
            : ctx.lineTo(co.x + Math.cos(a) * ringR, co.y + Math.sin(a) * ringR);
        }
        ctx.closePath(); ctx.stroke(); ctx.globalAlpha = 1;
      }

      // Vuln glow
      if (defenderDead) {
        ctx.strokeStyle = 'rgba(255,0,0,' + (0.3 + Math.sin(CC.animTime * 6) * 0.2) + ')';
        ctx.lineWidth = 4;
        ctx.strokeRect(co.x - C.CORE_SIZE / 2 - 6, co.y - C.CORE_SIZE / 2 - 6, C.CORE_SIZE + 12, C.CORE_SIZE + 12);
      }

      // Ambient glow
      ctx.fillStyle = p === 0 ? 'rgba(0,255,255,0.15)' : 'rgba(255,100,0,0.15)';
      ctx.fillRect(co.x - C.CORE_SIZE / 2 - 8, co.y - C.CORE_SIZE / 2 - 8, C.CORE_SIZE + 16, C.CORE_SIZE + 16);

      // Main body
      const pls = Math.sin(CC.animTime * 3) * 3;
      const hs = (C.CORE_SIZE / 2 + pls / 2) * (1 + Math.sin(CC.animTime * 2.5) * 0.04);
      ctx.fillStyle = bg; ctx.fillRect(co.x - hs, co.y - hs, hs * 2, hs * 2);
      ctx.strokeStyle = defenderDead ? '#f44' : col;
      ctx.lineWidth = defenderDead ? 4 : 3;
      ctx.strokeRect(co.x - hs, co.y - hs, hs * 2, hs * 2);
      ctx.fillStyle = col; ctx.globalAlpha = 0.25 + Math.sin(CC.animTime * 4) * 0.1;
      ctx.fillRect(co.x - 16, co.y - 16, 32, 32); ctx.globalAlpha = 1;

      // HP bar
      const pct = co.hp / co.maxHp;
      ctx.fillStyle = '#300'; ctx.fillRect(co.x - C.CORE_SIZE / 2, co.y - C.CORE_SIZE / 2 - 14, C.CORE_SIZE, 8);
      ctx.fillStyle = pct > 0.5 ? '#0c0' : pct > 0.25 ? '#cc0' : '#c00';
      ctx.fillRect(co.x - C.CORE_SIZE / 2, co.y - C.CORE_SIZE / 2 - 14, C.CORE_SIZE * pct, 8);
      ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.strokeRect(co.x - C.CORE_SIZE / 2, co.y - C.CORE_SIZE / 2 - 14, C.CORE_SIZE, 8);
      ctx.fillStyle = col; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      ctx.fillText(p === 0 ? 'P1 CORE' : 'P2 CORE', co.x, co.y + C.CORE_SIZE / 2 + 18);
    }
  },

  // ---- Bullets ----
  _drawBullets(ctx, gs) {
    for (const b of gs.bullets) {
      const col = CC.pcol(b.owner);
      ctx.strokeStyle = b.reflected ? '#fff' : col; ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;
      ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * 0.03, b.y - b.vy * 0.03); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = b.reflected ? '#fff' : col;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.reflected ? 5 : 4, 0, Math.PI * 2); ctx.fill();
    }
    for (const b of gs.tBullets) {
      const col = CC.pcol(b.owner);
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * 0.025, b.y - b.vy * 0.025); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(b.x, b.y, 4, 0, Math.PI * 2); ctx.fill();
    }
  },

  // ---- Mobs ----
  _drawMobs(ctx, gs) {
    if (!gs.mobs) return;
    for (const mob of gs.mobs) {
      const col = CC.pmc(mob.owner);
      ctx.fillStyle = col; ctx.globalAlpha = 0.7;
      ctx.beginPath(); ctx.arc(mob.x, mob.y, C.MOB_R, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = col; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(mob.x, mob.y, C.MOB_R, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#000'; ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.arc(mob.x + Math.cos(mob.facing) * 3, mob.y + Math.sin(mob.facing) * 3, 2, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      this._hpBar(ctx, mob.x - 10, mob.y - C.MOB_R - 6, 20, 3, mob.hp, mob.maxHp);
    }
  },

  // ---- Mechs ----
  _drawMechs(ctx, gs) {
    for (let p = 0; p < 2; p++) {
      const m = gs.mechs[p];
      if (m.dead) {
        ctx.fillStyle = CC.pcol(p); ctx.globalAlpha = 0.5;
        ctx.font = '12px monospace'; ctx.textAlign = 'center';
        ctx.fillText('RESPAWN ' + Math.ceil(m.respawnTimer) + 's', m.x, m.y);
        ctx.globalAlpha = 1; continue;
      }

      const isMe = (p === CC.Net.hostIndex);
      const shape = isMe ? CC.playerShape : (CC.remotePlayerShape || 'arrow');
      const mechCol = isMe ? (CC.COLOR_MAP[CC.playerColor] || CC.pcol(p)) : CC.pcol(p);
      const mechBg = isMe ? (CC.COLOR_BG_MAP[CC.playerColor] || CC.pbg(p)) : CC.pbg(p);

      ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.facing);

      if (m.invTimer > 0 && Math.floor(m.invTimer * 12) % 2 === 0) ctx.globalAlpha = 0.4;

      // Dash trail
      if (m.dashing) {
        ctx.globalAlpha = 0.15; ctx.fillStyle = mechCol;
        ctx.beginPath(); ctx.arc(0, 0, C.MECH_R + 12, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = mechCol; ctx.lineWidth = 1; ctx.globalAlpha = 0.4;
        for (let i = 0; i < 3; i++) {
          const oy = (i - 1) * 8;
          ctx.beginPath(); ctx.moveTo(-C.MECH_R - 15, oy); ctx.lineTo(-C.MECH_R - 3 - i * 2, oy); ctx.stroke();
        }
        ctx.globalAlpha = m.invTimer > 0 && Math.floor(m.invTimer * 12) % 2 === 0 ? 0.4 : 1;
      }

      // Parry shield
      if (m.parrying) {
        const shp = m.shieldHp || 0;
        if (shp > 0) {
          const frac = shp / C.SHIELD_MAX_HP;
          const arcH = C.PARRY_ARC / 2 * frac;
          ctx.strokeStyle = '#88f'; ctx.lineWidth = 4; ctx.globalAlpha = 0.7;
          ctx.beginPath(); ctx.arc(0, 0, C.MECH_R + 14, -arcH, arcH); ctx.stroke();
          ctx.fillStyle = 'rgba(150,150,255,0.08)'; ctx.globalAlpha = 0.5;
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, C.MECH_R + 14, -arcH, arcH); ctx.closePath(); ctx.fill();
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = '#fff'; ctx.font = 'bold 7px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(shp + '/' + C.SHIELD_MAX_HP, 0, -C.MECH_R - 22);
        } else {
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.globalAlpha = 0.6;
          ctx.beginPath(); ctx.arc(0, 0, C.MECH_R + 14, -C.PARRY_ARC / 2, C.PARRY_ARC / 2); ctx.stroke();
          ctx.fillStyle = 'rgba(200,200,255,0.12)';
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, C.MECH_R + 14, -C.PARRY_ARC / 2, C.PARRY_ARC / 2); ctx.closePath(); ctx.fill();
        }
        ctx.globalAlpha = m.invTimer > 0 && Math.floor(m.invTimer * 12) % 2 === 0 ? 0.4 : 1;
      }

      // Body
      ctx.fillStyle = mechBg; ctx.strokeStyle = mechCol; ctx.lineWidth = 2;
      this._drawShape(ctx, shape, C.MECH_R); ctx.fill(); ctx.stroke();

      // Eye
      ctx.fillStyle = mechCol; ctx.globalAlpha *= 0.5;
      ctx.beginPath(); ctx.arc(-C.MECH_R + 5, 0, 4, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = m.invTimer > 0 && Math.floor(m.invTimer * 12) % 2 === 0 ? 0.4 : 1;

      // Melee blade
      if (m.meleeing) {
        const prog = 1 - m.meleeTimer / C.MELEE_DUR;
        const ext = prog < 0.45 ? prog / 0.45 * C.MELEE_RANGE : (1 - prog) / 0.55 * C.MELEE_RANGE;
        ctx.fillStyle = '#ff0'; ctx.globalAlpha *= 0.85;
        ctx.fillRect(C.MECH_R, -5, ext, 10);
        ctx.fillStyle = '#fff'; ctx.fillRect(C.MECH_R + ext - 4, -6, 8, 12);
        ctx.globalAlpha = m.invTimer > 0 && Math.floor(m.invTimer * 12) % 2 === 0 ? 0.4 : 1;
      } else {
        // Gun barrels
        ctx.strokeStyle = mechCol; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(C.MECH_R, -4); ctx.lineTo(C.MECH_R + 10, -4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(C.MECH_R, 4); ctx.lineTo(C.MECH_R + 10, 4); ctx.stroke();
        if (m.shootCd > C.SHOOT_CD * 0.7) {
          ctx.fillStyle = '#fff'; ctx.globalAlpha *= 0.7;
          ctx.beginPath(); ctx.arc(C.MECH_R + 12, 0, 5, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = m.invTimer > 0 && Math.floor(m.invTimer * 12) % 2 === 0 ? 0.4 : 1;
        }
      }
      ctx.globalAlpha = 1; ctx.restore();

      // HP bar
      const barW = 42, barH = 5;
      const bx = m.x - barW / 2, by = m.y - C.MECH_R - 16;
      ctx.fillStyle = '#300'; ctx.fillRect(bx, by, barW, barH);
      ctx.fillStyle = m.hp > 60 ? '#0c0' : m.hp > 30 ? '#cc0' : '#c00';
      ctx.fillRect(bx, by, barW * (m.hp / m.maxHp), barH);
      ctx.strokeStyle = '#555'; ctx.lineWidth = 0.5; ctx.strokeRect(bx, by, barW, barH);
      ctx.fillStyle = mechCol; ctx.font = '9px monospace'; ctx.textAlign = 'center';
      ctx.fillText('P' + (p + 1), m.x, m.y - C.MECH_R - 20);
    }
  },

  _drawShape(ctx, shape, r) {
    ctx.beginPath();
    switch (shape) {
      case 'diamond':  ctx.moveTo(r + 5, 0); ctx.lineTo(0, -r + 2); ctx.lineTo(-r + 8, 0); ctx.lineTo(0, r - 2); ctx.closePath(); break;
      case 'triangle': ctx.moveTo(r + 5, 0); ctx.lineTo(-r + 2, -r + 2); ctx.lineTo(-r + 2, r - 2); ctx.closePath(); break;
      case 'square':   ctx.rect(-r + 4, -r + 4, (r - 4) * 2, (r - 4) * 2); break;
      case 'circle':   ctx.arc(0, 0, r - 2, 0, Math.PI * 2); break;
      case 'star': {
        const spikes = 5, outerR = r + 2, innerR = r * 0.45;
        let rot = -Math.PI / 2;
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(Math.cos(rot) * outerR, Math.sin(rot) * outerR); rot += Math.PI / spikes;
          ctx.lineTo(Math.cos(rot) * innerR, Math.sin(rot) * innerR); rot += Math.PI / spikes;
        }
        ctx.closePath(); break;
      }
      default: ctx.moveTo(r + 5, 0); ctx.lineTo(-r + 2, -r + 2); ctx.lineTo(-r + 8, 0); ctx.lineTo(-r + 2, r - 2); ctx.closePath(); break;
    }
  },

  // ---- Particles ----
  _drawParticles(ctx, gs) {
    if (!gs.particles) return;
    for (const p of gs.particles) {
      const a = CC.clamp(p.life / p.maxLife, 0, 1);
      ctx.fillStyle = p.color; ctx.globalAlpha = a;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * a, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  },

  // ---- Build Preview ----
  _drawBuildPreview(ctx, gs) {
    if (CC.buildMode <= 0 || gs.phase !== 'playing') return;
    const gx = Math.floor(CC.mouseX / C.CELL), gy = Math.floor(CC.mouseY / C.CELL);
    if (gx < 0 || gx >= C.COLS || gy < 0 || gy >= C.ROWS) return;
    const bc = CC.gridCtr(gx, gy);
    const valid = CC.canPlaceBuild(gs, CC.Net.hostIndex, gx, gy, CC.buildMode);
    ctx.fillStyle = valid ? 'rgba(0,255,0,0.25)' : 'rgba(255,0,0,0.25)';
    ctx.fillRect(bc.x - C.CELL / 2, bc.y - C.CELL / 2, C.CELL, C.CELL);
    ctx.strokeStyle = valid ? '#0f0' : '#f00'; ctx.lineWidth = 3;
    ctx.setLineDash([4, 2]); ctx.strokeRect(bc.x - C.CELL / 2, bc.y - C.CELL / 2, C.CELL, C.CELL); ctx.setLineDash([]);
    const icon = CC.buildMode === 1 ? '>' : CC.buildMode === 2 ? '#' : CC.buildMode === 3 ? 'T' : 'S';
    ctx.fillStyle = valid ? '#0f0' : '#f00'; ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(icon, bc.x, bc.y);
    const cost = CC.Building.cost(CC.buildMode);
    ctx.font = 'bold 9px monospace';
    ctx.fillText(CC.Building.name(CC.buildMode) + ' -' + cost + 'E', bc.x, bc.y + 26);
  },

  // ---- HUD ----
  _drawHUD(ctx, gs) {
    if (!gs) return;
    const p = CC.Net.hostIndex;

    if (gs.phase === 'countdown') { this._drawCountdown(ctx, gs); return; }
    if (gs.phase === 'gameover') { this._drawGameOver(ctx, gs); return; }

    this._drawMyHUD(ctx, gs, p);
    this._drawEnemyHUD(ctx, gs, p);
    this._drawUpgradeBar(ctx, gs, p);
    this._drawBottomBar(ctx, gs, p);
    this._drawTopCenter(ctx, gs);
  },

  _drawCountdown(ctx, gs) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, C.W, C.H);
    const num = Math.ceil(gs.countdown), txt = num > 0 ? '' + num : 'GO!';
    ctx.fillStyle = num > 0 ? '#0ff' : '#0f0';
    ctx.font = 'bold 100px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 30;
    ctx.fillText(txt, C.W / 2, C.H / 2); ctx.shadowBlur = 0;
    ctx.font = '22px monospace'; ctx.fillStyle = '#aaa';
    ctx.fillText('GET READY!', C.W / 2, C.H / 2 + 70);
    if (CC.Net.practiceMode) {
      ctx.fillStyle = CC.aiPaused ? '#ff0' : '#0f0'; ctx.font = '16px monospace';
      ctx.fillText(CC.aiPaused ? '[ PAUSED — Press P ]' : '[ SOLO PRACTICE ]', C.W / 2, C.H / 2 + 100);
    }
  },

  _drawGameOver(ctx, gs) {
    ctx.fillStyle = 'rgba(0,0,0,0.65)'; ctx.fillRect(0, 0, C.W, C.H);
    const wcol = gs.winner === 0 ? CC.COLORS.P1.C : CC.COLORS.P2.C;
    ctx.fillStyle = wcol; ctx.font = 'bold 56px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = wcol; ctx.shadowBlur = 20;
    ctx.fillText('PLAYER ' + (gs.winner + 1) + ' WINS!', C.W / 2, C.H / 2); ctx.shadowBlur = 0;
    const bx = C.W / 2 - 120, by = C.H / 2 + 55, bw = 240, bh = 44;
    ctx.fillStyle = 'rgba(0,0,0,0.8)'; ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = '#0ff'; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = '#0ff'; ctx.font = 'bold 16px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('BACK TO MENU', C.W / 2, by + bh / 2);
  },

  _drawMyHUD(ctx, gs, p) {
    const m = gs.mechs[p], e = gs.energy[p], cn = gs.connectedNodes[p], col = CC.pcol(p);
    ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(10, 10, 270, 140);
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.strokeRect(10, 10, 270, 140);
    ctx.font = 'bold 12px monospace'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';

    ctx.fillStyle = '#aaa'; ctx.fillText('MECH', 20, 16);
    ctx.fillStyle = '#300'; ctx.fillRect(70, 16, 180, 12);
    const mhp = Math.max(0, m.hp) / m.maxHp;
    ctx.fillStyle = mhp > 0.5 ? '#0c0' : mhp > 0.25 ? '#cc0' : '#c00';
    ctx.fillRect(70, 16, 180 * mhp, 12);
    ctx.fillStyle = '#fff'; ctx.font = '9px monospace';
    ctx.fillText(Math.ceil(Math.max(0, m.hp)) + '/' + m.maxHp, 72, 17);

    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#aaa'; ctx.fillText('NRG', 20, 34);
    ctx.fillStyle = '#003'; ctx.fillRect(70, 34, 180, 12);
    ctx.fillStyle = '#08f'; ctx.fillRect(70, 34, 180 * (e / C.MAX_ENERGY), 12);
    ctx.fillStyle = '#fff'; ctx.font = '9px monospace';
    ctx.fillText(Math.floor(e) + '/' + C.MAX_ENERGY, 72, 35);
    ctx.font = '9px monospace'; ctx.fillStyle = '#0a8';
    const rate = C.BASE_ENERGY_RATE + cn * C.NODE_RATE;
    ctx.fillText('+' + rate.toFixed(1) + '/s', 220, 36);

    ctx.font = 'bold 12px monospace'; ctx.fillStyle = '#aaa'; ctx.fillText('NODES', 20, 52);
    ctx.fillStyle = '#ff0'; ctx.fillText(cn + '/' + CC.NODE_POSITIONS.length, 80, 52);

    ctx.fillStyle = '#aaa'; ctx.font = '11px monospace';
    ctx.fillText('Core: ' + Math.ceil(Math.max(0, gs.cores[p].hp)) + '/' + C.CORE_HP, 20, 72);
    ctx.fillStyle = m.dashCd <= 0 ? '#0f0' : '#555';
    ctx.fillText('Dash: ' + (m.dashCd <= 0 ? 'READY' : m.dashCd.toFixed(1) + 's'), 20, 88);
    ctx.fillStyle = m.meleeCd <= 0 ? '#0f0' : '#555';
    ctx.fillText('Melee: ' + (m.meleeCd <= 0 ? 'READY' : m.meleeCd.toFixed(1) + 's'), 130, 88);

    if (gs.turretPlaceCd[p] > 0) { ctx.fillStyle = '#ff0'; ctx.font = '10px monospace'; ctx.fillText('Turret CD: ' + gs.turretPlaceCd[p].toFixed(1) + 's', 20, 104); }
    if (gs.spawnerPlaceCd[p] > 0) { ctx.fillStyle = '#ff0'; ctx.font = '10px monospace'; ctx.fillText('Spawner CD: ' + gs.spawnerPlaceCd[p].toFixed(1) + 's', 130, 104); }
    if (gs.convPlaceCd[p] > 0) { ctx.fillStyle = '#ff0'; ctx.font = '10px monospace'; ctx.fillText('Conv CD: ' + gs.convPlaceCd[p].toFixed(1) + 's', 20, 118); }

    // Power-up indicators
    let puX = 170;
    if (gs.puSpeedTimer[p] > 0) { ctx.fillStyle = '#0f0'; ctx.globalAlpha = 0.7 + 0.3 * Math.sin(CC.animTime * 6); ctx.fillRect(puX, 62, 24, 12); ctx.globalAlpha = 1; ctx.font = 'bold 7px monospace'; ctx.textAlign = 'center'; ctx.fillText('SPD', puX + 12, 72); puX += 28; }
    if (gs.puShieldHp[p] > 0) { ctx.fillStyle = '#08f'; ctx.globalAlpha = 0.7 + 0.3 * Math.sin(CC.animTime * 6); ctx.fillRect(puX, 62, 24, 12); ctx.globalAlpha = 1; ctx.font = 'bold 7px monospace'; ctx.textAlign = 'center'; ctx.fillText('SHD', puX + 12, 72); puX += 28; }
    if (gs.puRapidTimer[p] > 0) { ctx.fillStyle = '#f44'; ctx.globalAlpha = 0.7 + 0.3 * Math.sin(CC.animTime * 6); ctx.fillRect(puX, 62, 24, 12); ctx.globalAlpha = 1; ctx.font = 'bold 7px monospace'; ctx.textAlign = 'center'; ctx.fillText('RPD', puX + 12, 72); puX += 28; }

    const anyDisc = gs.buildings.some(b => b.owner === p && b.type === 1 && !b.connected);
    if (anyDisc) { ctx.fillStyle = '#f80'; ctx.font = '9px monospace'; ctx.fillText('! Some conveyors disconnected', 20, 122); }
  },

  _drawEnemyHUD(ctx, gs, p) {
    const ep = 1 - p, em = gs.mechs[ep], eco = gs.cores[ep], ecol = CC.pcol(ep);
    ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(C.W - 270, 10, 260, 140);
    ctx.strokeStyle = ecol; ctx.lineWidth = 2; ctx.strokeRect(C.W - 270, 10, 260, 140);
    ctx.font = 'bold 12px monospace'; ctx.textAlign = 'left';

    ctx.fillStyle = '#aaa'; ctx.fillText('ENEMY', C.W - 260, 16);
    ctx.fillStyle = '#300'; ctx.fillRect(C.W - 190, 16, 170, 12);
    const ehp = Math.max(0, em.hp) / em.maxHp;
    ctx.fillStyle = ehp > 0.5 ? '#0c0' : ehp > 0.25 ? '#cc0' : '#c00';
    ctx.fillRect(C.W - 190, 16, 170 * ehp, 12);
    ctx.fillStyle = '#888'; ctx.font = '10px monospace';
    ctx.fillText('Core: ' + Math.ceil(Math.max(0, eco.hp)) + '/' + C.CORE_HP + '  Nodes: ' + gs.connectedNodes[ep] + '  NRG: ' + Math.floor(gs.energy[ep]), C.W - 260, 38);
    ctx.fillText(em.dead ? 'RESPAWNING...' : 'ACTIVE', C.W - 260, 52);
    ctx.fillStyle = em.meleeCd <= 0 ? '#0f0' : '#555'; ctx.font = '9px monospace';
    ctx.fillText('Melee: ' + (em.meleeCd <= 0 ? 'READY' : em.meleeCd.toFixed(1) + 's'), C.W - 260, 66);
    ctx.fillStyle = em.dashCd <= 0 ? '#0f0' : '#555';
    ctx.fillText('Dash: ' + (em.dashCd <= 0 ? 'READY' : em.dashCd.toFixed(1) + 's'), C.W - 130, 66);

    if (gs.turretPlaceCd[ep] > 0) { ctx.fillStyle = '#ff0'; ctx.font = '9px monospace'; ctx.fillText('Turr CD:' + gs.turretPlaceCd[ep].toFixed(1) + 's', C.W - 260, 80); }
    if (gs.spawnerPlaceCd[ep] > 0) { ctx.fillStyle = '#ff0'; ctx.font = '9px monospace'; ctx.fillText('Spwn CD:' + gs.spawnerPlaceCd[ep].toFixed(1) + 's', C.W - 130, 80); }
    if (gs.convPlaceCd[ep] > 0) { ctx.fillStyle = '#ff0'; ctx.font = '9px monospace'; ctx.fillText('Conv CD:' + gs.convPlaceCd[ep].toFixed(1) + 's', C.W - 260, 94); }

    // Enemy power-ups
    let epuX = C.W - 260;
    if (gs.puSpeedTimer[ep] > 0) { ctx.fillStyle = '#0f0'; ctx.globalAlpha = 0.7 + 0.3 * Math.sin(CC.animTime * 6); ctx.fillRect(epuX, 100, 22, 11); ctx.globalAlpha = 1; ctx.font = 'bold 6px monospace'; ctx.textAlign = 'center'; ctx.fillText('SPD', epuX + 11, 109); epuX += 26; }
    if (gs.puShieldHp[ep] > 0) { ctx.fillStyle = '#08f'; ctx.globalAlpha = 0.7 + 0.3 * Math.sin(CC.animTime * 6); ctx.fillRect(epuX, 100, 22, 11); ctx.globalAlpha = 1; ctx.font = 'bold 6px monospace'; ctx.textAlign = 'center'; ctx.fillText('SHD', epuX + 11, 109); epuX += 26; }
    if (gs.puRapidTimer[ep] > 0) { ctx.fillStyle = '#f44'; ctx.globalAlpha = 0.7 + 0.3 * Math.sin(CC.animTime * 6); ctx.fillRect(epuX, 100, 22, 11); ctx.globalAlpha = 1; ctx.font = 'bold 6px monospace'; ctx.textAlign = 'center'; ctx.fillText('RPD', epuX + 11, 109); epuX += 26; }

    const enUpgS = gs.upgStrike[ep], enUpgB = gs.upgBullet[ep], enUpgF = gs.upgFort[ep];
    ctx.font = '8px monospace'; ctx.textAlign = 'left';
    ctx.fillStyle = enUpgS >= 3 ? '#ff0' : enUpgS > 0 ? '#0f0' : '#555'; ctx.fillText('Strk:' + enUpgS, C.W - 260, 122);
    ctx.fillStyle = enUpgB >= 3 ? '#ff0' : enUpgB > 0 ? '#0f0' : '#555'; ctx.fillText('Bull:' + enUpgB, C.W - 200, 122);
    ctx.fillStyle = enUpgF >= 3 ? '#ff0' : enUpgF > 0 ? '#0f0' : '#555'; ctx.fillText('Fort:' + enUpgF, C.W - 140, 122);
  },

  _drawUpgradeBar(ctx, gs, p) {
    const myUpgS = gs.upgStrike[p], myUpgB = gs.upgBullet[p], myUpgF = gs.upgFort[p];
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(10, C.H - 145, 280, 30);
    ctx.font = '10px monospace'; ctx.textAlign = 'left';
    ctx.fillStyle = myUpgS >= 3 ? '#ff0' : myUpgS > 0 ? '#0f0' : '#555';
    ctx.fillText('[8]Strike:' + myUpgS + '/3' + (myUpgS < 3 ? ' (' + C.UPG_STRIKE_COSTS[myUpgS] + 'E)' : ' MAX'), 20, C.H - 127);
    ctx.fillStyle = myUpgB >= 3 ? '#ff0' : myUpgB > 0 ? '#0f0' : '#555';
    ctx.fillText('[9]Bullet:' + myUpgB + '/3' + (myUpgB < 3 ? ' (' + C.UPG_BULLET_COSTS[myUpgB] + 'E)' : ' MAX'), 20, C.H - 115);
    ctx.fillStyle = myUpgF >= 3 ? '#ff0' : myUpgF > 0 ? '#0f0' : '#555';
    ctx.fillText('[0]Fortify:' + myUpgF + '/3' + (myUpgF < 3 ? ' (' + C.UPG_FORT_COSTS[myUpgF] + 'E)' : ' MAX'), 20, C.H - 103);
  },

  _drawBottomBar(ctx, gs, p) {
    const e = gs.energy[p];
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(10, C.H - 110, 280, 100);
    ctx.fillStyle = '#777'; ctx.font = '10px monospace'; ctx.textAlign = 'left';
    const y0 = C.H - 100;
    ctx.fillStyle = '#0ff'; ctx.fillText('[1] Conveyor (-' + C.CONV_COST + 'E)', 20, y0);
    ctx.fillStyle = '#f60'; ctx.fillText('[2] Wall (-' + C.WALL_COST + 'E)', 170, y0);
    ctx.fillStyle = '#0f0'; ctx.fillText('[3] Turret (-' + C.TURR_COST + 'E)' + (gs.turretPlaceCd[p] > 0 ? ' CD:' + gs.turretPlaceCd[p].toFixed(1) : ''), 20, y0 + 14);
    ctx.fillStyle = '#ff0'; ctx.fillText('[4] Spawner (-' + C.SPAWNER_COST + 'E)' + (gs.spawnerPlaceCd[p] > 0 ? ' CD:' + gs.spawnerPlaceCd[p].toFixed(1) : ''), 170, y0 + 14);
    ctx.fillStyle = '#888';
    ctx.fillText('[Q] Parry  [Space] Dash  [P] Pause Bot', 20, y0 + 28);
    ctx.fillText('[LMB] Shoot/Place  [RMB] Melee  [WASD] Move', 20, y0 + 42);

    if (CC.buildMode > 0) {
      const bname = CC.Building.name(CC.buildMode);
      const bcost = CC.Building.cost(CC.buildMode);
      const canAfford = e >= bcost;
      ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(C.W / 2 - 140, C.H - 50, 280, 40);
      ctx.strokeStyle = canAfford ? '#0f0' : '#f00'; ctx.lineWidth = 2; ctx.strokeRect(C.W / 2 - 140, C.H - 50, 280, 40);
      ctx.fillStyle = canAfford ? '#0f0' : '#f44'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center';
      ctx.fillText('Placing: ' + bname + ' (-' + bcost + 'E)', C.W / 2, C.H - 22);
    }
  },

  _drawTopCenter(ctx, gs) {
    if (CC.Net.practiceMode && CC.aiPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(C.W / 2 - 120, 2, 240, 28);
      ctx.strokeStyle = '#ff0'; ctx.lineWidth = 1.5; ctx.strokeRect(C.W / 2 - 120, 2, 240, 28);
      ctx.fillStyle = '#ff0'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'center';
      ctx.fillText('PAUSED BOT - Press P', C.W / 2, 20);
    }
    if (CC.Net.practiceMode) {
      ctx.fillStyle = '#0f0'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      ctx.fillText('[ SOLO PRACTICE ]', C.W / 2, 18);
    }
    const mins = Math.floor(gs.time / 60), secs = Math.floor(gs.time % 60);
    ctx.fillStyle = '#444'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText((mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs, C.W / 2, 18 + (CC.Net.practiceMode ? 14 : 0));
    if (!CC.Net.practiceMode && CC.Net.pingMs > 0) {
      ctx.fillStyle = CC.Net.pingMs < 80 ? '#0f0' : CC.Net.pingMs < 150 ? '#ff0' : '#f00';
      ctx.font = '10px monospace'; ctx.textAlign = 'right'; ctx.fillText('Ping: ' + CC.Net.pingMs + 'ms', C.W - 10, 18);
    }
  },
};

window.CC = CC;



/* === ui.js === */

/**
 * CONVEYOR CLASH v15 — UI & Effects
 * Floating text, build flashes, kill feed, screen shake, lava bubbles.
 * Menu management, player customization, relay config.
 */

CC.UI = {
  // Visual effects
  floatingTexts: [],
  buildFlashes: [],
  killFeed: [],
  lavaBubbles: [],

  // Screen shake
  shakeX: 0, shakeY: 0,
  shakeIntensity: 0, shakeTimer: 0,

  triggerShake(intensity, duration) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
    this.shakeTimer = Math.max(this.shakeTimer, duration);
  },

  updateShake(dt) {
    if (this.shakeTimer > 0) {
      this.shakeTimer -= dt;
      const decay = this.shakeTimer > 0 ? 1 : 0;
      this.shakeX = (Math.random() - 0.5) * 2 * this.shakeIntensity * decay;
      this.shakeY = (Math.random() - 0.5) * 2 * this.shakeIntensity * decay;
      if (this.shakeTimer <= 0) { this.shakeX = 0; this.shakeY = 0; this.shakeIntensity = 0; }
    }
  },

  addLavaBubble(x, y) {
    if (this.lavaBubbles.length < CC.CONFIG.MAX_LAVA_BUBBLES) {
      this.lavaBubbles.push({ x: x + CC.rng(-10, 10), y: y + CC.rng(-10, 10), vy: CC.rng(-40, -20), life: CC.rng(0.2, 0.5), maxLife: 0.5 });
    }
  },

  // Update effects (called every tick)
  update(dt) {
    this.updateShake(dt);

    // Floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      this.floatingTexts[i].timer -= dt;
      this.floatingTexts[i].y -= 50 * dt;
      if (this.floatingTexts[i].timer <= 0) this.floatingTexts.splice(i, 1);
    }

    // Build flashes
    for (let i = this.buildFlashes.length - 1; i >= 0; i--) {
      this.buildFlashes[i].timer -= dt;
      if (this.buildFlashes[i].timer <= 0) this.buildFlashes.splice(i, 1);
    }

    // Kill feed
    for (let i = this.killFeed.length - 1; i >= 0; i--) {
      this.killFeed[i].timer -= dt;
      if (this.killFeed[i].timer <= 0) this.killFeed.splice(i, 1);
    }

    // Lava bubbles
    for (let i = this.lavaBubbles.length - 1; i >= 0; i--) {
      const lb = this.lavaBubbles[i];
      lb.y += lb.vy * 0.016;
      lb.life -= 0.016;
      if (lb.life <= 0) this.lavaBubbles.splice(i, 1);
    }

    // Spawn lava bubbles (ambient)
    const C = CC.CONFIG;
    if (CC.gameState && Math.random() < 0.15 && this.lavaBubbles.length < C.MAX_LAVA_BUBBLES) {
      const lavaX = C.LAVA_COLS_MIN * C.CELL;
      const lavaW = (C.LAVA_COLS_MAX - C.LAVA_COLS_MIN + 1) * C.CELL;
      const lavaYp = CC.gameState.lavaY * C.CELL;
      const lavaH = 5 * C.CELL;
      this.lavaBubbles.push({
        x: lavaX + CC.rng(0, lavaW),
        y: lavaYp + CC.rng(0, lavaH),
        vy: CC.rng(-40, -20),
        life: CC.rng(0.3, 0.8),
        maxLife: 0.8,
      });
    }
  },

  drawFloatingTexts(ctx) {
    for (const ft of this.floatingTexts) {
      const a = CC.clamp(ft.timer / ft.maxTimer, 0, 1);
      ctx.globalAlpha = a;
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(ft.text, ft.x, ft.y);
    }
    ctx.globalAlpha = 1;
  },

  drawKillFeed(ctx) {
    const C = CC.CONFIG;
    const x = C.W - 10; let y = 90;
    for (const kf of this.killFeed) {
      const a = CC.clamp(kf.timer / kf.maxTimer, 0, 1);
      ctx.globalAlpha = a;
      ctx.fillStyle = kf.color;
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(kf.msg, x, y);
      y += 16;
    }
    ctx.globalAlpha = 1;
  },

  // ---- Menu Management ----
  showMenu() {
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('waiting-screen').style.display = 'none';
    this._resetAll();
  },

  hideMenu() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('waiting-screen').style.display = 'none';
  },

  showTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'flex';
  },

  hideTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'none';
  },

  backToMenu() {
    CC.gameState = null;
    CC.stopGameTicks();
    CC.Guest.prevState = null;
    CC.Guest.curState = null;
    CC.Net.disconnect();
    CC.Net.isHost = false;
    CC.Net.hostIndex = 0;
    CC.Net.practiceMode = false;
    CC.buildMode = 0;
    this.buildFlashes = [];
    CC.Net.remoteInput = null;
    this.floatingTexts = [];
    this.killFeed = [];
    this.shakeIntensity = 0;
    this.shakeTimer = 0;
    this.lavaBubbles = [];
    this.showMenu();
    document.getElementById('status').textContent = '';
    this._initCustomization();
  },

  _resetAll() {
    // Reset all modal-like states
  },

  // ---- Player Customization ----
  color: 'cyan',
  shape: 'arrow',
  remoteShape: 'arrow',
  remoteColor: 'cyan',

  initCustomization() { this._initCustomization(); },

  _initCustomization() {
    try {
      this.color = localStorage.getItem('cc_color') || 'cyan';
      this.shape = localStorage.getItem('cc_shape') || 'arrow';
    } catch (e) {}
    CC.playerColor = this.color;
    CC.playerShape = this.shape;
    CC.remotePlayerShape = 'arrow';
    CC.remotePlayerColor = 'cyan';

    const picker = document.getElementById('color-picker');
    if (picker) {
      picker.innerHTML = '';
      CC.PLAYER_COLORS.forEach(c => {
        const hex = CC.COLOR_MAP[c] || '#888';
        const sw = document.createElement('div');
        sw.className = 'color-swatch' + (c === this.color ? ' selected' : '');
        sw.style.backgroundColor = hex;
        sw.style.color = hex;
        sw.dataset.color = c;
        sw.title = c.charAt(0).toUpperCase() + c.slice(1);
        sw.addEventListener('click', () => this._onColorChange(c));
        picker.appendChild(sw);
      });
    }
    const sel = document.getElementById('shape-select');
    if (sel) sel.value = this.shape;

    // Sync volume slider
    const slider = document.getElementById('volume-slider');
    if (slider) slider.value = Math.round(CC.Sound._volume * 100);
    const valEl = document.getElementById('volume-val');
    if (valEl) valEl.textContent = Math.round(CC.Sound._volume * 100) + '%';
  },

  _onColorChange(val) {
    this.color = val;
    CC.playerColor = val;
    try { localStorage.setItem('cc_color', val); } catch (e) {}
    document.querySelectorAll('#color-picker .color-swatch').forEach(el => {
      el.classList.toggle('selected', el.dataset.color === val);
    });
  },

  _onShapeChange(val) {
    this.shape = val;
    CC.playerShape = val;
    try { localStorage.setItem('cc_shape', val); } catch (e) {}
  },

  // ---- Relay Config ----
  onRelaySelectChange() {
    const sel = document.getElementById('relay-select');
    const row = document.getElementById('custom-url-row');
    row.style.display = sel.value === 'custom' ? 'block' : 'none';
  },

  async testRelay() {
    const inp = document.getElementById('relay-url-input');
    const ms = document.getElementById('menu-relay-status');
    const testUrl = inp ? inp.value.trim() : '';
    if (!testUrl) { ms.textContent = 'Enter URL first'; ms.className = 'relay-status error'; return; }
    let testHttp = '';
    if (testUrl.startsWith('wss://')) testHttp = 'https://' + testUrl.slice(6);
    else if (testUrl.startsWith('ws://')) testHttp = 'http://' + testUrl.slice(5);
    else if (testUrl.startsWith('https://') || testUrl.startsWith('http://')) testHttp = testUrl;
    else testHttp = 'https://' + testUrl;
    ms.textContent = 'Testing...'; ms.className = 'relay-status';
    try {
      const r = await fetch(testHttp + '/health', { cache: 'no-store', signal: AbortSignal.timeout(8000) });
      const data = await r.json();
      if (data.status === 'ok') { ms.textContent = 'Connected! Rooms: ' + data.rooms + ', Uptime: ' + data.uptime + 's'; ms.className = 'relay-status connected'; }
      else { ms.textContent = 'Bad response'; ms.className = 'relay-status error'; }
    } catch (e) { ms.textContent = 'Cannot reach: ' + e.message; ms.className = 'relay-status error'; }
  },

  copyRoomId() {
    const rid = document.getElementById('waiting-room-id').textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(rid).then(() => {
        const btn = document.querySelector('#waiting-screen .copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy Room Code', 1500);
      }).catch(() => this._fallbackCopy());
    } else {
      this._fallbackCopy();
    }
  },

  _fallbackCopy() {
    const el = document.getElementById('waiting-room-id');
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  },

  // Room actions
  createRoom() {
    CC.Net.isHost = true;
    CC.Net.hostIndex = 0;
    CC.Net.practiceMode = false;
    CC.Net.relayUrl = ''; CC.Net.httpBase = '';
    CC.Net.resolveUrls();
    if (!CC.Net.relayUrl) { document.getElementById('status').textContent = 'Enter Relay Server URL below!'; return; }
    CC.Net.connect(() => { CC.Net.send({ action: 'create' }); });
  },

  joinRoom() {
    CC.Net.isHost = false;
    CC.Net.hostIndex = 1;
    CC.Net.practiceMode = false;
    const rid = document.getElementById('join-input').value.trim().toUpperCase();
    if (!rid) { document.getElementById('status').textContent = 'Enter a Room Code'; return; }
    CC.Net.relayUrl = ''; CC.Net.httpBase = '';
    CC.Net.resolveUrls();
    if (!CC.Net.relayUrl) { document.getElementById('status').textContent = 'Enter Relay Server URL below!'; return; }
    CC.Net.connect(() => { CC.Net.send({ action: 'join', roomId: rid }); });
  },

  cancelWaiting() {
    if (CC.Net.ws) { try { CC.Net.ws.close(); } catch (e) {} }
    CC.Net.ws = null;
    CC.Net.pollClose();
    CC.Net.transport = null;
    CC.Net.connected = false;
    CC.Net.roomId = null;
    document.getElementById('waiting-screen').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('status').textContent = '';
  },

  startPractice() {
    CC.Net.isHost = true;
    CC.Net.hostIndex = 0;
    CC.Net.practiceMode = true;
    CC.aiPaused = false;
    CC.gameState = CC.createGameState();
    CC.startGameTicks();
    this.hideMenu();
    CC.Sound.resume();
    CC.canvas.focus();
  },
};

// ---- Input Handling ----
CC.Input = {
  keys: {},
  mouseX: CC.CONFIG.W / 2,
  mouseY: CC.CONFIG.H / 2,
  mouseLeftDown: false, mouseRightDown: false,
  mouseLeftClicked: false, mouseRightClicked: false,
  buildMode: 0,
  upgEClicked: false, upgRClicked: false, upgFClicked: false,
  aiPaused: false,

  init(canvas) {
    canvas.tabIndex = 0;
    this._setupKeyboard();
    this._setupMouse(canvas);
    this._setupFocusHandlers(canvas);
  },

  _setupKeyboard() {
    document.addEventListener('keydown', e => {
      if (this._isInputFocused()) return;
      const c = e.code, k = e.key;
      if (c === 'Space') { e.preventDefault(); this.keys.space = true; }
      else if (c === 'KeyW') { e.preventDefault(); this.keys.w = true; }
      else if (c === 'KeyA') { e.preventDefault(); this.keys.a = true; }
      else if (c === 'KeyS') { e.preventDefault(); this.keys.s = true; }
      else if (c === 'KeyD') { e.preventDefault(); this.keys.d = true; }
      else if (c === 'KeyQ') this.keys.q = true;
      else if (c === 'KeyP') {
        if (CC.Net.practiceMode) {
          CC.aiPaused = !CC.aiPaused;
          CC.addBuildFlash(CC.CONFIG.W / 2, CC.CONFIG.H / 2, CC.aiPaused ? 'BOT PAUSED' : 'BOT RESUMED', 2.5);
        }
      }
      else { const lk = k.toLowerCase(); this.keys[lk] = true; }

      // Build mode toggles
      if (k === '1') { this.buildMode = this.buildMode === 1 ? 0 : 1; e.preventDefault(); }
      if (k === '2') { this.buildMode = this.buildMode === 2 ? 0 : 2; e.preventDefault(); }
      if (k === '3') { this.buildMode = this.buildMode === 3 ? 0 : 3; e.preventDefault(); }
      if (k === '4') { this.buildMode = this.buildMode === 4 ? 0 : 4; e.preventDefault(); }
      if (k === '8' || c === 'Digit8') { this.upgEClicked = true; e.preventDefault(); }
      if (k === '9' || c === 'Digit9') { this.upgRClicked = true; e.preventDefault(); }
      if (k === '0' || c === 'Digit0') { this.upgFClicked = true; e.preventDefault(); }
      if (k === 'Escape') this.buildMode = 0;

      CC.buildMode = this.buildMode;
    });

    document.addEventListener('keyup', e => {
      if (this._isInputFocused()) return;
      const c = e.code, k = e.key;
      if (c === 'Space') this.keys.space = false;
      else if (c === 'KeyW') this.keys.w = false;
      else if (c === 'KeyA') this.keys.a = false;
      else if (c === 'KeyS') this.keys.s = false;
      else if (c === 'KeyD') this.keys.d = false;
      else if (c === 'KeyQ') this.keys.q = false;
      else { const lk = k.toLowerCase(); this.keys[lk] = false; }
    });
  },

  _setupMouse(canvas) {
    canvas.addEventListener('click', e => {
      canvas.focus();
      CC.Sound.resume();
      if (CC.gameState && CC.gameState.phase === 'gameover') {
        const r = canvas.getBoundingClientRect();
        const cx = (e.clientX - r.left) * (CC.CONFIG.W / r.width);
        const cy = (e.clientY - r.top) * (CC.CONFIG.H / r.height);
        const bx = CC.CONFIG.W / 2 - 120, by = CC.CONFIG.H / 2 + 55, bw = 240, bh = 44;
        if (cx >= bx && cx <= bx + bw && cy >= by && cy <= by + bh) { CC.UI.backToMenu(); return; }
      }
    });

    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - r.left) * (CC.CONFIG.W / r.width);
      this.mouseY = (e.clientY - r.top) * (CC.CONFIG.H / r.height);
    });

    canvas.addEventListener('mousedown', e => {
      e.preventDefault();
      CC.Sound.resume();
      if (e.button === 0) { this.mouseLeftDown = true; this.mouseLeftClicked = true; }
      if (e.button === 2) { this.mouseRightDown = true; this.mouseRightClicked = true; }
    });

    canvas.addEventListener('mouseup', e => {
      if (e.button === 0) this.mouseLeftDown = false;
      if (e.button === 2) this.mouseRightDown = false;
    });

    canvas.addEventListener('contextmenu', e => e.preventDefault());
  },

  _setupFocusHandlers(canvas) {
    // Tab visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        Object.keys(this.keys).forEach(k => this.keys[k] = false);
        this.mouseLeftDown = false; this.mouseRightDown = false;
        this.mouseLeftClicked = false; this.mouseRightClicked = false;
      } else {
        setTimeout(() => { canvas.focus(); CC.Sound.resume(); }, 100);
      }
    });

    // Window blur
    window.addEventListener('blur', () => {
      Object.keys(this.keys).forEach(k => this.keys[k] = false);
      this.mouseLeftDown = false; this.mouseRightDown = false;
      this.mouseLeftClicked = false; this.mouseRightClicked = false;
    });

    // Auto-focus canvas when clicking during game
    document.addEventListener('click', () => {
      if (CC.gameState && CC.gameState.phase !== 'menu' && CC.gameState.phase !== 'gameover') {
        canvas.focus();
        CC.Sound.resume();
      }
    });
  },

  _isInputFocused() {
    const ae = document.activeElement;
    return ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT');
  },

  /** Capture current input state and reset one-shot flags */
  capture() {
    const inp = {
      w: !!this.keys.w, a: !!this.keys.a, s: !!this.keys.s, d: !!this.keys.d,
      space: !!this.keys.space, q: !!this.keys.q,
      mx: this.mouseX, my: this.mouseY,
      lmb: this.mouseLeftClicked, rmb: this.mouseRightClicked,
      buildMode: this.buildMode,
      upgE: this.upgEClicked, upgR: this.upgRClicked, upgF: this.upgFClicked,
    };
    this.mouseLeftClicked = false;
    this.mouseRightClicked = false;
    this.upgEClicked = false;
    this.upgRClicked = false;
    this.upgFClicked = false;
    CC.buildMode = this.buildMode;
    CC.mouseX = this.mouseX;
    CC.mouseY = this.mouseY;
    return inp;
  },
};

// ---- Guest State Interpolation ----
CC.Guest = {
  prevState: null, curState: null, stateTime: 0,

  setState(s) {
    if (!s || !s.mechs || !s.cores) return;
    if (this.curState) this.prevState = this.curState;
    this.curState = s;
    this.stateTime = performance.now();
  },

  // Returns a render-safe snapshot with interpolated positions
  interpolate() {
    if (!this.curState) return null;
    if (!this.prevState) return this.curState;
    const elapsed = performance.now() - this.stateTime;
    const t = CC.clamp(elapsed / 50, 0, 1);

    const s = this.curState;
    const lerpCache = [];
    for (let p = 0; p < 2; p++) {
      if (this.prevState.mechs && this.prevState.mechs[p] && s.mechs && s.mechs[p]) {
        const pm = this.prevState.mechs[p], cm = s.mechs[p];
        if (!pm.dead && !cm.dead) {
          lerpCache.push({ p, x: CC.lerp(pm.x, cm.x, t), y: CC.lerp(pm.y, cm.y, t) });
        }
      }
    }
    // Apply lerp temporarily
    for (const lc of lerpCache) {
      s.mechs[lc.p]._origX = s.mechs[lc.p].x;
      s.mechs[lc.p]._origY = s.mechs[lc.p].y;
      s.mechs[lc.p].x = lc.x;
      s.mechs[lc.p].y = lc.y;
    }
    s._lerpCache = lerpCache;
    return s;
  },

  // Restore original positions after render
  restore(s) {
    if (s._lerpCache) {
      for (const lc of s._lerpCache) {
        s.mechs[lc.p].x = s.mechs[lc.p]._origX;
        s.mechs[lc.p].y = s.mechs[lc.p]._origY;
        delete s.mechs[lc.p]._origX;
        delete s.mechs[lc.p]._origY;
      }
      delete s._lerpCache;
    }
  },
};

window.CC = CC;



/* === main.js === */

/**
 * CONVEYOR CLASH v15 — Main Entry Point
 * Game loop, update orchestrator, initialization.
 * Ties together all modules: State, Energy, Combat, AI, Renderer, Network.
 */
const C = CC.CONFIG;

// State refs (aliased for backward compat in other modules)
CC.gameState = null;
CC.animTime = 0;
CC.buildMode = 0;
CC.mouseX = C.W / 2;
CC.mouseY = C.H / 2;
CC.aiPaused = false;
CC.playerColor = 'cyan';
CC.playerShape = 'arrow';
CC.remotePlayerShape = 'arrow';
CC.remotePlayerColor = 'cyan';

let lastTime = performance.now();
CC.gameTickInterval = null;

// ---- Main Update (called only on host / practice mode) ----
function updateGame(gs, dt) {
  if (gs.phase === 'countdown') {
    gs.countdown -= dt;
    gs.time += dt;
    CC.animTime = gs.time;
    if (gs.countdown <= 0) { gs.phase = 'playing'; gs.countdown = 0; }
    return;
  }
  if (gs.phase === 'gameover') return;

  gs.time += dt;
  CC.animTime = gs.time;

  // Tick cooldowns
  CC.tickCooldowns(gs, dt);

  // Gather inputs
  const inp = [null, null];
  inp[0] = CC.Input.capture();

  if (CC.Net.practiceMode) {
    if (!CC.aiPaused) {
      // Initialize AI timer on first call
      if (CC.AI.timer === undefined) CC.AI.timer = 0;
      inp[1] = CC.AI.getInput(gs, 1);
    } else {
      inp[1] = { w: false, a: false, s: false, d: false, space: false, q: false,
        mx: gs.mechs[1].x, my: gs.mechs[1].y, lmb: false, rmb: false, buildMode: 0,
        upgE: false, upgR: false, upgF: false };
    }
  } else {
    if (CC.Net.remoteInput) {
      inp[1] = {
        w: !!CC.Net.remoteInput.w, a: !!CC.Net.remoteInput.a,
        s: !!CC.Net.remoteInput.s, d: !!CC.Net.remoteInput.d,
        space: !!CC.Net.remoteInput.space, q: !!CC.Net.remoteInput.q,
        mx: CC.Net.remoteInput.mx, my: CC.Net.remoteInput.my,
        lmb: !!CC.Net.remoteInput.lmb, rmb: !!CC.Net.remoteInput.rmb,
        buildMode: CC.Net.remoteInput.buildMode || 0,
        upgE: !!CC.Net.remoteInput.upgE, upgR: !!CC.Net.remoteInput.upgR, upgF: !!CC.Net.remoteInput.upgF,
      };
      CC.Net.remoteInput.lmb = false;
      CC.Net.remoteInput.rmb = false;
    }
  }

  // Process mech inputs & movement
  for (let p = 0; p < 2; p++) {
    CC.processMechInput(gs, p, inp[p], dt);
  }

  // Collisions
  CC.resolveMechCollisions(gs);

  // Melee
  for (let p = 0; p < 2; p++) CC.resolveMelee(gs, p, dt);

  // Bullets + turret bullets
  CC.updateBullets(gs, dt);
  CC.updateTurrets(gs, dt);
  CC.updateTurretBullets(gs, dt);

  // Spawners & mobs
  CC.updateSpawners(gs, dt);
  CC.updateMobs(gs, dt);

  // Energy
  CC.computeEnergy(gs);
  for (let p = 0; p < 2; p++) {
    let eGen = C.BASE_ENERGY_RATE + gs.connectedNodes[p] * C.NODE_RATE;
    if (!isFinite(eGen)) eGen = C.BASE_ENERGY_RATE;
    gs.energy[p] = Math.min(C.MAX_ENERGY, Math.max(0, gs.energy[p] + eGen * dt));
  }
  // Tower energy drain
  for (let p = 0; p < 2; p++) {
    let turretCount = 0;
    for (const b of gs.buildings) { if (b.owner === p && b.type === 3) turretCount++; }
    if (turretCount > 0) gs.energy[p] = Math.max(0, gs.energy[p] - turretCount * 0.15 * dt);
  }

  // Particles & effects
  CC.updateParticles(gs, dt);
  CC.UI.update(dt);

  // Power-ups
  CC.updatePowerUps(gs, dt);

  // Lava
  CC.updateLava(gs, dt);

  // Cleanup
  CC.cleanupBuildings(gs);

  // Death + win
  CC.checkDeaths(gs);
}

// ---- Game Loop ----
function gameLoop(ts) {
  requestAnimationFrame(gameLoop);
  const dt = Math.min((ts - lastTime) / 1000, 0.1);
  lastTime = ts;

  if (!CC.gameState) {
    const ctx = document.getElementById('game').getContext('2d');
    ctx.fillStyle = '#0a0a1e';
    ctx.fillRect(0, 0, C.W, C.H);
    return;
  }

  if (CC.Net.isHost || CC.Net.practiceMode) {
    CC.animTime = CC.gameState.time;
    CC.Renderer.render(CC.gameState);

    // Network sync
    if (!CC.Net.practiceMode && CC.Net.connected) {
      const now = performance.now();
      if (now - CC.Net.lastInputSent > 200) {
        const payload = CC.stripStateForNetwork(CC.gameState);
        const serialized = JSON.stringify(payload);
        if (serialized.length < 8192) {
          CC.Net.send({ action: 'data', payload: { t: 's', s: payload } });
          CC.Net.lastInputSent = now;
        }
      }
    }
  } else {
    // Guest: send input, receive state
    if (CC.Net.connected) {
      const now = performance.now();
      if (now - CC.Net.lastInputSent > 100) {
        const inp = CC.Input.capture();
        CC.Net.send({ action: 'data', payload: { t: 'i', ...inp, playerShape: CC.playerShape, playerColor: CC.playerColor } });
        CC.Net.lastInputSent = now;
      }
    }
    if (CC.gameState) {
      const renderState = CC.Guest.interpolate() || CC.gameState;
      CC.animTime = renderState.time;
      CC.Renderer.render(renderState);
      CC.Guest.restore(renderState);
    }
  }
}

// ---- Tick Timer ----
CC.startGameTicks = () => {
  if (CC.gameTickInterval) return;
  CC.gameTickInterval = setInterval(() => {
    if (!CC.gameState) return;
    if (CC.Net.isHost || CC.Net.practiceMode) {
      updateGame(CC.gameState, C.TICK);
    }
  }, Math.round(C.TICK * 1000));
};

CC.stopGameTicks = () => {
  if (CC.gameTickInterval) { clearInterval(CC.gameTickInterval); CC.gameTickInterval = null; }
};

// ---- Initialization ----
(function init() {
  const canvas = document.getElementById('game');

  // Auto-detect relay URL from query params
  (function () {
    const params = new URLSearchParams(location.search);
    if (params.has('relay')) {
      document.getElementById('relay-select').value = 'custom';
      document.getElementById('custom-url-row').style.display = 'block';
      document.getElementById('relay-url-input').value = params.get('relay');
    }
  })();

  // Init subsystems
  CC.Sound.init();
  CC.Renderer.init(canvas);
  CC.Input.init(canvas);
  CC.UI.initCustomization();

  // Start render loop
  requestAnimationFrame(gameLoop);
})();

window.CC = CC;



