import { RELIGIONS } from "../religions";
import { ANCIENT_ESSAYS } from "./ancient";
import { ABRAHAMIC_ESSAYS } from "./abrahamic";
import { EAST_ASIAN_ESSAYS } from "./east-asian";
import { INDIAN_ESSAYS } from "./indian";
import { INDIGENOUS_ESSAYS } from "./indigenous";
import { OTHER_ESSAYS } from "./other";
import type { ReligionEssay } from "./types";

export type { ReligionEssay, ReligionSource } from "./types";

const RELIGION_ESSAYS: Record<string, ReligionEssay> = {
  ...ANCIENT_ESSAYS,
  ...INDIAN_ESSAYS,
  ...ABRAHAMIC_ESSAYS,
  ...EAST_ASIAN_ESSAYS,
  ...OTHER_ESSAYS,
  ...INDIGENOUS_ESSAYS,
};

/** Long-form “Origins & essence” text for religion detail pages. */
export function getReligionEssay(id: string): ReligionEssay | null {
  return RELIGION_ESSAYS[id] ?? null;
}

/** Ensures every religion has an essay during development builds. */
export function assertEssayCoverage(): void {
  const missing = RELIGIONS.filter((r) => !RELIGION_ESSAYS[r.id]).map((r) => r.id);
  if (missing.length > 0) {
    console.warn("[religion-essays] Missing essays for:", missing.join(", "));
  }
}

if (import.meta.env?.DEV) {
  assertEssayCoverage();
}
