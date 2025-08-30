'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const CallToAction = dynamic(
  () => import('@/components/callToAction/CallToAction'),
  { ssr: true }
);

export default function CTAABout() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);

  const t = isEN
    ? {
        title: 'Take your business to the next level with Ikovaline',
        desc: 'Benefit from our expertise in digital marketing, SEO, advertising and tailored strategy to boost your visibility and hit your business goals.',
        textBtn: 'Contact us now!',
      }
    : {
        title:
          'Faites passer votre activité au niveau supérieur avec Ikovalines',
        desc: 'Bénéficiez de notre expertise en marketing digital, SEO, publicité et stratégie sur-mesure pour booster votre visibilité et atteindre vos objectifs business.',
        textBtn: 'Contactez-nous dès maintenant !',
      };

  return <CallToAction title={t.title} desc={t.desc} textBtn={t.textBtn} />;
}
