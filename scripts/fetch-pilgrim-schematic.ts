import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as turf from "@turf/turf";

const OUT_DIR = resolve(process.cwd(), "public/data/pilgrimage");
const ARC_POINTS = 48;

function buildArc(waypoints: [number, number][]): [number, number][] {
  const coords: [number, number][] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const arc = turf.greatCircle(waypoints[i]!, waypoints[i + 1]!, { npoints: ARC_POINTS });
    const seg = arc.geometry.coordinates as [number, number][];
    coords.push(...(coords.length ? seg.slice(1) : seg));
  }
  return coords;
}

function lineFeature(id: string, name: string, waypoints: [number, number][]) {
  return {
    type: "Feature" as const,
    properties: { id, name },
    geometry: { type: "LineString" as const, coordinates: buildArc(waypoints) },
  };
}

const medina: [number, number] = [39.6142, 24.4672];
const mecca: [number, number] = [39.8262, 21.4225];
const chak: [number, number] = [55.9167, 32.0167];
const yazd: [number, number] = [54.3675, 31.8974];

const bodhgaya: [number, number] = [84.9919, 24.6951];
const sarnath: [number, number] = [83.0214, 25.3811];
const kushinagar: [number, number] = [83.8869, 26.7393];
const lumbini: [number, number] = [83.276, 27.4692];

const prayagraj: [number, number] = [81.8463, 25.4358];
const haridwar: [number, number] = [78.1642, 29.9457];
const ujjain: [number, number] = [75.8069, 23.1765];
const nashik: [number, number] = [73.7898, 19.9975];

const hajj = {
  type: "FeatureCollection",
  features: [
    lineFeature("damascus", "Damascus → Mecca", [[36.2919, 33.5102], medina, mecca]),
    lineFeature("cairo", "Cairo → Mecca", [[31.2357, 30.0444], [34.8, 28.5], medina, mecca]),
    lineFeature("kufa", "Kufa → Mecca", [[44.4009, 32.0], [42.5, 29.0], medina, mecca]),
  ],
};

const chakchak = {
  type: "FeatureCollection",
  features: [
    lineFeature("tehran", "Tehran → Chak Chak", [[51.389, 35.6892], [54.0, 33.5], chak]),
    lineFeature("kerman", "Kerman → Chak Chak", [[57.0788, 30.2839], [56.5, 31.5], chak]),
    lineFeature("yazd", "Yazd → Chak Chak", [yazd, chak]),
    lineFeature("mumbai", "Mumbai → Chak Chak", [[72.8777, 19.076], [65.0, 24.0], [58.0, 28.0], chak]),
  ],
};

const buddhist = {
  type: "FeatureCollection",
  features: [
    lineFeature("bodhgaya-sarnath", "Bodh Gaya → Sarnath", [bodhgaya, sarnath]),
    lineFeature("sarnath-kushinagar", "Sarnath → Kushinagar", [sarnath, kushinagar]),
    lineFeature("kushinagar-lumbini", "Kushinagar → Lumbini", [kushinagar, lumbini]),
  ],
};

const kumbh = {
  type: "FeatureCollection",
  features: [
    lineFeature("prayagraj-haridwar", "Prayagraj → Haridwar", [prayagraj, haridwar]),
    lineFeature("haridwar-ujjain", "Haridwar → Ujjain", [haridwar, ujjain]),
    lineFeature("ujjain-nashik", "Ujjain → Nashik", [ujjain, nashik]),
    lineFeature("nashik-prayagraj", "Nashik → Prayagraj", [nashik, prayagraj]),
  ],
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, "hajj-legs.geojson"), JSON.stringify(hajj));
writeFileSync(resolve(OUT_DIR, "chakchak-legs.geojson"), JSON.stringify(chakchak));
writeFileSync(resolve(OUT_DIR, "buddhist-circuit.geojson"), JSON.stringify(buddhist));
writeFileSync(resolve(OUT_DIR, "kumbh-cycle.geojson"), JSON.stringify(kumbh));
console.log("Wrote hajj, chakchak, buddhist-circuit, and kumbh-cycle geojson files");
