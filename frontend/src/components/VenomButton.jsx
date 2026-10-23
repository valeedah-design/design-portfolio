import React, { useEffect, useRef } from 'react';
import './VenomButton.css';

// A button with a symbiote living in it. When the cursor comes near, the
// symbiote oozes out of the side facing the cursor, clamps onto it and
// keeps yanking it back toward the button, with gulps travelling down the
// tendrils. Hovering the button itself gets it swallowed.
//
// Everything runs in one requestAnimationFrame loop writing straight to the
// DOM. It switches itself off on touch-only devices and for people who
// prefer reduced motion.

const RANGE = 190;        // px from the button edge where the effect starts
const MAX_PULL = 18;      // px the button is dragged toward the cursor
const TENDRILS = 6;
const MASS_BLOBS = 5;
const DROPS = 6;
const RING = 16;          // blobs that bubble round the button when it's engulfed
const VB_W = 760;         // svg canvas, centred on the button
const VB_H = 600;

// Where a ray from the centre at `ang` leaves a w x h rectangle.
const rayRect = (hw, hh, ang) => {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  const tx = Math.abs(c) > 1e-6 ? hw / Math.abs(c) : Infinity;
  const ty = Math.abs(s) > 1e-6 ? hh / Math.abs(s) : Infinity;
  const t = Math.min(tx, ty);
  return [c * t, s * t];
};

// Filled tendril from a (root, width wRoot) to b (tip, width wTip) along a
// quadratic curve bent by control point c.
const tendrilPath = (ax, ay, cx, cy, bx, by, wRoot, wTip, pulse = -1, pulseAmt = 0) => {
  const steps = 16;
  const left = [];
  const right = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const mt = 1 - t;
    const x = mt * mt * ax + 2 * mt * t * cx + t * t * bx;
    const y = mt * mt * ay + 2 * mt * t * cy + t * t * by;
    const dx = 2 * mt * (cx - ax) + 2 * t * (bx - cx);
    const dy = 2 * mt * (cy - ay) + 2 * t * (by - cy);
    const len = Math.hypot(dx, dy) || 1;
    // swollen root, stretched neck, bulb just before the grasping tip
    // swallowing bulge that travels from the tip back toward the button
    const gulp = pulse >= 0 ? pulseAmt * Math.exp(-((t - pulse) ** 2) / 0.008) : 0;
    const neck = 1 - 0.35 * Math.sin(Math.PI * t) + 0.25 * Math.exp(-((t - 0.88) ** 2) / 0.006) + gulp;
    const w = ((1 - t) * wRoot + t * wTip) * neck * 0.5;
    const nx = (-dy / len) * w;
    const ny = (dx / len) * w;
    left.push(`${(x + nx).toFixed(1)},${(y + ny).toFixed(1)}`);
    right.unshift(`${(x - nx).toFixed(1)},${(y - ny).toFixed(1)}`);
  }
  return `M${left.join('L')}L${right.join('L')}Z`;
};

// Point on a w x h rectangle outline, t in [0,1) clockwise from top-left.
const rectPoint = (w, h, t) => {
  let d = (((t % 1) + 1) % 1) * 2 * (w + h);
  if (d < w) return [d - w / 2, -h / 2];
  d -= w;
  if (d < h) return [w / 2, d - h / 2];
  d -= h;
  if (d < w) return [w / 2 - d, h / 2];
  d -= w;
  return [-w / 2, h / 2 - d];
};

// Rounded rectangle path centred on (x, y).
const roundRect = (x, y, w, h, r) => {
  const rr = Math.min(r, w / 2, h / 2);
  const l = x - w / 2;
  const t = y - h / 2;
  return `M${l + rr},${t}H${l + w - rr}A${rr},${rr} 0 0 1 ${l + w},${t + rr}V${t + h - rr}`
    + `A${rr},${rr} 0 0 1 ${l + w - rr},${t + h}H${l + rr}A${rr},${rr} 0 0 1 ${l},${t + h - rr}`
    + `V${t + rr}A${rr},${rr} 0 0 1 ${l + rr},${t}Z`;
};

const setCircle = (el, x, y, r) => {
  el.setAttribute('cx', x.toFixed(1));
  el.setAttribute('cy', y.toFixed(1));
  el.setAttribute('r', r > 0.2 ? r.toFixed(1) : '0');
};

