const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function initCyberCity(canvas) {
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
  if (!ctx) return;

  let dpr = 1;
  let w = 0;
  let h = 0;

  const state = {
    t: 0,
    mouseX: 0,
    mouseY: 0,
    vx: 0,
    vy: 0,
    buildings: [],
    lights: [],
    haze: [],
  };

  const rand = (seed) => {
    // Mulberry32
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const resize = () => {
    const nextDpr = clamp(window.devicePixelRatio || 1, 1, 2);
    const rect = canvas.getBoundingClientRect();
    dpr = nextDpr;
    w = Math.max(1, Math.floor(rect.width * dpr));
    h = Math.max(1, Math.floor(rect.height * dpr));
    canvas.width = w;
    canvas.height = h;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    regenerate();
  };

  const regenerate = () => {
    const cw = Math.max(1, Math.floor(canvas.clientWidth));
    const ch = Math.max(1, Math.floor(canvas.clientHeight));

    const seedBase = 8190819;
    const r = rand(seedBase);

    const horizon = Math.floor(ch * 0.44);
    const groundY = Math.floor(ch * 0.78);

    const density = cw < 720 ? 0.65 : 1;
    const cols = Math.floor((cw / 36) * density);
    const rows = 6;

    state.buildings = [];
    for (let layer = 0; layer < rows; layer++) {
      const depth = layer / (rows - 1);
      const layerCols = Math.floor(cols * (0.55 + depth * 0.65));
      for (let i = 0; i < layerCols; i++) {
        const x = (i / layerCols) * cw + (r() - 0.5) * 18;
        const baseW = 18 + r() * 42;
        const height = (28 + r() * 240) * (0.28 + depth * 0.95);
        const y = groundY - height - depth * 20 - r() * 10;
        const width = baseW * (0.55 + depth * 0.85);

        const hue = 190 + r() * 55;
        const neonHue = r() < 0.6 ? hue : 270 + r() * 30;
        const neon = `hsla(${neonHue}, 92%, 68%, ${0.10 + depth * 0.22})`;
        const body = `rgba(10,16,32,${0.32 + depth * 0.25})`;

        state.buildings.push({
          layer,
          depth,
          x,
          y,
          width,
          height,
          body,
          neon,
          windowsSeed: Math.floor(r() * 1e9),
          antenna: r() < 0.22 && depth > 0.35 ? 1 : 0,
        });
      }
    }

    // floating lights / drones
    const lightCount = Math.floor((cw / 40) * (cw < 720 ? 0.7 : 1));
    state.lights = [];
    for (let i = 0; i < lightCount; i++) {
      const p = r();
      state.lights.push({
        x: r() * cw,
        y: horizon - 60 + r() * 140,
        z: 0.15 + r() * 0.85,
        r: 0.8 + r() * 1.8,
        s: 0.35 + r() * 0.85,
        hue: p < 0.6 ? 190 + r() * 50 : 275 + r() * 40,
        phase: r() * Math.PI * 2,
      });
    }

    // haze blobs near horizon
    state.haze = [];
    const hazeCount = cw < 720 ? 5 : 8;
    for (let i = 0; i < hazeCount; i++) {
      state.haze.push({
        x: r() * cw,
        y: horizon - 20 + r() * 160,
        rx: 120 + r() * 240,
        ry: 28 + r() * 55,
        a: 0.05 + r() * 0.07,
        drift: (r() - 0.5) * 0.22,
      });
    }
  };

  const drawSky = (cw, ch) => {
    const g = ctx.createLinearGradient(0, 0, 0, ch);
    g.addColorStop(0, "rgba(9,12,22,0.75)");
    g.addColorStop(0.5, "rgba(8,12,24,0.45)");
    g.addColorStop(1, "rgba(7,10,18,0.10)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cw, ch);

    // distant glow
    const glow = ctx.createRadialGradient(cw * 0.62, ch * 0.34, 0, cw * 0.62, ch * 0.34, ch * 0.55);
    glow.addColorStop(0, "rgba(110,242,255,0.10)");
    glow.addColorStop(0.6, "rgba(167,139,250,0.06)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, cw, ch);
  };

  const drawHaze = (cw, ch, horizon, t) => {
    for (const hz of state.haze) {
      const x = (hz.x + t * hz.drift) % cw;
      const y = hz.y + Math.sin(t * 0.25 + hz.x * 0.01) * 6;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, hz.rx);
      grd.addColorStop(0, `rgba(110,242,255,${hz.a})`);
      grd.addColorStop(0.6, `rgba(167,139,250,${hz.a * 0.55})`);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(x, y, hz.rx, hz.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const mist = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 120);
    mist.addColorStop(0, "rgba(234,240,255,0)");
    mist.addColorStop(0.35, "rgba(110,242,255,0.05)");
    mist.addColorStop(1, "rgba(7,10,18,0)");
    ctx.fillStyle = mist;
    ctx.fillRect(0, horizon - 40, cw, 220);
  };

  const drawBuilding = (b, cw, ch, horizon, t, parX, parY) => {
    const x = b.x + parX * (0.18 + b.depth * 0.6);
    const y = b.y + parY * (0.10 + b.depth * 0.35);
    const w0 = b.width;
    const h0 = b.height;

    // simple faux-3D: skew top edge based on parallax
    const skew = (0.8 + b.depth * 2.0) * (parX * 0.015);
    const topLift = (0.6 + b.depth * 1.8) * (parY * 0.020);

    ctx.fillStyle = b.body;
    ctx.strokeStyle = "rgba(234,240,255,0.06)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w0, y);
    ctx.lineTo(x + w0 + skew, y - topLift);
    ctx.lineTo(x + skew, y - topLift);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // neon edge
    ctx.strokeStyle = b.neon;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 0.5, y + 0.5);
    ctx.lineTo(x + w0 - 0.5, y + 0.5);
    ctx.stroke();

    // windows: sparse, animated flicker
    const r = rand(b.windowsSeed);
    const cols = Math.max(3, Math.floor(w0 / 10));
    const rows = Math.max(6, Math.floor(h0 / 16));
    const padX = 4 + r() * 3;
    const padY = 8 + r() * 6;
    const ww = (w0 - padX * 2) / cols;
    const wh = (h0 - padY * 2) / rows;
    const flick = 0.5 + 0.5 * Math.sin(t * 1.1 + b.x * 0.02 + b.depth * 4.0);
    const onProb = 0.10 + b.depth * 0.28 + flick * 0.08;

    for (let yy = 0; yy < rows; yy++) {
      for (let xx = 0; xx < cols; xx++) {
        if (r() > onProb) continue;
        const wx = x + padX + xx * ww + 1;
        const wy = y + padY + yy * wh + 1;
        const bright = 0.08 + r() * 0.18 + b.depth * 0.12;
        const hue = r() < 0.7 ? 190 : 275;
        ctx.fillStyle = `hsla(${hue}, 92%, 70%, ${bright})`;
        ctx.fillRect(wx, wy, Math.max(2, ww - 3), Math.max(2, wh - 4));
      }
    }

    if (b.antenna) {
      const ax = x + w0 * (0.15 + (b.depth % 0.3));
      const ay = y - topLift;
      const ah = 18 + b.depth * 24;
      ctx.strokeStyle = "rgba(234,240,255,0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax + skew * 0.3, ay - ah);
      ctx.stroke();
      ctx.fillStyle = `rgba(110,242,255,${0.10 + 0.15 * (0.5 + 0.5 * Math.sin(t * 2.0 + ax * 0.03))})`;
      ctx.beginPath();
      ctx.arc(ax + skew * 0.3, ay - ah, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // ground fade for near buildings
    if (b.depth > 0.75) {
      const fade = ctx.createLinearGradient(0, y + h0 * 0.55, 0, y + h0 + 10);
      fade.addColorStop(0, "rgba(7,10,18,0)");
      fade.addColorStop(1, "rgba(7,10,18,0.30)");
      ctx.fillStyle = fade;
      ctx.fillRect(x - 3, y + h0 * 0.55, w0 + 10, h0);
    }
  };

  const drawLights = (cw, ch, horizon, t, parX, parY) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const l of state.lights) {
      const speed = prefersReduced ? 0 : l.s;
      const dx = Math.cos(t * 0.18 + l.phase) * (12 + l.z * 34) * speed;
      const dy = Math.sin(t * 0.22 + l.phase) * (7 + l.z * 24) * speed;
      const x = (l.x + dx + parX * (0.10 + l.z * 0.35) + cw) % cw;
      const y = l.y + dy + parY * (0.08 + l.z * 0.20);
      const rr = l.r * (0.7 + l.z * 1.6);
      const grd = ctx.createRadialGradient(x, y, 0, x, y, rr * 6);
      grd.addColorStop(0, `hsla(${l.hue}, 95%, 70%, ${0.22 + l.z * 0.20})`);
      grd.addColorStop(0.35, `hsla(${l.hue}, 95%, 70%, ${0.08 + l.z * 0.10})`);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, rr * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `hsla(${l.hue}, 95%, 78%, ${0.25 + l.z * 0.22})`;
      ctx.beginPath();
      ctx.arc(x, y, rr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const loop = (ts) => {
    const cw = canvas.clientWidth || 1;
    const ch = canvas.clientHeight || 1;
    if (cw <= 1 || ch <= 1) {
      requestAnimationFrame(loop);
      return;
    }

    const t = ts * 0.001;
    state.t = t;

    // smooth parallax
    state.vx += (state.mouseX - state.vx) * 0.06;
    state.vy += (state.mouseY - state.vy) * 0.06;
    const parX = state.vx * 26;
    const parY = state.vy * 18;

    ctx.clearRect(0, 0, cw, ch);

    const horizon = Math.floor(ch * 0.44);

    drawSky(cw, ch);
    drawHaze(cw, ch, horizon, prefersReduced ? 0 : t);

    // sort far -> near
    const buildings = state.buildings.slice().sort((a, b) => a.depth - b.depth);
    for (const b of buildings) drawBuilding(b, cw, ch, horizon, prefersReduced ? 0 : t, parX, parY);

    drawLights(cw, ch, horizon, prefersReduced ? 0 : t, parX, parY);

    // subtle scanline
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgba(234,240,255,0.8)";
    const scanY = ((t * 40) % ch) | 0;
    ctx.fillRect(0, scanY, cw, 1);
    ctx.restore();

    requestAnimationFrame(loop);
  };

  const onMove = (e) => {
    if (prefersReduced) return;
    const cw = canvas.clientWidth || 1;
    const ch = canvas.clientHeight || 1;
    const x = ("touches" in e ? e.touches?.[0]?.clientX : e.clientX) ?? cw / 2;
    const y = ("touches" in e ? e.touches?.[0]?.clientY : e.clientY) ?? ch / 2;
    state.mouseX = clamp((x / cw) * 2 - 1, -1, 1);
    state.mouseY = clamp((y / ch) * 2 - 1, -1, 1);
  };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });

  resize();
  requestAnimationFrame(loop);
}

