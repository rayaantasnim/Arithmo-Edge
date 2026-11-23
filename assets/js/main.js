// Arithmo-Edge Core Interactive Engine (ES6+ Vanilla JS + GSAP + Three.js)

const TARGET_MIDNIGHT_MS = new Date("2027-01-01T00:00:00+06:00").getTime();

const AE_CLEANUPS = [];
const AE_SYNC_FNS = [];

function registerCleanup(fn) {
  if (typeof fn === "function") AE_CLEANUPS.push(fn);
}

function registerSync(fn) {
  if (typeof fn === "function") AE_SYNC_FNS.push(fn);
}

function runCleanups() {
  while (AE_CLEANUPS.length) {
    const fn = AE_CLEANUPS.pop();
    try {
      fn();
    } catch (_) {
      // Ignore teardown cleanup errors
    }
  }
}

function runSyncs() {
  AE_SYNC_FNS.forEach((fn) => {
    try {
      fn();
    } catch (_) {
      // Ignore resync errors
    }
  });
}

function prefersReducedMotion() {
  return Boolean(
    window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
}

function pad2(n) {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

function formatMoney(v) {
  return `$${Number(v || 0).toFixed(2)}`;
}

const ARENA_CATALOG = {
  nt: {
    key: "nt",
    code: "Subsite #1",
    name: "Number Theory",
    color: "#00F0FF",
    subsite: "arithmo-edge.github.io/number-theory/",
    day: "Monday Rated Rounds",
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
    key: "alg",
    code: "Subsite #2",
    name: "Algebra",
    color: "#8B5CF6",
    subsite: "arithmo-edge.github.io/algebra/",
    day: "Tuesday Rated Rounds",
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
    key: "geo",
    code: "Subsite #3",
    name: "Geometry",
    color: "#F59E0B",
    subsite: "arithmo-edge.github.io/geometry/",
    day: "Wednesday Rated Rounds",
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
    key: "comb",
    code: "Subsite #4",
    name: "Combinatorics & Permutation",
    color: "#10B981",
    subsite: "arithmo-edge.github.io/combinatorics/",
    day: "Thursday Rated Rounds",
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
    key: "mixed",
    code: "Subsite #5",
    name: "Mixed Mathematical Olympiad",
    color: "#F43F5E",
    subsite: "arithmo-edge.github.io/mixed-olympiad/",
    day: "Friday + Sunday Mega Anchor",
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

const ARENA_KEYS = ["nt", "alg", "geo", "comb", "mixed"];

const SHADOW_BOT_PERSONAS = [
  { tierNum: 1, name: "Spark", minElo: 0, maxElo: 499, exampleElo: 380, accentColor: "#94A3B8", telemetryProfile: "42s avg solve cadence · gentle pacing", style: "Foundational arithmetic & modular residue warmup" },
  { tierNum: 2, name: "Novice", minElo: 500, maxElo: 899, exampleElo: 740, accentColor: "#38BDF8", telemetryProfile: "36s avg solve cadence · clean step checks", style: "Introductory number patterns, linear systems & angle chasing" },
  { tierNum: 3, name: "Scout", minElo: 900, maxElo: 1199, exampleElo: 1080, accentColor: "#22D3EE", telemetryProfile: "31s avg solve cadence · steady tempo", style: "Binomial identities, chord geometry & modular orders" },
  { tierNum: 4, name: "Tactician", minElo: 1200, maxElo: 1399, exampleElo: 1310, accentColor: "#10B981", telemetryProfile: "27s avg solve cadence · trap-aware", style: "Vieta quadratics, cyclic angles & pigeonhole bounding" },
  { tierNum: 5, name: "Striker", minElo: 1400, maxElo: 1599, exampleElo: 1510, accentColor: "#34D399", telemetryProfile: "24s avg solve cadence · agile attacks", style: "LTE divisibility, functional equations & invariant splits" },
  { tierNum: 6, name: "Strategist", minElo: 1600, maxElo: 1799, exampleElo: 1690, accentColor: "#A3E635", telemetryProfile: "21s avg solve cadence · calculated precision", style: "Radical axes, Cauchy-Schwarz bounds & extremal combinatorics" },
  { tierNum: 7, name: "Cipher", minElo: 1800, maxElo: 1999, exampleElo: 1885, accentColor: "#FACC15", telemetryProfile: "18s avg solve cadence · minimal backtracking", style: "Diophantine descent, homothety chains & graph eigenvalues" },
  { tierNum: 8, name: "Sentinel", minElo: 2000, maxElo: 2199, exampleElo: 2110, accentColor: "#F59E0B", telemetryProfile: "15s avg solve cadence · Segment 3 caliber", style: "Circle inversion, generating functions & Eulerian residues" },
  { tierNum: 9, name: "Overlord", minElo: 2200, maxElo: 2399, exampleElo: 2320, accentColor: "#FB923C", telemetryProfile: "13s avg solve cadence · cold edge-case rigor", style: "Barycentric proofs, Ramsey bounds & polynomial roots of unity" },
  { tierNum: 10, name: "Archon", minElo: 2400, maxElo: 2699, exampleElo: 2560, accentColor: "#F43F5E", telemetryProfile: "11s avg solve cadence · National Olympiad core", style: "Dirichlet density tricks, projective geometry & Galois splits" },
  { tierNum: 11, name: "Vanguard", minElo: 2700, maxElo: 2999, exampleElo: 2885, accentColor: "#EC4899", telemetryProfile: "9s avg solve cadence · e.g., 2885 · Vanguard BOT", style: "Mixtilinear inversions, Turán bounds & multi-lemma synthesis" },
  { tierNum: 12, name: "Apex", minElo: 3000, maxElo: 3800, exampleElo: 3140, accentColor: "#00F0FF", telemetryProfile: "7s avg solve cadence · Singularity simulation", style: "Full IMO Shortlist / Putnam Apex caliber endgame precision" },
];

const CHECKOUT_ITEMS = [
  { id: "plus-monthly", category: "Subscription", name: "Plus Monthly ($2.99)", price: 2.99, perks: ["60 AI messages (10 Premium 2x + 50 General 1x)", "35 Shadow Bot Gauntlets/mo (max 2/day, Unbounded)", "Basic Analytics + Contest History"] },
  { id: "pro-monthly", category: "Subscription", name: "Pro Monthly ($5.99)", price: 5.99, perks: ["150 AI queries (30 Premium 2x + 120 General 1x)", "50 Shadow Bot Gauntlets/mo (max 3/day, Unbounded)", "Smart Mistake Deck & Private Rooms"] },
  { id: "singularity-monthly", category: "Subscription", name: "Singularity Monthly ($12.99)", price: 12.99, perks: ["Unlimited AI Premium (2x Hybrid)", "150 Shadow Bot Gauntlets/mo (max 2/hr, Unbounded)", "Forge Contest Hosting + Priority Appeals"] },
  { id: "shadow-20", category: "Shadow Bot Pack", name: "Shadow Spark 20-Pack ($0.99)", price: 0.99, perks: ["+20 Permanent Shadow Bot Gauntlet credits", "Zero expiration date · Stacks cleanly atop Free/Pro/Singularity limits", "Full 0–3200+ Bot ELO range access"] },
  { id: "shadow-75", category: "Shadow Bot Pack", name: "Shadow Strategist 75-Pack ($2.99)", price: 2.99, perks: ["+75 Permanent Shadow Bot Gauntlet credits", "Ideal for weekend marathon Unrated Sparring below/above your ELO", "Instant giftable pack option via Arithmo Wallet"] },
  { id: "shadow-250", category: "Shadow Bot Pack", name: "Shadow Sovereign 250-Pack ($7.99)", price: 7.99, perks: ["+250 Permanent Shadow Bot Gauntlet credits", "Deep pre-World Cup preparation against Vanguard & Apex BOT profiles", "Closed-loop wallet refund protection inside 60s checkout grace"] },
  { id: "shadow-24h", category: "Shadow Bot Pack", name: "24-Hour Shadow Blitz Unlimited ($1.99)", price: 1.99, perks: ["24-hour Unlimited Shadow Bot Gauntlets (Zero hourly/daily throttles)", "Auto-adapts across all 5 Core Arenas (NT, Algebra, Geometry, Comb, Mixed)", "Unbeatable pre-Sunday Mega Arena blitz warm-up"] },
  { id: "shadow-guild-100", category: "Shadow Bot Pack", name: "Guild Bot Training Roster 100-Pack ($4.99)", price: 4.99, perks: ["100 Institutional Shadow Bot duel tokens assignable across @academy members", "Mentor-configured custom ELO ranges (e.g., 1600–2100 Sentinel drills)", "Isolated cleanly via Dual-Handle Context Routing"] },
  { id: "ai-general-20", category: "Core Token Pack", name: "AI General Starter 20-Pack ($0.99)", price: 0.99, perks: ["20 permanent AI General (1x) tokens", "Zero expiration deadline", "Supports @handle gifting"] },
  { id: "ai-grandmaster-24h", category: "Core Token Pack", name: "24-Hour AI Grandmaster Sprint ($3.99)", price: 3.99, perks: ["24h Unlimited General (1x) & Premium (2x)", "Gemini Pro + Qwen-Math + SymPy access", "Instant activation"] },
];

const GOLDEN_VAULT_SAMPLES = {
  nt: {
    path: "Arithmo-Edge-Golden-Vault/Number_Theory/Segment_4_Apex/set_001.json",
    json: JSON.stringify({
      schema_version: "1.2",
      ecosystem: "Arithmo-Edge",
      mode: "Expert",
      segment: "Segment_4_Apex",
      set_id: "001",
      hub: "Number Theory",
      tags_visibility: "unrated_practice_only",
      hidden_during_live_contest: true,
      problem_count: 10,
      problems: [{
        q_index: 1,
        statement_plain: "Find all primes p such that p^2 + 2^p is prime.",
        statement_latex: "Find all primes $p$ such that $p^2 + 2^p$ is prime.",
        tags: ["Modular Arithmetic", "Parity", "LTE"],
        answer: "p = 3",
      }],
    }, null, 2),
  },
  alg: {
    path: "Arithmo-Edge-Golden-Vault/Algebra/Segment_3_Master/set_002.json",
    json: JSON.stringify({
      schema_version: "1.2",
      ecosystem: "Arithmo-Edge",
      mode: "Expert",
      segment: "Segment_3_Master",
      set_id: "002",
      hub: "Algebra",
      tags_visibility: "unrated_practice_only",
      hidden_during_live_contest: true,
      problem_count: 10,
      problems: [{
        q_index: 1,
        statement_plain: "Find all functions f: R -> R satisfying f(x^2 + f(y)) = y + f(x)^2.",
        statement_latex: "Find all functions $f: \\mathbb{R} \\to \\mathbb{R}$ satisfying $f(x^2 + f(y)) = y + (f(x))^2$.",
        tags: ["Functional Equations", "Injectivity", "Fixed Points"],
        answer: "f(x) = x",
      }],
    }, null, 2),
  },
  geo: {
    path: "Arithmo-Edge-Golden-Vault/Geometry/Segment_4_Apex/set_001.json",
    json: JSON.stringify({
      schema_version: "1.2",
      ecosystem: "Arithmo-Edge",
      mode: "Expert",
      segment: "Segment_4_Apex",
      set_id: "001",
      hub: "Geometry",
      tags_visibility: "unrated_practice_only",
      hidden_during_live_contest: true,
      problem_count: 10,
      problems: [{
        q_index: 1,
        statement_plain: "In acute triangle ABC, let H be the orthocenter and O the circumcenter. If angle AHB = 2*angle AOB, find angle ACB in degrees.",
        statement_latex: "In acute $\\triangle ABC$, let $H$ be the orthocenter and $O$ the circumcenter. If $\\angle AHB = 2\\angle AOB$, find $\\angle ACB$.",
        tags: ["Orthocenter", "Circumcircle", "Angle Chasing"],
        answer: "45 degrees",
      }],
    }, null, 2),
  },
  comb: {
    path: "Arithmo-Edge-Golden-Vault/Combinatorics_and_Permutation/Segment_2_Vanguard/set_003.json",
    json: JSON.stringify({
      schema_version: "1.2",
      ecosystem: "Arithmo-Edge",
      mode: "Expert",
      segment: "Segment_2_Vanguard",
      set_id: "003",
      hub: "Combinatorics & Permutation",
      tags_visibility: "unrated_practice_only",
      hidden_during_live_contest: true,
      problem_count: 10,
      problems: [{
        q_index: 1,
        statement_plain: "Determine the minimum number of subsets of size 3 needed from {1..7} so every pair appears in at least one subset.",
        statement_latex: "Find the minimum number of $3$-element subsets of $\\{1,2,\\dots,7\\}$ covering all pairs.",
        tags: ["Fano Plane", "Block Designs", "Pigeonhole"],
        answer: "7",
      }],
    }, null, 2),
  },
  mixed: {
    path: "Arithmo-Edge-Golden-Vault/Mixed_Mathematical_Olympiad/Segment_4_Apex/set_001.json",
    json: JSON.stringify({
      schema_version: "1.2",
      ecosystem: "Arithmo-Edge",
      mode: "Expert",
      segment: "Segment_4_Apex",
      set_id: "001",
      hub: "Mixed Mathematical Olympiad",
      tags_visibility: "unrated_practice_only",
      hidden_during_live_contest: true,
      problem_count: 10,
      problems: [{
        q_index: 1,
        statement_plain: "Let a, b be positive integers with (a^2 + b^2) divisible by ab + 1. Evaluate (a^2 + b^2)/(ab + 1) when gcd(a, b) = 1 and a = 2, b = 8.",
        statement_latex: "Let $a,b \\in \\mathbb{Z}^+$ satisfy $(ab+1) \\mid (a^2+b^2)$. Compute $\\frac{a^2+b^2}{ab+1}$ for $(a,b) = (2,8)$.",
        tags: ["Vieta Jumping", "Mixed Synthesis", "Diophantine"],
        answer: "4",
      }],
    }, null, 2),
  },
};

/* 1. Resilient Image Fallback */
function initImageErrorFallback() {
  if (document.documentElement.dataset.aeImgFallbackBound === "1") return;
  document.documentElement.dataset.aeImgFallbackBound = "1";

  const createHoloSvgBanner = (altText) => {
    const wrapper = document.createElement("div");
    wrapper.className = "relative flex h-full w-full min-h-[180px] items-center justify-center overflow-hidden rounded-xl border border-cyan-400/25 bg-slate-950/95 text-center";
    wrapper.setAttribute("role", "img");
    wrapper.setAttribute("aria-label", altText || "Arithmo-Edge Visual Module");
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 800 450");
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0.78;pointer-events:none;";

    const defs = document.createElementNS(ns, "defs");
    const grad = document.createElementNS(ns, "linearGradient");
    grad.setAttribute("id", "ae-holo-bg");
    grad.setAttribute("x1", "0%");
    grad.setAttribute("y1", "0%");
    grad.setAttribute("x2", "100%");
    grad.setAttribute("y2", "100%");
    [
      ["0%", "#040814"],
      ["55%", "#0b1730"],
      ["100%", "#140b29"],
    ].forEach(([off, col]) => {
      const stop = document.createElementNS(ns, "stop");
      stop.setAttribute("offset", off);
      stop.setAttribute("stop-color", col);
      grad.appendChild(stop);
    });
    const pat = document.createElementNS(ns, "pattern");
    pat.setAttribute("id", "ae-grid-pattern");
    pat.setAttribute("width", "40");
    pat.setAttribute("height", "40");
    pat.setAttribute("patternUnits", "userSpaceOnUse");
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", "M 40 0 L 0 0 0 40");
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "rgba(0,240,255,0.16)");
    p.setAttribute("stroke-width", "1");
    pat.appendChild(p);
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
    svg.append(bgRect, gridRect);

    const overlay = document.createElement("div");
    overlay.className = "relative z-10 px-5 py-4";
    const kicker = document.createElement("div");
    kicker.className = "font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300";
    kicker.textContent = "ARITHMO-EDGE // HOLOGRAPHIC LATTICE";
    const caption = document.createElement("div");
    caption.className = "mt-1.5 text-xs text-slate-300";
    caption.textContent = altText || "Cyber-Olympiad Infrastructure Grid";
    overlay.append(kicker, caption);
    wrapper.append(svg, overlay);
    return wrapper;
  };

  document.addEventListener("error", (event) => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.aeFallbackApplied === "1") return;
    img.dataset.aeFallbackApplied = "1";
    const banner = createHoloSvgBanner(img.alt);
    if (img.parentElement) {
      img.style.display = "none";
      img.parentElement.appendChild(banner);
    }
  }, true);
}

/* 2. Live Countdown Engine to December 31, 2026 at 12:00 Midnight */
function initCountdown() {
  const containers = document.querySelectorAll("[data-countdown]");
  if (!containers.length) return;
  let prevSec = -1;
  let id = null;

  function tick() {
    const diff = Math.max(0, TARGET_MIDNIGHT_MS - Date.now());
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
          window.gsap.fromTo(sEl, { scale: 1.12, opacity: 0.72 }, { scale: 1, opacity: 1, duration: 0.28, ease: "power2.out" });
        }
      }
    });
    prevSec = seconds;
  }

  function start() {
    tick();
    if (id === null) id = window.setInterval(tick, 1000);
  }
  function stop() {
    if (id !== null) {
      window.clearInterval(id);
      id = null;
    }
  }
  start();
  registerCleanup(stop);
  registerSync(start);
}

/* 3. GSAP Right-Side Slide-In Overlay Drawer */
function initDrawer() {
  const toggleBtn = document.getElementById("nav-drawer-toggle");
  const closeBtn = document.getElementById("nav-drawer-close");
  const backdrop = document.getElementById("nav-drawer-backdrop");
  const panel = document.getElementById("nav-drawer-panel");
  const iconOpen = document.getElementById("nav-icon-open");
  const iconClose = document.getElementById("nav-icon-close");
  if (!toggleBtn || !panel || !backdrop || toggleBtn.dataset.aeBound === "1") return;
  toggleBtn.dataset.aeBound = "1";

  let isOpen = false;
  function setMenuIcons(open) {
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function resetClosedImmediate() {
    isOpen = false;
    document.body.style.overflow = "";
    backdrop.classList.add("pointer-events-none");
    panel.style.visibility = "hidden";
    panel.style.pointerEvents = "none";
    setMenuIcons(false);
    if (window.gsap) {
      window.gsap.set(panel, { x: "100%" });
      window.gsap.set(backdrop, { autoAlpha: 0 });
    } else {
      panel.style.transform = "translateX(100%)";
      backdrop.style.display = "none";
    }
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
      window.gsap.to(backdrop, { autoAlpha: 1, duration: 0.25, ease: "power2.out" });
      window.gsap.to(panel, { x: "0%", duration: 0.42, ease: "power3.out" });
      window.gsap.fromTo(
        panel.querySelectorAll(".drawer-link-item"),
        { x: 22, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.025, ease: "power2.out", delay: 0.08 },
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
      window.gsap.to(backdrop, { autoAlpha: 0, duration: 0.24, ease: "power2.in" });
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
      resetClosedImmediate();
    }
  }

  resetClosedImmediate();
  toggleBtn.addEventListener("click", () => (isOpen ? closeDrawer() : openDrawer()));
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeDrawer();
  });

  const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  panel.querySelectorAll("a[data-page]").forEach((link) => {
    const target = (link.getAttribute("data-page") || "").toLowerCase();
    if (target === currentFile || (currentFile === "" && target === "index.html")) {
      link.classList.add("border-cyan-400/50", "bg-cyan-400/10", "text-white");
    }
  });

  registerCleanup(resetClosedImmediate);
  registerSync(resetClosedImmediate);
}

/* 4. Three.js WebGL Hero Canvas ([data-webgl-hero] across all 13 pages) */
const AURORA_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const AURORA_FRAG = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uPrimary;
uniform vec3 uSecondary;

void main() {
  vec2 uv = vUv;
  float waveA = sin(uv.x * 5.2 + uTime * 0.42 + uPointer.x * 1.4) * 0.5 + 0.5;
  float waveB = cos(uv.y * 4.4 - uTime * 0.31 + uPointer.y * 1.2) * 0.5 + 0.5;
  float ribbon = smoothstep(0.18, 0.92, waveA * 0.62 + waveB * 0.38);
  vec2 centerDelta = uv - (vec2(0.55, 0.48) + uPointer * 0.14);
  float glow = exp(-dot(centerDelta, centerDelta) * 5.2);
  vec3 col = mix(uPrimary, uSecondary, waveB * 0.65);
  float alpha = (ribbon * 0.085 + glow * 0.18) * (1.0 - smoothstep(0.42, 1.0, length(uv - 0.5)));
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.30));
}`;

function initWebGLHeroes() {
  const containers = document.querySelectorAll("[data-webgl-hero]");
  if (!containers.length) return;
  const THREE = window.THREE;
  const reduced = prefersReducedMotion();

  containers.forEach((container) => {
    if (container.dataset.aeWebglBound === "1") return;
    container.dataset.aeWebglBound = "1";

    const accentHex = container.getAttribute("data-accent") || "#00F0FF";
    const secondaryHex = container.getAttribute("data-secondary") || "#8B5CF6";
    const applyFallback = () => {
      container.style.background = `radial-gradient(60% 55% at 62% 40%, ${accentHex}28, transparent 70%), radial-gradient(45% 40% at 25% 65%, ${secondaryHex}24, transparent 70%)`;
    };

    if (!THREE || reduced) {
      applyFallback();
      return;
    }

    const probeCanvas = document.createElement("canvas");
    const gl = probeCanvas.getContext("webgl2") || probeCanvas.getContext("webgl");
    if (!gl) {
      applyFallback();
      return;
    }

    const isSoftware = /SwiftShader|llvmpipe|Software/i.test(String(gl.getParameter(gl.RENDERER) || ""));
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isSoftware, powerPreference: "high-performance" });
    } catch (_) {
      applyFallback();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSoftware ? 1 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "w-full h-full block";
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.replaceChildren(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    const primaryColor = new THREE.Color(accentHex);
    const secondaryColor = new THREE.Color(secondaryHex);
    const pointer = new THREE.Vector2(0, 0);

    const auroraMat = new THREE.ShaderMaterial({
      vertexShader: AURORA_VERT,
      fragmentShader: AURORA_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: pointer },
        uPrimary: { value: primaryColor },
        uSecondary: { value: secondaryColor },
      },
    });
    const auroraMesh = new THREE.Mesh(new THREE.PlaneGeometry(24, 15, 1, 1), auroraMat);
    auroraMesh.position.z = -3.8;
    scene.add(auroraMesh);

    const polyGroup = new THREE.Group();
    polyGroup.position.set(3.15, 0.18, 0);
    scene.add(polyGroup);

    const outerEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.65, 1)),
      new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.42 }),
    );
    const innerEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(1.75, 0)),
      new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.36 }),
    );
    const coreMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.95, 0),
      new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true, transparent: true, opacity: 0.32 }),
    );
    const ringMesh = new THREE.Mesh(
      new THREE.TorusGeometry(3.45, 0.015, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.28 }),
    );
    ringMesh.rotation.x = Math.PI / 2.6;
    polyGroup.add(outerEdges, innerEdges, coreMesh, ringMesh);

    const starCount = isSoftware ? 600 : 1260;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const brightColor = new THREE.Color("#F8FAFC");
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 3.2 + Math.random() * 9.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta) * 1.45;
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 8.5 - 1.2;
      const c = i % 5 === 0 ? primaryColor : i % 3 === 0 ? secondaryColor : brightColor;
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starField = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    scene.add(starField);

    const connPos = [];
    const sampleNodes = Math.min(84, starCount);
    for (let i = 0; i < sampleNodes; i++) {
      const ax = starPositions[i * 3], ay = starPositions[i * 3 + 1], az = starPositions[i * 3 + 2];
      for (let j = i + 1; j < sampleNodes; j++) {
        const bx = starPositions[j * 3], by = starPositions[j * 3 + 1], bz = starPositions[j * 3 + 2];
        const d2 = (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2;
        if (d2 < 8.4 && d2 > 0.35) connPos.push(ax, ay, az, bx, by, bz);
      }
    }
    const connGeo = new THREE.BufferGeometry();
    connGeo.setAttribute("position", new THREE.Float32BufferAttribute(connPos, 3));
    const connLines = new THREE.LineSegments(
      connGeo,
      new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.11, depthWrite: false }),
    );
    scene.add(connLines);

    const resize = () => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      polyGroup.position.x = w < 768 ? 1.1 : 3.15;
    };
    resize();

    let inViewport = true;
    let rafId = 0;
    const onPointer = (e) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          inViewport = entries[0] ? entries[0].isIntersecting : true;
        }, { threshold: 0.02 })
      : null;
    observer?.observe(container);

    const clock = new THREE.Clock();
    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (document.hidden || !inViewport) return;
      const elapsed = clock.getElapsedTime();
      const scrollRatio = Math.min(1, Math.max(0, window.scrollY / Math.max(container.clientHeight * 1.4, 520)));
      auroraMat.uniforms.uTime.value = elapsed;
      outerEdges.rotation.y = elapsed * 0.16 + pointer.x * 0.24 + scrollRatio * 0.55;
      outerEdges.rotation.x = elapsed * 0.09 + pointer.y * 0.18;
      innerEdges.rotation.y = -elapsed * 0.24 + pointer.x * 0.18;
      innerEdges.rotation.z = elapsed * 0.14;
      coreMesh.rotation.y = elapsed * 0.38;
      coreMesh.rotation.x = -elapsed * 0.25;
      ringMesh.rotation.z = elapsed * 0.15;
      polyGroup.position.y = Math.sin(elapsed * 0.7) * 0.14 - scrollRatio * 0.6;
      starField.rotation.y = elapsed * 0.025 + pointer.x * 0.06;
      connLines.rotation.y = starField.rotation.y;
      camera.position.x += (pointer.x * 0.35 - camera.position.x) * 0.04;
      camera.position.y += (pointer.y * 0.22 - camera.position.y) * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    registerCleanup(() => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      renderer.dispose();
    });
  });
}

/* 5. Interactive Canvas Prime Constellation (if present) */
function initConstellation() {
  const canvas = document.getElementById("constellation-canvas");
  if (!canvas || prefersReducedMotion() || canvas.dataset.aeBound === "1") return;
  canvas.dataset.aeBound = "1";
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width = 0, height = 0, rafId = 0;
  const pointer = { x: -9999, y: -9999 };
  const nodes = [];
  const resize = () => {
    const parent = canvas.parentElement;
    width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
    height = canvas.height = parent ? parent.clientHeight : 640;
  };
  const seed = () => {
    nodes.length = 0;
    for (let i = 0; i < 46; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 1.1,
        hue: i % 3 === 0 ? "0, 240, 255" : i % 3 === 1 ? "139, 92, 246" : "16, 185, 129",
      });
    }
  };
  resize();
  seed();
  const onResize = () => { resize(); seed(); };
  window.addEventListener("resize", onResize);
  canvas.parentElement?.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  });
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
      const distP = Math.hypot(pointer.x - n.x, pointer.y - n.y);
      if (distP < 180) {
        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(pointer.x, pointer.y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - distP / 180) * 0.24})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.hue}, 0.72)`; ctx.fill();
    }
    rafId = window.requestAnimationFrame(draw);
  };
  rafId = window.requestAnimationFrame(draw);
  registerCleanup(() => {
    window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
  });
}

