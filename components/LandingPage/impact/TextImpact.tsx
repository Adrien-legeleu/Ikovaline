'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Testimonial } from '@/components/ui/testimonial-slider';

// ✅ on garde le dynamic import mais sans `ssr: false`
const TestimonialSlider = dynamic(
  () =>
    import('@/components/ui/testimonial-slider').then(
      (m) => m.TestimonialSlider
    ),
  {
    loading: () => (
      <div
        className="mx-auto mt-10 h-[200px] w-[92%] max-w-4xl animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800"
        aria-hidden
      />
    ),
  }
);

const testimonialsFR: Testimonial[] = [
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

const testimonialsEN: Testimonial[] = [
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
    <div className="relative h-[420px] w-full rounded-2xl bg-white/70 p-4 dark:bg-neutral-950/50">
      {/* halo sombre haut */}
      <div className="absolute top-0 left-0 h-32 w-full -translate-y-2/3 bg-gradient-to-t from-black/60 to-transparent dark:block hidden" />

      {/* slider */}
      <div className="mt-10 flex justify-center">
        <TestimonialSlider
          key={isEN ? 'en' : 'fr'}
          testimonials={testimonials}
        />
      </div>
    </div>
  );
}
