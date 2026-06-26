import { useEffect, useMemo, useRef, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import type { Map as MapboxMap } from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import { ROUTES, type RouteKey } from "../data/pilgrimage-routes";
import {
  legsForRoute,
  LEG_PALETTE,
  placesForRoute,
  ROUTE_BOUNDS,
  type RouteLegGeo,
} from "../data/pilgrimage-geo";
import {
  animateLegs,
  coordsFromLine,
  type LegGeometry,
} from "../lib/pilgrim-route-animate";

const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v11";

const LINE_PAINT = {
  width: 3.2,
  opacity: 0.92,
  glowWidth: 8,
  glowOpacity: 0.2,
} as const;

interface PilgrimGeoMapProps {
  routeKey: Exclude<RouteKey, "all">;
  /** When false, defers fitBounds and route animation until the section is visible. */
  animate?: boolean;
}

async function loadLegGeometry(leg: RouteLegGeo): Promise<LegGeometry> {
  const res = await fetch(leg.geojsonUrl);
  if (!res.ok) throw new Error(`Failed to load ${leg.geojsonUrl}`);
  const fc = (await res.json()) as GeoJSON.FeatureCollection;
  const feature =
    fc.features.find((f) => f.properties?.id === leg.id) ?? fc.features[0];
  if (!feature?.geometry) throw new Error(`No geometry for leg ${leg.id}`);
  const coords = coordsFromLine(feature.geometry as GeoJSON.LineString);
  const line = turf.lineString(coords);
  return {
    id: leg.id,
    coordinates: coords,
    lengthKm: turf.length(line, { units: "kilometers" }),
  };
}

function legColor(routeKey: Exclude<RouteKey, "all">, legIndex: number): string {
  return LEG_PALETTE[routeKey][legIndex % LEG_PALETTE[routeKey].length]!;
}

function disableMapTerrain(map: MapboxMap) {
  try {
    map.setTerrain(null);
  } catch {
    // Map may already be partially torn down.
  }
}

type GuardedMap = MapboxMap & { __pilgrimTeardownGuard?: boolean };

/**
 * Mapbox crashes in removeSource → _updateTerrain when terrain state is stale.
 * React StrictMode double-invokes Source useEffect cleanups without running
 * layout-effect guards first, so we patch removeSource at map load.
 */
function installMapboxTeardownGuard(map: MapboxMap) {
  const guarded = map as GuardedMap;
  if (guarded.__pilgrimTeardownGuard) return;
  guarded.__pilgrimTeardownGuard = true;

  const keepTerrainOff = () => disableMapTerrain(map);
  keepTerrainOff();
  map.on("styledata", keepTerrainOff);

  const removeSource = map.removeSource.bind(map);
  map.removeSource = (id: string) => {
    keepTerrainOff();
    try {
      if (map.getSource(id)) removeSource(id);
    } catch {
      // Known mapbox-gl bug during StrictMode / navigation teardown.
    }
  };

  const removeLayer = map.removeLayer.bind(map);
  map.removeLayer = (id: string) => {
    try {
      if (map.getLayer(id)) removeLayer(id);
    } catch {
      // Layer may already be gone during parallel teardown.
    }
  };
}

export default function PilgrimGeoMap({ routeKey, animate = true }: PilgrimGeoMapProps) {
  const mapRef = useRef<MapRef>(null);
  const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;
  const reduceMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [legs, setLegs] = useState<LegGeometry[]>([]);
  const [animated, setAnimated] = useState<Record<string, GeoJSON.Feature<GeoJSON.LineString>>>({});
  const [pilgrim, setPilgrim] = useState<[number, number] | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const route = ROUTES[routeKey];
  const places = useMemo(() => placesForRoute(routeKey), [routeKey]);
  const accent = LEG_PALETTE[routeKey][0]!;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setAnimated({});
    setPilgrim(null);

    const legDefs = legsForRoute(routeKey);
    Promise.all(legDefs.map((leg) => loadLegGeometry(leg)))
      .then((loaded) => {
        if (cancelled) return;
        setLegs(loaded);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [routeKey]);

  useEffect(() => {
    if (!animate || !mapReady || loading || legs.length === 0) return;
    const map = mapRef.current?.getMap();
    if (!map) return;

    const bounds = ROUTE_BOUNDS[routeKey];
    map.fitBounds(
      [
        [bounds[0][0], bounds[0][1]],
        [bounds[1][0], bounds[1][1]],
      ],
      { padding: 56, duration: reduceMotion ? 0 : 1400 }
    );

    const timeline = animateLegs({
      legs,
      reduceMotion,
      onLegProgress: (legId, feature) => {
        setAnimated((prev) => ({ ...prev, [legId]: feature }));
      },
      onPilgrim: (lngLat) => setPilgrim(lngLat),
    });

    return () => {
      timeline.kill();
    };
  }, [animate, mapReady, loading, legs, routeKey, reduceMotion]);

  if (!token) {
    return (
      <div className="pilgrim-geo pilgrim-geo--missing">
        <p>Mapbox token missing. Add <code>VITE_MAPBOX_TOKEN</code> to <code>.env.local</code>.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pilgrim-geo pilgrim-geo--missing">
        <p>Could not load route data: {error}</p>
      </div>
    );
  }

  return (
    <div className="pilgrim-geo">
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle={MAPBOX_STYLE}
        initialViewState={{
          longitude: places[0]?.lng ?? 0,
          latitude: places[0]?.lat ?? 20,
          zoom: 4,
        }}
        onLoad={(event) => {
          installMapboxTeardownGuard(event.target);
          setMapReady(true);
        }}
        attributionControl={false}
        dragRotate={false}
        pitchWithRotate={false}
        style={{ width: "100%", height: "100%" }}
      >
        {mapReady &&
          legs.map((leg, index) => {
          const color = legColor(routeKey, index);
          const data = animated[leg.id] ?? {
            type: "Feature",
            geometry: { type: "LineString", coordinates: [] as [number, number][] },
            properties: {},
          };

          return (
            <Source key={leg.id} id={`src-${leg.id}`} type="geojson" data={data}>
              <Layer
                id={`leg-glow-${leg.id}`}
                type="line"
                paint={{
                  "line-color": color,
                  "line-width": LINE_PAINT.glowWidth,
                  "line-opacity": LINE_PAINT.glowOpacity,
                  "line-blur": 0.8,
                }}
              />
              <Layer
                id={`leg-line-${leg.id}`}
                type="line"
                layout={{ "line-cap": "round", "line-join": "round" }}
                paint={{
                  "line-color": color,
                  "line-width": LINE_PAINT.width,
                  "line-opacity": LINE_PAINT.opacity,
                }}
              />
            </Source>
          );
        })}

        {mapReady &&
          places.map((place) => (
          <Marker key={place.id} longitude={place.lng} latitude={place.lat} anchor="center">
            <div className={`pilgrim-geo-marker ${place.isDest ? "pilgrim-geo-marker--dest" : ""}`}>
              <span className="pilgrim-geo-marker__dot" />
              <span className="pilgrim-geo-marker__label">{place.label}</span>
            </div>
          </Marker>
        ))}

        {mapReady && pilgrim && (
          <Marker longitude={pilgrim[0]} latitude={pilgrim[1]} anchor="center">
            <span className="pilgrim-geo-traveler" style={{ background: accent }} />
          </Marker>
        )}

      </Map>

      {loading && (
        <div className="pilgrim-geo__loading" role="status">
          Loading {route.name}…
        </div>
      )}

      <div className="pilgrim-geo__attr">
        {routeKey === "camino"
          ? "Trails: OpenStreetMap · Mapbox"
          : routeKey === "buddhist" || routeKey === "kumbh"
            ? "Schematic segments · Mapbox"
            : "Schematic arcs · Mapbox"}
      </div>
    </div>
  );
}
