import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

export const dataAgenceHautsSeine = [
  {
    id: 'agence-web-boulogne-billancourt',
    ville: 'Boulogne-Billancourt',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Boulogne-Billancourt ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Boulogne-Billancourt</strong> met à votre
        service son expertise en création de site internet, refonte web,
        référencement naturel (SEO) et campagnes marketing. Que vous soyez situé
        à{' '}
        <Link href="/agence-web-boulogne-billancourt">
          Boulogne-Billancourt
        </Link>{' '}
        ou dans une commune voisine, profitez de solutions digitales sur-mesure,
        pensées pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Boulogne-Billancourt conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Boulogne-Billancourt et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Boulogne-Billancourt.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Boulogne-Billancourt avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Boulogne-Billancourt : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Boulogne-Billancourt dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Boulogne-Billancourt mais aussi dans les communes
        suivantes des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Boulogne-Billancourt ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Boulogne-Billancourt avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Boulogne-Billancourt',

    metaTitle:
      'Agence web Boulogne-Billancourt (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Boulogne-Billancourt : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-neuilly-sur-seine',
    ville: 'Neuilly-sur-Seine',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Neuilly-sur-Seine ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Neuilly-sur-Seine</strong> met à votre
        service son expertise en création de site internet, refonte web,
        référencement naturel (SEO) et campagnes marketing. Que vous soyez situé
        à <Link href="/agence-web-neuilly-sur-seine">Neuilly-sur-Seine</Link> ou
        dans une commune voisine, profitez de solutions digitales sur-mesure,
        pensées pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Neuilly-sur-Seine conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Neuilly-sur-Seine et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Neuilly-sur-Seine.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Neuilly-sur-Seine avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Neuilly-sur-Seine : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Neuilly-sur-Seine dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Neuilly-sur-Seine mais aussi dans les communes
        suivantes des Hauts-de-Seine :
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Neuilly-sur-Seine ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Neuilly-sur-Seine avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Neuilly-sur-Seine',

    metaTitle:
      'Agence web Neuilly-sur-Seine (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Neuilly-sur-Seine : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-courbevoie',
    ville: 'Courbevoie',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Courbevoie ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Courbevoie</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-courbevoie">Courbevoie</Link> ou dans une
        commune voisine, profitez de solutions digitales sur-mesure, pensées
        pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Courbevoie conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Courbevoie et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Courbevoie.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Courbevoie avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Courbevoie : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Courbevoie dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Courbevoie mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Courbevoie ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Courbevoie avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Courbevoie',

    metaTitle:
      'Agence web Courbevoie (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Courbevoie : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-levallois-perret',
    ville: 'Levallois-Perret',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Levallois-Perret ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Levallois-Perret</strong> met à votre service
        son expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-levallois-perret">Levallois-Perret</Link> ou
        dans une commune voisine, profitez de solutions digitales sur-mesure,
        pensées pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Levallois-Perret conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Levallois-Perret et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Levallois-Perret.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Levallois-Perret avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Levallois-Perret : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Levallois-Perret dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Levallois-Perret mais aussi dans les communes
        suivantes des Hauts-de-Seine :
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Levallois-Perret ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Levallois-Perret avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Levallois-Perret',

    metaTitle:
      'Agence web Levallois-Perret (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Levallois-Perret : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-nanterre',
    ville: 'Nanterre',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Nanterre ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Nanterre</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-nanterre">Nanterre</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Nanterre conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Nanterre et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Nanterre.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Nanterre avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Nanterre : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Nanterre dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Nanterre mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Nanterre ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Nanterre avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Nanterre',

    metaTitle:
      'Agence web Nanterre (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Nanterre : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-suresnes',
    ville: 'Suresnes',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Suresnes ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Suresnes</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-suresnes">Suresnes</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Suresnes conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Suresnes et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Suresnes.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Suresnes avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Suresnes : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Suresnes dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Suresnes mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Suresnes ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Suresnes avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Suresnes',

    metaTitle:
      'Agence web Suresnes (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Suresnes : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-clamart',
    ville: 'Clamart',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Clamart ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Clamart</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-clamart">Clamart</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Clamart conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Clamart et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Clamart.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Clamart avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Clamart : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Clamart dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Clamart mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Clamart ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Clamart avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Clamart',

    metaTitle:
      'Agence web Clamart (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Clamart : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-colombes',
    ville: 'Colombes',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Colombes ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Colombes</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-colombes">Colombes</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Colombes conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Colombes et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Colombes.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Colombes avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Colombes : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Colombes dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Colombes mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Colombes ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Colombes avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Colombes',

    metaTitle:
      'Agence web Colombes (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Colombes : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-montrouge',
    ville: 'Montrouge',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Montrouge ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Montrouge</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-montrouge">Montrouge</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Montrouge conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Montrouge et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Montrouge.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Montrouge avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Montrouge : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Montrouge dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Montrouge mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Montrouge ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Montrouge avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Montrouge',

    metaTitle:
      'Agence web Montrouge (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Montrouge : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-asnieres-sur-seine',
    ville: 'Asnières-sur-Seine',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Asnières-sur-Seine ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Asnières-sur-Seine</strong> met à votre
        service son expertise en création de site internet, refonte web,
        référencement naturel (SEO) et campagnes marketing. Que vous soyez situé
        à <Link href="/agence-web-asnieres-sur-seine">Asnières-sur-Seine</Link>{' '}
        ou dans une commune voisine, profitez de solutions digitales sur-mesure,
        pensées pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Asnières-sur-Seine conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Asnières-sur-Seine et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Asnières-sur-Seine.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Asnières-sur-Seine avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Asnières-sur-Seine : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Asnières-sur-Seine dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Asnières-sur-Seine mais aussi dans les communes
        suivantes des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Asnières-sur-Seine ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Asnières-sur-Seine avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Asnières-sur-Seine',

    metaTitle:
      'Agence web Asnières-sur-Seine (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Asnières-sur-Seine : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-malakoff',
    ville: 'Malakoff',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Malakoff ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Malakoff</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-malakoff">Malakoff</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Malakoff conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Malakoff et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Malakoff.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Malakoff avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Malakoff : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Malakoff dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Malakoff mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Malakoff ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Malakoff avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Malakoff',

    metaTitle:
      'Agence web Malakoff (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Malakoff : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-gennevilliers',
    ville: 'Gennevilliers',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Gennevilliers ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Gennevilliers</strong> met à votre service
        son expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-gennevilliers">Gennevilliers</Link> ou dans une
        commune voisine, profitez de solutions digitales sur-mesure, pensées
        pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Gennevilliers conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Gennevilliers et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Gennevilliers.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Gennevilliers avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Gennevilliers : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Gennevilliers dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Gennevilliers mais aussi dans les communes
        suivantes des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Gennevilliers ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Gennevilliers avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Gennevilliers',

    metaTitle:
      'Agence web Gennevilliers (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Gennevilliers : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-clichy',
    ville: 'Clichy',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Clichy ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Clichy</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-clichy">Clichy</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Clichy conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Clichy et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Clichy.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Clichy avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Clichy : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Clichy dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Clichy mais aussi dans les communes suivantes des
        Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Clichy ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Clichy avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Clichy',

    metaTitle:
      'Agence web Clichy (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Clichy : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-meudon',
    ville: 'Meudon',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Meudon ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Meudon</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-meudon">Meudon</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Meudon conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Meudon et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Meudon.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Meudon avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Meudon : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Meudon dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Meudon mais aussi dans les communes suivantes des
        Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Meudon ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Meudon avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Meudon',

    metaTitle:
      'Agence web Meudon (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Meudon : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-puteaux',
    ville: 'Puteaux',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Puteaux ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Puteaux</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-puteaux">Puteaux</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Puteaux conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Puteaux et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Puteaux.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Puteaux avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Puteaux : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Puteaux dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Puteaux mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Puteaux ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Puteaux avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Puteaux',

    metaTitle:
      'Agence web Puteaux (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Puteaux : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-bagneux',
    ville: 'Bagneux',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Bagneux ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Bagneux</strong> met à votre service son
        expertise en création de site internet, refonte web, référencement
        naturel (SEO) et campagnes marketing. Que vous soyez situé à{' '}
        <Link href="/agence-web-bagneux">Bagneux</Link> ou dans une commune
        voisine, profitez de solutions digitales sur-mesure, pensées pour
        générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Bagneux conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Bagneux et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Bagneux.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Bagneux avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Bagneux : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Bagneux dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Bagneux mais aussi dans les communes suivantes
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Bagneux ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Bagneux avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Bagneux',

    metaTitle:
      'Agence web Bagneux (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Bagneux : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-issy-les-moulineaux',
    ville: 'Issy-les-Moulineaux',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Issy-les-Moulineaux ? Ikovaline vous accompagne dans la création de site internet, la refonte de site web, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Issy-les-Moulineaux</strong> met à votre
        service son expertise en création de site internet, refonte web,
        référencement naturel (SEO) et campagnes marketing. Que vous soyez situé
        à{' '}
        <Link href="/agence-web-issy-les-moulineaux">Issy-les-Moulineaux</Link>{' '}
        ou dans une commune voisine, profitez de solutions digitales sur-mesure,
        pensées pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : notre agence web à Issy-les-Moulineaux conçoit des sites modernes, performants, responsive et optimisés pour le SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Issy-les-Moulineaux et en Île-de-France avec une stratégie de référencement naturel complète : mots-clés, contenu, netlinking, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, support technique : bénéficiez d’un site toujours fonctionnel grâce à notre service de maintenance web à Issy-les-Moulineaux.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites décoller votre activité à Issy-les-Moulineaux avec nos campagnes Ads, réseaux sociaux, content marketing et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Issy-les-Moulineaux : transformer votre site en machine à clients',
      text1: `Ikovaline accompagne les entreprises de Issy-les-Moulineaux dans leur digitalisation : création ou refonte de site web, stratégie SEO, campagnes d’acquisition.`,
      text2: `Présents dans tout le 92, nous faisons de votre réussite locale une priorité. Nos prestations sur-mesure sont pensées pour générer du trafic qualifié, des contacts concrets, et des ventes.`,
    },

    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
      'Asnières-sur-Seine',
      'Malakoff',
      'Gennevilliers',
      'Clichy',
      'Meudon',
      'Puteaux',
      'Bagneux',
      'Issy-les-Moulineaux',
    ],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Issy-les-Moulineaux mais aussi dans les communes
        suivantes des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
          'Asnières-sur-Seine',
          'Malakoff',
          'Gennevilliers',
          'Clichy',
          'Meudon',
          'Puteaux',
          'Bagneux',
          'Issy-les-Moulineaux',
        ].map((v, i, arr) => (
          <span key={v}>
            {' '}
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>{' '}
            {i < arr.length - 2
              ? ', '
              : i === arr.length - 2
                ? ' et '
                : ''}{' '}
          </span>
        ))}{' '}
        . Ensemble, donnons un coup d’accélérateur à votre stratégie digitale
        locale.
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Issy-les-Moulineaux ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… boostez votre visibilité à Issy-les-Moulineaux avec Ikovaline, votre agence digitale locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Issy-les-Moulineaux',

    metaTitle:
      'Agence web Issy-les-Moulineaux (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Issy-les-Moulineaux : création de site internet, refonte, SEO local et stratégie digitale. Donnez un coup de boost à votre visibilité dans les Hauts-de-Seine.',
  },
];
