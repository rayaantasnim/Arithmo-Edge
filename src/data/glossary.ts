export type GlossaryTermId =
  | 'ELO'
  | 'QPRT-4'
  | 'Zero Pay-to-Win'
  | 'Find the Flaw'
  | 'Module 7'
  | 'General ELO'
  | 'Expert ELO'
  | 'Strict No-Mixed ELO Policy'
  | 'Shadow Bot Gauntlet'
  | 'Stealth ELO-Mirror'
  | 'K-Factor'
  | 'System Expectation Override'
  | 'Arithmo-Core-SDK'
  | 'Read-Shield'
  | 'TagArchitect'
  | 'ProofGrader AI'
  | 'SymPy'
  | 'Overall All-Rounder'
  | 'MBTS';

export interface TechGlossaryEntry {
  id: GlossaryTermId;
  term: string;
  category: string;
  definition: string;
  accentColor: string;
}

export const TECH_GLOSSARY: Record<GlossaryTermId, TechGlossaryEntry> = {
  ELO: {
    id: 'ELO',
    term: 'ELO Rating System',
    category: 'Meritocratic Skill Telemetry · 0–3200+',
    definition:
      'A dynamic competitive skill rating updated after official contests and 1v1 duels based on opponent strength. Arithmo-Edge tracks 10 isolated Core Arena ELOs across 5 mathematical disciplines.',
    accentColor: '#00F0FF',
  },
  'QPRT-4': {
    id: 'QPRT-4',
    term: 'QPRT-4 (Quad-Phase Resilience Theory)',
    category: '4-Layer Contest Integrity Architecture',
    definition:
      'Four-phase defense stack protecting live competitions: full-screen & tab lockdown, ChronoVault local keystroke recovery, LogicMutator 30s reserve hot-swaps, and post-contest rejudge audits.',
    accentColor: '#22D3EE',
  },
  'Zero Pay-to-Win': {
    id: 'Zero Pay-to-Win',
    term: 'Zero Pay-to-Win Constitutional Guarantee',
    category: 'Fair Competition Charter · $0 Entry Forever',
    definition:
      'Money can never buy ELO points, tiebreakers, or tournament seeding. Paid subscriptions and closed-loop Wallet packs fund optional AI mentoring and training quotas only.',
    accentColor: '#10B981',
  },
  'Find the Flaw': {
    id: 'Find the Flaw',
    term: 'Find the Flaw Peer Auditing',
    category: 'Post-Contest Adversarial Hacking Window',
    definition:
      'Codeforces-style 6-hour (Daily) or 2-hour (Sunday Mega) post-contest audit where solvers challenge opponent proofs for logic gaps or trigger 2-minute SymPy global rejudges.',
    accentColor: '#F59E0B',
  },
  'Module 7': {
    id: 'Module 7',
    term: 'Module 7 Biometric Proctoring',
    category: 'Client-Side Browser Integrity · Zero Raw Video',
    definition:
      'Browser-native Adaptive Gaze Guard and 3-Axis Audio Trap active during Sunday Mega Arena (optional Mon–Sat). Runs locally in your browser without storing raw video on servers.',
    accentColor: '#8B5CF6',
  },
  'General ELO': {
    id: 'General ELO',
    term: 'General ELO (Arithmetic Velocity Track)',
    category: '20:00 UTC Daily Track · Speed & Precision',
    definition:
      'Isolated rating measuring rapid computation and numerical accuracy across single-problem sprints using Touch Numpad entry and the Second-Chance Overtime Loop.',
    accentColor: '#00F0FF',
  },
  'Expert ELO': {
    id: 'Expert ELO',
    term: 'Expert ELO (Olympiad Proof Track)',
    category: '17:00 UTC Daily Track · Segments 1–4',
    definition:
      'Isolated rating evaluating formal deductive LaTeX and GeoGebra proofs graded by ProofGrader AI, Python/SymPy sandboxes, and 2000+ ELO Sentinel Peer Review.',
    accentColor: '#8B5CF6',
  },
  'Strict No-Mixed ELO Policy': {
    id: 'Strict No-Mixed ELO Policy',
    term: 'Strict No-Mixed ELO Policy',
    category: '10 Isolated Core Arena Ratings',
    definition:
      'Prevents cross-topic rating inflation by isolating General and Expert ratings inside each of the 5 arenas separately—Geometry skill never artificially boosts Number Theory.',
    accentColor: '#8B5CF6',
  },
  'Shadow Bot Gauntlet': {
    id: 'Shadow Bot Gauntlet',
    term: 'Shadow Bot Gauntlet (0–3200+)',
    category: '12 Calibrated Olympiad Bot Personas',
    definition:
      'On-demand 1v1 training against 12 Olympiad bot tiers from Spark to Apex. Targets set below your live ELO are forced Unrated to guarantee zero rating farming.',
    accentColor: '#F59E0B',
  },
  'Stealth ELO-Mirror': {
    id: 'Stealth ELO-Mirror',
    term: 'Stealth ELO-Mirror Bot',
    category: '60s Queue Backfill · Eliminates Dead Lobbies',
    definition:
      'When no human opponent within ±100 ELO joins a Ranked Duel inside 60 seconds, a mirror bot calibrated to your exact live rating steps in seamlessly at 100% Rated.',
    accentColor: '#00F0FF',
  },
  'K-Factor': {
    id: 'K-Factor',
    term: 'K-Factor (0.75× Anti-Inflation Guard)',
    category: 'ELO Rating Volatility Multiplier',
    definition:
      'Controls how many rating points transfer after a match. Stealth Mirror bot matches apply a 0.75× K-factor cap so automated queues stay rated without farmable variance.',
    accentColor: '#10B981',
  },
  'System Expectation Override': {
    id: 'System Expectation Override',
    term: 'System Expectation Override (+ΔR Shield)',
    category: 'Underdog ELO Protection Rule',
    definition:
      'When a lower-rated solver faces a 2000+ Sentinel and beats their statistically expected solve margin, this override shields them from unfair rating drops.',
    accentColor: '#10B981',
  },
  'Arithmo-Core-SDK': {
    id: 'Arithmo-Core-SDK',
    term: 'Arithmo-Core-SDK (engine.js)',
    category: '14-Portal Cross-Domain Edge Runtime',
    definition:
      'Shared orchestration script synchronizing Firebase Gmail SSO, permanent @handle tombstones, closed-loop Wallet credits, and live contest state across all 14 federated portals.',
    accentColor: '#00F0FF',
  },
  'Read-Shield': {
    id: 'Read-Shield',
    term: 'Read-Shield Edge Snapshot Pattern',
    category: 'Cloudflare Workers Static Caching · -98% Reads',
    definition:
      'Compiles all 14 live leaderboards into static edge JSON snapshots served via Cloudflare Workers, cutting Firestore database reads by 98% under Sunday Mega spikes.',
    accentColor: '#22D3EE',
  },
  TagArchitect: {
    id: 'TagArchitect',
    term: 'TagArchitect (Zero-Fragmentation Shield)',
    category: 'Anti-Spoiler Sub-Topic Masking Engine',
    definition:
      'Strips lemma hints such as #LTE, #Inversion, or #Vieta-Jumping from live contest payloads so solvers diagnose structural invariants authentically until rounds conclude.',
    accentColor: '#F59E0B',
  },
  'ProofGrader AI': {
    id: 'ProofGrader AI',
    term: 'ProofGrader AI (0–7 Olympiad Rubric)',
    category: 'Automated Step-by-Step Proof Auditor',
    definition:
      'Evaluates deductive LaTeX steps against rigorous Olympiad marking schemes alongside Python/SymPy boundary checks before passing borderline proofs to 2000+ human Sentinels.',
    accentColor: '#8B5CF6',
  },
  SymPy: {
    id: 'SymPy',
    term: 'Python / SymPy Symbolic Sandbox',
    category: 'Deterministic Mathematical Verification',
    definition:
      'Executes exact symbolic algebra, congruence identities, and counterexample checks deterministically via isolated edge workers so final standings are mathematically verifiable.',
    accentColor: '#10B981',
  },
  'Overall All-Rounder': {
    id: 'Overall All-Rounder',
    term: 'Overall All-Rounder Composite Rating',
    category: 'Top 128 Annual World Cup Seeding',
    definition:
      'Cross-discipline composite uniting performance across all 5 Core Arenas (anchored on Subsite #5 Mixed Olympiad & Sunday Mega) to qualify solvers for the Top 128 World Cup.',
    accentColor: '#F43F5E',
  },
  MBTS: {
    id: 'MBTS',
    term: 'MBTS (Behavioral Telemetry Clustering)',
    category: 'Post-Contest Anti-Collusion Audit',
    definition:
      'Evaluates keystroke cadence, pause intervals, and proof-step entropy during T+1h (Daily) and T+3h (Sunday Mega) finalization windows to isolate coordinated cheating rings.',
    accentColor: '#F43F5E',
  },
};
