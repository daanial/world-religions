import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import {
  POINTS,
  ROUTES,
  bow,
  pointKeysForRoute,
  type MapPoint,
  type RouteKey,
} from "../data/pilgrimage-routes";

interface ArcDef {
  id: string;
  routeKey: Exclude<RouteKey, "all">;
  d: string;
}

interface PilgrimPathsMapProps {
  activeRoute: RouteKey;
}

const TICK_COUNT = 36;
const RING_R = 250;

export default function PilgrimPathsMap({ activeRoute }: PilgrimPathsMapProps) {
  const arcRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const dotRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const markerRefs = useRef<Map<string, SVGGElement>>(new Map());
  const ringRef = useRef<SVGGElement>(null);
  const reduceMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const arcs = useMemo<ArcDef[]>(() => {
    const list: ArcDef[] = [];
    (Object.entries(ROUTES) as [Exclude<RouteKey, "all">, (typeof ROUTES)["hajj"]][]).forEach(
      ([routeKey, route]) => {
        if (route.mapKind === "radial" && route.destination && route.sources) {
          const dest = POINTS[route.destination];
          route.sources.forEach((srcKey) => {
            const src = POINTS[srcKey];
            const { mx, my } = bow(src, dest);
            list.push({
              id: `${routeKey}|${srcKey}`,
              routeKey,
              d: `M ${src.x} ${src.y} Q ${mx} ${my} ${dest.x} ${dest.y}`,
            });
          });
          return;
        }

        if (route.mapKind === "circuit" && route.circuit) {
          for (let i = 0; i < route.circuit.length - 1; i++) {
            const fromKey = route.circuit[i]!;
            const toKey = route.circuit[i + 1]!;
            const src = POINTS[fromKey];
            const dest = POINTS[toKey];
            const { mx, my } = bow(src, dest, 0.1);
            list.push({
              id: `${routeKey}|${fromKey}-${toKey}`,
              routeKey,
              d: `M ${src.x} ${src.y} Q ${mx} ${my} ${dest.x} ${dest.y}`,
            });
          }
          return;
        }

        if (route.mapKind === "rotation" && route.rotation) {
          const cities = route.rotation;
          for (let i = 0; i < cities.length; i++) {
            const fromKey = cities[i]!;
            const toKey = cities[(i + 1) % cities.length]!;
            const src = POINTS[fromKey];
            const dest = POINTS[toKey];
            const { mx, my } = bow(src, dest, 0.12);
            list.push({
              id: `${routeKey}|${fromKey}-${toKey}`,
              routeKey,
              d: `M ${src.x} ${src.y} Q ${mx} ${my} ${dest.x} ${dest.y}`,
            });
          }
        }
      }
    );
    return list;
  }, []);

  const ticks = useMemo(() => {
    return Array.from({ length: TICK_COUNT }, (_, i) => {
      const angle = (i / TICK_COUNT) * Math.PI * 2;
      const r2 = i % 3 === 0 ? 238 : 244;
      return {
        x1: Math.cos(angle) * RING_R,
        y1: Math.sin(angle) * RING_R,
        x2: Math.cos(angle) * r2,
        y2: Math.sin(angle) * r2,
      };
    });
  }, []);

  useEffect(() => {
    if (!ringRef.current || reduceMotion) return;
    const tween = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 200,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
    return () => {
      tween.kill();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const activeRoutes =
      activeRoute === "all" ? (Object.keys(ROUTES) as Exclude<RouteKey, "all">[]) : [activeRoute];
    const activePoints =
      activeRoute === "all"
        ? Object.keys(POINTS)
        : pointKeysForRoute(activeRoute as Exclude<RouteKey, "all">);

    arcRefs.current.forEach((path, id) => {
      const routeKey = id.split("|")[0] as Exclude<RouteKey, "all">;
      gsap.killTweensOf(path);
      const len = path.getTotalLength();

      if (activeRoute === "all") {
        path.style.strokeDasharray = "none";
        gsap.to(path, { opacity: 0.35, duration: 0.5 });
      } else if (activeRoutes.includes(routeKey)) {
        path.style.strokeDasharray = String(len);
        if (reduceMotion) {
          path.style.strokeDashoffset = "0";
          gsap.to(path, { opacity: 1, duration: 0.3 });
        } else {
          gsap.fromTo(
            path,
            { strokeDashoffset: len, opacity: 1 },
            { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", delay: 0.15 }
          );
        }
      } else {
        gsap.to(path, { opacity: 0.06, duration: 0.4 });
      }
    });

    dotRefs.current.forEach((dot, id) => {
      gsap.killTweensOf(dot);
      const routeKey = id.split("|")[0] as Exclude<RouteKey, "all">;
      const path = arcRefs.current.get(id);

      if (activeRoute !== "all" && activeRoutes.includes(routeKey) && path && !reduceMotion) {
        const len = path.getTotalLength();
        dot.style.opacity = "1";
        const proxy = { p: 0 };
        gsap.to(proxy, {
          p: 1,
          duration: 1.6,
          delay: 0.3,
          ease: "power1.inOut",
          onUpdate: () => {
            const pt = path.getPointAtLength(proxy.p * len);
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));
          },
        });
      } else {
        dot.style.opacity = "0";
      }
    });

    markerRefs.current.forEach((marker, key) => {
      gsap.to(marker, {
        opacity: activePoints.includes(key) ? 1 : 0.22,
        duration: 0.4,
      });
    });
  }, [activeRoute, reduceMotion]);

  return (
    <svg
      className="pilgrim-map"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Schematic map of pilgrimage routes converging on sacred destinations"
    >
      <g className="pilgrim-map__rules">
        {[150, 300, 450].map((y) => (
          <line key={y} className="pilgrim-map__ruled-line" x1="0" y1={y} x2="1200" y2={y} />
        ))}
      </g>

      <g ref={ringRef} className="pilgrim-map__ring" transform="translate(600,300)">
        <circle r={RING_R} />
        <circle r={270} />
        <g>
          {ticks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
          ))}
        </g>
      </g>

      <path className="pilgrim-map__corner" d="M22,46 L22,22 L46,22" />
      <path className="pilgrim-map__corner" d="M1178,46 L1178,22 L1154,22" />
      <path className="pilgrim-map__corner" d="M22,554 L22,578 L46,578" />
      <path className="pilgrim-map__corner" d="M1178,554 L1178,578 L1154,578" />

      <g className="pilgrim-map__arcs">
        {arcs.map((arc) => (
          <path
            key={arc.id}
            ref={(el) => {
              if (el) arcRefs.current.set(arc.id, el);
              else arcRefs.current.delete(arc.id);
            }}
            className="pilgrim-map__arc"
            data-route={arc.routeKey}
            d={arc.d}
            style={{ stroke: ROUTES[arc.routeKey].accent }}
          />
        ))}
      </g>

      <g className="pilgrim-map__dots">
        {arcs.map((arc) => (
          <circle
            key={`dot-${arc.id}`}
            ref={(el) => {
              if (el) dotRefs.current.set(arc.id, el);
              else dotRefs.current.delete(arc.id);
            }}
            className="pilgrim-map__travel-dot"
            r={3.2}
            style={{ fill: ROUTES[arc.routeKey].accent }}
          />
        ))}
      </g>

      <g className="pilgrim-map__markers">
        {(Object.entries(POINTS) as [string, MapPoint][]).map(([key, point]) => {
          const isDest = Boolean(point.isDest);
          return (
            <g
              key={key}
              ref={(el) => {
                if (el) markerRefs.current.set(key, el);
                else markerRefs.current.delete(key);
              }}
              className={`pilgrim-map__marker ${isDest ? "pilgrim-map__marker--dest" : ""}`}
            >
              <circle cx={point.x} cy={point.y} r={isDest ? 7 : 4.5} />
              <text x={point.x} y={point.y + (isDest ? -16 : -11)}>
                {point.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
