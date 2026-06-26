import type { RouteKey } from "../data/pilgrimage-routes";

const PILGRIMAGE_IMAGE_FILES: Record<Exclude<RouteKey, "all">, string> = {
  hajj: "hajj.png",
  camino: "camino.png",
  chakchak: "chakchak.png",
  buddhist: "thefourgreatplaces.png",
  kumbh: "kumbh.png",
};

export function getPilgrimageImageSrc(routeKey: Exclude<RouteKey, "all">): string {
  return `/assets/img/pilgrimage/${PILGRIMAGE_IMAGE_FILES[routeKey]}`;
}
