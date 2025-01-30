"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className=" p-0"
    >
      {theme === "dark" ? (
        <Sun className="[360px]:min-w-6 min-w-5 min-h-6" />
      ) : (
        <Moon className="[360px]:min-w-6 min-w-5 min-h-6" />
      )}
    </Button>
  );
}
