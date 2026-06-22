import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals `.reveal` descendants within the container via GSAP ScrollTrigger.
 * Scoped to the container ref — never use `.reveal` on content that mounts later
 * (after user interaction); that content should animate in directly instead.
 */
export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".reveal").forEach((target) => {
        gsap.fromTo(
          target,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [containerRef]);
}

export function useParallax(containerRef: React.RefObject<HTMLElement | null>, speed = 0.12) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -12 * speed * 10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [containerRef, speed]);
}

export function useStaggerReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".reveal-stagger").forEach((parent) => {
        const children = parent.querySelectorAll(":scope > *");
        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: parent,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [containerRef]);
}
