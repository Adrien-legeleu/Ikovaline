'use client';
import React, { useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { Lens } from '@/components/ui/lens';
import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
  Position,
} from 'geojson';

/* ---------- Type guards ---------- */

function isLngLat(p: unknown): p is Position {
  return (
    Array.isArray(p) && p.length >= 2 && p.every((n) => typeof n === 'number')
  );
}
function isLinearRing(r: unknown): r is Position[] {
  return Array.isArray(r) && r.every(isLngLat);
}
function isPolygonCoords(c: unknown): c is Position[][] {
  return Array.isArray(c) && c.every(isLinearRing);
}
function isMultiPolygonCoords(c: unknown): c is Position[][][] {
  return (
    Array.isArray(c) &&
    c.every((poly) => Array.isArray(poly) && poly.every(isLinearRing))
  );
}

type PropsShape = { code: string; nom: string };
type AllowedGeom = Polygon | MultiPolygon;

function hasProps(o: unknown): o is PropsShape {
  return (
    typeof o === 'object' &&
    o !== null &&
    'code' in o &&
    'nom' in o &&
    typeof (o as { code: unknown }).code === 'string' &&
    typeof (o as { nom: unknown }).nom === 'string'
  );
}

function isAllowedFeature(f: unknown): f is Feature<AllowedGeom, PropsShape> {
  if (typeof f !== 'object' || f === null) return false;
  if ((f as { type?: unknown }).type !== 'Feature') return false;

  const geom = (f as Feature).geometry;
  if (!geom || typeof geom !== 'object') return false;

  if (geom.type === 'Polygon' && isPolygonCoords(geom.coordinates))
    return hasProps((f as Feature).properties);
  if (geom.type === 'MultiPolygon' && isMultiPolygonCoords(geom.coordinates))
    return hasProps((f as Feature).properties);
  return false;
}

/* ---------- Props ---------- */

interface CarteEssonneProps {
  // accepte soit un array brut, soit un FeatureCollection.features
  data: unknown[] | FeatureCollection['features'];
  highlighted: string;
  width: number;
  height: number;
}

/* ---------- Composant ---------- */

export default function CarteEssonne({
  data,
  highlighted,
  width,
  height,
}: CarteEssonneProps) {
  const { theme } = useTheme();
  const [hovering, setHovering] = useState(false);

  // ❗ normalisation explicite -> unknown[] puis filtrage via type guard
  const features = useMemo<Feature<AllowedGeom, PropsShape>[]>(() => {
    const arr: unknown[] = Array.isArray(data)
      ? data
      : ((data as FeatureCollection).features as unknown[]);
    return arr.filter(isAllowedFeature);
  }, [data]);

  // bbox (anneau extérieur uniquement)
  const { minLng, maxLng, minLat, maxLat } = useMemo(() => {
    let minLng = Infinity,
      maxLng = -Infinity,
      minLat = Infinity,
      maxLat = -Infinity;

    const pushPoint = ([lng, lat]: Position) => {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    };

    for (const f of features) {
      const g = f.geometry;
      if (g.type === 'Polygon') g.coordinates[0].forEach(pushPoint);
      else g.coordinates.forEach((poly) => poly[0].forEach(pushPoint));
    }

    if (!isFinite(minLng) || maxLng === minLng || maxLat === minLat) {
      minLng = 0;
      maxLng = 1;
      minLat = 0;
      maxLat = 1;
    }
    return { minLng, maxLng, minLat, maxLat };
  }, [features]);

  const project = (lng: number, lat: number) => ({
    x: ((lng - minLng) / (maxLng - minLng)) * width,
    y: ((maxLat - lat) / (maxLat - minLat)) * height,
  });

  const target = highlighted.toLowerCase();
  const hasCity = features.some(
    (f) => f.properties.nom.toLowerCase() === target
  );
  if (!hasCity) return null;

  const fillFor = (name: string) =>
    name.toLowerCase() === target
      ? '#0ea5e9'
      : theme === 'dark'
        ? '#000'
        : '#fff';
  const stroke = theme === 'dark' ? '#d3d3d3' : '#000';

  const ringToPath = (ring: Position[]) =>
    'M ' +
    ring
      .map(([lng, lat]) => {
        const { x, y } = project(lng, lat);
        return `${x},${y}`;
      })
      .join(' L ') +
    ' Z';

  const polygonToPath = (poly: Position[][]) => poly.map(ringToPath).join(' ');
  const multiPolygonToPath = (mp: Position[][][]) =>
    mp.map((poly) => poly.map(ringToPath).join(' ')).join(' ');

  return (
    <div className="lg:w-[260px] lg:h-[260px] sm:w-[230px] sm:h-[230px] w-[200px] h-[200px] z-20 absolute bottom-10 sm:left-1/2 left-0 -translate-x-1/2">
      <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-white/20 dark:bg-white/10 pointer-events-none z-0" />
      <div className="w-full h-full p-5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-[2px] border border-black/10 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.3),_0_10px_30px_rgba(0,0,0,0.1)] absolute bottom-10 left-1/2 translate-x-5 z-10">
        <Lens hovering={hovering} setHovering={setHovering}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full z-50 pointer-events-none select-none"
          >
            {features.map((feature) => {
              const name = feature.properties.nom;
              const fill = fillFor(name);

              if (feature.geometry.type === 'Polygon') {
                const d = polygonToPath(feature.geometry.coordinates);
                return (
                  <path
                    key={feature.properties.code}
                    d={d}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={0.5}
                    fillRule="evenodd"
                  />
                );
              }

              // MultiPolygon
              const d = multiPolygonToPath(feature.geometry.coordinates);
              return (
                <path
                  key={feature.properties.code}
                  d={d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={0.5}
                  fillRule="evenodd"
                />
              );
            })}
          </svg>
        </Lens>
      </div>
    </div>
  );
}
