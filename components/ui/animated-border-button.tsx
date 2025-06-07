import { cn } from "@/lib/utils";
import { ElementType, ComponentPropsWithoutRef } from "react";

interface ButtonBorderProps<T extends ElementType> {
  as?: T;
  color?: string;
  speed?: string;
  className?: string;
  children: React.ReactNode;
}

export function AnimatedBorderButton<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: ButtonBorderProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonBorderProps<T>>) {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-button-border-movement-bottom z-0",
          "opacity-90 dark:opacity-50"
        )}
        style={{
          background: `radial-gradient(circle, #2fcbea, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-button-border-movement-top z-0",
          "opacity-90 dark:opacity-50"
        )}
        style={{
          background: `radial-gradient(circle, #2fcbea, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "relative z-1 border text-foreground text-center text-base py-4 px-6 rounded-[20px]",
          "bg-gradient-to-b from-[#f4fafbc9] to-[#e5eaecd8] border-border/40",
          "dark:from-[#090d11e2] dark:to-[#17212bdd] dark:border-border"
        )}
      >
        {children}
      </div>
    </Component>
  );
}
