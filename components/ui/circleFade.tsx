'use client';
import React from 'react';

export default function CircleFade() {
  return (
    <div
      className={[
        'absolute inset-0 pointer-events-none',
        // Vars par défaut (clair)
        '[--fade-x:50%] [--fade-y:40%] [--fade-mid:50%] [--fade-edge:rgba(255,255,255,1)] [--fade-end:60%]',
        // Ajustements en dark : halo plus doux et plus sombre
        'dark:[--fade-edge:rgba(0,0,0,0.7)] dark:[--fade-mid:48%] dark:[--fade-end:65%]',
      ].join(' ')}
      style={{
        background: `radial-gradient(
          circle at var(--fade-x) var(--fade-y),
          transparent var(--fade-mid),
          var(--fade-edge) var(--fade-end)
        )`,
      }}
      aria-hidden
    />
  );
}
