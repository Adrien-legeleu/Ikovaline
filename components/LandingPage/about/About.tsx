'use client';
import Link from 'next/link';
import { AnimatedTooltip } from '../../ui/animated-tooltip';
import Img1 from '@/public/images/About/team-florent-profil.jpg';
import Img2 from '@/public/images/About/team-chiara-profil.jpg';
import Img4 from '@/public/images/About/team-lea-profil.jpg';
import Img5 from '@/public/images/About/team-lucille-profil.jpg';
import Img6 from '@/public/images/About/team-adrien-profil.png';
import Img7 from '@/public/images/About/team-morgan-profil.jpg';
import Img8 from '@/public/images/About/team-victor-profil.jpg';
import Img9 from '@/public/images/About/team-rafeal-profil.jpg';

import { AnimatedBorderButton } from '@/components/ui/animated-border-button';
import { MagicText } from '@/components/magicui/MagicText';

export default function About() {
  const people1 = [
    {
      id: 1,
      name: 'Florent Ghizzoni',
      designation: 'PDG Ikovaline',
      image: Img1,
      alt: "Florent Ghizzoni, PDG d'Ikovaline, expert en transformation numérique et marketing digital",
    },
    {
      id: 2,
      name: 'Adrien Legeleux',
      designation: 'Directeur Web Développement',
      image: Img6,
      alt: "Adrien Legeleux, Directeur Web Développement d'Ikovaline, expert en solutions web modernes",
    },
    {
      id: 3,
      name: 'Victor Biaujaud',
      designation: 'Manager Principal',
      image: Img8,
      alt: "Victor Biaujaud, Manager Principal d'Ikovaline, expert en gestion d'équipe et en stratégie de développement commercial",
    },
    {
      id: 4,
      name: 'Morgan Jardin',
      designation: 'Commercial',
      image: Img7,
      alt: 'Morgan Jardin, Commercial chez Ikovaline, spécialiste en conseil client et développement des ventes',
    },
  ];

  // People2
  const people2 = [
    {
      id: 5,
      name: 'Rafeal Bory',
      designation: 'Commercial',
      image: Img9,
      alt: 'Rafeal Bory, Commercial chez Ikovaline, spécialiste en conseil client et développement des ventes',
    },
    {
      id: 6,
      name: 'Chiara Pinto Perez',
      designation: 'Directrice marketing',
      image: Img2,
      alt: "Chiara Pinto Perez, Directrice Marketing d'Ikovaline, experte en stratégie marketing digital",
    },
    {
      id: 7,
      name: 'Léa Moura Pinto',
      designation: 'Directrice Communication',
      image: Img4,
      alt: "Léa Moura Pinto, Directrice Communication d'Ikovaline, experte en communication digitale",
    },
    {
      id: 8,
      name: 'Lucille Legoaec',
      designation: 'Directrice R&D Technologique',
      image: Img5,
      alt: "Lucille Legoaec, Directrice R&D d'Ikovaline, experte en innovation numérique et tech",
    },
  ];

  const words = `
  Ikovaline, c'est l'agence 100 % étudiante qui transforme vos idées en clients. Nous concevons des sites web sur mesure, pensés pour performer et s'adapter à votre activité. Chez Ikovaline, chaque projet bénéficie d'un accompagnement transparent, d'un développement rapide et efficace, d'un référencement optimisé, et surtout, d’un suivi garanti pendant 13 mois.
`;

  return (
    <div
      className="py-20 gap-10  max-w-3xl lg:max-w-4xl flex flex-col mx-auto relative items-center justify-center"
      id="about"
    >
      <MagicText text={words} />
      <div className="space-y-2 relative right-2 ">
        <div className="flex sm:flex-row items-center justify-center  gap-2  w-full">
          <AnimatedTooltip items={people1} />
        </div>
        <div className="flex sm:flex-row items-center justify-center   w-full">
          <AnimatedTooltip items={people2} />
        </div>
      </div>

      <Link href={'/about'}>
        <AnimatedBorderButton>En savoir plus</AnimatedBorderButton>
      </Link>
    </div>
  );
}
