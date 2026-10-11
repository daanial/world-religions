import type { RouteKey } from "../data/pilgrimage-routes";

const PILGRIMAGE_IMAGE_FILES: Record<Exclude<RouteKey, "all">, string> = {
  hajj: "hajj.webp",
  camino: "camino.webp",
  chakchak: "chakchak.webp",
  buddhist: "thefourgreatplaces.webp",
  kumbh: "kumbh.webp",
};

export function getPilgrimageImageSrc(routeKey: Exclude<RouteKey, "all">): string {
  return `/assets/img/pilgrimage/${PILGRIMAGE_IMAGE_FILES[routeKey]}`;
}
