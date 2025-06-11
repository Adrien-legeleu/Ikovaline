// ✅ Nouveau composant CarteEssonne parfaitement typé et corrigé
"use client";
import React from "react";
import { useTheme } from "next-themes";

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
function getBoundingBox(data: any[]) {
  let minLng = Infinity,
    maxLng = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  data.forEach((feature) => {
    if (feature.geometry.type !== "Polygon") return;
    feature.geometry.coordinates[0].forEach(([lng, lat]: [number, number]) => {
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

  const width = 800;
  const height = 800;

  const project = (lng: number, lat: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * width;
    const y = ((maxLat - lat) / (maxLat - minLat)) * height;
    return { x, y };
  };

  return (
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
  );
}
