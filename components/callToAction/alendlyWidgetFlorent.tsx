'use client';
import { useEffect } from 'react';

export default function CalendlyWidgetFlorent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full h-full rounded-[3rem] overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] bg-white"
      // ✅ Personnalisation complète via URL
      data-url="https://calendly.com/florent-ghizzoni/meeting?text_color=1f1f1f&primary_color=2CB7FF&background_color=ffffff"
      style={{
        minWidth: '320px',
        height: '700px',
        border: 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    />
  );
}
