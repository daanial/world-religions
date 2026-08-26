// Locale routing utilities for English (unprefixed) and Persian (/fa) paths

import { createContext, useContext } from "react";

export type LocaleCode = "en" | "fa";

export const DEFAULT_LOCALE: LocaleCode = "en";

export const SUPPORTED_LOCALES: LocaleCode[] = ["en", "fa"];

// LocaleContext to provide current locale to all components
const LocaleContext = createContext<LocaleCode>("en");

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
  // Check for /fa prefix
  if (pathname.startsWith("/fa/") || pathname === "/fa") {
    return {
      locale: "fa",
      path: pathname === "/fa" ? "/" : pathname.slice(3),
    };
  }
  
  // Default to English (unprefixed)
  return {
    locale: "en",
    path: pathname,
  };
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
