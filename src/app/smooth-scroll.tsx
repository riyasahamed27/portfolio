"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Phones touch-scroll natively and Lenis cannot smooth the wheel there
    // anyway, so skip it on coarse pointers entirely (native scroll is faster
    // and smoother on mobile hardware, and saves a constant rAF hitch).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      autoRaf: false,
    });

    (window as unknown as { lenis: Lenis }).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Re-measure after the preloader releases scroll, images load, and fonts
    // settle so ScrollTrigger pin spacers don't leave blank gaps while scrolling.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    const idleRefresh = window.setTimeout(refresh, 500);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(idleRefresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}