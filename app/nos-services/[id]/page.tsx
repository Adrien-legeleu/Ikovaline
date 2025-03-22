"use client";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { dataService } from "@/data/data-services";
import { cn } from "@/lib/utils";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconRocket,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const { id } = useParams();
  const service = dataService.find((service) => service.slug == id);
  const [valueIdText, setValueIdText] = useState("");
  if (!service) {
    return <p>service doesn't find</p>;
  }
  console.log(service);

  useEffect(() => {
    setValueIdText(service.section4Content[0].title.toLocaleLowerCase());
  }, [id]);
  return (
    <div>
      <div>
        <div className="min-h-screen h-full relative rounded-b-3xl items-center bg-gradient-to-t from-10% from-primary/60 dark:from-primary/35 dark:from-5% to-transparent to-40%  justify-center flex md:pt-24 gap-8  md:px-10 px-5 flex-col">
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-muted-foreground z-10 mx-auto dark:text-neutral-400  font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
          >
            {service.section1Desc}
          </TextAnimate>
          <h1 className="sm:text-5xl -10 md:text-6xl max-w-3xl mx-auto text-4xl text-center z-10 py-2  font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section1Title}
          </h1>
          <Button className="sm:shadow-servicepc z-10 shadow-servicemobile dark:shadow-servicemobileDark sm:dark:shadow-servicepcDark text-lg px-5 py-6 rounded-3xl">
            Contactez-nous
          </Button>
          <div className="w-32 h-32 flex items-center bg-gradient-to-br absolute md:top-1/4 top-[15%] left-[15%] rounded-3xl from-[#cacaca] dark:from-[#202020] to-[#f0f0f0] dark:to-[#282828] justify-center shadow-serviceIconlight dark:shadow-serviceIconDark ">
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
            inline-block text-8xl font-extrabold items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-50"
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

        <div className="md:px-10 py-24 space-y-12 px-5">
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

        <div className="md:px-10 relative py-24 px-5">
          <DotPattern
            glow={true}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
            )}
          />
          <h2 className="sm:text-4xl  max-w-xl mx-auto py-2 text-3xl text-center font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section4Title}
          </h2>
          <div className="flex flex-col pt-12 gap-10 items-center justify-center">
            <div className="relative p-2 bg-[#F4F4F4] dark:bg-neutral-800 w-full rounded-3xl shadow-product flex justify-center">
              <ul className="relative flex flex-row flex-wrap items-center justify-center gap-2 w-full">
                {service.section4Content.map((value) => (
                  <motion.li
                    key={value.title}
                    className="p-2 font-semibold flex  w-full gap-2 cursor-pointer relative rounded-full"
                    onClick={() => setValueIdText(value.title.toLowerCase())}
                  >
                    {value.title.toLowerCase() === valueIdText && (
                      <motion.div
                        layoutId="activeBg"
                        className="absolute w-full inset-0 shadow-neumorphic2 bg-white dark:bg-neutral-900 rounded-full"
                      />
                    )}
                    <span className="relative whitespace-nowrap justify-center flex w-full items-center text-xs sm:text-sm gap-2 px-3">
                      {value.icon}
                      {value.title}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative ">
              {service.section4Content.map(
                (value) =>
                  valueIdText === value.title.toLowerCase() && (
                    <motion.div
                      key={value.title}
                      initial={{ x: 150, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                      }}
                      className="w-full p-5 sm:max-w-md max-w-sm space-y-2 bg-white shadow-2xl shadow-black/20 dark:shadow-white/20 dark:bg-neutral-800 rounded-3xl shadow-product"
                    >
                      <h3 className="font-semibold text-lg md:text-xl">
                        {value.title}
                      </h3>
                      <p className="text-sm text-darkgrey md:text-base">
                        {value.description}
                      </p>
                      <div className="sm:w-4 sm:h-4 w-3 h-3 bg-white dark:bg-black rounded-full sm:border-[3px] border-2 border-black dark:border-neutral-200 absolute top-1/2   -translate-y-1/2 -left-2" />

                      <div className="absolute top-1/2 max-xss:hidden -translate-y-1/2 flex items-center -right-8 sm:-right-20 md:-right-36   lg:-right-64">
                        <IconArrowNarrowLeft className=" text-neutral-800 dark:text-neutral-300 stroke-[1.2px]" />
                        <div className="lg:w-52 md:w-28 sm:w-12 max-sm:hidden h-[1.2px] bg-gradient-to-r dark:bg-gradient-to-l relative right-2 from-neutral-800 from-10% via-60% to-80% via-neutral-200 dark:via-neutral-400 to-neutral-100 dark:to-neutral-300" />
                      </div>
                      <div className="absolute top-1/2 max-xs:hidden -translate-y-1/2 flex flex-row-reverse items-center  lg:-left-64 md:-left-36 sm:-left-20 -left-8">
                        <IconArrowNarrowRight className=" text-neutral-800 dark:text-neutral-300  stroke-[1.2px]" />
                        <div className="lg:w-52 md:w-28 w-12 max-sm:hidden h-[1.2px] bg-gradient-to-l dark:bg-gradient-to-r relative left-2 from-neutral-800 from-10% via-60% to-80%  dark:via-neutral-400 to-neutral-100 dark:to-neutral-300" />
                      </div>

                      <div className="sm:w-4 sm:h-4 w-3 h-3 bg-white dark:bg-black rounded-full sm:border-[3px] border-2 border-black dark:border-neutral-200 absolute top-1/2 -translate-y-1/2 -right-2" />
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
