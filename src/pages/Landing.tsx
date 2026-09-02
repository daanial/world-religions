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
import { pt } from "../lib/pageI18n";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    to: "/timeline",
    eyebrow: "6,000 Years",
    title: "Interactive Timeline",
    faTitle: "جدول زمانی تعاملی",
    body: "Drag, zoom, and trace births, schisms, and extinctions across the entire span of recorded belief.",
    faBody: "در سراسر گسترهٔ باورهای ثبت‌شده بکشید، بزرگ‌نمایی کنید و پیدایش‌ها، انشعاب‌ها و نابودی‌ها را دنبال کنید.",
    faEyebrow: "۶٬۰۰۰ سال",
    accent: "var(--gold)",
    icon: TimelineIcon,
  },
  {
    to: "/globe",
    eyebrow: "Sacred Geography",
    title: "A Living Globe",
    faTitle: "کرهٔ زمینِ زنده",
    body: "Fly between Varanasi, Mecca, Jerusalem, and Babylon. See where faiths took root.",
    faBody: "میان واراناسی، مکه، اورشلیم و بابل پرواز کنید و ببینید ادیان در کجا ریشه دوانده‌اند.",
    faEyebrow: "جغرافیای مقدس",
    accent: "var(--turquoise)",
    icon: GlobeIcon,
  },
  {
    to: "/concepts",
    eyebrow: "The Ideas",
    title: "Concept Network",
    faTitle: "شبکهٔ مفاهیم",
    body: "Wander a force-directed map of karma, salvation, sacrifice — and the faiths that hold them.",
    faBody: "در نقشه‌ای پویا از کارما، رستگاری و قربانی — و دین‌هایی که آن‌ها را در خود دارند — پرسه بزنید.",
    faEyebrow: "ایده‌ها",
    accent: "var(--violet)",
    icon: GraphIcon,
  },
  {
    to: "/compare",
    eyebrow: "Side by Side",
    title: "Compare Traditions",
    faTitle: "مقایسهٔ سنت‌ها",
    body: "Line up to four religions and see where they agree, diverge, and quietly echo each other.",
    faBody: "تا چهار دین را کنار هم بگذارید و ببینید کجا هم‌نظرند، کجا جدا می‌شوند و کجا پژواک یکدیگرند.",
    faEyebrow: "کنار هم",
    accent: "var(--crimson)",
    icon: CompareIcon,
  },
];

