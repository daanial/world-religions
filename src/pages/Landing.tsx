import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "../components/Starfield";
import HeroTimelineStrip from "../components/HeroTimelineStrip";
import { RELIGIONS } from "../data/religions";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    to: "/timeline",
    eyebrow: "6,000 Years",
    title: "Interactive Timeline",
    body: "Drag, zoom, and trace births, schisms, and extinctions across the entire span of recorded belief.",
    accent: "var(--gold)",
    icon: TimelineIcon,
  },
  {
    to: "/globe",
    eyebrow: "Sacred Geography",
    title: "A Living Globe",
    body: "Fly between Varanasi, Mecca, Jerusalem, and Babylon. See where faiths took root.",
    accent: "var(--turquoise)",
    icon: GlobeIcon,
  },
  {
    to: "/concepts",
    eyebrow: "The Ideas",
    title: "Concept Network",
    body: "Wander a force-directed map of karma, salvation, sacrifice — and the faiths that hold them.",
    accent: "var(--violet)",
    icon: GraphIcon,
  },
  {
    to: "/compare",
    eyebrow: "Side by Side",
    title: "Compare Traditions",
    body: "Line up to four religions and see where they agree, diverge, and quietly echo each other.",
    accent: "var(--crimson)",
    icon: CompareIcon,
  },
];

export default function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero__eyebrow", { y: 20, opacity: 0, duration: 0.8 })
        .from(".hero__title-line", { y: 60, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.4")
        .from(".hero__lead", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero__cta > *", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(
          ".hero-strip",
          { opacity: 0, duration: 1 },
          "-=0.4"
        );

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Parallax stat numbers
      gsap.utils.toArray<HTMLElement>(".stat__num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = formatStatNum(obj.v, el.dataset.suffix || "");
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const livingCount = RELIGIONS.filter((r) => r.living).length;
  const extinctCount = RELIGIONS.filter((r) => r.extinct).length;
  const totalFollowers = RELIGIONS.reduce((sum, r) => sum + r.followers, 0);

  return (
    <div ref={rootRef}>
      <Starfield density="dense" drift />

      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero__vignette" aria-hidden />
        <div className="container hero__content">
          <div className="hero__eyebrow eyebrow">
            <span className="hero__eyebrow-line" /> Explore 6,000 years of belief
          </div>
          <h1 className="hero__title">
            <span className="hero__title-line">World</span>
            <span className="hero__title-line gradient-text">Religions</span>
          </h1>
          <p className="hero__lead">
            An interactive atlas of the faiths, philosophies, and ancient cosmologies that have
            shaped human consciousness — from Sumer's ziggurats to the modern diaspora.
          </p>
          <div className="hero__cta">
            <Link to="/timeline" className="btn btn--primary">
              Enter the Timeline
              <ArrowRight />
            </Link>
            <Link to="/globe" className="btn btn--ghost">
              Explore the Globe
            </Link>
          </div>
        </div>

        <HeroTimelineStrip />

        <div className="hero__scroll-hint" aria-hidden>
          <span>scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="stats container">
        <div className="stats__grid">
          <Stat value={RELIGIONS.length} suffix="+" label="Traditions mapped" />
          <Stat value={livingCount} suffix="" label="Still practiced today" />
          <Stat value={extinctCount} suffix="" label="Lost to time" />
          <Stat value={Math.round(totalFollowers / 1e9)} suffix="B" label="Adherents represented" />
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="features container">
        <div className="features__head reveal">
          <div className="eyebrow">Four ways to explore</div>
          <h2 className="features__title">An atlas you can wander</h2>
        </div>
        <div className="features__grid">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className="feature-card card reveal">
              <div className="feature-card__icon" style={{ color: f.accent }}>
                <f.icon />
              </div>
              <div className="feature-card__eyebrow eyebrow">{f.eyebrow}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p>{f.body}</p>
              <span className="feature-card__link" style={{ color: f.accent }}>
                Explore <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- FAMILIES ---------- */}
      <section className="families container">
        <div className="families__head reveal">
          <div className="eyebrow">By tradition family</div>
          <h2 className="features__title">Six great currents</h2>
        </div>
        <div className="families__grid reveal">
          {FAMILY_INFO.map((fam) => {
            const count = RELIGIONS.filter((r) => r.family === fam.id).length;
            return (
              <div key={fam.id} className="family-card card">
                <div className="family-card__swatch" style={{ background: fam.accent }} />
                <h3 className="family-card__name">{fam.name}</h3>
                <p className="family-card__desc">{fam.desc}</p>
                <div className="family-card__count">{count} traditions</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="stat reveal">
      <div
        className="stat__num"
        data-value={value}
        data-suffix={suffix}
      >
        0{suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

function formatStatNum(v: number, suffix: string): string {
  return `${Math.round(v)}${suffix}`;
}

/* ---------- icons ---------- */
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TimelineIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12h18M7 7v10M12 5v14M17 9v6" strokeLinecap="round" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}
function GraphIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="17" cy="18" r="2.5" />
      <circle cx="7" cy="17" r="2.5" />
      <path d="M8.3 8.3l7.4-1.4M8 16l8 1M8 8.5l8.3 8" />
    </svg>
  );
}
function CompareIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v18M5 8h4M5 12h4M5 16h4M15 8h4M15 12h4M15 16h4" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- family meta ---------- */
const FAMILY_INFO: { id: string; name: string; desc: string; accent: string }[] = [
  { id: "Abrahamic", name: "Abrahamic", desc: "Covenant, prophecy, and one God — from Sinai outward.", accent: "var(--crimson)" },
  { id: "Indian", name: "Indian", desc: "Karma, rebirth, and liberation across the subcontinent.", accent: "var(--saffron)" },
  { id: "Iranian", name: "Iranian", desc: "Light and darkness, from Zarathustra to the Bahá'í.", accent: "var(--gold)" },
  { id: "East Asian", name: "East Asian", desc: "Tao, ritual, and the kami of the rising sun.", accent: "var(--jade)" },
  { id: "African", name: "African & Diaspora", desc: "Orishas, lwa, and ancestors across the Black Atlantic.", accent: "var(--turquoise)" },
  { id: "Indigenous", name: "Indigenous", desc: "The Dreaming, the hózhó, the sacred land itself.", accent: "var(--violet)" },
];
