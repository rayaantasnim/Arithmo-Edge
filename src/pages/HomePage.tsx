import React, {useState} from 'react';
import {ArrowRight, Lock, ShieldCheck} from 'lucide-react';
import {MEDIA} from '../assets/media';
import heroMonumentImg from '../assets/images/hero_olympiad_monument_1795365454544.jpg';
import {Arena3DStage} from '../components/Arena3DStage';
import {FaqAccordion, GuestDuelWidget, SectionHeader} from '../components/CommercialPrimitives';
import {
  CountUpStat,
  CyberMediaFrame,
  HeroReveal,
  ResilientImage,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import {useCountdown} from '../components/SiteShell';
import {TechTooltip} from '../components/TechTooltip';
import {WebGLHeroCanvas} from '../components/WebGLHeroCanvas';
import {
  ARENA_CATALOG,
  ArenaKey,
  DECIMAL_ROLLOUT_PHASES,
  GENESIS_EARLY_BIRD_PERKS,
  PORTALS_14,
  PortalCategoryKey,
} from '../data/ecosystem';

const HOME_FAQS = [
  {
    q: 'Are rated competitions, Daily rounds, and Sunday Mega Arena truly free forever?',
    a: 'Yes. Competing in all 5 Core Arenas, Daily Mon–Sat rated contests, Sunday Mega Arena, 1v1 Bullet Blitz, Solo Virtual Gym, and qualifying for the Top 128 Annual World Cup requires $0.00. Paid plans and Wallet packs fund optional AI mentoring compute and convenience tools—never ELO points.',
  },
  {
    q: 'Why does Arithmo-Edge currently use arithmo-edge.github.io instead of a .com domain?',
    a: 'Our 14 federated micro-frontends are architected for Free Forever GitHub Pages hosting so educational access is never gated behind server rent. Our custom .com domain launches alongside the full production ecosystem in 2 months while keeping all arithmo-edge.github.io endpoints synchronized.',
  },
  {
    q: 'How does the Genesis Launch Early-Bird offer work?',
    a: 'At launch, the first 50 verified @handles receive 3 months FREE Singularity ($12.99/mo value), the next 100 verified @handles receive 3 months FREE Pro ($5.99/mo value), and the first 5 KYB-approved Founding Academies receive 25% OFF their first 3 months. Referring 3 verified friends grants +$2.00 closed-loop Arithmo Wallet Credit.',
  },
  {
    q: 'Where do 1v1 duels and Shadow Bot Gauntlets happen vs official Contests?',
    a: 'Every 1v1 Rated Duel, Direct Rival Challenge, and Shadow Bot Gauntlet lives strictly inside the 5 Core Arenas (Subsites #1–#5), while the Contest Portal (Subsite #6) runs Live and Upcoming Official & Warm-Up Contests exclusively.',
  },
];

export const HomePage: React.FC = () => {
  const countdown = useCountdown();
  const [portalCategory, setPortalCategory] = useState<'all' | PortalCategoryKey>('all');
  const [activeArenaKey, setActiveArenaKey] = useState<ArenaKey>('nt');

  const activeArena = ARENA_CATALOG[activeArenaKey];

  return (
    <>
      {/* Primary Entry Hero: Institutional Olympiad Scale Showcase */}
      <section
        id="flagship-entry-hero"
        className="relative overflow-hidden border-b border-slate-800/80 bg-[#03050c]"
      >
        <WebGLHeroCanvas accentHex="#00F0FF" secondaryHex="#F59E0B" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_22%_18%,rgba(0,240,255,0.12),transparent_62%),radial-gradient(ellipse_65%_55%_at_82%_24%,rgba(245,158,11,0.10),transparent_58%),linear-gradient(to_bottom,rgba(3,5,12,0.22),#03050c_92%)]"
        />

        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 relative z-10 space-y-8 lg:space-y-10">
          <div className="grid lg:grid-cols-12 gap-7 lg:gap-9 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
              <HeroReveal delay={0.02}>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium tracking-wide text-slate-300">
                  <span className="text-cyan-300">Arithmo-Edge Ecosystem</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>14 Federated Domains</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-amber-300">Olympiad Edge Global Standard</span>
                </div>
              </HeroReveal>

              <HeroReveal delay={0.08}>
                <h1 className="hero-title-fluid font-display font-bold text-white">
                  Real-Time ELO-Rated Competitive Mathematics at Global Olympiad Scale
                </h1>
              </HeroReveal>

              <HeroReveal delay={0.14}>
                <p className="ae-prose text-justify text-sm sm:text-base text-slate-300 prose-measure leading-relaxed">
                  Unifying 5 Core Mathematical Arenas, 60 meritocratic progression tiers, 1v1 Bullet Blitz duels,
                  post-contest proof auditing, and 42 specialized AI engines inside a zero pay-to-win global competition
                  infrastructure calibrated by real-time ELO and QPRT-4 integrity guards.
                </p>
              </HeroReveal>

              <HeroReveal delay={0.2}>
                <div className="ae-hero-cta flex flex-wrap items-center gap-4 pt-1">
                  <a href="#guest-duel" className="btn-cyber px-6 py-3 text-sm font-semibold whitespace-nowrap shrink-0">
                    <span>Play 60s Guest Math Duel</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#genesis-command" className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0">
                    Inspect Command Deck
                  </a>
                </div>
              </HeroReveal>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <HeroReveal delay={0.12} className="h-full flex flex-col">
                <div className="relative h-full min-h-[240px] sm:min-h-[310px] lg:min-h-[380px] aspect-[16/10] lg:aspect-auto rounded-2xl border border-slate-700/70 overflow-hidden bg-gradient-to-br from-[#070b16] via-[#0d152a] to-[#03050c] shadow-[0_28px_80px_-16px_rgba(0,0,0,0.85)] media-frame group">
                  <img
                    src={heroMonumentImg}
                    alt="Monumental dark obsidian mathematical amphitheater with suspended translucent geometric icosahedron and orbital golden rings"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050c] via-[#03050c]/25 to-transparent"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-wrap items-end justify-between gap-2 sm:gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-mono-tabular text-amber-300/95">
                        Architectural Olympiad Headquarters · V1.0 – V4.0 Sovereign Grid
                      </div>
                      <div className="font-display text-sm sm:text-lg font-semibold text-white">
                        Sub-Second Global Matchmaking · Proof-Verified Standings
                      </div>
                    </div>
                    <span className="font-mono-tabular text-xs text-cyan-300">
                      Zero Pay-to-Win Guarantee
                    </span>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          <HeroReveal delay={0.24}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-800/90 rounded-2xl bg-[#070b16]/80 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 overflow-hidden">
              <div className="p-5 sm:p-6 space-y-1">
                <div className="font-mono-tabular text-xl sm:text-2xl font-bold text-white">
                  <CountUpStat value={14} suffix=" Federated Portals" delayMs={0} durationMs={900} />
                </div>
                <div className="text-xs text-slate-400">1 Core Hub + 13 Live Subsites on Arithmo-Core-SDK</div>
              </div>
              <div className="p-5 sm:p-6 space-y-1">
                <div className="font-mono-tabular text-xl sm:text-2xl font-bold text-cyan-300">
                  <CountUpStat value={60} suffix=" ELO Rank Tiers" delayMs={240} durationMs={950} />
                </div>
                <div className="text-xs text-slate-400">10 Core Ratings · Spark through Singularity Apex</div>
              </div>
              <div className="p-5 sm:p-6 space-y-1">
                <div className="font-mono-tabular text-xl sm:text-2xl font-bold text-amber-300">
                  <CountUpStat value={42} suffix=" Hybrid AI Engines" delayMs={480} durationMs={950} />
                </div>
                <div className="text-xs text-slate-400">Gemini + Qwen-Math + SymPy Symbolic Verification</div>
              </div>
              <div className="p-5 sm:p-6 space-y-1">
                <div className="font-mono-tabular text-xl sm:text-2xl font-bold text-emerald-300">
                  <CountUpStat value={128} prefix="Top " suffix=" World Cup" delayMs={720} durationMs={1000} />
                </div>
                <div className="text-xs text-slate-400">Annual Knockout Championship · $0 Entry Forever</div>
              </div>
            </div>
          </HeroReveal>
        </div>
      </section>

      {/* Section 1: Flagship Cyber-Constellation Hero + Dec 31, 2026 Countdown + Genesis Legacy */}
      <section id="genesis-command" className="relative overflow-hidden border-b border-slate-800/70">
        <WebGLHeroCanvas accentHex="#00F0FF" secondaryHex="#8B5CF6" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050811]/35 to-[#050811]"
        />

        <div className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-22 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between gap-7">
              <div className="space-y-5">
                <HeroReveal delay={0.02}>
                  <div className="text-xs sm:text-sm text-cyan-300 font-medium tracking-wide">
                    Olympiad Edge Federation · Prime-Factor.app Pre-Era &rarr; Arithmo-Edge Full Form · Custom .com in 2
                    Months
                  </div>
                </HeroReveal>

                <HeroReveal delay={0.08}>
                  <h2 className="hero-title-fluid font-display font-bold tracking-tight text-white">
                    Real-Time ELO-Rated Competitive Mathematics at Global Olympiad Scale.
                  </h2>
                </HeroReveal>

                <HeroReveal delay={0.14}>
                  <div className="space-y-3.5 ae-prose text-justify text-base sm:text-lg text-slate-300 prose-measure leading-relaxed">
                    <p className="text-justify">
                      Competitive programming has thrived for decades on real-time <TechTooltip term="ELO">ELO</TechTooltip>{' '}
                      rating systems, live global rounds, and post-match peer hacking through platforms like Codeforces.
                      Meanwhile, competitive mathematics remains trapped between static, 1990s-era asynchronous forums
                      (such as AoPS) and gatekept, $300-$500+ preparatory courses.
                    </p>
                    <p className="text-justify">
                      Arithmo Edge eliminates that asymmetry. Engineered as a federated, zero-to-low-cost global
                      infrastructure, Arithmo Edge brings sub-second latency, real-time ELO matchmaking, 1v1 Bullet
                      Blitz duels, live Codeforces-style rated contests,{' '}
                      <TechTooltip term="Find the Flaw">peer-hacking phases</TechTooltip>, and deterministic{' '}
                      <TechTooltip term="SymPy">symbolic verification</TechTooltip> to pure Olympiad mathematics—making
                      elite mathematical training and verifiable competitive credentials accessible to every student on
                      Earth.
                    </p>
                  </div>
                </HeroReveal>

                <HeroReveal delay={0.2}>
                  <div className="ae-hero-cta flex flex-wrap items-center gap-3.5 pt-1">
                    <a href="#guest-duel" className="btn-cyber px-5 py-3 text-sm whitespace-nowrap shrink-0">
                      <span>Play 60s Guest Math Duel</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="arenas-elo.html" className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0">
                      5 Arenas &amp; Shadow Bot Gauntlet
                    </a>
                    <a href="pricing.html" className="btn-glass px-5 py-3 text-sm whitespace-nowrap shrink-0">
                      Wallet &amp; Early-Bird Perks
                    </a>
                  </div>
                </HeroReveal>
              </div>

              {/* Live Countdown Command Deck to December 31, 2026 Midnight */}
              <HeroReveal delay={0.26}>
                <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-cyan-400/30 shadow-[0_0_50px_rgba(0,240,255,0.08)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <h2 className="font-display text-base sm:text-lg font-semibold text-white">
                        V4.0 Grand Singularity Global Launch Countdown
                      </h2>
                      <p className="text-xs text-slate-400">
                        Targeting December 31, 2026 at 12:00 Midnight (2027-01-01 00:00:00) · .com Domain Launches in 2
                        Months
                      </p>
                    </div>
                    <span className="font-mono-tabular text-xs text-cyan-300">T-Minus Live Telemetry</span>
                  </div>
                  <div data-countdown="" className="ae-countdown-grid grid grid-cols-4 gap-3">
                    <div className="rounded-xl bg-slate-950/85 border border-slate-800 px-3 py-3.5 text-center">
                      <div data-cd="days" className="font-mono-tabular text-2xl sm:text-4xl font-bold text-white">
                        {countdown.days}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Days</div>
                    </div>
                    <div className="rounded-xl bg-slate-950/85 border border-slate-800 px-3 py-3.5 text-center">
                      <div data-cd="hours" className="font-mono-tabular text-2xl sm:text-4xl font-bold text-white">
                        {countdown.hours}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Hours</div>
                    </div>
                    <div className="rounded-xl bg-slate-950/85 border border-slate-800 px-3 py-3.5 text-center">
                      <div data-cd="minutes" className="font-mono-tabular text-2xl sm:text-4xl font-bold text-white">
                        {countdown.minutes}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Minutes</div>
                    </div>
                    <div className="rounded-xl bg-slate-950/85 border border-cyan-400/35 px-3 py-3.5 text-center">
                      <div data-cd="seconds" className="font-mono-tabular text-2xl sm:text-4xl font-bold text-cyan-400">
                        {countdown.seconds}
                      </div>
                      <div className="text-xs text-cyan-300/80 mt-1">Seconds</div>
                    </div>
                  </div>
                </div>
              </HeroReveal>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <HeroReveal delay={0.18} className="h-full flex flex-col">
                <div className="h-full min-h-[380px] rounded-2xl border border-slate-800 overflow-hidden relative media-frame group shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
                  <ResilientImage
                    src={MEDIA.homeHero}
                    alt="Arithmo-Edge architectural mathematics sanctuary visualization"
                    loading="eager"
                    accentColor="#00F0FF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/55 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 text-[11px] font-mono-tabular text-cyan-200/90">
                    <span>Olympiad Edge · Genesis Command</span>
                    <span>14 Portals · 42 AI Engines</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-2.5">
                    <div className="text-xs text-cyan-300 font-mono-tabular">
                      Olympiad Edge · Global Competitive Math
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">The Olympiad Arena Revolution</h3>
                    <p className="ae-prose text-justify text-sm text-slate-300 leading-relaxed">
                      <strong className="text-white">
                        5 Core Mathematical Arenas · 60 Progression Tiers · 1v1 Bullet Blitz &amp; Shadow Bot Gauntlet ·
                        Proof-Based Grading &amp; Find the Flaw
                      </strong>
                      —built to bring real-time competitive adrenaline to every Olympiad aspirant worldwide.
                    </p>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive "No-Login 60-Second Guest Math Duel" Live Widget */}
      <section id="guest-duel" className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="02 · Interactive Instant Olympiad Trial"
            title="No-Login 60-Second Guest Math Duel"
            subtitle="Experience deterministic browser grading before creating an account. Solve an authentic Olympiad prompt under the 60-second clock to project your live starting ELO and preview your future @handle before our V1.0 Genesis launch on December 16, 2026."
          />
          <GuestDuelWidget />
          <div className="mt-6">
            <CyberMediaFrame
              src={MEDIA.homeGuestDuel}
              alt="Live 60-second mathematical sprint interface and instant ELO telemetry"
              kicker="Deterministic Client Grader · Zero Latency"
              title="Instant Olympiad Calibration Before Registration"
              summary="Every integer check runs locally at zero server latency—estimating provisional ELO brackets across all 5 arenas while keeping @handle reservations previewed until V1.0 opens on December 16, 2026."
              details={[
                'Your simulated Arena Readiness rating combines baseline problem difficulty (1350–1850 ELO) with a deterministic solve-speed multiplier, automatically mapping you to one of the 12 canonical Shadow Bot sparring tiers from Spark through Apex.',
                'Once public Gmail SSO onboarding opens, every verified @handle permanently locks across all 14 federated websites via Arithmo-Core-SDK (engine.js), giving new entrants 7 days of free rename flexibility.',
              ]}
              accentColor="#00F0FF"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 3: Genesis Launch Early-Bird Scarcity Banner */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="03 · Genesis Launch Early-Bird Cohorts · Strictly Capped Allocation"
            title="Founding Solver, Academy & Referral Launch Perks"
            accentClass="text-amber-300"
            subtitle="Early verified contributors, founding institutions, and community ambassadors lock permanent launch advantages prior to our V4.0 custom .com full production debut."
            action={
              <a href="pricing.html" className="btn-cyber px-4 py-2.5 text-xs whitespace-nowrap">
                Open Wallet &amp; Early-Bird Checkout &rarr;
              </a>
            }
          />
          <div className="mb-6 rounded-2xl border border-amber-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto min-h-[200px] relative media-frame">
              <ResilientImage
                src={MEDIA.homeEarlyBird}
                alt="Global Olympiad analytics and Founding Cohort early-bird rewards"
                loading="lazy"
                accentColor="#F59E0B"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-xs font-mono-tabular text-amber-300">
                V1.0 Public Launch · December 16, 2026 · Strictly Capped Early-Bird Tiers
              </div>
            </div>
            <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-center space-y-2.5">
              <div className="text-xs font-mono-tabular text-amber-300">Founding Access · Zero Pay-to-Win Guarantee</div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                Fair Meritocracy Rewarding Early Olympiad Pioneers &amp; Institutions
              </h3>
              <p className="ae-prose text-justify text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every Genesis cohort seat unlocks premium AI mentoring and batch academy tools without ever altering live
                ELO math ratings. First 50 verified <code className="font-mono-tabular text-cyan-300">@handles</code>{' '}
                start with 3 months FREE Singularity when claiming opens on December 16, 2026.
              </p>
              <p className="ae-prose text-justify text-xs sm:text-sm text-slate-300/95 leading-relaxed">
                Subsequent Cohort #2 entrants (next 100 verified <code className="font-mono-tabular">@handles</code>)
                receive 3 months FREE Pro, the first 5 KYB-approved Founding Academies lock 25% off for 3 months, and
                community referrals award +$2.00 closed-loop Arithmo Wallet credit for every 3 verified friends.
              </p>
            </div>
          </div>

          <div className="ae-bento-grid grid md:grid-cols-2 gap-6">
            {GENESIS_EARLY_BIRD_PERKS.map((perk) => (
              <SpotlightCard
                key={perk.title}
                className="rounded-2xl p-6 space-y-3 border-slate-800 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs font-mono-tabular" style={{color: perk.accentColor}}>
                    {perk.badge}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{perk.title}</h3>
                  <div className="text-xs font-mono-tabular text-slate-400">{perk.allocation}</div>
                  <p className="ae-prose text-justify text-xs text-slate-300 leading-relaxed pt-1">{perk.detail}</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono-tabular text-emerald-300">
                  Zero Pay-to-Win · Verified at Gmail SSO
                </div>
              </SpotlightCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4: Interactive 14-Portal Preview Grid */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="04 · 14-Website Federated Micro-Frontend Map"
            title="Filter All 14 Live Portals on arithmo-edge.github.io"
            subtitle="Every arena, contest engine, leaderboard, AI tutor, institutional academy, and governance war-room deploys as an isolated micro-frontend synchronized through engine.js."
            action={
              <a href="architecture.html" className="btn-glass px-4 py-2 text-xs whitespace-nowrap">
                Launch Full Interactive 14-Portal Inspector &rarr;
              </a>
            }
          />

          <div className="flex flex-wrap gap-2 mb-6">
            {(
              [
                {id: 'all', label: 'All 14 Portals'},
                {id: 'core', label: 'Core Hub (1)'},
                {id: 'arena', label: '5 Core Arenas'},
                {id: 'competition', label: 'Contests & Standings (2)'},
                {id: 'platform', label: 'AI, Academy, Forge, HQ & DB (6)'},
              ] as const
            ).map((tab) => {
              const active = portalCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-home-portal-filter={tab.id}
                  onClick={() => setPortalCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-lg border text-xs whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'border-cyan-400 bg-cyan-400/15 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTALS_14.map((portal) => (
              <div
                key={portal.id}
                data-home-portal-card=""
                data-cat={portal.category}
                className={portalCategory !== 'all' && portal.category !== portalCategory ? 'hidden' : ''}
              >
                <SpotlightCard className="rounded-xl p-4 space-y-2 flex flex-col justify-between h-full">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
                      <span style={{color: portal.accentColor}}>{portal.tag}</span>
                      <span className="text-slate-500">{portal.categoryLabel.split(' ')[0]}</span>
                    </div>
                    <h3 className="font-display text-sm font-bold text-white">{portal.shortTitle}</h3>
                    <p className="ae-prose text-justify text-xs text-slate-400 leading-relaxed">{portal.roleSummary}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
                    <span className="text-cyan-300/80 truncate">{portal.displayUrl}</span>
                    <a href={portal.relatedDocPage.href} className="text-white hover:text-cyan-300 shrink-0">
                      Specs &rarr;
                    </a>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <CyberMediaFrame
              src={MEDIA.homePortals}
              alt="14 federated GitHub Pages micro-frontends synchronized via Arithmo-Core-SDK"
              kicker="Arithmo-Core-SDK (engine.js) Federation"
              title="14 Isolated Subsites · Zero Single-Origin Bottleneck"
              summary="Each specialized subsystem runs on its own resilient endpoint under arithmo-edge.github.io while sharing unified SSO identities, closed-loop Wallet credits, and live contest state."
              details={[
                'Cloudflare Workers act as the stateless edge glue connecting static GitHub Pages repositories to Firebase Cloud Firestore, achieving 98% read-cost reduction via public Read-Shield JSON snapshots on Subsite #7 Standings.',
                'Traffic spikes during Sunday Mega Arena on Subsite #6 remain completely isolated from Academy classrooms on Subsite #9 or archive queries on Subsite #13, while all 14 domains remain synchronized as the custom .com rollout launches.',
              ]}
              accentColor="#8B5CF6"
              reverse
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5: 5-Arena Interactive Showcase & Dual ELO + Shadow Bot Zone */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="05 · Color-Coded Mathematical Domains"
            title="5 Core Arenas: Interactive Track & Syllabus Explorer"
            subtitle={
              <>
                1v1 Rated Duels, 5-Minute Direct Rival Challenges, and{' '}
                <TechTooltip term="Shadow Bot Gauntlet">Shadow Bot Gauntlets</TechTooltip> live strictly inside these 5
                Core Arenas (Subsites #1–#5), keeping 10 Core Arena{' '}
                <TechTooltip term="Strict No-Mixed ELO Policy">ELOs completely isolated</TechTooltip>.
              </>
            }
            action={
              <a href="arenas-elo.html" className="btn-cyber px-4 py-2 text-xs whitespace-nowrap">
                Open 60-Tier &amp; Bot Gauntlet Simulator &rarr;
              </a>
            }
          />

          <div className="flex flex-wrap gap-2 mb-6">
            {(['nt', 'alg', 'geo', 'comb', 'mixed'] as ArenaKey[]).map((key) => {
              const item = ARENA_CATALOG[key];
              const isSelected = key === activeArenaKey;
              return (
                <button
                  key={key}
                  type="button"
                  data-home-arena-tab={key}
                  onClick={() => setActiveArenaKey(key)}
                  className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-cyan-400 shadow-[0_0_24px_rgba(0,240,255,0.16)]'
                      : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span style={{color: item.color}}>{item.code}</span> · {item.name}
                </button>
              );
            })}
          </div>

          <div className="mb-6">
            <Arena3DStage activeKey={activeArenaKey} onSelect={setActiveArenaKey} />
          </div>

          <div data-home-arena-panel="" className="glass-panel rounded-2xl overflow-hidden grid lg:grid-cols-12 border border-slate-800">
            <div className="lg:col-span-5 relative min-h-[260px] media-frame">
              <ResilientImage
                src={MEDIA.homeArenas}
                alt={`${activeArena.name} competitive Olympiad arena`}
                loading="lazy"
                accentColor={activeArena.color}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/45 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-1">
                <div data-ha-meta="" className="font-mono-tabular text-xs" style={{color: activeArena.color}}>
                  {activeArena.code} · {activeArena.subsite}
                </div>
                <div data-ha-title="" className="font-display text-2xl font-bold text-white">{activeArena.name}</div>
                <div data-ha-day="" className="text-xs text-slate-300">{activeArena.day}</div>
              </div>
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-4 space-y-1">
                  <div className="text-slate-400 font-mono-tabular">Entry &amp; Peak Ranks (12 Tiers)</div>
                  <div data-ha-entry-title="" className="font-semibold text-white">
                    {activeArena.titles[0].title} (0–499) &rarr;{' '}
                    <span style={{color: activeArena.color}}>{activeArena.titles[11].title} (3000+)</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-4 space-y-1">
                  <div className="text-slate-400 font-mono-tabular">Play Modes Hosted Here</div>
                  <div className="font-semibold text-white leading-relaxed">
                    Ranked Arena Duel (60s Pool &rarr; Stealth Bot) · Direct Rival (5m Quota-Safe) · Shadow Bot Gauntlet (Spark–Apex)
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-slate-400 mb-3">
                  <span>Complete 12-Tier Canonical Rank Progression (Average ELO = [General + Expert] / 2)</span>
                  <span className="text-[11px] text-slate-400">Zero-Fragmentation Tag Shield Active</span>
                </div>
                <div data-ha-ranks="" className="grid sm:grid-cols-2 gap-2 text-xs font-mono-tabular">
                  {activeArena.titles.map((t, idx) => {
                    const isApex = t.max >= 9000;
                    const rangeLabel = isApex ? `${t.min}+` : `${t.min}–${t.max}`;
                    return (
                      <div
                        key={t.title}
                        className="flex items-center justify-between gap-2 rounded-lg border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-slate-300"
                        style={isApex ? {borderColor: `${activeArena.color}66`} : undefined}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="text-[11px] text-slate-500 shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span
                            className="truncate font-medium"
                            style={isApex ? {color: activeArena.color} : undefined}
                          >
                            {t.title}
                          </span>
                        </span>
                        <span
                          className="shrink-0"
                          style={isApex ? {color: activeArena.color} : {color: '#94a3b8'}}
                        >
                          {rangeLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 6: Commercial Trust, Zero Pay-to-Win Guarantee & Scale KPIs */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="06 · Zero Pay-to-Win Constitutional Guarantee & Telemetry Scale"
            title="Verified Meritocracy Backed by QPRT-4 & 14-Point Legal Shield"
            subtitle={
              <>
                Every <TechTooltip term="ELO">ELO</TechTooltip> point is earned exclusively through deterministic
                problem solutions, blind proof grading, <TechTooltip term="QPRT-4">QPRT-4</TechTooltip> integrity
                defenses, and <TechTooltip term="Find the Flaw">Find the Flaw</TechTooltip> audits.
              </>
            }
          />

          <div className="ae-kpi-grid grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <SpotlightCard className="rounded-xl p-5">
              <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-cyan-400">
                <CountUpStat value={14} delayMs={0} />
              </div>
              <div className="text-sm font-semibold text-white mt-1">Federated Websites</div>
              <div className="text-xs text-slate-400 mt-1">1 Core Portal + 13 Subsites on arithmo-edge.github.io</div>
            </SpotlightCard>
            <SpotlightCard className="rounded-xl p-5">
              <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-violet-400">
                <CountUpStat value={60} delayMs={220} />
              </div>
              <div className="text-sm font-semibold text-white mt-1">ELO Rank Titles</div>
              <div className="text-xs text-slate-400 mt-1">5 Core Arenas · 12 Tiers Each · (General + Expert) / 2</div>
            </SpotlightCard>
            <SpotlightCard className="rounded-xl p-5">
              <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-amber-400">
                <CountUpStat value={42} delayMs={440} />
              </div>
              <div className="text-sm font-semibold text-white mt-1">Specialized AI Engines</div>
              <div className="text-xs text-slate-400 mt-1">Gemini + Qwen-Math + SymPy + 24 QPRT-4 + 12 Forge</div>
            </SpotlightCard>
            <SpotlightCard className="rounded-xl p-5">
              <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-emerald-400">
                <CountUpStat value={0} suffix=" ELO" delayMs={660} />
              </div>
              <div className="text-sm font-semibold text-white mt-1">Sold or Gifted Ever</div>
              <div className="text-xs text-slate-400 mt-1">Subscriptions fund AI &amp; Labs; Patrons earn 0 ELO</div>
            </SpotlightCard>
          </div>

          <div className="ae-deep-grid grid lg:grid-cols-2 gap-6 items-stretch">
            <SpotlightCard className="rounded-2xl overflow-hidden flex flex-col">
              <div className="h-52 media-frame">
                <ResilientImage
                  src={MEDIA.homeSecurity}
                  alt="QPRT-4 live lockdown and zero-copy genome security"
                  loading="lazy"
                  accentColor="#00F0FF"
                />
              </div>
              <div className="p-6 flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-cyan-300">
                  <Lock className="w-4 h-4" />
                  <span>Full-Screen Contest Lockdown + Guest vs @handle</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Unrated Guest Access &amp; Verified @handle Security
                </h3>
                <p className="ae-prose text-justify text-sm text-slate-300 leading-relaxed">
                  Guests browse all 14 live standings freely and audit{' '}
                  <TechTooltip term="Find the Flaw">Find the Flaw</TechTooltip>. Registered{' '}
                  <code className="font-mono-tabular text-cyan-300">@handles</code> unlock rated competitions guarded by
                  mandatory Live Contest Full-Screen &amp; App/Tab Lockdown, optional Mon–Sat{' '}
                  <TechTooltip term="Module 7">Module 7</TechTooltip>, and Sunday Mega proctoring under{' '}
                  <TechTooltip term="QPRT-4">QPRT-4</TechTooltip>.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl overflow-hidden flex flex-col">
              <div className="h-52 media-frame">
                <ResilientImage
                  src={MEDIA.homeWallet}
                  alt="Closed-loop Arithmo Wallet checkout with 60-second grace cancellation"
                  loading="lazy"
                  accentColor="#8B5CF6"
                />
              </div>
              <div className="p-6 flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-violet-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Arithmo Wallet Checkout + 60s Grace Cancel</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Transparent Closed-Loop Billing &amp; Legal Shield
                </h3>
                <p className="ae-prose text-justify text-sm text-slate-300 leading-relaxed">
                  Lemon Squeezy and bKash/Nagad exclusively preload your closed-loop Arithmo Wallet (+10% top-up bonus).
                  Every checkout concludes with a 60-second Cancellation Grace countdown backed by Bangladesh PRC/e-TIN,
                  COPPA/GDPR-K, and EU DSA due process.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>
      </section>

      {/* Section 7: Pioneer Contributors Spotlight */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="07 · Founding Leadership & Custodianship"
            title="Pioneer Contributors Spotlight"
            accentClass="text-amber-300"
            action={
              <a href="pioneers.html" className="btn-cyber px-4 py-2.5 text-xs whitespace-nowrap">
                Read Full Pioneer Dossier &rarr;
              </a>
            }
          />

          <div className="ae-deep-grid grid lg:grid-cols-2 gap-6">
            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-4 border-cyan-400/30">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono-tabular text-xs text-cyan-300">
                  Co-Founder #1 · Reserved Title: Core System Architect
                </span>
                <span className="font-mono-tabular text-xs text-slate-400">60% Equity · 24-Mo Vesting</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Rayaan Tasnim</h3>
              <p className="text-xs font-medium text-cyan-200">Founder &amp; Chief System Architect (13 Years Old)</p>
              <p className="ae-prose text-justify text-sm text-slate-300 leading-relaxed">
                Architect of the <code className="font-mono-tabular text-cyan-300">Prime-Factor.app</code> pre-era into
                the 14-portal Arithmo-Edge network,{' '}
                <TechTooltip term="Arithmo-Core-SDK">Arithmo-Core-SDK (engine.js)</TechTooltip>,{' '}
                <TechTooltip term="QPRT-4">QPRT-4</TechTooltip> Quad-Phase Resilience Theory,{' '}
                <TechTooltip term="Module 7">Module 7</TechTooltip> biometrics, 42-engine AI routing, and Cloudflare
                Workers + Firebase edge orchestration.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-6 sm:p-8 space-y-4 border-violet-400/30">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono-tabular text-xs text-violet-300">
                  Co-Founder #2 · Reserved Title: Chief Mathematical Architect
                </span>
                <span className="font-mono-tabular text-xs text-slate-400">40% Equity · 24-Mo Vesting</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Jalees Habib</h3>
              <p className="text-xs font-medium text-violet-200">Co-Founder &amp; Chief Mathematical Engineer</p>
              <p className="ae-prose text-justify text-sm text-slate-300 leading-relaxed">
                Lead architect of Olympiad problem synthesis across all 5 core arenas, the Zero-Fragmentation Olympiad Tag
                policy, Proof-Based Grading + 2000+ ELO Grandmaster Peer Review, post-contest{' '}
                <code className="font-mono-tabular text-violet-300">Find the Flaw</code> audits, and the{' '}
                <code className="font-mono-tabular text-violet-300">5&times;4</code> Private Golden Vault co-authored
                with Rayaan Tasnim.
              </p>
            </SpotlightCard>
          </div>
          <div className="mt-6">
            <CyberMediaFrame
              src={MEDIA.homePioneers}
              alt="Founding Pioneer Contributors Rayaan Tasnim and Jalees Habib engineering collaboration"
              kicker="Guardian Financial Custodianship & Dual Architect Mandate"
              title="From Prime-Factor.app to Global Olympiad Infrastructure"
              summary="Combining full-stack serverless orchestration with rigorous Golden Vault problem authorship under immutable constitutional equity vesting and conflict-free contest rules."
              details={[
                'Anchored by 24-month founder equity vesting (60% Core System Architect Rayaan Tasnim, 40% Chief Mathematical Architect Jalees Habib), legal governance operates under Adult Guardian Financial Custodianship with strict PRC/e-TIN tax compliance.',
                'Co-Founders retain full HQ Competitor Privilege to participate in public rated rounds whenever strict author conflict-of-interest checks confirm zero prior exposure to Golden Vault problem drafts.',
              ]}
              accentColor="#F59E0B"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Section 8: Decimal Rollout Preview (V1.0–V4.0) */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/60">
        <ScrollReveal>
          <SectionHeader
            kicker="08 · Decimal Release Engineering Preview"
            title="Staged Decimal Rollout: V1.0 through V4.0 Grand Singularity"
            subtitle="Every production subsystem graduates in disciplined decimal waves culminating on Dec 31, 2026 Midnight—paired with our custom .com domain launch in 2 months."
            action={
              <a href="roadmap.html" className="btn-glass px-4 py-2 text-xs whitespace-nowrap">
                Full V1.0–V11.0+ Roadmap &amp; 8 Spin-Offs &rarr;
              </a>
            }
          />
          <div className="mb-6 rounded-2xl border border-cyan-400/25 overflow-hidden grid lg:grid-cols-12 items-stretch glass-panel">
            <div className="lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[190px] relative media-frame">
              <ResilientImage
                src={MEDIA.homeRollout}
                alt="Arithmo-Edge V1.0 through V4.0 Grand Singularity decimal release architecture"
                loading="lazy"
                accentColor="#00F0FF"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent" />
              <div className="absolute bottom-3.5 left-4 right-4 text-[11px] font-mono-tabular text-cyan-300">
                Dec 6 Core Build &rarr; Dec 16 V1.0 &rarr; Dec 31 V4.0 Singularity
              </div>
            </div>
            <div className="lg:col-span-8 p-6 sm:p-7 flex flex-col justify-center space-y-2.5">
              <div className="text-xs font-mono-tabular text-cyan-300">Four-Wave Decimal Production Cadence</div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                Engineered for Zero-Downtime Public Rollout on arithmo-edge.github.io &amp; Custom .com
              </h3>
              <p className="ae-prose text-justify text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every subsystem unlocks in audited increments across December 2026—starting with the 5 Core Arenas and
                Shadow Bot Gauntlet in V1.0, scaling through AI &amp; Academy SaaS in V2.0–V3.0, and activating full
                World Cup governance at Midnight Dec 31, 2026.
              </p>
              <p className="ae-prose text-justify text-xs sm:text-sm text-slate-300/95 leading-relaxed">
                Sequential decimal waves verify Firebase security rules, Cloudflare Edge PAT isolation, closed-loop
                Lemon Squeezy and bKash/Nagad wallet webhooks, and QPRT-4 ChronoVault failover under live concurrency
                before the custom <code className="font-mono-tabular text-cyan-300">.com</code> topology joins
                production within 2 months.
              </p>
            </div>
          </div>

          <div className="ae-bento-grid grid md:grid-cols-2 gap-6">
            {DECIMAL_ROLLOUT_PHASES.map((phase) => (
              <SpotlightCard key={phase.version} className="rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-mono-tabular font-bold" style={{color: phase.accentColor}}>
                    {phase.version}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{phase.title}</h3>
                  <div className="text-[11px] font-mono-tabular text-slate-400">{phase.window}</div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/80">
                    {phase.deliverables.map((d) => (
                      <li key={d}>· {d}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-[11px] font-mono-tabular text-slate-400 pt-2">{phase.scope}</div>
              </SpotlightCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 9: 12-Subpage Showcase Explorer & Commercial FAQ */}
      <section className="ae-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal>
          <SectionHeader
            kicker="09 · Complete 13-Page Flagship Navigation & FAQ"
            title="Explore Every Specialized Subsystem or Review Common Questions"
          />

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3.5">
              {[
                {href: 'why-arithmo.html', num: '02', title: 'Why Arithmo-Edge?', desc: 'Legacy vs. Arithmo matrix, ELO uniqueness & QPRT-4 fairness.'},
                {href: 'architecture.html', num: '03', title: '14-Site Architecture', desc: '14 portals, Cloudflare Workers, & BigInt Miller-Rabin.'},
                {href: 'arenas-elo.html', num: '04', title: '5 Arenas & 60 ELO Tiers', desc: '3-Button Contest Tab, 12 Shadow Bots & ELO simulator.'},
                {href: 'contests.html', num: '05', title: 'Contest Engine & Flaw Audit', desc: 'BdMO categories, 3-user quorum, 3-mode credits & World Cup.'},
                {href: 'ai-core.html', num: '06', title: '42-Engine AI Core', desc: 'Gemini + Qwen-Math + SymPy & Zero-Copy Genome.'},
                {href: 'security-qprt4.html', num: '07', title: 'QPRT-4 & Legal Shield', desc: 'Full-Screen App Lockdown, MBTS & 11-Flag Blackhole.'},
                {href: 'academies.html', num: '08', title: 'Academy Arena', desc: 'Founding 25% discount, Dual-Handles & KYB shield.'},
                {href: 'pricing.html', num: '09', title: 'Pricing & Wallet Checkout', desc: 'Wallet-only checkout, 60s grace & Shadow Bot packs.'},
                {href: 'socials-forge.html', num: '10', title: 'Socials, Forge & Guidebooks', desc: '5-Pillar Forge, 5×4 Golden Vault & Dual Guidebooks.'},
                {href: 'governance.html', num: '11', title: 'Headquarters & Patrons', desc: '5-Tier HQ Ladder, Prime Sovereigns & Patron Wall.'},
                {href: 'roadmap.html', num: '12', title: 'Decimal Rollout Roadmap', desc: 'Phase 0–V4.0 Dec 2026 calendar, Database & 8 spin-offs.'},
                {href: 'pioneers.html', num: '13', title: 'Pioneer Contributors', desc: 'Rayaan Tasnim, Jalees Habib & Prime-Factor legacy.'},
              ].map((sub) => (
                <SpotlightCard key={sub.href} asAnchorHref={sub.href} className="rounded-xl p-4 space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-cyan-400">
                    <span>Page {sub.num}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-cyan-300">{sub.title}</h3>
                  <p className="ae-prose text-justify text-xs text-slate-400 leading-relaxed">{sub.desc}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono-tabular text-cyan-300 uppercase">Commercial &amp; Architecture FAQ</div>
              <FaqAccordion items={HOME_FAQS} />
            </div>
          </div>
          <div className="mt-8">
            <CyberMediaFrame
              src={MEDIA.homeShowcase}
              alt="13-page Arithmo-Edge architecture, Olympiad arenas, and global showcase"
              kicker="Deep-Dive Flagship Showcase"
              title="Navigate Every Technical, Security & Commercial Blueprint"
              summary="Jump directly into QPRT-4 forensic containment, the 60-Tier Shadow Bot Gauntlet simulator, closed-loop Wallet checkout, or the 20-year Holding Group roadmap."
              details={[
                'Pages 02 through 13 document every constitutional rulebook—spanning the 10-point AoPS/MCQ comparison matrix, 14-site Arithmo-Core-SDK federation, 42 AI engines with semantic TokenMeter billing, and KYB Academy workspaces.',
                'Inspect full 5-Tier Monotonic HQ governance rules, Patronage safeguards, and the V5.0–V11.0+ roadmap linking Olympiad Edge toward the Arithmo Database archive and 8 future discipline spin-offs.',
              ]}
              accentColor="#10B981"
              reverse
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