/* 6. Spotlight Card Mouse Illumination + 3D Cursor Tilt */
function initSpotlightCards() {
  const canTilt = !prefersReducedMotion() && Boolean(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  document.querySelectorAll(".spotlight-card").forEach((card) => {
    if (card.dataset.aeBound === "1") return;
    card.dataset.aeBound = "1";
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
        card.style.transform = `perspective(1200px) rotateX(${(-ny * 12).toFixed(2)}deg) rotateY(${(nx * 12).toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      }
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

/* 7. GSAP ScrollTrigger Reveals, Scroll Progress, 3D Parallax & Count-Up */
function formatCountValue(val, prefix, suffix, decimals, useGrouping) {
  const num = decimals > 0
    ? Number(val).toFixed(decimals)
    : useGrouping
      ? Math.round(val).toLocaleString()
      : String(Math.round(val));
  return `${prefix}${num}${suffix}`;
}

function initScrollAnimations() {
  const progressBar = document.querySelector(".ae-scroll-progress");
  const countEls = document.querySelectorAll("[data-count]");
  const reduced = prefersReducedMotion();

  if (!window.gsap || reduced) {
    if (progressBar) progressBar.style.transform = "scaleX(0)";
    countEls.forEach((el) => {
      const raw = el.getAttribute("data-count") || "0";
      const target = Number(raw.replace(/[^\d.-]/g, ""));
      if (!Number.isFinite(target)) return;
      const prefix = el.getAttribute("data-count-prefix") || "";
      const suffix = el.getAttribute("data-count-suffix") || "";
      const decimals = Number(el.getAttribute("data-count-decimals") || "0");
      const grouping = el.getAttribute("data-count-grouping") !== "false";
      el.textContent = formatCountValue(target, prefix, suffix, decimals, grouping);
    });
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if (progressBar && ScrollTrigger) {
    gsap.fromTo(progressBar, { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.25 },
    });
  }

  const heroItems = document.querySelectorAll(".gsap-hero");
  if (heroItems.length) {
    gsap.fromTo(heroItems, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" });
  }

  document.querySelectorAll(".gsap-reveal").forEach((el) => {
    gsap.fromTo(el, { y: 24, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.55, ease: "power2.out",
      scrollTrigger: ScrollTrigger ? { trigger: el, start: "top 90%", once: true } : undefined,
    });
  });

  document.querySelectorAll("[data-3d-reveal]").forEach((el) => {
    gsap.fromTo(el, { y: 24, rotateX: 6, opacity: 0, transformPerspective: 1000 }, {
      y: 0, rotateX: 0, opacity: 1, duration: 0.68, ease: "power3.out", clearProps: "transform,opacity",
      scrollTrigger: ScrollTrigger ? { trigger: el, start: "top 92%", once: true } : undefined,
    });
  });

  if (ScrollTrigger) {
    document.querySelectorAll("[data-3d-parallax]").forEach((el) => {
      const depth = Number(el.getAttribute("data-3d-parallax-depth") || "18");
      gsap.fromTo(el, { y: -depth * 0.45 }, {
        y: depth * 0.45, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    });
  }

  countEls.forEach((el) => {
    const raw = el.getAttribute("data-count") || "0";
    const target = Number(raw.replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(target)) return;
    const prefix = el.getAttribute("data-count-prefix") || "";
    const suffix = el.getAttribute("data-count-suffix") || "";
    const decimals = Number(el.getAttribute("data-count-decimals") || "0");
    const grouping = el.getAttribute("data-count-grouping") !== "false";
    const delayMs = Number(el.getAttribute("data-count-delay") || "0");

    if (target === 0) {
      el.textContent = formatCountValue(0, prefix, suffix, decimals, grouping);
      return;
    }

    const state = { val: 0 };
    gsap.to(state, {
      val: target,
      duration: 1.15,
      delay: Math.max(0, delayMs / 1000),
      ease: "power2.out",
      scrollTrigger: ScrollTrigger ? { trigger: el, start: "top 94%", once: true } : undefined,
      onUpdate: () => {
        el.textContent = formatCountValue(state.val, prefix, suffix, decimals, grouping);
      },
      onComplete: () => {
        el.textContent = formatCountValue(target, prefix, suffix, decimals, grouping);
      },
    });
  });

  registerSync(() => {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });
}

/* 8. 14-Website Ecosystem Explorer (architecture.html) */
const PORTALS_14 = [
  {
    id: "core",
    category: "core",
    categoryLabel: "Core Infrastructure & Identity",
    tag: "00 · Core Portal",
    shortTitle: "Arithmo-Edge Core Portal",
    roleSummary: "Central Auth, @handle Governance, Closed-Loop Wallet & All-Rounder Telemetry",
    displayUrl: "arithmo-edge.github.io/Arithmo-Edge/",
    fullUrl: "https://arithmo-edge.github.io/Arithmo-Edge/",
    titleHeader: "Core Portal: Arithmo-Edge Core Portal",
    desc: "Primary hub for Gmail SSO, custom @handle registration (7-day 1-time free change; $2.99 once/year thereafter; permanent @handle tombstone upon deletion while anonymized Zero-PII data remains for AI training), Subscriptions & 7-day 1-time free trial, Closed-loop Personal Arithmo Wallet, Free Printable Guidebook, Overall All-Rounder Rating, and ☕ Support the 13-Year-Old System Architect / Buy Me a Coffee.",
    architectureIntro: "Serving as the root entry point of the 14-portal federation, the Core Portal orchestrates Firebase Authentication via Gmail SSO, mints unique @handle identities across all 13 downstream subsites, and hosts the centralized Personal Arithmo Wallet and subscription entitlement console. Every identity mutation or credit pack purchase synchronizes through Arithmo-Core-SDK (engine.js) in real time without exposing payment or PII keys to public arena repositories.",
    access: "Guest Browsing Permitted · @handle Required for Rated, Wallet & Subscriptions",
    accentColor: "#00F0FF",
    themeLabel: "#00F0FF Electric Cyan (Obsidian Core)",
    schedule: "24/7 Global Hub · Live Countdown & Round Dispatch",
    eloTracks: "Overall All-Rounder Composite + 10 Core Arena Telemetry Summary",
    aiSecurityStack: "WalletLedger, TokenMeter, ComplianceGuard AI, Read-Shield Edge Cache",
    sdkSyncHooks: [
      "Firebase Gmail SSO session hydration & permanent @handle tombstone registry",
      "Subscription entitlement sync (Free, Plus, Pro, Singularity + 7-day 1-time trial)",
      "Atomic Closed-Loop Arithmo Wallet balance & +10% top-up bonus reconciliation",
      "Live cross-domain dispatch into Subsites #1–#13 with preserved auth tokens",
    ],
    keyCapabilities: [
      "Custom @handle onboarding with 7-day free rename window ($2.99 once/year thereafter)",
      "Zero Pay-to-Win subscription matrix & 8 permanent Pay-As-You-Go Token Packs",
      "Personal Arithmo Wallet supporting instant USD top-ups (+10% bonus) and @handle gifts",
      "Free Printable Community Guidebook download & ☕ Patronage portal for founders",
    ],
    subsystems: [
      { name: "Identity & Tombstone Engine", scope: "Gmail SSO · @handle Registry", detail: "Claims globally unique handles across all 14 domains; account deletion permanently locks the @handle against impersonation while scrubbing PII before Cold JSONL archival." },
      { name: "Closed-Loop Arithmo Wallet", scope: "+10% Top-Up · Non-Withdrawable", detail: "Stores closed-loop educational credits usable strictly for AI Token Packs, Subscriptions, Academy seats, and handle gifting with atomic Firestore ledger locks." },
      { name: "Overall All-Rounder Deck", scope: "5-Arena Cross Telemetry", detail: "Aggregates a competitor’s General & Expert ratings across all 5 Core Arenas (anchored on Mixed Olympiad) and highlights Top 128 Annual World Cup qualification status." },
      { name: "Ecosystem Launcher & Support", scope: "Zero-Friction Routing", detail: "Routes guests directly into unrated arenas or Standings without login while providing transparent sponsorship pathways via the Wall of Patrons." },
    ],
    relatedDocPage: { href: "pricing.html", label: "Explore Plans, Store & Arithmo Wallet" },
  },
  {
    id: "nt",
    category: "arena",
    categoryLabel: "Core Mathematical Arena",
    tag: "01 · Subsite #1",
    shortTitle: "Number Theory Arena",
    roleSummary: "Monday Rated Rounds · #00F0FF Electric Cyan · 12 Ranks & Modular Rigor",
    displayUrl: "arithmo-edge.github.io/number-theory/",
    fullUrl: "https://arithmo-edge.github.io/number-theory/",
    titleHeader: "Subsite #1: Number Theory Arena",
    desc: "Dedicated Number Theory arena operating on a fixed #00F0FF Electric Cyan dark theme. Houses isolated General ELO and Expert ELO tracks, 12 canonical titles from Foundry Initiate to Arithmetic Singularity, and hidden topic tags during rated rounds.",
    architectureIntro: "Number Theory Arena isolates all divisibility, modular arithmetic, Diophantine equations, and analytic prime competition inside its own Electric Cyan micro-frontend. Under the Strict No-Mixed ELO Policy, fast numerical computation updates General ELO while formal LaTeX proof rounds update Expert ELO—combining via (General + Expert) / 2 strictly for visual badge progression across 12 canonical titles.",
    access: "Fixed #00F0FF Electric Cyan · Guest Unrated (0 ELO) / @handle Rated",
    accentColor: "#00F0FF",
    themeLabel: "#00F0FF Electric Cyan (Locked Arena Theme)",
    schedule: "Monday Rated Rounds · 17:00 UTC Expert (0+ ELO) / 20:00 UTC General",
    eloTracks: "2 Isolated Tracks: NT General ELO + NT Expert ELO (12 Canonical Titles)",
    aiSecurityStack: "SymPyVeritas, ProofGrader, TagArchitect, Browser BigInt Miller-Rabin",
    sdkSyncHooks: [
      "Deterministic BigInt Miller-Rabin primality & Brent-Pollard Rho integer checks locally",
      "TagArchitect strips #LTE, #Orders, and #Quadratic-Reciprocity during live windows",
      "Dual General & Expert leaderboard state dispatched to Subsite #7 Standings",
      "Golden Vault Segment 1–4 problem ingestion gated behind Cloudflare Worker proxy",
    ],
    keyCapabilities: [
      "12 exclusive Number Theory badges from Foundry Initiate (0–499) to Arithmetic Singularity (3000+)",
      "General Mode Touch Numpad & Second-Chance Overtime Loop for rapid integer evaluation",
      "Expert 4-Segment Contracts with Drag-and-Drop LaTeX congruence & induction proof blocks",
      "Zero-Fragmentation hidden sub-topics during live contests; unlocked post-round in Database",
    ],
    subsystems: [
      { name: "General Arithmetic Velocity Track", scope: "20:00 UTC Mondays · Speed & Precision", detail: "Single-problem sequential sprint focused on modular remainders, totient evaluations, and prime bounds with deterministic local validation." },
      { name: "Expert 4-Segment Proof Track", scope: "17:00 UTC Mondays · Max 2 Subs/Q", detail: "Multi-segment Olympiad proof contest graded via ProofGrader AI + 2000+ ELO Grandmaster Peer Review and audited in 6-hour Find the Flaw." },
      { name: "Strict No-Hint Tag Shield", scope: "Zero-Fragmentation Policy", detail: "Suppresses all lemma hints (e.g., Zsigmondy, Hensel’s Lemma) until the final submission bell rings, cultivating authentic IMO problem recognition." },
    ],
    arenaKey: "nt",
    syllabusTopics: [
      "Modular Arithmetic & Chinese Remainder Theorem",
      "Fermat, Euler, Wilson & Orders Mod n",
      "Lifting the Exponent Lemma (LTE) & p-adic Valuations",
      "Diophantine Equations & Infinite Descent",
      "Quadratic Reciprocity & Legendre/Jacobi Symbols",
      "Primitive Roots & Multiplicative Functions",
    ],
    relatedDocPage: { href: "arenas-elo.html", label: "Simulate Number Theory ELO & 60 Titles" },
  },
  {
    id: "alg",
    category: "arena",
    categoryLabel: "Core Mathematical Arena",
    tag: "02 · Subsite #2",
    shortTitle: "Algebra Arena",
    roleSummary: "Tuesday Rated Rounds · #8B5CF6 Vibrant Violet · Functional Equations & Inequalities",
    displayUrl: "arithmo-edge.github.io/algebra/",
    fullUrl: "https://arithmo-edge.github.io/algebra/",
    titleHeader: "Subsite #2: Algebra Arena",
    desc: "Dedicated Algebra arena operating on a fixed #8B5CF6 Vibrant Violet dark theme. Tracks isolated General & Expert ELOs across 12 tiers from Variable Initiate to Algebraic Singularity.",
    architectureIntro: "Algebra Arena provides a dedicated Vibrant Violet environment for polynomials, inequalities, functional equations, recurrences, and abstract algebraic structures. By keeping Algebra ratings strictly independent from Number Theory or Geometry, specialists in Cauchy-Schwarz optimization or Galois theory cannot inflate unrelated arena ranks—while Python SymPy sandboxes deterministically verify symbolic identities and counterexample boundary checks.",
    access: "Fixed #8B5CF6 Vibrant Violet · Guest Unrated / @handle Rated",
    accentColor: "#8B5CF6",
    themeLabel: "#8B5CF6 Vibrant Violet (Locked Arena Theme)",
    schedule: "Tuesday Rated Rounds · 17:00 UTC Expert (0+ ELO) / 20:00 UTC General",
    eloTracks: "2 Isolated Tracks: Algebra General ELO + Algebra Expert ELO (12 Tiers)",
    aiSecurityStack: "SymPyVeritas, TrapWeaver, ProofGrader, AdversarialRedTeam AI",
    sdkSyncHooks: [
      "Symbolic equivalence normalization via Cloudflare-proxied Python SymPy verification",
      "TrapWeaver blocks brute-force Lagrange interpolation leaks on multi-variable prompts",
      "Real-time General + Expert rank recomputation for Algebraic Singularity tiers",
      "Direct upsolve export into Subsite #8 (Arithmo Personal AI) after match lock release",
    ],
    keyCapabilities: [
      "12 Algebra titles spanning Variable Initiate (0–499) up to Algebraic Singularity (3000+)",
      "Dedicated LaTeX inequality, summation, and quantifier block composer in Expert Mode",
      "Boundary-case rigor checks catching missing injectivity/surjectivity or zero-domain branches",
      "Paired with Tuesday Double-Header schedule + 6-hour Find the Flaw counterexample window",
    ],
    subsystems: [
      { name: "Functional Equation Auditor", scope: "Domain & Branch Checking", detail: "Trains solvers to verify pointwise solutions like f(x) = x vs pathological piecewise families under ProofGrader + Find the Flaw scrutiny." },
      { name: "Inequality & Optimization Bench", scope: "Tightness & Equality Cases", detail: "Enforces explicit verification of equality conditions across AM-GM, Cauchy-Schwarz, Hölder, and Jensen proofs." },
      { name: "Polynomial & Galois Track", scope: "Irreducibility & Roots of Unity", detail: "Covers Eisenstein, complex root filters, Vieta relations, and symmetric polynomial decompositions up to Segment 4 Apex." },
    ],
    arenaKey: "alg",
    syllabusTopics: [
      "Functional Equations (Injectivity, Surjectivity, Cauchy)",
      "Olympiad Inequalities (AM-GM, Cauchy-Schwarz, Hölder, Schur)",
      "Polynomials, Irreducibility & Roots of Unity Filters",
      "Sequences, Linear & Non-Linear Recurrences",
      "Vieta Relations & Symmetric Polynomials",
      "Complex Numbers in Algebraic & Trigonometric Identities",
    ],
    relatedDocPage: { href: "arenas-elo.html", label: "Simulate Algebra ELO & 12 Progression Ranks" },
  },
  {
    id: "geo",
    category: "arena",
    categoryLabel: "Core Mathematical Arena",
    tag: "03 · Subsite #3",
    shortTitle: "Geometry Arena",
    roleSummary: "Wednesday Rated Rounds · #F59E0B Laser Amber · Built-In GeoGebra Construction Studio",
    displayUrl: "arithmo-edge.github.io/geometry/",
    fullUrl: "https://arithmo-edge.github.io/geometry/",
    titleHeader: "Subsite #3: Geometry Arena",
    desc: "Dedicated Geometry arena operating on a fixed #F59E0B Laser Amber dark theme. Supports GeoGebra-style Geometry construction tools in Expert Mode from Euclidean Initiate to Geometric Singularity.",
    architectureIntro: "Geometry Arena unifies synthetic Euclidean reasoning, projective transformations, and complex/barycentric methods inside a high-contrast Laser Amber workspace. Unlike plain text forums, Expert Column 2 embeds an interactive GeoGebra-style Geometry Construction Studio directly beside the problem statement—allowing competitors to snap circumcircles, radical axes, nine-point circles, and inversions while keeping diagram coordinates private.",
    access: "Fixed #F59E0B Laser Amber · Guest Unrated / @handle Rated",
    accentColor: "#F59E0B",
    themeLabel: "#F59E0B Laser Amber (Locked Arena Theme)",
    schedule: "Wednesday Rated Rounds · 17:00 UTC Expert (0+ ELO) / 20:00 UTC General",
    eloTracks: "2 Isolated Tracks: Geometry General ELO + Geometry Expert ELO (12 Tiers)",
    aiSecurityStack: "GeoGebra Sandbox, ProofGrader, AxiomCheck, AdversarialRedTeam AI",
    sdkSyncHooks: [
      "Interactive canvas diagram snapshots saved into IndexedDB local proof checkpoints",
      "LaTeX figure referencing links synthetic constructions cleanly into Expert proof steps",
      "AxiomCheck verifies non-degeneracy assumptions (acute vs obtuse triangle configurations)",
      "Wednesday double-header telemetry synced atomically to Subsite #7 Standings",
    ],
    keyCapabilities: [
      "Embedded GeoGebra-style interactive construction tool inside Expert Column 2",
      "12 canonical ranks from Euclidean Initiate (0–499) to Geometric Singularity (3000+)",
      "Configuration-blind problem statements guarding against obtuse/collinear blind spots",
      "Supports pure synthetic, inversion, projective, barycentric, and complex-plane proofs",
    ],
    subsystems: [
      { name: "Interactive Diagram Studio", scope: "Expert Column 2 Canvas", detail: "Construct perpendicular bisectors, radical centers, orthocenters, symmedians, and circle inversions directly in-browser with zero external tabs." },
      { name: "Configuration Degeneracy Guard", scope: "Find the Flaw Ready", detail: "Explicitly tests directed angles and orientation assumptions so proofs hold identically across acute, right, and obtuse configurations." },
      { name: "Dual Calculation & Proof Split", scope: "General vs Expert Mechanics", detail: "General mode scores exact length, angle, and area computation; Expert mode evaluates complete deductive geometric lemmas." },
    ],
    arenaKey: "geo",
    syllabusTopics: [
      "Directed Angles & Cyclic Quadrilateral Chasing",
      "Radical Axes, Power of a Point & Coaxal Circles",
      "Homothety, Spiral Similarity & Nine-Point Circle",
      "Circle Inversion & Mixtilinear / Excircle Configurations",
      "Projective Harmonic Bundles & Pascal/Brianchon Theorems",
      "Barycentric & Complex Number Coordinate Methods",
    ],
    relatedDocPage: { href: "contests.html", label: "Inspect GeoGebra Tool & Contest Engine" },
  },
  {
    id: "comb",
    category: "arena",
    categoryLabel: "Core Mathematical Arena",
    tag: "04 · Subsite #4",
    shortTitle: "Combinatorics & Permutation",
    roleSummary: "Thursday Rated Rounds · #10B981 Mint Emerald · Graph Theory, Games & Invariants",
    displayUrl: "arithmo-edge.github.io/combinatorics/",
    fullUrl: "https://arithmo-edge.github.io/combinatorics/",
    titleHeader: "Subsite #4: Combinatorics & Permutation Arena",
    desc: "Dedicated Combinatorics & Permutation arena operating on a fixed #10B981 Mint Emerald dark theme. Tracks General & Expert ELOs from Counting Initiate to Combinatorial Singularity.",
    architectureIntro: "Combinatorics & Permutation Arena centers on discrete ingenuity where brute-force CAS bashing fails—spanning extremal principles, invariants, graph theory, combinatorial games, and probabilistic existence proofs. Governed by IntuitionForge AI and TrapWeaver, problems emphasize genuine bijections and constructive counterexamples while rewarding 2000+ ELO Sentinel peer reviewers who audit subtle double-counting errors.",
    access: "Fixed #10B981 Mint Emerald · Guest Unrated / @handle Rated",
    accentColor: "#10B981",
    themeLabel: "#10B981 Mint Emerald (Locked Arena Theme)",
    schedule: "Thursday Rated Rounds · 17:00 UTC Expert (0+ ELO) / 20:00 UTC General",
    eloTracks: "2 Isolated Tracks: Combinatorics General ELO + Expert ELO (12 Tiers)",
    aiSecurityStack: "IntuitionForge AI, ProofGrader, SymPyVeritas, PlagioGuard",
    sdkSyncHooks: [
      "Discrete bijection & recurrence sanity verification on finite test bounds",
      "Strict anti-LLM phrasing checks eliminating standard textbook pigeonhole clones",
      "Supports constructive game strategy & algorithmic bound proofs in Expert Mode",
      "Synchronizes Thursday General/Expert rating deltas across 14 Live Leaderboards",
    ],
    keyCapabilities: [
      "12 progression tiers from Counting Initiate (0–499) to Combinatorial Singularity (3000+)",
      "Dedicated constructive-existence & extremal-bound rubric for Segment 1–4 proofs",
      "Zero-fragmentation tag masking preventing premature hints on Generating Functions or Hall’s Theorem",
      "Seamless post-contest export into WeaknessTargetedGen AI combinatorial drill decks",
    ],
    subsystems: [
      { name: "Invariant & Monovariant Track", scope: "Process & Game Analysis", detail: "Evaluates coloring arguments, parity invariants, and winning-strategy constructions in combinatorial grid and token games." },
      { name: "Extremal & Graph Synthesis", scope: "Turán, Ramsey & Matchings", detail: "Challenges advanced contenders on directed graphs, planar Euler bounds, Hall’s Marriage Theorem, and probabilistic existence." },
      { name: "Enumerative Velocity Mode", scope: "20:00 UTC General Sprint", detail: "Tests inclusion-exclusion, Burnside lemma counts, and generating function coefficients via fast numeric Touch Numpad entry." },
    ],
    arenaKey: "comb",
    syllabusTopics: [
      "Bijective Counting, Inclusion-Exclusion & Generating Functions",
      "Pigeonhole Principle & Extremal Set Systems",
      "Invariants, Monovariants & Tiling/Coloring Arguments",
      "Graph Theory (Trees, Matchings, Ramsey & Turán Bounds)",
      "Combinatorial Game Theory & Winning Strategies",
      "Probabilistic Method & Double Counting Proofs",
    ],
    relatedDocPage: { href: "arenas-elo.html", label: "Explore Combinatorics Tiers & ELO Calculator" },
  },
  {
    id: "mixed",
    category: "arena",
    categoryLabel: "Flagship Synthesis Arena",
    tag: "05 · Subsite #5",
    shortTitle: "Mixed Mathematical Olympiad",
    roleSummary: "Friday + Sunday Mega Anchor · #F43F5E Nebula Rose · Primary All-Rounder & World Cup Core",
    displayUrl: "arithmo-edge.github.io/mixed-olympiad/",
    fullUrl: "https://arithmo-edge.github.io/mixed-olympiad/",
    titleHeader: "Subsite #5: Mixed Mathematical Olympiad Arena",
    desc: "Dedicated Mixed Mathematical Olympiad arena operating on a fixed #F43F5E Nebula Rose dark theme. Primary anchor for the Overall All-Rounder Rating and Sunday Mega Arena.",
    architectureIntro: "Mixed Mathematical Olympiad is the flagship polymathic proving ground of Arithmo-Edge. Designed to replicate full IMO, Putnam, and RMM paper conditions, problems fuse multiple disciplines (such as combining polynomial divisibility with combinatorial parity or geometric invariants). Performance here serves as the primary anchor for the Overall All-Rounder Rating, hosts the Sunday Mega Arena Contest, and determines seeding for the Top 128 Annual World Cup.",
    access: "Fixed #F43F5E Nebula Rose · Primary All-Rounder & World Cup Anchor",
    accentColor: "#F43F5E",
    themeLabel: "#F43F5E Nebula Rose (Flagship Arena Theme)",
    schedule: "Friday Double-Header + Sunday Mega Arena (100 min · Mandatory Module 7)",
    eloTracks: "2 Isolated Tracks: Mixed General ELO + Mixed Expert ELO + All-Rounder Anchor",
    aiSecurityStack: "TheoremFusion, Module 7 Proctoring, MBTS Clustering, QPRT-4 ChronoVault",
    sdkSyncHooks: [
      "Primary anchor weight dispatch into Overall All-Rounder Composite calculations",
      "Enforces Sunday Mega mandatory Module 7 webcam/audio integrity gates",
      "Feeds Top 128 World Cup progressive 6-round half-elimination brackets",
      "Supports multi-domain Golden Vault Segment 1–4 sets authored by Core HQ",
    ],
    keyCapabilities: [
      "12 elite titles from Olympiad Initiate (0–499) to Omni-Olympiad Singularity (3000+)",
      "Cross-domain synthesis problems uniting NT, Algebra, Geometry, and Combinatorics",
      "Home of the Sunday Mega Arena (100 min · 10 Qs · Max 2 Subs/Q · T+3h Finalization)",
      "Direct qualification pathway into the Top 128 Annual World Cup (👑 Golden Crown)",
    ],
    subsystems: [
      { name: "TheoremFusion Synthesis Pool", scope: "Multi-Domain Problems", detail: "Pairs two or more mathematical branches in single prompts (e.g., Vieta jumping on lattice configurations or graph spectra via linear algebra)." },
      { name: "Sunday Mega Arena Host", scope: "Core HQ Authored · NO Rest Day", detail: "Flagship weekly Expert-only championship enforced by Module 7 proctoring, 2-hour Find the Flaw auditing, and 1-hour MBTS clustering." },
      { name: "World Cup Qualification Feed", scope: "Top 128 Global Contenders", detail: "Tracks seasonal Mixed + Overall All-Rounder consistency to seed the 128 -> 64 -> 32 -> 16 -> 8 -> 4 -> Champion knockout cycle." },
    ],
    arenaKey: "mixed",
    syllabusTopics: [
      "Cross-Domain Synthesis (NT + Combinatorics / Algebra + Geometry)",
      "Vieta Jumping & Extremal Diophantine Descent",
      "Full 6-Problem IMO & Putnam Mock Paper Architecture",
      "Constructive Existence & Multi-Stage Lemma Chains",
      "Polynomial Method in Discrete Geometry & Graph Coloring",
      "Invariant + Modular Hybrid Proof Writing",
    ],
    relatedDocPage: { href: "contests.html", label: "Inspect Sunday Mega & World Cup Engine" },
  },
  {
    id: "contests",
    category: "competition",
    categoryLabel: "Live Tournament & Audit Runtime",
    tag: "06 · Subsite #6",
    shortTitle: "Contest Section Portal",
    roleSummary: "7-Day Zero-Rest Engine, T-30s Contract, 1v1 Bullet Blitz & Find the Flaw",
    displayUrl: "arithmo-edge.github.io/contests/",
    fullUrl: "https://arithmo-edge.github.io/contests/",
    titleHeader: "Subsite #6: Contest Section Portal",
    desc: "Hosts live contests, 4-Segment contracts, T-30s Pre-Match Contract Page, Live Clarifications, 1v1 Bullet Blitz, Direct Friend Challenges, and Find the Flaw.",
    architectureIntro: "While Subsites #1–#5 define each subject’s identity and curriculum, Subsite #6 operates the high-concurrency live tournament execution engine. It runs the 7-Day Zero-Rest Rotational Calendar, renders General Velocity Flow vs Expert 3-Column Workspaces, opens the T-30s Pre-Match Contract Page showing verified authorship (@handles), coordinates 1v1 Bullet Blitz matchmaking (±100 ELO with 24h 2-match anti-farming cap), and hosts post-contest Find the Flaw peer hacking.",
    access: "Guests Unrated (0 ELO) + Find the Flaw · @handle Rated & 1v1",
    accentColor: "#22D3EE",
    themeLabel: "#22D3EE Tournament Cyan",
    schedule: "7-Day Zero-Rest Calendar · Daily 17:00 & 20:00 UTC + 24/7 1v1 Blitz",
    eloTracks: "Updates 10 Core Arena ELOs + 1v1 Bullet Blitz + Virtual Gym #/Virtual",
    aiSecurityStack: "ChronoVault, LogicMutator (30s Hot-Swap), PulseWatcher, MBTS",
    sdkSyncHooks: [
      "Engages immediate Hard-Lock on Subsite #8 (Arithmo Personal AI) at T-0 launch",
      "Dispatches IndexedDB local auto-save every keystroke to survive connection drops",
      "Runs 30-second Emergency Reserve Pool hot-swaps via LogicMutator if leaks occur",
      "Streams SHA-256 signed proof packets into 2-hour/6-hour Find the Flaw queues",
    ],
    keyCapabilities: [
      "Dual Contest UI: General Velocity Flow (Mobile Touch Numpad + Zen Mode) & Expert 3-Column Dashboard",
      "T-30s Pre-Match Contract displaying Problemsetter, Auditor & Tester @handles",
      "Find the Flaw post-contest hacking (+5 to +50 opponent hacks; +25 to +100 problem flaws)",
      "1v1 Bullet Blitz (±100 ELO + Direct @handle Challenge + System Expectation Override) & Virtual Gym",
    ],
    subsystems: [
      { name: "T-30s Contract & Hot-Swap Guard", scope: "T-30s Lock · 30s Emergency Pool", detail: "Locks round metadata 30 seconds before launch with full author attribution and holds hot-swappable reserve problems on standby." },
      { name: "Find the Flaw Peer Audit Arena", scope: "6h Daily / 2h Sunday Mega", detail: "Allows rated @handles and unrated Guests alike to expose logical gaps in opponent proofs or trigger 2-minute SymPy Global Rejudges." },
      { name: "1v1 Bullet Blitz Matchmaker", scope: "±100 ELO · 2-Match/24h Pair Cap", detail: "Pairs 1v1 head-to-head sprints with direct @handle friend invites (30-min fallback) and +ΔR Underdog Protection against 2000+ Sentinels." },
      { name: "Virtual Gym Ghost Mode", scope: "#/Virtual Historical Replay", detail: "Simulates historical contest runs under identical 100-minute clocks alongside original participants without altering official standings." },
    ],
    relatedDocPage: { href: "contests.html", label: "Open Contest Engine & Find the Flaw Demo" },
  },
  {
    id: "standings",
    category: "competition",
    categoryLabel: "Public Read-Shield Telemetry",
    tag: "07 · Subsite #7",
    shortTitle: "Standings Portal",
    roleSummary: "100% Public Without Login · 14 Live Leaderboards, Friends, Sovereign Council & Patrons",
    displayUrl: "arithmo-edge.github.io/standings/",
    fullUrl: "https://arithmo-edge.github.io/standings/",
    titleHeader: "Subsite #7: Standings Portal",
    desc: "Public without login. Renders 14 Real-Time Leaderboards (1 HQ + 10 Arena General/Expert + 1 Academy + 1 Contributors + 1 All Rounders), Country/Org/Academy filters, ★ My Friends filter, 👑 Honorary Prime Sovereign council, and Wall of Patrons.",
    architectureIntro: "Standings Portal is the public transparency engine of Arithmo-Edge—100% readable without creating an account. Using the Read-Shield Snapshot Pattern via Cloudflare Workers, it compiles 14 separate live leaderboards into static edge JSON snapshots that cut Firestore reads by 98%, while surfacing Country/Org/Academy breakdowns, the ★ My Friends watchlist, the 👑 Honorary Prime Sovereign council, and the immutable ☕ Wall of Patrons ledger.",
    access: "100% Public Without Login · 14 Real-Time Leaderboards",
    accentColor: "#22D3EE",
    themeLabel: "#22D3EE Telemetry Cyan",
    schedule: "Live Contest Tick + Read-Shield Edge Snapshot Refresh",
    eloTracks: "1 HQ + 10 Core Arena + 1 Academy (Score & Prestige) + 1 Contributors + 1 All-Rounders",
    aiSecurityStack: "Read-Shield Edge Snapshotter, MBTS Pending Lock, BanAudit Rollback Sync",
    sdkSyncHooks: [
      "Serves static Read-Shield JSON snapshots for 98% Firestore free-tier read reduction",
      "Hides shadow-sandboxed 11-Flag Blackhole accounts cleanly from public top ranks",
      "Synchronizes ★ My Friends starred @handles from Firebase user preferences",
      "Reflects real-time Dual Academy Standings (Academy Score vs Academy Prestige)",
    ],
    keyCapabilities: [
      "14 Live Leaderboards: 10 Arena (5 Gen + 5 Exp), 1 HQ, 1 Academy, 1 Contributors, 1 All-Rounders",
      "Instant Country, Organization, Academy, and ★ My Friends filter matrices",
      "Dedicated 👑 Honorary Prime Sovereign Council (@handle | HQ ELO | Honorary Title)",
      "Permanent ☕ Wall of Patrons ledger proving Zero ELO Advantage for donors",
    ],
    subsystems: [
      { name: "10 Arena + All-Rounder Boards", scope: "General vs Expert Split", detail: "Separates computation speed rankings from Olympiad proof rankings across all 5 arenas while computing the Mixed-anchored All-Rounder board." },
      { name: "Dual Academy Rankings", scope: "Academy Score & Prestige", detail: "Ranks verified institutions fairly via Top 50% Roster Average (Academy Score) and Top 15 Members + Clash Crowns (Academy Prestige)." },
      { name: "HQ & Contribution Boards", scope: "Strict Positional Chronology", detail: "Publishes Contribution ELO (Blogs +5, Guidebooks +2, Peer Reviews) alongside the monotonic HQ ELO Ladder governed by chronological seniority." },
      { name: "MBTS Finalization Gate", scope: "T+1h Daily / T+3h Sunday", detail: "Displays provisional live ranks before automatically shifting to finalized ratings after Find the Flaw and MBTS behavioral clustering." },
    ],
    relatedDocPage: { href: "governance.html", label: "View HQ Ladder, Council & Wall of Patrons" },
  },
  {
    id: "ai",
    category: "platform",
    categoryLabel: "AI Tutoring & Anti-Cheat Hard-Lock",
    tag: "08 · Subsite #8",
    shortTitle: "Arithmo Personal AI",
    roleSummary: "Socratic Mentor (Gemini + Qwen-Math + SymPy) · Contest Hard-Locked + Soft-Pinch",
    displayUrl: "arithmo-edge.github.io/arithmo-ai/",
    fullUrl: "https://arithmo-edge.github.io/arithmo-ai/",
    titleHeader: "Subsite #8: Arithmo Personal AI",
    desc: "Personal Olympiad AI mentor powered by Gemini (Pro & Flash) + Qwen-Math + SymPy sandbox. Hard-locked during live rated matches and displays non-accusatory Soft-Pinch Warnings.",
    architectureIntro: "Arithmo Personal AI delivers post-contest upsolving, Socratic lemma hints, and automated Python/SymPy verification—engineered specifically never to spoil the Olympiad struggle. The moment a user enters any active contest on Subsite #6, Arithmo-Core-SDK engages a strict client + Cloudflare Worker Hard-Lock on Subsite #8, while Arithmo Alert AI delivers non-accusatory AES-256 Soft-Pinch habit nudges when atypical prompt patterns appear.",
    access: "@handle Required · Hard-Locked During Live Rated Contests",
    accentColor: "#8B5CF6",
    themeLabel: "#8B5CF6 Neural Violet",
    schedule: "24/7 Upsolving & Practice · Automatically Locked During Live Rounds",
    eloTracks: "Zero ELO Grant · WeaknessTargetedGen Practice Feedback Loop",
    aiSecurityStack: "Gemini Pro & Flash, Qwen-Math + SymPy, TokenMeter, Arithmo Alert AI",
    sdkSyncHooks: [
      "Listens to active match lease from engine.js to trigger immediate UI + API Hard-Lock",
      "Executes TokenMeter semantic billing (0 greetings, -1 duplicates, -N multi-query, -2x Hybrid)",
      "Receives AES-256 encrypted Soft-Pinch nudge dispatches without leaking detector rules",
      "Imports contest mistakes into Mistake Deck & WeaknessTargetedGen AI drill sets",
    ],
    keyCapabilities: [
      "Hybrid AI routing uniting Gemini Pro/Flash reasoning with Qwen-Math + Python SymPy checks",
      "Fair Semantic Token Meter: 0 tokens for greetings/typos; -2x exclusively for full Hybrid synthesis",
      "Zero-Latency Contest Hard-Lock preventing live problem solving during rated hours",
      "Non-accusatory Soft-Pinch habit nudges + Mistake Deck spaced-repetition upsolving",
    ],
    subsystems: [
      { name: "Gemini + Qwen-Math + SymPy Router", scope: "Hybrid Symbolic Execution", detail: "Routes quick Socratic nudges through Gemini Flash and deep multi-step Olympiad proof synthesis through Gemini Pro + Qwen-Math verified in SymPy." },
      { name: "Semantic TokenMeter Guard", scope: "Transparent Billing Rules", detail: "Protects student token balances by charging 0 tokens on greetings or phrasing edits, billing only genuine mathematical compute." },
      { name: "Instant Contest Hard-Lock", scope: "T-0 to Final Submission", detail: "Syncs live contest session tokens via Cloudflare Worker so active contenders cannot query Personal AI until rounds finish." },
      { name: "Soft-Pinch Behavioral Advisory", scope: "Arithmo Alert AI", detail: "Encourages organic LaTeX practice and independent lemma formulation privately via AES-256 signed prompts." },
    ],
    relatedDocPage: { href: "ai-core.html", label: "Inspect All 42 AI Engines & Token Meter" },
  },
  {
    id: "academy",
    category: "platform",
    categoryLabel: "Institutional B2B SaaS Portal",
    tag: "09 · Subsite #9",
    shortTitle: "Arithmo Academy Arena",
    roleSummary: "KYB Schools & Math Guilds · Dual-Handle Context, Guild AI, Task Tab & Anti-Reselling",
    displayUrl: "arithmo-edge.github.io/academy/",
    fullUrl: "https://arithmo-edge.github.io/academy/",
    titleHeader: "Subsite #9: Arithmo Academy Arena",
    desc: "Institutional portal with Dual-Handle Context Routing, Arithmo Guild AI navbar tab, Task homework tab, Academy Standing, dual-rank Members Standing, Virtual Edu Lab, and KYB Anti-Reselling Shield.",
    architectureIntro: "Arithmo Academy Arena is a full multi-tenant B2B workspace built for schools, Olympiad coaching institutes, and university math clubs scaling from 100 to 2,000+ students. It enforces strict Dual-Handle Context Routing (@student vs @student-academyname) so classroom drills never contaminate global ELOs, waives dues for 1–10 Admins, powers Batch Radar diagnostics via Arithmo Guild AI, and locks seat integrity behind the 5-Layer KYB Anti-Reselling Shield.",
    access: "Institutional KYB Onboarding · Dual-Handle Context Routing",
    accentColor: "#22D3EE",
    themeLabel: "#22D3EE Institutional Cyan",
    schedule: "Asynchronous Class Tasks + On-Demand Mock Contests + Inter-Academy Clashes",
    eloTracks: "Indivisible Academy ELO (Score & Prestige) + Member Personal ELO Isolation",
    aiSecurityStack: "Arithmo Guild AI, AcademyKYB, BatchRadar, ResellerShield (5 Layers)",
    sdkSyncHooks: [
      "Switches workspace identity atomically between @handle and @handle-academy context",
      "Meters shared institutional Guild AI pools (20 to 200+ / +15 per 50 extra Enterprise seats)",
      "Runs 5-Layer Anti-Reselling telemetry (KYB Bind, Churn Throttle, Geo-IP, Watermark, Revoke)",
      "Tracks Centralized Task Tab assignments, deadlines, and Batch Radar bottlenecks",
    ],
    keyCapabilities: [
      "4 Institutional Tiers: General ($29.99), Premium ($49.99), Supreme ($79.99), Enterprise ($149.99 1st mo)",
      "Fee-waived Admin governance (1–5 Admins; 1–10 Enterprise) + 1–15 Mentors + Enrolled Students",
      "Centralized Task Tab, Batch Radar Cohort Diagnostics & $2.99/24h Virtual Edu Lab (Free on Supreme+)",
      "Dual Academy Standings (Academy Score Top 50% Avg vs Academy Prestige Top 15 + Clashes)",
    ],
    subsystems: [
      { name: "Dual-Handle Workspace Router", scope: "@user vs @user-academy", detail: "Separates homework tasks, internal drills, and Edu Lab collaboration from official personal ELO ratings until official Inter-Academy Clashes." },
      { name: "Guild AI & BatchRadar Engine", scope: "Cohort Gap Diagnostics", detail: "Analyzes 100–2,000+ student submissions across syllabus tags so mentors spot weak theorems across entire graduating classes." },
      { name: "Pop-Up KYB & 5-Layer ResellerShield", scope: "Seat Integrity Enforcement", detail: "Verifies school registration documents and blocks gray-market seat brokers via churn throttling and subnet coherence checks." },
      { name: "Inter-Academy Clash & Edu Lab", scope: "Team Battles · Free on Supreme+", detail: "Coordinates rated school-vs-school matches ($4.99 a-la-carte) and live collaborative KaTeX proof whiteboards." },
    ],
    relatedDocPage: { href: "academies.html", label: "Launch Interactive Academy Roster Calculator" },
  },
  {
    id: "forge",
    category: "platform",
    categoryLabel: "Problemsetting Studio & Vault",
    tag: "10 · Subsite #10",
    shortTitle: "Arithmo Forge",
    roleSummary: "1500+ ELO Problemsetting Studio · 5-Pillar Validation & Private Golden Vault",
    displayUrl: "arithmo-edge.github.io/arithmo-forge/",
    fullUrl: "https://arithmo-edge.github.io/arithmo-forge/",
    titleHeader: "Subsite #10: Arithmo Forge",
    desc: "Isolated problemsetting studio (unlocked at 1500+ ELO + 6 clean matches) featuring the 5-Pillar engine and Co-Founders' Private Golden Vault (5 Core Arenas -> 4 Expert Segments -> .json sets of 10 problems).",
    architectureIntro: "Arithmo Forge isolates problem authoring inside a strict meritocratic studio unlocked only once a competitor reaches 1500+ Arena ELO with 6 consecutive clean matches. Every candidate draft must survive the 5-Pillar Legal Problem Engine—AoPS >75% similarity rejection, AdversarialRedTeam boundary attacks, Python SymPy proof verification, DifficultyCalibrator curving, and legal authorship transfer—complementing the Co-Founders’ Private 5×4 Golden Vault curated via JSON-Converter Schema v1.2.",
    access: "1500+ ELO + 6 Clean Matches · Golden Vault Isolated",
    accentColor: "#F59E0B",
    themeLabel: "#F59E0B Forge Amber",
    schedule: "Rolling Authoring Pipeline · Contest Pool + Emergency Reserve Feeds",
    eloTracks: "Contribution ELO Rewards (+Draft Acceptance) + Conflict-of-Interest Lock",
    aiSecurityStack: "PlagioGuard, AdversarialRedTeam AI, SymPyVeritas, GoldenVault Miner",
    sdkSyncHooks: [
      "Verifies 1500+ ELO & 6-match clean HonestyScore before enabling draft submission",
      "Enforces Conflict-of-Interest lockout barring authors/testers from competing in their rounds",
      "Compiles Schema v1.2 validated sets compatible with JSON-Converter CLI rules",
      "Fetches read-only Co-Founders’ Golden Vault sets via Cloudflare Worker PAT proxy",
    ],
    keyCapabilities: [
      "Strict 1500+ ELO + 6 clean matches unlock preventing low-quality spam submissions",
      "5-Pillar Problem Engine: Similarity Block, Red-Team Attack, SymPy Veritas, ELO Calibrator, Legal Transfer",
      "Schema v1.2 JSON authoring aligned with github.com/Arithmo-Edge/JSON-Converter",
      "Co-Founders’ 5×4 Private Golden Vault (5 Arenas × 4 Expert Segments × 10-problem sets)",
    ],
    subsystems: [
      { name: "Pillar 1–2: PlagioGuard & RedTeam", scope: ">75% Similarity Block", detail: "Rejects cloned AoPS/shortlist problems automatically while red-teaming drafts for small-case degeneracy (p=2, n=0) and LLM bypasses." },
      { name: "Pillar 3–4: SymPyVeritas & Calibrator", scope: "Symbolic Proof & ELO Fit", detail: "Executes deterministic algebraic/numeric checks and calibrates difficulty placement across General and Segment 1–4 Expert tiers." },
      { name: "Co-Founders’ 5×4 Golden Vault", scope: "Schema v1.2 · Zero Live Tags", detail: "Private repository co-authored by Rayaan Tasnim & Jalees Habib storing hidden-tag Expert sets served exclusively through Cloudflare Worker proxy." },
    ],
    relatedDocPage: { href: "socials-forge.html", label: "Inspect 5-Pillar Forge & Golden Vault JSON" },
  },
  {
    id: "socials",
    category: "platform",
    categoryLabel: "Scholarly Publishing & Appeals",
    tag: "11 · Subsite #11",
    shortTitle: "Arithmo Socials",
    roleSummary: "KaTeX Proof Blogs (+5 ELO), 2000+ Expert Q&A, Guidebooks & 7-Day Forensic Appeals",
    displayUrl: "arithmo-edge.github.io/socials/",
    fullUrl: "https://arithmo-edge.github.io/socials/",
    titleHeader: "Subsite #11: Arithmo Socials",
    desc: "KaTeX topic blogs, AI-curated Blog-to-Lab (+5 Contribution ELO), 2000+ ELO Expert Q&A, @handle DMs, and Forensic Appeal Portal (7-day post-ban access).",
    architectureIntro: "Arithmo Socials replaces noisy algorithmic social feeds with high-signal, KaTeX-rendered mathematical discourse. Articles are categorized strictly by arena and theorem focus so BlogScout AI can promote standout derivations into Blog-to-Lab training modules (+5 Contribution ELO), while write permissions on Expert Q&A threads remain gated at 2000+ ELO Sentinels. Socials also hosts the Dual Guidebooks and serves as the sole 7-day read/submit lifeline for penalized accounts inside the Forensic Appeal Portal.",
    access: "@handle Required · 7-Day Post-Ban Forensic Appeal Access",
    accentColor: "#22D3EE",
    themeLabel: "#22D3EE Discourse Cyan",
    schedule: "Continuous Scholarly Stream · 7-Day Post-Ban Appeal SLA",
    eloTracks: "Contribution ELO (+5 Blog-to-Lab · +2 Verified Guidebook Notes)",
    aiSecurityStack: "BlogScout, ForumModerator, GuideCurator, AppealTriage",
    sdkSyncHooks: [
      "Enforces 2000+ Arena ELO write-gate on Expert Q&A answers while keeping reads open",
      "Grants +5 Contribution ELO on Blog-to-Lab promotion & +2 on Guidebook notes",
      "Maintains 7-day read-only Appeal Portal session access for suspended @handles",
      "Suppresses live round solution spoilers via ForumModerator during active contest windows",
    ],
    keyCapabilities: [
      "Topic-segmented KaTeX mathematical exposition blogs with AI-curated Blog-to-Lab promotion",
      "Strictly gated 2000+ ELO Expert Q&A forum moderated by ForumModerator & ProofGrader AI",
      "Dual Guidebooks: Free Community Guidebook & $14.99/mo Academy Guidebook (Free on Supreme+)",
      "Direct @handle peer messaging + 4-Step Forensic Appeal Portal (5-min Live Skill Audit path)",
    ],
    subsystems: [
      { name: "Blog-to-Lab Promotion Pipeline", scope: "+5 Contribution ELO", detail: "Likes never buy rank—only original derivations audited by BlogScout AI and Problem Architects convert into interactive Labs." },
      { name: "2000+ ELO Expert Q&A Gate", scope: "Universal Read · Sentinel Write", detail: "Allows every student to study proof methodology while restricting authoritative responses to verified 2000+ ELO Sentinels." },
      { name: "Dual Community & Academy Guidebooks", scope: "GuideCurator Verified (+2 ELO)", detail: "Verified theorem notes earn +2 personal Contribution ELO; approved Academy contributions publish across all institutions globally." },
      { name: "Forensic Appeal Portal", scope: "7-Day Post-Ban Access", detail: "Permits flagged contenders to inspect evidence packets and complete a monitored 5-minute Chief Arbiter Live Skill Audit." },
    ],
    relatedDocPage: { href: "socials-forge.html", label: "Read Socials, Expert Q&A & Guidebook Docs" },
  },
  {
    id: "hq",
    category: "core",
    categoryLabel: "Constitutional Command Portal",
    tag: "12 · Subsite #12",
    shortTitle: "Headquarters Core",
    roleSummary: "HQ-Only War-Room · 5-Tier Monotonic Ladder, Strict Chronology & Supreme HQ AI",
    displayUrl: "arithmo-edge.github.io/hq-core/",
    fullUrl: "https://arithmo-edge.github.io/hq-core/",
    titleHeader: "Subsite #12: Arithmo Edge: Headquarters Core",
    desc: "HQ-only command portal with war-room chat, 5-Tier Monotonic Headquarters escalation, and Supreme Headquarters AI accessible ONLY to Prime Sovereign & Chief Arbiter.",
    architectureIntro: "Headquarters Core is a completely isolated operational portal inaccessible to general traffic, subscriptions, or donors. Authority follows the 5-Tier Monotonic HQ ELO Ladder—Core Sentinel (100+), Problem Architect (300+), Round Coordinator (500+), Chief Arbiter (750+), and Prime Sovereign (1000+ Top 3)—protected by Strict Positional Chronology and dual Prime Sovereign Certificate endorsement so authority can never be purchased or bypassed.",
    access: "HQ ELO 100+ Only · Headquarters AI Restricted to Chief Arbiter & Prime Sovereign",
    accentColor: "#F43F5E",
    themeLabel: "#F43F5E Sovereign Rose",
    schedule: "24/7 Operations War-Room · Sunday Mega Authoring & Live Audits",
    eloTracks: "Monotonic HQ ELO (100 -> 300 -> 500 -> 750 -> 1000+ Top 3)",
    aiSecurityStack: "Headquarters AI (Supreme Overlord), HQStrategist, BanAudit, AppealTriage",
    sdkSyncHooks: [
      "Hard rejects non-HQ tokens at edge route guard before bundle hydration",
      "Restricts Supreme Headquarters AI endpoint exclusively to 750+ Arbiter / 1000+ Sovereign",
      "Enforces Strict Positional Chronology ordering on HQ personnel hierarchy ledgers",
      "Writes immutable audit logs reviewed by Founder Rayaan Tasnim & Co-Founder Jalees Habib",
    ],
    keyCapabilities: [
      "Strict 3-Gate Induction: +200 Contribution ELO + 6 Clean Matches + Prime Sovereign Certificate",
      "HQ Competitor Privilege: Full rated public competing in all conflict-free rounds",
      "Progressive earned subscription grants from Free Plus (100+) to All Unlimited Free (1000+)",
      "5-Minute Live Skill Audit arbitration & 11-Flag Blackhole final confirmation war-room",
    ],
    subsystems: [
      { name: "5-Tier Monotonic HQ Ladder", scope: "Core Sentinel to Prime Sovereign", detail: "Maps clear authority levels (triage -> Forge auditing -> T-30s round operations -> forensic arbitration -> constitutional stewardship)." },
      { name: "Strict Positional Chronology Guard", scope: "Anti-Cronyism Lock", detail: "Requires both target HQ ELO and Prime Sovereign endorsement; prevents junior members from leapfrogging senior officers purely on raw points." },
      { name: "Supreme Headquarters AI", scope: "750+ Arbiter & Sovereign Only", detail: "Synthesizes cross-round MBTS anomalies, reserves balance, and systemic QPRT-4 telemetry inside the command console." },
    ],
    relatedDocPage: { href: "governance.html", label: "Explore 5-Tier HQ Ladder & Induction Charter" },
  },
  {
    id: "database",
    category: "competition",
    categoryLabel: "Global Archive & Editorial Vault",
    tag: "13 · Subsite #13 (14th Site)",
    shortTitle: "Arithmo Database",
    roleSummary: "Launches Post #1–#12 · Historical Contests, IMO/Putnam/RMM/BMO/BdMO & AI Editorials",
    displayUrl: "arithmo-edge.github.io/arithmo-database/",
    fullUrl: "https://arithmo-edge.github.io/arithmo-database/",
    titleHeader: "Subsite #13 (14th Website): Arithmo Database",
    desc: "Launches after Subsites #1–#12. Houses all past Arithmo contests (categorized by the 5 Core Arenas), world Olympiad archives (IMO, Putnam, RMM, BMO, BdMO), and AI-Generated Step-by-Step Editorials for all database and unrated problemset items.",
    architectureIntro: "Deployed intentionally as the 14th and final portal once Subsites #1–#12 reach full production, Arithmo Database serves as the permanent Olympiad knowledge library of the federation. It unlocks all hidden topic tags after live contests close, indexes decades of canonical IMO, Putnam, RMM, BMO, and BdMO problems alongside every past Arithmo round across the 5 Core Arenas, and pairs every archived item with AI-Generated Step-by-Step Editorials, Virtual Gym replay hooks, and Mistake Deck study filters.",
    access: "Launches Post Subsites #1–#12 · Full Archive + AI Step-by-Step Editorials",
    accentColor: "#10B981",
    themeLabel: "#10B981 Archive Emerald",
    schedule: "Phase II Rollout Post-#1–#12 · Continuous Post-Contest Indexing",
    eloTracks: "Unrated Practice & Virtual Gym #/Virtual Replay (Tags Unlocked)",
    aiSecurityStack: "ArchiveSynthesizer, WeaknessTargetedGen AI, SymPyVeritas, GuideCurator",
    sdkSyncHooks: [
      "Re-attaches stripped #topic tags cleanly once live contest windows close",
      "Serves Read-Shield precompiled static JSON indexes for instant multi-arena search",
      "Launches 1-click Virtual Gym (#/Virtual) ghost replays into Subsite #6",
      "Feeds user Mistake Deck & WeaknessTargetedGen AI spaced-repetition drills",
    ],
    keyCapabilities: [
      "Complete historical Arithmo round catalog partitioned cleanly across all 5 Core Arenas",
      "World Olympiad repositories covering IMO, Putnam, RMM, BMO, and BdMO archives",
      "AI-Generated Step-by-Step Editorials with verified lemma intuitions & alternate proofs",
      "Unlocked topic-tag search, difficulty filtering, offline PWA caching & Mistake Deck export",
    ],
    subsystems: [
      { name: "5-Arena Historical Contest Vault", scope: "Post-Contest Tag Unlock", detail: "Indexes Monday–Sunday Arithmo rounds once finalized, unlocking sub-topic filters (#Inversion, #LTE, #Vieta-Jumping) for targeted practice." },
      { name: "World Olympiad Compendium", scope: "IMO · Putnam · RMM · BMO · BdMO", detail: "Standardizes classic international and national Olympiad archives into searchable Schema v1.2 KaTeX records." },
      { name: "AI Step-by-Step Editorial Engine", scope: "Intuition -> Lemma -> Proof", detail: "Walks learners through motivation, dead-end warnings, and formal SymPy-checked steps on every unrated and archived problem." },
      { name: "Offline Mistake Deck Sync", scope: "IndexedDB + PWA Cache", detail: "Saves bookmarked Olympiad problems and step-by-step editorials locally for zero-connectivity study flights and commutes." },
    ],
    relatedDocPage: { href: "roadmap.html", label: "Trace Subsite #13 V11.0 Rollout" },
  },
];

function initPortalExplorer14() {
  const root = document.querySelector("[data-portal-explorer-14]");
  if (!root || root.dataset.aeBound === "1") return;
  root.dataset.aeBound = "1";

  const filterBtns = root.querySelectorAll("[data-pe-filter]");
  const searchInput = document.getElementById("pe-search");
  const clearBtn = root.querySelector("[data-pe-clear]");
  const resetBtn = root.querySelector("[data-pe-reset]");
  const countEl = root.querySelector("[data-pe-count]");
  const emptyBox = root.querySelector("[data-pe-empty]");
  const emptyQueryEl = root.querySelector("[data-pe-empty-query]");
  const listWrap = root.querySelector("[data-pe-list]");
  const itemBtns = Array.from(root.querySelectorAll("[data-pe-item]"));
  const cardEl = root.querySelector("[data-pe-card]");

  const tagEl = root.querySelector("[data-pe-tag]");
  const catLabelEl = root.querySelector("[data-pe-catlabel]");
  const prevBtn = root.querySelector("[data-pe-prev]");
  const nextBtn = root.querySelector("[data-pe-next]");
  const indexEl = root.querySelector("[data-pe-index]");
  const titleEl = root.querySelector("[data-pe-title]");
  const roleEl = root.querySelector("[data-pe-role]");
  const urlEl = root.querySelector("[data-pe-url]");
  const copyBtn = root.querySelector("[data-pe-copy]");
  const tabBtns = root.querySelectorAll("[data-pe-tab]");
  const panelEls = root.querySelectorAll("[data-pe-panel]");

  const descEl = root.querySelector("[data-pe-desc]");
  const introEl = root.querySelector("[data-pe-intro]");
  const schedEl = root.querySelector("[data-pe-schedule]");
  const eloEl = root.querySelector("[data-pe-elotracks]");
  const stackEl = root.querySelector("[data-pe-stack]");
  const swatchEl = root.querySelector("[data-pe-swatch]");
  const themeEl = root.querySelector("[data-pe-themelabel]");
  const capsTitleEl = root.querySelector("[data-pe-caps-title]");
  const capsListEl = root.querySelector("[data-pe-caps]");
  const teaserBox = root.querySelector("[data-pe-teaser]");
  const teaserText = root.querySelector("[data-pe-teaser-text]");
  const openDeepBtn = root.querySelector("[data-pe-open-deep]");
  const subsWrap = root.querySelector("[data-pe-subsystems]");
  const hooksWrap = root.querySelector("[data-pe-hooks]");
  const deepSyllabusWrap = root.querySelector("[data-pe-deep-syllabus-wrap]");
  const deepSyllabusTitle = root.querySelector("[data-pe-deep-syllabus-title]");
  const deepSyllabusList = root.querySelector("[data-pe-deep-syllabus]");
  const deepRanksList = root.querySelector("[data-pe-deep-ranks]");
  const deepVaultWrap = root.querySelector("[data-pe-deep-vault-wrap]");
  const deepVaultPath = root.querySelector("[data-pe-deep-vault-path]");
  const deepVaultJson = root.querySelector("[data-pe-deep-vault-json]");
  const accessEl = root.querySelector("[data-pe-access]");
  const docLinkEl = root.querySelector("[data-pe-doclink]");

  let activeId = "core";
  let activeCat = "all";
  let activeTab = "overview";
  let copyTimer = null;

  const getMatches = (node, query) => {
    if (!query) return true;
    const hay = `${node.titleHeader} ${node.shortTitle} ${node.tag} ${node.displayUrl} ${node.roleSummary} ${node.desc} ${node.aiSecurityStack}`.toLowerCase();
    return hay.includes(query);
  };

  function selectTab(tab) {
    activeTab = tab;
    tabBtns.forEach((btn) => {
      const isCur = btn.getAttribute("data-pe-tab") === tab;
      btn.setAttribute("aria-selected", isCur ? "true" : "false");
      btn.className = `px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
        isCur ? "bg-cyan-400 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"
      }`;
    });
    panelEls.forEach((p) => {
      p.classList.toggle("hidden", p.getAttribute("data-pe-panel") !== tab);
    });
  }

  function renderSelected() {
    const node = PORTALS_14.find((p) => p.id === activeId) || PORTALS_14[0];
    const idx = PORTALS_14.findIndex((p) => p.id === node.id);
    const deepTab = root.querySelector('[data-pe-tab="arena_deep_dive"]');

    if (deepTab) {
      deepTab.classList.toggle("hidden", !node.arenaKey);
      if (node.arenaKey) deepTab.textContent = `${ARENA_CATALOG[node.arenaKey]?.name || "Arena"} Deep-Dive`;
    }
    if (!node.arenaKey && activeTab === "arena_deep_dive") activeTab = "overview";
    selectTab(activeTab);

    if (cardEl) cardEl.style.borderColor = `${node.accentColor}4D`;
    if (tagEl) { tagEl.textContent = node.tag; tagEl.style.color = node.accentColor; }
    if (catLabelEl) catLabelEl.textContent = node.categoryLabel;
    if (indexEl) indexEl.textContent = `Portal ${String(idx + 1).padStart(2, "0")} / 14`;
    if (titleEl) titleEl.textContent = node.titleHeader;
    if (roleEl) roleEl.textContent = node.roleSummary;
    if (urlEl) { urlEl.href = node.fullUrl; urlEl.textContent = node.displayUrl; }
    if (descEl) descEl.textContent = node.desc;
    if (introEl) introEl.textContent = node.architectureIntro;
    if (schedEl) schedEl.textContent = node.schedule;
    if (eloEl) eloEl.textContent = node.eloTracks;
    if (stackEl) stackEl.textContent = node.aiSecurityStack;
    if (swatchEl) swatchEl.style.backgroundColor = node.accentColor;
    if (themeEl) themeEl.textContent = node.themeLabel;
    if (capsTitleEl) capsTitleEl.textContent = `Core Capabilities & Safeguards — ${node.shortTitle}`;
    if (accessEl) accessEl.textContent = node.access;

    if (capsListEl) {
      capsListEl.replaceChildren();
      node.keyCapabilities.forEach((cap) => {
        const li = document.createElement("li");
        li.className = "flex items-start gap-2 text-xs text-slate-300";
        const dot = document.createElement("span");
        dot.className = "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0";
        dot.style.backgroundColor = node.accentColor;
        const txt = document.createElement("span");
        txt.textContent = cap;
        li.append(dot, txt);
        capsListEl.appendChild(li);
      });
    }

    if (teaserBox) teaserBox.classList.toggle("hidden", !node.arenaKey);
    if (teaserText && node.arenaKey) {
      const aName = ARENA_CATALOG[node.arenaKey]?.name || node.shortTitle;
      teaserText.textContent = `${aName} Deep-Dive Available: Inspect full topic syllabus, 12 canonical ranks (${ARENA_CATALOG[node.arenaKey]?.titles[0]?.title} → ${ARENA_CATALOG[node.arenaKey]?.titles[11]?.title}), and Golden Vault v1.2 Schema sample.`;
    }

    if (subsWrap) {
      subsWrap.replaceChildren();
      node.subsystems.forEach((sub) => {
        const box = document.createElement("div");
        box.className = "rounded-xl border border-slate-800 bg-slate-950/75 p-4 space-y-1.5";
        const top = document.createElement("div");
        top.className = "flex flex-wrap items-center justify-between gap-2";
        const nm = document.createElement("div");
        nm.className = "font-display text-sm font-bold text-white";
        nm.textContent = sub.name;
        const sc = document.createElement("span");
        sc.className = "font-mono-tabular text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300";
        sc.textContent = sub.scope;
        const dt = document.createElement("p");
        dt.className = "ae-prose text-justify text-xs text-slate-300 leading-relaxed";
        dt.textContent = sub.detail;
        top.append(nm, sc);
        box.append(top, dt);
        subsWrap.appendChild(box);
      });
    }

    if (hooksWrap) {
      hooksWrap.replaceChildren();
      node.sdkSyncHooks.forEach((hook) => {
        const box = document.createElement("div");
        box.className = "rounded-lg border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-xs text-slate-300 flex items-start gap-2";
        const dot = document.createElement("span");
        dot.className = "w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0";
        const txt = document.createElement("span");
        txt.textContent = hook;
        box.append(dot, txt);
        hooksWrap.appendChild(box);
      });
    }

    const arena = node.arenaKey ? ARENA_CATALOG[node.arenaKey] : null;
    if (deepSyllabusWrap) deepSyllabusWrap.classList.toggle("hidden", !arena);
    if (arena) {
      if (deepSyllabusTitle) deepSyllabusTitle.textContent = `${arena.name} Syllabus Scope`;
      if (deepSyllabusList) {
        deepSyllabusList.replaceChildren();
        (node.syllabusTopics || []).forEach((t) => {
          const li = document.createElement("li");
          li.className = "rounded-lg border border-slate-800/80 bg-slate-950/75 px-3 py-2 text-xs text-slate-200 flex items-center gap-2";
          const dot = document.createElement("span");
          dot.className = "w-1.5 h-1.5 rounded-full shrink-0";
          dot.style.backgroundColor = arena.color;
          const span = document.createElement("span");
          span.textContent = t;
          li.append(dot, span);
          deepSyllabusList.appendChild(li);
        });
      }
      if (deepRanksList) {
        deepRanksList.replaceChildren();
        arena.titles.forEach((t) => {
          const row = document.createElement("div");
          row.className = "flex items-center justify-between gap-2 rounded-lg border border-slate-800/80 bg-slate-950/70 px-3 py-1.5 text-xs";
          const nameSpan = document.createElement("span");
          nameSpan.className = t.max >= 9000 ? "font-semibold" : "text-slate-200";
          if (t.max >= 9000) nameSpan.style.color = arena.color;
          nameSpan.textContent = t.title;
          const rangeSpan = document.createElement("span");
          rangeSpan.className = "font-mono-tabular text-slate-400 shrink-0";
          rangeSpan.textContent = t.max >= 9000 ? `${t.min}+` : `${t.min}–${t.max}`;
          row.append(nameSpan, rangeSpan);
          deepRanksList.appendChild(row);
        });
      }
      const sample = GOLDEN_VAULT_SAMPLES[node.arenaKey];
      if (deepVaultWrap) deepVaultWrap.classList.toggle("hidden", !sample);
      if (sample) {
        if (deepVaultPath) deepVaultPath.textContent = sample.path;
        if (deepVaultJson) deepVaultJson.textContent = sample.json;
      }
    }

    if (docLinkEl) {
      docLinkEl.href = node.relatedDocPage.href;
      const span = docLinkEl.querySelector("span");
      if (span) span.textContent = node.relatedDocPage.label;
      else docLinkEl.textContent = node.relatedDocPage.label;
    }

    itemBtns.forEach((btn) => {
      const isActive = btn.getAttribute("data-pe-item") === activeId;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      btn.className = `w-full text-left rounded-xl p-3.5 border transition-all flex items-start justify-between gap-3 ${
        isActive ? "bg-slate-900 border-cyan-400 shadow-[0_0_24px_rgba(0,240,255,0.12)]" : "bg-slate-950/70 border-slate-800/90 hover:border-slate-600"
      }`;
      const status = btn.querySelector("[data-pe-status]");
      if (status) {
        status.textContent = isActive ? "INSPECTING" : "OPEN";
        status.className = `font-mono-tabular text-[10px] mt-1 shrink-0 ${isActive ? "text-cyan-300 font-semibold" : "text-slate-500"}`;
      }
    });
  }

  function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    if (clearBtn) clearBtn.classList.toggle("hidden", !query);

    let visibleCount = 0;
    let firstVisibleId = null;
    let activeStillVisible = false;

    itemBtns.forEach((btn) => {
      const id = btn.getAttribute("data-pe-item");
      const cat = btn.getAttribute("data-pe-cat");
      const node = PORTALS_14.find((p) => p.id === id);
      const ok = node && (activeCat === "all" || cat === activeCat) && getMatches(node, query);
      btn.classList.toggle("hidden", !ok);
      if (ok) {
        visibleCount += 1;
        if (!firstVisibleId) firstVisibleId = id;
        if (id === activeId) activeStillVisible = true;
      }
    });

    if (countEl) countEl.textContent = `${visibleCount} / 14 shown`;
    if (emptyBox) emptyBox.classList.toggle("hidden", visibleCount > 0);
    if (emptyQueryEl) emptyQueryEl.textContent = searchInput?.value || "";
    if (listWrap) listWrap.classList.toggle("hidden", visibleCount === 0);

    if (visibleCount > 0 && !activeStillVisible && firstVisibleId) activeId = firstVisibleId;
    renderSelected();
  }

  function selectPortal(id, resetFilterIfHidden) {
    if (resetFilterIfHidden) {
      activeCat = "all";
      if (searchInput) searchInput.value = "";
      filterBtns.forEach((b) => {
        const isAll = b.getAttribute("data-pe-filter") === "all";
        b.setAttribute("aria-selected", isAll ? "true" : "false");
        b.className = `px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors border ${
          isAll ? "bg-cyan-400 text-slate-950 border-cyan-300 font-semibold" : "bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white"
        }`;
      });
    }
    activeId = id;
    applyFilters();
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCat = btn.getAttribute("data-pe-filter") || "all";
      filterBtns.forEach((b) => {
        const active = b === btn;
        b.setAttribute("aria-selected", active ? "true" : "false");
        b.className = `px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors border ${
          active ? "bg-cyan-400 text-slate-950 border-cyan-300 font-semibold" : "bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white"
        }`;
      });
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", applyFilters);
  clearBtn?.addEventListener("click", () => { if (searchInput) { searchInput.value = ""; applyFilters(); searchInput.focus(); } });
  resetBtn?.addEventListener("click", () => selectPortal("core", true));

  itemBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-pe-item");
      if (id) selectPortal(id, false);
    });
  });

  prevBtn?.addEventListener("click", () => {
    const idx = PORTALS_14.findIndex((p) => p.id === activeId);
    const next = PORTALS_14[(idx - 1 + PORTALS_14.length) % PORTALS_14.length];
    selectPortal(next.id, true);
  });
  nextBtn?.addEventListener("click", () => {
    const idx = PORTALS_14.findIndex((p) => p.id === activeId);
    const next = PORTALS_14[(idx + 1) % PORTALS_14.length];
    selectPortal(next.id, true);
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.getAttribute("data-pe-tab");
      if (t) selectTab(t);
    });
  });

  openDeepBtn?.addEventListener("click", () => selectTab("arena_deep_dive"));

  copyBtn?.addEventListener("click", () => {
    const node = PORTALS_14.find((p) => p.id === activeId) || PORTALS_14[0];
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(node.fullUrl).catch(() => {});
    }
    const label = copyBtn.querySelector("span");
    if (label) label.textContent = "Copied";
    if (copyTimer) window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => { if (label) label.textContent = "Copy"; }, 2000);
  });

  document.getElementById("arch-jump-db")?.addEventListener("click", () => {
    document.getElementById("portal-explorer")?.scrollIntoView({ behavior: "smooth" });
    selectPortal("database", true);
  });

  applyFilters();
  registerSync(applyFilters);
}

/* 9. Client-Side Deterministic Math Engine (architecture.html) */
function modPow(base, exp, mod) {
  let result = 1n, b = base % mod, e = exp;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % mod;
    e >>= 1n;
    b = (b * b) % mod;
  }
  return result;
}

function isMillerRabinPrime(n) {
  if (n < 2n) return false;
  for (const p of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }
  let d = n - 1n, s = 0n;
  while ((d & 1n) === 0n) { d >>= 1n; s += 1n; }
  for (const a of [2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n]) {
    if (a % n === 0n) continue;
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) { composite = false; break; }
    }
    if (composite) return false;
  }
  return true;
}

function gcdBig(a, b) {
  let x = a < 0n ? -a : a, y = b < 0n ? -b : b;
  while (y !== 0n) { const t = x % y; x = y; y = t; }
  return x;
}

function brentPollardRho(n) {
  if (n % 2n === 0n) return 2n;
  let c = 1n;
  while (true) {
    let y = 2n, r = 1n, q = 1n, g = 1n, x = 2n, ys = 2n;
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
          q = (q * (x > y ? x - y : y - x)) % n;
        }
        g = gcdBig(q, n);
        k += 64n;
      }
      r <<= 1n;
    }
    if (g === n) {
      do { ys = f(ys); g = gcdBig(x > ys ? x - ys : ys - x, n); } while (g === 1n);
    }
    if (g !== n) return g;
    c += 1n;
  }
}

function factorizeBigInt(n) {
  const factors = [];
  function rec(v) {
    if (v <= 1n) return;
    if (isMillerRabinPrime(v)) { factors.push(v); return; }
    const d = brentPollardRho(v);
    rec(d); rec(v / d);
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
  if (!inputEl || !runBtn || !primeOut || runBtn.dataset.aeBound === "1") return;
  runBtn.dataset.aeBound = "1";

  const evaluate = () => {
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
    primeOut.textContent = isP ? "Miller-Rabin Verified PRIME" : "Composite Integer";
    if (factorsOut) factorsOut.textContent = facs.map((x) => x.toString()).join(" × ");
    if (timeOut) timeOut.textContent = `${dt} ms (0 server calls)`;
  };

  runBtn.addEventListener("click", evaluate);
  inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") evaluate(); });
  evaluate();
  registerSync(evaluate);
}

/* 10. 3D Arena Polyhedron Carousel Stage (index.html & arenas-elo.html) */
function initArena3DStage() {
  document.querySelectorAll("[data-arena-3d-stage]").forEach((stage) => {
    if (stage.dataset.aeBound === "1") return;
    stage.dataset.aeBound = "1";

    const badge = stage.querySelector("[data-arena-3d-badge]");
    const wheel = stage.querySelector("[data-arena-3d-wheel]");
    const stepBtns = stage.querySelectorAll("[data-arena-3d-step]");
    const cards = stage.querySelectorAll("[data-arena-3d-card]");
    const mobiles = stage.querySelectorAll("[data-arena-3d-mobile]");
    let currentKey = "nt";

    const renderKey = (key) => {
      const idx = Math.max(0, ARENA_KEYS.indexOf(key));
      currentKey = ARENA_KEYS[idx];
      const arena = ARENA_CATALOG[currentKey];
      if (badge) badge.textContent = `${idx + 1} / 5 · Subsite #${idx + 1}`;
      if (wheel) {
        const angle = -idx * 72;
        if (window.gsap && !prefersReducedMotion()) {
          window.gsap.to(wheel, { rotateY: angle, z: -230, duration: 0.72, ease: "power3.out" });
        } else {
          wheel.style.transform = `translateZ(-230px) rotateY(${angle}deg)`;
        }
      }
      cards.forEach((c) => {
        const cKey = c.getAttribute("data-arena-3d-card");
        const isAct = cKey === currentKey;
        c.style.borderColor = isAct ? arena.color : "rgba(51,65,85,0.6)";
        c.style.boxShadow = isAct ? `0 0 38px ${arena.color}28, inset 0 0 22px ${arena.color}12` : "0 12px 30px rgba(0,0,0,0.45)";
      });
      mobiles.forEach((m) => {
        const mKey = m.getAttribute("data-arena-3d-mobile");
        const isAct = mKey === currentKey;
        m.style.borderColor = isAct ? arena.color : "rgba(30,41,59,0.9)";
        m.style.backgroundColor = isAct ? `${arena.color}14` : "rgba(2,6,23,0.75)";
      });
    };

    const selectAndBroadcast = (key) => {
      renderKey(key);
      document.dispatchEvent(new CustomEvent("ae:arena-select", { detail: { key } }));
    };

    stepBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const dir = Number(btn.getAttribute("data-arena-3d-step") || "1");
        const idx = Math.max(0, ARENA_KEYS.indexOf(currentKey));
        selectAndBroadcast(ARENA_KEYS[(idx + dir + ARENA_KEYS.length) % ARENA_KEYS.length]);
      });
    });

    cards.forEach((c) => c.addEventListener("click", () => {
      const key = c.getAttribute("data-arena-3d-card");
      if (key) selectAndBroadcast(key);
    }));
    mobiles.forEach((m) => m.addEventListener("click", () => {
      const key = m.getAttribute("data-arena-3d-mobile");
      if (key) selectAndBroadcast(key);
    }));

    document.addEventListener("ae:arena-select", (e) => {
      if (e.detail?.key && ARENA_CATALOG[e.detail.key]) renderKey(e.detail.key);
    });
    renderKey(currentKey);
  });
}

