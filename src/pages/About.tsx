import { useEffect, useRef } from "react";
import gsap from "gsap";
import About3DCarousel from "../components/About3DCarousel";
import { ABOUT_IMAGES } from "../lib/aboutImages";
import { usePageSeo } from "../lib/seo";
import { useLocale } from "../lib/locale";
import { pt } from "../lib/pageI18n";

export default function About() {
  const locale = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  usePageSeo({
    title: locale === "fa" ? "درباره / به یاد" : "About / In Memory",
    description: locale === "fa" ? "شش هزار سال باور — جدول‌های زمانی، جغرافیای مقدس، شبکه‌های مفهومی و مقایسهٔ ۴۴ سنت. ساخته‌شده برای کنجکاوی، نه قطعیت." : "Six thousand years of belief — timelines, sacred geography, concept networks, and side-by-side comparisons across 44 traditions. Built for curiosity, not certainty.",
    path: "/about",
    image: ABOUT_IMAGES[0]?.src,
  });

  useEffect(() => {
    const overlay = overlayRef.current;
    const hint = hintRef.current;
    if (!overlay) return;

    gsap.set(overlay, { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 24, filter: "blur(12px)" });
    if (hint) gsap.set(hint, { autoAlpha: 1 });

    const timeline = gsap.timeline({ delay: 4 });
    timeline.to(overlay, {
      autoAlpha: 1,
      xPercent: -50,
      yPercent: -50,
      y: 0,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power3.out",
    });
    if (hint) {
      timeline.to(hint, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, "-=0.9");
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="page about-page">
      <section className="about-hero" aria-label={pt(locale, "aboutLabel")}>
        <About3DCarousel images={ABOUT_IMAGES} className="about-hero__carousel" />

        <div className="about-hero__vignette" aria-hidden />

        <p ref={hintRef} className="about-hero__hint">
          {locale === "fa" ? "برای چرخش بکشید · برای تغییر سرعت پیمایش کنید · برای تمرکز روی تصویر کلیک کنید" : "Drag to orbit · Scroll to change speed · Click an image to focus"}
        </p>

        <div ref={overlayRef} className="about-hero__overlay glass" aria-live="polite">
          <div className="about-hero__overlay-inner">
            <h1 className="about-hero__title">{pt(locale, "aboutTitle")}</h1>
            <p className="about-hero__lead">
              {locale === "fa" ? "شش هزار سال باور. خط‌های زمانی، جغرافیای مقدس، شبکه‌های مفهومی و مقایسه‌های رودررو میان ۴۴ سنت دینی و فلسفی؛ اطلسی برای آنان که از سرِ کنجکاوی می‌جویند، نه برای آنان که در پیِ یقینِ مطلق‌اند." : "Six thousand years of belief. Timelines, sacred geography, concept networks, side-by-side comparisons across 44 traditions — built for curiosity, not certainty."}
            </p>
            <p className="about-hero__body">
              {locale === "fa" ? "از جوانی با این پرسش‌ها زیسته‌ام. نخست در بهاگاواد گیتا، و سپس در نوجوانی و در ابیاتی از عرفان صوفیانه که پنهانی می‌خواندم و پرسشی واحد در ژرفای همهٔ سنت‌هایی که بعدها به مطالعه‌شان پرداختم: این شعله در سینهٔ انسان چیست که به سوی نادیدنی دست می‌گشاید، پیرامون آنچه نمی‌تواند ببیند معبدها و امپراتوری‌ها و قوانین بنا می‌کند، و گاه هنوز، برای همان نادیدنی، فروزان می‌ماند؟ این پروژه تلاشی است برای آنکه به این پرسش مجالِ نفس کشیدن بدهد." : "I met these questions young. First in the Bhagavad Gita, then in Sufi verses read in secret as a teenager — the same question underneath every tradition I would later study: what is this flame in the human chest that reaches for the unseen, that builds temples and empires and laws around what it cannot see, and that sometimes, still, burns for it. This project is an attempt to give that question room to breathe."}
            </p>
            {locale === "fa" ? (
              <p className="about-hero__body about-hero__body--memorial">
                همچنین به سروهای روانی که در شب‌های سرد زمستان فرو افتادند: شما از حافظهٔ ما محو نخواهید شد. این اثر، به پاسِ شما، هستی یافته است.
              </p>
            ) : (
              <>
                <p className="about-hero__body about-hero__body--memorial">
                  It is also, inseparably, dedicated to the dead of January 2026 — to the women and men killed by their own government in Iran, in a massacre the world was made to watch in the dark, the internet cut so the killing could not be witnessed. Among them, a woman whose face was never given back her name — catalogued only as number 12760. She is one of thousands. She stands here for all of them.
                </p>
                <p className="about-hero__body about-hero__body--memorial">
                  To the trees that fell, and to all the unnamed forests beside them: you are not lost to memory. You are why this exists.
                </p>
              </>
            )}
            <p className="about-hero__credit">
              {locale === "fa" ? "ساخته‌شده توسط " : "Created by "}
              <a href="https://danialkeshani.com" target="_blank" rel="noopener noreferrer">
                Danial Keshani
              </a>{" "}
              {locale === "fa" ? "و" : "&"}{" "}
              <a href="https://cubexic.com" target="_blank" rel="noopener noreferrer">
                Cubex
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