export default function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  usePageSeo({
    title: locale === "fa" ? "کاوشگر ادیان جهان" : "World Religions Explorer",
    description: locale === "fa" ? "اطلس تعاملی ادیان، فلسفه‌ها و کیهان‌شناسی‌هایی که تاریخ آگاهی انسان را شکل داده‌اند." : SITE_DESCRIPTION,
    path: "/",
    jsonLd: buildWebsiteJsonLd(
      locale,
      locale === "fa" ? "اطلس تعاملی ادیان، فلسفه‌ها و کیهان‌شناسی‌هایی که تاریخ آگاهی انسان را شکل داده‌اند." : SITE_DESCRIPTION
    ),
  });

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
        <video
          className="hero__video"
          src="/assets/HeroReligionsCubexic.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden
        />
        <div className="hero__video-overlay" aria-hidden />

        <div className="hero__vignette" aria-hidden />
        <div className="container hero__content">
          <div className="hero__eyebrow eyebrow">
            <span className="hero__eyebrow-line" /> {pt(locale, "landingEyebrow")}
          </div>
          <h1 className="hero__title">
            <span className="hero__title-line">{locale === "fa" ? "ادیان" : "World"}</span>
            <span className="hero__title-line gradient-text">{locale === "fa" ? "جهان" : "Religions"}</span>
          </h1>
          <p className="hero__lead">
            {pt(locale, "landingLead")}
          </p>
          <div className="hero__cta">
            <Link to={withLocale(locale, "/timeline")} className="btn btn--primary">
              {pt(locale, "enterTimeline")}
              <ArrowRight />
            </Link>
            <Link to={withLocale(locale, "/globe")} className="btn btn--ghost">
              {pt(locale, "exploreGlobe")}
            </Link>
          </div>
        </div>

        <HeroTimelineStrip />

        <div className="hero__scroll-hint" aria-hidden>
          <span>{pt(locale, "scroll")}</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="stats container">
        <div className="stats__grid">
          <Stat value={RELIGIONS.length} suffix="+" label={pt(locale, "traditionsMapped")} />
          <Stat value={livingCount} suffix="" label={pt(locale, "practicedToday")} />
          <Stat value={extinctCount} suffix="" label={pt(locale, "lostToTime")} />
          <Stat value={Math.round(totalFollowers / 1e9)} suffix="B" label={pt(locale, "adherentsRepresented")} />
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="features container">
        <div className="features__head reveal">
          <div className="eyebrow">{pt(locale, "fourWays")}</div>
          <h2 className="features__title">{pt(locale, "atlasWander")}</h2>
        </div>
        <div className="features__grid">
          {features.map((f) => (
            <Link key={f.to} to={withLocale(locale, f.to)} className="feature-card card reveal">
              <div className="feature-card__icon" style={{ color: f.accent }}>
                <f.icon />
              </div>
              <div className="feature-card__eyebrow eyebrow">{locale === "fa" ? f.faEyebrow : f.eyebrow}</div>
              <h3 className="feature-card__title">{locale === "fa" ? f.faTitle : f.title}</h3>
              <p>{locale === "fa" ? f.faBody : f.body}</p>
              <span className="feature-card__link" style={{ color: f.accent }}>
                {pt(locale, "explore")} <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- SIX GREAT CURRENTS VIDEO ---------- */}
      <section className="families-video">
        <div className="families-video__inner reveal">
          <video
            className="families-video__player"
            src="/assets/six-great-currents-combined.mp4"
            autoPlay
            muted
            playsInline
            loop
          />
        </div>
      </section>

      {/* ---------- FAMILIES ---------- */}
      <section className="families container">
        <div className="families__head reveal">
          <div className="eyebrow">{pt(locale, "byFamily")}</div>
          <h2 className="features__title">{locale === "fa" ? "هشت جریان بزرگ" : "Six great currents"}</h2>
        </div>
        <div className="families__grid reveal">
          {FAMILY_INFO.map((fam) => {
            const count = RELIGIONS.filter((r) => r.family === fam.id).length;
            return (
              <Link
                key={fam.id}
                to={withLocaleAndQuery(locale, "/traditions", `family=${encodeURIComponent(fam.id)}`)}
                className="family-card card"
              >
                <div className="family-card__swatch" style={{ background: fam.accent }} />
                <h3 className="family-card__name">{locale === "fa" ? fam.faName : fam.name}</h3>
                <p className="family-card__desc">{locale === "fa" ? fam.faDesc : fam.desc}</p>
                <div className="family-card__count">{count} {pt(locale, "traditions")}</div>
              </Link>
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
const FAMILY_INFO: { id: string; name: string; faName: string; desc: string; faDesc: string; accent: string }[] = [
  { id: "Abrahamic", name: "Abrahamic", faName: "ابراهیمی", desc: "Covenant, prophecy, and one God — from Sinai outward.", faDesc: "پیمان، پیامبری و خدای یگانه — از سینا به بعد.", accent: "var(--crimson)" },
  { id: "Indian", name: "Indian", faName: "هندی", desc: "Karma, rebirth, and liberation across the subcontinent.", faDesc: "کارما، تولد دوباره و رهایی در سراسر شبه‌قاره.", accent: "var(--saffron)" },
  { id: "Iranian", name: "Iranian", faName: "ایرانی", desc: "Light and darkness, from Zarathustra to the Bahá'í.", faDesc: "روشنایی و تاریکی، از زرتشت تا بهائی.", accent: "var(--gold)" },
  { id: "East Asian", name: "East Asian", faName: "شرق آسیا", desc: "Tao, ritual, and the kami of the rising sun.", faDesc: "تائو، آیین و کامی‌های سرزمین خورشید تابان.", accent: "var(--jade)" },
  { id: "Indo-European", name: "Indo-European", faName: "هندواروپایی", desc: "Bronze Age pantheons, from Sumer to the Nordic sagas.", faDesc: "خدایان عصر برنز، از سومر تا حماسه‌های نورس.", accent: "var(--amber)" },
  { id: "African", name: "African & Diaspora", faName: "آفریقایی و جوامع پراکنده", desc: "Orishas, lwa, and ancestors across the Black Atlantic.", faDesc: "اوریشاها، لواها و نیاکان در سراسر اطلس سیاه.", accent: "var(--turquoise)" },
  { id: "Indigenous", name: "Indigenous", faName: "بومی", desc: "The Dreaming, the hózhó, the sacred land itself.", faDesc: "دریمینگ، هُژو و خودِ سرزمین مقدس.", accent: "var(--violet)" },
  { id: "Modern", name: "Modern", faName: "نوین", desc: "New religious movements born from 19th-century revelation and reform.", faDesc: "جنبش‌های دینی نوینی که از وحی و اصلاحات سدهٔ نوزدهم زاده شدند.", accent: "var(--periwinkle)" },
];
