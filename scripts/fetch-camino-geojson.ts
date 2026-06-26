/**
 * Fetches Camino route geometry from OpenStreetMap in member order.
 * One Overpass request per route; paths built in memory.
 *
 * Run: npm run fetch:camino
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as turf from "@turf/turf";

const OUT_DIR = resolve(process.cwd(), "public/data/pilgrimage");
const SANTIAGO: [number, number] = [-8.5456, 42.8805];
const USER_AGENT = "WorldReligionsExplorer/1.0 (educational; religions.cubexic.com)";

const CAMINO_ROUTES = [
  {
    id: "lepuy",
    file: "camino-lepuy.geojson",
    osmRelationId: 138227,
    label: "Via Podiensis (Le Puy)",
    origin: [3.8852, 45.0433] as [number, number],
  },
  {
    id: "paris",
    file: "camino-paris.geojson",
    osmRelationId: 6026933,
    label: "Via Turonensis (Paris)",
    origin: [2.3522, 48.8566] as [number, number],
  },
  {
    id: "arles",
    file: "camino-arles.geojson",
    osmRelationId: 389715,
    label: "Voie d'Arles",
    origin: [4.6301, 43.6767] as [number, number],
  },
] as const;

type OsmMember = { type: string; ref: number; role: string };
type OsmElement = {
  type: string;
  id: number;
  members?: OsmMember[];
  geometry?: { lat: number; lon: number }[];
};

async function overpass(query: string, retries = 3): Promise<{ elements: OsmElement[] }> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 8000 * (attempt + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`Overpass failed: ${res.status}`);
    return res.json();
  }
  throw new Error("Overpass rate-limited after retries");
}

function wayToCoords(way: OsmElement): [number, number][] {
  if (!way.geometry?.length) return [];
  return way.geometry.map((n) => [n.lon, n.lat]);
}

function dist(a: [number, number], b: [number, number]) {
  return turf.distance(turf.point(a), turf.point(b), { units: "kilometers" });
}

function appendWay(path: [number, number][], coords: [number, number][], maxGapKm = 3) {
  if (coords.length < 2) return;
  if (path.length === 0) {
    path.push(...coords);
    return;
  }
  const tip = path[path.length - 1]!;
  const forward = dist(tip, coords[0]!);
  const reverse = dist(tip, coords[coords.length - 1]!);
  const oriented = reverse < forward ? [...coords].reverse() : coords;
  const gap = dist(tip, oriented[0]!);
  if (gap > maxGapKm) return;
  path.push(...oriented.slice(1));
}

function buildPathFromRelation(
  relationId: number,
  relations: Map<number, OsmElement>,
  ways: Map<number, [number, number][]>
): [number, number][] {
  const relation = relations.get(relationId);
  if (!relation?.members?.length) return [];

  const path: [number, number][] = [];
  for (const member of relation.members) {
    if (member.type === "way") {
      const coords = ways.get(member.ref);
      if (coords) appendWay(path, coords);
    } else if (member.type === "relation") {
      const sub = buildPathFromRelation(member.ref, relations, ways);
      if (sub.length >= 2) {
        if (path.length === 0) path.push(...sub);
        else appendWay(path, sub, 8);
      }
    }
  }
  return path;
}

async function fetchRouteBundle(relationId: number) {
  const query = `
    [out:json][timeout:240];
    relation(${relationId});
    out body;
    relation(${relationId});
    relation(r._);
    out body;
    way(r._);
    out geom;
  `;
  const data = await overpass(query);

  const relations = new Map<number, OsmElement>();
  const ways = new Map<number, [number, number][]>();

  for (const el of data.elements) {
    if (el.type === "relation") relations.set(el.id, el);
    if (el.type === "way") ways.set(el.id, wayToCoords(el));
  }

  return buildPathFromRelation(relationId, relations, ways);
}

function trimFromOrigin(coords: [number, number][], origin: [number, number]): [number, number][] {
  if (coords.length < 2) return coords;
  let startIdx = 0;
  let startBest = Infinity;
  for (let i = 0; i < coords.length; i++) {
    const d = dist(origin, coords[i]!);
    if (d < startBest) {
      startBest = d;
      startIdx = i;
    }
  }
  const slice = coords.slice(startIdx);
  if (slice.length < 2) return coords;
  if (dist(slice[0]!, origin) > 15) slice.unshift(origin);
  return slice;
}

function trimToNearDestination(
  coords: [number, number][],
  dest: [number, number],
  maxDestGapKm = 30
): [number, number][] {
  if (coords.length < 2) return coords;
  let endIdx = coords.length - 1;
  let endBest = Infinity;
  for (let i = 0; i < coords.length; i++) {
    const d = dist(dest, coords[i]!);
    if (d < endBest) {
      endBest = d;
      endIdx = i;
    }
  }
  const slice = coords.slice(0, endIdx + 1);
  const tip = slice[slice.length - 1]!;
  if (dist(tip, dest) <= maxDestGapKm && dist(tip, dest) > 0.5) slice.push(dest);
  return slice.length >= 2 ? slice : coords;
}

/** Join a partial route onto a longer shared trail at the nearest point. */
function spliceOntoTrail(
  partial: [number, number][],
  trail: [number, number][],
  dest: [number, number]
): [number, number][] {
  if (partial.length < 2 || trail.length < 2) return partial;
  const tip = partial[partial.length - 1]!;
  let joinIdx = 0;
  let joinBest = Infinity;
  for (let i = 0; i < trail.length; i++) {
    const d = dist(tip, trail[i]!);
    if (d < joinBest) {
      joinBest = d;
      joinIdx = i;
    }
  }
  if (joinBest > 90) return trimToNearDestination(partial, dest);
  const merged = [...partial, ...trail.slice(joinIdx + 1)];
  return trimToNearDestination(merged, dest);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const rawPaths = new Map<string, [number, number][]>();
  for (const route of CAMINO_ROUTES) {
    console.log(`Fetching ${route.label} (relation ${route.osmRelationId})…`);
    const raw = await fetchRouteBundle(route.osmRelationId);
    if (raw.length < 2) throw new Error(`No path built for ${route.id}`);
    rawPaths.set(route.id, raw);
    await new Promise((r) => setTimeout(r, 5000));
  }

  const processed = new Map<string, [number, number][]>();

  for (const id of ["lepuy", "arles"] as const) {
    const route = CAMINO_ROUTES.find((r) => r.id === id)!;
    const trimmed = trimFromOrigin(rawPaths.get(id)!, route.origin);
    processed.set(id, trimToNearDestination(trimmed, SANTIAGO));
  }

  const parisRoute = CAMINO_ROUTES.find((r) => r.id === "paris")!;
  const parisPartial = trimFromOrigin(rawPaths.get("paris")!, parisRoute.origin);
  processed.set(
    "paris",
    spliceOntoTrail(parisPartial, processed.get("lepuy")!, SANTIAGO)
  );

  for (const route of CAMINO_ROUTES) {
    const trimmed = processed.get(route.id)!;

    const simplified = turf.simplify(turf.lineString(trimmed), {
      tolerance: 0.35 / 111,
      highQuality: true,
    }).geometry as GeoJSON.LineString;

    const out: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            id: route.id,
            name: route.label,
            source: `OpenStreetMap relation ${route.osmRelationId} (member order)`,
            points: simplified.coordinates.length,
          },
          geometry: simplified,
        },
      ],
    };

    writeFileSync(resolve(OUT_DIR, route.file), JSON.stringify(out));
    const len = turf.length(turf.lineString(simplified.coordinates), { units: "kilometers" });
    console.log(`  → ${route.file} (${simplified.coordinates.length} pts, ~${len.toFixed(0)} km)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
