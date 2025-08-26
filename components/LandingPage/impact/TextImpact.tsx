'use client';

import { Component } from '@/components/ui/testimonial-slider';

const ComponentDemo = () => {
  const testimonials = [
    {
      emoji: '🚀',
      quote: 'Nos clients augmentent en moyenne de 30% leur conversion web',
    },
    {
      emoji: '📈',
      quote: 'De 5 000€/mois à 20 000€/mois grâce à notre IkoSystem',
    },
    { emoji: '📍', quote: 'Référencé dans le top 3 Google Maps' },
    { emoji: '🤖', quote: 'Présent sur ChatGPT et autres IA de recherche' },
    { emoji: '🏆', quote: 'Référencé meilleure agence sur Bark.com' },
    { emoji: '💯', quote: '＋99 recommandations clients' },
    { emoji: '✅', quote: 'Certifié Google Search et Google Analytics' },
  ];

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl  bg-white/70 p-4 backdrop-blur-2xl  dark:bg-neutral-950/50">
      <div className="mt-10 flex justify-center px-3 sm:px-8">
        <Component testimonials={testimonials} />
      </div>
    </div>
  );
};

export default ComponentDemo;
