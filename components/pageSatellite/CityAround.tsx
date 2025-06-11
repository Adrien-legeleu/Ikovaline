import Link from "next/link";
import React from "react";

export const removeAccents = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

export default function CityAround({
  city,
  cities,
  text,
}: {
  city: string;
  cities: string[];
  text: JSX.Element | string;
}) {
  return (
    <div className="z-20 relative">
      {" "}
      <div className="flex items-center justify-center py-20 px-5 gap-10 flex-col max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-800 dark:from-neutral-400 dark:via-white dark:to-white  py-2 md:text-3xl lg:text-4xl max-w-4xl mx-auto">
          Voir plus d&apos;agences à {city}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
          {cities.map((c, index) => (
            <Link
              key={index}
              href={`/agence-web-${removeAccents(c)}`}
              className="border-black/10 dark:border-white/10 shadow-md border-[1px] px-2 flex gap-2 bg-white dark:bg-neutral-900 items-center justify-center py-1 rounded-full "
            >
              <div className="h-2 w-2 bg-secondary rounded-full" />
              {c}
            </Link>
          ))}
        </div>
        <p className="text-justify md:text-lg text-neutral-900 dark:text-neutral-300">
          {text}
        </p>
      </div>
    </div>
  );
}
