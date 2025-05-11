import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

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
        "grid md:auto-rows-[18rem]  px-2  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto ",
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
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-3xl   group/bento hover:shadow-xl transition duration-200  border shadow-input dark:shadow-none px-4  bg-white dark:bg-neutral-800",
        className
      )}
    >
      <div
        className={cn(
          "row-span-1 rounded-3xl font-poppins grid-rows-2  grid relative  h-full  group/bento   justify-center  space-y-12",
          className
        )}
      >
        {header}

        <div className="group-hover/bento:translate-x-2 transition   duration-200">
          <div className="font-poppins relative  text-lg lg:text-xl pr-6  font-bold text-neutral-600 dark:text-neutral-200 ">
            <span>{title} </span>
            <span className="absolute top-1/2 -translate-y-1/2 right-0">
              {" "}
              {icon}
            </span>
          </div>
          <div className="font-poppins pt-2 font-normal text-neutral-600 text-sm dark:text-neutral-300">
            {description}
          </div>
        </div>
      </div>
      <GlowingEffect
        spread={60}
        blur={3}
        borderWidth={4}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
    </div>
  );
};
