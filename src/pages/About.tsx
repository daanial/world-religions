import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import About3DCarousel from "../components/About3DCarousel";
import { ABOUT_IMAGES } from "../lib/aboutImages";
import { usePageSeo } from "../lib/seo";

export default function About() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  usePageSeo({
    title: "About Us",
    description:
      "Meet the team behind World Religions Explorer — an immersive study of belief across 6,000 years of human history.",
    path: "/about",
    image: ABOUT_IMAGES[0]?.src,
  });

  useEffect(() => {
    const overlay = overlayRef.current;
    const hint = hintRef.current;
    if (!overlay) return;

    gsap.set(overlay, { autoAlpha: 0, y: 24, filter: "blur(12px)" });
    if (hint) gsap.set(hint, { autoAlpha: 1 });

    const timeline = gsap.timeline({ delay: 4 });
    timeline.to(overlay, {
      autoAlpha: 1,
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
      <section className="about-hero" aria-label="About World Religions Explorer">
        <About3DCarousel images={ABOUT_IMAGES} className="about-hero__carousel" />

        <div className="about-hero__vignette" aria-hidden />

        <p ref={hintRef} className="about-hero__hint">
          Drag to orbit · Scroll to change speed · Click an image to focus
        </p>

        <div ref={overlayRef} className="about-hero__overlay glass" aria-live="polite">
          <div className="about-hero__overlay-inner">
            <div className="eyebrow">About us</div>
            <h1 className="about-hero__title">World Religions Explorer</h1>
            <p className="about-hero__lead">
              An educational journey through 6,000 years of belief — timelines, sacred geography,
              concept networks, and side-by-side comparisons across 34 traditions. Built for
              curiosity, not certainty.
            </p>
            <p className="about-hero__credit">
              Created by{" "}
              <a href="https://danialkeshani.com" target="_blank" rel="noopener noreferrer">
                Danial Keshani
              </a>{" "}
              &{" "}
              <a href="https://cubexic.com" target="_blank" rel="noopener noreferrer">
                Cubex
              </a>
            </p>
            <div className="about-hero__actions">
              <Link to="/timeline" className="btn btn--primary">
                Start exploring
              </Link>
              <Link to="/globe" className="btn btn--ghost">
                View the globe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
