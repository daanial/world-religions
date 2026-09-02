import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "./site";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, withLocale, splitLocaleFromPath, type LocaleCode } from "./locale";

const DEFAULT_DESCRIPTION =
  "Explore 6,000 years of belief systems through timelines, globes, and concept networks.";

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
}

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(data?: PageSeo["jsonLd"]) {
  const existing = document.head.querySelector('script[data-seo="jsonld"]');
  existing?.remove();

  if (!data) return;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo", "jsonld");
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function formatTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
}

// Every PageSeo.path passed by pages today is the bare, unprefixed route
// (e.g. "/timeline") — pages don't currently thread locale into their own
// SEO calls, so we can't recover locale from seo.path itself (it never
// carries the "/fa" prefix). Instead we read the real, currently-visited
// URL. This runs client-side only (useEffect / direct calls after
// mount), so window.location is always available here.
const OG_LOCALE: Record<string, string> = { en: "en_US", fa: "fa_IR" };

function upsertAlternateLinks(barePath: string) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  for (const code of SUPPORTED_LOCALES) {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", code);
    link.setAttribute("href", absoluteUrl(withLocale(code, barePath)));
    document.head.appendChild(link);
  }

  const xDefault = document.createElement("link");
  xDefault.setAttribute("rel", "alternate");
  xDefault.setAttribute("hreflang", "x-default");
  xDefault.setAttribute("href", absoluteUrl(withLocale(DEFAULT_LOCALE, barePath)));
  document.head.appendChild(xDefault);
}

export function applyPageSeo(seo: PageSeo) {
  const { locale } = splitLocaleFromPath(window.location.pathname);
  const { path: barePath } = splitLocaleFromPath(seo.path);
  const title = formatTitle(seo.title);
  const url = absoluteUrl(withLocale(locale, barePath));
  const image = seo.image ? absoluteUrl(seo.image) : DEFAULT_OG_IMAGE;
  const type = seo.type ?? "website";
  const robots = seo.noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large";

  document.title = title;
  upsertMeta("description", seo.description);
  upsertMeta("robots", robots);
  upsertLink("canonical", url);
  upsertAlternateLinks(barePath);

  upsertMeta("og:title", title, "property");
  upsertMeta("og:description", seo.description, "property");
  upsertMeta("og:url", url, "property");
  upsertMeta("og:type", type, "property");
  upsertMeta("og:site_name", SITE_NAME, "property");
  upsertMeta("og:image", image, "property");
  upsertMeta("og:locale", OG_LOCALE[locale] ?? OG_LOCALE.en, "property");

  upsertMeta("twitter:card", "summary_large_image");
  upsertMeta("twitter:title", title);
  upsertMeta("twitter:description", seo.description);
  upsertMeta("twitter:image", image);

  upsertJsonLd(seo.jsonLd);
}

export function usePageSeo(seo: PageSeo) {
  const { title, description, path, image, type, noindex } = seo;
  const jsonLdKey = JSON.stringify(seo.jsonLd);
  useEffect(() => {
    applyPageSeo({
      title,
      description,
      path,
      image,
      type,
      noindex,
      jsonLd: jsonLdKey ? JSON.parse(jsonLdKey) : undefined,
    });
  }, [
    title,
    description,
    path,
    image,
    type,
    noindex,
    jsonLdKey,
  ]);
}

export function buildWebsiteJsonLd(locale: LocaleCode = DEFAULT_LOCALE, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: description ?? DEFAULT_DESCRIPTION,
    inLanguage: locale,
  };
}

export function buildReligionArticleJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
  locale?: LocaleCode;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image ? absoluteUrl(input.image) : DEFAULT_OG_IMAGE,
    inLanguage: input.locale ?? DEFAULT_LOCALE,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: input.name,
    },
  };
}
