// Arithmo-Edge Core Interactive Engine (ES6+ Vanilla JS + GSAP)

const TARGET_MIDNIGHT_MS = new Date("2027-01-01T00:00:00+06:00").getTime();

const ARENA_CATALOG = {
  nt: {
    name: "Number Theory",
    color: "#00F0FF",
    subsite: "arithmo-edge.github.io/number-theory/",
    titles: [
      { min: 0, max: 499, title: "FOUNDRY INITIATE" },
      { min: 500, max: 899, title: "COMPOSITE APPRENTICE" },
      { min: 900, max: 1199, title: "SIEVE SCOUT" },
      { min: 1200, max: 1399, title: "DIVISOR VANGUARD" },
      { min: 1400, max: 1599, title: "MODULAR OPERATOR" },
      { min: 1600, max: 1799, title: "CONGRUENCE STRATEGIST" },
      { min: 1800, max: 1999, title: "DIOPHANTINE VECTOR" },
      { min: 2000, max: 2199, title: "EULERIAN SENTINEL" },
      { min: 2200, max: 2399, title: "GAUSSIAN OVERLORD" },
      { min: 2400, max: 2699, title: "DIRICHLET ARCHON" },
      { min: 2700, max: 2999, title: "RIEMANN TRANSCENDENTALIST" },
      { min: 3000, max: 9999, title: "ARITHMETIC SINGULARITY" },
    ],
  },
  alg: {
    name: "Algebra",
    color: "#8B5CF6",
    subsite: "arithmo-edge.github.io/algebra/",
    titles: [
      { min: 0, max: 499, title: "VARIABLE INITIATE" },
      { min: 500, max: 899, title: "LINEAR APPRENTICE" },
      { min: 900, max: 1199, title: "QUADRATIC SCOUT" },
      { min: 1200, max: 1399, title: "POLYNOMIAL VANGUARD" },
      { min: 1400, max: 1599, title: "INEQUALITY OPERATOR" },
      { min: 1600, max: 1799, title: "RECURRENCE STRATEGIST" },
      { min: 1800, max: 1999, title: "FUNCTIONAL VECTOR" },
      { min: 2000, max: 2199, title: "CAUCHY-SCHWARZ SENTINEL" },
      { min: 2200, max: 2399, title: "VIETA OVERLORD" },
      { min: 2400, max: 2699, title: "GALOIS ARCHON" },
      { min: 2700, max: 2999, title: "ABELIAN TRANSCENDENT" },
      { min: 3000, max: 9999, title: "ALGEBRAIC SINGULARITY" },
    ],
  },
  geo: {
    name: "Geometry",
    color: "#F59E0B",
    subsite: "arithmo-edge.github.io/geometry/",
    titles: [
      { min: 0, max: 499, title: "EUCLIDEAN INITIATE" },
      { min: 500, max: 899, title: "ANGLE APPRENTICE" },
      { min: 900, max: 1199, title: "CHORD SCOUT" },
      { min: 1200, max: 1399, title: "CEVIAN VANGUARD" },
      { min: 1400, max: 1599, title: "CYCLIC OPERATOR" },
      { min: 1600, max: 1799, title: "RADICAL AXIS STRATEGIST" },
      { min: 1800, max: 1999, title: "HOMOTHETY VECTOR" },
      { min: 2000, max: 2199, title: "INVERSION SENTINEL" },
      { min: 2200, max: 2399, title: "BARYCENTRIC OVERLORD" },
      { min: 2400, max: 2699, title: "PROJECTIVE ARCHON" },
      { min: 2700, max: 2999, title: "RIEMANNIAN TRANSCENDENT" },
      { min: 3000, max: 9999, title: "GEOMETRIC SINGULARITY" },
    ],
  },
  comb: {
    name: "Combinatorics & Permutation",
    color: "#10B981",
    subsite: "arithmo-edge.github.io/combinatorics/",
    titles: [
      { min: 0, max: 499, title: "COUNTING INITIATE" },
      { min: 500, max: 899, title: "FACTORIAL APPRENTICE" },
      { min: 900, max: 1199, title: "BINOMIAL SCOUT" },
      { min: 1200, max: 1399, title: "PIGEONHOLE VANGUARD" },
      { min: 1400, max: 1599, title: "INVARIANT OPERATOR" },
      { min: 1600, max: 1799, title: "EXTREMAL STRATEGIST" },
      { min: 1800, max: 1999, title: "GRAPH VECTOR" },
      { min: 2000, max: 2199, title: "GENERATING SENTINEL" },
      { min: 2200, max: 2399, title: "RAMSEY OVERLORD" },
      { min: 2400, max: 2699, title: "ERGODIC ARCHON" },
      { min: 2700, max: 2999, title: "TURÁN TRANSCENDENT" },
      { min: 3000, max: 9999, title: "COMBINATORIAL SINGULARITY" },
    ],
  },
  mixed: {
    name: "Mixed Mathematical Olympiad",
    color: "#F43F5E",
    subsite: "arithmo-edge.github.io/mixed-olympiad/",
    titles: [
      { min: 0, max: 499, title: "OLYMPIAD INITIATE" },
      { min: 500, max: 899, title: "AXIOM APPRENTICE" },
      { min: 900, max: 1199, title: "DEDUCTION SCOUT" },
      { min: 1200, max: 1399, title: "THEOREM VANGUARD" },
      { min: 1400, max: 1599, title: "SYNTHESIS OPERATOR" },
      { min: 1600, max: 1799, title: "HYBRID STRATEGIST" },
      { min: 1800, max: 1999, title: "HEURISTIC VECTOR" },
      { min: 2000, max: 2199, title: "PARADOX SENTINEL" },
      { min: 2200, max: 2399, title: "POLYMATHEMATICAL OVERLORD" },
      { min: 2400, max: 2699, title: "ARCHIMEDEAN ARCHON" },
      { min: 2700, max: 2999, title: "HILBERTIAN TRANSCENDENT" },
      { min: 3000, max: 9999, title: "OMNI-OLYMPIAD SINGULARITY" },
    ],
  },
};

function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function pad2(n) {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

/* 1. Live Countdown Engine to December 31, 2026 at 12:00 Midnight */
function initCountdown() {
  const containers = document.querySelectorAll("[data-countdown]");
  if (!containers.length) return;
  let prevSec = -1;

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, TARGET_MIDNIGHT_MS - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    containers.forEach((box) => {
      const dEl = box.querySelector('[data-cd="days"]');
      const hEl = box.querySelector('[data-cd="hours"]');
      const mEl = box.querySelector('[data-cd="minutes"]');
      const sEl = box.querySelector('[data-cd="seconds"]');
      if (dEl) dEl.textContent = pad2(days);
      if (hEl) hEl.textContent = pad2(hours);
      if (mEl) mEl.textContent = pad2(minutes);
      if (sEl) {
        sEl.textContent = pad2(seconds);
        if (prevSec !== seconds && window.gsap && !prefersReducedMotion()) {
          window.gsap.fromTo(
            sEl,
            { scale: 1.12, opacity: 0.72 },
            { scale: 1, opacity: 1, duration: 0.28, ease: "power2.out" },
          );
        }
      }
    });
    prevSec = seconds;
  }

  tick();
  setInterval(tick, 1000);
}

/* 2. GSAP Right-Side Slide-In Overlay Drawer */
function initDrawer() {
  const toggleBtn = document.getElementById("nav-drawer-toggle");
  const closeBtn = document.getElementById("nav-drawer-close");
  const backdrop = document.getElementById("nav-drawer-backdrop");
  const panel = document.getElementById("nav-drawer-panel");
  const iconOpen = document.getElementById("nav-icon-open");
  const iconClose = document.getElementById("nav-icon-close");

  if (!toggleBtn || !panel || !backdrop) return;
  let isOpen = false;

  panel.style.visibility = "hidden";
  panel.style.pointerEvents = "none";

  if (window.gsap) {
    window.gsap.set(panel, { x: "100%" });
    window.gsap.set(backdrop, { autoAlpha: 0 });
  } else {
    panel.style.transform = "translateX(100%)";
    backdrop.style.display = "none";
  }

  function setMenuIcons(open) {
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function openDrawer() {
    if (isOpen) return;
    isOpen = true;
    document.body.style.overflow = "hidden";
    backdrop.classList.remove("pointer-events-none");
    panel.style.visibility = "visible";
    panel.style.pointerEvents = "auto";
    setMenuIcons(true);

    if (window.gsap && !prefersReducedMotion()) {
      window.gsap.to(backdrop, {
        autoAlpha: 1,
        duration: 0.25,
        ease: "power2.out",
      });
      window.gsap.to(panel, { x: "0%", duration: 0.42, ease: "power3.out" });
      const items = panel.querySelectorAll(".drawer-link-item");
      window.gsap.fromTo(
        items,
        { x: 22, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.025,
          ease: "power2.out",
          delay: 0.08,
        },
      );
    } else {
      backdrop.style.display = "block";
      backdrop.style.opacity = "1";
      backdrop.style.visibility = "visible";
      panel.style.transform = "translateX(0%)";
    }
  }

  function closeDrawer() {
    if (!isOpen) return;
    isOpen = false;
    document.body.style.overflow = "";
    backdrop.classList.add("pointer-events-none");
    setMenuIcons(false);

    if (window.gsap && !prefersReducedMotion()) {
      window.gsap.to(backdrop, {
        autoAlpha: 0,
        duration: 0.24,
        ease: "power2.in",
      });
      window.gsap.to(panel, {
        x: "100%",
        duration: 0.34,
        ease: "power3.in",
        onComplete: () => {
          if (!isOpen) {
            panel.style.visibility = "hidden";
            panel.style.pointerEvents = "none";
          }
        },
      });
    } else {
      backdrop.style.opacity = "0";
      backdrop.style.visibility = "hidden";
      panel.style.transform = "translateX(100%)";
      panel.style.visibility = "hidden";
      panel.style.pointerEvents = "none";
    }
  }

  toggleBtn.addEventListener("click", () =>
    isOpen ? closeDrawer() : openDrawer(),
  );
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeDrawer();
  });

  const currentFile = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  panel.querySelectorAll("a[data-page]").forEach((link) => {
    const target = (link.getAttribute("data-page") || "").toLowerCase();
    if (
      target === currentFile ||
      (currentFile === "" && target === "index.html")
    ) {
      link.classList.add("border-cyan-400/50", "bg-cyan-400/10", "text-white");
    }
  });
}

