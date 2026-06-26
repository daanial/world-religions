import * as turf from "@turf/turf";
import gsap from "gsap";

export interface LegGeometry {
  id: string;
  coordinates: [number, number][];
  lengthKm: number;
}

export function coordsFromLine(geometry: GeoJSON.LineString | GeoJSON.MultiLineString): [number, number][] {
  if (geometry.type === "LineString") return geometry.coordinates as [number, number][];
  return geometry.coordinates.flat() as [number, number][];
}

export function sliceLine(coords: [number, number][], progress: number): GeoJSON.Feature<GeoJSON.LineString> {
  if (coords.length < 2 || progress <= 0) {
    const seed = coords.length >= 2 ? coords.slice(0, 2) : coords;
    return turf.lineString(seed);
  }
  const line = turf.lineString(coords);
  const len = turf.length(line, { units: "kilometers" });
  if (progress >= 1) return line;
  return turf.lineSliceAlong(line, 0, len * progress, { units: "kilometers" });
}

export function pointAlong(coords: [number, number][], progress: number): [number, number] {
  if (coords.length < 2) return coords[0] ?? [0, 0];
  const line = turf.lineString(coords);
  const len = turf.length(line, { units: "kilometers" });
  const pt = turf.along(line, len * Math.min(Math.max(progress, 0), 1), { units: "kilometers" });
  return pt.geometry.coordinates as [number, number];
}

interface AnimateLegsOptions {
  legs: LegGeometry[];
  reduceMotion: boolean;
  onLegProgress: (legId: string, feature: GeoJSON.Feature<GeoJSON.LineString>) => void;
  onPilgrim: (lngLat: [number, number]) => void;
  onComplete?: () => void;
}

export function animateLegs({
  legs,
  reduceMotion,
  onLegProgress,
  onPilgrim,
  onComplete,
}: AnimateLegsOptions): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete });

  if (reduceMotion) {
    legs.forEach((leg) => {
      onLegProgress(leg.id, turf.lineString(leg.coordinates));
      onPilgrim(leg.coordinates[leg.coordinates.length - 1]!);
    });
    return tl;
  }

  legs.forEach((leg, index) => {
    const state = { p: 0 };
    tl.to(
      state,
      {
        p: 1,
        duration: Math.min(2.8, 0.8 + leg.lengthKm / 400),
        ease: "power2.inOut",
        onUpdate: () => {
          onLegProgress(leg.id, sliceLine(leg.coordinates, state.p));
          onPilgrim(pointAlong(leg.coordinates, state.p));
        },
      },
      index === 0 ? 0 : "-=0.15"
    );
  });

  return tl;
}
