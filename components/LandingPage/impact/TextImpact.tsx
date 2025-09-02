'use client';

import dynamic from 'next/dynamic';
import type { Testimonial } from '@/components/ui/testimonial-slider';
import {
  IconRocket,
  IconChartLine,
  IconMapPin,
  IconRobot,
  IconTrophy,
  IconCertificate,
} from '@tabler/icons-react';

const TestimonialSlider = dynamic(() =>
  import('@/components/ui/testimonial-slider').then((m) => m.TestimonialSlider)
);

const data: Testimonial[] = [
  {
    icon: <IconRocket stroke={2} />,
    quote: 'Jusqu’à +30% de conversion après refonte.',
  },
  {
    icon: <IconChartLine stroke={2} />,
    quote: 'De 5 000 € à 20 000 € / mois avec IkoSystem.',
  },
  {
    icon: <IconMapPin stroke={2} />,
    quote: 'Top 3 Google Maps confirmé sur nos secteurs.',
  },
  {
    icon: <IconRobot stroke={2} />,
    quote: 'Intégration IA (ChatGPT, RAG) au service du ROI.',
  },
  {
    icon: <IconTrophy stroke={2} />,
    quote: 'Récompensés pour la qualité et la rapidité d’exécution.',
  },
  {
    icon: <IconCertificate stroke={2} />,
    quote: 'Certifié Google Search & Analytics.',
  },
];

export default function ComponentDemo() {
  return (
    <div className="relative w-full">
      <TestimonialSlider testimonials={data} autorotateMs={4200} />
    </div>
  );
}
