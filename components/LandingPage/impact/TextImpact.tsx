'use client';

import { usePathname } from 'next/navigation';
import { Component } from '@/components/ui/testimonial-slider';

const testimonialsFR = [
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

const testimonialsEN = [
  {
    emoji: '🚀',
    quote: 'Our clients increase web conversion by 30% on average',
  },
  { emoji: '📈', quote: 'From €5,000/mo to €20,000/mo with our IkoSystem' },
  { emoji: '📍', quote: 'Ranked in Google Maps top 3' },
  { emoji: '🤖', quote: 'Featured on ChatGPT and other AI search tools' },
  { emoji: '🏆', quote: 'Rated best agency on Bark.com' },
  { emoji: '💯', quote: '99+ client recommendations' },
  { emoji: '✅', quote: 'Google Search and Google Analytics certified' },
];

export default function ComponentDemo() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  const testimonials = isEN ? testimonialsEN : testimonialsFR;

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl bg-white/70 p-4 backdrop-blur-2xl dark:bg-neutral-950/50">
      <div className="mt-10 flex justify-center px-3 sm:px-8">
        {/* key pour forcer le reset du slider quand la langue change */}
        <Component key={isEN ? 'en' : 'fr'} testimonials={testimonials} />
      </div>
    </div>
  );
}
