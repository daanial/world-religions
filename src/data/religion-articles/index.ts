import { ARTICLES } from "./articles";
import type { ReligionArticle } from "./types";

export type { ReligionArticle, ReligionArticleSection, ReligionSource } from "./types";

/** Get structured article for a religion detail page. */
export function getReligionArticle(id: string): ReligionArticle | null {
  return ARTICLES[id] ?? null;
}
