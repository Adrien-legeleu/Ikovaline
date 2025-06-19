import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
  
}: {
  className?: string;
  children?: React.ReactNode;
  
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem]  px-2  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-8 max-w-[1400px] mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  link,
  icon,
}: {
  className?: string;
  link: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <Link
      href={link}
      className={cn(
        "relative rounded-3xl z-10   group/bento hover:shadow-xl transition duration-200 border-[#00000006] dark:border-[#ffffff12] border-[1px]   shadow-input dark:shadow-none px-4  bg-[#ffffff3d] dark:bg-[#00000048] ",
        className
      )}
    >
      
      <div className="row-span-1 rounded-3xl  grid-rows-2  grid relative  h-full  group/bento   justify-center  space-y-12">
        {header}

        <div className="group-hover/bento:translate-x-2 transition   duration-200">
          <div className=" relative  text-lg lg:text-xl 2xl:text-2xl pr-6  font-bold text-neutral-600 dark:text-neutral-200 ">
            <span>{title} </span>
            <span
              aria-hidden="true"
              className="absolute top-1/2 -translate-y-1/2 right-0"
            >
              {icon}
            </span>
          </div>
          <div className=" pt-2  font-normal text-neutral-600 text-sm dark:text-neutral-300">
            {description}
          </div>
        </div>
      </div>
      <GlowingEffect
        spread={80}
        blur={3}
        borderWidth={6}
        glow={true}
        disabled={false}
        proximity={80}
        inactiveZone={0.01}
      />
    </Link>
  );
};
