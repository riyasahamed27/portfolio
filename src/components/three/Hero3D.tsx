"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "./HeroScene";

export function Hero3D({ dark }: { dark: boolean }) {
  const progress = useRef({ p: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        progress.current.p = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const supported = useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext && canvas.getContext("webgl")
      );
    } catch {
      return false;
    }
  }, []);

  if (!supported) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/portrait.jpg"
          alt="Riyas Ahamed"
          className="w-full max-w-sm rounded-3xl border border-white/10 shadow-2xl"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <HeroScene dark={dark} motionRef={progress} />
      </Suspense>
    </Canvas>
  );
}