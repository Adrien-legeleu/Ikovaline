import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-black shadow-xl shadow-black/15 dark:shadow-white/10 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xl shadow-black/15 dark:shadow-white/10 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-xl shadow-black/15 dark:shadow-white/10 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-black shadow-xl shadow-black/15 dark:shadow-white/10 hover:bg-secondary/80",
        ghost: "",
        link: "text-primary underline-offset-4 ",
        style: "gradient-button shadow-xl shadow-black/15 dark:shadow-white/10",
        styleVariant:
          "gradient-button-variant shadow-xl shadow-black/15 dark:shadow-white/10",
      },
      size: {
        default: "h-9 px-5 py-5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { type, ...restProps } = props;
    const safeProps = asChild
      ? restProps
      : { ...restProps, type: type || "button" };
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...safeProps}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
