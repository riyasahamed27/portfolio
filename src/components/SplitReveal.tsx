"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type SplitMode = "chars" | "words" | "lines";

export function SplitReveal({
  text,
  className,
  mode = "chars",
  delay = 0,
  stagger = 0.03,
  splitClassName,
}: {
  text: string;
  className?: string;
  mode?: SplitMode;
  delay?: number;
  stagger?: number;
  splitClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = new SplitText(ref.current, {
      type: mode,
      charsClass: splitClassName || "split-char",
      wordsClass: "split-word",
      linesClass: "split-line",
    });

    gsap.from(split[mode] as gsap.TweenTarget, {
      yPercent: 120,
      opacity: 0,
      rotateX: -60,
      stagger,
      duration: 1,
      delay,
      ease: "power4.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
    });

    return () => split.revert();
  }, [text, mode, stagger, delay, splitClassName]);

  return (
    <span ref={ref} className={`block ${className ?? ""}`}>
      {text}
    </span>
  );
}