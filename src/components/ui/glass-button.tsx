"use client";

import { type ReactNode, useRef } from "react";
import {
  GlassSurface,
  type GlassSurfaceHandle,
} from "@/components/ui/glass";
import {
  Track,
  glide,
  easeGel,
  easeSoft,
  PRESS,
  RELEASE,
} from "@/components/ui/glass-motion";
import { cn } from "@/lib/utils";

interface GlassButtonProps {
  /** Frosted tint 0–1. */
  tint?: number;
  /** "icon" = circular disc, "capsule" = text pill. */
  variant?: "icon" | "capsule";
  /** When set, renders an <a> with the same liquid treatment. */
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onPointerDown?: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerUp?: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave?: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerCancel?: (e: React.PointerEvent<HTMLElement>) => void;
  suppressHydrationWarning?: boolean;
}

export function GlassButton({
  tint = 0,
  variant = "icon",
  href,
  target,
  rel,
  children,
  className,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...props
}: GlassButtonProps) {
  const surface = useRef<GlassSurfaceHandle | null>(null);
  const scaleEl = useRef<HTMLSpanElement | null>(null);
  const scale = useRef(new Track(1));
  const isIcon = variant === "icon";

  const press = () => {
    scale.current.watch((v) => {
      if (scaleEl.current) scaleEl.current.style.scale = String(v);
    });
    surface.current?.setTintLift(-0.14);
    glide(scale.current, 0.92, PRESS, easeGel);
  };

  const release = () => {
    surface.current?.setTintLift(0);
    glide(scale.current, 1, RELEASE, easeSoft);
  };

  const pointerHandlers = {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      press();
      onPointerDown?.(e);
    },
    onPointerUp: (e: React.PointerEvent<HTMLElement>) => {
      release();
      onPointerUp?.(e);
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      release();
      onPointerLeave?.(e);
    },
    onPointerCancel: (e: React.PointerEvent<HTMLElement>) => {
      release();
      onPointerCancel?.(e);
    },
  };

  const inner = (
    <span
      ref={scaleEl}
      className="block origin-center"
      style={{ scale: "1" }}
    >
      <GlassSurface
        handleRef={surface}
        tint={tint}
        radius={isIcon ? 999 : 16}
        className={cn(
          "text-slate-900 dark:text-white",
          isIcon ? "size-12" : "h-12 px-6",
        )}
        contentClassName="flex items-center justify-center whitespace-nowrap"
      >
        <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap text-sm font-medium">{children}</span>
      </GlassSurface>
    </span>
  );

  const cls = cn(
    "relative w-fit select-none outline-none whitespace-nowrap transition-[filter] focus-visible:brightness-110",
    isIcon ? "rounded-full" : "rounded-2xl",
    className,
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls} {...pointerHandlers} {...props}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...pointerHandlers} {...props}>
      {inner}
    </button>
  );
}