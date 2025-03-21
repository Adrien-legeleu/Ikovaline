"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import { Button } from "./button";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[50rem] md:h-[65rem] w-2/3 mx-auto flex flex-col items-center justify-center relative p-2 "
      ref={containerRef}
    >
      <div
        className=" w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />

        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
      <Button
        variant={"secondary"}
        className="absolute bottom-5  left-1/2 -translate-x-1/2 text-xl px-5 py-6 rounded-2xl"
      >
        Contactez-nous !
      </Button>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl z-10 relative mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="max-w-5xl sm:shadow-servicepc shadow-servicemobile -mt-10 -z-10  mx-auto h-[25rem] md:h-[38rem] w-full border-2 border-[#6C6C6C] p-1 md:p-2 bg-[#222222] rounded-3xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-3xl bg-background md:rounded-2xl md:p-1 ">
        {children}
      </div>
    </motion.div>
  );
};
