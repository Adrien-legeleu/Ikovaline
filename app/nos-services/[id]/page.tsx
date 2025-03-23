import { CallToAction } from "@/components/callToAction/CallToAction";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import ServiceInteractive from "@/components/ServicesPage/servicesComponents/ServiceInteractive";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { dataService } from "@/data/data-services";
import { cn } from "@/lib/utils";
import { IconRocket, IconTrendingUp } from "@tabler/icons-react";

type PageProps = {
  params: { id: string };
};
export default function Page({ params }: PageProps) {
  const service = dataService.find((service) => service.slug == params.id);

  if (!service) {
    return <p>service doesn&apos;t find</p>;
  }
  console.log(service);

  return (
    <div>
      <div className="min-h-screen h-full relative rounded-b-3xl items-center bg-gradient-to-t from-10% from-primary/60 dark:from-primary/35 dark:from-5% to-transparent to-40%  justify-center flex md:pt-24 xs:gap-8 gap-5 max-md:pb-10  md:px-10 px-5 flex-col">
        <GridPattern
          width={25}
          height={25}
          x={-1}
          y={-1}
          strokeDasharray={"4 0"}
          className={cn(
            " [mask-image:radial-gradient(300px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />
        <TextAnimate
          animation="blurInUp"
          by="word"
          className="text-muted-foreground z-10 mx-auto dark:text-neutral-300  font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
        >
          {service.section1Desc}
        </TextAnimate>
        <h1 className="sm:text-5xl -10 md:text-6xl max-w-3xl mx-auto text-4xl text-center z-10 py-2  font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-300 dark:from-neutral-100 bg-clip-text text-transparent">
          {service.section1Title}
        </h1>
        <Button className="sm:shadow-servicepc z-10 shadow-servicemobile dark:shadow-servicemobileDark sm:dark:shadow-servicepcDark text-lg px-5 py-6 rounded-3xl">
          Contactez-nous
        </Button>
        <div className="w-32 h-32 flex items-center bg-gradient-to-br absolute md:top-1/4 sm:top-[10%] top-[6%] left-[15%] rounded-3xl from-[#cacaca] dark:from-[#202020] to-[#f0f0f0] dark:to-[#282828] justify-center shadow-serviceIconlight dark:shadow-serviceIconDark ">
          <IconRocket className="w-20 h-20 text-secondary" stroke={2} />
        </div>
        <div className="w-32 h-32 flex items-center bg-gradient-to-br absolute md:top-2/3 top-[75%] right-[15%] rounded-3xl from-[#cacaca]  dark:from-[#202020] to-[#f0f0f0] dark:to-[#282828] justify-center shadow-serviceIconlight dark:shadow-serviceIconDark ">
          <IconTrendingUp className="w-20 h-20 text-secondary" stroke={2} />
        </div>
      </div>

      <div className="py-24 md:px-10 px-5 flex items-center space-y-12 justify-center flex-col">
        <h2 className="sm:text-4xl py-2 max-w-xl mx-auto text-3xl text-center font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          {service.section2Title}
        </h2>
        <p className="text-muted-foreground dark:text-neutral-400 font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg">
          {service.section2Desc}
        </p>
        <NeonGradientCard className="max-w-sm items-center flex flex-col justify-center text-center">
          <AnimatedShinyText
            className="
            inline-block md:text-8xl text-7xl  font-extrabold items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-50"
          >
            <span className="inline-block">
              {service.section2NumberImportant}
            </span>
          </AnimatedShinyText>
          <span className="block text-muted-foreground dark:text-neutral-400 font-poppins">
            {service.section2TextImportant}
          </span>
        </NeonGradientCard>
      </div>

      <div className="md:px-10 py-24 space-y-12 px-5 max-w-7xl mx-auto">
        <h2 className="sm:text-4xl max-w-xl mx-auto py-2 text-3xl text-center font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          {service.section3Title}
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-6">
          {service.section3Cards.map((card, index) => (
            <div key={index} className={`outer aspect-square `}>
              <div className="dot"></div>
              <div className="card">
                <div className="ray"></div>
                <div
                  className="text-3xl pt-[15%] text-center mx-[15%] font-bold 
          bg-[linear-gradient(45deg,_#cacaca_4%,_#000000,_#ffffff)] 
          dark:bg-[linear-gradient(45deg,_#2b2b2b_4%,_#ffffff,_#000000)] 
          bg-clip-text text-transparent"
                >
                  {card.text}
                </div>
                <p className="text-center text-gray-600 dark:text-neutral-400 text-sm px-4 mt-8 mx-[10%]">
                  {card.subtext}
                </p>
                <div className="line topl"></div>
                <div className="line leftl"></div>
                <div className="line bottoml"></div>
                <div className="line rightl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ServiceInteractive service={service} />
      <CallToAction
        title="Donnez à votre entreprise l'élan qu'elle mérite."
        desc="Nos solutions sur-mesure transforment vos ambitions en résultats concrets. Parlons de vos objectifs et voyons comment aller plus loin ensemble."
        textBtn="Discutons de votre projet"
      />
    </div>
  );
}