/* 11. Home Portal Filter & 5-Arena Showcase Tabs (index.html) */
function initHomeInteractiveControls() {
  const filterBtns = document.querySelectorAll("[data-home-portal-filter]");
  const portalCards = document.querySelectorAll("[data-home-portal-card]");
  if (filterBtns.length && portalCards.length) {
    filterBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-home-portal-filter") || "all";
        filterBtns.forEach((b) => {
          const active = b === btn;
          b.className = `px-3.5 py-2 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
            active ? "border-cyan-400 bg-cyan-400/15 text-white font-semibold" : "border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white"
          }`;
        });
        portalCards.forEach((card) => {
          card.classList.toggle("hidden", cat !== "all" && (card.getAttribute("data-cat") || "") !== cat);
        });
      });
    });
  }

  const arenaTabs = document.querySelectorAll("[data-home-arena-tab]");
  const arenaPanel = document.querySelector("[data-home-arena-panel]");
  if (arenaTabs.length && arenaPanel && arenaPanel.dataset.aeBound !== "1") {
    arenaPanel.dataset.aeBound = "1";
    const metaEl = arenaPanel.querySelector("[data-ha-meta]");
    const titleEl = arenaPanel.querySelector("[data-ha-title]");
    const dayEl = arenaPanel.querySelector("[data-ha-day]");
    const entryEl = arenaPanel.querySelector("[data-ha-entry-title]");
    const ranksEl = arenaPanel.querySelector("[data-ha-ranks]");

    const selectArena = (key) => {
      const item = ARENA_CATALOG[key];
      if (!item) return;
      arenaTabs.forEach((tab) => {
        const active = tab.getAttribute("data-home-arena-tab") === key;
        tab.className = `px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
          active ? "bg-slate-900 text-white border-cyan-400 shadow-[0_0_24px_rgba(0,240,255,0.16)]" : "bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-600"
        }`;
      });
      if (metaEl) { metaEl.textContent = `${item.code} · ${item.subsite}`; metaEl.style.color = item.color; }
      if (titleEl) titleEl.textContent = item.name;
      if (dayEl) dayEl.textContent = item.day;
      if (entryEl) {
        entryEl.replaceChildren();
        const prefix = document.createTextNode(`${item.titles[0].title} (0–499) → `);
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
          row.className = "flex items-center justify-between gap-2 rounded-lg border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-slate-300";
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
        if (key) {
          selectArena(key);
          document.dispatchEvent(new CustomEvent("ae:arena-select", { detail: { key } }));
        }
      });
    });
    document.addEventListener("ae:arena-select", (e) => {
      if (e.detail?.key) selectArena(e.detail.key);
    });
  }
}