const VenomButton = ({ children, className = '', ...props }) => {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const svgRef = useRef(null);
  const refs = useRef({
    tRim: [], tCore: [], sheen: [], tipRim: [], tipCore: [],
    mRim: [], mCore: [], dRim: [], dCore: [], rRim: [], rCore: [],
    skinRim: null, skinCore: null,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    const svg = svgRef.current;
    const R = refs.current;
    if (!wrap || !btn || !svg) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (reduce.matches || !finePointer.matches) return undefined;

    const rnd = (a, b) => a + Math.random() * (b - a);
    const tendrils = Array.from({ length: TENDRILS }, (_, i) => ({
      spread: (i / (TENDRILS - 1) - 0.5) * 1.5 + rnd(-0.08, 0.08),
      phase: rnd(0, Math.PI * 2),
      speed: rnd(1.8, 3.2),
      thick: rnd(0.85, 1.25),
      lag: rnd(0.92, 1),          // some tendrils reach a touch slower
      orbit: rnd(24, 46),         // how far from the cursor the tip hovers (fingers splay round it)
    }));
    const massSeeds = Array.from({ length: MASS_BLOBS }, () => ({
      phase: rnd(0, Math.PI * 2), speed: rnd(1.2, 2.4), size: rnd(0.6, 1.05), off: rnd(-1, 1),
    }));
    const ring = Array.from({ length: RING }, (_, i) => ({
      t: (i + rnd(-0.2, 0.2)) / RING, phase: rnd(0, Math.PI * 2), speed: rnd(1.5, 3), size: rnd(0.7, 1.2),
    }));
    const drops = Array.from({ length: DROPS }, () => ({ alive: false, x: 0, y: 0, vy: 0, r: 0 }));

    let mouse = null;
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let prox = 0;
    let engulf = 0;                // eased 0..1 how much it has swallowed the button
    let reach = 0;                 // eased 0..1 how far the tendrils have extended
    let local = { x: 120, y: 0 };  // last cursor position relative to the button centre
    let raf = 0;
    let running = false;
    let lastT = 0;

    const onMove = (e) => { mouse = { x: e.clientX, y: e.clientY }; wake(); };
    const onLeave = () => { mouse = null; wake(); };

    const frame = (now) => {
      const time = now / 1000;
      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0.016;
      lastT = now;
      const rect = wrap.getBoundingClientRect();
      const w = btn.offsetWidth;
      const h = btn.offsetHeight;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      let target = 0;
      let inside = 0;
      if (mouse) {
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const ex = Math.max(Math.abs(dx) - w / 2, 0);
        const ey = Math.max(Math.abs(dy) - h / 2, 0);
        target = Math.max(0, 1 - Math.hypot(ex, ey) / RANGE);
        inside = ex === 0 && ey === 0 ? 1 : 0;
        if (target > 0) local = { x: dx, y: dy };
      }
      prox += (target - prox) * 0.1;
      engulf += (inside - engulf) * (inside > engulf ? 0.14 : 0.1);
      // tendrils shoot out quickly and retract a little slower
      reach += (target - reach) * (target > reach ? 0.16 : 0.08);

      // rhythmic yank: the tendrils clench and haul back toward the button
      const tug = Math.max(0, Math.sin(time * 2.4)) ** 4 * reach * (1 - engulf);

      // the button leans toward the cursor, then braces on each yank
      const dist = Math.hypot(local.x, local.y) || 1;
      const ux = local.x / dist;
      const uy = local.y / dist;
      const pull = Math.min(dist * 0.15, MAX_PULL) * prox * (1 - 0.8 * tug);
      vel.x = (vel.x + (ux * pull - pos.x) * 0.08) * 0.74;
      vel.y = (vel.y + (uy * pull * 0.7 - pos.y) * 0.08) * 0.74;
      pos.x += vel.x;
      pos.y += vel.y;
      const lean = Math.min(Math.hypot(pos.x, pos.y) / MAX_PULL, 1);
      btn.style.transform = `translate(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px) scale(${(1 + lean * 0.035).toFixed(3)}, ${(1 - lean * 0.025).toFixed(3)})`;
      wrap.style.setProperty('--venom', prox.toFixed(3));

      const visible = reach > 0.01 || engulf > 0.01;
      svg.style.opacity = visible ? Math.min(1, Math.max(reach, engulf) * 2).toFixed(3) : '0';
      const g = Math.min(1, reach * 1.25) * (1 - engulf);   // tendrils withdraw into the skin while engulfed
      const curAng = Math.atan2(local.y, local.x);
      const mx = local.x;
      const my = local.y;

      // ---- engulfed: a liquid skin over the whole button, bubbling at the edges ----
      {
        const pad = 16 * engulf;
        const sw = w + pad * 2;
        const sh = h + pad * 2;
        if (engulf > 0.01) {
          R.skinRim.setAttribute('d', roundRect(pos.x, pos.y, sw + 6, sh + 6, 18 + pad));
          R.skinCore.setAttribute('d', roundRect(pos.x, pos.y, sw, sh, 16 + pad));
        } else {
          R.skinRim.setAttribute('d', '');
          R.skinCore.setAttribute('d', '');
        }
        for (let j = 0; j < RING; j += 1) {
          const rg = ring[j];
          const a = time * rg.speed + rg.phase;
          const [px, py] = rectPoint(w + pad * 1.4, h + pad * 1.4, rg.t + Math.sin(a * 0.3) * 0.01);
          const r = (9 + 5 * Math.sin(a)) * rg.size * engulf;
          setCircle(R.rRim[j], px + pos.x, py + pos.y, r ? r + 3 : 0);
          setCircle(R.rCore[j], px + pos.x, py + pos.y, r);
        }
      }

      // ---- the mass bulging out of the button on the cursor side ----
      const [fx0, fy0] = rayRect(w / 2, h / 2, curAng);
      const fx = fx0 + pos.x;
      const fy = fy0 + pos.y;
      const massR = (14 + 26 * reach);
      for (let j = 0; j < MASS_BLOBS; j += 1) {
        const m = massSeeds[j];
        const a = time * m.speed + m.phase;
        const side = m.off * massR * 0.9;
        const bx = fx + ux * massR * 0.25 * reach - uy * side + Math.cos(a) * 4;
        const by = fy + uy * massR * 0.25 * reach + ux * side + Math.sin(a * 1.3) * 4;
        const r = massR * m.size * (0.85 + 0.15 * Math.sin(a * 2)) * g;
        setCircle(R.mRim[j], bx, by, r + 3);
        setCircle(R.mCore[j], bx, by, r);
      }

      // ---- thick tendrils reaching for the cursor ----
      for (let i = 0; i < TENDRILS; i += 1) {
        const td = tendrils[i];
        const rootAng = curAng + td.spread * 0.55;
        const [rx0, ry0] = rayRect(w / 2, h / 2, rootAng);
        const ax = rx0 + pos.x;
        const ay = ry0 + pos.y;
        // each tip aims at its own spot around the cursor, grasping at it
        const grab = curAng + Math.PI + td.spread * 1.6 + Math.sin(time * td.speed + td.phase) * 0.5;
        // once close, the fingertips clamp tight round the cursor
        const orbit = td.orbit * (0.6 + 0.4 * Math.sin(time * td.speed * 1.3 + td.phase)) * (1 - 0.65 * reach);
        const gx = mx + Math.cos(grab) * orbit;
        const gy = my + Math.sin(grab) * orbit;
        const e = Math.min(1, reach * 4) * td.lag;  // latches onto the cursor well before it reaches the button
        // each yank drags the grip back toward the button
        const haul = 22 * tug;
        const tx = ax + (gx - ax) * e - ux * haul;
        const ty = ay + (gy - ay) * e - uy * haul;
        const len = Math.hypot(tx - ax, ty - ay) || 1;
        const nx = -(ty - ay) / len;
        const ny = (tx - ax) / len;
        // pulled taut while yanking, loose and writhing in between
        const wob = (Math.sin(time * td.speed + td.phase) * (6 + len * 0.16) + td.spread * len * 0.18) * (1 - 0.75 * tug);
        const bx = (ax + tx) / 2 + nx * wob;
        const by = (ay + ty) / 2 + ny * wob;
        // muscles thicken as they contract
        const root = 30 * td.thick * g * (1 + 0.25 * tug);
        const tip = 9 * td.thick * g * (1 + 0.4 * tug);
        // a gulp travels from the cursor back into the button
        const pulse = 1 - ((time * 0.85 + i * 0.17) % 1);
        R.tRim[i].setAttribute('d', tendrilPath(ax, ay, bx, by, tx, ty, root + 6, tip + 5, pulse, 0.6));
        R.tCore[i].setAttribute('d', tendrilPath(ax, ay, bx, by, tx, ty, root, tip, pulse, 0.6));
        const hl = Math.max(root, 3) * 0.2;
        R.sheen[i].setAttribute('d', tendrilPath(ax, ay - root * 0.15, bx, by - root * 0.14, tx, ty - tip * 0.12, hl, hl * 0.3));
        // grasping fingertip
        const fr = (6 + 2 * Math.sin(time * td.speed * 2 + td.phase)) * td.thick * g;
        setCircle(R.tipRim[i], tx, ty, fr + 3);
        setCircle(R.tipCore[i], tx, ty, fr);

        if (reach > 0.5 && Math.random() < 0.01 * reach) {
          const d = drops.find((x) => !x.alive);
          if (d) {
            const t = rnd(0.35, 0.7);
            const mt = 1 - t;
            d.x = mt * mt * ax + 2 * mt * t * bx + t * t * tx;
            d.y = mt * mt * ay + 2 * mt * t * by + t * t * ty;
            d.vy = 0;
            d.r = rnd(3.5, 6) * td.thick;
            d.alive = true;
          }
        }
      }

      // ---- drops ----
      let anyDrop = false;
      for (let j = 0; j < DROPS; j += 1) {
        const d = drops[j];
        if (d.alive) {
          d.vy += 520 * dt;
          d.y += d.vy * dt;
          d.r *= 0.985;
          if (d.r < 0.8 || d.y > VB_H / 2) d.alive = false;
          anyDrop = anyDrop || d.alive;
        }
        const r = d.alive ? d.r : 0;
        setCircle(R.dRim[j], d.x, d.y, r ? r + 2.5 : 0);
        setCircle(R.dCore[j], d.x, d.y, r);
      }

      const settled = !anyDrop && !mouse && reach < 0.005 && prox < 0.005 && engulf < 0.005
        && Math.abs(pos.x) < 0.05 && Math.abs(pos.y) < 0.05;
      const idleFar = !visible && !anyDrop && target === 0 && engulf < 0.005
        && Math.abs(pos.x) < 0.05 && Math.abs(pos.y) < 0.05;
      if (settled || idleFar) {
        btn.style.transform = '';
        svg.style.opacity = '0';
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    function wake() {
      if (running) return;
      running = true;
      lastT = 0;
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      btn.style.transform = '';
    };
  }, []);

  const R = refs.current;
  const list = (n, prefix, arr, Tag = 'path') => Array.from({ length: n }, (_, i) => (
    <Tag key={`${prefix}${i}`} ref={(el) => { arr[i] = el; }} {...(Tag === 'circle' ? { r: 0 } : {})} />
  ));

  return (
    <div className="venom-wrap" ref={wrapRef}>
      <svg
        ref={svgRef}
        className="venom-svg"
        viewBox={`${-VB_W / 2} ${-VB_H / 2} ${VB_W} ${VB_H}`}
        style={{ width: `${VB_W}px`, height: `${VB_H}px` }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="venom-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" />
          </filter>
          <filter id="venom-sheen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <radialGradient id="venom-body" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="300">
            <stop offset="0" className="venom-body-0" />
            <stop offset="0.55" className="venom-body-1" />
            <stop offset="1" className="venom-body-2" />
          </radialGradient>
        </defs>
        {/* neon rim */}
        <g className="venom-rim" filter="url(#venom-goo)">
          <path ref={(el) => { R.skinRim = el; }} />
          {list(RING, 'rr', R.rRim, 'circle')}
          {list(TENDRILS, 'tr', R.tRim)}
          {list(MASS_BLOBS, 'mr', R.mRim, 'circle')}
          {list(TENDRILS, 'pr', R.tipRim, 'circle')}
          {list(DROPS, 'dr', R.dRim, 'circle')}
        </g>
        {/* liquid body */}
        <g className="venom-core" filter="url(#venom-goo)">
          <path ref={(el) => { R.skinCore = el; }} />
          {list(RING, 'rc', R.rCore, 'circle')}
          {list(TENDRILS, 'tc', R.tCore)}
          {list(MASS_BLOBS, 'mc', R.mCore, 'circle')}
          {list(TENDRILS, 'pc', R.tipCore, 'circle')}
          {list(DROPS, 'dc', R.dCore, 'circle')}
        </g>
        {/* wet highlight */}
        <g className="venom-sheen" filter="url(#venom-sheen)">{list(TENDRILS, 'sh', R.sheen)}</g>
      </svg>
      <button ref={btnRef} className={`venom-button ${className}`} {...props}>
        {children}
      </button>
    </div>
  );
};

export default VenomButton;
