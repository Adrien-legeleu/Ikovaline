"use client";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { TextAnimate } from "@/components/ui/text-animate";
import dataService from "@/data/data-services";
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
        <div className="min-h-screen h-full items-center justify-center flex pt-24 flex-col">
          <h1 className="sm:text-4xl md:text-5xl max-w-3xl mx-auto text-3xl text-center py-2 mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section1Title}
          </h1>
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-muted-foreground dark:text-neutral-400 font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
          >
            {service.section1Desc}
          </TextAnimate>
          {service.section1Image}
        </div>

        <div className="py-24 flex items-center space-y-12 justify-center flex-col">
          <h2 className="sm:text-4xl max-w-xl mx-auto text-3xl text-center font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section2Title}
          </h2>
          <p className="text-muted-foreground dark:text-neutral-400 font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg">
            {service.section2Desc}
          </p>
          <NeonGradientCard className="max-w-sm items-center flex flex-col justify-center text-center">
            <AnimatedShinyText className="inline-block text-8xl font-extrabold items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-50">
              <span>{service.section2NumberImportant}</span>
            </AnimatedShinyText>
            <span className="inline-block text-muted-foreground dark:text-neutral-400 font-poppins">
              {service.section2TextImportant}
            </span>
          </NeonGradientCard>
        </div>

        <div className="md:px-10 py-24 space-y-12 px-5">
          <h2 className="sm:text-4xl max-w-xl mx-auto text-3xl text-center font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
            {service.section3Title}
          </h2>
          <div className="grid xl:grid-cols-3 sm:grid-cols-4 grid-cols-1 w-full gap-6">
            {service.section3Cards.map((card, idx) => (
              <div
                key={idx}
                className={`outer aspect-square ${
                  idx === service.section3Cards.length - 1
                    ? "sm:col-span-2 sm:col-start-2 xl:col-span-1"
                    : "sm:col-span-2 xl:col-span-1"
                }`}
              >
                <div className="dot"></div>
                <div className="card">
                  <div className="ray"></div>
                  <div className="text-3xl pt-[15%] text-center mx-[15%] font-bold text-gray-600 dark:text-neutral-400  bg-clip-text text-transparent">
                    {card.text}
                  </div>
                  <p className="text-center text-gray-600 dark:text-neutral-400 text-sm px-4 mt-8 mx-[10%]">
                    {card.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:px-10 py-24 px-5">
          <h2 className="sm:text-4xl text-3xl text-center font-bold bg-clip-text text-transparent">
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
                      className="w-full p-5 max-w-md space-y-2 bg-white dark:bg-neutral-800 rounded-3xl shadow-product"
                    >
                      <h3 className="font-semibold text-lg md:text-xl">
                        {value.title}
                      </h3>
                      <p className="text-sm text-darkgrey md:text-base">
                        {value.description}
                      </p>
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      );
    </div>
  );
}
