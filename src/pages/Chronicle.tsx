import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RELIGIONS } from "../data/religions";
import { formatYear } from "../lib/format";
import { usePageSeo } from "../lib/seo";
import { withLocale, useLocale } from "../lib/locale";

gsap.registerPlugin(ScrollTrigger);

// Group traditions by era
const ERAS = [
  {
    name: "Ancient Beginnings",
    period: "3500–500 BCE",
    description: "The first temple cities and ritual cosmologies",
    traditions: RELIGIONS.filter((r) => r.origin < -500).sort((a, b) => a.origin - b.origin),
  },
  {
    name: "Axial Age",
    period: "800 BCE–200 CE",
    description: "The great transformation: ethical universalism and inner cultivation",
    traditions: RELIGIONS.filter((r) => r.origin >= -800 && r.origin <= 200).sort((a, b) => a.origin - b.origin),
  },
  {
    name: "Medieval Flowering",
    period: "200–1500 CE",
    description: "Synthesis, scholasticism, and mystical movements",
    traditions: RELIGIONS.filter((r) => r.origin > 200 && r.origin <= 1500).sort((a, b) => a.origin - b.origin),
  },
  {
    name: "Modern Movements",
    period: "1500 CE–Present",
    description: "Reform, revival, and new revelations",
    traditions: RELIGIONS.filter((r) => r.origin > 1500).sort((a, b) => a.origin - b.origin),
  },
];

export default function Chronicle() {
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  usePageSeo({
    title: "Chronicle — World Religions Explorer",
    description: "A pilgrimage through time from Sumer to the living traditions of today.",
    path: "/chronicle",
  });

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // Animate hero
      gsap.from(".chronicle__hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".chronicle__hero-lead", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Animate each era section
        gsap.utils.toArray<HTMLElement>(".chronicle__era").forEach((era) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: era,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(era.querySelector(".chronicle__era-name"), {
          x: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
          .from(
            era.querySelector(".chronicle__era-period"),
            {
              x: -80,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .from(
            era.querySelector(".chronicle__era-description"),
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.4"
          )
          .from(
            era.querySelectorAll(".chronicle__tradition"),
            {
              x: -60,
              opacity: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.3"
          );
      });

      // Final CTA
      gsap.from(".chronicle__cta", {
        scrollTrigger: {
          trigger: ".chronicle__cta",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={`chronicle ${reducedMotion ? "chronicle--reduced-motion" : ""}`}>
      <section className="chronicle__hero">
        <div className="container">
          <h1 className="chronicle__hero-title">Chronicle</h1>
          <p className="chronicle__hero-lead">
            A pilgrimage through time — from Sumer's temple hymns to the living traditions of today
          </p>
        </div>
      </section>

      <div className="chronicle__timeline">
        {ERAS.map((era) => (
          <section key={era.name} className="chronicle__era">
            <div className="container">
              <div className="chronicle__era-marker" />
              <h2 className="chronicle__era-name">{era.name}</h2>
              <div className="chronicle__era-period">{era.period}</div>
              <p className="chronicle__era-description">{era.description}</p>

              <div className="chronicle__traditions">
                {era.traditions.map((tradition) => (
                  <Link
                    key={tradition.id}
                    to={withLocale(locale, `/religion/${tradition.id}`)}
                    className="chronicle__tradition"
                    style={{ "--accent": tradition.accent } as React.CSSProperties}
                  >
                    <div className="chronicle__tradition-dot" style={{ background: tradition.accent }} />
                    <div className="chronicle__tradition-content">
                      <div className="chronicle__tradition-name">{tradition.name}</div>
                      <div className="chronicle__tradition-meta">
                        {formatYear(tradition.origin)} · {tradition.family}
                        {tradition.extinct && <span className="chronicle__tradition-extinct">Extinct</span>}
                      </div>
                      <p className="chronicle__tradition-blurb">{tradition.blurb}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="chronicle__cta">
        <div className="container">
          <h2 className="chronicle__cta-title">44 traditions. Centuries of wisdom.</h2>
          <p className="chronicle__cta-lead">
            Explore the full directory, compare core concepts, or trace sacred geography across the globe.
          </p>
          <div className="chronicle__cta-actions">
            <Link to={withLocale(locale, "/traditions")} className="btn btn--primary">
              Browse All Traditions
            </Link>
            <Link to={withLocale(locale, "/compare")} className="btn btn--ghost">
              Compare
            </Link>
            <Link to={withLocale(locale, "/globe")} className="btn btn--ghost">
              Globe
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
