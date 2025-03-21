"use client";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TextAnimate } from "@/components/ui/text-animate";
import dataService from "@/data/data-services";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        <div className="min-h-screen h-full rounded-b-3xl items-center bg-gradient-to-t from-50% from-primary/70 to-transparent to-75% justify-center flex pt-24 flex-col">
          <div className="flex w-full flex-col  overflow-hidden">
            <ContainerScroll
              titleComponent={
                <>
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    className="text-muted-foreground mx-auto dark:text-neutral-400 z-10 font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
                  >
                    {service.section1Desc}
                  </TextAnimate>
                  <h1 className="sm:text-5xl md:text-6xl max-w-3xl mx-auto text-4xl text-center z-10 py-2  font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
                    {service.section1Title}
                  </h1>
                </>
              }
            >
              {service.section1Image}
            </ContainerScroll>
          </div>
        </div>

        <div className="py-24 flex items-center space-y-12 justify-center flex-col">
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
          <div className="grid xl:grid-cols-3 sm:grid-cols-4 grid-cols-1 w-full gap-6">
            {service.section3Cards.map((card, index) => (
              <div
                key={index}
                className={`outer aspect-square ${
                  index === service.section3Cards.length - 1
                    ? "sm:col-span-2 sm:col-start-2 xl:col-span-1"
                    : "sm:col-span-2 xl:col-span-1"
                }`}
              >
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
              "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
            )}
          />
          <h2 className="sm:text-4xl max-w-xl mx-auto py-2 text-3xl text-center font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section4Title}
          </h2>
          <div className="flex flex-col pt-12 gap-10 items-center justify-center">
            <div className="relative p-2 bg-[#F4F4F4] dark:bg-neutral-800 rounded-3xl shadow-product flex justify-center">
              <ul className="relative flex flex-row flex-wrap items-center justify-center gap-2 w-full">
                {service.section4Content.map((value) => (
                  <motion.li
                    key={value.title}
                    className="p-2 font-semibold flex w-auto gap-2 cursor-pointer relative rounded-full"
                    onClick={() => setValueIdText(value.title.toLowerCase())}
                  >
                    {value.title.toLowerCase() === valueIdText && (
                      <motion.div
                        layoutId="activeBg"
                        className="absolute w-full inset-0 shadow-neumorphic2 bg-white dark:bg-neutral-900 rounded-full"
                      />
                    )}
                    <span className="relative whitespace-nowrap flex w-full text-xs sm:text-sm gap-2 px-3">
                      {value.icon}
                      {value.title}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative">
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
                      className="w-full p-5 max-w-md space-y-2 bg-white shadow-2xl shadow-black/20 dark:shadow-white/20 dark:bg-neutral-800 rounded-3xl shadow-product"
                    >
                      <h3 className="font-semibold text-lg md:text-xl">
                        {value.title}
                      </h3>
                      <p className="text-sm text-darkgrey md:text-base">
                        {value.description}
                      </p>
                      <div className="w-4 h-4 bg-white rounded-full border-[3px] border-black absolute top-1/2   -translate-y-1/2 -left-2" />
                      <div className="w-4 h-4 bg-white rounded-full border-[3px] border-black absolute top-1/2 -translate-y-1/2 -right-2" />
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
