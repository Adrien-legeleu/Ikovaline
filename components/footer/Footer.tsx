'use client';
import React from 'react';
import { TextHoverEffect } from '../ui/text-hover-effect';
import Link from 'next/link';
import Image from 'next/image';
import IkovalineLogo from '@/public/images/logo/ikovaline_logo.png';
import IkovalineLogoDark from '@/public/images/logo/ikovaline_logo_dark.png';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function Footer() {
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);

  const footerLinks = isEN
    ? [
        {
          title: 'Home',
          href: '/',
          links: [
            { label: 'About Us', href: '/#about' },
            { label: 'Our Services', href: '/#services' },
            { label: 'Testimonials', href: '/#review' },
          ],
        },
        {
          title: 'Services',
          href: '/nos-services',
          links: [
            {
              label: 'Business Development',
              href: '/nos-services/#buisness-developpement',
            },
            {
              label: 'Digital Development',
              href: '/nos-services/#developpement-digital',
            },
            { label: 'Why Choose Us?', href: '/nos-services/#pourquoi-nous' },
          ],
        },
        {
          title: 'About',
          href: '/about',
          links: [
            { label: 'Our Story', href: '/about/#notre-histoire' },
            { label: 'Our Team', href: '/about/#notre-equipe' },
            { label: 'Our Vision', href: '/about/#notre-vision' },
          ],
        },
        {
          title: 'Legal',
          href: '/mentions-legales',
          links: [
            { label: 'Legal Notice', href: '/mentions-legales' },
            { label: 'Privacy Policy', href: '/politique-confidentialite' },
          ],
        },
      ]
    : [
        {
          title: 'Accueil',
          href: '/',
          links: [
            { label: 'À Propos', href: '/#about' },
            { label: 'Nos Services', href: '/#services' },
            { label: 'Témoignages', href: '/#review' },
          ],
        },
        {
          title: 'Nos Services',
          href: '/nos-services',
          links: [
            {
              label: 'Business Développement',
              href: '/nos-services/#buisness-developpement',
            },
            {
              label: 'Développement Digital',
              href: '/nos-services/#developpement-digital',
            },
            { label: 'Pourquoi-Nous ?', href: '/nos-services/#pourquoi-nous' },
          ],
        },
        {
          title: 'À Propos',
          href: '/about',
          links: [
            { label: 'Notre Histoire', href: '/about/#notre-histoire' },
            { label: 'Notre Équipe', href: '/about/#notre-equipe' },
            { label: 'Notre Vision', href: '/about/#notre-vision' },
          ],
        },
        {
          title: 'Légal',
          href: '/mentions-legales',
          links: [
            { label: 'Mentions légales', href: '/mentions-legales' },
            {
              label: 'Politique de confidentialité',
              href: '/politique-confidentialite',
            },
          ],
        },
      ];

  return (
    <div className="md:py-16 py-32 px-2 ">
      <div className="lg:h-[16rem] h-[12rem] hidden md:flex items-center justify-center">
        <TextHoverEffect text="IKOVALINE" />
      </div>

      <div className="grid sm:grid-cols-40/60 max-w-5xl mx-auto grid-cols-1 px-2 max-sm:gap-10 text-left max-lg:items-center justify-center">
        <div className="flex justify-left w-full ">
          <div className="space-y-5">
            <h2 className="text-4xl font-semibold flex items-center max-sm:justify-center">
              <Image
                src={IkovalineLogoDark}
                alt="Ikovaline logo"
                width={150}
                height={150}
                className="min-h-10 w-auto dark:block hidden relative right-1 object-contain"
              />
              <Image
                src={IkovalineLogo}
                alt="Ikovaline logo"
                width={150}
                height={150}
                className="min-h-10 w-auto dark:hidden block relative right-1 object-contain"
              />
            </h2>
            <div className="space-y-2">
              <p className="text-neutral-600 dark:text-white">07 85 90 22 38</p>
              <p className="text-neutral-600 dark:text-white">
                contact@ikovaline.com
              </p>
              <p className="text-neutral-600 dark:text-white">
                {isEN
                  ? 'Headquarters: Bailly-Romainvilliers'
                  : 'Siège social : Bailly-Romainvilliers'}
              </p>
              <p>© {new Date().getFullYear()} Ikovaline</p>
            </div>
          </div>
        </div>
        <ul className="grid lg:grid-cols-4 grid-cols-2 text-left gap-3 xs:gap-5">
          {footerLinks.map((section, index) => (
            <ul key={index} className="space-y-2">
              <li className="text-neutral-600 dark:text-neutral-300 font-bold">
                <Link
                  href={section.href}
                  className="hover:text-neutral-800 dark:hover:text-neutral-600"
                >
                  {section.title}
                </Link>
              </li>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </ul>
      </div>
    </div>
  );
}
