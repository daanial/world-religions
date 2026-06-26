import type { RouteKey } from "./pilgrimage-routes";

export interface GeoPlace {
  id: string;
  label: string;
  lng: number;
  lat: number;
  isDest?: boolean;
}

export interface RouteLegGeo {
  id: string;
  label: string;
  geojsonUrl: string;
}

export const GEO_PLACES: Record<string, GeoPlace> = {
  paris: { id: "paris", label: "Paris", lng: 2.3522, lat: 48.8566 },
  lepuy: { id: "lepuy", label: "Le Puy-en-Velay", lng: 3.8852, lat: 45.0433 },
  arles: { id: "arles", label: "Arles", lng: 4.6301, lat: 43.6767 },
  santiago: { id: "santiago", label: "Santiago de Compostela", lng: -8.5456, lat: 42.8805, isDest: true },
  damascus: { id: "damascus", label: "Damascus", lng: 36.2919, lat: 33.5102 },
  cairo: { id: "cairo", label: "Cairo", lng: 31.2357, lat: 30.0444 },
  kufa: { id: "kufa", label: "Kufa", lng: 44.4009, lat: 32.0 },
  medina: { id: "medina", label: "Medina", lng: 39.6142, lat: 24.4672 },
  mecca: { id: "mecca", label: "Mecca", lng: 39.8262, lat: 21.4225, isDest: true },
  tehran: { id: "tehran", label: "Tehran", lng: 51.389, lat: 35.6892 },
  kerman: { id: "kerman", label: "Kerman", lng: 57.0788, lat: 30.2839 },
  yazd: { id: "yazd", label: "Yazd", lng: 54.3675, lat: 31.8974 },
  mumbai: { id: "mumbai", label: "Mumbai", lng: 72.8777, lat: 19.076 },
  chakchak: { id: "chakchak", label: "Chak Chak", lng: 55.9167, lat: 32.0167, isDest: true },
  bodhgaya: { id: "bodhgaya", label: "Bodh Gaya", lng: 84.9919, lat: 24.6951 },
  sarnath: { id: "sarnath", label: "Sarnath", lng: 83.0214, lat: 25.3811 },
  kushinagar: { id: "kushinagar", label: "Kushinagar", lng: 83.8869, lat: 26.7393 },
  lumbini: { id: "lumbini", label: "Lumbini", lng: 83.276, lat: 27.4692, isDest: true },
  prayagraj: { id: "prayagraj", label: "Prayagraj", lng: 81.8463, lat: 25.4358 },
  haridwar: { id: "haridwar", label: "Haridwar", lng: 78.1642, lat: 29.9457 },
  nashik: { id: "nashik", label: "Nashik", lng: 73.7898, lat: 19.9975 },
  ujjain: { id: "ujjain", label: "Ujjain", lng: 75.8069, lat: 23.1765 },
};

export const CAMINO_LEGS: RouteLegGeo[] = [
  { id: "paris", label: "Via Turonensis (Paris)", geojsonUrl: "/data/pilgrimage/camino-paris.geojson" },
  { id: "lepuy", label: "Via Podiensis (Le Puy)", geojsonUrl: "/data/pilgrimage/camino-lepuy.geojson" },
  { id: "arles", label: "Voie d'Arles", geojsonUrl: "/data/pilgrimage/camino-arles.geojson" },
];

export const HAJJ_LEGS: RouteLegGeo[] = [
  { id: "damascus", label: "Damascus caravan road", geojsonUrl: "/data/pilgrimage/hajj-legs.geojson" },
  { id: "cairo", label: "Egyptian caravan road", geojsonUrl: "/data/pilgrimage/hajj-legs.geojson" },
  { id: "kufa", label: "Iraqi (Darb Zubayda) road", geojsonUrl: "/data/pilgrimage/hajj-legs.geojson" },
];

