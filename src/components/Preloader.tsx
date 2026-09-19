"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      const obj = { value: 0 };
      // Phones get a much shorter gate so content appears sooner.
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const progressDur = coarse ? 1.0 : 1.9;
      const exitDur = coarse ? 0.55 : 0.9;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      // ── entrance ───────────────────────────────────────────
      tl.from(".pre-brand", { y: 26, opacity: 0, duration: 0.6 })
        .from(
          ".pre-letter",
          {
            y: "115%",
            opacity: 0,
            rotateX: -75,
            transformOrigin: "50% 100%",
            duration: 0.9,
            stagger: 0.035,
            clearProps: "transform,opacity",
          },
          0.12
        )
        .from(
          ".pre-rule",
          { scaleX: 0, transformOrigin: "left center", duration: 0.8 },
          0.4
        )
        .from(".pre-meta", { opacity: 0, y: 10, duration: 0.4 }, 0.55);

      // ── progress + counter ─────────────────────────────────
      const tween = gsap.to(obj, {
        value: 100,
        duration: progressDur,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.round(obj.value)
            ).padStart(2, "0");
          }
          if (barRef.current)
            barRef.current.style.transform = `scaleX(${obj.value / 100})`;
        },
      });
      tl.add(tween, 0.3);

      // ── exit ───────────────────────────────────────────────
      tl.to(
        ".pre-letter",
        {
          yPercent: -110,
          duration: 0.55,
          ease: "power4.inOut",
          stagger: 0.02,
        },
        ">-0.15"
      )
        .to(
          ".pre-brand, .pre-meta, .pre-rule, .pre-bar",
          { opacity: 0, y: -14, duration: 0.35, ease: "power2.in" },
          "<0.1"
        )
        .to(
          containerRef.current,
          { yPercent: -100, duration: exitDur, ease: "power4.inOut" },
          ">-0.15"
        )
        .add(() => {
          document.documentElement.style.overflow = "";
        });

      return () => {
        tween.kill();
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#f4f5f7] dark:bg-[#050507] transition-pointer-events ${
        done ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* ambient glows to echo the site's aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-500/15 blur-[110px]" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div className="pre-brand font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          RA<span className="text-blue-500">.</span>
        </div>

        {/* "RIYAS AHAMED" letter lockup */}
        <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-2 overflow-hidden">
          <div className="flex gap-[0.5em] font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-300">
            {"RIYAS".split("").map((ch, i) => (
              <span key={`r-${i}`} className="pre-letter inline-block will-change-transform">
                {ch}
              </span>
            ))}
          </div>
          <div className="flex gap-[0.5em] font-display text-3xl font-semibold tracking-tight text-blue-500">
            {"AHAMED".split("").map((ch, i) => (
              <span key={`a-${i}`} className="pre-letter inline-block will-change-transform">
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* divider + counter + progress bar */}
        <div className="flex w-64 flex-col items-center gap-3">
          <div className="pre-rule flex w-full items-center gap-3">
            <span className="h-px flex-1 bg-slate-300 dark:bg-white/15" />
            <span
              ref={counterRef}
              className="pre-meta font-display text-sm tabular-nums tracking-widest text-slate-500 dark:text-slate-400"
            >
              00
            </span>
            <span className="h-px flex-1 bg-slate-300 dark:bg-white/15" />
          </div>
          <div className="pre-bar h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div
              ref={barRef}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}