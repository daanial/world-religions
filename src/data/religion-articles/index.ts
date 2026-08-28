import { ARTICLES } from "./articles";
import { ARTICLES_FA } from "./fa/articles";
import type { ReligionArticle } from "./types";
import type { LocaleCode } from "../../lib/locale";

export type { ReligionArticle, ReligionArticleSection, ReligionSource } from "./types";

/**
 * Get structured article for a religion detail page. For "fa", returns
 * the Persian article if it exists in fa/articles.ts; falls back to
 * English for any tradition not yet translated (see
 * scripts/scaffold-fa-articles.ts and docs/i18n-persian.md) so a page
 * never renders empty just because translation is in progress.
 */
export function getReligionArticle(id: string, locale: LocaleCode = "en"): ReligionArticle | null {
  if (locale === "fa") {
    return ARTICLES_FA[id] ?? ARTICLES[id] ?? null;
  }
  return ARTICLES[id] ?? null;
}
