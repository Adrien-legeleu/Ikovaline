import { cn } from "@/lib/utils";
import React from "react";

interface GlowProps {
  variant?: "above" | "below" | "center";
  className?: string;
}

export function Glow({ variant = "center", className }: GlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0",
        {
          "top-[-200px]": variant === "above",
          "bottom-[-200px]": variant === "below",
        },
        className
      )}
    >
      <div
        className={cn(
          "absolute",
          "rounded-full",
          "opacity-70 blur-[100px]",
          "bg-brand/30",
          {
            "left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2":
              variant === "above",
            "left-1/2 bottom-0 h-[500px] w-[700px] -translate-x-1/2":
              variant === "below",
            "left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2":
              variant === "center",
          }
        )}
      />
    </div>
  );
}
