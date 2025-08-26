import CallToAction from '@/components/callToAction/CallToAction';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import ServiceInteractive from '@/components/ServicesPage/servicesComponents/ServiceInteractive';
import { Button } from '@/components/ui/button';
import { TextAnimate } from '@/components/ui/text-animate';
import { dataService } from '@/data/data-services';
import { cn } from '@/lib/utils';
import { IconRocket, IconTrendingUp } from '@tabler/icons-react';
import { Metadata } from 'next';
import Head from 'next/head';

type PageProps = {
  params: { id: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const service = dataService.find((data) => data.slug === params.id);
  if (!service) {
    return {
      title: 'Service non trouvé - Ikovaline',
      description: "Le service demandé n'existe pas ou a été supprimé.",
    };
  }
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `https://ikovaline.com/nos-services/${service.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ikovaline.com/nos-services/${service.slug}`,
    },
    robots: 'index, follow',
  };
}

export default function Page({ params }: PageProps) {
  const service = dataService.find((service) => service.slug === params.id);
  if (!service) {
    return <p>Le service demandé n'existe pas.</p>;
  }

  return (
    <>
      <Head>
        {/* Données structurées JSON-LD Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: service.section1Title,
              description: service.seoDescription || service.section1Desc,
              provider: {
                '@type': 'Organization',
                name: 'Ikovaline',
                url: 'https://ikovaline.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://ikovaline.com/images/logo/ikovaline_logo.png',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+33 7 85 90 22 38',
                  contactType: 'customer service',
                  areaServed: 'FR',
                },
              },
              url: `https://ikovaline.com/nos-services/${service.slug}`,
            }),
          }}
        />
      </Head>
      <div>
        {/* Section Hero du service */}
        <div className="min-h-screen h-full relative rounded-b-3xl flex flex-col items-center justify-center bg-gradient-to-t from-primary/60 dark:from-primary/35 to-transparent md:pt-24 max-md:pb-10 md:px-10 px-5">
          <GridPattern
            width={25}
            height={25}
            x={-1}
            y={-1}
            strokeDasharray="4 0"
            className={cn(
              '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
              'md:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
              'lg:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]'
            )}
          />
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-muted-foreground z-10 mx-auto dark:text-neutral-300 max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
          >
            {service.section1Desc}
          </TextAnimate>
          <h1 className="sm:text-5xl md:text-6xl text-4xl max-w-3xl mx-auto text-center z-10 py-2 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-300 dark:from-neutral-100 bg-clip-text text-transparent">
            {service.section1Title}
          </h1>
          <Button className="sm:shadow-servicepc dark:shadow-servicemobileDark sm:dark:shadow-servicepcDark shadow-servicemobile text-lg px-5 py-6 rounded-3xl z-10">
            Contactez-nous
          </Button>
          <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-[#cacaca] to-[#f0f0f0] dark:from-[#202020] dark:to-[#282828] shadow-serviceIconlight dark:shadow-serviceIconDark rounded-3xl absolute md:top-1/4 sm:top-[10%] top-[6%] left-[15%]">
            <IconRocket className="w-20 h-20 text-secondary" stroke={2} />
          </div>
          <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-[#cacaca] to-[#f0f0f0] dark:from-[#202020] dark:to-[#282828] shadow-serviceIconlight dark:shadow-serviceIconDark rounded-3xl absolute md:top-2/3 top-[75%] right-[15%]">
            <IconTrendingUp className="w-20 h-20 text-secondary" stroke={2} />
          </div>
        </div>

        {/* Section 2 : Statistiques ou argument clé */}
        <div className="py-24 md:px-10 px-5 flex flex-col items-center space-y-12 text-center">
          <h2 className="sm:text-4xl text-3xl max-w-xl mx-auto font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section2Title}
          </h2>
          <p className="text-muted-foreground dark:text-neutral-400 xs:text-xs md:text-lg max-w-lg mx-auto">
            {service.section2Desc}
          </p>
          <NeonGradientCard className="max-w-sm flex flex-col items-center justify-center text-center">
            <AnimatedShinyText className="inline-block md:text-8xl text-7xl font-extrabold px-4 py-1">
              <span>{service.section2NumberImportant}</span>
            </AnimatedShinyText>
            <span className="block text-muted-foreground dark:text-neutral-400">
              {service.section2TextImportant}
            </span>
          </NeonGradientCard>
        </div>

        {/* Section 3 : Points forts / Étapes en cartes */}
        <div className="md:px-10 py-24 space-y-12 px-5 max-w-7xl mx-auto">
          <h2 className="sm:text-4xl text-3xl max-w-xl mx-auto font-bold text-center bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section3Title}
          </h2>
          <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full mx-auto">
            {service.section3Cards.map((card, index) => (
              <div key={index} className="outer aspect-square">
                <div className="dot"></div>
                <div className="card">
                  <div className="ray"></div>
                  <div
                    className="text-3xl pt-[15%] mx-[15%] font-bold text-center 
                                  bg-[linear-gradient(45deg,_#cacaca_4%,_#000,_#fff)] 
                                  dark:bg-[linear-gradient(45deg,_#2b2b2b_4%,_#fff,_#000)] 
                                  bg-clip-text text-transparent"
                  >
                    {card.text}
                  </div>
                  <p className="text-center text-gray-600 dark:text-neutral-400 text-sm px-4 mt-8 mx-[10%]">
                    {card.subtext}
                  </p>
                  {/* decorative lines */}
                  <div className="line topl"></div>
                  <div className="line leftl"></div>
                  <div className="line bottoml"></div>
                  <div className="line rightl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section interactive spécifique (galeries, FAQ, etc.) */}
        <ServiceInteractive service={service} />

        {/* Section 4 : Avantages / Notre expertise (sous forme de cards) */}
        <CallToAction
          title={
            service.section4Title
              ? "Donnez à votre entreprise l'élan qu'elle mérite."
              : ''
          }
          desc={
            service.section4Title
              ? 'Nos solutions sur-mesure transforment vos ambitions en résultats concrets. Parlons de vos objectifs et voyons comment aller plus loin ensemble.'
              : ''
          }
          textBtn="Discutons de votre projet"
        />
      </div>
    </>
  );
}
