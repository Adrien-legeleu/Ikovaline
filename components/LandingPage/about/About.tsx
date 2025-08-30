'use client';
import { usePathname } from 'next/navigation';
import { AnimatedTooltip } from '../../ui/animated-tooltip';
import Img1 from '@/public/images/About/team-florent-profil.jpg';
import Img2 from '@/public/images/About/team-chiara-profil.jpg';
import Img4 from '@/public/images/About/team-lea-profil.jpg';
import Img5 from '@/public/images/About/team-lucille-profil.jpg';
import Img6 from '@/public/images/About/team-adrien-profil.png';
import Img7 from '@/public/images/About/team-morgan-profil.jpg';
import Img8 from '@/public/images/About/team-victor-profil.jpg';
import Img9 from '@/public/images/About/team-rafeal-profil.jpg';

import { MagicText } from '@/components/magicui/MagicText';
import { LiquidLink } from '@/components/ui/liquid-link';
import { IconInfoCircle } from '@tabler/icons-react';

import fr from '/i18n-ovverrides/fr.json';
import en from '/i18n-ovverrides/en.json';
import { StaticImageData } from 'next/image';

type Person = {
  id: number;
  name: string;
  designation: string;
  image: StaticImageData | string;
  alt: string;
};

function useLocale() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  return { isEN, pathname };
}

function localizeHref(href: string, isEN: boolean) {
  if (!isEN) return href;
  if (/^(https?:)?\/\//.test(href)) return href;
  if (/^\/en(\/|$)/.test(href)) return href;
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href}`;
  return href.startsWith('/') ? `/en${href}` : `/en/${href}`;
}

export default function About() {
  const { isEN } = useLocale();
  const dict = isEN ? en.about : fr.about;

  // ——— Team (désignations + alt localisés) ———
  const people1: Person[] = [
    {
      id: 1,
      name: 'Florent Ghizzoni',
      designation: isEN ? 'CEO, Ikovaline' : 'PDG Ikovaline',
      image: Img1,
      alt: isEN
        ? 'Florent Ghizzoni, CEO of Ikovaline, expert in digital transformation and marketing'
        : "Florent Ghizzoni, PDG d'Ikovaline, expert en transformation numérique et marketing digital",
    },
    {
      id: 2,
      name: 'Adrien Legeleux',
      designation: isEN
        ? 'Head of Web Development'
        : 'Directeur Web Développement',
      image: Img6,
      alt: isEN
        ? 'Adrien Legeleux, Head of Web Development at Ikovaline, expert in modern web solutions'
        : "Adrien Legeleux, Directeur Web Développement d'Ikovaline, expert en solutions web modernes",
    },
    {
      id: 3,
      name: 'Victor Biaujaud',
      designation: isEN ? 'Senior Manager' : 'Manager Principal',
      image: Img8,
      alt: isEN
        ? 'Victor Biaujaud, Senior Manager at Ikovaline, expert in team leadership and business growth'
        : "Victor Biaujaud, Manager Principal d'Ikovaline, expert en gestion d'équipe et développement commercial",
    },
    {
      id: 4,
      name: 'Morgan Jardin',
      designation: isEN ? 'Sales' : 'Commercial',
      image: Img7,
      alt: isEN
        ? 'Morgan Jardin, Sales at Ikovaline, specialist in client advisory and sales development'
        : 'Morgan Jardin, Commercial chez Ikovaline, spécialiste en conseil client et développement des ventes',
    },
  ];

  const people2: Person[] = [
    {
      id: 5,
      name: 'Rafeal Bory',
      designation: isEN ? 'Sales' : 'Commercial',
      image: Img9,
      alt: isEN
        ? 'Rafeal Bory, Sales at Ikovaline, specialist in client advisory and sales growth'
        : 'Rafeal Bory, Commercial chez Ikovaline, spécialiste en conseil client et développement des ventes',
    },
    {
      id: 6,
      name: 'Chiara Pinto Perez',
      designation: isEN ? 'Marketing Director' : 'Directrice marketing',
      image: Img2,
      alt: isEN
        ? 'Chiara Pinto Perez, Marketing Director at Ikovaline, expert in digital marketing strategy'
        : "Chiara Pinto Perez, Directrice Marketing d'Ikovaline, experte en stratégie marketing digital",
    },
    {
      id: 7,
      name: 'Léa Moura Pinto',
      designation: isEN
        ? 'Communications Director'
        : 'Directrice Communication',
      image: Img4,
      alt: isEN
        ? 'Léa Moura Pinto, Communications Director at Ikovaline, expert in digital communications'
        : "Léa Moura Pinto, Directrice Communication d'Ikovaline, experte en communication digitale",
    },
    {
      id: 8,
      name: 'Lucille Legoaec',
      designation: isEN
        ? 'Director of Technology R&D'
        : 'Directrice R&D Technologique',
      image: Img5,
      alt: isEN
        ? 'Lucille Legoaec, Director of Technology R&D at Ikovaline, expert in digital innovation and tech'
        : "Lucille Legoaec, Directrice R&D d'Ikovaline, experte en innovation numérique et tech",
    },
  ];

  return (
    <div
      id="about"
      className="relative mx-auto flex max-w-3xl flex-col items-center justify-center gap-10 py-20 lg:max-w-4xl"
    >
      {/* Paragraphe animé (localisé) */}
      <MagicText text={dict.paragraph} />

      {/* Avatars */}
      <div className="relative right-2 space-y-2">
        <div className="flex w-full items-center justify-center gap-2 sm:flex-row">
          <AnimatedTooltip items={people1} />
        </div>
        <div className="flex w-full items-center justify-center sm:flex-row">
          <AnimatedTooltip items={people2} />
        </div>
      </div>

      {/* CTA */}
      <LiquidLink href={localizeHref('/about', isEN)} className="z-10">
        <span className="flex items-center justify-center gap-2">
          <span aria-hidden="true">
            <IconInfoCircle />
          </span>
          {dict.ctaMore}
        </span>
      </LiquidLink>
    </div>
  );
}
