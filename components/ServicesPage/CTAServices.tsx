'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const CallToAction = dynamic(
  () => import('@/components/callToAction/CallToAction'),
  { ssr: true }
);

export default function CTAServices() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);

  const t = isEN
    ? {
        title: 'Take action now!',
        desc: "Attract more customers, increase your sales, and grow your brand awareness. With Ikovaline, it's possible.",
        textBtn: 'Start your project',
      }
    : {
        title: 'Passez à l’action maintenant !',
        desc: 'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible.',
        textBtn: 'Lancez votre projet !',
      };

  return <CallToAction title={t.title} desc={t.desc} textBtn={t.textBtn} />;
}