/* 12. 60-Second Guest Math Duel & Instant ELO Estimator (index.html #guest-duel) */
function initGuestDuel() {
  const root = document.querySelector("[data-guest-duel-root]");
  if (!root || root.dataset.aeBound === "1") return;
  root.dataset.aeBound = "1";

  const MAX_ATTEMPTS = 3;
  const GUEST_PROBLEMS = [
    { id: "nt-2026", arenaKey: "nt", arenaLabel: "Number Theory · Subsite #1", statement: "Find the remainder when 2²⁰²⁶ + 3²⁰²⁶ is divided by 5.", hint: "Euler / mod-4 cyclicity: 2² ≡ −1 (mod 5) and 3² ≡ −1 (mod 5). Determine (−1)¹⁰¹³ + (−1)¹⁰¹³ modulo 5.", answer: "3", explanation: "Since 2² ≡ −1 (mod 5), 2²⁰²⁶ = (2²)¹⁰¹³ ≡ −1 ≡ 4 (mod 5). Likewise 3² ≡ −1 (mod 5) gives 3²⁰²⁶ ≡ 4 (mod 5). Thus 4 + 4 = 8 ≡ 3 (mod 5).", baseElo: 1620 },
    { id: "alg-vieta", arenaKey: "alg", arenaLabel: "Algebra · Subsite #2", statement: "Let r and s be the roots of x² − 14x + 29 = 0. Compute the exact integer value of r² + s².", hint: "Apply Vieta’s formulas: find (r + s) and (r·s), then rewrite r² + s² as (r + s)² − 2rs.", answer: "138", explanation: "By Vieta’s formulas, r + s = 14 and rs = 29. Therefore r² + s² = 14² − 2(29) = 196 − 58 = 138.", baseElo: 1580 },
    { id: "comb-paths", arenaKey: "comb", arenaLabel: "Combinatorics · Subsite #4", statement: "How many 6-bit binary strings contain no two adjacent 1s? (Include 000000 in your count.)", hint: "Let Fₙ count valid n-bit strings ending in 0 or 1: F₁ = 2, F₂ = 3, and Fₙ = Fₙ₋₁ + Fₙ₋₂.", answer: "21", explanation: "Using the shifted Fibonacci recurrence F₁ = 2, F₂ = 3: F₃ = 5, F₄ = 8, F₅ = 13, F₆ = 21.", baseElo: 1680 },
    { id: "geo-cyclic", arenaKey: "geo", arenaLabel: "Geometry · Subsite #3", statement: "In convex cyclic quadrilateral ABCD, ∠ABC = 112° and ∠BAD = 84°. Find the degree measure of ∠CDA.", hint: "Remember that opposite interior angles of any quadrilateral inscribed in a circle are supplementary (sum to 180°).", answer: "68", explanation: "Since ABCD is cyclic, ∠ABC + ∠CDA = 180°. Thus ∠CDA = 180° − 112° = 68°.", baseElo: 1460 },
    { id: "nt-tau", arenaKey: "nt", arenaLabel: "Number Theory · Subsite #1", statement: "How many positive integer divisors does N = 2⁴ · 3² · 5¹ possess?", hint: "For a prime factorization p₁^a₁ · p₂^a₂ · p₃^a₃, multiply (aᵢ + 1) across every prime factor.", answer: "30", explanation: "By the divisor-counting function τ(N) = (4 + 1)(2 + 1)(1 + 1) = 5 × 3 × 2 = 30 positive divisors.", baseElo: 1350 },
    { id: "alg-rec", arenaKey: "alg", arenaLabel: "Algebra · Subsite #2", statement: "A sequence satisfies a₁ = 2, a₂ = 5, and aₙ₊₂ = 3aₙ₊₁ − 2aₙ for all n ≥ 1. Compute a₆.", hint: "Compute a₃ and a₄ first, or solve the characteristic polynomial r² − 3r + 2 = 0 to find a closed form.", answer: "95", explanation: "Successive terms: a₁ = 2, a₂ = 5, a₃ = 11, a₄ = 23, a₅ = 47, a₆ = 3(47) − 2(23) = 95 (or aₙ = 3·2ⁿ⁻¹ − 1).", baseElo: 1740 },
    { id: "geo-radii", arenaKey: "geo", arenaLabel: "Geometry · Subsite #3", statement: "Right triangle ABC has legs AB = 12 and AC = 16. Find the integer sum R + r of its circumradius R and inradius r.", hint: "For any right triangle with legs a, b and hypotenuse c, R = c/2 and r = (a + b − c)/2 — notice how c cancels!", answer: "14", explanation: "Hypotenuse c = √(12² + 16²) = 20, giving R = 10 and r = (12 + 16 − 20)/2 = 4. Directly, R + r = (a + b)/2 = 28/2 = 14.", baseElo: 1520 },
    { id: "comb-decagon", arenaKey: "comb", arenaLabel: "Combinatorics · Subsite #4", statement: "All diagonals of a convex 10-gon are drawn, with no three concurrent inside. How many interior intersection points exist?", hint: "Every set of 4 vertices forms a convex quadrilateral whose two diagonals cross at a unique interior point.", answer: "210", explanation: "Each 4-vertex subset determines uniquely 1 interior intersection point: C(10, 4) = (10·9·8·7)/24 = 210.", baseElo: 1850 },
    { id: "nt-trailing", arenaKey: "nt", arenaLabel: "Number Theory · Subsite #1", statement: "How many trailing zeros does 100! have when written in standard base-10 notation?", hint: "Use Legendre’s formula to count factors of 5 in 100!: ⌊100/5⌋ + ⌊100/25⌋.", answer: "24", explanation: "Factors of 2 far outnumber factors of 5. By Legendre’s formula, v₅(100!) = ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24 trailing zeros.", baseElo: 1490 },
    { id: "alg-cubic-sum", arenaKey: "alg", arenaLabel: "Algebra · Subsite #2", statement: "Suppose a positive real number x satisfies x + 1/x = 5. Find the exact integer value of x³ + 1/x³.", hint: "Cube both sides of x + 1/x = 5 using (a + b)³ = a³ + b³ + 3ab(a + b).", answer: "110", explanation: "Since (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x), we get x³ + 1/x³ = 5³ − 3(5) = 125 − 15 = 110.", baseElo: 1650 },
    { id: "geo-power", arenaKey: "geo", arenaLabel: "Geometry · Subsite #3", statement: "From an external point P, tangent PT touches a circle at T and secant PAB meets the circle at A and B with PA = 4 and AB = 12. Find PT.", hint: "Apply Power of a Point from P: PT² = PA · PB, where PB = PA + AB.", answer: "8", explanation: "With PA = 4 and PB = 4 + 12 = 16, Power of a Point gives PT² = 4 × 16 = 64, so PT = 8.", baseElo: 1610 },
    { id: "comb-stars", arenaKey: "comb", arenaLabel: "Combinatorics · Subsite #4", statement: "How many ordered triples of positive integers (x, y, z) satisfy x + y + z = 12?", hint: "Use Stars and Bars for positive integers: place 2 dividers among 11 gaps between 12 unit stars.", answer: "55", explanation: "By Stars and Bars, positive integer solutions to x + y + z = 12 equal C(12 − 1, 3 − 1) = C(11, 2) = (11 × 10)/2 = 55.", baseElo: 1560 },
    { id: "nt-totient", arenaKey: "nt", arenaLabel: "Number Theory · Subsite #1", statement: "Compute Euler’s totient φ(72) — the count of integers k with 1 ≤ k ≤ 72 such that gcd(k, 72) = 1.", hint: "Factor 72 = 2³ · 3² and apply φ(n) = n · (1 − 1/2) · (1 − 1/3).", answer: "24", explanation: "Since 72 = 2³ · 3², Euler’s product formula yields φ(72) = 72 × (1/2) × (2/3) = 24.", baseElo: 1720 },
    { id: "alg-cubic-vieta", arenaKey: "alg", arenaLabel: "Algebra · Subsite #2", statement: "Let a, b, c be the roots of x³ − 6x² + 11x − 6 = 0. Compute a² + b² + c².", hint: "Use Vieta’s formulas for a + b + c and ab + bc + ca, then expand (a + b + c)².", answer: "14", explanation: "By Vieta’s formulas, a + b + c = 6 and ab + bc + ca = 11. Thus a² + b² + c² = 6² − 2(11) = 36 − 22 = 14.", baseElo: 1790 },
    { id: "geo-heron", arenaKey: "geo", arenaLabel: "Geometry · Subsite #3", statement: "A triangle has side lengths 13, 14, and 15. Compute its exact integer area.", hint: "Compute semi-perimeter s = (13 + 14 + 15)/2 = 21 and apply Heron’s formula √(s(s−a)(s−b)(s−c)).", answer: "84", explanation: "With s = 21, Heron’s formula gives Area = √(21 × 8 × 7 × 6) = √(7² × 3² × 4²) = 7 × 3 × 4 = 84.", baseElo: 1640 },
    { id: "comb-derange", arenaKey: "comb", arenaLabel: "Combinatorics · Subsite #4", statement: "In how many ways can 5 distinct letters be placed into 5 labeled envelopes so that NO letter goes into its matching envelope?", hint: "Compute the 5th derangement number D₅ = 5! · (1 − 1 + 1/2! − 1/3! + 1/4! − 1/5!).", answer: "44", explanation: "Using inclusion-exclusion for derangements: D₅ = 120(1/2 − 1/6 + 1/24 − 1/120) = 60 − 20 + 5 − 1 = 44.", baseElo: 1810 },
    { id: "mixed-dioph", arenaKey: "mixed", arenaLabel: "Mixed Olympiad · Subsite #5", statement: "How many ordered pairs of positive integers (x, y) satisfy 1/x + 1/y = 1/6?", hint: "Clear denominators and apply Simon’s Favorite Factoring Trick: (x − 6)(y − 6) = 36.", answer: "9", explanation: "Multiplying by 6xy gives 6x + 6y = xy, or (x − 6)(y − 6) = 36. Every positive divisor pair of 36 yields x, y ≥ 7 > 0, and 36 = 2²·3² has (2+1)(2+1) = 9 positive divisors.", baseElo: 1880 },
    { id: "mixed-poly", arenaKey: "mixed", arenaLabel: "Mixed Olympiad · Subsite #5", statement: "A monic quadratic polynomial P(x) = x² + bx + c satisfies P(1) = 4 and P(3) = 16. Compute P(5).", hint: "Solve the linear system for b and c from P(1) = 4 and P(3) = 16, or inspect second differences of x².", answer: "36", explanation: "From 1 + b + c = 4 and 9 + 3b + c = 16, subtracting gives 2b = 4 → b = 2 and c = 1, so P(x) = (x + 1)². Hence P(5) = 6² = 36.", baseElo: 1920 },
  ];

  const RESERVED_HANDLES = new Set(["admin", "administrator", "hq", "prime_sovereign", "root", "staff", "support", "arithmo", "rayaan", "jalees", "moderator", "system"]);
  const BOT_TIERS = [
    { min: 0, max: 499, name: "Spark" }, { min: 500, max: 899, name: "Novice" }, { min: 900, max: 1199, name: "Scout" },
    { min: 1200, max: 1399, name: "Tactician" }, { min: 1400, max: 1599, name: "Striker" }, { min: 1600, max: 1799, name: "Strategist" },
    { min: 1800, max: 1999, name: "Cipher" }, { min: 2000, max: 2199, name: "Sentinel" }, { min: 2200, max: 2399, name: "Overlord" },
    { min: 2400, max: 2699, name: "Archon" }, { min: 2700, max: 2999, name: "Vanguard" }, { min: 3000, max: 9999, name: "Apex BOT" },
  ];

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
  if (arenaEl?.parentElement && !attemptPill) {
    attemptPill = document.createElement("span");
    attemptPill.setAttribute("data-gd-attempts-pill", "");
    attemptPill.className = "gd-attempt-pill text-[11px] font-mono-tabular text-slate-300";
    arenaEl.parentElement.appendChild(attemptPill);
  }

  let problemIdx = 0, phase = "ready", secondsLeft = 60, attemptsUsed = 0, showHint = false, timerId = null, wrongMsg = null, estimatedElo = null;

  const stopTimer = () => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };
  registerCleanup(stopTimer);

  const renderFeedbackBanner = () => {
    leftPanel?.querySelectorAll("[data-gd-wrong], [data-gd-timeout], [data-gd-solved], [data-gd-exhausted]").forEach((n) => n.remove());
    if (!leftPanel) return;
    const p = GUEST_PROBLEMS[problemIdx];

    if (wrongMsg && phase === "running") {
      const box = document.createElement("div");
      box.setAttribute("data-gd-wrong", "");
      box.className = "gd-banner-enter rounded-xl border border-rose-500/45 bg-rose-500/10 p-3.5 text-xs text-rose-200 flex items-center justify-between gap-3";
      const span = document.createElement("span");
      span.setAttribute("data-gd-wrong-text", "");
      span.textContent = wrongMsg;
      box.appendChild(span);
      leftPanel.appendChild(box);
    } else if (phase === "exhausted" || phase === "timeout" || phase === "solved") {
      const box = document.createElement("div");
      const attr = phase === "exhausted" ? "data-gd-exhausted" : phase === "timeout" ? "data-gd-timeout" : "data-gd-solved";
      box.setAttribute(attr, "");
      box.className = phase === "solved"
        ? "gd-banner-enter rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-200 space-y-2"
        : "gd-banner-enter rounded-xl border border-rose-400/45 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-100 space-y-2.5";

      const top = document.createElement("div");
      top.className = "flex flex-wrap items-center justify-between gap-2";
      const heading = document.createElement(phase === "solved" ? "div" : "strong");
      heading.className = phase === "solved" ? "font-semibold flex items-center gap-2 text-emerald-300" : "text-white";
      heading.textContent = phase === "solved"
        ? `Verified Accepted in ${60 - secondsLeft}s (${attemptsUsed}/${MAX_ATTEMPTS} attempts)!`
        : phase === "exhausted"
          ? `3/3 Attempts Exhausted — Official Ground Truth: ${p.answer}`
          : `00:00 Timeout Reached — Official Ground Truth: ${p.answer}`;

      const btnWrap = document.createElement("div");
      btnWrap.className = "flex flex-wrap gap-2";
      if (phase === "timeout") {
        const retryBtn = document.createElement("button");
        retryBtn.type = "button";
        retryBtn.setAttribute("data-gd-retry", "");
        retryBtn.className = "gd-btn gd-btn-switch px-3 py-1.5 text-xs shrink-0";
        retryBtn.textContent = "Retry Same Problem";
        retryBtn.addEventListener("click", startDuel);
        btnWrap.appendChild(retryBtn);
      }
      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.setAttribute("data-gd-next", "");
      nextBtn.className = phase === "exhausted" ? "gd-btn gd-btn-primary px-3.5 py-1.5 text-xs shrink-0" : "gd-btn gd-btn-switch px-3 py-1.5 text-xs shrink-0";
      nextBtn.textContent = "Next Problem →";
      nextBtn.addEventListener("click", switchProblem);
      btnWrap.appendChild(nextBtn);
      top.append(heading, btnWrap);

      const explain = document.createElement("p");
      explain.className = "ae-prose text-justify text-slate-200 leading-relaxed";
      explain.textContent = p.explanation;
      box.append(top, explain);
      leftPanel.appendChild(box);
    }
  };

  function renderUI() {
    const p = GUEST_PROBLEMS[problemIdx];
    const isRunning = phase === "running";
    const pct = Math.max(0, Math.min(100, Math.round((secondsLeft / 60) * 100)));
    root.setAttribute("data-gd-phase", phase);

    if (metaEl) metaEl.textContent = `Guest Duel Sandbox · Problem ${problemIdx + 1} of ${GUEST_PROBLEMS.length} · Deterministic Client Grading`;
    if (arenaEl) arenaEl.textContent = p.arenaLabel;
    if (eloEl) eloEl.textContent = `Baseline Calibration: ${p.baseElo} ELO`;
    if (statementEl) statementEl.textContent = p.statement;
    if (hintTextEl) hintTextEl.textContent = p.hint;
    if (hintBox) hintBox.classList.toggle("hidden", !showHint);
    if (hintBtn) {
      hintBtn.setAttribute("aria-pressed", showHint ? "true" : "false");
      hintBtn.classList.toggle("is-active", showHint);
      const sp = hintBtn.querySelector("span");
      if (sp) sp.textContent = showHint ? "Hide Hint" : "Hint";
    }
    if (chamberBox) {
      chamberBox.className = `flex-1 flex flex-col justify-between rounded-xl bg-slate-950/85 border p-4 sm:p-5 space-y-3 transition-all duration-300 ${
        isRunning ? "border-cyan-400/40 shadow-[0_0_28px_rgba(0,240,255,0.08)]" : phase === "solved" ? "border-emerald-400/40" : phase === "exhausted" || phase === "timeout" ? "border-rose-500/35" : "border-slate-800"
      }`;
    }
    if (progressFill) {
      progressFill.style.width = `${pct}%`;
      progressFill.className = `gd-timer-bar-fill ${
        phase === "solved" ? "bg-emerald-400" : phase === "exhausted" || phase === "timeout" || (isRunning && secondsLeft < 10) ? "bg-rose-500" : isRunning && secondsLeft < 20 ? "bg-amber-400" : "bg-cyan-400"
      }`;
    }
    if (scoringLeft) scoringLeft.textContent = `Scoring: Base ${p.baseElo} + Speed Bonus (up to +87)`;
    if (scoringRight) {
      scoringRight.className = isRunning ? (secondsLeft < 10 ? "text-rose-300 font-semibold" : "text-cyan-300 font-semibold") : phase === "solved" ? "text-emerald-300 font-semibold" : phase === "exhausted" || phase === "timeout" ? "text-rose-300 font-semibold" : "text-slate-400";
      scoringRight.textContent = isRunning ? `Active Clock · +${Math.max(0, Math.round(secondsLeft * 1.45))} live bonus` : phase === "solved" ? "Round Accepted · Instant Estimate Locked" : phase === "exhausted" ? "3/3 Attempts Used · Ground Truth Revealed" : phase === "timeout" ? "Round Expired · Press Start or Next" : "Ready · 3 Attempts Max · Deterministic Check";
    }
    clockEl.textContent = `00:${pad2(secondsLeft)}`;
    clockEl.className = `font-mono-tabular text-lg sm:text-xl font-bold leading-tight transition-colors duration-300 ${
      secondsLeft < 10 && isRunning ? "text-rose-400 animate-pulse" : secondsLeft < 20 && isRunning ? "text-amber-300" : phase === "solved" ? "text-emerald-400" : phase === "exhausted" || phase === "timeout" ? "text-rose-300" : "text-cyan-300"
    }`;
    if (clockWrap) {
      clockWrap.className = `rounded-xl bg-slate-950/90 border px-3.5 py-2 text-center min-w-[96px] transition-all duration-300 ${
        secondsLeft < 10 && isRunning ? "border-rose-500/75 shadow-[0_0_20px_rgba(244,63,94,0.28)]" : secondsLeft < 20 && isRunning ? "border-amber-400/65 shadow-[0_0_18px_rgba(245,158,11,0.22)]" : isRunning ? "border-cyan-400/55 shadow-[0_0_20px_rgba(0,240,255,0.18)]" : phase === "solved" ? "border-emerald-400/55 shadow-[0_0_18px_rgba(16,185,129,0.2)]" : "border-slate-800"
      }`;
    }

    formEl.className = `gd-action-form ${isRunning ? "is-running" : "is-idle"}`;
    if (startBtn) {
      startBtn.classList.toggle("hidden", isRunning);
      startBtn.style.display = isRunning ? "none" : "";
    }
    inputEl.disabled = !isRunning;
    inputEl.placeholder = isRunning ? `Enter exact integer (${MAX_ATTEMPTS - attemptsUsed}/${MAX_ATTEMPTS} left)...` : "Click Start 60s Guest Duel...";
    submitBtn.disabled = !isRunning;
    const subSpan = submitBtn.querySelector("span");
    if (subSpan) subSpan.textContent = isRunning ? `Verify (${MAX_ATTEMPTS - attemptsUsed}/${MAX_ATTEMPTS})` : "Verify Answer";

    if (eloCard) {
      eloCard.className = `rounded-xl border px-4 py-3 text-center space-y-1 transition-all duration-300 ${
        estimatedElo ? "border-emerald-400/45 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.16)]" : phase === "exhausted" || phase === "timeout" ? "border-rose-500/35 bg-rose-500/5" : "border-slate-800 bg-slate-900/70"
      }`;
    }
    if (eloValEl) {
      eloValEl.textContent = estimatedElo ? `${estimatedElo} ELO` : phase === "exhausted" ? "0/3 · Ground Truth" : phase === "timeout" ? "00:00 · Retry" : "— — —";
    }
    if (eloSubEl) {
      if (estimatedElo) {
        const bracket = (ARENA_CATALOG[p.arenaKey]?.titles.find((t) => estimatedElo >= t.min && estimatedElo <= t.max) || ARENA_CATALOG.nt.titles[0]).title;
        const botName = (BOT_TIERS.find((b) => estimatedElo >= b.min && estimatedElo <= b.max) || BOT_TIERS[11]).name;
        eloSubEl.textContent = `${estimatedElo} ELO · ${bracket} (${botName} Bot Tier)`;
      } else {
        eloSubEl.textContent = phase === "exhausted" ? "3/3 Attempts Used — Review Solution & Advance" : isRunning ? `Clock Active — ${MAX_ATTEMPTS - attemptsUsed}/${MAX_ATTEMPTS} attempts remaining` : "Press Start 60s Guest Duel & solve before 00:00";
      }
    }
    if (handleForm) {
      handleForm.className = `space-y-2.5 pt-3 border-t border-slate-800/80 rounded-xl transition-all ${phase === "solved" ? "p-3 border border-emerald-400/35 bg-emerald-500/5" : ""}`;
    }

    if (attemptPill) {
      const remaining = Math.max(0, MAX_ATTEMPTS - attemptsUsed);
      attemptPill.replaceChildren();
      const lbl = document.createElement("span");
      lbl.className = remaining === 0 ? "text-rose-300 font-semibold" : remaining === 1 && isRunning ? "text-amber-300 font-semibold" : "text-slate-300";
      lbl.textContent = `Attempts ${remaining}/${MAX_ATTEMPTS}`;
      const dotsWrap = document.createElement("span");
      dotsWrap.className = "inline-flex items-center gap-1";
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const dot = document.createElement("span");
        dot.className = `gd-attempt-dot ${i < remaining ? (phase === "solved" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]" : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.65)]") : "bg-rose-500/70 scale-90"}`;
        dotsWrap.appendChild(dot);
      }
      attemptPill.append(lbl, dotsWrap);
    }

    renderFeedbackBanner();
  }

  function startDuel() {
    stopTimer();
    secondsLeft = 60; attemptsUsed = 0; inputEl.value = ""; wrongMsg = null; estimatedElo = null; phase = "running";
    renderUI();
    window.requestAnimationFrame(() => inputEl.focus());
    timerId = window.setInterval(() => {
      if (secondsLeft <= 1) {
        stopTimer(); secondsLeft = 0; phase = "timeout"; wrongMsg = null; renderUI(); return;
      }
      secondsLeft -= 1; renderUI();
    }, 1000);
  }

  function switchProblem() {
    stopTimer();
    problemIdx = (problemIdx + 1) % GUEST_PROBLEMS.length;
    secondsLeft = 60; attemptsUsed = 0; inputEl.value = ""; showHint = false; wrongMsg = null; estimatedElo = null; phase = "ready";
    renderUI();
  }

  const triggerShake = () => {
    inputEl.classList.remove("ae-shake-rose");
    window.requestAnimationFrame(() => {
      inputEl.classList.add("ae-shake-rose");
      window.setTimeout(() => inputEl.classList.remove("ae-shake-rose"), 480);
    });
  };

  startBtn?.addEventListener("click", startDuel);
  switchBtn?.addEventListener("click", switchProblem);
  hintBtn?.addEventListener("click", () => { showHint = !showHint; renderUI(); });
  inputEl.addEventListener("input", () => { if (wrongMsg) { wrongMsg = null; renderFeedbackBanner(); } });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (phase !== "running") return;
    const cleaned = inputEl.value.trim();
    if (!cleaned) { wrongMsg = "Enter an integer answer before verifying."; renderFeedbackBanner(); triggerShake(); return; }
    const p = GUEST_PROBLEMS[problemIdx];
    attemptsUsed += 1;
    if (cleaned === p.answer) {
      stopTimer();
      estimatedElo = Math.max(1200, p.baseElo + Math.max(0, Math.round(secondsLeft * 1.45)) - (showHint ? 60 : 0));
      wrongMsg = null; phase = "solved"; renderUI(); return;
    }
    const remaining = MAX_ATTEMPTS - attemptsUsed;
    if (remaining <= 0) { stopTimer(); wrongMsg = null; phase = "exhausted"; renderUI(); return; }
    wrongMsg = `Incorrect (${cleaned}). ${remaining} of ${MAX_ATTEMPTS} ${remaining === 1 ? "attempt" : "attempts"} remaining — check signs, remainders, or boundary cases.`;
    renderUI(); triggerShake(); inputEl.focus();
  });

  if (handleForm && handleInput) {
    const evaluateHandle = () => {
      const cleaned = handleInput.value.trim().replace(/^@+/, "").toLowerCase();
      if (!cleaned) return { valid: false, cleaned, status: "Enter 3–20 characters (lowercase a–z, 0–9, _) to validate syntax.", tone: "text-slate-400" };
      if (cleaned.length < 3 || cleaned.length > 20) return { valid: false, cleaned, status: "Invalid length: @handles must be between 3 and 20 characters.", tone: "text-rose-300" };
      if (!/^[a-z0-9_]+$/.test(cleaned)) return { valid: false, cleaned, status: "Invalid character: use only lowercase letters (a–z), digits (0–9), or underscores (_).", tone: "text-rose-300" };
      if (RESERVED_HANDLES.has(cleaned)) return { valid: false, cleaned, status: `Reserved system handle (@${cleaned}). Choose a personal competitor handle.`, tone: "text-rose-300" };
      return { valid: true, cleaned, status: `Syntax Valid: @${cleaned} passes all 3–20 char & tombstone checks.`, tone: "text-emerald-300" };
    };
    const updateHandleStatus = () => {
      const res = evaluateHandle();
      if (handleStatusEl) { handleStatusEl.className = `text-[11px] leading-snug ${res.tone}`; handleStatusEl.textContent = res.status; }
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
      notice.className = `rounded-lg border p-2.5 text-xs leading-relaxed ${res.valid ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100" : "border-rose-400/40 bg-rose-500/10 text-rose-200"}`;
      notice.textContent = !res.cleaned ? "Type a candidate @handle (3–20 chars: a–z, 0–9, _) to run format validation." : res.valid ? `Format Verified (@${res.cleaned}): Live account registration & First-50 Singularity claiming officially open on December 16, 2026 (V1.0 Public Launch). No account or handle has been claimed yet during Under Construction preview.` : res.status;
      handleForm.appendChild(notice);
    });
    registerSync(updateHandleStatus);
  }

  renderUI();
}