export const CHAKCHAK_LEGS: RouteLegGeo[] = [
  { id: "tehran", label: "From Tehran", geojsonUrl: "/data/pilgrimage/chakchak-legs.geojson" },
  { id: "kerman", label: "From Kerman", geojsonUrl: "/data/pilgrimage/chakchak-legs.geojson" },
  { id: "yazd", label: "From Yazd", geojsonUrl: "/data/pilgrimage/chakchak-legs.geojson" },
  { id: "mumbai", label: "From Mumbai (diaspora)", geojsonUrl: "/data/pilgrimage/chakchak-legs.geojson" },
];

export const BUDDHIST_LEGS: RouteLegGeo[] = [
  { id: "bodhgaya-sarnath", label: "Bodh Gaya → Sarnath", geojsonUrl: "/data/pilgrimage/buddhist-circuit.geojson" },
  { id: "sarnath-kushinagar", label: "Sarnath → Kushinagar", geojsonUrl: "/data/pilgrimage/buddhist-circuit.geojson" },
  { id: "kushinagar-lumbini", label: "Kushinagar → Lumbini", geojsonUrl: "/data/pilgrimage/buddhist-circuit.geojson" },
];

export const KUMBH_LEGS: RouteLegGeo[] = [
  { id: "prayagraj-haridwar", label: "Prayagraj → Haridwar", geojsonUrl: "/data/pilgrimage/kumbh-cycle.geojson" },
  { id: "haridwar-ujjain", label: "Haridwar → Ujjain", geojsonUrl: "/data/pilgrimage/kumbh-cycle.geojson" },
  { id: "ujjain-nashik", label: "Ujjain → Nashik", geojsonUrl: "/data/pilgrimage/kumbh-cycle.geojson" },
  { id: "nashik-prayagraj", label: "Nashik → Prayagraj", geojsonUrl: "/data/pilgrimage/kumbh-cycle.geojson" },
];

export const ROUTE_BOUNDS: Record<Exclude<RouteKey, "all">, [[number, number], [number, number]]> = {
  hajj: [[30, 18], [48, 36]],
  camino: [[-9.5, 42], [3.5, 49.5]],
  chakchak: [[50, 18], [76, 37]],
  buddhist: [[82.8, 24.4], [85.2, 27.6]],
  kumbh: [[73, 19.5], [82.5, 30.5]],
};

/** Shared line palette — same visual language across all geographic maps. */
export const LEG_PALETTE: Record<Exclude<RouteKey, "all">, string[]> = {
  hajj: ["#e6b450", "#f0cd80", "#c9922e"],
  camino: ["#d8485b", "#e0708e", "#c93650"],
  chakchak: ["#d69a2c", "#e8b04a", "#b87a20"],
  buddhist: ["#5fbf8f", "#7fd4a8", "#4a9f72"],
  kumbh: ["#f0933b", "#f5b56a", "#d97a28"],
};

export function legsForRoute(routeKey: Exclude<RouteKey, "all">): RouteLegGeo[] {
  if (routeKey === "hajj") return HAJJ_LEGS;
  if (routeKey === "camino") return CAMINO_LEGS;
  if (routeKey === "chakchak") return CHAKCHAK_LEGS;
  if (routeKey === "buddhist") return BUDDHIST_LEGS;
  return KUMBH_LEGS;
}

export function placesForRoute(routeKey: Exclude<RouteKey, "all">): GeoPlace[] {
  const keys: Record<Exclude<RouteKey, "all">, string[]> = {
    hajj: ["damascus", "cairo", "kufa", "medina", "mecca"],
    camino: ["paris", "lepuy", "arles", "santiago"],
    chakchak: ["tehran", "kerman", "yazd", "mumbai", "chakchak"],
    buddhist: ["bodhgaya", "sarnath", "kushinagar", "lumbini"],
    kumbh: ["prayagraj", "haridwar", "ujjain", "nashik"],
  };
  return keys[routeKey].map((k) => GEO_PLACES[k]!);
}