/* 3. Interactive Canvas Prime Constellation */
function initConstellation() {
  const canvas = document.getElementById("constellation-canvas");
  if (!canvas || prefersReducedMotion()) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  const pointer = { x: -9999, y: -9999 };
  const nodes = [];
  const NODE_COUNT = 46;

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
    height = canvas.height = parent ? parent.clientHeight : 640;
  }

  function seed() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 1.1,
        hue:
          i % 3 === 0
            ? "0, 240, 255"
            : i % 3 === 1
              ? "139, 92, 246"
              : "16, 185, 129",
      });
    }
  }

  resize();
  seed();
  window.addEventListener("resize", () => {
    resize();
    seed();
  });
  canvas.parentElement?.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      const distP = Math.hypot(pointer.x - n.x, pointer.y - n.y);
      if (distP < 180) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - distP / 180) * 0.24})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const d = Math.hypot(n.x - m.x, n.y - m.y);
        if (d < 135) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - d / 135) * 0.16})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.hue}, 0.72)`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* 4. Spotlight Card Mouse Illumination + 3D Cursor Tilt & Specular Glare */
function initSpotlightCards() {
  const canTilt =
    !prefersReducedMotion() &&
    Boolean(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.setProperty("--glare-x", `${x}px`);
      card.style.setProperty("--glare-y", `${y}px`);

      if (canTilt && rect.width > 0 && rect.height > 0) {
        const nx = x / rect.width - 0.5;
        const ny = y / rect.height - 0.5;
        const rotateY = (nx * 12).toFixed(2);
        const rotateX = (-ny * 12).toFixed(2);
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* 5. GSAP ScrollTrigger Reveals, Scroll Progress, 3D Parallax & Count-Up */
function initScrollAnimations() {
  const progressBar = document.querySelector(".ae-scroll-progress");
  if (!window.gsap || prefersReducedMotion()) {
    if (progressBar) progressBar.style.transform = "scaleX(0)";
    return;
  }
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if (progressBar && ScrollTrigger) {
    gsap.fromTo(
      progressBar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      },
    );
  }

  const heroItems = document.querySelectorAll(".gsap-hero");
  if (heroItems.length) {
    gsap.fromTo(
      heroItems,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" },
    );
  }

  document.querySelectorAll(".gsap-reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: ScrollTrigger ? { trigger: el, start: "top 90%", once: true } : undefined,
      },
    );
  });

  document.querySelectorAll("[data-3d-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 28, rotateX: 8, opacity: 0, transformPerspective: 1000 },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.72,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: ScrollTrigger ? { trigger: el, start: "top 88%", once: true } : undefined,
      },
    );
  });

  if (ScrollTrigger) {
    document.querySelectorAll("[data-3d-parallax]").forEach((el) => {
      const depth = Number(el.getAttribute("data-3d-parallax-depth") || "18");
      gsap.fromTo(
        el,
        { y: -depth * 0.45 },
        {
          y: depth * 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });
  }

  document.querySelectorAll("[data-count]").forEach((el) => {
    const raw = el.getAttribute("data-count") || "";
    const target = Number(raw.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(target) || target <= 0) return;
    const suffix = el.getAttribute("data-count-suffix") || "";
    const state = { val: 0 };
    gsap.to(state, {
      val: target,
      duration: 1.15,
      ease: "power2.out",
      scrollTrigger: ScrollTrigger ? { trigger: el, start: "top 92%", once: true } : undefined,
      onUpdate: () => {
        el.textContent = `${Math.round(state.val).toLocaleString()}${suffix}`;
      },
    });
  });
}

/* 6. Client-Side Deterministic Math Engine (architecture.html: Miller-Rabin + Brent-Pollard's Rho) */
function modPow(base, exp, mod) {
  let result = 1n;
  let b = base % mod;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % mod;
    e >>= 1n;
    b = (b * b) % mod;
  }
  return result;
}

function isMillerRabinPrime(n) {
  if (n < 2n) return false;
  const small = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (const p of small) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }
  let d = n - 1n;
  let s = 0n;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    s += 1n;
  }
  for (const a of [2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n]) {
    if (a % n === 0n) continue;
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

function gcdBig(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

function brentPollardRho(n) {
  if (n % 2n === 0n) return 2n;
  let c = 1n;
  while (true) {
    let y = 2n;
    let r = 1n;
    let q = 1n;
    let g = 1n;
    let x = 2n;
    let ys = 2n;
    const f = (v) => (v * v + c) % n;
    while (g === 1n) {
      x = y;
      for (let i = 0n; i < r; i++) y = f(y);
      let k = 0n;
      while (k < r && g === 1n) {
        ys = y;
        const lim = r - k < 64n ? r - k : 64n;
        for (let i = 0n; i < lim; i++) {
          y = f(y);
          const diff = x > y ? x - y : y - x;
          q = (q * diff) % n;
        }
        g = gcdBig(q, n);
        k += 64n;
      }
      r <<= 1n;
    }
    if (g === n) {
      do {
        ys = f(ys);
        const diff = x > ys ? x - ys : ys - x;
        g = gcdBig(diff, n);
      } while (g === 1n);
    }
    if (g !== n) return g;
    c += 1n;
  }
}

function factorizeBigInt(n) {
  const factors = [];
  function rec(v) {
    if (v <= 1n) return;
    if (isMillerRabinPrime(v)) {
      factors.push(v);
      return;
    }
    const d = brentPollardRho(v);
    rec(d);
    rec(v / d);
  }
  rec(n);
  return factors.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function initDeterministicMathDemo() {
  const inputEl = document.getElementById("det-math-input");
  const runBtn = document.getElementById("det-math-run");
  const primeOut = document.getElementById("det-math-prime");
  const factorsOut = document.getElementById("det-math-factors");
  const timeOut = document.getElementById("det-math-time");
  if (!inputEl || !runBtn || !primeOut) return;

  function evaluate() {
    const raw = (inputEl.value || "").trim();
    if (!/^\d+$/.test(raw) || raw.length > 18) {
      primeOut.textContent = "Enter positive integer (<= 18 digits)";
      if (factorsOut) factorsOut.textContent = "—";
      return;
    }
    const val = BigInt(raw);
    if (val < 2n) {
      primeOut.textContent = "Neither prime nor composite";
      if (factorsOut) factorsOut.textContent = raw;
      return;
    }
    const t0 = performance.now();
    const isP = isMillerRabinPrime(val);
    const facs = factorizeBigInt(val);
    const dt = (performance.now() - t0).toFixed(2);
    primeOut.textContent = isP
      ? "Miller-Rabin Verified PRIME"
      : "Composite Integer";
    if (factorsOut)
      factorsOut.textContent = facs.map((x) => x.toString()).join(" × ");
    if (timeOut) timeOut.textContent = `${dt} ms (0 server calls)`;
  }

  runBtn.addEventListener("click", evaluate);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") evaluate();
  });
  evaluate();
}

/* 7. Interactive ELO Explorer (arenas-elo.html) */
function initEloExplorer() {
  const root = document.getElementById("elo-simulator");
  if (!root) return;

  const arenaBtns = root.querySelectorAll("[data-arena-select]");
  const genSlider = document.getElementById("sim-gen-elo");
  const expSlider = document.getElementById("sim-exp-elo");
  const genVal = document.getElementById("sim-gen-val");
  const expVal = document.getElementById("sim-exp-val");
  const avgVal = document.getElementById("sim-avg-val");
  const titleOut = document.getElementById("sim-rank-title");
  const arenaOut = document.getElementById("sim-arena-name");
  const subsiteOut = document.getElementById("sim-arena-subsite");
  const badgeBox = document.getElementById("sim-badge-box");
  const unlocksOut = document.getElementById("sim-unlocks");
  const ladderBody = document.getElementById("sim-ladder-list");

  let activeArena = "nt";

  function renderLadder() {
    if (!ladderBody) return;
    const arena = ARENA_CATALOG[activeArena];
    ladderBody.innerHTML = arena.titles
      .map(
        (t) => `
      <div class="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-800/70 bg-slate-950/40 text-xs" data-tier-min="${t.min}" data-tier-max="${t.max}">
        <span class="font-semibold tracking-wide text-slate-200">${t.title}</span>
        <span class="font-mono-tabular text-slate-400">${t.max >= 9000 ? `${t.min}+` : `${t.min}–${t.max}`}</span>
      </div>`,
      )
      .join("");
  }

  function update() {
    const arena = ARENA_CATALOG[activeArena];
    const g = Number(genSlider?.value || 1500);
    const e = Number(expSlider?.value || 1700);
    const avg = Math.round((g + e) / 2);

    if (genVal) genVal.textContent = String(g);
    if (expVal) expVal.textContent = String(e);
    if (avgVal) avgVal.textContent = String(avg);
    if (arenaOut) arenaOut.textContent = arena.name;
    if (subsiteOut) subsiteOut.textContent = arena.subsite;

    const match =
      arena.titles.find((t) => avg >= t.min && avg <= t.max) || arena.titles[0];
    if (titleOut) {
      titleOut.textContent = match.title;
      titleOut.style.color = arena.color;
    }
    if (badgeBox) {
      badgeBox.style.borderColor = `${arena.color}66`;
      badgeBox.style.boxShadow = `0 0 36px ${arena.color}1F`;
    }

    if (unlocksOut) {
      const perks = [];
      if (avg >= 1500)
        perks.push(
          "Arithmo Forge Problemsetting Eligible (requires 6 clean matches)",
        );
      if (avg >= 2000)
        perks.push(
          "2000+ Expert Q&A & Grandmaster Peer Review Eligible (Expert Segments 1–2)",
        );
      if (avg < 1500)
        perks.push(
          "Eligible for Daily Rated Arenas, 1v1 Bullet Blitz (±100 ELO), and Virtual Gym",
        );
      unlocksOut.textContent = perks.join(" · ");
    }

    if (ladderBody) {
      ladderBody.querySelectorAll("[data-tier-min]").forEach((row) => {
        const min = Number(row.getAttribute("data-tier-min"));
        const max = Number(row.getAttribute("data-tier-max"));
        const isCurrent = avg >= min && avg <= max;
        row.style.borderColor = isCurrent
          ? arena.color
          : "rgba(30, 41, 59, 0.7)";
        row.style.backgroundColor = isCurrent
          ? `${arena.color}18`
          : "rgba(2, 6, 23, 0.45)";
      });
    }
  }

  arenaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeArena = btn.getAttribute("data-arena-select") || "nt";
      arenaBtns.forEach((b) =>
        b.classList.remove("ring-2", "ring-cyan-400", "bg-slate-800"),
      );
      btn.classList.add("ring-2", "ring-cyan-400", "bg-slate-800");
      renderLadder();
      update();
    });
  });

  genSlider?.addEventListener("input", update);
  expSlider?.addEventListener("input", update);
  renderLadder();
  update();
}

/* 8. Contest Simulators (contests.html) */
function initContestSimulators() {
  const modeBtns = document.querySelectorAll("[data-contest-tab]");
  const modePanels = document.querySelectorAll("[data-contest-panel]");
  if (modeBtns.length && modePanels.length) {
    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-contest-tab");
        modeBtns.forEach((b) => {
          b.classList.remove("bg-cyan-400", "text-slate-950", "font-semibold");
          b.classList.add("text-slate-300", "hover:text-white");
        });
        btn.classList.add("bg-cyan-400", "text-slate-950", "font-semibold");
        btn.classList.remove("text-slate-300", "hover:text-white");
        modePanels.forEach((p) =>
          p.classList.toggle(
            "hidden",
            p.getAttribute("data-contest-panel") !== target,
          ),
        );
      });
    });
  }

  const numpadDisplay = document.getElementById("general-numpad-display");
  const numpadStatus = document.getElementById("general-numpad-status");
  document.querySelectorAll("[data-numpad-key]").forEach((key) => {
    key.addEventListener("click", () => {
      if (!numpadDisplay) return;
      const val = key.getAttribute("data-numpad-key");
      if (val === "CLR") {
        numpadDisplay.textContent = "0";
        if (numpadStatus) numpadStatus.textContent = "Ready for integer input";
      } else if (val === "DEL") {
        numpadDisplay.textContent =
          numpadDisplay.textContent.length > 1
            ? numpadDisplay.textContent.slice(0, -1)
            : "0";
      } else if (val === "SUBMIT") {
        if (numpadStatus) {
          numpadStatus.textContent =
            numpadDisplay.textContent === "2026"
              ? "Accepted · First-Pass Solve Recorded (Overtime Loop Clear)"
              : `Submitted "${numpadDisplay.textContent}" · Queued for Second-Chance Overtime Loop if incorrect`;
        }
      } else {
        numpadDisplay.textContent =
          numpadDisplay.textContent === "0"
            ? val
            : (numpadDisplay.textContent + val).slice(0, 10);
      }
    });
  });

  const flawBtns = document.querySelectorAll("[data-flaw-option]");
  const flawResult = document.getElementById("flaw-audit-result");
  if (flawBtns.length && flawResult) {
    flawBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const verdict = btn.getAttribute("data-flaw-option");
        flawBtns.forEach((b) =>
          b.classList.remove("border-cyan-400", "bg-cyan-400/10"),
        );
        btn.classList.add("border-cyan-400", "bg-cyan-400/10");

        if (verdict === "valid-gap") {
          flawResult.innerHTML =
            '<span class="text-emerald-400 font-semibold">Valid Proof Gap Confirmed (+35 pts Opponent Hack):</span> Division by (a - b) assumes a ≠ b without handling the boundary equality case. Opponent score adjusted; +35 pts awarded to auditor.';
        } else if (verdict === "problem-flaw") {
          flawResult.innerHTML =
            '<span class="text-cyan-400 font-semibold">Official Problem Flaw Escalated (+75 pts + 2-Min SymPy Global Rejudge):</span> Counterexample p = 2 invalidates the stated congruence bound. QPRT-4 ChronoVault triggers automatic 2-minute SymPy global rejudge.';
        } else {
          flawResult.innerHTML =
            '<span class="text-rose-400 font-semibold">Unsuccessful Hack (-10 pts Penalty):</span> Claimed step follows directly from Fermat’s Little Theorem for gcd(a, p) = 1. Anti-spam -10 pts penalty applied.';
        }
      });
    });
  }
}

/* 9. 42-Engine AI Explorer & Soft-Pinch & Semantic Token Meter (ai-core.html) */
function initAiExplorer() {
  const filterBtns = document.querySelectorAll("[data-ai-filter]");
  const cards = document.querySelectorAll("[data-ai-group]");
  if (filterBtns.length && cards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.getAttribute("data-ai-filter");
        filterBtns.forEach((b) => {
          b.classList.remove("bg-cyan-400", "text-slate-950", "font-semibold");
          b.classList.add("text-slate-300");
        });
        btn.classList.add("bg-cyan-400", "text-slate-950", "font-semibold");
        btn.classList.remove("text-slate-300");
        cards.forEach((c) =>
          c.classList.toggle(
            "hidden",
            group !== "all" && c.getAttribute("data-ai-group") !== group,
          ),
        );
      });
    });
  }

  // Soft-Pinch Warning Simulator
  const pinchBtns = document.querySelectorAll("[data-pinch-signal]");
  const pinchJson = document.getElementById("soft-pinch-json");
  const pinchMsg = document.getElementById("soft-pinch-msg");
  if (pinchBtns.length && pinchJson && pinchMsg) {
    const CASES = {
      gaze: {
        json: '{"signal_id":"SP-409","cipher":"AES-256-GCM","source":"Module7_GazeGuard","duration_s":4.8,"flag_level":"ADVISORY_SOFT_PINCH"}',
        msg: 'Arithmo Personal AI Advisory: "Notice: Focus drifted off-canvas for 4.8s during your last practice trial. Keep scratchpad work centered to ensure smooth Sunday Mega verification."',
      },
      paste: {
        json: '{"signal_id":"SP-412","cipher":"AES-256-GCM","source":"PlagioGuard_LaTeX","entropy_jump":0.92,"flag_level":"ADVISORY_SOFT_PINCH"}',
        msg: 'Arithmo Personal AI Advisory: "Tip: Build proofs step-by-step inside the Drag-and-Drop LaTeX editor rather than pasting large external blocks—continuous derivations earn higher ProofGrader clarity."',
      },
      audio: {
        json: '{"signal_id":"SP-418","cipher":"AES-256-GCM","source":"Module7_AudioTrap","axes_triggered":3,"flag_level":"ADVISORY_SOFT_PINCH"}',
        msg: 'Arithmo Personal AI Advisory: "Acoustic Check: Ambient multi-voice frequencies triggered the 3-Axis Audio Trap. A quiet solo workspace protects your HonestyScore during rated rounds."',
      },
    };
    pinchBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-pinch-signal") || "gaze";
        pinchBtns.forEach((b) =>
          b.classList.remove("border-cyan-400", "bg-cyan-400/10"),
        );
        btn.classList.add("border-cyan-400", "bg-cyan-400/10");
        pinchJson.textContent = CASES[k].json;
        pinchMsg.textContent = CASES[k].msg;
      });
    });
  }

  // Semantic Token Meter
  const meterButtons = document.querySelectorAll("[data-token-scenario]");
  const meterCost = document.getElementById("token-meter-cost");
  const meterExplain = document.getElementById("token-meter-explain");
  const multiQueryInput = document.getElementById("token-multi-n");

  function updateTokenScenario(type) {
    const nVal = Math.max(2, Math.min(8, Number(multiQueryInput?.value || 3)));
    if (!meterCost || !meterExplain) return;
    if (type === "greeting") {
      meterCost.textContent = "0 Tokens";
      meterExplain.textContent =
        "Greetings, acknowledgments, and non-analytical prompts are zero-rated (0 token deduction).";
    } else if (type === "duplicate") {
      meterCost.textContent = "-1 Token";
      meterExplain.textContent =
        "Duplicate or repeated clarification of the same problem deducts a fixed -1 token.";
    } else if (type === "multi") {
      meterCost.textContent = `-${nVal} Tokens (-N)`;
      meterExplain.textContent = `Multi-Query prompt bundling ${nVal} distinct Olympiad sub-problems deducts exactly -${nVal} tokens (-N scaling).`;
    } else if (type === "premium") {
      meterCost.textContent = "-2 Tokens (2x Hybrid)";
      meterExplain.textContent =
        "Premium 2x Hybrid mode orchestrates Gemini Pro + Qwen-Math + Python/SymPy verification sandbox.";
    }
  }

  meterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      meterButtons.forEach((b) =>
        b.classList.remove("border-cyan-400", "bg-cyan-400/10"),
      );
      btn.classList.add("border-cyan-400", "bg-cyan-400/10");
      updateTokenScenario(
        btn.getAttribute("data-token-scenario") || "duplicate",
      );
    });
  });
  multiQueryInput?.addEventListener("input", () =>
    updateTokenScenario("multi"),
  );
}

/* 10. QPRT-4 & Module 7 Proctoring Interactive Simulator (security-qprt4.html) */
function initSecuritySim() {
  const phaseBtns = document.querySelectorAll("[data-qprt-phase]");
  const phasePanels = document.querySelectorAll("[data-qprt-panel]");
  phaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-qprt-phase");
      phaseBtns.forEach((b) => {
        b.classList.remove("bg-cyan-400", "text-slate-950", "font-semibold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-cyan-400", "text-slate-950", "font-semibold");
      btn.classList.remove("text-slate-300");
      phasePanels.forEach((p) =>
        p.classList.toggle(
          "hidden",
          p.getAttribute("data-qprt-panel") !== target,
        ),
      );
    });
  });

  const roundSelect = document.getElementById("module7-round-type");
  const module7Out = document.getElementById("module7-status-out");
  if (roundSelect && module7Out) {
    const syncM7 = () => {
      const v = roundSelect.value;
      module7Out.textContent =
        v === "daily"
          ? "Optional Module 7: User-Selectable on Daily Mon–Sat Rounds (4.5s Adaptive Gaze Guard & 3-Axis Audio Trap stay off unless opted in)."
          : "Mandatory Module 7 Active: Camera + Mic enforcement required for Sunday Mega Arena & Top 128 Annual World Cup (4.5s Adaptive Gaze Guard + 3-Axis Audio Trap).";
    };
    roundSelect.addEventListener("change", syncM7);
    syncM7();
  }
}

/* 11. Academy Roster & Guild AI Token Calculator (academies.html) */
function initAcademyCalculator() {
  const tierSelect = document.getElementById("acad-tier-select");
  const membersSlider = document.getElementById("acad-members-slider");
  const membersVal = document.getElementById("acad-members-val");
  const baseOut = document.getElementById("acad-base-fee");
  const dueOut = document.getElementById("acad-member-due");
  const totalOut = document.getElementById("acad-monthly-total");
  const tokensOut = document.getElementById("acad-guild-tokens");
  const rolesOut = document.getElementById("acad-roles-cap");
  const perksOut = document.getElementById("acad-addons-summary");

  if (!tierSelect || !membersSlider) return;

  const TIERS = {
    general: {
      base: 29.99,
      max: 100,
      due: 0.99,
      admins: "1–5 Admins",
      tokens: 20,
      perks:
        "Standard Institutional Dashboard · Inter-Academy Clash & Edu Lab Paid Add-ons",
    },
    premium: {
      base: 49.99,
      max: 500,
      due: 2.99,
      admins: "1–5 Admins",
      tokens: 80,
      perks:
        "Batch Radar Included · Inter-Academy Clash ($4.99) & Virtual Edu Lab ($2.99/24h)",
    },
    supreme: {
      base: 79.99,
      max: 1000,
      due: 6.99,
      admins: "1–5 Admins",
      tokens: 200,
      perks:
        "ALL Institutional Add-ons FREE (Clash, Guidebook $14.99/mo, Edu Lab, On-Demand Contests)",
    },
    enterprise: {
      base: 79.99,
      firstMonth: 149.99,
      max: 2000,
      due: 5.99,
      admins: "1–10 Admins",
      tokens: 200,
      perks:
        "Unlimited Roster Scaling · $5.99/member (<1,000) / $7.99/member (>1,000) · +15 Guild AI Tokens per 50 extra members · All Supreme Perks Free",
    },
  };

  function calc() {
    const key = tierSelect.value;
    const t = TIERS[key];
    let members = Number(membersSlider.value);
    if (members > t.max && key !== "enterprise") {
      members = t.max;
      membersSlider.value = String(t.max);
    }
    membersSlider.max = key === "enterprise" ? "2000" : String(t.max);
    if (membersVal)
      membersVal.textContent = `${members.toLocaleString()} Members`;

    let memberFeeSum = 0;
    let tokens = t.tokens;
    if (key === "enterprise") {
      const under1000 = Math.min(members, 1000);
      const over1000 = Math.max(0, members - 1000);
      memberFeeSum = under1000 * 5.99 + over1000 * 7.99;
      tokens = 200 + Math.floor(over1000 / 50) * 15;
    } else {
      memberFeeSum = members * t.due;
    }

    const total = t.base + memberFeeSum;
    if (baseOut)
      baseOut.textContent =
        key === "enterprise"
          ? "$149.99 1st mo / $79.99 base"
          : `$${t.base.toFixed(2)}/mo`;
    if (dueOut)
      dueOut.textContent =
        key === "enterprise"
          ? "$5.99 (<1k) / $7.99 (>1k)"
          : `$${t.due.toFixed(2)}/member`;
    if (totalOut) totalOut.textContent = `$${total.toFixed(2)}/mo`;
    if (tokensOut) tokensOut.textContent = `${tokens} Guild AI Messages/mo`;
    if (rolesOut)
      rolesOut.textContent = `${t.admins} (Fee Waived) · 1–15 Mentors`;
    if (perksOut) perksOut.textContent = t.perks;
  }

  tierSelect.addEventListener("change", calc);
  membersSlider.addEventListener("input", calc);
  calc();
}

/* 12. Arithmo Wallet +10% Top-Up Calculator (pricing.html) */
function initWalletSim() {
  const btns = document.querySelectorAll("[data-wallet-topup]");
  const amtOut = document.getElementById("wallet-selected-amount");
  const bonusOut = document.getElementById("wallet-bonus-amount");
  const totalOut = document.getElementById("wallet-total-credit");
  if (!btns.length || !amtOut) return;

  function selectAmount(amount) {
    const bonus = Number((amount * 0.1).toFixed(2));
    const total = Number((amount + bonus).toFixed(2));
    amtOut.textContent = `$${amount.toFixed(2)}`;
    if (bonusOut) bonusOut.textContent = `+$${bonus.toFixed(2)} (+10% Bonus)`;
    if (totalOut) totalOut.textContent = `$${total.toFixed(2)} Arithmo Credits`;
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) =>
        b.classList.remove("border-cyan-400", "bg-cyan-400/15", "text-white"),
      );
      btn.classList.add("border-cyan-400", "bg-cyan-400/15", "text-white");
      selectAmount(Number(btn.getAttribute("data-wallet-topup") || 10));
    });
  });
  selectAmount(25);
}

/* 13. 14-Site Ecosystem Map Explorer (architecture.html) */
function initEcosystemExplorer() {
  const nodes = document.querySelectorAll("[data-site-node]");
  const titleOut = document.getElementById("eco-detail-title");
  const urlOut = document.getElementById("eco-detail-url");
  const descOut = document.getElementById("eco-detail-desc");
  const accessOut = document.getElementById("eco-detail-access");

  if (!nodes.length || !titleOut) return;
  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      nodes.forEach((n) =>
        n.classList.remove("border-cyan-400", "bg-cyan-400/10"),
      );
      node.classList.add("border-cyan-400", "bg-cyan-400/10");
      titleOut.textContent = node.getAttribute("data-site-title") || "";
      if (urlOut) urlOut.textContent = node.getAttribute("data-site-url") || "";
      if (descOut)
        descOut.textContent = node.getAttribute("data-site-desc") || "";
      if (accessOut)
        accessOut.textContent = node.getAttribute("data-site-access") || "";
    });
  });
}

/* 14. Golden Vault 5x4 & Schema v1.2 Explorer (socials-forge.html & pioneers.html) */
function initGoldenVault() {
  const btns = document.querySelectorAll("[data-vault-arena]");
  const pathOut = document.getElementById("vault-json-path");
  const sampleOut = document.getElementById("vault-json-sample");
  if (!btns.length || !pathOut) return;

  const SAMPLES = {
    nt: {
      path: "Arithmo-Edge-Golden-Vault/Number_Theory/Segment_4_Apex/set_001.json",
      json: JSON.stringify(
        {
          schema_version: "1.2",
          ecosystem: "Arithmo-Edge",
          mode: "Expert",
          segment: "Segment_4_Apex",
          set_id: "001",
          hub: "Number Theory",
          tags_visibility: "unrated_practice_only",
          hidden_during_live_contest: true,
          problem_count: 10,
          problems: [
            {
              q_index: 1,
              statement_plain:
                "Find all primes p such that p^2 + 2^p is prime.",
              statement_latex:
                "Find all primes $p$ such that $p^2 + 2^p$ is prime.",
              tags: ["Modular Arithmetic", "Parity", "LTE"],
              answer: "p = 3",
            },
          ],
        },
        null,
        2,
      ),
    },
    alg: {
      path: "Arithmo-Edge-Golden-Vault/Algebra/Segment_3_Master/set_002.json",
      json: JSON.stringify(
        {
          schema_version: "1.2",
          ecosystem: "Arithmo-Edge",
          mode: "Expert",
          segment: "Segment_3_Master",
          set_id: "002",
          hub: "Algebra",
          tags_visibility: "unrated_practice_only",
          hidden_during_live_contest: true,
          problem_count: 10,
          problems: [
            {
              q_index: 1,
              statement_plain:
                "Find all functions f: R -> R satisfying f(x^2 + f(y)) = y + f(x)^2.",
              statement_latex:
                "Find all functions $f: \\mathbb{R} \\to \\mathbb{R}$ satisfying $f(x^2 + f(y)) = y + (f(x))^2$.",
              tags: ["Functional Equations", "Injectivity", "Fixed Points"],
              answer: "f(x) = x",
            },
          ],
        },
        null,
        2,
      ),
    },
    geo: {
      path: "Arithmo-Edge-Golden-Vault/Geometry/Segment_4_Apex/set_001.json",
      json: JSON.stringify(
        {
          schema_version: "1.2",
          ecosystem: "Arithmo-Edge",
          mode: "Expert",
          segment: "Segment_4_Apex",
          set_id: "001",
          hub: "Geometry",
          tags_visibility: "unrated_practice_only",
          hidden_during_live_contest: true,
          problem_count: 10,
          problems: [
            {
              q_index: 1,
              statement_plain:
                "In acute triangle ABC, let H be the orthocenter and O the circumcenter. If angle AHB = 2*angle AOB, find angle ACB in degrees.",
              statement_latex:
                "In acute $\\triangle ABC$, let $H$ be the orthocenter and $O$ the circumcenter. If $\\angle AHB = 2\\angle AOB$, find $\\angle ACB$.",
              tags: ["Orthocenter", "Circumcircle", "Angle Chasing"],
              answer: "45 degrees",
            },
          ],
        },
        null,
        2,
      ),
    },
    comb: {
      path: "Arithmo-Edge-Golden-Vault/Combinatorics_and_Permutation/Segment_2_Vanguard/set_003.json",
      json: JSON.stringify(
        {
          schema_version: "1.2",
          ecosystem: "Arithmo-Edge",
          mode: "Expert",
          segment: "Segment_2_Vanguard",
          set_id: "003",
          hub: "Combinatorics & Permutation",
          tags_visibility: "unrated_practice_only",
          hidden_during_live_contest: true,
          problem_count: 10,
          problems: [
            {
              q_index: 1,
              statement_plain:
                "Determine the minimum number of subsets of size 3 needed from {1..7} so every pair appears in at least one subset.",
              statement_latex:
                "Find the minimum number of $3$-element subsets of $\\{1,2,\\dots,7\\}$ covering all pairs.",
              tags: ["Fano Plane", "Block Designs", "Pigeonhole"],
              answer: "7",
            },
          ],
        },
        null,
        2,
      ),
    },
    mixed: {
      path: "Arithmo-Edge-Golden-Vault/Mixed_Mathematical_Olympiad/Segment_4_Apex/set_001.json",
      json: JSON.stringify(
        {
          schema_version: "1.2",
          ecosystem: "Arithmo-Edge",
          mode: "Expert",
          segment: "Segment_4_Apex",
          set_id: "001",
          hub: "Mixed Mathematical Olympiad",
          tags_visibility: "unrated_practice_only",
          hidden_during_live_contest: true,
          problem_count: 10,
          problems: [
            {
              q_index: 1,
              statement_plain:
                "Let a, b be positive integers with (a^2 + b^2) divisible by ab + 1. Evaluate (a^2 + b^2)/(ab + 1) when gcd(a, b) = 1 and a = 2, b = 8.",
              statement_latex:
                "Let $a,b \\in \\mathbb{Z}^+$ satisfy $(ab+1) \\mid (a^2+b^2)$. Compute $\\frac{a^2+b^2}{ab+1}$ for $(a,b) = (2,8)$.",
              tags: ["Vieta Jumping", "Mixed Synthesis", "Diophantine"],
              answer: "4",
            },
          ],
        },
        null,
        2,
      ),
    },
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-vault-arena") || "nt";
      btns.forEach((b) =>
        b.classList.remove("border-cyan-400", "bg-cyan-400/10"),
      );
      btn.classList.add("border-cyan-400", "bg-cyan-400/10");
      const d = SAMPLES[k];
      pathOut.textContent = d.path;
      if (sampleOut) sampleOut.textContent = d.json;
    });
  });
}

/* 15. Interactive HQ Tier Inspector (governance.html) */
function initHqLadder() {
  const btns = document.querySelectorAll("[data-hq-tier]");
  const titleOut = document.getElementById("hq-inspect-title");
  const eloOut = document.getElementById("hq-inspect-elo");
  const perksOut = document.getElementById("hq-inspect-perks");
  const dutiesOut = document.getElementById("hq-inspect-duties");
  if (!btns.length || !titleOut) return;

  const TIERS = {
    sentinel: {
      title: "Core Sentinel",
      elo: "100+ HQ ELO",
      perks:
        "Free Plus Subscription Perks ($2.99/mo value) + Rated Public Competing (Conflict-Free Rounds Only)",
      duties:
        "Entry Headquarters stewardship, problem testing verification, and live round queue triage.",
    },
    architect: {
      title: "Problem Architect",
      elo: "300+ HQ ELO",
      perks:
        "Free Pro Subscription Perks ($5.99/mo value) + Rated Public Competing (Conflict-Free Rounds Only)",
      duties:
        "Audits Forge submissions, enforces >75% AoPS similarity blocks, and validates SymPyVeritas checks.",
    },
    coordinator: {
      title: "Round Coordinator",
      elo: "500+ HQ ELO",
      perks:
        "Free Pro+ Perks + Priority Coordination Tools + Rated Public Competing (Conflict-Free Rounds Only)",
      duties:
        "Operates T-30s Pre-Match Contract Page, handles live clarifications, and authorizes 30s reserve hot-swaps.",
    },
    arbiter: {
      title: "Chief Arbiter",
      elo: "750+ HQ ELO",
      perks:
        "Free Singularity Subscription Perks ($12.99/mo value) + Headquarters AI Access + Rated Public Competing",
      duties:
        "Chairs 4-Step Forensic Appeals, conducts 5-min Live Skill Audits, and queries Supreme Headquarters AI.",
    },
    sovereign: {
      title: "Prime Sovereign",
      elo: "1000+ HQ ELO (Top 3 · Flag-Immune)",
      perks:
        "100% UNLIMITED Free Access to ALL Paid & Pay-As-You-Go Features + Headquarters AI",
      duties:
        "Final constitutional governance, Prime Sovereign Certificate endorsements, and Strict Positional Chronology oversight.",
    },
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-hq-tier") || "sentinel";
      btns.forEach((b) =>
        b.classList.remove("border-cyan-400", "bg-cyan-400/10"),
      );
      btn.classList.add("border-cyan-400", "bg-cyan-400/10");
      const d = TIERS[k];
      titleOut.textContent = d.title;
      if (eloOut) eloOut.textContent = d.elo;
      if (perksOut) perksOut.textContent = d.perks;
      if (dutiesOut) dutiesOut.textContent = d.duties;
    });
  });
}

/* 16. Global Resilient Image Error Fallback (Cyber-Olympiad Holographic SVG Grid) */
function initImageErrorFallback() {
  if (document.documentElement.dataset.aeImgFallbackBound === "1") return;
  document.documentElement.dataset.aeImgFallbackBound = "1";

  const createHoloSvgBanner = (altText) => {
    const wrapper = document.createElement("div");
    wrapper.className =
      "relative flex h-full w-full min-h-[180px] items-center justify-center overflow-hidden rounded-xl border border-cyan-400/25 bg-slate-950/95 text-center";
    wrapper.setAttribute("role", "img");
    wrapper.setAttribute("aria-label", altText || "Arithmo-Edge Visual Module");

    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 800 450");
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;opacity:0.78;pointer-events:none;";

    const defs = document.createElementNS(ns, "defs");
    const grad = document.createElementNS(ns, "linearGradient");
    grad.setAttribute("id", "ae-holo-bg");
    grad.setAttribute("x1", "0%");
    grad.setAttribute("y1", "0%");
    grad.setAttribute("x2", "100%");
    grad.setAttribute("y2", "100%");
    const s1 = document.createElementNS(ns, "stop");
    s1.setAttribute("offset", "0%");
    s1.setAttribute("stop-color", "#040814");
    const s2 = document.createElementNS(ns, "stop");
    s2.setAttribute("offset", "55%");
    s2.setAttribute("stop-color", "#0b1730");
    const s3 = document.createElementNS(ns, "stop");
    s3.setAttribute("offset", "100%");
    s3.setAttribute("stop-color", "#140b29");
    grad.append(s1, s2, s3);

    const pat = document.createElementNS(ns, "pattern");
    pat.setAttribute("id", "ae-grid-pattern");
    pat.setAttribute("width", "40");
    pat.setAttribute("height", "40");
    pat.setAttribute("patternUnits", "userSpaceOnUse");
    const gridPath = document.createElementNS(ns, "path");
    gridPath.setAttribute("d", "M 40 0 L 0 0 0 40");
    gridPath.setAttribute("fill", "none");
    gridPath.setAttribute("stroke", "rgba(0,240,255,0.16)");
    gridPath.setAttribute("stroke-width", "1");
    pat.appendChild(gridPath);

    defs.append(grad, pat);
    svg.appendChild(defs);

    const bgRect = document.createElementNS(ns, "rect");
    bgRect.setAttribute("width", "800");
    bgRect.setAttribute("height", "450");
    bgRect.setAttribute("fill", "url(#ae-holo-bg)");

    const gridRect = document.createElementNS(ns, "rect");
    gridRect.setAttribute("width", "800");
    gridRect.setAttribute("height", "450");
    gridRect.setAttribute("fill", "url(#ae-grid-pattern)");

    const cOuter = document.createElementNS(ns, "circle");
    cOuter.setAttribute("cx", "400");
    cOuter.setAttribute("cy", "225");
    cOuter.setAttribute("r", "150");
    cOuter.setAttribute("fill", "none");
    cOuter.setAttribute("stroke", "rgba(0,240,255,0.28)");
    cOuter.setAttribute("stroke-width", "1.2");
    cOuter.setAttribute("stroke-dasharray", "6 6");

    const cInner = document.createElementNS(ns, "circle");
    cInner.setAttribute("cx", "400");
    cInner.setAttribute("cy", "225");
    cInner.setAttribute("r", "90");
    cInner.setAttribute("fill", "none");
    cInner.setAttribute("stroke", "rgba(139,92,246,0.34)");
    cInner.setAttribute("stroke-width", "1.2");

    const diag1 = document.createElementNS(ns, "line");
    diag1.setAttribute("x1", "120");
    diag1.setAttribute("y1", "40");
    diag1.setAttribute("x2", "680");
    diag1.setAttribute("y2", "410");
    diag1.setAttribute("stroke", "rgba(0,240,255,0.14)");

    const diag2 = document.createElementNS(ns, "line");
    diag2.setAttribute("x1", "680");
    diag2.setAttribute("y1", "40");
    diag2.setAttribute("x2", "120");
    diag2.setAttribute("y2", "410");
    diag2.setAttribute("stroke", "rgba(139,92,246,0.16)");

    svg.append(bgRect, gridRect, diag1, diag2, cOuter, cInner);

    const overlay = document.createElement("div");
    overlay.className = "relative z-10 px-5 py-4";
    const kicker = document.createElement("div");
    kicker.className =
      "font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300";
    kicker.textContent = "ARITHMO-EDGE // HOLOGRAPHIC LATTICE";
    const caption = document.createElement("div");
    caption.className = "mt-1.5 text-xs text-slate-300";
    caption.textContent = altText || "Cyber-Olympiad Infrastructure Grid";
    overlay.append(kicker, caption);

    wrapper.append(svg, overlay);
    return wrapper;
  };

  document.addEventListener(
    "error",
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      if (img.dataset.aeFallbackApplied === "1") return;
      img.dataset.aeFallbackApplied = "1";

      const banner = createHoloSvgBanner(img.alt);
      if (img.parentElement) {
        img.style.display = "none";
        img.parentElement.appendChild(banner);
      }
    },
    true,
  );
}

/* 17. 60-Second Guest Math Duel & Instant ELO Estimator (index.html #guest-duel) */
function initGuestDuel() {
  const root = document.querySelector("[data-guest-duel-root]");
  if (!root) return;

  const MAX_ATTEMPTS = 3;

  const GUEST_PROBLEMS = [
    {
      id: "nt-2026",
      arenaKey: "nt",
      arenaLabel: "Number Theory · Subsite #1",
      statement: "Find the remainder when 2²⁰²⁶ + 3²⁰²⁶ is divided by 5.",
      hint: "Euler / mod-4 cyclicity: 2² ≡ −1 (mod 5) and 3² ≡ −1 (mod 5). Determine (−1)¹⁰¹³ + (−1)¹⁰¹³ modulo 5.",
      answer: "3",
      explanation:
        "Since 2² ≡ −1 (mod 5), 2²⁰²⁶ = (2²)¹⁰¹³ ≡ −1 ≡ 4 (mod 5). Likewise 3² ≡ −1 (mod 5) gives 3²⁰²⁶ ≡ 4 (mod 5). Thus 4 + 4 = 8 ≡ 3 (mod 5).",
      baseElo: 1620,
    },
    {
      id: "alg-vieta",
      arenaKey: "alg",
      arenaLabel: "Algebra · Subsite #2",
      statement:
        "Let r and s be the roots of x² − 14x + 29 = 0. Compute the exact integer value of r² + s².",
      hint: "Apply Vieta’s formulas: find (r + s) and (r·s), then rewrite r² + s² as (r + s)² − 2rs.",
      answer: "138",
      explanation:
        "By Vieta’s formulas, r + s = 14 and rs = 29. Therefore r² + s² = 14² − 2(29) = 196 − 58 = 138.",
      baseElo: 1580,
    },
    {
      id: "comb-paths",
      arenaKey: "comb",
      arenaLabel: "Combinatorics · Subsite #4",
      statement:
        "How many 6-bit binary strings contain no two adjacent 1s? (Include 000000 in your count.)",
      hint: "Let Fₙ count valid n-bit strings ending in 0 or 1: F₁ = 2, F₂ = 3, and Fₙ = Fₙ₋₁ + Fₙ₋₂.",
      answer: "21",
      explanation:
        "Using the shifted Fibonacci recurrence F₁ = 2, F₂ = 3: F₃ = 5, F₄ = 8, F₅ = 13, F₆ = 21.",
      baseElo: 1680,
    },
    {
      id: "geo-cyclic",
      arenaKey: "geo",
      arenaLabel: "Geometry · Subsite #3",
      statement:
        "In convex cyclic quadrilateral ABCD, ∠ABC = 112° and ∠BAD = 84°. Find the degree measure of ∠CDA.",
      hint: "Remember that opposite interior angles of any quadrilateral inscribed in a circle are supplementary (sum to 180°).",
      answer: "68",
      explanation:
        "Since ABCD is cyclic, ∠ABC + ∠CDA = 180°. Thus ∠CDA = 180° − 112° = 68°.",
      baseElo: 1460,
    },
    {
      id: "nt-tau",
      arenaKey: "nt",
      arenaLabel: "Number Theory · Subsite #1",
      statement:
        "How many positive integer divisors does N = 2⁴ · 3² · 5¹ possess?",
      hint: "For a prime factorization p₁^a₁ · p₂^a₂ · p₃^a₃, multiply (aᵢ + 1) across every prime factor.",
      answer: "30",
      explanation:
        "By the divisor-counting function τ(N) = (4 + 1)(2 + 1)(1 + 1) = 5 × 3 × 2 = 30 positive divisors.",
      baseElo: 1350,
    },
    {
      id: "alg-rec",
      arenaKey: "alg",
      arenaLabel: "Algebra · Subsite #2",
      statement:
        "A sequence satisfies a₁ = 2, a₂ = 5, and aₙ₊₂ = 3aₙ₊₁ − 2aₙ for all n ≥ 1. Compute a₆.",
      hint: "Compute a₃ and a₄ first, or solve the characteristic polynomial r² − 3r + 2 = 0 to find a closed form.",
      answer: "95",
      explanation:
        "Successive terms: a₁ = 2, a₂ = 5, a₃ = 11, a₄ = 23, a₅ = 47, a₆ = 3(47) − 2(23) = 95 (or aₙ = 3·2ⁿ⁻¹ − 1).",
      baseElo: 1740,
    },
    {
      id: "geo-radii",
      arenaKey: "geo",
      arenaLabel: "Geometry · Subsite #3",
      statement:
        "Right triangle ABC has legs AB = 12 and AC = 16. Find the integer sum R + r of its circumradius R and inradius r.",
      hint: "For any right triangle with legs a, b and hypotenuse c, R = c/2 and r = (a + b − c)/2 — notice how c cancels!",
      answer: "14",
      explanation:
        "Hypotenuse c = √(12² + 16²) = 20, giving R = 10 and r = (12 + 16 − 20)/2 = 4. Directly, R + r = (a + b)/2 = 28/2 = 14.",
      baseElo: 1520,
    },
    {
      id: "comb-decagon",
      arenaKey: "comb",
      arenaLabel: "Combinatorics · Subsite #4",
      statement:
        "All diagonals of a convex 10-gon are drawn, with no three concurrent inside. How many interior intersection points exist?",
      hint: "Every set of 4 vertices forms a convex quadrilateral whose two diagonals cross at a unique interior point.",
      answer: "210",
      explanation:
        "Each 4-vertex subset determines uniquely 1 interior intersection point: C(10, 4) = (10·9·8·7)/24 = 210.",
      baseElo: 1850,
    },
    {
      id: "nt-trailing",
      arenaKey: "nt",
      arenaLabel: "Number Theory · Subsite #1",
      statement:
        "How many trailing zeros does 100! have when written in standard base-10 notation?",
      hint: "Use Legendre’s formula to count factors of 5 in 100!: ⌊100/5⌋ + ⌊100/25⌋.",
      answer: "24",
      explanation:
        "Factors of 2 far outnumber factors of 5. By Legendre’s formula, v₅(100!) = ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24 trailing zeros.",
      baseElo: 1490,
    },
    {
      id: "alg-cubic-sum",
      arenaKey: "alg",
      arenaLabel: "Algebra · Subsite #2",
      statement:
        "Suppose a positive real number x satisfies x + 1/x = 5. Find the exact integer value of x³ + 1/x³.",
      hint: "Cube both sides of x + 1/x = 5 using (a + b)³ = a³ + b³ + 3ab(a + b).",
      answer: "110",
      explanation:
        "Since (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x), we get x³ + 1/x³ = 5³ − 3(5) = 125 − 15 = 110.",
      baseElo: 1650,
    },
    {
      id: "geo-power",
      arenaKey: "geo",
      arenaLabel: "Geometry · Subsite #3",
      statement:
        "From an external point P, tangent PT touches a circle at T and secant PAB meets the circle at A and B with PA = 4 and AB = 12. Find PT.",
      hint: "Apply Power of a Point from P: PT² = PA · PB, where PB = PA + AB.",
      answer: "8",
      explanation:
        "With PA = 4 and PB = 4 + 12 = 16, Power of a Point gives PT² = 4 × 16 = 64, so PT = 8.",
      baseElo: 1610,
    },
    {
      id: "comb-stars",
      arenaKey: "comb",
      arenaLabel: "Combinatorics · Subsite #4",
      statement:
        "How many ordered triples of positive integers (x, y, z) satisfy x + y + z = 12?",
      hint: "Use Stars and Bars for positive integers: place 2 dividers among 11 gaps between 12 unit stars.",
      answer: "55",
      explanation:
        "By Stars and Bars, positive integer solutions to x + y + z = 12 equal C(12 − 1, 3 − 1) = C(11, 2) = (11 × 10)/2 = 55.",
      baseElo: 1560,
    },
    {
      id: "nt-totient",
      arenaKey: "nt",
      arenaLabel: "Number Theory · Subsite #1",
      statement:
        "Compute Euler’s totient φ(72) — the count of integers k with 1 ≤ k ≤ 72 such that gcd(k, 72) = 1.",
      hint: "Factor 72 = 2³ · 3² and apply φ(n) = n · (1 − 1/2) · (1 − 1/3).",
      answer: "24",
      explanation:
        "Since 72 = 2³ · 3², Euler’s product formula yields φ(72) = 72 × (1/2) × (2/3) = 24.",
      baseElo: 1720,
    },
    {
      id: "alg-cubic-vieta",
      arenaKey: "alg",
      arenaLabel: "Algebra · Subsite #2",
      statement:
        "Let a, b, c be the roots of x³ − 6x² + 11x − 6 = 0. Compute a² + b² + c².",
      hint: "Use Vieta’s formulas for a + b + c and ab + bc + ca, then expand (a + b + c)².",
      answer: "14",
      explanation:
        "By Vieta’s formulas, a + b + c = 6 and ab + bc + ca = 11. Thus a² + b² + c² = 6² − 2(11) = 36 − 22 = 14.",
      baseElo: 1790,
    },
    {
      id: "geo-heron",
      arenaKey: "geo",
      arenaLabel: "Geometry · Subsite #3",
      statement:
        "A triangle has side lengths 13, 14, and 15. Compute its exact integer area.",
      hint: "Compute semi-perimeter s = (13 + 14 + 15)/2 = 21 and apply Heron’s formula √(s(s−a)(s−b)(s−c)).",
      answer: "84",
      explanation:
        "With s = 21, Heron’s formula gives Area = √(21 × 8 × 7 × 6) = √(7² × 3² × 4²) = 7 × 3 × 4 = 84.",
      baseElo: 1640,
    },
    {
      id: "comb-derange",
      arenaKey: "comb",
      arenaLabel: "Combinatorics · Subsite #4",
      statement:
        "In how many ways can 5 distinct letters be placed into 5 labeled envelopes so that NO letter goes into its matching envelope?",
      hint: "Compute the 5th derangement number D₅ = 5! · (1 − 1 + 1/2! − 1/3! + 1/4! − 1/5!).",
      answer: "44",
      explanation:
        "Using inclusion-exclusion for derangements: D₅ = 120(1/2 − 1/6 + 1/24 − 1/120) = 60 − 20 + 5 − 1 = 44.",
      baseElo: 1810,
    },
    {
      id: "mixed-dioph",
      arenaKey: "mixed",
      arenaLabel: "Mixed Olympiad · Subsite #5",
      statement:
        "How many ordered pairs of positive integers (x, y) satisfy 1/x + 1/y = 1/6?",
      hint: "Clear denominators and apply Simon’s Favorite Factoring Trick: (x − 6)(y − 6) = 36.",
      answer: "9",
      explanation:
        "Multiplying by 6xy gives 6x + 6y = xy, or (x − 6)(y − 6) = 36. Every positive divisor pair of 36 yields x, y ≥ 7 > 0, and 36 = 2²·3² has (2+1)(2+1) = 9 positive divisors.",
      baseElo: 1880,
    },
    {
      id: "mixed-poly",
      arenaKey: "mixed",
      arenaLabel: "Mixed Olympiad · Subsite #5",
      statement:
        "A monic quadratic polynomial P(x) = x² + bx + c satisfies P(1) = 4 and P(3) = 16. Compute P(5).",
      hint: "Solve the linear system for b and c from P(1) = 4 and P(3) = 16, or inspect second differences of x².",
      answer: "36",
      explanation:
        "From 1 + b + c = 4 and 9 + 3b + c = 16, subtracting gives 2b = 4 → b = 2 and c = 1, so P(x) = (x + 1)². Hence P(5) = 6² = 36.",
      baseElo: 1920,
    },
  ];

  const BOT_TIERS = [
    { min: 0, max: 499, name: "Spark" },
    { min: 500, max: 899, name: "Novice" },
    { min: 900, max: 1199, name: "Scout" },
    { min: 1200, max: 1399, name: "Tactician" },
    { min: 1400, max: 1599, name: "Striker" },
    { min: 1600, max: 1799, name: "Strategist" },
    { min: 1800, max: 1999, name: "Cipher" },
    { min: 2000, max: 2199, name: "Sentinel" },
    { min: 2200, max: 2399, name: "Overlord" },
    { min: 2400, max: 2699, name: "Archon" },
    { min: 2700, max: 2999, name: "Vanguard" },
    { min: 3000, max: 9999, name: "Apex BOT" },
  ];

  const RESERVED_HANDLES = new Set([
    "admin",
    "administrator",
    "hq",
    "prime_sovereign",
    "root",
    "staff",
    "support",
    "arithmo",
    "rayaan",
    "jalees",
    "moderator",
    "system",
  ]);

  const metaEl = root.querySelector("[data-gd-meta]");
  const clockWrap = root.querySelector("[data-gd-clock-wrap]");
  const clockEl = root.querySelector("[data-gd-clock]");
  const switchBtn = root.querySelector("[data-gd-switch]");
  const arenaEl = root.querySelector("[data-gd-arena]");
  const eloEl = root.querySelector("[data-gd-elo]");
  const statementEl = root.querySelector("[data-gd-statement]");
  const hintBox = root.querySelector("[data-gd-hint-box]");
  const hintTextEl = root.querySelector("[data-gd-hint-text]");
  const formEl = root.querySelector("[data-gd-form]");
  const startBtn = root.querySelector("[data-gd-start]");
  const inputEl = root.querySelector("[data-gd-input]");
  const submitBtn = root.querySelector("[data-gd-submit]");
  const hintBtn = root.querySelector("[data-gd-hint-btn]");
  const eloCard = root.querySelector("[data-gd-elo-card]");
  const eloValEl = root.querySelector("[data-gd-elo-val]");
  const eloSubEl = root.querySelector("[data-gd-elo-sub]");
  const handleForm = root.querySelector("[data-gd-handle-form]");
  const handleInput = document.getElementById("guest-handle-claim");
  const handleStatusEl = root.querySelector("[data-gd-handle-status]");

  if (!formEl || !inputEl || !submitBtn || !clockEl) return;

  const leftPanel = formEl.parentElement;
  const chamberBox = statementEl ? statementEl.parentElement : null;
  const scoringRow = chamberBox ? chamberBox.querySelector(".border-t") : null;
  const scoringLeft = scoringRow ? scoringRow.children[0] : null;
  const scoringRight = scoringRow ? scoringRow.children[1] : null;

  // Inject polished Attempt Meter pill + 60s countdown progress bar once
  let attemptPill = root.querySelector("[data-gd-attempts-pill]");
  let progressTrack = root.querySelector("[data-gd-progress-track]");
  let progressFill = root.querySelector("[data-gd-progress-fill]");

  if (chamberBox && !progressTrack) {
    progressTrack = document.createElement("div");
    progressTrack.setAttribute("data-gd-progress-track", "");
    progressTrack.className = "gd-timer-bar-track";
    progressFill = document.createElement("div");
    progressFill.setAttribute("data-gd-progress-fill", "");
    progressFill.className = "gd-timer-bar-fill bg-cyan-400";
    progressFill.style.width = "100%";
    progressTrack.appendChild(progressFill);
    chamberBox.prepend(progressTrack);
  }

  const arenaRow = arenaEl ? arenaEl.parentElement : null;
  if (arenaRow && !attemptPill) {
    attemptPill = document.createElement("span");
    attemptPill.setAttribute("data-gd-attempts-pill", "");
    attemptPill.className = "gd-attempt-pill text-[11px] font-mono-tabular text-slate-300";
    arenaRow.appendChild(attemptPill);
  }

  let problemIdx = 0;
  let phase = "ready"; // 'ready' | 'running' | 'solved' | 'timeout' | 'exhausted'
  let secondsLeft = 60;
  let attemptsUsed = 0;
  let showHint = false;
  let timerId = null;
  let wrongMsg = null;
  let estimatedElo = null;

  function resolveBotName(elo) {
    const found = BOT_TIERS.find((b) => elo >= b.min && elo <= b.max);
    return found ? found.name : "Apex BOT";
  }

  function resolveArenaTitle(arenaKey, elo) {
    const arena = ARENA_CATALOG[arenaKey] || ARENA_CATALOG.nt;
    const found = arena.titles.find((t) => elo >= t.min && elo <= t.max);
    return found ? found.title : arena.titles[0].title;
  }

  function clearFeedbackBanners() {
    leftPanel
      ?.querySelectorAll(
        "[data-gd-wrong], [data-gd-timeout], [data-gd-solved], [data-gd-exhausted]",
      )
      .forEach((node) => node.remove());
  }

  function renderAttemptsMeter() {
    if (!attemptPill) return;
    const remaining = Math.max(0, MAX_ATTEMPTS - attemptsUsed);
    attemptPill.replaceChildren();

    const label = document.createElement("span");
    label.className =
      remaining === 0
        ? "text-rose-300 font-semibold"
        : remaining === 1 && phase === "running"
          ? "text-amber-300 font-semibold"
          : "text-slate-300";
    label.textContent = `Attempts ${remaining}/${MAX_ATTEMPTS}`;
    attemptPill.appendChild(label);

    const dotsWrap = document.createElement("span");
    dotsWrap.className = "inline-flex items-center gap-1";
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const dot = document.createElement("span");
      const isAvailable = i < remaining;
      dot.className = `gd-attempt-dot ${
        isAvailable
          ? phase === "solved"
            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]"
            : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.65)]"
          : "bg-rose-500/70 scale-90"
      }`;
      dotsWrap.appendChild(dot);
    }
    attemptPill.appendChild(dotsWrap);
  }

  function renderFeedbackBanner() {
    clearFeedbackBanners();
    if (!leftPanel) return;
    const p = GUEST_PROBLEMS[problemIdx];

    if (wrongMsg && phase === "running") {
      const box = document.createElement("div");
      box.setAttribute("data-gd-wrong", "");
      box.className =
        "gd-banner-enter rounded-xl border border-rose-500/45 bg-rose-500/10 p-3.5 text-xs text-rose-200 flex items-center justify-between gap-3";
      const span = document.createElement("span");
      span.setAttribute("data-gd-wrong-text", "");
      span.textContent = wrongMsg;
      box.appendChild(span);
      leftPanel.appendChild(box);
    } else if (phase === "exhausted") {
      const box = document.createElement("div");
      box.setAttribute("data-gd-exhausted", "");
      box.className =
        "gd-banner-enter rounded-xl border border-rose-400/45 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-100 space-y-2.5";

      const top = document.createElement("div");
      top.className = "flex flex-wrap items-center justify-between gap-2";

      const strong = document.createElement("strong");
      strong.className = "text-white";
      strong.textContent = `3/3 Attempts Exhausted — Official Ground Truth: ${p.answer}`;

      const btnWrap = document.createElement("div");
      btnWrap.className = "flex flex-wrap gap-2";

      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.setAttribute("data-gd-next", "");
      nextBtn.className = "gd-btn gd-btn-primary px-3.5 py-1.5 text-xs shrink-0";
      nextBtn.textContent = "Next Problem →";
      nextBtn.addEventListener("click", switchProblem);

      btnWrap.appendChild(nextBtn);
      top.append(strong, btnWrap);

      const explain = document.createElement("p");
      explain.setAttribute("data-gd-exhausted-explain", "");
      explain.className = "ae-prose text-justify text-slate-200 leading-relaxed";
      explain.textContent = p.explanation;

      box.append(top, explain);
      leftPanel.appendChild(box);
    } else if (phase === "timeout") {
      const box = document.createElement("div");
      box.setAttribute("data-gd-timeout", "");
      box.className =
        "gd-banner-enter rounded-xl border border-rose-400/35 bg-rose-500/10 p-3.5 text-xs sm:text-sm text-rose-200 space-y-2";

      const top = document.createElement("div");
      top.className = "flex flex-wrap items-center justify-between gap-2";

      const strong = document.createElement("strong");
      strong.id = "gd-timeout-title";
      strong.className = "text-white";
      strong.textContent = `00:00 Timeout Reached — Official Ground Truth: ${p.answer}`;

      const btnWrap = document.createElement("div");
      btnWrap.className = "flex flex-wrap gap-2";

      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.setAttribute("data-gd-retry", "");
      retryBtn.className = "gd-btn gd-btn-switch px-3 py-1.5 text-xs shrink-0";
      retryBtn.textContent = "Retry Same Problem";
      retryBtn.addEventListener("click", startDuel);

      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.setAttribute("data-gd-next", "");
      nextBtn.className = "gd-btn gd-btn-primary px-3 py-1.5 text-xs shrink-0";
      nextBtn.textContent = "Next Problem →";
      nextBtn.addEventListener("click", switchProblem);

      btnWrap.append(retryBtn, nextBtn);
      top.append(strong, btnWrap);

      const explain = document.createElement("p");
      explain.setAttribute("data-gd-timeout-explain", "");
      explain.className = "ae-prose text-justify text-slate-200 leading-relaxed";
      explain.textContent = p.explanation;

      box.append(top, explain);
      leftPanel.appendChild(box);
    } else if (phase === "solved") {
      const box = document.createElement("div");
      box.setAttribute("data-gd-solved", "");
      box.className =
        "gd-banner-enter rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-200 space-y-2";

      const top = document.createElement("div");
      top.className = "flex flex-wrap items-center justify-between gap-2";

      const head = document.createElement("div");
      head.className = "font-semibold flex items-center gap-2 text-emerald-300";
      const timeSpan = document.createElement("span");
      timeSpan.setAttribute("data-gd-solved-time", "");
      timeSpan.textContent = `Verified Accepted in ${60 - secondsLeft}s (${attemptsUsed}/${MAX_ATTEMPTS} attempts)!`;
      head.appendChild(timeSpan);

      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.setAttribute("data-gd-next", "");
      nextBtn.className = "gd-btn gd-btn-switch px-3 py-1.5 text-xs shrink-0";
      nextBtn.textContent = "Next Problem →";
      nextBtn.addEventListener("click", switchProblem);

      top.append(head, nextBtn);

      const explain = document.createElement("p");
      explain.setAttribute("data-gd-solved-explain", "");
      explain.className = "ae-prose text-justify text-slate-200 leading-relaxed";
      explain.textContent = p.explanation;

      box.append(top, explain);
      leftPanel.appendChild(box);
    }
  }

  function renderUI() {
    const p = GUEST_PROBLEMS[problemIdx];
    const isRunning = phase === "running";
    const pct = Math.max(0, Math.min(100, Math.round((secondsLeft / 60) * 100)));
    root.setAttribute("data-gd-phase", phase);

    if (metaEl) {
      metaEl.textContent = `Guest Duel Sandbox · Problem ${problemIdx + 1} of ${GUEST_PROBLEMS.length} · Deterministic Client Grading`;
    }
    if (arenaEl) arenaEl.textContent = p.arenaLabel;
    if (eloEl) eloEl.textContent = `Baseline Calibration: ${p.baseElo} ELO`;
    if (statementEl) statementEl.textContent = p.statement;
    if (hintTextEl) hintTextEl.textContent = p.hint;
    if (hintBox) hintBox.classList.toggle("hidden", !showHint);
    if (hintBtn) {
      hintBtn.setAttribute("aria-pressed", showHint ? "true" : "false");
      hintBtn.classList.toggle("is-active", showHint);
      const hintSpan = hintBtn.querySelector("span");
      if (hintSpan) hintSpan.textContent = showHint ? "Hide Hint" : "Hint";
    }

    if (chamberBox) {
      chamberBox.className = `flex-1 flex flex-col justify-between rounded-xl bg-slate-950/85 border p-4 sm:p-5 space-y-3 transition-all duration-300 ${
        isRunning
          ? "border-cyan-400/40 shadow-[0_0_28px_rgba(0,240,255,0.08)]"
          : phase === "solved"
            ? "border-emerald-400/40"
            : phase === "exhausted" || phase === "timeout"
              ? "border-rose-500/35"
              : "border-slate-800"
      }`;
    }

    if (progressFill) {
      progressFill.style.width = `${pct}%`;
      progressFill.className = `gd-timer-bar-fill ${
        phase === "solved"
          ? "bg-emerald-400"
          : phase === "exhausted" || phase === "timeout" || (isRunning && secondsLeft < 10)
            ? "bg-rose-500"
            : isRunning && secondsLeft < 20
              ? "bg-amber-400"
              : "bg-cyan-400"
      }`;
    }

    if (scoringLeft) {
      scoringLeft.textContent = `Scoring: Base ${p.baseElo} + Speed Bonus (up to +87)`;
    }
    if (scoringRight) {
      scoringRight.className = isRunning
        ? secondsLeft < 10
          ? "text-rose-300 font-semibold"
          : "text-cyan-300 font-semibold"
        : phase === "solved"
          ? "text-emerald-300 font-semibold"
          : phase === "exhausted" || phase === "timeout"
            ? "text-rose-300 font-semibold"
            : "text-slate-400";
      if (isRunning) {
        scoringRight.textContent = `Active Clock · +${Math.max(0, Math.round(secondsLeft * 1.45))} live bonus`;
      } else if (phase === "solved") {
        scoringRight.textContent = "Round Accepted · Instant Estimate Locked";
      } else if (phase === "exhausted") {
        scoringRight.textContent = "3/3 Attempts Used · Ground Truth Revealed";
      } else if (phase === "timeout") {
        scoringRight.textContent = "Round Expired · Press Start or Next";
      } else {
        scoringRight.textContent = "Ready · 3 Attempts Max · Deterministic Check";
      }
    }

    clockEl.textContent = `00:${pad2(secondsLeft)}`;
    clockEl.className = `font-mono-tabular text-lg sm:text-xl font-bold leading-tight transition-colors duration-300 ${
      secondsLeft < 10 && isRunning
        ? "text-rose-400 animate-pulse"
        : secondsLeft < 20 && isRunning
          ? "text-amber-300"
          : phase === "solved"
            ? "text-emerald-400"
            : phase === "exhausted" || phase === "timeout"
              ? "text-rose-300"
              : "text-cyan-300"
    }`;

    if (clockWrap) {
      clockWrap.className = `rounded-xl bg-slate-950/90 border px-3.5 py-2 text-center min-w-[96px] transition-all duration-300 ${
        secondsLeft < 10 && isRunning
          ? "border-rose-500/75 shadow-[0_0_20px_rgba(244,63,94,0.28)]"
          : secondsLeft < 20 && isRunning
            ? "border-amber-400/65 shadow-[0_0_18px_rgba(245,158,11,0.22)]"
            : isRunning
              ? "border-cyan-400/55 shadow-[0_0_20px_rgba(0,240,255,0.18)]"
              : phase === "solved"
                ? "border-emerald-400/55 shadow-[0_0_18px_rgba(16,185,129,0.2)]"
                : "border-slate-800"
      }`;
    }

    formEl.className = `gd-action-form ${isRunning ? "is-running" : "is-idle"}`;
    if (startBtn) {
      startBtn.classList.toggle("hidden", isRunning);
      startBtn.style.display = isRunning ? "none" : "";
    }

    inputEl.disabled = !isRunning;
    inputEl.placeholder = isRunning
      ? `Enter exact integer (${MAX_ATTEMPTS - attemptsUsed}/${MAX_ATTEMPTS} left)...`
      : "Click Start 60s Guest Duel...";
    submitBtn.disabled = !isRunning;
    const submitLabel = submitBtn.querySelector("span");
    if (submitLabel) {
      submitLabel.textContent = isRunning
        ? `Verify (${MAX_ATTEMPTS - attemptsUsed}/${MAX_ATTEMPTS})`
        : "Verify Answer";
    }

    if (eloCard) {
      eloCard.className = `rounded-xl border px-4 py-3 text-center space-y-1 transition-all duration-300 ${
        estimatedElo
          ? "border-emerald-400/45 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.16)]"
          : phase === "exhausted" || phase === "timeout"
            ? "border-rose-500/35 bg-rose-500/5"
            : "border-slate-800 bg-slate-900/70"
      }`;
    }
    if (eloValEl) {
      eloValEl.textContent = estimatedElo
        ? `${estimatedElo} ELO`
        : phase === "exhausted"
          ? "0/3 · Ground Truth"
          : phase === "timeout"
            ? "00:00 · Retry"
            : "— — —";
    }
    if (eloSubEl) {
      if (estimatedElo) {
        const bracket = resolveArenaTitle(p.arenaKey, estimatedElo);
        const botName = resolveBotName(estimatedElo);
        eloSubEl.textContent = `${estimatedElo} ELO · ${bracket} (${botName} Bot Tier)`;
      } else if (phase === "exhausted") {
        eloSubEl.textContent = "3/3 Attempts Used — Review Solution & Advance";
      } else if (isRunning) {
        eloSubEl.textContent = `Clock Active — ${MAX_ATTEMPTS - attemptsUsed}/${MAX_ATTEMPTS} attempts remaining`;
      } else {
        eloSubEl.textContent = "Press Start 60s Guest Duel & solve before 00:00";
      }
    }

    if (handleForm) {
      handleForm.className = `space-y-2.5 pt-3 border-t border-slate-800/80 rounded-xl transition-all ${
        phase === "solved" ? "p-3 border border-emerald-400/35 bg-emerald-500/5" : ""
      }`;
    }

    renderAttemptsMeter();
    renderFeedbackBanner();
  }

  function stopTimer() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function startDuel() {
    stopTimer();
    secondsLeft = 60;
    attemptsUsed = 0;
    inputEl.value = "";
    wrongMsg = null;
    estimatedElo = null;
    phase = "running";
    renderUI();
    window.requestAnimationFrame(() => inputEl.focus());
    timerId = window.setInterval(() => {
      if (secondsLeft <= 1) {
        stopTimer();
        secondsLeft = 0;
        phase = "timeout";
        wrongMsg = null;
        renderUI();
        return;
      }
      secondsLeft -= 1;
      renderUI();
    }, 1000);
  }

  function switchProblem() {
    stopTimer();
    problemIdx = (problemIdx + 1) % GUEST_PROBLEMS.length;
    secondsLeft = 60;
    attemptsUsed = 0;
    inputEl.value = "";
    showHint = false;
    wrongMsg = null;
    estimatedElo = null;
    phase = "ready";
    renderUI();
  }

  function triggerShake() {
    inputEl.classList.remove("ae-shake-rose");
    window.requestAnimationFrame(() => {
      inputEl.classList.add("ae-shake-rose");
      window.setTimeout(() => inputEl.classList.remove("ae-shake-rose"), 480);
    });
  }

  if (startBtn) startBtn.addEventListener("click", startDuel);
  if (switchBtn) switchBtn.addEventListener("click", switchProblem);
  if (hintBtn) {
    hintBtn.addEventListener("click", () => {
      showHint = !showHint;
      renderUI();
    });
  }

  inputEl.addEventListener("input", () => {
    if (wrongMsg) {
      wrongMsg = null;
      renderFeedbackBanner();
    }
  });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (phase !== "running") return;
    const cleaned = inputEl.value.trim();
    if (!cleaned) {
      wrongMsg = "Enter an integer answer before verifying.";
      renderFeedbackBanner();
      triggerShake();
      return;
    }

    const p = GUEST_PROBLEMS[problemIdx];
    attemptsUsed += 1;

    if (cleaned === p.answer) {
      stopTimer();
      const speedBonus =
        Math.max(0, Math.round(secondsLeft * 1.45)) - (showHint ? 60 : 0);
      estimatedElo = Math.max(1200, p.baseElo + speedBonus);
      wrongMsg = null;
      phase = "solved";
      renderUI();
      return;
    }

    const remaining = MAX_ATTEMPTS - attemptsUsed;
    if (remaining <= 0) {
      stopTimer();
      wrongMsg = null;
      phase = "exhausted";
      renderUI();
      return;
    }

    wrongMsg = `Incorrect (${cleaned}). ${remaining} of ${MAX_ATTEMPTS} ${
      remaining === 1 ? "attempt" : "attempts"
    } remaining — check signs, remainders, or boundary cases.`;
    renderUI();
    triggerShake();
    inputEl.focus();
  });

  if (handleForm && handleInput) {
    const evaluateHandle = () => {
      const cleaned = handleInput.value.trim().replace(/^@+/, "").toLowerCase();
      if (!cleaned) {
        return {
          valid: false,
          cleaned,
          status:
            "Enter 3–20 characters (lowercase a–z, 0–9, _) to validate syntax.",
          tone: "text-slate-400",
        };
      }
      if (cleaned.length < 3 || cleaned.length > 20) {
        return {
          valid: false,
          cleaned,
          status: "Invalid length: @handles must be between 3 and 20 characters.",
          tone: "text-rose-300",
        };
      }
      if (!/^[a-z0-9_]+$/.test(cleaned)) {
        return {
          valid: false,
          cleaned,
          status:
            "Invalid character: use only lowercase letters (a–z), digits (0–9), or underscores (_).",
          tone: "text-rose-300",
        };
      }
      if (RESERVED_HANDLES.has(cleaned)) {
        return {
          valid: false,
          cleaned,
          status: `Reserved system handle (@${cleaned}). Choose a personal competitor handle.`,
          tone: "text-rose-300",
        };
      }
      return {
        valid: true,
        cleaned,
        status: `Syntax Valid: @${cleaned} passes all 3–20 char & tombstone checks.`,
        tone: "text-emerald-300",
      };
    };

    const updateHandleStatus = () => {
      const res = evaluateHandle();
      if (handleStatusEl) {
        handleStatusEl.className = `text-[11px] leading-snug ${res.tone}`;
        handleStatusEl.textContent = res.status;
      }
      handleForm.querySelector("[data-gd-handle-notice]")?.remove();
    };

    handleInput.addEventListener("input", updateHandleStatus);
    handleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const res = evaluateHandle();
      handleForm.querySelector("[data-gd-handle-notice]")?.remove();
      const notice = document.createElement("div");
      notice.setAttribute("role", "status");
      notice.setAttribute("data-gd-handle-notice", "");
      notice.className = `rounded-lg border p-2.5 text-xs leading-relaxed ${
        res.valid
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
          : "border-rose-400/40 bg-rose-500/10 text-rose-200"
      }`;
      notice.textContent = !res.cleaned
        ? "Type a candidate @handle (3–20 chars: a–z, 0–9, _) to run format validation."
        : res.valid
          ? `Format Verified (@${res.cleaned}): Live account registration & First-50 Singularity claiming officially open on December 16, 2026 (V1.0 Public Launch). No account or handle has been claimed yet during Under Construction preview.`
          : res.status;
      handleForm.appendChild(notice);
    });
  }

  renderUI();
}

/* 18. Home Portal Filter & 5-Arena Showcase Tabs (index.html) */
function initHomeInteractiveControls() {
  const filterBtns = document.querySelectorAll("[data-home-portal-filter]");
  const portalCards = document.querySelectorAll("[data-home-portal-card]");
  if (filterBtns.length && portalCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-home-portal-filter") || "all";
        filterBtns.forEach((b) => {
          const active = b === btn;
          b.className = `px-3.5 py-2 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
            active
              ? "border-cyan-400 bg-cyan-400/15 text-white font-semibold"
              : "border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white"
          }`;
        });
        portalCards.forEach((card) => {
          const cardCat = card.getAttribute("data-cat") || "";
          card.classList.toggle("hidden", cat !== "all" && cardCat !== cat);
        });
      });
    });
  }

  const arenaTabs = document.querySelectorAll("[data-home-arena-tab]");
  const arenaPanel = document.querySelector("[data-home-arena-panel]");
  if (arenaTabs.length && arenaPanel) {
    const metaEl = arenaPanel.querySelector("[data-ha-meta]");
    const titleEl = arenaPanel.querySelector("[data-ha-title]");
    const dayEl = arenaPanel.querySelector("[data-ha-day]");
    const entryEl = arenaPanel.querySelector("[data-ha-entry-title]");
    const ranksEl = arenaPanel.querySelector("[data-ha-ranks]");
    const arena3dCards = document.querySelectorAll("[data-arena-3d-card]");

    const DAYS = {
      nt: "Monday Rated Rounds",
      alg: "Tuesday Rated Rounds",
      geo: "Wednesday Rated Rounds",
      comb: "Thursday Rated Rounds",
      mixed: "Friday + Sunday Mega Anchor",
    };
    const CODES = {
      nt: "Subsite #1",
      alg: "Subsite #2",
      geo: "Subsite #3",
      comb: "Subsite #4",
      mixed: "Subsite #5",
    };

    const selectArena = (key) => {
      const item = ARENA_CATALOG[key];
      if (!item) return;

      arenaTabs.forEach((tab) => {
        const active = tab.getAttribute("data-home-arena-tab") === key;
        tab.className = `px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
          active
            ? "bg-slate-900 text-white border-cyan-400 shadow-[0_0_24px_rgba(0,240,255,0.16)]"
            : "bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-600"
        }`;
      });

      if (metaEl) {
        metaEl.textContent = `${CODES[key] || ""} · ${item.subsite}`;
        metaEl.style.color = item.color;
      }
      if (titleEl) titleEl.textContent = item.name;
      if (dayEl) dayEl.textContent = DAYS[key] || "";
      if (entryEl) {
        entryEl.replaceChildren();
        const prefix = document.createTextNode(
          `${item.titles[0].title} (0–499) → `,
        );
        const peak = document.createElement("span");
        peak.style.color = item.color;
        peak.textContent = `${item.titles[11].title} (3000+)`;
        entryEl.append(prefix, peak);
      }
      if (ranksEl) {
        ranksEl.replaceChildren();
        item.titles.forEach((t, idx) => {
          const isApex = t.max >= 9000;
          const row = document.createElement("div");
          row.className =
            "flex items-center justify-between gap-2 rounded-lg border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-slate-300";
          if (isApex) row.style.borderColor = `${item.color}66`;

          const left = document.createElement("span");
          left.className = "flex items-center gap-2 min-w-0";
          const num = document.createElement("span");
          num.className = "text-[11px] text-slate-500 shrink-0";
          num.textContent = String(idx + 1).padStart(2, "0");
          const label = document.createElement("span");
          label.className = "truncate font-medium";
          if (isApex) label.style.color = item.color;
          label.textContent = t.title;
          left.append(num, label);

          const range = document.createElement("span");
          range.className = "shrink-0";
          range.style.color = isApex ? item.color : "#94a3b8";
          range.textContent = isApex ? `${t.min}+` : `${t.min}–${t.max}`;

          row.append(left, range);
          ranksEl.appendChild(row);
        });
      }
    };

    arenaTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const key = tab.getAttribute("data-home-arena-tab");
        if (key) selectArena(key);
      });
    });

    arena3dCards.forEach((card) => {
      card.addEventListener("click", () => {
        const key = card.getAttribute("data-arena-3d-card");
        if (key) selectArena(key);
      });
    });
  }
}

/* 19. Global FAQ Accordions */
function initFaqAccordions() {
  document.querySelectorAll("[data-faq-accordion]").forEach((acc) => {
    const items = Array.from(acc.querySelectorAll("[data-faq-item]"));
    items.forEach((item) => {
      const trigger = item.querySelector("[data-faq-trigger]");
      const panel = item.querySelector("[data-faq-panel]");
      const icon = item.querySelector("[data-faq-icon]");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", () => {
        const willOpen = panel.classList.contains("hidden");
        items.forEach((other) => {
          const oTrig = other.querySelector("[data-faq-trigger]");
          const oPanel = other.querySelector("[data-faq-panel]");
          const oIcon = other.querySelector("[data-faq-icon]");
          const isTarget = other === item && willOpen;
          other.classList.toggle("border-cyan-400/40", isTarget);
          other.classList.toggle("bg-slate-900/75", isTarget);
          other.classList.toggle("border-slate-800", !isTarget);
          other.classList.toggle("bg-slate-950/65", !isTarget);
          if (oTrig) oTrig.setAttribute("aria-expanded", isTarget ? "true" : "false");
          if (oPanel) oPanel.classList.toggle("hidden", !isTarget);
          if (oIcon) oIcon.classList.toggle("rotate-180", isTarget);
        });
      });
    });
  });
}

function bootArithmoEdge() {
  if (document.documentElement.dataset.aeBooted === "1") return;
  document.documentElement.dataset.aeBooted = "1";

  const tasks = [
    initImageErrorFallback,
    initCountdown,
    initDrawer,
    initConstellation,
    initSpotlightCards,
    initScrollAnimations,
    initGuestDuel,
    initHomeInteractiveControls,
    initFaqAccordions,
    initDeterministicMathDemo,
    initEloExplorer,
    initContestSimulators,
    initAiExplorer,
    initSecuritySim,
    initAcademyCalculator,
    initWalletSim,
    initEcosystemExplorer,
    initGoldenVault,
    initHqLadder,
  ];

  tasks.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      console.error("[Arithmo-Edge] Module init error:", fn.name, err);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootArithmoEdge);
} else {
  bootArithmoEdge();
}

