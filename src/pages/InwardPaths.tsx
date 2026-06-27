import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "../components/Starfield";
import {
  INWARD_PATHS_FRAMING,
  INWARD_PATHS_INTRO,
  INWARD_PATHS_SECTIONS,
  getAllFigures,
  type TimelineFigure,
  type TimelineQuote,
} from "../data/inward-paths-timeline";
import { usePageSeo } from "../lib/seo";

gsap.registerPlugin(ScrollTrigger);

function formatSortYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year < 1000) return `${year} CE`;
  return `${year}`;
}

function QuoteBlock({ quote }: { quote: TimelineQuote }) {
  return (
    <blockquote className="ip-quote">
      <p className="ip-quote__text">{quote.text}</p>
      <footer className="ip-quote__source">— {quote.source}</footer>
      {quote.note && <p className="ip-quote__note">{quote.note}</p>}
    </blockquote>
  );
}

function FigureRow({
  figure,
  side,
}: {
  figure: TimelineFigure;
  side: "left" | "right";
}) {
  const accent = figure.accent ?? "var(--gold)";

  return (
    <div className={`ip-row ip-row--${side}`}>
      <span className="ip-row__spine-dot" aria-hidden style={{ "--accent": accent } as CSSProperties} />
      <article
        id={figure.id}
        className={`ip-stop card ip-stop--${side}`}
        data-figure-id={figure.id}
        style={{ "--accent": accent } as CSSProperties}
      >
        <div className="ip-stop__marker" aria-hidden>
          <span className="ip-stop__dot" />
          <span className="ip-stop__year">{formatSortYear(figure.sortYear)}</span>
        </div>

        <div className="ip-stop__inner">
          <div className="ip-stop__body">
            <header className="ip-stop__head">
              <p className="ip-stop__meta">
                {figure.tradition} · {figure.dates}
              </p>
              <h3 className="ip-stop__name">{figure.name}</h3>
            </header>

            <p className="ip-stop__bio">{figure.bio}</p>

            {figure.noQuotes ? (
              <p className="ip-stop__no-quotes">
                No reliable corpus of personal quotations survives — what is transmitted is his
                student&apos;s record of his teaching, not Luria&apos;s own prose.
              </p>
            ) : (
              figure.quotes &&
              figure.quotes.length > 0 && (
                <div className="ip-stop__quotes">
                  {figure.quotes.map((q) => (
                    <QuoteBlock key={`${figure.id}-${q.text.slice(0, 24)}`} quote={q} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default function InwardPaths() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const figures = getAllFigures();
  const [activeFigure, setActiveFigure] = useState<TimelineFigure>(() => figures[0]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  const moveCometToStop = (stop: HTMLElement, animate: boolean) => {
    const track = trackRef.current;
    const comet = cometRef.current;
    if (!track || !comet) return;

    const row = stop.closest<HTMLElement>(".ip-row") ?? stop;
    const accent = getComputedStyle(stop).getPropertyValue("--accent").trim() || "var(--gold)";
    track.style.setProperty("--spine-accent", accent);

    const connectorY =
      parseFloat(getComputedStyle(track).getPropertyValue("--ip-node-y")) || 40;
    const top = row.getBoundingClientRect().top - track.getBoundingClientRect().top + connectorY;

    if (animate) {
      gsap.to(comet, {
        top,
        xPercent: -50,
        yPercent: -50,
        duration: 0.45,
        ease: "power2.out",
      });
    } else {
      gsap.set(comet, { top, xPercent: -50, yPercent: -50 });
    }
  };

  usePageSeo({
    title: "Inward Paths — Spirituality & Mysticism",
    description:
      "A scroll-driven timeline of eighteen mystics, sages, and interpreters across three millennia — from Yajnavalkya and Laozi to Rumi, Teresa of Ávila, and Thomas Merton.",
    path: "/inward-paths",
  });

  useEffect(() => {
    const root = rootRef.current;
    const spine = spineRef.current;
    const progress = progressRef.current;
    const track = trackRef.current;
    if (!root || !spine || !progress || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncActiveFigure = (stop: HTMLElement, index: number) => {
      const id = stop.dataset.figureId;
      const figure = figures.find((f) => f.id === id);
      if (figure) {
        setActiveFigure(figure);
        setActiveIndex(index + 1);
      }
    };

    if (reducedMotion) {
      root.querySelectorAll<HTMLElement>(".ip-stop").forEach((el) => {
        el.classList.add("ip-stop--active");
      });
      progress.style.height = "100%";
      const firstStop = root.querySelector<HTMLElement>(".ip-stop");
      if (firstStop) moveCometToStop(firstStop, false);
      return;
    }

    const ctx = gsap.context(() => {
      const stops = gsap.utils.toArray<HTMLElement>(".ip-stop");
      const inners = gsap.utils.toArray<HTMLElement>(".ip-stop__inner");

      gsap.set(inners, { opacity: 0.35, y: 24 });
      gsap.set(inners[0], { opacity: 1, y: 0 });
      stops[0]?.classList.add("ip-stop--active");
      if (stops[0]) {
        moveCometToStop(stops[0], false);
        syncActiveFigure(stops[0], 0);
      }

      stops.forEach((stop, index) => {
        const inner = stop.querySelector<HTMLElement>(".ip-stop__inner");
        if (!inner) return;

        gsap.to(inner, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stop,
            start: "top 78%",
            end: "top 42%",
            toggleActions: "play none none reverse",
          },
        });

        ScrollTrigger.create({
          trigger: stop,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            stop.classList.toggle("ip-stop--active", self.isActive);
            const row = stop.closest<HTMLElement>(".ip-row");
            row?.classList.toggle("ip-row--active", self.isActive);
            track.classList.toggle("ip-track--focused", stops.some((s) => s.classList.contains("ip-stop--active")));
            if (self.isActive) {
              moveCometToStop(stop, true);
              syncActiveFigure(stop, index);
            }
          },
        });

        stop.querySelectorAll<HTMLElement>(".ip-quote").forEach((quote, qi) => {
          gsap.fromTo(
            quote,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              delay: qi * 0.08,
              scrollTrigger: {
                trigger: quote,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      });

      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 0.4,
          },
        }
      );

      gsap.fromTo(
        spine,
        { opacity: 0.3 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: track,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: track,
        start: "top 20%",
        end: "bottom 80%",
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      ScrollTrigger.refresh();
    }, root);

    const onResize = () => {
      const active = root.querySelector<HTMLElement>(".ip-stop--active");
      if (active) moveCometToStop(active, false);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className="page ip-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container ip-layout">
        <header className="page__head ip-intro">
          <div className="eyebrow">{INWARD_PATHS_INTRO.eyebrow}</div>
          <h1 className="page__title">{INWARD_PATHS_INTRO.title}</h1>
          <p className="ip-intro__subtitle">{INWARD_PATHS_INTRO.subtitle}</p>
          <p className="page__lead">{INWARD_PATHS_INTRO.lead}</p>
          <p className="ip-intro__note">{INWARD_PATHS_INTRO.editorialNote}</p>

          <nav className="ip-jump" aria-label="Jump to a figure">
            {figures.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="ip-jump__link"
                style={{ "--accent": f.accent ?? "var(--gold)" } as CSSProperties}
              >
                {f.name.split(" ").slice(-1)[0]}
              </a>
            ))}
          </nav>
        </header>

        <div className="ip-timeline-shell">
          <div className="ip-track" ref={trackRef}>
            <div className="ip-spine" ref={spineRef} aria-hidden>
              <div className="ip-spine__line" />
              <div className="ip-spine__progress" ref={progressRef} />
              <div className="ip-spine__comet" ref={cometRef} />
            </div>

            {(() => {
              let figureIndex = 0;
              return INWARD_PATHS_SECTIONS.map((section, sectionIndex) => (
                <section
                  key={section.id}
                  className={`ip-section${sectionIndex > 0 ? " ip-section--divider" : ""}`}
                  aria-labelledby={`${section.id}-title`}
                >
                  <header className="ip-section__head">
                    <span className="ip-section__glyph" aria-hidden>
                      {sectionIndex === 0 ? "◈" : "◇"}
                    </span>
                    <h2 id={`${section.id}-title`} className="ip-section__title">
                      {section.title}
                    </h2>
                    {section.subtitle && <p className="ip-section__subtitle">{section.subtitle}</p>}
                  </header>

                  <div className="ip-stops">
                    {section.figures.map((figure) => {
                      const side = figureIndex % 2 === 0 ? "left" : "right";
                      figureIndex += 1;
                      return <FigureRow key={figure.id} figure={figure} side={side} />;
                    })}
                  </div>
                </section>
              ));
            })()}
          </div>

          <aside
            className="ip-scroll-rail glass"
            aria-live="polite"
            aria-label="Timeline progress"
            style={{ "--accent": activeFigure.accent ?? "var(--gold)" } as CSSProperties}
          >
            <p className="ip-scroll-rail__label">Now reading</p>
            <p className="ip-scroll-rail__name">{activeFigure.name}</p>
            <p className="ip-scroll-rail__meta">
              {activeFigure.tradition} · {formatSortYear(activeFigure.sortYear)}
            </p>
            <div className="ip-scroll-rail__progress" aria-hidden>
              <div
                className="ip-scroll-rail__progress-fill"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
            <p className="ip-scroll-rail__count">
              {activeIndex} <span>/ {figures.length}</span>
            </p>
          </aside>
        </div>

        <aside className="ip-framing card">
          <h2 className="ip-framing__title">{INWARD_PATHS_FRAMING.title}</h2>
          <p className="ip-framing__body">{INWARD_PATHS_FRAMING.body}</p>
        </aside>
      </div>
    </div>
  );
}
