// ========================================================
// SquareX (NIRIKSHAN) - Complete Interactive Script
// Fluid scroll reveal, map pins, tabs, phone simulation & modal
// ========================================================

// 1. Scroll Reveal Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Connected Workflow Active State Cycle + Click
const flowItems = document.querySelectorAll('.flow-item');
let currentFlow = 0;
let flowTimer = setInterval(() => {
  flowItems.forEach(x => x.classList.remove('active'));
  flowItems[currentFlow % flowItems.length].classList.add('active');
  currentFlow++;
}, 2200);

flowItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    clearInterval(flowTimer);
    flowItems.forEach(x => x.classList.remove('active'));
    item.classList.add('active');
    currentFlow = index;
  });
});

// 3. Hero Map Interactive Facility Pins
const pins = document.querySelectorAll('.hero-stage .pin');
const stageFacName = document.getElementById('stage-fac-name');
const stageFacStatus = document.getElementById('stage-fac-status');

pins.forEach(pin => {
  pin.addEventListener('click', () => {
    pins.forEach(p => p.classList.remove('active'));
    pin.classList.add('active');
    const fac = pin.getAttribute('data-fac');
    const dist = pin.getAttribute('data-dist');
    const status = pin.getAttribute('data-status');
    const scheme = pin.getAttribute('data-scheme');

    if (stageFacName && stageFacStatus) {
      stageFacName.textContent = `${fac} (${scheme})`;
      if (status === 'Attention') {
        stageFacStatus.innerHTML = `<b style="background:#a17a4c;box-shadow:0 0 0 6px rgba(161,122,76,.12)"></b> Geofence Alert · ${dist}`;
      } else {
        stageFacStatus.innerHTML = `<b></b> ${status} · Haversine ${dist}`;
      }
    }
  });
});

// 4. Phone Inspector Interactive Button
const phoneBtn = document.getElementById('phone-btn');
const phoneToast = document.getElementById('phone-toast');
const phoneModePill = document.getElementById('phone-mode-pill');

if (phoneBtn) {
  phoneBtn.addEventListener('click', () => {
    phoneBtn.textContent = 'Inspection Secured ✓';
    phoneBtn.style.background = '#587364';
    phoneBtn.style.color = '#fff';
    if (phoneToast) phoneToast.style.display = 'block';
    if (phoneModePill) phoneModePill.innerHTML = '● SHA-256 Sealed';

    setTimeout(() => {
      phoneBtn.textContent = 'Continue inspection →';
      phoneBtn.style.background = '#eef0eb';
      phoneBtn.style.color = '#191a19';
      if (phoneToast) phoneToast.style.display = 'none';
      if (phoneModePill) phoneModePill.innerHTML = '● Fastify 4G Live';
    }, 2800);
  });
}

// 5. Command Center Terminal Tabs
const tabLinks = document.querySelectorAll('.tab-link');
const tabPanes = document.querySelectorAll('.tab-content-pane');

tabLinks.forEach(link => {
  link.addEventListener('click', () => {
    tabLinks.forEach(l => l.classList.remove('selected'));
    tabPanes.forEach(p => p.classList.remove('active'));

    link.classList.add('selected');
    const tabId = link.getAttribute('data-tab');
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }
  });
});

// 6. Live Clock in Command Center
const liveClock = document.getElementById('live-ist-clock');
function updateClock() {
  if (!liveClock) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  liveClock.textContent = `${h}:${m}:${s} IST`;
}
setInterval(updateClock, 1000);
updateClock();

// 7. Video Demo Modal
const videoModal = document.getElementById('video-modal');
const closeModalBtn = document.getElementById('close-modal');
const demoVideoFrame = document.getElementById('demo-video-frame');

const demoButtons = [
  document.getElementById('btn-watch-demo'),
  document.getElementById('btn-hero-demo'),
  document.getElementById('btn-cta-demo')
].filter(Boolean);

