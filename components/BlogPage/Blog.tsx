'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { usePathname } from 'next/navigation';

/* ----------------------- Types + helpers i18n ----------------------- */
export interface BlogType {
  date: string;
  slug: string;
  img: string;
  by: string;
  title: string;
  desc: string;
}

type BlogI18n = {
  date: string;
  slug: string;
  img: string;
  by: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
};

const pick = (isEN: boolean, fr: string, en: string) => (isEN ? en : fr);

/* ----------------------------- Données ------------------------------ */
const currentYear = new Date().getFullYear();

/** Données bilingues (FR/EN) — on sélectionne au rendu */
const DATA_BLOG_I18N: BlogI18n[] = [
  {
    date: '2025-08-05',
    slug: 'creation-site-web-paris',
    img: '/blog/blog10/creation_site_web_paris_couverture.png',
    by: 'Ikovaline',
    title_fr: 'Création site web Paris : agence web Paris digitale',
    title_en: 'Website creation in Paris: digital web agency in Paris',
    desc_fr:
      'Créez un site web professionnel à Paris avec une agence digitale spécialisée. Site vitrine, e-commerce, UX, SEO local, budget : tout pour réussir en 2025.',
    desc_en:
      'Build a professional website in Paris with a specialized digital agency. Showcase, e-commerce, UX, local SEO, budget: everything you need to succeed in 2025.',
  },

  {
    date: '2025-05-27',
    slug: 'agence-sea-expertise',
    img: '/blog/blog7/agence-sea-google-ads.png',
    by: 'Ikovaline',
    title_fr:
      "Agence SEA : +70 % de chiffre d'affaires avec des campagnes Google Ads optimisées",
    title_en: 'SEA Agency: +70% revenue with optimized Google Ads campaigns',
    desc_fr:
      'Ikovaline, agence SEA certifiée : créez des campagnes Google Ads efficaces, améliorez votre rentabilité et attirez un trafic réellement qualifié.',
    desc_en:
      'Ikovaline, certified SEA agency: create effective Google Ads campaigns, improve profitability, and drive truly qualified traffic.',
  },

  {
    date: '2025-07-12',
    slug: 'refonte-site-web-guide',
    img: '/blog/blog9/refonte_site_web_couverture.png',
    by: 'Ikovaline',
    title_fr: 'Refonte site web : design, UX et objectifs alignés',
    title_en: 'Website redesign: aligning design, UX and goals',
    desc_fr:
      'Pourquoi et comment réussir la refonte de votre site web en 2025 ? Méthodologie, UX, SEO, budget, FAQ… Le guide ultime pour transformer votre site en levier business.',
    desc_en:
      'Why and how to succeed with your website redesign in 2025? Methodology, UX, SEO, budget, FAQ… The ultimate guide to turn your site into a growth lever.',
  },

  {
    date: '2025-05-14',
    slug: 'creation-digital-guide',
    img: '/blog/blog4/creation-digitale.png',
    by: 'Ikovaline',
    title_fr: 'Création digitale : 10 tendances et outils pour réussir',
    title_en: 'Digital creation: 10 trends & tools to succeed',
    desc_fr:
      'Boostez votre référencement Google grâce à un SEO optimisé, un contenu de qualité et une structure de site pensée pour la visibilité et un trafic qualifié.',
    desc_en:
      'Boost your Google rankings with optimized SEO, quality content, and a site structure built for visibility and qualified traffic.',
  },

  {
    date: '2025-05-18',
    slug: 'definition-site-institutionnel',
    img: '/blog/blog5/Page Couverture Agence Web.png',
    by: 'Ikovaline',
    title_fr: 'Site institutionnel : définition, rôle et exemples clés',
    title_en: 'Institutional website: definition, role and key examples',
    desc_fr:
      'Découvrez ce qu’est un site institutionnel, un levier clé pour vos valeurs et votre crédibilité. Optimisez votre présence en ligne avec un site web efficace.',
    desc_en:
      'What is an institutional website? A key lever for your values and credibility. Optimize your online presence with an effective website.',
  },

  {
    date: '2025-04-05',
    slug: 'comment-heberger-un-site-web',
    img: '/blog/blog1/comment-heberger-un-site.jpg',
    by: 'Ikovaline',
    title_fr: `Comment héberger un site web en ${currentYear} : guide complet`,
    title_en: `How to host a website in ${currentYear}: a complete guide`,
    desc_fr:
      'Vous avez un site mais ne savez pas comment le mettre en ligne ? Ce guide explique l’hébergement pas à pas, avec les meilleures solutions en 2025.',
    desc_en:
      'You have a website but don’t know how to put it online? This guide walks you through hosting step-by-step, with the best options in 2025.',
  },

  {
    date: '2025-05-06',
    slug: 'arborescence-site-web',
    img: '/blog/blog2/arborescence-site-web-illustration.jpeg',
    by: 'Ikovaline',
    title_fr: 'Arborescence site web : guide complet pour bien structurer',
    title_en:
      'Website information architecture: a complete guide to structure it right',
    desc_fr:
      'Organisez votre site pour un meilleur SEO et une navigation optimale : exemples, bonnes pratiques et schémas inclus.',
    desc_en:
      'Organize your site for better SEO and optimal navigation: examples, best practices and visual schemas included.',
  },

  {
    date: '2025-05-10',
    slug: 'comment-etre-reference-sur-google-gratuitement',
    img: '/blog/blog3/comment-etre-reference-sur-google-gratuitement-illustration.jpg',
    by: 'Ikovaline',
    title_fr: 'Se référencer gratuitement sur Google : 3 étapes clés',
    title_en: 'Get listed on Google for free: 3 key steps',
    desc_fr:
      'SEO optimisé, contenu de qualité et structure du site : les fondamentaux pour gagner en visibilité et en trafic qualifié.',
    desc_en:
      'Optimized SEO, quality content and sound site structure: the fundamentals to gain visibility and qualified traffic.',
  },

  {
    date: '2025-05-23',
    slug: 'agence-seo-seine-marne',
    img: '/blog/blog6/En-tête Digital SEO Élégant.png',
    by: 'Ikovaline',
    title_fr:
      'Agence SEO Seine-et-Marne : visibilité locale pour PME et commerces',
    title_en:
      'SEO agency in Seine-et-Marne: local visibility for SMBs & retailers',
    desc_fr:
      'Boostez votre visibilité locale (77) avec une agence SEO experte en référencement. Stratégies sur mesure et actions concrètes.',
    desc_en:
      'Boost your local visibility (77) with an SEO agency expert in local search. Tailored strategies and concrete actions.',
  },

  {
    date: '2025-06-02',
    slug: 'etude-marche-methodologie',
    img: '/blog/blog8/études-de_marché_couverture.webp',
    by: 'Ikovaline',
    title_fr:
      "Étude de marché : étapes clés pour valider votre projet d'entreprise",
    title_en: 'Market research: key steps to validate your business project',
    desc_fr:
      'Guide 2025 : analyse concurrentielle, segmentation client, outils. Réduisez les risques et affinez votre stratégie.',
    desc_en:
      '2025 guide: competitive analysis, customer segmentation, tools. Reduce risks and refine your strategy.',
  },
];

