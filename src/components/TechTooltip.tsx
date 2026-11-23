import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {TECH_GLOSSARY, GlossaryTermId} from '../data/glossary';

interface TechTooltipProps {
  term: GlossaryTermId;
  children?: React.ReactNode;
  className?: string;
}

interface PopoverCoords {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}

export const TechTooltip: React.FC<TechTooltipProps> = ({term, children, className = ''}) => {
  const entry = TECH_GLOSSARY[term];
  const tooltipId = useId().replace(/:/g, '');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLSpanElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords>({top: 0, left: 16, placement: 'top'});

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger || typeof window === 'undefined') return;
    const rect = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const panelWidth = Math.min(304, vw - 24);
    const panelHeight = panelRef.current?.offsetHeight || 136;
    const gap = 10;

    const spaceAbove = rect.top;
    const spaceBelow = vh - rect.bottom;
    const placement: 'top' | 'bottom' =
      spaceAbove >= panelHeight + gap + 12 || spaceAbove >= spaceBelow ? 'top' : 'bottom';

    const rawTop = placement === 'top' ? rect.top - panelHeight - gap : rect.bottom + gap;
    const clampedTop = Math.max(12, Math.min(vh - panelHeight - 12, rawTop));

    const idealLeft = rect.left + rect.width / 2 - panelWidth / 2;
    const clampedLeft = Math.max(12, Math.min(vw - panelWidth - 12, idealLeft));

    setCoords({top: clampedTop, left: clampedLeft, placement});
  }, []);

  const openNow = useCallback(() => {
    clearCloseTimer();
    setIsOpen(true);
    window.requestAnimationFrame(updatePosition);
  }, [clearCloseTimer, updatePosition]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 120);
  }, [clearCloseTimer]);

  useEffect(() => {
    setIsMounted(true);
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearCloseTimer();
        setIsOpen(false);
        triggerRef.current?.blur();
      }
    };

    const handleOutsidePointer = (e: Event) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    window.addEventListener('scroll', updatePosition, {passive: true});
    window.addEventListener('resize', updatePosition, {passive: true});
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleOutsidePointer, true);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleOutsidePointer, true);
    };
  }, [isOpen, updatePosition, clearCloseTimer]);

  const popoverMarkup = (
    <span
      ref={panelRef}
      id={tooltipId}
      role="tooltip"
      data-tech-tooltip-panel={term}
      data-placement={coords.placement}
      aria-hidden={!isOpen}
      hidden={!isOpen}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={scheduleClose}
      style={
        isMounted
          ? {
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: 'min(19rem, calc(100vw - 1.5rem))',
              borderColor: `${entry.accentColor}66`,
            }
          : undefined
      }
      className={`ae-tooltip-panel ${isOpen ? 'is-open' : 'hidden'}`}
    >
      <span className="ae-tooltip-kicker" style={{color: entry.accentColor}}>
        {entry.category}
      </span>
      <span className="ae-tooltip-title">{entry.term}</span>
      <span className="ae-tooltip-body">{entry.definition}</span>
    </span>
  );

  return (
    <span className={`ae-tooltip-wrap ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        data-tech-tooltip={term}
        aria-describedby={tooltipId}
        aria-expanded={isOpen}
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
        onFocus={openNow}
        onBlur={scheduleClose}
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) {
            setIsOpen(false);
          } else {
            openNow();
          }
        }}
        style={{'--ae-tip-accent': entry.accentColor} as React.CSSProperties}
        className="ae-tooltip-trigger"
      >
        <span>{children ?? entry.term}</span>
        <svg
          className="ae-tooltip-icon"
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6.25" />
          <path d="M8 7.25v3.5" strokeLinecap="round" />
          <circle cx="8" cy="5" r="0.65" fill="currentColor" stroke="none" />
        </svg>
      </button>
      {isMounted && typeof document !== 'undefined' ? createPortal(popoverMarkup, document.body) : popoverMarkup}
    </span>
  );
};
