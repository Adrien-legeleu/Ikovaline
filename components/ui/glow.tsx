import { cn } from "@/lib/utils";

export function Glow({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "above";
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0",
        variant === "above" &&
          "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/30 via-blue-300/10 to-transparent",
        className
      )}
    />
  );
}
