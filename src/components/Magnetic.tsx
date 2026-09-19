"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (strength <= 0) return;
      const el = ref.current!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1,0.45)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1,0.45)" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        xTo((e.clientX - cx) * strength);
        yTo((e.clientY - cy) * strength);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref, dependencies: [strength] }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}