/* 13. Interactive ELO Explorer (arenas-elo.html) */
function initEloExplorer() {
  const root = document.getElementById("elo-simulator");
  if (!root || root.dataset.aeBound === "1") return;
  root.dataset.aeBound = "1";

  const arenaBtns = document.querySelectorAll("[data-arena-select]");
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

  const renderLadder = () => {
    if (!ladderBody) return;
    const arena = ARENA_CATALOG[activeArena] || ARENA_CATALOG.nt;
    ladderBody.replaceChildren();
    arena.titles.forEach((t) => {
      const row = document.createElement("div");
      row.className = "flex items-center justify-between py-2 px-3 rounded-lg border border-slate-800/70 bg-slate-950/40 text-xs";
      row.setAttribute("data-tier-min", String(t.min));
      row.setAttribute("data-tier-max", String(t.max));
      const left = document.createElement("span");
      left.className = "font-semibold tracking-wide text-slate-200";
      left.textContent = t.title;
      const right = document.createElement("span");
      right.className = "font-mono-tabular text-slate-400";
      right.textContent = t.max >= 9000 ? `${t.min}+` : `${t.min}–${t.max}`;
      row.append(left, right);
      ladderBody.appendChild(row);
    });
  };

  const update = () => {
    const arena = ARENA_CATALOG[activeArena] || ARENA_CATALOG.nt;
    const g = Number(genSlider?.value || 1500);
    const e = Number(expSlider?.value || 1700);
    const avg = Math.round((g + e) / 2);

    if (genVal) genVal.textContent = String(g);
    if (expVal) expVal.textContent = String(e);
    if (avgVal) avgVal.textContent = String(avg);
    if (arenaOut) arenaOut.textContent = arena.name;
    if (subsiteOut) subsiteOut.textContent = arena.subsite;

    const match = arena.titles.find((t) => avg >= t.min && avg <= t.max) || arena.titles[0];
    if (titleOut) { titleOut.textContent = match.title; titleOut.style.color = arena.color; }
    if (badgeBox) { badgeBox.style.borderColor = `${arena.color}66`; badgeBox.style.boxShadow = `0 0 36px ${arena.color}1F`; }
    if (unlocksOut) {
      const perks = [];
      if (avg >= 1500) perks.push("Arithmo Forge Problemsetting Eligible (requires 6 clean matches)");
      if (avg >= 2000) perks.push("2000+ Expert Q&A & Grandmaster Peer Review Eligible (Expert Segments 1–2)");
      if (avg < 1500) perks.push("Eligible for Daily Rated Arenas, 1v1 Bullet Blitz (±100 ELO), and Virtual Gym");
      unlocksOut.textContent = perks.join(" · ");
    }
    if (ladderBody) {
      ladderBody.querySelectorAll("[data-tier-min]").forEach((row) => {
        const min = Number(row.getAttribute("data-tier-min"));
        const max = Number(row.getAttribute("data-tier-max"));
        const isCurrent = avg >= min && avg <= max;
        row.style.borderColor = isCurrent ? arena.color : "rgba(30, 41, 59, 0.7)";
        row.style.backgroundColor = isCurrent ? `${arena.color}18` : "rgba(2, 6, 23, 0.45)";
      });
    }
  };

  const selectArena = (key) => {
    if (!ARENA_CATALOG[key]) return;
    activeArena = key;
    arenaBtns.forEach((b) => {
      const active = b.getAttribute("data-arena-select") === key;
      b.className = `px-4 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
        active ? "border-cyan-400 bg-slate-800 ring-2 ring-cyan-400 text-white" : "border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white"
      }`;
    });
    renderLadder();
    update();
  };

  arenaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-arena-select") || "nt";
      selectArena(k);
      document.dispatchEvent(new CustomEvent("ae:arena-select", { detail: { key: k } }));
    });
  });

  document.addEventListener("ae:arena-select", (e) => {
    if (e.detail?.key && ARENA_CATALOG[e.detail.key]) selectArena(e.detail.key);
  });

  genSlider?.addEventListener("input", update);
  expSlider?.addEventListener("input", update);
  renderLadder();
  update();
  registerSync(update);
}

