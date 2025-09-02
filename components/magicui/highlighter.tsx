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
  /** Classes appliquées au wrapper */
  className?: string;

  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  /** Démarrer seulement quand l’élément entre en vue */
  isView?: boolean;

  /** Forcer une boîte stable (line-height, display…) */
  baselineFix?: boolean;
  /**
   * Ajustement fin vertical en px (positif = descend le surlignage visuellement)
   * Utilise un padding-bottom interne pour faire “descendre” la boîte.
   */
  baselineOffset?: number;

  /** Empêche le retour à la ligne (pratique pour un seul mot) */
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
  isView = false,
  baselineFix = true,
  baselineOffset = 0, // ex: 1 ou 2 si ça remonte un peu chez toi
  noWrap = false,
}: HighlighterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const annRef = useRef<ReturnType<typeof annotate> | null>(null);
  const inView = useInView(elRef, { once: true, margin: '-10%' });

  const shouldShow = !isView || inView;

  // Crée/rafraîchit l’annotation (attend un frame pour laisser le layout se stabiliser)
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

  // (1) Création quand visible / quand props clés changent
  useLayoutEffect(() => {
    if (!shouldShow) return;
    // attend un frame + encore un (fonts/layout)
    const id = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(createAnnotation);
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  // (2) Re-crée si la taille du contenu change (changement de police, weight, responsive…)
  useEffect(() => {
    if (!shouldShow || !elRef.current) return;
    const ro = new ResizeObserver(() => {
      // évite de spammer reflow si caché
      if (elRef.current && elRef.current.isConnected) {
        createAnnotation();
      }
    });
    ro.observe(elRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow]);

  // Cleanup
  useEffect(() => {
    return () => annRef.current?.remove();
  }, []);

  const base = [
    'relative',
    'bg-transparent',
    // important pour une boîte stable
    baselineFix ? 'inline-block leading-none align-middle' : 'inline',
    noWrap ? 'whitespace-nowrap' : '',
    baselineOffset ? `pb-[${baselineOffset}px]` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={elRef} className={base}>
      {children}
    </span>
  );
}
