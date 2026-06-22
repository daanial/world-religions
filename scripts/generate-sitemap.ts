import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getAllRoutes, SITE_URL } from "../src/lib/site";

const routes = getAllRoutes();
const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map((path) => {
    const priority = path === "/" ? "1.0" : path.startsWith("/religion/") ? "0.8" : "0.9";
    const changefreq = path.startsWith("/religion/") ? "monthly" : "weekly";

    return `  <url>
    <loc>${SITE_URL}${path === "/" ? "" : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outputPath = resolve(process.cwd(), "public/sitemap.xml");
writeFileSync(outputPath, sitemap, "utf8");
console.log(`Generated sitemap with ${routes.length} URLs at ${outputPath}`);
