import { RELIGIONS } from "../data/religions";

export const SITE_URL = "https://religions.cubexic.com";
export const SITE_NAME = "World Religions Explorer";
export const SITE_DESCRIPTION =
  "Explore 6,000 years of belief systems through interactive timelines, a sacred geography globe, concept networks, and side-by-side comparisons across 34 traditions.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/img/christianity.png`;

export const STATIC_ROUTES = [
  "/",
  "/timeline",
  "/globe",
  "/compare",
  "/concepts",
  "/pilgrimage",
  "/inward-paths",
  "/about",
] as const;

export function getReligionRoutes(): string[] {
  return RELIGIONS.map((religion) => `/religion/${religion.id}`);
}

export function getAllRoutes(): string[] {
  return [...STATIC_ROUTES, ...getReligionRoutes()];
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
