import { useEffect, useRef } from "react";
import gsap from "gsap";
import About3DCarousel from "../components/About3DCarousel";
import { ABOUT_IMAGES } from "../lib/aboutImages";
import { usePageSeo } from "../lib/seo";

export default function About() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  usePageSeo({
    title: "About / In Memory",
    description:
      "Six thousand years of belief — timelines, sacred geography, concept networks, and side-by-side comparisons across thirty-four traditions. Built for curiosity, not certainty.",
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
            <h1 className="about-hero__title">About / In Memory</h1>
            <p className="about-hero__lead">
              Six thousand years of belief. Timelines, sacred geography, concept networks,
              side-by-side comparisons across thirty-four traditions — built for curiosity, not
              certainty.
            </p>
            <p className="about-hero__body">
              I met these questions young. First in the Bhagavad Gita, then in Sufi verses read in
              secret as a teenager — the same question underneath every tradition I would later
              study: what is this flame in the human chest that reaches for the unseen, that builds
              temples and empires and laws around what it cannot see, and that sometimes, still,
              burns for it. This project is an attempt to give that question room to breathe.
            </p>
            <p className="about-hero__body about-hero__body--memorial">
              It is also, inseparably, dedicated to the dead of January 2026 — to the women and men
              killed by their own government in Iran, in a massacre the world was made to watch in
              the dark, the internet cut so the killing could not be witnessed. Among them, a woman
              whose face was never given back her name — catalogued only as number 12760. She is one
              of thousands. She stands here for all of them.
            </p>
            <p className="about-hero__body about-hero__body--memorial">
              To the trees that fell, and to all the unnamed forests beside them: you are not lost to
              memory. You are why this exists.
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
          </div>
        </div>
      </section>
    </div>
  );
}
