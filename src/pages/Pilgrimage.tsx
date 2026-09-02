import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import Starfield from "../components/Starfield";
import NarrationButton from "../components/NarrationButton";
import {
  ROUTES,
  ROUTE_ORDER,
  ROUTE_JUMP_LABELS,
  PILGRIMAGE_CONTENT,
  getCaption,
  type RouteKey,
} from "../data/pilgrimage-routes";
import { PILGRIMAGE_CONTENT_FA, ROUTE_DISCLAIMERS_FA, ROUTE_JUMP_LABELS_FA, ROUTE_META_FA } from "../data/pilgrimage-routes.fa";
import { RELIGIONS } from "../data/religions";
import { usePageSeo } from "../lib/seo";
import { getPilgrimageImageSrc } from "../lib/pilgrimageImages";
import { pilgrimageNarrationId } from "../lib/narration-catalog";
import { useRegisterNarration } from "../context/NarrationContext";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import { useLocale, withLocale } from "../lib/locale";
import { pt } from "../lib/pageI18n";

function PilgrimVideoEmbed({ videoId, title, locale }: { videoId: string; title: string; locale: "en" | "fa" }) {
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
        <span className="pilgrim-video__badge">{locale === "fa" ? "فیلم" : "Film"}</span>
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
          {locale === "fa" ? "تماشا در یوتیوب" : "Watch on YouTube"}
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

function GeoMapBlock({ routeKey, locale }: { routeKey: GeoRouteKey; locale: "en" | "fa" }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="pilgrim-stage pilgrim-stage--geo card">
      {inView ? (
        <Suspense fallback={<div className="pilgrim-geo pilgrim-geo--loading">{locale === "fa" ? "در حال بارگذاری نقشه…" : "Loading map…"}</div>}>
          <PilgrimGeoMap routeKey={routeKey} animate={inView} />
        </Suspense>
      ) : (
        <div className="pilgrim-geo pilgrim-geo--loading" aria-hidden>
          {locale === "fa" ? "در حال بارگذاری نقشه…" : "Loading map…"}
        </div>
      )}
      <div className="pilgrim-stage__hint">
        <span className="pilgrim-stage__hint-dot" /> {pt(locale, "dragPan")}
      </div>
    </div>
  );
}

function RouteSection({ routeKey, locale }: { routeKey: GeoRouteKey; locale: "en" | "fa" }) {
  const route = ROUTES[routeKey];
  const content = locale === "fa" ? PILGRIMAGE_CONTENT_FA[routeKey] : PILGRIMAGE_CONTENT[routeKey];
  const meta = locale === "fa" ? ROUTE_META_FA[routeKey] : route;
  const caption = { meta: `${meta.era} · ${meta.cadence}`, title: meta.name, fact: "" };

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
        <div className="pilgrim-section__title-row">
          <h2 className="pilgrim-section__title">{caption.title}</h2>
          <NarrationButton
            id={pilgrimageNarrationId(routeKey)}
            label={caption.title}
            variant="prominent"
          />
        </div>
      </header>

      <dl className="pilgrim-facts card">
        <div className="pilgrim-facts__row">
          <dt>{locale === "fa" ? "مسیر" : "Route"}</dt>
          <dd>{content.route}</dd>
        </div>
        <div className="pilgrim-facts__row">
          <dt>{locale === "fa" ? "مکان‌ها" : "Locations"}</dt>
          <dd>{content.locations}</dd>
        </div>
      </dl>

      <GeoMapBlock routeKey={routeKey} locale={locale} />

      <figure className="pilgrim-photo">
        <img
          src={getPilgrimageImageSrc(routeKey)}
          alt={`${caption.title} — pilgrimage illustration`}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
        />
      </figure>

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
                    to={withLocale(locale, `/religion/${id}`)}
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
            <PilgrimVideoEmbed videoId={content.videoId} title={caption.title} locale={locale} />
          )}
        </div>
      </div>

      <p className="pilgrim-disclaimer">{locale === "fa" ? ROUTE_DISCLAIMERS_FA[routeKey] : ROUTE_DISCLAIMERS[routeKey]}</p>
    </section>
  );
}

export default function Pilgrimage() {
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const hashRoute = location.hash.replace("#", "");
  const activeRoute =
    ROUTE_ORDER.find((key) => key === hashRoute) ?? ROUTE_ORDER[0];
  const activeCaption = {
    ...getCaption(activeRoute),
    ...(locale === "fa" ? { title: ROUTE_META_FA[activeRoute].name, meta: `${ROUTE_META_FA[activeRoute].era} · ${ROUTE_META_FA[activeRoute].cadence}` } : {}),
  };

  useRegisterNarration(
    pilgrimageNarrationId(activeRoute),
    activeCaption.title
  );

  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);

  usePageSeo({
    title: locale === "fa" ? "راه‌های زیارت" : "Pilgrim Paths",
    description: locale === "fa" ? "پنج زیارت بزرگ — حج، کامینو دِ سانتیاگو، چک‌چک، مدار بودایی و کومبه‌میلا — هر کدام با نقشه‌ای جغرافیایی و تعاملی." : "Five great pilgrimages — the Hajj, Camino de Santiago, Chak Chak, the Buddhist Circuit, and Kumbh Mela — each with an interactive geographic map.",
    path: "/pilgrimage",
  });

  return (
    <div className="page pilgrimage-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container pilgrimage-layout">
        <header className="page__head pilgrimage-intro">
          <div className="eyebrow reveal">{pt(locale, "sacredJourneys")}</div>
          <h1 className="page__title reveal">{pt(locale, "pilgrimPaths")}</h1>
          <p className="page__lead reveal">{pt(locale, "pilgrimLead")}</p>

          <nav className="pilgrim-jump reveal-stagger" aria-label={pt(locale, "jumpToPilgrimage")}>
            {ROUTE_ORDER.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="pilgrim-jump__link"
                style={{ "--accent": ROUTES[key].accent } as CSSProperties}
              >
                {locale === "fa" ? ROUTE_JUMP_LABELS_FA[key] : ROUTE_JUMP_LABELS[key]}
              </a>
            ))}
          </nav>
        </header>

        {ROUTE_ORDER.map((key) => (
          <RouteSection key={key} routeKey={key} locale={locale} />
        ))}
      </div>
    </div>
  );
}
