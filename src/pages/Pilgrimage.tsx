import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";
import {
  ROUTES,
  ROUTE_ORDER,
  ROUTE_JUMP_LABELS,
  PILGRIMAGE_CONTENT,
  getCaption,
  type RouteKey,
} from "../data/pilgrimage-routes";
import { RELIGIONS } from "../data/religions";
import { usePageSeo } from "../lib/seo";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";

function PilgrimVideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px", threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <figure ref={ref} className="pilgrim-video">
      <div className="pilgrim-video__chrome">
        <span className="pilgrim-video__badge">Film</span>
        <span className="pilgrim-video__label">{title}</span>
      </div>
      <div className="pilgrim-video__frame">
        {inView ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
            title={`${title} — documentary video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="pilgrim-video__placeholder" aria-hidden>
            <span className="pilgrim-video__play" aria-hidden />
          </div>
        )}
      </div>
      <figcaption className="pilgrim-video__caption">
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </a>
      </figcaption>
    </figure>
  );
}

function useInViewOnce<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

const PilgrimGeoMap = lazy(() => import("../components/PilgrimGeoMap"));

type GeoRouteKey = Exclude<RouteKey, "all">;

const ROUTE_DISCLAIMERS: Record<GeoRouteKey, string> = {
  hajj: "Historic Hajj caravan roads — schematic great-circle arcs, not modern highways.",
  camino: "Camino trails from OpenStreetMap hiking relations plus walking paths to Santiago. Still travelled today.",
  chakchak: "Chak Chak routes shown as schematic arcs converging on the shrine.",
  buddhist: "Buddhist Circuit legs are approximate great-circle segments between the four Great Places.",
  kumbh: "Kumbh host cities connected schematically — the mela rotates among them, it is not a walking circuit.",
};

function GeoMapBlock({ routeKey }: { routeKey: GeoRouteKey }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="pilgrim-stage pilgrim-stage--geo card">
      {inView ? (
        <Suspense fallback={<div className="pilgrim-geo pilgrim-geo--loading">Loading map…</div>}>
          <PilgrimGeoMap routeKey={routeKey} animate={inView} />
        </Suspense>
      ) : (
        <div className="pilgrim-geo pilgrim-geo--loading" aria-hidden>
          Loading map…
        </div>
      )}
      <div className="pilgrim-stage__hint">
        <span className="pilgrim-stage__hint-dot" /> drag to pan · scroll to zoom
      </div>
    </div>
  );
}

function RouteSection({ routeKey }: { routeKey: GeoRouteKey }) {
  const route = ROUTES[routeKey];
  const content = PILGRIMAGE_CONTENT[routeKey];
  const caption = getCaption(routeKey);

  return (
    <section
      id={routeKey}
      className="pilgrim-section pilgrim-section--route reveal"
      style={{ "--accent": route.accent } as CSSProperties}
    >
      <header className="pilgrim-section__head">
        <p className="pilgrim-section__meta">
          {content.religionLabel} · {caption.meta}
        </p>
        <h2 className="pilgrim-section__title">{caption.title}</h2>
      </header>

      <dl className="pilgrim-facts card">
        <div className="pilgrim-facts__row">
          <dt>Route</dt>
          <dd>{content.route}</dd>
        </div>
        <div className="pilgrim-facts__row">
          <dt>Locations</dt>
          <dd>{content.locations}</dd>
        </div>
      </dl>

      <GeoMapBlock routeKey={routeKey} />

      <div className={`pilgrim-prose card${content.videoId ? " pilgrim-prose--with-video" : ""}`}>
        <div className="pilgrim-prose__layout">
          <div className="pilgrim-prose__text">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}

            <div className="pilgrim-caption__links">
              {route.religionIds.map((id) => {
                const religion = RELIGIONS.find((r) => r.id === id);
                if (!religion) return null;
                return (
                  <Link
                    key={id}
                    to={`/religion/${id}`}
                    className="pilgrim-caption__religion"
                    style={{ borderColor: religion.accent }}
                  >
                    <span
                      className="pilgrim-caption__religion-dot"
                      style={{ background: religion.accent }}
                    />
                    {religion.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {content.videoId && (
            <PilgrimVideoEmbed videoId={content.videoId} title={caption.title} />
          )}
        </div>
      </div>

      <p className="pilgrim-disclaimer">{ROUTE_DISCLAIMERS[routeKey]}</p>
    </section>
  );
}

export default function Pilgrimage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);

  usePageSeo({
    title: "Pilgrim Paths",
    description:
      "Five great pilgrimages — the Hajj, Camino de Santiago, Chak Chak, the Buddhist Circuit, and Kumbh Mela — each with an interactive geographic map.",
    path: "/pilgrimage",
  });

  return (
    <div className="page pilgrimage-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container pilgrimage-layout">
        <header className="page__head pilgrimage-intro">
          <div className="eyebrow reveal">Sacred journeys</div>
          <h1 className="page__title reveal">Pilgrim Paths</h1>
          <p className="page__lead reveal">
            Five faiths, five geometries — converging roads, sacred circuits, and a gathering that
            moves between cities. Scroll to explore each pilgrimage on its own map.
          </p>

          <nav className="pilgrim-jump reveal-stagger" aria-label="Jump to a pilgrimage">
            {ROUTE_ORDER.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="pilgrim-jump__link"
                style={{ "--accent": ROUTES[key].accent } as CSSProperties}
              >
                {ROUTE_JUMP_LABELS[key]}
              </a>
            ))}
          </nav>
        </header>

        {ROUTE_ORDER.map((key) => (
          <RouteSection key={key} routeKey={key} />
        ))}
      </div>
    </div>
  );
}