/* 14. Interactive 1v1 Bullet Blitz & 12-Bot Shadow Gauntlet (arenas-elo.html) */
function initShadowBotGauntlet() {
  const root = document.getElementById("shadow-bot-gauntlet-root");
  if (!root || root.dataset.aeBound === "1") return;
  root.dataset.aeBound = "1";

  const arenaBtns = root.querySelectorAll("[data-sbg-arena]");
  const modeBtns = root.querySelectorAll("[data-sbg-mode]");
  const panels = root.querySelectorAll("[data-sbg-panel]");
  const subsiteOut = root.querySelector("[data-sbg-subsite]");
  const queueBtn = root.querySelector("[data-sbg-queue-btn]");
  const simFallbackBtn = root.querySelector("[data-sbg-sim-fallback]");
  const poolStatus = root.querySelector("[data-sbg-pool-status]");
  const poolElo = root.querySelector("[data-sbg-pool-elo]");

  const rivalInput = document.getElementById("rival-handle-input");
  const rivalFallbackCheck = root.querySelector("[data-sbg-rival-fallback]");
  const rivalMintBtn = root.querySelector("[data-sbg-rival-mint]");
  const rivalFfBtn = root.querySelector("[data-sbg-rival-ff]");
  const rivalStatus = root.querySelector("[data-sbg-rival-status]");

  const userSlider = document.getElementById("gauntlet-user-elo");
  const botSlider = document.getElementById("gauntlet-bot-elo");
  const userVal = root.querySelector("[data-sbg-user-val]");
  const botVal = root.querySelector("[data-sbg-bot-val]");
  const resetBotBtn = root.querySelector("[data-sbg-reset-bot]");
  const ruleBadge = root.querySelector("[data-sbg-rule-badge]");
  const belowNote = root.querySelector("[data-sbg-below-note]");
  const belowBot = root.querySelector("[data-sbg-below-bot]");
  const belowUser = root.querySelector("[data-sbg-below-user]");
  const unratedWrap = root.querySelector("[data-sbg-unrated-wrap]");
  const preferUnratedCheck = root.querySelector("[data-sbg-prefer-unrated]");

  const botCard = root.querySelector("[data-sbg-bot-card]");
  const botTierOut = root.querySelector("[data-sbg-bot-tier]");
  const botRangeOut = root.querySelector("[data-sbg-bot-range]");
  const botNameOut = root.querySelector("[data-sbg-bot-name]");
  const botTeleOut = root.querySelector("[data-sbg-bot-tele]");
  const botStyleOut = root.querySelector("[data-sbg-bot-style]");
  const personaBtns = root.querySelectorAll("[data-sbg-persona]");

  let arenaKey = "nt";
  let contestMode = "shadow";
  let poolState = "idle", poolTimer = 60, poolInterval = null;
  let rivalState = "draft", rivalSeconds = 300, rivalInterval = null;

  const stopIntervals = () => {
    if (poolInterval !== null) { window.clearInterval(poolInterval); poolInterval = null; }
    if (rivalInterval !== null) { window.clearInterval(rivalInterval); rivalInterval = null; }
  };
  registerCleanup(stopIntervals);

  function render() {
    const arena = ARENA_CATALOG[arenaKey] || ARENA_CATALOG.nt;
    const userElo = Number(userSlider?.value || 1650);
    const botElo = Number(botSlider?.value || 1700);
    const preferUnrated = Boolean(preferUnratedCheck?.checked);
    const rivalHandle = (rivalInput?.value || "@euler_seeker").trim() || "@euler_seeker";
    const isBelowUser = botElo < userElo;
    const effectiveRated = !isBelowUser && !preferUnrated;

    arenaBtns.forEach((b) => {
      const act = b.getAttribute("data-sbg-arena") === arenaKey;
      b.className = `px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
        act ? "border-cyan-400 bg-slate-800 text-white font-semibold" : "border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white"
      }`;
    });

    modeBtns.forEach((b) => {
      const m = b.getAttribute("data-sbg-mode");
      const act = m === contestMode;
      const activeCls = m === "ranked" ? "border-cyan-400 bg-cyan-400/10" : m === "rival" ? "border-violet-400 bg-violet-400/10" : "border-amber-400 bg-amber-400/10";
      b.className = `text-left rounded-xl border p-4 transition-all ${act ? activeCls : "border-slate-800 bg-slate-950/70 hover:border-slate-600"}`;
    });
    panels.forEach((p) => p.classList.toggle("hidden", p.getAttribute("data-sbg-panel") !== contestMode));

    if (subsiteOut) subsiteOut.textContent = `${arena.subsite} · Ranked Global Pool`;
    if (queueBtn) queueBtn.textContent = `Queue Ranked Duel (${userElo} ±100 ELO)`;
    if (simFallbackBtn) simFallbackBtn.classList.toggle("hidden", poolState !== "searching");
    if (poolStatus) {
      poolStatus.textContent = poolState === "searching" ? `Searching ±100 ELO Pool (${poolTimer}s left)` : poolState === "stealth" ? "Matched: @tasnim_nt_04 (Stealth Mirror)" : "Standby · Ready to Queue";
    }
    if (poolElo) {
      poolElo.textContent = poolState === "stealth" ? `${userElo} ELO (Exact Live Mirror)` : `${Math.max(0, userElo - 100)} – ${userElo + 100} ELO`;
    }

    if (rivalFfBtn) rivalFfBtn.classList.toggle("hidden", rivalState !== "active");
    if (rivalStatus) {
      rivalStatus.textContent =
        rivalState === "active" ? `LIVE INVITE (${Math.floor(rivalSeconds / 60)}:${pad2(rivalSeconds % 60)} remaining): awaiting ${rivalHandle}` :
        rivalState === "expired" ? "Invite Expired at 5:00 — ZERO Quota Deduction!" :
        rivalState === "pool30" ? `Converted to Global Pool (${rivalSeconds}s to Stealth Bot Fallback)` :
        rivalState === "stealth" ? "Stealth ELO-Mirror Bot Engaged (100% Rated · 0.75× K-Factor)" :
        `Invite URL: ${arena.subsite}duel/pending-${rivalHandle.replace(/^@+/, "")}`;
    }

    if (userVal) userVal.textContent = `${userElo} ELO`;
    if (botVal) botVal.textContent = String(botElo);
    if (belowBot) belowBot.textContent = String(botElo);
    if (belowUser) belowUser.textContent = String(userElo);
    if (belowNote) belowNote.classList.toggle("hidden", !isBelowUser);
    if (unratedWrap) unratedWrap.classList.toggle("hidden", isBelowUser);
    if (ruleBadge) {
      ruleBadge.textContent = effectiveRated ? "100% RATED (≥ User ELO)" : "UNRATED SPARRING";
      ruleBadge.className = `font-mono-tabular font-semibold ${effectiveRated ? "text-emerald-400" : "text-amber-300"}`;
    }

    const persona = SHADOW_BOT_PERSONAS.find((p) => botElo >= p.minElo && botElo <= p.maxElo) || SHADOW_BOT_PERSONAS[11];
    if (botCard) {
      botCard.style.borderColor = persona.accentColor;
      botCard.style.boxShadow = `0 0 32px ${persona.accentColor}20`;
      const icon = botCard.querySelector("svg");
      if (icon) icon.style.color = persona.accentColor;
    }
    if (botTierOut) { botTierOut.textContent = `Tier ${String(persona.tierNum).padStart(2, "0")} · ${arena.name}`; botTierOut.style.color = persona.accentColor; }
    if (botRangeOut) botRangeOut.textContent = persona.maxElo >= 3600 ? "3000+ Band" : `${persona.minElo}–${persona.maxElo} Band`;
    if (botNameOut) botNameOut.textContent = `${botElo} · ${persona.name} BOT`;
    if (botTeleOut) botTeleOut.textContent = persona.telemetryProfile;
    if (botStyleOut) botStyleOut.textContent = persona.style;

    personaBtns.forEach((btn) => {
      const pName = btn.getAttribute("data-sbg-persona-name");
      const act = pName === persona.name;
      btn.className = `rounded-lg border px-2.5 py-2 text-left transition-all ${act ? "bg-slate-800 border-cyan-400 text-white" : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"}`;
      const titleDiv = btn.firstElementChild;
      if (titleDiv) titleDiv.style.color = act ? persona.accentColor : "";
    });
  }

  arenaBtns.forEach((b) => b.addEventListener("click", () => { arenaKey = b.getAttribute("data-sbg-arena") || "nt"; render(); }));
  modeBtns.forEach((b) => b.addEventListener("click", () => { contestMode = b.getAttribute("data-sbg-mode") || "shadow"; render(); }));

  queueBtn?.addEventListener("click", () => {
    if (poolInterval !== null) window.clearInterval(poolInterval);
    poolState = "searching"; poolTimer = 60; render();
    poolInterval = window.setInterval(() => {
      if (poolTimer <= 1) {
        window.clearInterval(poolInterval); poolInterval = null; poolTimer = 0; poolState = "stealth"; render(); return;
      }
      poolTimer -= 1; render();
    }, 1000);
  });

  simFallbackBtn?.addEventListener("click", () => {
    if (poolInterval !== null) { window.clearInterval(poolInterval); poolInterval = null; }
    poolTimer = 0; poolState = "stealth"; render();
  });

  rivalMintBtn?.addEventListener("click", () => {
    if (rivalInterval !== null) window.clearInterval(rivalInterval);
    rivalState = "active"; rivalSeconds = 300; render();
    rivalInterval = window.setInterval(() => {
      if (rivalSeconds <= 1) {
        if (rivalState === "active") {
          if (rivalFallbackCheck?.checked) { rivalState = "pool30"; rivalSeconds = 30; }
          else { window.clearInterval(rivalInterval); rivalInterval = null; rivalState = "expired"; rivalSeconds = 0; }
        } else if (rivalState === "pool30") {
          window.clearInterval(rivalInterval); rivalInterval = null; rivalState = "stealth"; rivalSeconds = 0;
        }
        render(); return;
      }
      rivalSeconds -= 1; render();
    }, 1000);
  });

  rivalFfBtn?.addEventListener("click", () => {
    if (rivalFallbackCheck?.checked) { rivalState = "pool30"; rivalSeconds = 30; }
    else {
      if (rivalInterval !== null) { window.clearInterval(rivalInterval); rivalInterval = null; }
      rivalState = "expired"; rivalSeconds = 0;
    }
    render();
  });

  rivalInput?.addEventListener("input", render);
  rivalFallbackCheck?.addEventListener("change", render);
  userSlider?.addEventListener("input", () => {
    const u = Number(userSlider.value || 1650);
    if (botSlider) {
      const curBot = Number(botSlider.value || 1700);
      if (curBot === u + 50 || Math.abs(curBot - u) <= 50) botSlider.value = String(Math.min(3200, u + 50));
    }
    render();
  });
  botSlider?.addEventListener("input", render);
  resetBotBtn?.addEventListener("click", () => {
    const u = Number(userSlider?.value || 1650);
    if (botSlider) botSlider.value = String(Math.min(3200, u + 50));
    render();
  });
  preferUnratedCheck?.addEventListener("change", render);
  personaBtns.forEach((btn) => btn.addEventListener("click", () => {
    if (botSlider) botSlider.value = btn.getAttribute("data-sbg-persona") || "1690";
    render();
  }));

  render();
  registerSync(render);
}

/* 15. Contest Simulators (contests.html) */
function initContestSimulators() {
  const bdmoBtns = document.querySelectorAll("[data-bdmo-cat]");
  if (bdmoBtns.length) {
    const BDMO_CATS = {
      Primary: { span: "Grades 3–5 · National Foundation Track", focus: "Parity, modular clock puzzles, combinatorial counting & clean divisibility proofs.", mode: "Default Expert-Only Rated (Zero ELO-Segment Fragmentation)", dur: "90 Minutes · Max 2 Subs/Q · T+2h Audit" },
      Junior: { span: "Grades 6–8 · Olympiad Emerging Track", focus: "Angle chasing, Diophantine factorizations, functional substitutions & Pigeonhole bounds.", mode: "Default Expert-Only Rated (Categorized by Academic Division)", dur: "100 Minutes · Max 2 Subs/Q · T+2h Audit" },
      Secondary: { span: "Grades 9–10 · National Camp Track", focus: "LTE, cyclic radical axes, Cauchy-Schwarz inequalities & extremal invariant constructions.", mode: "Default Expert-Only Rated + 2000+ Peer Review Eligible", dur: "120 Minutes · Max 2 Subs/Q · T+3h Audit" },
      "Higher Secondary": { span: "Grades 11–12 · IMO Selection Warm-Up Track", focus: "Projective harmonic bundles, Vieta jumping, polynomial roots of unity & graph Turán bounds.", mode: "Default Expert-Only Rated · Golden Vault + Authored Audit", dur: "150 Minutes · Max 2 Subs/Q · T+3h Audit" },
    };
    const titleOut = document.querySelector("[data-bdmo-title]");
    const spanOut = document.querySelector("[data-bdmo-span]");
    const focusOut = document.querySelector("[data-bdmo-focus]");
    const modeOut = document.querySelector("[data-bdmo-mode]");
    const durOut = document.querySelector("[data-bdmo-dur]");
    bdmoBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-bdmo-cat") || "Secondary";
        const spec = BDMO_CATS[cat] || BDMO_CATS.Secondary;
        bdmoBtns.forEach((b) => {
          const act = b === btn;
          b.className = `px-3.5 py-2 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${act ? "bg-amber-400 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`;
        });
        if (titleOut) titleOut.textContent = `${cat} Division`;
        if (spanOut) spanOut.textContent = spec.span;
        if (focusOut) focusOut.textContent = spec.focus;
        if (modeOut) modeOut.textContent = spec.mode;
        if (durOut) durOut.textContent = spec.dur;
      });
    });
  }

  const quorumSlider = document.getElementById("quorum-slider");
  if (quorumSlider && quorumSlider.dataset.aeBound !== "1") {
    quorumSlider.dataset.aeBound = "1";
    const countEl = document.querySelector("[data-quorum-count]");
    const inlineEl = document.querySelector("[data-quorum-count-inline]");
    const suspBox = document.querySelector("[data-quorum-suspended]");
    const actBox = document.querySelector("[data-quorum-active]");
    const syncQuorum = () => {
      const q = Number(quorumSlider.value || 2);
      if (countEl) countEl.textContent = `${q} ${q === 1 ? "User" : "Users"}`;
      if (inlineEl) inlineEl.textContent = String(q);
      if (suspBox) suspBox.classList.toggle("hidden", q >= 3);
      if (actBox) actBox.classList.toggle("hidden", q < 3);
    };
    quorumSlider.addEventListener("input", syncQuorum);
    quorumSlider.addEventListener("change", syncQuorum);
    syncQuorum();
    registerSync(syncQuorum);
  }

  const modeBtns = document.querySelectorAll("[data-contest-tab]");
  const modePanels = document.querySelectorAll("[data-contest-panel]");
  if (modeBtns.length && modePanels.length) {
    modeBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-contest-tab");
        modeBtns.forEach((b) => {
          const act = b === btn;
          b.classList.toggle("bg-cyan-400", act);
          b.classList.toggle("text-slate-950", act);
          b.classList.toggle("font-semibold", act);
          b.classList.toggle("text-slate-300", !act);
          b.classList.toggle("hover:text-white", !act);
        });
        modePanels.forEach((p) => p.classList.toggle("hidden", p.getAttribute("data-contest-panel") !== target));
      });
    });
  }

  const numpadDisplay = document.getElementById("general-numpad-display");
  const numpadStatus = document.getElementById("general-numpad-status");
  document.querySelectorAll("[data-numpad-key]").forEach((key) => {
    if (key.dataset.aeBound === "1") return;
    key.dataset.aeBound = "1";
    key.addEventListener("click", () => {
      if (!numpadDisplay) return;
      const val = key.getAttribute("data-numpad-key");
      if (val === "CLR") {
        numpadDisplay.textContent = "0";
        if (numpadStatus) { numpadStatus.className = "text-xs text-slate-400 text-center"; numpadStatus.textContent = "Input cleared"; }
      } else if (val === "DEL") {
        numpadDisplay.textContent = numpadDisplay.textContent.length > 1 ? numpadDisplay.textContent.slice(0, -1) : "0";
      } else if (val === "SUBMIT") {
        if (numpadStatus) {
          if (numpadDisplay.textContent === "2026") {
            numpadStatus.className = "text-xs text-emerald-400 font-semibold text-center";
            numpadStatus.textContent = "Verified AC · Instant deterministic answer match!";
          } else {
            numpadStatus.className = "text-xs text-amber-300 text-center";
            numpadStatus.textContent = "Incorrect integer · Routed to Second-Chance Overtime Loop";
          }
        }
      } else {
        numpadDisplay.textContent = numpadDisplay.textContent === "0" ? val : (numpadDisplay.textContent + val).slice(0, 10);
      }
    });
  });

  const flawBtns = document.querySelectorAll("[data-flaw-option]");
  const flawResult = document.getElementById("flaw-audit-result");
  if (flawBtns.length && flawResult) {
    flawBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const verdict = btn.getAttribute("data-flaw-option");
        flawBtns.forEach((b) => b.classList.remove("border-cyan-400", "bg-cyan-400/10"));
        btn.classList.add("border-cyan-400", "bg-cyan-400/10");
        flawResult.replaceChildren();
        const box = document.createElement("div");
        const strong = document.createElement("strong");
        if (verdict === "valid-gap") {
          box.className = "p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/40 text-sm text-emerald-200";
          strong.textContent = "Opponent Proof Flaw Verified (+5 to +50 pts): ";
          box.append(strong, document.createTextNode("Division by (a − b) fails when p | (a − b). Opponent submission loses credit for unhandled boundary case; auditor earns bonus ELO points."));
        } else if (verdict === "problem-flaw") {
          box.className = "p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-sm text-cyan-200";
          strong.textContent = "Official Problem Flaw Confirmed (+25 to +100 pts): ";
          box.append(strong, document.createTextNode("Counterexample p = 2, a = 3, b = 1 satisfies 2 | (9 − 1). Triggers automatic 2-minute SymPy Global Rejudge across all standings."));
        } else {
          box.className = "p-4 rounded-xl bg-rose-500/10 border border-rose-400/40 text-sm text-rose-200";
          strong.textContent = "Unsuccessful Hack (−10 pts): ";
          box.append(strong, document.createTextNode("Claimed step follows directly from Fermat’s Little Theorem when p ∤ a. Anti-spam −10 point deduction applied."));
        }
        flawResult.appendChild(box);
      });
    });
  }
}

/* 16. 3-Mode Dynamic Contest Footer Credits (why-arithmo.html & contests.html) */
function initDynamicCreditsPreview() {
  document.querySelectorAll("[data-credits-root]").forEach((root) => {
    if (root.dataset.aeBound === "1") return;
    root.dataset.aeBound = "1";
    const tabs = root.querySelectorAll("[data-credits-tab]");
    const panels = root.querySelectorAll("[data-credits-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const mode = tab.getAttribute("data-credits-tab") || "human";
        tabs.forEach((b) => {
          const act = b === tab;
          b.className = `px-3.5 py-2 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${act ? "bg-cyan-400 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`;
        });
        panels.forEach((p) => p.classList.toggle("hidden", p.getAttribute("data-credits-panel") !== mode));
      });
    });
  });
}

/* 17. 42-Engine AI Explorer, Zero-Copy Genome, Soft-Pinch & Token Meter (ai-core.html) */
function initAiExplorer() {
  const filterBtns = document.querySelectorAll("[data-ai-filter]");
  const cards = document.querySelectorAll("[data-ai-group]");
  if (filterBtns.length && cards.length) {
    filterBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const group = btn.getAttribute("data-ai-filter");
        filterBtns.forEach((b) => {
          const act = b === btn;
          b.classList.toggle("bg-cyan-400", act);
          b.classList.toggle("text-slate-950", act);
          b.classList.toggle("font-semibold", act);
          b.classList.toggle("text-slate-300", !act);
        });
        cards.forEach((c) => c.classList.toggle("hidden", group !== "all" && c.getAttribute("data-ai-group") !== group));
      });
    });
  }

  const genomeBtns = document.querySelectorAll("[data-genome-btn]");
  if (genomeBtns.length) {
    const GENOME = {
      BdMO: { fullName: "Bangladesh Mathematical Olympiad Corpus", nodes: ["Parity Invariant → Modular Descent (mod 4 / mod 8)", "Symmetric Diophantine Bounding", "Pigeonhole Remainder Splitting"], output: "Synthesizes fresh integer sequences with isomorphic p-adic structure and brand-new domain stories.", note: "Zero verbatim problem strings stored or reproduced — abstract logic skeleton only." },
      IMO: { fullName: "International Mathematical Olympiad Shortlist/Archive", nodes: ["Vieta Jumping Root Flip", "Semi-Perimeter Homothety Composition", "Turán Graph Extremal Coloring"], output: "Distills multi-lemma transitions into original Segment 3 & 4 Grandmaster challenges vetted by SymPy.", note: "PlagioGuard enforces <25% lexical overlap (>75% similarity blocked pre-publication)." },
      APMO: { fullName: "Asian Pacific Mathematical Olympiad", nodes: ["Cyclic Root of Unity Filtering", "Weighted Cauchy-Schwarz Substitution", "Grid Tiling Monovariant"], output: "Emits parameterized Olympiad warm-up variants tuned across 1600–2400 ELO calibration curves.", note: "Pure structural graph extraction — zero copy of original APMO wording or diagrams." },
      Putnam: { fullName: "William Lowell Putnam Mathematical Competition", nodes: ["Polynomial Interpolant Finite Differences", "Matrix Trace Spectrum Identity", "Generating Function Convolution"], output: "Constructs clean discrete/algebraic synthesis problems free from tedious calculus traps.", note: "Theorem graph distillation preserves deductive symmetry while purging copyrighted phrasing." },
      RMM: { fullName: "Romanian Master of Mathematics", nodes: ["Projective Cross-Ratio Harmonics", "Extremal Minimal Counterexample Loop", "Ultrafilter / Prime Density Bound"], output: "Powers Vanguard (2700–2999) and Apex (3000+) Shadow Bot benchmark calibrations.", note: "Clean structural representation checked deterministically by Python/SymPy sandboxes." },
      BMO: { fullName: "Balkan & British Mathematical Olympiad", nodes: ["Radical Axis Coaxality Chain", "Dirichlet Box Congruence Reduction", "Functional Equation Injectivity Split"], output: "Feeds Secondary & Higher Secondary Warm-Up Championship practice sets with Socratic step trees.", note: "Zero-Copy Mathematical Genome guarantees 100% original Arithmo-Edge intellectual property." },
    };
    const titleEl = document.querySelector("[data-genome-title]");
    const fullEl = document.querySelector("[data-genome-fullname]");
    const nodesList = document.querySelector("[data-genome-nodes]");
    const outEl = document.querySelector("[data-genome-output]");
    const noteEl = document.querySelector("[data-genome-note]");
    genomeBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-genome-btn") || "BdMO";
        const g = GENOME[k] || GENOME.BdMO;
        genomeBtns.forEach((b) => {
          const act = b === btn;
          b.className = `px-4 py-2 rounded-lg border text-xs font-mono-tabular whitespace-nowrap shrink-0 transition-colors ${
            act ? "border-emerald-400 bg-emerald-500/15 text-white font-semibold" : "border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white"
          }`;
        });
        if (titleEl) titleEl.textContent = `Extracted Abstract Theorem Graph (${k})`;
        if (fullEl) fullEl.textContent = g.fullName;
        if (outEl) outEl.textContent = g.output;
        if (noteEl) noteEl.textContent = g.note;
        if (nodesList) {
          nodesList.replaceChildren();
          g.nodes.forEach((n) => {
            const li = document.createElement("li");
            li.className = "rounded-lg border border-slate-800 bg-slate-900/75 px-3 py-2 text-xs text-slate-200 flex items-center gap-2";
            const dot = document.createElement("span");
            dot.className = "w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0";
            li.append(dot, document.createTextNode(n));
            nodesList.appendChild(li);
          });
        }
      });
    });
  }

  const pinchBtns = document.querySelectorAll("[data-pinch-signal]");
  const pinchJson = document.getElementById("soft-pinch-json");
  const pinchMsg = document.getElementById("soft-pinch-msg");
  if (pinchBtns.length && pinchJson && pinchMsg) {
    const CASES = {
      gaze: { json: '{"signal_id":"SP-409","cipher":"AES-256-GCM","source":"Module7_GazeGuard","duration_s":4.8,"flag_level":"ADVISORY_SOFT_PINCH"}', msg: 'Arithmo Personal AI Advisory: "Notice: Focus drifted off-canvas for 4.8s during your last practice trial. Keep scratchpad work centered to ensure smooth Sunday Mega verification."' },
      paste: { json: '{"signal_id":"SP-412","cipher":"AES-256-GCM","source":"MBTS_EntropyCheck","burst_chars":640,"flag_level":"ADVISORY_SOFT_PINCH"}', msg: 'Arithmo Personal AI Advisory: "Tip: Large external blocks were pasted quickly. Composing intermediate modular steps inside the Drag-and-Drop LaTeX Editor improves ProofGrader clarity and protects MBTS signature alignment."' },
      audio: { json: '{"signal_id":"SP-418","cipher":"AES-256-GCM","source":"Module7_AudioTrap","voices_detected":2,"flag_level":"ADVISORY_SOFT_PINCH"}', msg: 'Arithmo Personal AI Advisory: "Room Notice: Ambient secondary speech was detected by the 3-Axis Audio Trap. Remember Sunday Mega Arena requires a silent solo environment."' },
    };
    pinchBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-pinch-signal") || "gaze";
        pinchBtns.forEach((b) => b.classList.remove("border-cyan-400", "bg-cyan-400/10"));
        btn.classList.add("border-cyan-400", "bg-cyan-400/10");
        pinchJson.textContent = CASES[k].json;
        pinchMsg.textContent = CASES[k].msg;
      });
    });
  }

  const meterButtons = document.querySelectorAll("[data-token-scenario]");
  const meterCost = document.getElementById("token-meter-cost");
  const meterExplain = document.getElementById("token-meter-explain");
  const multiQueryInput = document.getElementById("token-multi-n");
  const multiValEl = document.querySelector("[data-token-multi-val]");
  if (meterButtons.length && meterCost && meterExplain) {
    let activeScenario = "duplicate";
    const syncMeter = () => {
      const nVal = Math.max(2, Math.min(8, Number(multiQueryInput?.value || 3)));
      if (multiValEl) multiValEl.textContent = String(nVal);
      if (activeScenario === "greeting") {
        meterCost.textContent = "0 Tokens";
        meterExplain.textContent = 'Zero-rated social politeness ("hello", "thank you", "got it") consumes zero student tokens.';
      } else if (activeScenario === "duplicate") {
        meterCost.textContent = "-1 Token";
        meterExplain.textContent = "Duplicate or repeated clarification of the same problem deducts a fixed -1 token.";
      } else if (activeScenario === "multi") {
        meterCost.textContent = `-${nVal} Tokens`;
        meterExplain.textContent = `Bundled multi-problem request across ${nVal} sub-problems deducts ${nVal} token(s) linearly.`;
      } else if (activeScenario === "premium") {
        meterCost.textContent = "-2 Tokens (2x Hybrid)";
        meterExplain.textContent = "Deep Gemini Pro + Qwen-Math + SymPy verification pipeline deducts a transparent 2x token weight.";
      }
    };
    meterButtons.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        activeScenario = btn.getAttribute("data-token-scenario") || "duplicate";
        meterButtons.forEach((b) => b.classList.remove("border-cyan-400", "bg-cyan-400/10"));
        btn.classList.add("border-cyan-400", "bg-cyan-400/10");
        syncMeter();
      });
    });
    if (multiQueryInput && multiQueryInput.dataset.aeBound !== "1") {
      multiQueryInput.dataset.aeBound = "1";
      multiQueryInput.addEventListener("input", () => {
        activeScenario = "multi";
        meterButtons.forEach((b) => b.classList.toggle("border-cyan-400", b.getAttribute("data-token-scenario") === "multi"));
        meterButtons.forEach((b) => b.classList.toggle("bg-cyan-400/10", b.getAttribute("data-token-scenario") === "multi"));
        syncMeter();
      });
    }
    syncMeter();
    registerSync(syncMeter);
  }
}

