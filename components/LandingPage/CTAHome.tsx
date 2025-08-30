'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const CallToAction = dynamic(
  () => import('@/components/callToAction/CallToAction'),
  { ssr: true }
);

export default function CTAHome() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);

  const t = isEN
    ? {
        title: 'Boost your online visibility today!',
        desc: 'With Ikovaline, level up your digital strategy—SEO, website, paid ads and more. Contact us to turn goals into real results.',
        textBtn: 'Get started now!',
      }
    : {
        title: "Améliorez votre visibilité en ligne dès aujourd'hui !",
        desc: 'Avec Ikovaline, boostez votre stratégie digitale : SEO, site web, campagnes publicitaires et plus. Contactez-nous pour transformer vos objectifs en résultats concrets.',
        textBtn: 'Commencez maintenant !',
      };

  return <CallToAction title={t.title} desc={t.desc} textBtn={t.textBtn} />;
}
