/**
 * TODO(fa-translation): translate every string field to Persian.
 *
 * This file currently just re-exports the English article as a
 * placeholder, so /fa/religion/manichaean renders correctly (in English)
 * instead of breaking while untranslated. To translate this tradition:
 * replace the re-export below with a real object literal of type
 * ReligionArticle, translating every string while preserving the exact
 * key structure (overview, history, worldview, texts, practice,
 * diversity, communities, places, debates, keyTerms, sources).
 *
 * See docs/i18n-persian.md for the full workflow, tone/register and
 * terminology guidance, and a worked example.
 *
 * English source: ../manichaean.ts
 */
import type { ReligionArticle } from "../types";
import { manichaeanArticle } from "../manichaean";

export const manichaeanArticleFa: ReligionArticle = manichaeanArticle;
