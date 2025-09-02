// components/magicui/highlighter.tsx
'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { annotate } from 'rough-notation';

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

interface HighlighterProps {
  children: React.ReactNode;
  className?: string;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  /** Conserve une boîte stable si besoin (garde inline-block) */
  baselineFix?: boolean;
  /** Décalage vertical fin en px (descend visuellement le surlignage) */
  baselineOffset?: number;
  /** Empêche le retour à la ligne pour un seul mot */
  noWrap?: boolean;
}

export function Highlighter({
  children,
  className,
  action = 'highlight',
  color = '#ffd1dc',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = true,
  baselineFix = false, // ⚠️ par défaut: inline (évite les bugs de hauteur 0)
  baselineOffset = 0,
  noWrap = false,
}: HighlighterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const annRef = useRef<ReturnType<typeof annotate> | null>(null);
  const inView = useInView(elRef, { once: true, margin: '-8%' });

  const shouldShow = !isView || inView;

  const createAnnotation = () => {
    const el = elRef.current;
    if (!el) return;
    annRef.current?.remove();

    const inst = annotate(el, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    annRef.current = inst;
    inst.show();
  };

  // attend 2 frames (layout + fonts) avant de dessiner
  useLayoutEffect(() => {
    if (!shouldShow) return;
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(createAnnotation);
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow, action, color, strokeWidth, animationDuration, iterations, padding, multiline]);

  // reposition si la taille change (responsive, fonts, etc.)
  useEffect(() => {
    if (!shouldShow || !elRef.current) return;
    const ro = new ResizeObserver(() => {
      if (elRef.current?.isConnected) createAnnotation();
    });
    ro.observe(elRef.current);
    // re-crée aussi après un resize fenêtre (utile sur mobile)
    const onResize = () => createAnnotation();
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow]);

  useEffect(() => () => annRef.current?.remove(), []);

  const classes = [
    'relative bg-transparent align-baseline',
    baselineFix ? 'inline-block' : 'inline',
    noWrap ? 'whitespace-nowrap' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      ref={elRef}
      className={classes}
      style={baselineOffset ? { paddingBottom: baselineOffset } : undefined}
    >
      {children}
    </span>
  );
}
