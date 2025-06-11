"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Lens } from "@/components/ui/lens";

interface GeoFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    code: string;
    nom: string;
  };
}

interface CarteEssonneProps {
  data: GeoFeature[];
  highlighted: string;
}
function getBoundingBox(data: GeoFeature[]) {
  let minLng = Infinity,
    maxLng = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  data.forEach((feature) => {
    if (feature.geometry.type !== "Polygon") return;
    feature.geometry.coordinates[0].forEach(([lng, lat]) => {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    });
  });
  return { minLng, maxLng, minLat, maxLat };
}

export default function CarteEssonne({ data, highlighted }: CarteEssonneProps) {
  const { minLng, maxLng, minLat, maxLat } = getBoundingBox(data);
  const { theme } = useTheme();

  const [hovering, setHovering] = useState(false);

  const width = 800;
  const height = 800;

  const project = (lng: number, lat: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * width;
    const y = ((maxLat - lat) / (maxLat - minLat)) * height;
    return { x, y };
  };
  if (
    !data.some(
      (city) => city.properties.nom.toLowerCase() === highlighted.toLowerCase()
    )
  ) {
    return null;
  }

  return (
    <div className="lg:w-[260px] lg:h-[260px] sm:w-[230px] sm:h-[230px] w-[200px] h-[200px] z-20 absolute bottom-10 sm:left-1/2 left-0 -translate-x-1/2">
      <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-white/20 dark:bg-white/10 pointer-events-none z-0" />
      <div
        className="w-full h-full p-5 rounded-full
      bg-white/10 dark:bg-white/5
      backdrop-blur-[2px]
      border border-black/10
      shadow-[inset_0_0_0.5px_rgba(255,255,255,0.3),_0_10px_30px_rgba(0,0,0,0.1)]
      absolute bottom-10 left-1/2 translate-x-5 z-10"
      >
        <Lens hovering={hovering} setHovering={setHovering}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full z-50 pointer-events-none select-none"
          >
            {data.map((feature) => {
              if (feature.type !== "Feature") return null;
              if (feature.geometry.type !== "Polygon") return null;

              const coords = feature.geometry.coordinates[0];
              const name = feature.properties.nom;

              return (
                <path
                  key={feature.properties.code}
                  d={`M ${coords
                    .map(([lng, lat]) => {
                      const { x, y } = project(lng, lat);
                      return `${x},${y}`;
                    })
                    .join(" L ")} Z`}
                  fill={
                    name.toLowerCase() === highlighted.toLowerCase()
                      ? "#0ea5e9"
                      : theme == "dark"
                        ? "#000"
                        : "#ffffff"
                  }
                  stroke={theme == "dark" ? "#d3d3d3" : "#000000"}
                  strokeWidth={0.5}
                />
              );
            })}
          </svg>
        </Lens>
      </div>
    </div>
  );
}
