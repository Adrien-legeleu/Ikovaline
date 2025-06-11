"use client";
import { notFound } from "next/navigation";
import { dataAgence } from "@/data/data-agence";
import dataEssonne from "@/data/data-essonne.json";
import Services from "@/components/pageSatellite/Services";
import Objectif from "@/components/pageSatellite/Objectif";
import CityAround from "@/components/pageSatellite/CityAround";
import CallToAction from "@/components/callToAction/CallToAction";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { IconMessage2 } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { Lens } from "@/components/ui/lens";
import dynamic from "next/dynamic";
const CarteEssonne = dynamic(() => import("@/public/svg/massy"), {
  ssr: false,
});
const Glow = dynamic(() => import("@/components/ui/glow"), { ssr: false });

export default function PageSquelette({ idAgence }: { idAgence: string }) {
  const data = dataAgence.find((item) => item.id === idAgence);

  const svgRef = useRef<SVGSVGElement>(null);
  const [hovering, setHovering] = useState(false);
  const projectPoint = (lat: number, lng: number) => {
    const minLat = 41.0;
    const maxLat = 51.1;
    const minLng = -5.2;
    const maxLng = 9.6;
    const width = 800;
    const height = 500;

    const x = ((lng - minLng) / (maxLng - minLng)) * width;
    const y = ((maxLat - lat) / (maxLat - minLat)) * height;
    return { x, y };
  };

  const lat = 48.2;
  const lng = 2;
  const { x, y } = projectPoint(lat, lng);
  if (!data) return notFound();
  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute inset-0  overflow-hidden pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
      <div className="h-screen overflow-hidden w-full flex flex-col items-center justify-between relative md:mt-24 mt-20">
        <div className="lg:w-[260px] lg:h-[260px] sm:w-[230px] sm:h-[230px] w-[200px] h-[200px] z-20 absolute bottom-10 sm:left-1/2 left-0 -translate-x-1/2">
          <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-white/20 dark:bg-white/10 pointer-events-none z-0" />
          <div
            className="w-full h-full p-5 rounded-full
            bg-white/10 dark:bg-white/5
            backdrop-blur-sm
            border border-black/10
            shadow-[inset_0_0_0.5px_rgba(255,255,255,0.3),_0_10px_30px_rgba(0,0,0,0.1)]
            absolute bottom-10 left-1/2 translate-x-5 z-10"
          >
            <Lens hovering={hovering} setHovering={setHovering}>
              <CarteEssonne
                data={dataEssonne.features}
                highlighted={data.ville.toLowerCase()}
              />
            </Lens>
          </div>
        </div>
        <div className="absolute h-[250px] z-10 bottom-0 left-0 w-full bg-gradient-to-t from-[#F4FAFB] dark:from-black to-transparent from-30%" />
        <div>
          <h1 className="text-3xl md:px-0 px-5 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-800 dark:from-neutral-800 dark:via-white dark:to-white  py-2 md:text-4xl lg:text-5xl font-semibold max-w-4xl mx-auto text-center">
            Agence Web à {data.ville}
          </h1>
          <p className="md:text-lg tracking-wider leading-relaxed text-base px-5 text-center text-neutral-900 dark:text-neutral-300 max-w-2xl mx-auto mt-5">
            {data.intro}
          </p>
        </div>
        <div className="w-full aspect-[1.6/1] max-sm:scale-150 rounded-lg relative font-sans">
          <Image
            src={"/france-dots-map-dark.svg"}
            className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none dark:block hidden"
            alt="Carte pointillée France"
            height={495}
            width={1056}
            draggable={false}
          />
          <Image
            src={"/france-dots-map.svg"}
            className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none block dark:hidden"
            alt="Carte pointillée France"
            height={495}
            width={1056}
            draggable={false}
          />
          <svg
            ref={svgRef}
            viewBox="0 0 800 500"
            className="w-full h-full z-40 absolute inset-0 pointer-events-none select-none"
          >
            <g>
              <circle cx={x} cy={y} r="3" fill="#0ea5e9" />
              <circle cx={x} cy={y} r="3" fill="#0ea5e9" opacity="0.2">
                <animate
                  attributeName="r"
                  from="4"
                  to="10"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center z-10 justify-center relative gap-4 -top-[50px]">
        <p className="md:text-lg text-base px-5 text-center max-w-2xl mx-auto text-neutral-900 dark:text-neutral-300">
          {data.text1}
        </p>
        <Link href="/contact">
          <AnimatedBorderButton>
            <span className="flex items-center justify-center gap-2">
              <span aria-hidden="true">
                <IconMessage2 />
              </span>
              Nous contacter
            </span>
          </AnimatedBorderButton>
        </Link>
      </div>
      <Services serviceAgenceWeb={data.services} />
      <div className="relative z-0">
        <div className="absolute inset-0 z-0 [background-size:20px_20px] [background-image:radial-gradient(#d4d4d4_1.2px,transparent_1px)] dark:[background-image:radial-gradient(#404040_1.2px,transparent_1px)]" />
        <div className="absolute h-[100px] z-10 bottom-0 left-0 w-full bg-gradient-to-t from-[#F4FAFB] dark:from-black to-transparent from-30%" />
        <div className="absolute h-[250px] z-10 top-0 -translate-y-1/2 left-0 w-full bg-gradient-to-b from-[#F4FAFB] dark:from-black to-transparent from-30%" />
        <Objectif
          objectifTitle={data.objectifs.objectifTitle}
          text1={data.objectifs.text1}
          text2={data.objectifs.text2}
        />
        <CityAround
          city={data.ville}
          cities={data.villesVoisines}
          text={data.cityAroundText}
        />
      </div>

      <CallToAction
        title={data.CTATitle}
        desc={data.CTADesc}
        textBtn={data.CTATextBtn}
      />
    </div>
  );
}