/** Sélecteur — retourne la liste prête à l’emploi (with title/desc choisis) */
export const getBlogData = (isEN: boolean): BlogType[] =>
  DATA_BLOG_I18N.map((b) => ({
    date: b.date,
    slug: b.slug,
    img: b.img,
    by: b.by,
    title: pick(isEN, b.title_fr, b.title_en),
    desc: pick(isEN, b.desc_fr, b.desc_en),
  }));

/* -------------------------- Composant section ------------------------- */
function Blog() {
  const isEN = /^\/en(\/|$)/.test(usePathname() || '/');
  const dataBlog = getBlogData(isEN);

  const heading = isEN ? 'Recent posts' : 'Blogs récents';
  const badgeNew = isEN ? 'New' : 'Nouveau';
  const byTxt = isEN ? 'By' : 'Par';

  return (
    <div className="w-full py-20 px-10 max-w-[1400px] mx-auto">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataBlog.map((bl, index) => (
            <Link
              key={bl.date + bl.slug}
              href={`/${isEN ? 'en/' : ''}blog/${bl.slug}`}
              className={`flex flex-col gap-4 hover:opacity-75 cursor-pointer ${
                index === 0 ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              <Image
                width={1000}
                height={1000}
                src={bl.img}
                alt={bl.slug}
                className="rounded-3xl w-full object-cover aspect-video"
              />

              <div className="flex flex-row gap-4 items-center">
                <Badge>{badgeNew}</Badge>
                <p className="flex flex-row gap-2 text-sm items-center">
                  <span className="text-muted-foreground">{byTxt}</span>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/logo/ikovaline_logo_unique.png" />
                    <AvatarFallback>IK</AvatarFallback>
                  </Avatar>
                  <span>{bl.by}</span>
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="max-w-3xl capitalize text-2xl font-semibold tracking-tight">
                  {bl.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                  {bl.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Blog };
