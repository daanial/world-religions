// Locale routing utilities. English is unprefixed ("/timeline"); every
// other supported language is prefixed with its code ("/fa/timeline").
// LOCALE_REGISTRY below is the single source of truth for which
// languages exist — see the comment on it for how to add one.

import { createContext, useContext } from "react";

export interface LocaleMeta {
  code: string;
  /** English name — for dev-facing UI (docs, aria-labels), not shown to end users. */
  englishName: string;
  /** Name in the language's own script — what the language switcher displays. */
  nativeName: string;
  /** True for right-to-left scripts. Drives `dir` on <html> and src/styles/rtl.css. */
  rtl: boolean;
}

/**
 * Every supported language, in one place. Routing (App.tsx), the
 * language switcher (NavBar), hreflang generation (seo.ts), and RTL/font
 * selection all derive from this list — adding a language here is most
 * of the mechanical work. To actually add one:
 *   1. Add an entry below.
 *   2. Create src/data/religion-articles/<code>/ mirroring fa/ (adapt
 *      scripts/scaffold-fa-articles.ts's FA_DIR constant, or generalize
 *      it to take a --locale arg) and wire it into
 *      src/data/religion-articles/index.ts's getReligionArticle().
 *   3. Add the locale's dictionary object to src/lib/i18n.ts.
 *   4. If it's RTL, confirm its script has a font covered somewhere
 *      (Estedad in rtl.css covers Persian + Arabic script only — a
 *      non-Arabic-script RTL language like Hebrew needs its own font).
 * See docs/i18n.md for the full walkthrough.
 */
export const LOCALE_REGISTRY = [
  { code: "en", englishName: "English", nativeName: "English", rtl: false },
  { code: "fa", englishName: "Persian", nativeName: "فارسی", rtl: true },
] as const satisfies readonly LocaleMeta[];

export type LocaleCode = (typeof LOCALE_REGISTRY)[number]["code"];

export const DEFAULT_LOCALE: LocaleCode = "en";

export const SUPPORTED_LOCALES: LocaleCode[] = LOCALE_REGISTRY.map((l) => l.code);

export function getLocaleMeta(code: string): LocaleMeta {
  return LOCALE_REGISTRY.find((l) => l.code === code) ?? LOCALE_REGISTRY[0];
}

/** True for locales that read right-to-left. Drives `dir` on <html> and the RTL stylesheet. */
export function isRtl(code: LocaleCode): boolean {
  return getLocaleMeta(code).rtl;
}

/** @deprecated prefer getLocaleMeta(code).nativeName — kept for any remaining call sites. */
export const LOCALE_LABELS: Record<string, string> = Object.fromEntries(
  LOCALE_REGISTRY.map((l) => [l.code, l.nativeName])
);

// LocaleContext to provide current locale to all components
const LocaleContext = createContext<LocaleCode>(DEFAULT_LOCALE);

export function useLocale(): LocaleCode {
  return useContext(LocaleContext);
}

export { LocaleContext };

export function localePrefix(code: LocaleCode): string {
  return code === DEFAULT_LOCALE ? "" : `/${code}`;
}

export function withLocale(code: LocaleCode, path: string): string {
  const prefix = localePrefix(code);
  if (path === "/") return prefix || "/";
  // Remove leading slash from path if present, then add prefix
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${cleanPath}`;
}

export function splitLocaleFromPath(pathname: string): {
  locale: LocaleCode;
  path: string;
} {
  // Generic over every non-default entry in LOCALE_REGISTRY — adding a
  // language to the registry is enough for this to detect its prefix,
  // no changes needed here.
  for (const { code } of LOCALE_REGISTRY) {
    if (code === DEFAULT_LOCALE) continue;
    if (pathname === `/${code}`) return { locale: code, path: "/" };
    if (pathname.startsWith(`/${code}/`)) {
      return { locale: code, path: pathname.slice(1 + code.length) };
    }
  }

  return { locale: DEFAULT_LOCALE, path: pathname };
}

// Helper to get current locale from location pathname
export function getCurrentLocale(pathname: string): LocaleCode {
  return splitLocaleFromPath(pathname).locale;
}

// Helper to preserve query string when building localized URLs
export function withLocaleAndQuery(
  code: LocaleCode,
  path: string,
  queryString?: string
): string {
  const localizedPath = withLocale(code, path);
  return queryString ? `${localizedPath}?${queryString}` : localizedPath;
}
