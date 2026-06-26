import { spawn, type ChildProcess } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import puppeteer, { type Browser } from "puppeteer";
import { getAllRoutes } from "../src/lib/site";

const DIST_DIR = resolve(process.cwd(), "dist");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

function routeToOutputPath(route: string): string {
  if (route === "/") return join(DIST_DIR, "index.html");
  return join(DIST_DIR, route.slice(1), "index.html");
}

function startPreviewServer(): Promise<ChildProcess> {
  return new Promise((resolvePromise, reject) => {
    const server = spawn(
      process.execPath,
      [
        resolve(process.cwd(), "node_modules/vite/bin/vite.js"),
        "preview",
        "--port",
        String(PORT),
        "--strictPort",
      ],
      {
        cwd: process.cwd(),
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, NODE_ENV: "production" },
      }
    );

    let settled = false;

    const onReady = (chunk: Buffer) => {
      const text = chunk.toString();
      if (text.includes("Local:") || text.includes(`http://localhost:${PORT}`)) {
        if (!settled) {
          settled = true;
          resolvePromise(server);
        }
      }
    };

    server.stdout?.on("data", onReady);
    server.stderr?.on("data", onReady);

    server.on("error", (error) => {
      if (!settled) reject(error);
    });

    server.on("exit", (code) => {
      if (!settled) reject(new Error(`Preview server exited early with code ${code ?? "unknown"}`));
    });

    setTimeout(() => {
      if (!settled) reject(new Error("Timed out waiting for preview server"));
    }, 30000);
  });
}

async function waitForPreviewReady(): Promise<void> {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${BASE_URL}/`);
      if (response.ok) return;
    } catch {
      // Preview still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error("Preview server health check failed");
}

async function waitForPageContent(page: import("puppeteer").Page, route: string) {
  await page.waitForSelector("h1", { timeout: 20000 });

  if (route.startsWith("/religion/")) {
    await page.waitForSelector(".rd__name", { timeout: 20000 });
  }

  if (route === "/") {
    await page.waitForSelector(".hero__title", { timeout: 20000 });
  }

  await page.evaluate(async () => {
    await new Promise<void>((resolvePromise) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolvePromise()));
    });
  });

  // GSAP entrance animations leave opacity:0 inline styles in the snapshot.
  await page.evaluate(() => {
    document.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("translate");
    });
  });
}

async function prerenderRoute(browser: Browser, route: string) {
  const page = await browser.newPage();
  const url = `${BASE_URL}${route === "/" ? "" : route}`;

  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await waitForPageContent(page, route);

    const html = await page.content();
    const outputPath = routeToOutputPath(route);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, html, "utf8");
    console.log(`Prerendered ${route} -> ${outputPath.replace(DIST_DIR, "dist")}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const routes = getAllRoutes();
  const server = await startPreviewServer();
  await waitForPreviewReady();
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const route of routes) {
      await prerenderRoute(browser, route);
    }

    console.log(`Prerendered ${routes.length} routes.`);
  } finally {
    await browser?.close();
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