function openDemoModal() {
  if (!videoModal) return;
  videoModal.classList.add('active');
  if (demoVideoFrame) {
    demoVideoFrame.src = demoVideoFrame.getAttribute('data-src');
  }
}

function closeDemoModal() {
  if (!videoModal) return;
  videoModal.classList.remove('active');
  if (demoVideoFrame) {
    demoVideoFrame.src = '';
  }
}

demoButtons.forEach(btn => btn.addEventListener('click', openDemoModal));
if (closeModalBtn) closeModalBtn.addEventListener('click', closeDemoModal);

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeDemoModal();
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
    closeDemoModal();
  }
});

// 8. Download APK Button
const apkBtn = document.getElementById('btn-apk-hero');
if (apkBtn) {
  apkBtn.addEventListener('click', (e) => {
    // If it's an <a> tag, native navigation works; otherwise fallback to window.open
    if (apkBtn.tagName.toLowerCase() !== 'a') {
      window.open('https://github.com/erkrishna69/SIH/releases/tag/v1.0.0-build.4-4432452', '_blank');
    }
  });
}

// 9. Interactive Kinetic Grid Physics Engine (Cursor Warp + Click Ripples)
(function initKineticGrid() {
  const canvas = document.getElementById('kinetic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const CELL_SIZE = 56;
  const INFLUENCE_RADIUS = 260;
  const MAX_WARP = 24;
  const DOT_SPACING = 28;
  const LERP_SPEED = 0.08;
  const NODE_BASE_RADIUS = 1.8;
  const NODE_ACTIVE_RADIUS = 3.4;

  let W = window.innerWidth;
  let H = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let mouse = { x: -9999, y: -9999 };
  let targetMouse = { x: -9999, y: -9999 };
  let ripples = [];

  function isDark() {
    return document.body.classList.contains('dark-theme');
  }

  function getTheme() {
    if (isDark()) {
      return {
        bg: '#121412',
        dot: 'rgba(255, 255, 255, 0.06)',
        lineBase: { r: 255, g: 255, b: 255, a: 0.11 },
        lineActive: { r: 104, g: 194, b: 146, a: 0.95 },
        nodeBase: { r: 255, g: 255, b: 255, a: 0.22 },
        nodeActive: { r: 104, g: 194, b: 146, a: 1.0 },
        glow: '104, 194, 146',
        ripple: '104, 194, 146'
      };
    }
    return {
      bg: '#f7f7f5',
      dot: 'rgba(23, 24, 23, 0.05)',
      lineBase: { r: 23, g: 24, b: 23, a: 0.08 },
      lineActive: { r: 75, g: 115, b: 92, a: 0.88 },
      nodeBase: { r: 23, g: 24, b: 23, a: 0.20 },
      nodeActive: { r: 75, g: 115, b: 92, a: 1.0 },
      glow: '75, 115, 92',
      ripple: '75, 115, 92'
    };
  }

  function lerpN(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(base, active, t) {
    const r = Math.round(lerpN(base.r, active.r, t));
    const g = Math.round(lerpN(base.g, active.g, t));
    const b = Math.round(lerpN(base.b, active.b, t));
    const a = lerpN(base.a, active.a, t);
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    targetMouse.x = e.clientX;
    targetMouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    targetMouse.x = -9999;
    targetMouse.y = -9999;
  });

  window.addEventListener('click', (e) => {
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      opacity: 1,
      born: performance.now()
    });
  });

  function getWarpedPoint(gx, gy, col, row, cols, rows) {
    const edgeMargin = 1.5;
    const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
    const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
    const pinFactor = Math.max(0, colPin * colPin * rowPin * rowPin);

    const dx = gx - mouse.x;
    const dy = gy - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

    let rx = 0;
    let ry = 0;
    for (let i = 0; i < ripples.length; i++) {
      const r = ripples[i];
      const rdx = gx - r.x;
      const rdy = gy - r.y;
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
      const waveWidth = 60;
      const diff = rdist - r.radius;
      if (Math.abs(diff) < waveWidth) {
        const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
        const angle = Math.atan2(rdy, rdx);
        const sign = diff < 0 ? -1 : 1;
        rx += Math.cos(angle) * strength * sign * -1;
        ry += Math.sin(angle) * strength * sign * -1;
      }
    }

    if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
      const t = dist / INFLUENCE_RADIUS;
      const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
      const warpAmt = eased * MAX_WARP * pinFactor;
      const angle = Math.atan2(dy, dx);
      return {
        pt: {
          x: gx - Math.cos(angle) * warpAmt + rx,
          y: gy - Math.sin(angle) * warpAmt + ry
        },
        proximity
      };
    }

    return { pt: { x: gx + rx, y: gy + ry }, proximity };
  }

  function draw(now) {
    mouse.x = lerpN(mouse.x, targetMouse.x, LERP_SPEED);
    mouse.y = lerpN(mouse.y, targetMouse.y, LERP_SPEED);

    const theme = getTheme();
    ctx.clearRect(0, 0, W, H);

    // If dark theme, draw background
    if (isDark()) {
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);
    }

    // Static dot grid texture
    ctx.fillStyle = theme.dot;
    for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
        ctx.beginPath();
        ctx.arc(x, y, 0.75, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Update ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      const age = (now - r.born) / 1000;
      r.radius = Math.max(0, age * 420);
      r.opacity = Math.max(0, 1 - age * 1.25);
      if (r.opacity <= 0) ripples.splice(i, 1);
    }

    // Build warped grid
    const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
    const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
    const cellW = W / (cols - 1);
    const cellH = H / (rows - 1);

    const pts = [];
    const prox = [];

    for (let row = 0; row < rows; row++) {
      pts[row] = [];
      prox[row] = [];
      for (let col = 0; col < cols; col++) {
        const res = getWarpedPoint(col * cellW, row * cellH, col, row, cols, rows);
        pts[row][col] = res.pt;
        prox[row][col] = res.proximity;
      }
    }

    // Grid lines
    function drawSeg(p1, p2, pr1, pr2) {
      const avg = (pr1 + pr2) / 2;
      const t = avg * avg * (3 - 2 * avg); // smoothstep
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = lerpColor(theme.lineBase, theme.lineActive, t);
      ctx.lineWidth = lerpN(0.8, 1.6, t);
      ctx.stroke();
    }

    ctx.lineCap = 'butt';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);
      }
    }

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);
      }
    }

    // Intersection nodes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const p = pts[row][col];
        const pr = prox[row][col];
        const t = pr * pr * (3 - 2 * pr);
        const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

        if (t > 0.25) {
          const glowR = r + lerpN(0, 7, (t - 0.25) / 0.75);
          const grd = ctx.createRadialGradient(p.x, p.y, r * 0.4, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(${theme.glow}, ${(t * 0.35).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${theme.glow}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor(theme.nodeBase, theme.nodeActive, t);
        ctx.fill();
      }
    }

    // Ripple concentric rings
    for (let i = 0; i < ripples.length; i++) {
      const r = ripples[i];
      const safeRadius = Math.max(0, r.radius);
      ctx.beginPath();
      ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${theme.ripple}, ${(r.opacity * 0.30).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();

// 10. Kinetic Theme Toggle (Light Minimal / Dark Cyber-Slate)
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

if (themeToggleBtn) {
  const savedTheme = localStorage.getItem('squarex-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Light grid';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDarkNow = document.body.classList.toggle('dark-theme');
    localStorage.setItem('squarex-theme', isDarkNow ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = isDarkNow ? '☀️' : '🌙';
    if (themeLabel) themeLabel.textContent = isDarkNow ? 'Light grid' : 'Dark grid';
  });
}
