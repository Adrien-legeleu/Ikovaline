import { cn } from "@/lib/utils";

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
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
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
        "row-span-1 rounded-xl font-poppins grid-rows-2 grid  group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none px-4  bg-white border border-transparent justify-center  space-y-12",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-poppins relative   font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-02">
          <span className="pr-6">{title} </span>
          <span className="absolute top-1/2 -translate-y-1/2 right-0">
            {" "}
            {icon}
          </span>
        </div>
        <div className="font-poppins  font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