/* 18. QPRT-4, Lockdown & Module 7 Proctoring Simulator (security-qprt4.html) */
function initSecuritySim() {
  const phaseBtns = document.querySelectorAll("[data-qprt-phase]");
  const phasePanels = document.querySelectorAll("[data-qprt-panel]");
  phaseBtns.forEach((btn) => {
    if (btn.dataset.aeBound === "1") return;
    btn.dataset.aeBound = "1";
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-qprt-phase");
      phaseBtns.forEach((b) => {
        const act = b === btn;
        b.classList.toggle("bg-cyan-400", act);
        b.classList.toggle("text-slate-950", act);
        b.classList.toggle("font-semibold", act);
        b.classList.toggle("text-slate-300", !act);
      });
      phasePanels.forEach((p) => p.classList.toggle("hidden", p.getAttribute("data-qprt-panel") !== target));
    });
  });

  const lockBtns = document.querySelectorAll("[data-lock-vector]");
  if (lockBtns.length) {
    const VECTORS = {
      newtab: { label: "Open New Tab", severity: "Flag +1 · Auto-Log", event: "Window blur + window.open / hotkey intercept detected inside Full-Screen Lockdown", consequence: "Tab spawn blocked; repeat breach triggers auto-submit of active proof buffer.", escalation: "Immediate Violation Warning + MBTS Flag #1 Logged" },
      appswitch: { label: "Switch Tab / External App", severity: "Auto-Submit Threshold", event: "visibilitychange / focus-loss duration > 1.2s during active rated contest", consequence: "Cumulative switches auto-terminate round session & submit current snapshot.", escalation: "Immediate Integrity Flag Escalation to ChronoVault" },
      split: { label: "Split-Screen / Resize", severity: "Canvas Obscured", event: "Viewport geometry drop below full-screen aspect threshold (split-screen resize)", consequence: "Problem text obscures cleanly until full-screen lock is restored or match terminates.", escalation: "Canvas Paused + Mandatory Full-Screen Re-Lock Prompt" },
      clipboard: { label: "External Copy-Paste", severity: "Paste Blocked", event: "Non-session clipboard paste / copy-exfil attempt on problem statement", consequence: "External LaTeX paste blocked; problem statements cannot be copied to external LLMs.", escalation: "Clipboard Sanitized + Entropy Flag Recorded" },
      devtools: { label: "DevTools Inspect", severity: "Immediate DQ", event: "F12 / Ctrl+Shift+I / viewport debugger timing anomaly triggered", consequence: "Instant session lock, rating nullification (-5 ELO), and 11-Flag Blackhole strike.", escalation: "Immediate Disqualification Protocol (Flagged Round)" },
    };
    const lblEl = document.querySelector("[data-lock-label]");
    const sevEl = document.querySelector("[data-lock-severity]");
    const evtEl = document.querySelector("[data-lock-event]");
    const conEl = document.querySelector("[data-lock-consequence]");
    const stkEl = document.querySelector("[data-lock-strike]");
    const escEl = document.querySelector("[data-lock-escalation]");
    let strikes = 1;
    lockBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-lock-vector") || "appswitch";
        const v = VECTORS[k] || VECTORS.appswitch;
        strikes = strikes >= 3 ? 1 : strikes + 1;
        lockBtns.forEach((b) => {
          const act = b === btn;
          b.className = `px-3.5 py-2 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
            act ? "border-rose-400 bg-rose-500/15 text-white font-semibold" : "border-slate-800 bg-slate-950/70 text-slate-300 hover:text-white"
          }`;
        });
        if (lblEl) lblEl.textContent = `Intercepted Breach Vector: ${v.label}`;
        if (sevEl) sevEl.textContent = v.severity;
        if (evtEl) evtEl.textContent = v.event;
        if (conEl) conEl.textContent = v.consequence;
        if (stkEl) stkEl.textContent = `Live Escalation Telemetry · Simulated Strike ${strikes}/3`;
        if (escEl) escEl.textContent = v.escalation;
      });
    });
  }

  const roundSelect = document.getElementById("module7-round-type");
  const m7Mega = document.querySelector("[data-m7-mega]");
  const m7Daily = document.querySelector("[data-m7-daily]");
  if (roundSelect && roundSelect.dataset.aeBound !== "1") {
    roundSelect.dataset.aeBound = "1";
    const syncM7 = () => {
      const isMega = roundSelect.value === "mega";
      if (m7Mega) m7Mega.classList.toggle("hidden", !isMega);
      if (m7Daily) m7Daily.classList.toggle("hidden", isMega);
    };
    roundSelect.addEventListener("change", syncM7);
    syncM7();
    registerSync(syncM7);
  }
}

/* 19. Academy Roster Calculator, Founding 25% Discount & Dual-Handle Switcher (academies.html) */
function initAcademyCalculator() {
  const tierSelect = document.getElementById("acad-tier-select");
  const membersSlider = document.getElementById("acad-members-slider");
  const foundingCheck = document.getElementById("acad-founding-check");
  const membersVal = document.getElementById("acad-members-val");
  const baseOut = document.getElementById("acad-base-fee");
  const dueOut = document.getElementById("acad-member-due");
  const totalLabel = document.getElementById("acad-total-label");
  const totalOut = document.getElementById("acad-monthly-total");
  const strikeOut = document.getElementById("acad-raw-strike");
  const tokensOut = document.getElementById("acad-guild-tokens");
  const rolesOut = document.getElementById("acad-roles-cap");
  const perksOut = document.getElementById("acad-addons-summary");

  if (tierSelect && membersSlider && tierSelect.dataset.aeBound !== "1") {
    tierSelect.dataset.aeBound = "1";
    const TIERS = {
      general: { base: 29.99, max: 100, due: 0.99, admins: "1–5 Admins", tokens: 20, perks: "Standard Institutional Dashboard · Inter-Academy Clash & Edu Lab Paid Add-ons" },
      premium: { base: 49.99, max: 500, due: 2.99, admins: "1–5 Admins", tokens: 80, perks: "Batch Radar Included · Inter-Academy Clash ($4.99) & Virtual Edu Lab ($2.99/24h)" },
      supreme: { base: 79.99, max: 1000, due: 6.99, admins: "1–5 Admins", tokens: 200, perks: "ALL Institutional Add-ons FREE (Clash, Guidebook $14.99/mo, Edu Lab, On-Demand Contests)" },
      enterprise: { base: 79.99, max: 2000, due: 5.99, admins: "1–10 Admins", tokens: 200, perks: "Unlimited Roster Scaling · $5.99/member (<1,000) / $7.99/member (>1,000) · +15 Guild AI Tokens per 50 extra members · All Supreme Perks Free" },
    };
    const calc = () => {
      const key = tierSelect.value;
      const t = TIERS[key] || TIERS.general;
      let members = Number(membersSlider.value || 100);
      if (members > t.max && key !== "enterprise") {
        members = t.max;
        membersSlider.value = String(t.max);
      }
      membersSlider.max = key === "enterprise" ? "2000" : String(t.max);
      if (membersVal) membersVal.textContent = `${members.toLocaleString()} Members`;

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
      const rawTotal = t.base + memberFeeSum;
      const founding = foundingCheck ? foundingCheck.checked : true;
      const finalTotal = founding ? rawTotal * 0.75 : rawTotal;

      if (baseOut) baseOut.textContent = key === "enterprise" ? "$149.99 1st mo / $79.99 base" : `$${t.base.toFixed(2)}/mo`;
      if (dueOut) dueOut.textContent = key === "enterprise" ? "$5.99 (<1k) / $7.99 (>1k)" : `$${t.due.toFixed(2)}/member`;
      if (totalLabel) totalLabel.textContent = founding ? "Founding 25% OFF Invoice (Mo 1–3)" : "Standard Institutional Monthly Invoice";
      if (totalOut) totalOut.textContent = `$${finalTotal.toFixed(2)}/mo`;
      if (strikeOut) {
        strikeOut.classList.toggle("hidden", !founding);
        strikeOut.textContent = `Standard: $${rawTotal.toFixed(2)}/mo`;
      }
      if (tokensOut) tokensOut.textContent = `${tokens} Guild AI Messages/mo`;
      if (rolesOut) rolesOut.textContent = `${t.admins} (100% Fee Waived) · 1–15 Mentors`;
      if (perksOut) perksOut.textContent = t.perks;
    };
    tierSelect.addEventListener("change", calc);
    membersSlider.addEventListener("input", calc);
    foundingCheck?.addEventListener("change", calc);
    calc();
    registerSync(calc);
  }

  const ctxBtns = document.querySelectorAll("[data-acad-ctx]");
  if (ctxBtns.length) {
    const handleOut = document.querySelector("[data-acad-ctx-handle]");
    const titleOut = document.querySelector("[data-acad-ctx-title]");
    const descOut = document.querySelector("[data-acad-ctx-desc]");
    ctxBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-acad-ctx") || "academy";
        ctxBtns.forEach((b) => {
          const k = b.getAttribute("data-acad-ctx");
          const act = k === mode;
          b.className = `px-4 py-2 rounded-lg border text-xs font-mono-tabular whitespace-nowrap ${
            act
              ? k === "personal" ? "border-cyan-400 bg-cyan-400/15 text-white font-semibold" : "border-violet-400 bg-violet-400/15 text-white font-semibold"
              : "border-slate-800 bg-slate-950 text-slate-400"
          }`;
        });
        if (handleOut) handleOut.textContent = mode === "personal" ? "@student" : "@student-dhakamath";
        if (titleOut) titleOut.textContent = mode === "personal" ? "Personal Individual Rated Scope" : "Academy Institutional Isolated Scope";
        if (descOut) {
          descOut.textContent = mode === "personal"
            ? "Routes Global Contests, 1v1 Bullet Blitz, Personal Arithmo Wallet, and Public Standings Ranks directly to personal identity."
            : "Routes Task homework assignments, Batch Radar quizzes, Guild AI chats, and Internal Academy Drills without altering personal ELO.";
        }
      });
    });
  }

  const kybBtn = document.querySelector("[data-acad-kyb-toggle]");
  const kybPanel = document.querySelector("[data-acad-kyb-panel]");
  const kybLbl = document.querySelector("[data-acad-kyb-label]");
  if (kybBtn && kybPanel && kybBtn.dataset.aeBound !== "1") {
    kybBtn.dataset.aeBound = "1";
    kybBtn.addEventListener("click", () => {
      const willOpen = kybPanel.classList.contains("hidden");
      kybPanel.classList.toggle("hidden", !willOpen);
      if (kybLbl) kybLbl.textContent = willOpen ? "Close Pop-Up KYB Modal" : "Preview Pop-Up KYB Modal";
    });
  }
}

/* 20. Live Arithmo Wallet Checkout Simulator & +10% Top-Up Calculator (pricing.html) */
function initWalletSim() {
  const sim = document.querySelector("[data-wallet-sim]");
  if (sim && sim.dataset.aeBound !== "1") {
    sim.dataset.aeBound = "1";
    const balanceOut = sim.querySelector("[data-ws-balance]");
    const railBtns = sim.querySelectorAll("[data-ws-rail]");
    const amtBtns = sim.querySelectorAll("[data-ws-topup-amt]");
    const topupBtn = sim.querySelector("[data-ws-topup-btn]");
    const logOut = sim.querySelector("[data-ws-log]");
    const selectEl = document.getElementById("wallet-item-select");
    const proceedBtn = sim.querySelector("[data-ws-proceed]");
    const stages = sim.querySelectorAll("[data-ws-stage]");
    const reqPriceOut = sim.querySelector("[data-ws-req-price]");
    const availBalOut = sim.querySelector("[data-ws-avail-bal]");
    const selNameEls = sim.querySelectorAll("[data-ws-sel-name]");
    const selPerksOut = sim.querySelector("[data-ws-sel-perks]");
    const confirmBtn = sim.querySelector("[data-ws-confirm]");
    const graceSecOut = sim.querySelector("[data-ws-grace-sec]");
    const cancelGraceBtn = sim.querySelector("[data-ws-cancel-grace]");
    const finalizeNowBtn = sim.querySelector("[data-ws-finalize-now]");
    const browseNameOut = sim.querySelector("[data-ws-browse-name]");
    const browsePerksOut = sim.querySelector("[data-ws-browse-perks]");

    let walletBalance = 1.5;
    let selectedTopupAmt = 10;
    let rail = "lemonsqueezy";
    let stage = "browse";
    let graceSeconds = 60;
    let graceTimer = null;
    let statusLog = "Wallet starts at $1.50 so you can test Insufficient Balance or +10% Top-Ups.";

    const stopGrace = () => { if (graceTimer !== null) { window.clearInterval(graceTimer); graceTimer = null; } };
    registerCleanup(stopGrace);

    const getItem = () => CHECKOUT_ITEMS.find((i) => i.id === (selectEl?.value || "pro-monthly")) || CHECKOUT_ITEMS[1];

    const renderWs = () => {
      const item = getItem();
      if (balanceOut) balanceOut.textContent = formatMoney(walletBalance);
      railBtns.forEach((b) => {
        const r = b.getAttribute("data-ws-rail");
        const act = r === rail;
        b.className = `px-3 py-2 rounded-lg border text-xs sm:whitespace-nowrap ${
          act ? (r === "bkash" ? "border-rose-400 bg-rose-500/15 text-white font-semibold" : "border-cyan-400 bg-cyan-400/15 text-white font-semibold") : "border-slate-800 bg-slate-900/60 text-slate-400"
        }`;
      });
      amtBtns.forEach((b) => {
        const act = Number(b.getAttribute("data-ws-topup-amt")) === selectedTopupAmt;
        b.className = `py-2 rounded-lg border font-mono-tabular text-xs transition-colors ${act ? "border-emerald-400 bg-emerald-400/15 text-white font-semibold" : "border-slate-800 bg-slate-900/60 text-slate-300"}`;
      });
      if (topupBtn) topupBtn.textContent = `Load ${formatMoney(selectedTopupAmt)} + ${formatMoney(selectedTopupAmt * 0.1)} Bonus into Wallet`;
      if (logOut) logOut.textContent = statusLog;
      if (proceedBtn) proceedBtn.textContent = `Proceed to Wallet Checkout (${formatMoney(item.price)})`;
      if (confirmBtn) confirmBtn.textContent = `Confirm Final Order (${formatMoney(item.price)})`;
      if (reqPriceOut) reqPriceOut.textContent = formatMoney(item.price);
      if (availBalOut) availBalOut.textContent = formatMoney(walletBalance);
      if (graceSecOut) graceSecOut.textContent = `${graceSeconds}s`;
      selNameEls.forEach((el) => { el.textContent = item.name; });
      if (selPerksOut) {
        selPerksOut.replaceChildren();
        item.perks.forEach((pk) => {
          const li = document.createElement("li");
          li.textContent = `· ${pk}`;
          selPerksOut.appendChild(li);
        });
      }
      if (browseNameOut) browseNameOut.textContent = item.name;
      if (browsePerksOut) browsePerksOut.textContent = item.perks.join(" · ");
      stages.forEach((s) => s.classList.toggle("hidden", s.getAttribute("data-ws-stage") !== stage));
    };

    railBtns.forEach((b) => b.addEventListener("click", () => { rail = b.getAttribute("data-ws-rail") || "lemonsqueezy"; renderWs(); }));
    amtBtns.forEach((b) => b.addEventListener("click", () => { selectedTopupAmt = Number(b.getAttribute("data-ws-topup-amt") || 10); renderWs(); }));
    topupBtn?.addEventListener("click", () => {
      const bonus = Number((selectedTopupAmt * 0.1).toFixed(2));
      const credited = Number((selectedTopupAmt + bonus).toFixed(2));
      walletBalance = Number((walletBalance + credited).toFixed(2));
      statusLog = `Loaded ${formatMoney(selectedTopupAmt)} + ${formatMoney(bonus)} (+10% Bonus) = ${formatMoney(credited)} via ${rail === "lemonsqueezy" ? "Lemon Squeezy (Global MoR)" : "bKash / Nagad (Local BD Rail)"}.`;
      if (stage === "insufficient") stage = "browse";
      renderWs();
    });
    selectEl?.addEventListener("change", () => { stopGrace(); stage = "browse"; renderWs(); });
    proceedBtn?.addEventListener("click", () => {
      const item = getItem();
      stage = walletBalance < item.price ? "insufficient" : "checkout";
      renderWs();
    });
    confirmBtn?.addEventListener("click", () => {
      stopGrace();
      graceSeconds = 60;
      stage = "grace";
      renderWs();
      graceTimer = window.setInterval(() => {
        if (graceSeconds <= 1) {
          stopGrace();
          const item = getItem();
          walletBalance = Number(Math.max(0, walletBalance - item.price).toFixed(2));
          graceSeconds = 0;
          stage = "provisioned";
          statusLog = `Order finalized after 60s grace window. ${formatMoney(item.price)} deducted from Arithmo Wallet.`;
          renderWs();
          return;
        }
        graceSeconds -= 1;
        renderWs();
      }, 1000);
    });
    cancelGraceBtn?.addEventListener("click", () => {
      stopGrace();
      stage = "cancelled";
      statusLog = `Cancelled cleanly inside 60s grace window. $0.00 deducted — Wallet stays ${formatMoney(walletBalance)}.`;
      renderWs();
    });
    finalizeNowBtn?.addEventListener("click", () => {
      stopGrace();
      const item = getItem();
      walletBalance = Number(Math.max(0, walletBalance - item.price).toFixed(2));
      graceSeconds = 0;
      stage = "provisioned";
      statusLog = `Order finalized immediately. ${formatMoney(item.price)} deducted from Arithmo Wallet.`;
      renderWs();
    });

    renderWs();
    registerSync(renderWs);
  }

  const btns = document.querySelectorAll("[data-wallet-topup]");
  const amtOut = document.getElementById("wallet-selected-amount");
  const bonusOut = document.getElementById("wallet-bonus-amount");
  const totalOut = document.getElementById("wallet-total-credit");
  if (btns.length && amtOut && amtOut.dataset.aeBound !== "1") {
    amtOut.dataset.aeBound = "1";
    const selectAmount = (amount) => {
      const bonus = Number((amount * 0.1).toFixed(2));
      const total = Number((amount + bonus).toFixed(2));
      amtOut.textContent = formatMoney(amount);
      if (bonusOut) bonusOut.textContent = `+${formatMoney(bonus)} (+10% Bonus)`;
      if (totalOut) totalOut.textContent = `${formatMoney(total)} Credits`;
    };
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => {
          const act = b === btn;
          b.classList.toggle("border-cyan-400", act);
          b.classList.toggle("bg-cyan-400/15", act);
          b.classList.toggle("text-white", act);
          b.classList.toggle("font-semibold", act);
          b.classList.toggle("border-slate-700", !act);
          b.classList.toggle("bg-slate-950/70", !act);
          b.classList.toggle("text-slate-300", !act);
        });
        selectAmount(Number(btn.getAttribute("data-wallet-topup") || 25));
      });
    });
    selectAmount(25);
  }
}

/* 21. Golden Vault 5x4 & Schema v1.2 Explorer (socials-forge.html & pioneers.html) */
function initGoldenVault() {
  document.querySelectorAll("[data-vault-root]").forEach((root) => {
    if (root.dataset.aeBound === "1") return;
    root.dataset.aeBound = "1";
    const btns = root.querySelectorAll("[data-vault-arena]");
    const pathOut = root.querySelector("[data-vault-path]") || document.getElementById("vault-json-path");
    const sampleOut = root.querySelector("[data-vault-sample]") || document.getElementById("vault-json-sample");
    if (!btns.length || !pathOut) return;
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-vault-arena") || "nt";
        const d = GOLDEN_VAULT_SAMPLES[k] || GOLDEN_VAULT_SAMPLES.nt;
        btns.forEach((b) => {
          const act = b === btn;
          b.classList.toggle("border-cyan-400", act);
          b.classList.toggle("bg-cyan-400/10", act);
        });
        pathOut.textContent = d.path;
        if (sampleOut) sampleOut.textContent = d.json;
      });
    });
  });
}

/* 22. Socials & Forge Contribution ELO Estimator (socials-forge.html) */
function initSocialsForge() {
  const blogsSlider = document.getElementById("contrib-blogs");
  const notesSlider = document.getElementById("contrib-notes");
  if (!blogsSlider || !notesSlider || blogsSlider.dataset.aeBound === "1") return;
  blogsSlider.dataset.aeBound = "1";

  const blogsVal = document.getElementById("contrib-blogs-val");
  const notesVal = document.getElementById("contrib-notes-val");
  const totalOut = document.getElementById("contrib-total-elo");
  const milestoneOut = document.getElementById("contrib-milestone");

  const syncContrib = () => {
    const blogs = Number(blogsSlider.value || 4);
    const notes = Number(notesSlider.value || 6);
    const total = blogs * 5 + notes * 2;
    if (blogsVal) blogsVal.textContent = String(blogs);
    if (notesVal) notesVal.textContent = String(notes);
    if (totalOut) totalOut.textContent = `+${total} Contribution ELO`;
    if (milestoneOut) {
      milestoneOut.textContent =
        total >= 500 ? "Unlocked +500 Milestone Bonus Tier" :
        total >= 250 ? "Unlocked +250 Milestone Bonus Tier" :
        total >= 100 ? "Unlocked +100 Milestone Bonus Tier" :
        total >= 50 ? "Unlocked +50 Milestone Bonus Tier" :
        `${50 - total} Contribution ELO until first +50 Wallet Reward`;
    }
  };
  blogsSlider.addEventListener("input", syncContrib);
  notesSlider.addEventListener("input", syncContrib);
  syncContrib();
  registerSync(syncContrib);
}

/* 23. Governance: 5-Tier HQ Ladder, 3-Gate Induction, Conflict Recusal, Council & Patrons (governance.html) */
function initHqLadder() {
  const btns = document.querySelectorAll("[data-hq-tier]");
  const titleOut = document.getElementById("hq-inspect-title");
  if (!btns.length || !titleOut) return;

  const eloOut = document.getElementById("hq-inspect-elo");
  const perksOut = document.getElementById("hq-inspect-perks");
  const dutiesOut = document.getElementById("hq-inspect-duties");
  const grantOut = document.querySelector("[data-hq-grant]");
  const scopeOut = document.querySelector("[data-hq-scope]");

  const TIERS = {
    sentinel: { title: "Core Sentinel", elo: "100+ HQ ELO", grant: "Free Plus ($2.99/mo value)", scope: "Live problemset QA & queue triage", perks: "Free Plus Subscription Perks ($2.99/mo value) + Full Rated Public Competing (Conflict-Free Rounds Only)", duties: "Entry Headquarters stewardship, problem testing verification, and live round queue triage." },
    architect: { title: "Problem Architect", elo: "300+ HQ ELO", grant: "Free Pro ($5.99/mo value)", scope: "Forge problem audit & SymPy validation", perks: "Free Pro Subscription Perks ($5.99/mo value) + Full Rated Public Competing (Conflict-Free Rounds Only)", duties: "Audits Forge submissions, enforces >75% AoPS similarity blocks, and validates SymPyVeritas checks." },
    coordinator: { title: "Round Coordinator", elo: "500+ HQ ELO", grant: "Free Pro+ Priority Suite", scope: "Live contest ops & reserve hot-swap", perks: "Free Pro+ Perks + Priority Coordination Tools + Rated Public Competing (Conflict-Free Rounds Only)", duties: "Operates T-30s Pre-Match Contract Page, handles live clarifications, and authorizes 30s reserve hot-swaps." },
    arbiter: { title: "Chief Arbiter", elo: "750+ HQ ELO", grant: "Free Singularity ($12.99/mo) + HQ AI", scope: "4-Step Forensic Appeals & Supreme HQ AI", perks: "Free Singularity Subscription Perks ($12.99/mo value) + Headquarters AI Access + Rated Public Competing", duties: "Chairs 4-Step Forensic Appeals, conducts 5-min Live Skill Audits, and queries Supreme Headquarters AI." },
    sovereign: { title: "Prime Sovereign", elo: "1000+ HQ ELO (Top 3 · Flag-Immune)", grant: "100% Unlimited All Plans & Packs + HQ AI", scope: "Constitutional quorum & induction certification", perks: "100% UNLIMITED Free Access to ALL Paid & Pay-As-You-Go Features + Supreme Headquarters AI", duties: "Final constitutional governance, Prime Sovereign Certificate endorsements, and Strict Positional Chronology oversight." },
  };

  btns.forEach((btn) => {
    if (btn.dataset.aeBound === "1") return;
    btn.dataset.aeBound = "1";
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-hq-tier") || "sentinel";
      const d = TIERS[k] || TIERS.sentinel;
      btns.forEach((b) => {
        const act = b === btn;
        b.classList.toggle("border-cyan-400", act);
        b.classList.toggle("bg-cyan-400/10", act);
        b.classList.toggle("hover:border-slate-600", !act);
      });
      titleOut.textContent = d.title;
      if (eloOut) eloOut.textContent = d.elo;
      if (grantOut) grantOut.textContent = d.grant;
      if (scopeOut) scopeOut.textContent = d.scope;
      if (perksOut) perksOut.textContent = d.perks;
      if (dutiesOut) dutiesOut.textContent = d.duties;
    });
  });
}

