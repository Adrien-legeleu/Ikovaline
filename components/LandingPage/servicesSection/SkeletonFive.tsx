"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "../../ui/animated-circular-progress-bar";

export function SkeletonFiveComponent() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev >= 100) {
        return 0;
      }

      const newValue = prev + Math.random() * 15 + 10;

      return newValue > 100 ? 100 : newValue;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="rgba(39, 209, 17, 0.9)"
      gaugeSecondaryColor="rgba(197, 10, 10, 0.08)"
    />
  );
}
