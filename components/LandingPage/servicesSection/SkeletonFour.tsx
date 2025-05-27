"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Janvier", impressions: 1000, clics: 350 },
  { month: "Février", impressions: 1200, clics: 550 },
  { month: "Mars", impressions: 1500, clics: 600 },
  { month: "Avril", impressions: 1800, clics: 650 },
  { month: "Mai", impressions: 1600, clics: 750 },
  { month: "Juin", impressions: 2000, clics: 900 },
];

const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-1))",
  },
  clics: {
    label: "Clics",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SkeletonFourComponent() {
  return (
    <Card className="border-none bg-white dark:bg-neutral-800 w-full shadow-none ">
      <CardHeader className="p-2">
        <CardTitle className="text-neutral-500 dark:text-neutral-400 text-sm">
          Graphique - Clics et Impressions
        </CardTitle>
        <CardDescription className="text-neutral-400 dark:text-neutral-500 text-xs">
          Janvier - Juin 2025
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            /> */}
            <Bar
              dataKey="impressions"
              fill="var(--color-impressions)"
              radius={4}
            />
            <Bar dataKey="clics" fill="var(--color-clics)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