function initGovernanceExtras() {
  const contribSlider = document.getElementById("hq-contrib-elo");
  const streakSlider = document.getElementById("hq-clean-streak");
  const certCheck = document.getElementById("hq-cert-signed");
  const consentCheck = document.getElementById("hq-user-consent");
  const prodigyCheck = document.getElementById("hq-direct-prodigy");
  if (contribSlider && streakSlider && contribSlider.dataset.aeBound !== "1") {
    contribSlider.dataset.aeBound = "1";
    const contribVal = document.querySelector("[data-ind-contrib-val]");
    const streakVal = document.querySelector("[data-ind-streak-val]");
    const box = document.querySelector("[data-ind-box]");
    const statusLbl = document.querySelector("[data-ind-status-label]");
    const statusBadge = document.querySelector("[data-ind-status-badge]");
    const headlineEl = document.querySelector("[data-ind-headline]");
    const descEl = document.querySelector("[data-ind-desc]");

    const syncInd = () => {
      const c = Number(contribSlider.value || 240);
      const s = Number(streakSlider.value || 6);
      const cert = Boolean(certCheck?.checked);
      const consent = Boolean(consentCheck?.checked);
      const prodigy = Boolean(prodigyCheck?.checked);
      const standardOk = c >= 200 && s >= 6 && cert && consent;
      const approved = standardOk || (prodigy && cert && consent);

      if (contribVal) contribVal.textContent = `+${c} ELO`;
      if (streakVal) streakVal.textContent = `${s} / 6 Matches`;
      if (box) box.className = `rounded-2xl border p-5 space-y-3 ${approved ? "border-emerald-400/40 bg-emerald-500/10" : "border-rose-400/40 bg-rose-500/10"}`;
      if (statusLbl) statusLbl.className = approved ? "text-emerald-300" : "text-rose-300";
      if (statusBadge) statusBadge.textContent = approved ? "APPROVED FOR CORE SENTINEL (100 HQ ELO)" : "INDUCTION BLOCKED — MISSING GATE";
      if (headlineEl) headlineEl.textContent = standardOk ? "All 3 Standard Gates Satisfied" : prodigy && cert && consent ? "Direct Sovereign Induction Approved" : "Prerequisites Incomplete";
      if (descEl) {
        descEl.textContent = approved
          ? "Candidate enters at Core Sentinel (100+ HQ ELO), unlocks Free Plus perks, and retains full conflict-free public competing eligibility."
          : "Requires +200 Contribution ELO, 6 clean consecutive matches, signed Prime Sovereign Certificate, and Affirmative User Consent.";
      }
    };
    [contribSlider, streakSlider].forEach((el) => el.addEventListener("input", syncInd));
    [certCheck, consentCheck, prodigyCheck].forEach((el) => el?.addEventListener("change", syncInd));
    syncInd();
    registerSync(syncInd);
  }

  const conflictBtns = document.querySelectorAll("[data-conflict-btn]");
  if (conflictBtns.length) {
    const SCENARIOS = {
      "unrelated-mega": { round: "Sunday Mega Arena #48 (Golden Vault Curated)", involve: "No authoring, auditing, or test-solving touchpoint", ok: true, reason: "Conflict-free round: Under HQ Competitor Privilege, the HQ officer enters with full public rated ELO rights and QPRT-4 lockdown identical to any normal contestant." },
      "authored-warmup": { round: "BdMO Warm-Up Championship — Higher Secondary", involve: "Authored Question #3 via Arithmo Forge", ok: false, reason: "Automatic Contest Lockout triggered: Authoring any problem in the round seals rated registration and shifts the HQ member into Observer / Clarification Desk mode." },
      "tested-tuesday": { round: "Tuesday Algebra Expert Round (17:00 UTC)", involve: "Test-solved problem set at T-48h for SymPy difficulty calibration", ok: false, reason: "Automatic Contest Lockout triggered: Pre-contest test-solvers possess prior problem knowledge and are blocked from rated entry for that specific round." },
      "peer-audit": { round: "Thursday Combinatorics General + Expert", involve: "Audited Friday Mixed instead; zero access to Thursday vault", ok: true, reason: "Conflict-free round: Cloudflare Worker vault permissions isolate per-round access tokens, preserving full rated competing eligibility on Thursday." },
    };
    const rEl = document.querySelector("[data-conflict-round]");
    const iEl = document.querySelector("[data-conflict-involve]");
    const bEl = document.querySelector("[data-conflict-box]");
    const sEl = document.querySelector("[data-conflict-status]");
    const dEl = document.querySelector("[data-conflict-reason]");
    conflictBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-conflict-btn") || "unrelated-mega";
        const sc = SCENARIOS[k] || SCENARIOS["unrelated-mega"];
        conflictBtns.forEach((b) => {
          const act = b === btn;
          b.className = `px-3.5 py-2 rounded-xl border text-xs whitespace-nowrap shrink-0 transition-colors ${
            act ? "border-cyan-400 bg-cyan-400/10 text-white font-semibold" : "border-slate-800 bg-slate-950/70 text-slate-300 hover:text-white hover:border-slate-600"
          }`;
        });
        if (rEl) rEl.textContent = sc.round;
        if (iEl) iEl.textContent = sc.involve;
        if (bEl) bEl.className = `md:col-span-7 rounded-xl border p-5 flex flex-col justify-between gap-3 ${sc.ok ? "border-emerald-400/40 bg-emerald-500/10" : "border-rose-400/40 bg-rose-500/10"}`;
        if (sEl) {
          sEl.className = `font-mono-tabular text-xs font-bold uppercase ${sc.ok ? "text-emerald-300" : "text-rose-300"}`;
          sEl.textContent = sc.ok ? "RATED COMPETING PERMITTED (HQ COMPETITOR PRIVILEGE)" : "CONFLICT-OF-INTEREST LOCKOUT ENGAGED";
        }
        if (dEl) dEl.textContent = sc.reason;
      });
    });
  }

  const sovBtns = document.querySelectorAll("[data-sov-filter]");
  const sovRows = document.querySelectorAll("[data-sov-row]");
  if (sovBtns.length && sovRows.length) {
    sovBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const f = btn.getAttribute("data-sov-filter") || "all";
        sovBtns.forEach((b) => {
          const act = b === btn;
          b.className = `px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${act ? "bg-amber-400 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`;
        });
        sovRows.forEach((r) => r.classList.toggle("hidden", f !== "all" && r.getAttribute("data-kind") !== f));
      });
    });
  }

  const govPatrons = document.querySelectorAll("[data-gov-patron-btn]");
  if (govPatrons.length) {
    const PAT = {
      coffee: { amt: "$5", title: "Domain & DNS Steward", perk: "Name & @handle permanently inscribed on Wall of Patrons" },
      worker: { amt: "$15", title: "SymPy Sandbox Sponsor", perk: "Wall of Patrons inscription + transparent infrastructure ledger receipt" },
      fellow: { amt: "$50", title: "Olympiad Fellowship Patron", perk: "Featured Fellowship Patron entry (zero moderation or competitive authority)" },
    };
    const tOut = document.querySelector("[data-gov-patron-title]");
    const pOut = document.querySelector("[data-gov-patron-perk]");
    govPatrons.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-gov-patron-btn") || "coffee";
        const pt = PAT[k] || PAT.coffee;
        govPatrons.forEach((b) => {
          const act = b === btn;
          b.className = `text-left rounded-2xl border p-5 transition-all space-y-2 ${act ? "border-amber-400 bg-amber-400/10" : "border-slate-800 bg-slate-950/75 hover:border-slate-600"}`;
        });
        if (tOut) tOut.textContent = `Selected Ledger Allocation (${pt.amt} · ${pt.title})`;
        if (pOut) pOut.textContent = pt.perk;
      });
    });
  }
}

/* 24. Pioneers Page: True 3-Bar Equity & Reserve Architecture + Wall of Patrons (pioneers.html) */
function initPioneers() {
  const vestingSlider = document.getElementById("vesting-slider");
  if (vestingSlider && vestingSlider.dataset.aeBound !== "1") {
    vestingSlider.dataset.aeBound = "1";
    const monthEl = document.querySelector("[data-vesting-month]");
    const textR = document.querySelector("[data-vest-r]");
    const textS = document.querySelector("[data-vest-s]");
    const textJ = document.querySelector("[data-vest-j]");
    const barR = document.querySelector("[data-bar-r]");
    const barS = document.querySelector("[data-bar-s]");
    const barJ = document.querySelector("[data-bar-j]");

    const syncVesting = () => {
      const m = Math.max(0, Math.min(24, Number(vestingSlider.value || 12)));
      const rPct = (m / 24) * 40;
      const sPct = (m / 24) * 20;
      const jPct = (m / 24) * 40;
      if (monthEl) monthEl.textContent = `Month ${m} of 24`;
      if (textR) textR.textContent = `Personal · Rayaan: ${rPct.toFixed(1)}% / 40%`;
      if (textS) textS.textContent = `System Reserve: ${sPct.toFixed(1)}% / 20%`;
      if (textJ) textJ.textContent = `Personal · Jalees: ${jPct.toFixed(1)}% / 40%`;
      if (barR) barR.style.width = `${rPct}%`;
      if (barS) barS.style.width = `${sPct}%`;
      if (barJ) barJ.style.width = `${jPct}%`;
    };
    vestingSlider.addEventListener("input", syncVesting);
    vestingSlider.addEventListener("change", syncVesting);
    syncVesting();
    registerSync(syncVesting);
  }

  const patronBtns = document.querySelectorAll("[data-pion-patron]");
  if (patronBtns.length) {
    const PATRONS = {
      "coffee-5": { label: "$5 · Edge Compute Coffee", detail: "Covers ~400 stateless SymPy proof evaluations and helps keep Daily Mon–Sat rated rounds 100% Free Forever." },
      "domain-20": { label: "$20 · Custom .com & DNS Guardian", detail: "Funds domain renewal and Cloudflare Edge security certificate overhead ahead of our custom .com launch in 2 months." },
      "fellowship-50": { label: "$50 · Olympiad Student Archive Sponsor", detail: "Supports multi-month printable guidebook distribution and Subsite #13 historical Olympiad indexing for students worldwide." },
    };
    const labelEl = document.querySelector("[data-pion-patron-label]");
    const detailEl = document.querySelector("[data-pion-patron-detail]");
    const mailtoEl = document.querySelector("[data-pion-patron-mailto]");
    patronBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const k = btn.getAttribute("data-pion-patron") || "coffee-5";
        const pt = PATRONS[k] || PATRONS["coffee-5"];
        patronBtns.forEach((b) => {
          const act = b === btn;
          b.className = `text-left rounded-2xl border p-5 space-y-2 transition-all ${act ? "border-amber-400 bg-amber-400/10" : "border-slate-800 bg-slate-950/75 hover:border-slate-600"}`;
        });
        if (labelEl) labelEl.textContent = `Selected Support Impact: ${pt.label}`;
        if (detailEl) detailEl.textContent = pt.detail;
        if (mailtoEl) mailtoEl.href = `mailto:rayaantasnim@gmail.com?subject=${encodeURIComponent(`Arithmo-Edge Wall of Patrons Support (${pt.label})`)}`;
      });
    });
  }
}

/* 25. Why-Arithmo Page: Comparison Matrix, 12 Bot Tiers & Stakeholders (why-arithmo.html) */
function initWhyArithmo() {
  const catBtns = document.querySelectorAll("[data-matrix-cat]");
  const rows = Array.from(document.querySelectorAll("[data-matrix-row]"));
  if (catBtns.length && rows.length) {
    const dimOut = document.querySelector("[data-matrix-verdict-dim]");
    const titleOut = document.querySelector("[data-matrix-verdict-title]");
    const reasonOut = document.querySelector("[data-matrix-verdict-reason]");
    let activeRow = rows[0];

    const selectRow = (row) => {
      activeRow = row;
      rows.forEach((r) => {
        const act = r === row;
        r.className = `w-full text-left grid grid-cols-12 px-5 py-4 items-center gap-2 transition-colors ${act ? "bg-cyan-400/10" : "hover:bg-slate-900/60"}`;
      });
      if (dimOut) dimOut.textContent = `Selected Verdict · ${row.getAttribute("data-dim") || ""}`;
      if (titleOut) titleOut.textContent = row.getAttribute("data-arithmo") || "";
      if (reasonOut) reasonOut.textContent = row.getAttribute("data-reason") || "";
    };

    rows.forEach((r) => {
      if (r.dataset.aeBound === "1") return;
      r.dataset.aeBound = "1";
      r.addEventListener("click", () => selectRow(r));
    });

    catBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-matrix-cat") || "all";
        catBtns.forEach((b) => {
          const act = b === btn;
          b.className = `px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${act ? "bg-cyan-400 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`;
        });
        let firstVisible = null;
        rows.forEach((r) => {
          const ok = cat === "all" || r.getAttribute("data-cat") === cat;
          r.classList.toggle("hidden", !ok);
          if (ok && !firstVisible) firstVisible = r;
        });
        if (activeRow.classList.contains("hidden") && firstVisible) selectRow(firstVisible);
      });
    });
  }

  const botBtns = document.querySelectorAll("[data-why-bot]");
  if (botBtns.length) {
    const botCard = document.querySelector("[data-why-bot-card]");
    const botIcon = document.querySelector("[data-why-bot-icon]");
    const botName = document.querySelector("[data-why-bot-name]");
    const botTele = document.querySelector("[data-why-bot-tele]");
    const botStyle = document.querySelector("[data-why-bot-style]");
    botBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-why-bot") || "Vanguard";
        const elo = btn.getAttribute("data-bot-elo") || "2885";
        const tele = btn.getAttribute("data-bot-tele") || "";
        const style = btn.getAttribute("data-bot-style") || "";
        const accent = btn.getAttribute("data-bot-accent") || "#00F0FF";
        botBtns.forEach((b) => {
          const act = b === btn;
          b.className = `rounded-xl border px-3 py-2.5 text-left transition-colors ${act ? "border-cyan-400 bg-slate-800 text-white" : "border-slate-800 bg-slate-950/75 text-slate-400 hover:text-white hover:border-slate-600"}`;
          const head = b.firstElementChild;
          if (head) head.style.color = act ? accent : "";
        });
        if (botCard) botCard.style.borderColor = accent;
        if (botIcon) botIcon.style.color = accent;
        if (botName) botName.textContent = `${elo} · ${name} BOT`;
        if (botTele) botTele.textContent = tele;
        if (botStyle) botStyle.textContent = style;
      });
    });
  }

  const stBtns = document.querySelectorAll("[data-stakeholder-tab]");
  const stPanels = document.querySelectorAll("[data-stakeholder-panel]");
  if (stBtns.length && stPanels.length) {
    stBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-stakeholder-tab") || "student";
        stBtns.forEach((b) => {
          const act = b === btn;
          b.className = `text-left rounded-xl border p-4 transition-all flex items-center gap-3 ${act ? "border-cyan-400 bg-slate-800/90 text-white" : "border-slate-800 bg-slate-950/75 text-slate-300 hover:border-slate-600 hover:text-white"}`;
        });
        stPanels.forEach((p) => p.classList.toggle("hidden", p.getAttribute("data-stakeholder-panel") !== id));
      });
    });
  }
}

/* 26. Roadmap Page: Series Filter, V10 Milestones, Horizon Toggle & 8 Spin-Offs (roadmap.html) */
function initRoadmap() {
  const seriesBtns = document.querySelectorAll("[data-series-filter]");
  const seriesBlocks = document.querySelectorAll("[data-series-block]");
  const milestoneCountEl = document.querySelector("[data-milestone-count]");
  if (seriesBtns.length && seriesBlocks.length) {
    seriesBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const f = btn.getAttribute("data-series-filter") || "all";
        seriesBtns.forEach((b) => {
          const act = b === btn;
          b.setAttribute("aria-selected", act ? "true" : "false");
          b.className = `px-3.5 py-2 rounded-xl border text-xs whitespace-nowrap shrink-0 transition-all ${act ? "border-cyan-400 bg-cyan-400 text-slate-950 font-semibold" : "border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-600 hover:text-white"}`;
        });
        let totalCount = 0;
        seriesBlocks.forEach((blk) => {
          const show = f === "all" || blk.getAttribute("data-series-block") === f;
          blk.classList.toggle("hidden", !show);
          if (show) totalCount += Number(blk.getAttribute("data-step-count") || "0");
        });
        if (milestoneCountEl) milestoneCountEl.textContent = `Showing ${totalCount} Canonical Milestones`;
      });
    });
  }

  const stepCards = document.querySelectorAll("[data-step-card]");
  stepCards.forEach((card) => {
    if (card.dataset.aeBound === "1") return;
    card.dataset.aeBound = "1";
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-step-card");
      stepCards.forEach((c) => {
        const act = c.getAttribute("data-step-card") === target;
        c.className = `text-left rounded-xl border p-4 transition-all space-y-1.5 ${act ? "border-cyan-400/70 bg-slate-900/90" : "border-slate-800 bg-slate-900/50 hover:border-slate-600"}`;
      });
    });
  });

  const v10Btns = document.querySelectorAll("[data-v10-btn]");
  const v10Panels = document.querySelectorAll("[data-v10-panel]");
  if (v10Btns.length && v10Panels.length) {
    v10Btns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-v10-btn");
        v10Btns.forEach((b) => {
          const act = b === btn;
          b.className = `w-full text-left rounded-xl border p-4 transition-colors flex items-center justify-between gap-3 ${act ? "border-cyan-400 bg-cyan-400/10" : "border-slate-800 bg-slate-950/70 hover:border-slate-600"}`;
        });
        v10Panels.forEach((p) => p.classList.toggle("hidden", p.getAttribute("data-v10-panel") !== id));
      });
    });
  }

  const horizonBtns = document.querySelectorAll("[data-horizon-btn]");
  const horizonCards = document.querySelectorAll("[data-horizon-card]");
  if (horizonBtns.length && horizonCards.length) {
    horizonBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const h = btn.getAttribute("data-horizon-btn") || "year1";
        horizonBtns.forEach((b) => {
          const k = b.getAttribute("data-horizon-btn");
          const act = k === h;
          b.className = `px-3.5 py-2 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
            act ? (k === "year1" ? "bg-emerald-400 text-slate-950 font-semibold" : "bg-violet-400 text-slate-950 font-semibold") : "text-slate-300 hover:text-white"
          }`;
        });
        horizonCards.forEach((wrap) => {
          const k = wrap.getAttribute("data-horizon-card");
          const inner = wrap.querySelector(".spotlight-card");
          if (!inner) return;
          inner.classList.toggle("border-emerald-400/60", k === "year1" && h === "year1");
          inner.classList.toggle("bg-emerald-500/5", k === "year1" && h === "year1");
          inner.classList.toggle("border-violet-400/60", k === "year20" && h === "year20");
          inner.classList.toggle("bg-violet-500/5", k === "year20" && h === "year20");
          inner.classList.toggle("border-slate-800", k !== h);
        });
      });
    });
  }

  const spinoffBtns = document.querySelectorAll("[data-spinoff-btn]");
  if (spinoffBtns.length) {
    const SPINOFFS = {
      "Spin-Off 01": { num: "Spin-Off 01", name: "AI Reasoning Data & Foundation Model Lab", vertical: "Synthetic & Human Olympiad Corpus", trigger: "250k+ verified SymPy & proof-checked Zero-PII Cold Storage JSONL trajectories", rev: "Ethical anonymized reasoning datasets & theorem verification APIs", syn: "Built directly on Arithmo Cold JSONL vaults (Zero PII / Tombstone scrubbed).", cls: "border-cyan-400/35" },
      "Spin-Off 02": { num: "Spin-Off 02", name: "Zero-Cheat Exam Proctoring SaaS", vertical: "B2B Browser Integrity API (Module 7)", trigger: "Battle-tested QPRT-4 + MBTS behavioral telemetry across 100k+ rated rounds", rev: "Privacy-first per-exam WebRTC proctoring licensing (no raw server video)", syn: "Commercializes Arithmo-Edge’s client-side Adaptive Gaze Guard & MBTS engine.", cls: "border-violet-400/35" },
      "Spin-Off 03": { num: "Spin-Off 03", name: "Global Quant & Tech Talent Recruitment Network", vertical: "Verified High-ELO Hiring Bridge", trigger: "Critical mass of verified 2000+ Sentinels & 2500+ Archons globally", rev: "Employer talent discovery subscriptions & opt-in recruiting placements", syn: "Connects quant funds, AI labs, and engineering teams directly with proven solvers.", cls: "border-emerald-400/35" },
      "Spin-Off 04": { num: "Spin-Off 04", name: "Gamified Adaptive K–12 Learning App", vertical: "Mobile-First Mathematical Intuition", trigger: "Cross-pollination of General Velocity Touch UI & Socratic Flash agents", rev: "Family subscriptions & localized school district STEM partnerships", syn: "Channels early youth learners naturally into the main competitive arenas.", cls: "border-amber-400/35" },
      "Spin-Off 05": { num: "Spin-Off 05", name: "Global Institutional LMS & Accredited Digital University", vertical: "Academy Arena White-Label Network", trigger: "1,000+ onboarded KYB schools and coaching academies worldwide", rev: "Institutional multi-tier SaaS ($19.99–$79.99 base + per-seat) + QR ELO transcripts", syn: "Scales Subsite #9 Batch Radar, Dual-Handle accounts, and 5-Layer Anti-Reselling globally.", cls: "border-rose-400/35" },
      "Spin-Off 06": { num: "Spin-Off 06", name: "Competitive Math E-Sports & Live Broadcasting", vertical: "Top 128 World Cup & Bullet Blitz Media", trigger: "Annual World Cup crown viewer milestones across regional hubs", rev: "Global broadcast sponsorships, tournament merchandising & collegiate league rights", syn: "Turns Subsite #5 Mixed Olympiad & 1v1 Bullet Blitz into a spectator intellectual sport.", cls: "border-cyan-400/35" },
      "Spin-Off 07": { num: "Spin-Off 07", name: "Decentralized Research & Academic Publishing Network", vertical: "Arithmo Socials + Guidebooks", trigger: "Peer-reviewed 2000+ Sentinel/Archon monographs across Blog-to-Lab", rev: "Print-on-demand Olympiad compendiums & open institutional journal indexing", syn: "Bridges Subsite #11 KaTeX community blogs directly into Subsite #13 Arithmo Database.", cls: "border-violet-400/35" },
      "Spin-Off 08": { num: "Spin-Off 08", name: "Cognitive Analytics & Neuro-Learning Health-Tech API", vertical: "V10.3 Spaced Repetition Telemetry", trigger: "Multi-year endurance curves across timed Olympiad & Smart Mistake Deck training", rev: "EdTech cognitive pacing API & research partnerships on mathematical mastery retention", syn: "Transforms Smart Mistake Deck cadence insights into adaptive learning diagnostics.", cls: "border-emerald-400/35" },
    };
    const numEl = document.querySelector("[data-spinoff-num]");
    const nameEl = document.querySelector("[data-spinoff-name]");
    const vertEl = document.querySelector("[data-spinoff-vert]");
    const trigEl = document.querySelector("[data-spinoff-trig]");
    const revEl = document.querySelector("[data-spinoff-rev]");
    const synEl = document.querySelector("[data-spinoff-syn]");
    spinoffBtns.forEach((btn) => {
      if (btn.dataset.aeBound === "1") return;
      btn.dataset.aeBound = "1";
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-spinoff-btn") || "Spin-Off 01";
        const sp = SPINOFFS[key] || SPINOFFS["Spin-Off 01"];
        spinoffBtns.forEach((b) => {
          const bk = b.getAttribute("data-spinoff-btn") || "Spin-Off 01";
          const act = bk === key;
          const borderCls = (SPINOFFS[bk] && SPINOFFS[bk].cls) || "border-cyan-400/35";
          b.className = `text-left spotlight-card rounded-2xl p-5 space-y-2 border transition-all ${act ? "border-cyan-400 bg-slate-800/90" : `${borderCls} hover:border-slate-500`}`;
        });
        if (numEl) numEl.textContent = sp.num;
        if (nameEl) nameEl.textContent = sp.name;
        if (vertEl) vertEl.textContent = sp.vertical;
        if (trigEl) trigEl.textContent = sp.trigger;
        if (revEl) revEl.textContent = sp.rev;
        if (synEl) synEl.textContent = sp.syn;
      });
    });
  }
}

/* 27. Global FAQ Accordions */
function initFaqAccordions() {
  document.querySelectorAll("[data-faq-accordion]").forEach((acc) => {
    if (acc.dataset.aeBound === "1") return;
    acc.dataset.aeBound = "1";
    const items = Array.from(acc.querySelectorAll("[data-faq-item]"));
    items.forEach((item) => {
      const trigger = item.querySelector("[data-faq-trigger]");
      const panel = item.querySelector("[data-faq-panel]");
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

/* 27b. Accessible Technical Glossary Tooltips (Hover, Focus, Tap, Escape & Portal Clamping) */
function initTechTooltips() {
  const triggers = document.querySelectorAll("[data-tech-tooltip]");
  if (!triggers.length) return;

  let portal = document.getElementById("ae-tooltip-portal");
  if (!portal) {
    portal = document.createElement("div");
    portal.id = "ae-tooltip-portal";
    document.body.appendChild(portal);
  }

  let activeState = null;
  let closeTimer = null;

  const clearTimer = () => {
    if (closeTimer !== null) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const positionPanel = (trigger, panel) => {
    const rect = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const panelWidth = Math.min(304, vw - 24);
    panel.style.width = `${panelWidth}px`;
    const panelHeight = panel.offsetHeight || 136;
    const gap = 10;

    const spaceAbove = rect.top;
    const spaceBelow = vh - rect.bottom;
    const placement = spaceAbove >= panelHeight + gap + 12 || spaceAbove >= spaceBelow ? "top" : "bottom";

    const rawTop = placement === "top" ? rect.top - panelHeight - gap : rect.bottom + gap;
    const clampedTop = Math.max(12, Math.min(vh - panelHeight - 12, rawTop));
    const idealLeft = rect.left + rect.width / 2 - panelWidth / 2;
    const clampedLeft = Math.max(12, Math.min(vw - panelWidth - 12, idealLeft));

    panel.setAttribute("data-placement", placement);
    panel.style.position = "fixed";
    panel.style.top = `${clampedTop}px`;
    panel.style.left = `${clampedLeft}px`;
  };

  const closeActive = (restoreImmediately = false) => {
    clearTimer();
    if (!activeState) return;
    const { trigger, panel, wrap } = activeState;
    activeState = null;
    trigger.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    panel.classList.remove("is-open");
    panel.classList.add("hidden");
    panel.hidden = true;
    if (restoreImmediately || wrap.isConnected) {
      wrap.appendChild(panel);
    }
  };

  const scheduleClose = () => {
    clearTimer();
    closeTimer = window.setTimeout(() => {
      closeActive();
    }, 120);
  };

  const openTooltip = (trigger, panel, wrap) => {
    clearTimer();
    if (activeState && activeState.trigger !== trigger) {
      closeActive(true);
    }
    activeState = { trigger, panel, wrap };
    if (panel.parentNode !== portal) {
      portal.appendChild(panel);
    }
    const accent = trigger.style.getPropertyValue("--ae-tip-accent") || "#00f0ff";
    panel.style.borderColor = `${accent}66`;
    panel.hidden = false;
    panel.classList.remove("hidden");
    panel.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    positionPanel(trigger, panel);
    window.requestAnimationFrame(() => {
      if (activeState && activeState.panel === panel) {
        positionPanel(trigger, panel);
        panel.classList.add("is-open");
      }
    });
  };

  triggers.forEach((trigger) => {
    if (trigger.dataset.aeBound === "1") return;
    trigger.dataset.aeBound = "1";
    const wrap = trigger.closest(".ae-tooltip-wrap");
    const panelId = trigger.getAttribute("aria-describedby");
    const panel = (panelId && document.getElementById(panelId)) || (wrap && wrap.querySelector("[data-tech-tooltip-panel]"));
    if (!wrap || !panel) return;

    trigger.addEventListener("mouseenter", () => openTooltip(trigger, panel, wrap));
    trigger.addEventListener("mouseleave", scheduleClose);
    trigger.addEventListener("focus", () => openTooltip(trigger, panel, wrap));
    trigger.addEventListener("blur", scheduleClose);
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeState && activeState.trigger === trigger) {
        closeActive();
      } else {
        openTooltip(trigger, panel, wrap);
      }
    });

    if (panel.dataset.aePanelBound !== "1") {
      panel.dataset.aePanelBound = "1";
      panel.addEventListener("mouseenter", clearTimer);
      panel.addEventListener("mouseleave", scheduleClose);
    }
  });

  if (document.body.dataset.aeTooltipGlobalBound !== "1") {
    document.body.dataset.aeTooltipGlobalBound = "1";
    const onScrollOrResize = () => {
      if (activeState) {
        positionPanel(activeState.trigger, activeState.panel);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape" && activeState) {
        const prevTrigger = activeState.trigger;
        closeActive();
        prevTrigger.blur();
      }
    };
    const onOutsidePointer = (e) => {
      if (!activeState) return;
      const target = e.target;
      if (target instanceof Node && (activeState.trigger.contains(target) || activeState.panel.contains(target))) {
        return;
      }
      closeActive();
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutsidePointer, true);

    registerCleanup(() => {
      closeActive(true);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutsidePointer, true);
      delete document.body.dataset.aeTooltipGlobalBound;
    });
  }
}

/* 28. Master Boot & Lifecycle Orchestration */
function bootArithmoEdge() {
  const tasks = [
    initImageErrorFallback,
    initCountdown,
    initDrawer,
    initWebGLHeroes,
    initConstellation,
    initSpotlightCards,
    initScrollAnimations,
    initPortalExplorer14,
    initDeterministicMathDemo,
    initArena3DStage,
    initGuestDuel,
    initHomeInteractiveControls,
    initEloExplorer,
    initShadowBotGauntlet,
    initContestSimulators,
    initDynamicCreditsPreview,
    initAiExplorer,
    initSecuritySim,
    initAcademyCalculator,
    initWalletSim,
    initGoldenVault,
    initSocialsForge,
    initHqLadder,
    initGovernanceExtras,
    initPioneers,
    initWhyArithmo,
    initRoadmap,
    initFaqAccordions,
    initTechTooltips,
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

window.addEventListener("pageshow", (e) => {
  bootArithmoEdge();
  runSyncs();
  if (e.persisted && window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
});

window.addEventListener("pagehide", () => {
  runCleanups();
});
