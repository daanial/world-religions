import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getAllRoutes, SITE_URL } from "../src/lib/site";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, withLocale } from "../src/lib/locale";

const routes = getAllRoutes();
const today = new Date().toISOString().slice(0, 10);

function urlFor(locale: string, path: string): string {
  const localized = withLocale(locale, path);
  return `${SITE_URL}${localized === "/" ? "" : localized}`;
}

const urls = routes
  .flatMap((path) => {
    const priority = path === "/" ? "1.0" : path.startsWith("/religion/") ? "0.8" : "0.9";
    const changefreq = path.startsWith("/religion/") ? "monthly" : "weekly";

    // Every alternate-language link, plus x-default, repeated on each
    // locale's own <url> entry — this is what lets a single sitemap tell
    // crawlers about every localized version of a page, per Google's
    // multilingual sitemap guidance.
    const alternates = [
      ...SUPPORTED_LOCALES.map(
        (locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${urlFor(locale, path)}" />`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT_LOCALE, path)}" />`,
    ].join("\n");

    return SUPPORTED_LOCALES.map(
      (locale) => `  <url>
    <loc>${urlFor(locale, path)}</loc>
${alternates}
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    );
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

const outputPath = resolve(process.cwd(), "public/sitemap.xml");
writeFileSync(outputPath, sitemap, "utf8");
console.log(`Generated sitemap with ${routes.length * SUPPORTED_LOCALES.length} URLs (${routes.length} routes × ${SUPPORTED_LOCALES.length} locales) at ${outputPath}`);
