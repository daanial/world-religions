import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

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

export function applyPageSeo(seo: PageSeo) {
  const title = formatTitle(seo.title);
  const url = absoluteUrl(seo.path);
  const image = seo.image ? absoluteUrl(seo.image) : DEFAULT_OG_IMAGE;
  const type = seo.type ?? "website";
  const robots = seo.noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large";

  document.title = title;
  upsertMeta("description", seo.description);
  upsertMeta("robots", robots);
  upsertLink("canonical", url);

  upsertMeta("og:title", title, "property");
  upsertMeta("og:description", seo.description, "property");
  upsertMeta("og:url", url, "property");
  upsertMeta("og:type", type, "property");
  upsertMeta("og:site_name", SITE_NAME, "property");
  upsertMeta("og:image", image, "property");
  upsertMeta("og:locale", "en_US", "property");

  upsertMeta("twitter:card", "summary_large_image");
  upsertMeta("twitter:title", title);
  upsertMeta("twitter:description", seo.description);
  upsertMeta("twitter:image", image);

  upsertJsonLd(seo.jsonLd);
}

export function usePageSeo(seo: PageSeo) {
  useEffect(() => {
    applyPageSeo(seo);
  }, [
    seo.title,
    seo.description,
    seo.path,
    seo.image,
    seo.type,
    seo.noindex,
    JSON.stringify(seo.jsonLd),
  ]);
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
  };
}

export function buildReligionArticleJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image ? absoluteUrl(input.image) : DEFAULT_OG_IMAGE,
    inLanguage: "en",
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
