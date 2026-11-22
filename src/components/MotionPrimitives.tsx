import React, {useEffect, useRef, useState} from 'react';
import {motion, MotionConfig} from 'motion/react';

export const MotionProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};

export const HeroReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({children, delay = 0, className = ''}) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 18}}
      animate={{opacity: 1, y: 0}}
      transition={{type: 'spring', stiffness: 220, damping: 24, delay}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({children, delay = 0, className = ''}) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.08}}
      transition={{type: 'spring', stiffness: 220, damping: 24, delay}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface CountUpStatProps {
  value: number;
  startValue?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  delayMs?: number;
  useGrouping?: boolean;
  className?: string;
}

export const CountUpStat: React.FC<CountUpStatProps> = ({
  value,
  startValue = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 950,
  delayMs = 0,
  useGrouping = true,
  className = '',
}) => {
  const elRef = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState<number>(startValue);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      startedRef.current = true;
      setDisplayValue(value);
      return;
    }

    if (startedRef.current) {
      setDisplayValue(value);
      return;
    }

    let delayTimer: number | undefined;
    let rafId: number | undefined;

    const runAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (value === startValue) {
        setDisplayValue(value);
        return;
      }

      delayTimer = window.setTimeout(() => {
        const startTime = performance.now();
        const delta = value - startValue;

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / durationMs);
          const eased = 1 - Math.pow(1 - progress, 3);
          const next = startValue + delta * eased;
          setDisplayValue(progress >= 1 ? value : next);
          if (progress < 1) {
            rafId = window.requestAnimationFrame(tick);
          }
        };

        rafId = window.requestAnimationFrame(tick);
      }, delayMs);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runAnimation();
          observer.disconnect();
        }
      },
      {threshold: 0.06},
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (delayTimer !== undefined) window.clearTimeout(delayTimer);
      if (rafId !== undefined) window.cancelAnimationFrame(rafId);
    };
  }, [value, startValue, durationMs, delayMs]);

  const formatNum = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    const rounded = Math.round(num);
    return useGrouping ? rounded.toLocaleString('en-US') : String(rounded);
  };

  return (
    <span ref={elRef} className={`font-mono-tabular ${className}`}>
      {prefix}
      {formatNum(displayValue)}
      {suffix}
    </span>
  );
};

export const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  asAnchorHref?: string;
  enableTilt?: boolean;
}> = ({children, className = '', asAnchorHref, enableTilt = true}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [canHoverTilt, setCanHoverTilt] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanHoverTilt(fineHover && !reduced && enableTilt);
  }, [enableTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
    target.style.setProperty('--glare-x', `${x}px`);
    target.style.setProperty('--glare-y', `${y}px`);

    if (canHoverTilt && rect.width > 0 && rect.height > 0) {
      const nx = x / rect.width - 0.5;
      const ny = y / rect.height - 0.5;
      const rotateY = (nx * 13).toFixed(2);
      const rotateX = (-ny * 13).toFixed(2);
      target.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.018, 1.018, 1.018)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  if (asAnchorHref) {
    return (
      <motion.a
        href={asAnchorHref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{y: -3, scale: 1.02}}
        whileTap={{scale: 0.985}}
        transition={{type: 'spring', stiffness: 260, damping: 20, mass: 0.9}}
        className={`spotlight-card block ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{y: -2}}
      transition={{type: 'spring', stiffness: 260, damping: 20, mass: 0.9}}
      className={`spotlight-card ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const ResilientImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  accentColor?: string;
}> = ({src, alt, className = '', loading = 'lazy', accentColor = '#00F0FF'}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-950 ${className}`}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
        >
          <defs>
            <linearGradient id="ae-react-holo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#03050c" />
              <stop offset="55%" stopColor="#0d172e" />
              <stop offset="100%" stopColor="#140c2a" />
            </linearGradient>
            <pattern id="ae-react-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path
                d="M 36 0 L 0 0 0 36"
                fill="none"
                stroke={accentColor}
                strokeOpacity="0.18"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="800" height="450" fill="url(#ae-react-holo)" />
          <rect width="800" height="450" fill="url(#ae-react-grid)" />
          <line x1="80" y1="40" x2="720" y2="410" stroke={accentColor} strokeOpacity="0.16" />
          <line x1="720" y1="40" x2="80" y2="410" stroke="#8b5cf6" strokeOpacity="0.18" />
          <circle
            cx="400"
            cy="225"
            r="142"
            fill="none"
            stroke={accentColor}
            strokeOpacity="0.28"
            strokeDasharray="6 6"
          />
          <circle cx="400" cy="225" r="84" fill="none" stroke="#8b5cf6" strokeOpacity="0.32" />
        </svg>
        <div className="relative z-10 px-4 text-center">
          <div className="font-mono-tabular text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Arithmo-Edge Visual Module
          </div>
          <div className="mt-1 text-xs text-slate-300">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={loading === 'eager' ? 'high' : undefined}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const CyberMediaFrame: React.FC<{
  src: string;
  alt: string;
  kicker?: string;
  title?: string;
  summary?: string;
  details?: string[];
  accentColor?: string;
  className?: string;
  reverse?: boolean;
}> = ({
  src,
  alt,
  kicker,
  title,
  summary,
  details,
  accentColor = '#00F0FF',
  className = '',
  reverse = false,
}) => {
  const hasCopy = Boolean(kicker || title || summary || (details && details.length > 0));
  if (!hasCopy) {
    return (
      <div
        data-3d-parallax="true"
        className={`ae-media-cyber rounded-2xl overflow-hidden relative aspect-[16/10] ${className}`}
      >
        <ResilientImage src={src} alt={alt} loading="lazy" accentColor={accentColor} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050c] via-transparent to-transparent z-[3]" />
      </div>
    );
  }

  return (
    <div
      data-3d-reveal="true"
      className={`glass-panel rounded-2xl overflow-hidden grid lg:grid-cols-12 items-stretch border border-slate-800/80 ${className}`}
    >
      <div
        className={`lg:col-span-4 aspect-[16/10] lg:aspect-auto min-h-[190px] relative ae-media-cyber ${
          reverse ? 'lg:order-2' : ''
        }`}
      >
        <div data-3d-parallax="true" data-3d-parallax-depth="16" className="h-full w-full">
          <ResilientImage src={src} alt={alt} loading="lazy" accentColor={accentColor} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050c] via-[#03050c]/30 to-transparent z-[3]" />
      </div>
      <div className={`lg:col-span-8 p-6 sm:p-7 flex flex-col justify-center space-y-2.5 ${reverse ? 'lg:order-1' : ''}`}>
        {kicker && (
          <div className="text-xs font-mono-tabular font-semibold" style={{color: accentColor}}>
            {kicker}
          </div>
        )}
        {title && <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">{title}</h3>}
        {summary && (
          <p className="ae-prose text-justify text-xs sm:text-sm text-slate-300 leading-relaxed">{summary}</p>
        )}
        {details &&
          details.map((paragraph, idx) => (
            <p key={idx} className="ae-prose text-justify text-xs sm:text-sm text-slate-300/95 leading-relaxed">
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
};
