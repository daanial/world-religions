import { CONCEPTS } from "../data/concepts";
import {
  PILGRIMAGE_CONTENT,
  ROUTE_ORDER,
  ROUTES,
  type RouteKey,
} from "../data/pilgrimage-routes";
import { getReligionEssay } from "../data/religion-essays";
import { RELIGIONS } from "../data/religions";

export type NarrationKind = "religion" | "pilgrimage" | "concept";

export interface NarrationUnit {
  id: string;
  kind: NarrationKind;
  label: string;
  text: string;
}

export function religionNarrationId(religionId: string): string {
  return `religion-${religionId}`;
}

export function pilgrimageNarrationId(routeKey: Exclude<RouteKey, "all">): string {
  return `pilgrimage-${routeKey}`;
}

export function conceptNarrationId(conceptId: string): string {
  return `concept-${conceptId}`;
}

export function buildNarrationCatalog(): NarrationUnit[] {
  const units: NarrationUnit[] = [];

  for (const religion of RELIGIONS) {
    const essay = getReligionEssay(religion.id);
    const text = essay ? essay.paragraphs.join("\n\n") : religion.description;
    units.push({
      id: religionNarrationId(religion.id),
      kind: "religion",
      label: religion.name,
      text,
    });
  }

  for (const routeKey of ROUTE_ORDER) {
    const content = PILGRIMAGE_CONTENT[routeKey];
    const route = ROUTES[routeKey];
    units.push({
      id: pilgrimageNarrationId(routeKey),
      kind: "pilgrimage",
      label: `${content.religionLabel} — ${route.name}`,
      text: content.paragraphs.join("\n\n"),
    });
  }

  for (const concept of CONCEPTS) {
    units.push({
      id: conceptNarrationId(concept.id),
      kind: "concept",
      label: concept.label,
      text: concept.description,
    });
  }

  return units;
}

const catalogMap = new Map(buildNarrationCatalog().map((unit) => [unit.id, unit]));

export function getNarrationUnit(id: string): NarrationUnit | undefined {
  return catalogMap.get(id);
}

export function isAllowedNarrationId(id: string): boolean {
  return catalogMap.has(id);
}

export const NARRATION_IDS = [...catalogMap.keys()];
