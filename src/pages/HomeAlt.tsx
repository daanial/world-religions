import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "../components/Starfield";
import HeroTimelineStrip from "../components/HeroTimelineStrip";
import { RELIGIONS } from "../data/religions";
import { buildWebsiteJsonLd, usePageSeo } from "../lib/seo";
import { SITE_DESCRIPTION } from "../lib/site";
import { useLocale, withLocaleAndQuery, withLocale } from "../lib/locale";

gsap.registerPlugin(ScrollTrigger);

// Reuse Landing stats calculation
const livingCount = RELIGIONS.filter((r) => r.living).length;
const extinctCount = RELIGIONS.filter((r) => r.extinct).length;
const totalFollowers = RELIGIONS.reduce((sum, r) => sum + r.followers, 0);

// Reuse Landing features data
const features = [
  {
    to: "/timeline",
    eyebrow: "6,000 Years",
    title: "Interactive Timeline",
    body: "Drag, zoom, and trace births, schisms, and extinctions across the entire span of recorded belief.",
    accent: "var(--gold)",
  },
  {
    to: "/globe",
    eyebrow: "Sacred Geography",
    title: "A Living Globe",
    body: "Fly between Varanasi, Mecca, Jerusalem, and Babylon. See where faiths took root.",
    accent: "var(--turquoise)",
  },
  {
    to: "/concepts",
    eyebrow: "The Ideas",
    title: "Concept Network",
    body: "Wander a force-directed map of karma, salvation, sacrifice — and the faiths that hold them.",
    accent: "var(--violet)",
  },
  {
    to: "/compare",
    eyebrow: "Side by Side",
    title: "Compare Traditions",
    body: "Line up to four religions and see where they agree, diverge, and quietly echo each other.",
    accent: "var(--crimson)",
  },
];

// Additional explores
const additionalExplores = [
  {
    to: "/pilgrimage",
    title: "Pilgrimage",
    body: "Sacred journeys across faiths",
    accent: "var(--jade)",
  },
  {
    to: "/inward-paths",
    title: "Inward Paths",
    body: "Mysticism and contemplative practice",
    accent: "var(--rose)",
  },
];

function formatStatNum(v: number, suffix: string): string {
  return Math.round(v).toString() + suffix;
}

export default function HomeAlt() {
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const reducedMotion = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  usePageSeo({
    title: "World Religions Explorer — Alternative Layout",
    description: SITE_DESCRIPTION,
    path: "/home-alt",
    jsonLd: buildWebsiteJsonLd(),
  });

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".home-alt__hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Stats instrument cluster
      gsap.from(".home-alt__stat", {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".home-alt__stats",
          start: "top 80%",
        },
      });

      // Video stage
      gsap.from(".home-alt__video", {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".home-alt__video",
          start: "top 75%",
        },
      });

      // Explore dock
      gsap.from(".home-alt__dock-item", {
        x: -60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".home-alt__dock",
          start: "top 80%",
        },
      });

      // Family floor
      gsap.from(".home-alt__family-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".home-alt__families",
          start: "top 75%",
        },
      });

      // Animate stat numbers
      gsap.utils.toArray<HTMLElement>(".home-alt__stat-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = formatStatNum(obj.v, el.dataset.suffix || "");
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Group families
  const familyGroups = RELIGIONS.reduce((acc, r) => {
    if (!acc[r.family]) acc[r.family] = [];
    acc[r.family].push(r);
    return acc;
  }, {} as Record<string, typeof RELIGIONS>);

  return (
    <div ref={rootRef} className={`home-alt ${reducedMotion ? "home-alt--reduced-motion" : ""}`}>
      <Starfield density="dense" drift={!reducedMotion} />

      {/* Hero with timeline strip */}
      <section className="home-alt__hero">
        <div className="container">
          <div className="home-alt__hero-content">
            <div className="eyebrow">
              <span className="home-alt__hero-line" /> Explore 6,000 years of belief
            </div>
            <h1 className="home-alt__hero-title">
              <span>World</span>
              <span className="gradient-text">Religions</span>
            </h1>
            <p className="home-alt__hero-lead">
              An interactive atlas of the faiths, philosophies, and ancient cosmologies that have
              shaped human consciousness — from Sumer's ziggurats to the modern diaspora.
            </p>
            <div className="home-alt__hero-ctas">
              <Link to={withLocale(locale, "/timeline")} className="btn btn--primary">
                Enter the Timeline
              </Link>
              <Link to={withLocale(locale, "/globe")} className="btn btn--ghost">
                Explore the Globe
              </Link>
            </div>
          </div>
        </div>
        <HeroTimelineStrip />
      </section>

      {/* Stats as instrument cluster */}
      <section className="home-alt__stats container">
        <div className="home-alt__stat">
          <div className="home-alt__stat-num" data-value={RELIGIONS.length} data-suffix="+">
            0+
          </div>
          <div className="home-alt__stat-label">Traditions mapped</div>
        </div>
        <div className="home-alt__stat">
          <div className="home-alt__stat-num" data-value={livingCount} data-suffix="">
            0
          </div>
          <div className="home-alt__stat-label">Still practiced today</div>
        </div>
        <div className="home-alt__stat">
          <div className="home-alt__stat-num" data-value={extinctCount} data-suffix="">
            0
          </div>
          <div className="home-alt__stat-label">Lost to time</div>
        </div>
        <div className="home-alt__stat">
          <div className="home-alt__stat-num" data-value={Math.round(totalFollowers / 1e9)} data-suffix="B">
            0B
          </div>
          <div className="home-alt__stat-label">Adherents represented</div>
        </div>
      </section>

      {/* Six great currents video as living stage */}
      <section className="home-alt__stage container">
        <h2 className="home-alt__stage-title">Six Great Currents</h2>
        <div className="home-alt__video">
          <video
            className="home-alt__video-player"
            src="/assets/six-great-currents-combined.mp4"
            autoPlay
            muted
            playsInline
            loop
          />
        </div>
      </section>

      {/* Four explores as a dock */}
      <section className="home-alt__dock container">
        <h2 className="home-alt__dock-title">Four Ways to Explore</h2>
        <div className="home-alt__dock-grid">
          {features.map((f) => (
            <Link key={f.to} to={withLocale(locale, f.to)} className="home-alt__dock-item">
              <div className="home-alt__dock-accent" style={{ background: f.accent }} />
              <div className="home-alt__dock-eyebrow">{f.eyebrow}</div>
              <h3 className="home-alt__dock-name">{f.title}</h3>
              <p className="home-alt__dock-body">{f.body}</p>
            </Link>
          ))}
        </div>
        
        {/* Additional explores */}
        <div className="home-alt__dock-additional">
          {additionalExplores.map((e) => (
            <Link key={e.to} to={withLocale(locale, e.to)} className="home-alt__dock-extra">
              <div className="home-alt__dock-extra-accent" style={{ background: e.accent }} />
              <div className="home-alt__dock-extra-title">{e.title}</div>
              <div className="home-alt__dock-extra-body">{e.body}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Families as the floor */}
      <section className="home-alt__families container">
        <h2 className="home-alt__families-title">By Tradition Family</h2>
        <div className="home-alt__families-grid">
          {Object.entries(familyGroups).map(([family, rels]) => (
            <Link
              key={family}
              to={withLocaleAndQuery(locale, "/traditions", `family=${encodeURIComponent(family)}`)}
              className="home-alt__family-card"
            >
              <h3 className="home-alt__family-name">{family}</h3>
              <div className="home-alt__family-count">{rels.length} traditions</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
