"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Moon,
  Sun,
  ArrowDown,
  CodeXml,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiMongodb,
  SiAmazon,
  SiDocker,
  SiPython,
  SiTensorflow,
  SiOpencv,
  SiMysql,
} from "react-icons/si";

import { CustomCursor } from "../components/CustomCursor";
import { Preloader } from "../components/Preloader";
import { Magnetic } from "../components/Magnetic";
import { SplitReveal } from "../components/SplitReveal";
import { GlassSurface } from "../components/ui/glass";
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "../components/ui/glass-card";
import { GlassButton } from "../components/ui/glass-button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../components/ui/glass-tabs";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Phones: no smooth-scroll, no pinned rails, no scroll-scrubbed FX. Keeping the
// animation workload (aurora re-tinting, parallax scrubbing, pinned sections)
// off touch devices is what makes the page feel instant on mobile.
const isCoarse = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

const isFine = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/riyasahamed27", icon: Github },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/riyas-ahamed-dev",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:riyasahamed82478@gmail.com",
    icon: Mail,
  },
];

const NAV_LINKS = ["Home", "Skills", "Projects", "Experience", "About"];

const FULLSTACK_SKILLS: Skill[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "AWS", icon: SiAmazon, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const AISKILLS: Skill[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
];

const PROJECTS = [
  {
    title: "Swypatune",
    desc: "Full-stack contest platform for video/audio content featuring monetization, push notifications, and payment processing.",
    tags: ["Laravel", "Ionic", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    offset: 0,
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.swypeglobal&hl=en_IN&pli=1",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/in/app/swypatune-global/id6737972162",
      },
    ],
  },
  {
    title: "WeAreWear",
    desc: "SEO-optimized e-commerce platform built with Next.js, featuring a responsive storefront and scalable Express.js REST APIs with MongoDB.",
    tags: ["Next.js", "Express.js", "Node.js", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    offset: 48,
    links: [{ label: "Visit Website", href: "https://www.wearewear.ai" }],
  },
  {
    title: "Lovu Travel",
    desc: "Cross-platform travel marketplace for couples, connecting travelers with hotels, advisors, and experience providers.",
    tags: ["React.js", "Firebase", "Stripe", "Laravel"],
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80",
    offset: 96,
    links: [{ label: "Visit Website", href: "https://lovu.travel" }],
  },
  {
    title: "Taka Solutions",
    desc: "Interactive dashboard for real-time visualization of electricity consumption across Dubai buildings with dynamic reporting.",
    tags: ["Next.js", "Django", "Chart.js"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    offset: 0,
    links: [{ label: "Visit Website", href: "https://takasolutions.com" }],
  },
  {
    title: "AI Fashion Platform",
    desc: "Full-stack web app generating personalized outfit suggestions using AI-based image analysis and ML algorithms.",
    tags: ["React", "Node.js", "Python", "AI/ML"],
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=80",
    offset: 48,
    links: [],
  },
  {
    title: "Ribatis Mobile",
    desc: "Secure government communication app with end-to-end encrypted chat and audio/video conferencing using Matrix SDK.",
    tags: ["React Native", "WebRTC", "Matrix SDK"],
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1000&q=80",
    offset: 96,
    links: [],
  },
];

const EXPERIENCE = [
  {
    role: "Junior Software Developer",
    company: "RedBlox.io",
    date: "Feb 2024 - Present",
    items: [
      "Developed and deployed 6+ full-stack web applications serving 10,000+ active users.",
      "Architected secure user authentication systems (RBAC) using JWT and OAuth 2.0.",
      "Optimized frontend performance, achieving a 20% improvement in page load times.",
    ],
    tech: ["React", "Next.js", "Node.js", "MySQL"],
  },
  {
    role: "Software Development Intern",
    company: "RedBlox.io",
    date: "2020 - 2023",
    items: [
      "Developed web modules using React.js, Express.js, and MySQL.",
      "Implemented backend APIs and user authentication flows.",
      "Strong performance led to a full-time offer.",
    ],
    tech: ["React", "Express", "API Design"],
  },
  {
    role: "Full Stack Intern",
    company: "Twilight IT Solution",
    date: "Internship",
    items: [
      "Gained hands-on experience in full-stack development.",
      "Worked with HTML, CSS, JavaScript, PHP, MySQL, React.js, and MongoDB.",
    ],
    tech: ["PHP", "MySQL", "React"],
  },
];

const MARQUEE_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Three.js",
  "GSAP",
  "Tailwind",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Laravel",
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const rootRef = useRef<HTMLDivElement>(null);
  const velocity = useRef(0);
  const ctx = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    if (reduceMotion()) return;

    ctx.current = gsap.context(() => {
      // Mobile preloader is shorter (see Preloader), so sync the hero intro.
      const introDelay = isCoarse() ? 1.75 : 3.05;

      // ---------- SCROLL PROGRESS ----------
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.set(".scroll-progress", { scaleX: self.progress });
          velocity.current = self.getVelocity();
        },
      });

      // ---------- AURORA: PER-SECTION COLOR SCRUB ----------
      // Paints a fresh GSAP tween on every scroll tick, so restrict it to
      // desktop; phones keep the default gradient (and a fixed tween).
      const aurora = document.querySelector(".aurora");
      const auroraPalettes: Record<string, [string, string, string]> = {
        home: ["#60a5fa", "#a78bfa", "#f472b6"],
        skills: ["#a78bfa", "#38bdf8", "#fb923c"],
        projects: ["#60a5fa", "#818cf8", "#c084fc"],
        experience: ["#34d399", "#60a5fa", "#a78bfa"],
        about: ["#f472b6", "#a78bfa", "#60a5fa"],
      };
      const auroraSections = ["home", "skills", "projects", "experience", "about"]
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);

      const applyAurora = (id: string) => {
        const pal = auroraPalettes[id];
        if (!aurora || !pal) return;
        gsap.to(aurora, {
          "--au-a": pal[0],
          "--au-b": pal[1],
          "--au-c": pal[2],
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      // Only re-tint per section when a mouse is present — the layout reads
      // (getBoundingClientRect loop) inside onUpdate cost too much on touch.
      if (aurora && isFine()) {
        ScrollTrigger.create({
          start: 0,
          end: () => document.documentElement.scrollHeight - window.innerHeight,
          onUpdate: (self) => {
            if (reduceMotion()) return;
            const mid = self.scroll() + window.innerHeight * 0.5;
            let active: HTMLElement | null = auroraSections[0] || null;
            for (const s of auroraSections) {
              if (s.getBoundingClientRect().top + self.scroll() <= mid)
                active = s;
              else break;
            }
            if (active) applyAurora(active.id);
          },
        });
      }

      // ---------- HERO INTRO (SplitText) ----------
      let heroSplit: SplitText | null = null;
      heroSplit = new SplitText(".hero-name", {
        type: "chars",
        charsClass: "char-rise",
        wordsClass: "word-rise",
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(
          heroSplit.chars,
          { opacity: 0, duration: 1, stagger: 0.04, delay: introDelay },
          0
        )
        .from(
          ".hero-badge",
          { opacity: 0, y: 24, duration: 0.8 },
          "-=0.8"
        )
        .from(
          ".hero-subs",
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.6"
        )
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-socials",
          { opacity: 0, y: 16, duration: 0.6 },
          "-=0.45"
        )
        .from(
          ".hero-canvas-wrap",
          { opacity: 0, scale: 0.92, duration: 1.3 },
          "-=1"
        );

      // ---------- HERO PARALLAX OUT ----------
      // ---------- GENERIC REVEALS ----------
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // ---------- MARQUEE (velocity reactive) ----------
      const marqueeTween = gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 26,
        ease: "none",
      });

      const tick = () => {
        const boost = Math.min(Math.abs(velocity.current) / 1400, 3);
        gsap.to(marqueeTween, { timeScale: 1 + boost, duration: 0.6 });
      };
      // Velocity-reactive marquee is a mouse nicety; skip the extra ticker on
      // touch where nothing hovers.
      if (isFine()) gsap.ticker.add(tick);

      // ---------- SKILLS POP-IN ----------
      // `once: true` guarantees a chip, once revealed, is never hidden again.
      // On touch the 3D flip is pricey AND flaky, so it fades + rises instead.
      const skillTweenVars = isCoarse()
        ? {
            y: 24,
            opacity: 0,
            stagger: 0.03,
            duration: 0.5,
            ease: "power2.out" as const,
          }
        : {
            scale: 0.3,
            opacity: 0,
            rotateX: -60,
            stagger: 0.04,
            duration: 0.7,
            ease: "back.out(2)" as const,
          };
      gsap.from(".skill-chip", {
        ...skillTweenVars,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: "#skills",
          start: isCoarse() ? "top 85%" : "top 70%",
          once: true,
        },
      });

      // ---------- HERO PARALLAX OUT (all screen sizes) ----------
      gsap.to(".hero-content", {
        yPercent: -14,
        opacity: 0,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Desktop-only: the Developer.tsx card sits beside the headline on
      // large screens, so it can scroll away parallax-style. On small screens
      // it stacks below the fold and would be invisible by the time it enters
      // the viewport, so it must NOT fade out here.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        gsap.to(".hero-canvas-layer", {
          yPercent: 18,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // ---------- PARALLAX ORBS (desktop only) ----------
      if (isFine()) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "20");
          gsap.fromTo(
            el,
            { yPercent: speed },
            {
              yPercent: -speed,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") || el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });
      }

      // ---------- OTHER DESKTOP-ONLY SCROLL EFFECTS (md and up) ----------
      // Velocity shear and the pinned horizontal projects rail are disabled on
      // small screens AND touch devices where they feel janky.
      let shearTick: (() => void) | null = null;
      gsap.matchMedia().add(
        "(pointer: fine) and (min-width: 768px)",
        () => {
          // LIQUID SHEAR: headings tilt with scroll velocity.
          const shearTargets = gsap.utils.toArray<HTMLElement>(".shear-target");
          const shearSkewX = shearTargets.map((el) =>
            gsap.quickTo(el, "skewX", { duration: 0.55, ease: "power3.out" })
          );
          const shearSkewY = shearTargets.map((el) =>
            gsap.quickTo(el, "skewY", { duration: 0.55, ease: "power3.out" })
          );
          shearTick = () => {
            const shear = gsap.utils.clamp(-5, 5, velocity.current / 220);
            shearSkewX.forEach((q) => q(shear));
            shearSkewY.forEach((q) => q(shear * 0.22));
          };
          gsap.ticker.add(shearTick);

        // PROJECTS: PINNED HORIZONTAL
        const projectsSection = document.querySelector("#projects");
        const track = document.querySelector(".projects-track");
        if (projectsSection && track) {
          // The track sits inside a padded container (px-6 md:px-12); the
          // usable width is the container's content box, not the viewport.
          const container = (track as HTMLElement).parentElement as HTMLElement | null;
          const getDistance = () => {
            if (!container) return 0;
            const cs = getComputedStyle(container);
            const padL = parseFloat(cs.paddingLeft) || 0;
            const padR = parseFloat(cs.paddingRight) || 0;
            const contentW = container.clientWidth - padL - padR;
            return Math.max(0, (track as HTMLElement).scrollWidth - contentW);
          };

          // ONE ScrollTrigger owns the pin + horizontal scrub + progress bar.
          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: projectsSection,
              start: "top top",
              end: () => "+=" + getDistance(),
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                gsap.set(".proj-progress", { scaleX: self.progress });
              },
            },
          });

          // Cards drift for depth (separate non-pinned scrubs).
          gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
            const o = card.dataset.offset ? parseInt(card.dataset.offset) : 0;
            gsap.fromTo(
              card,
              { y: o * 0.4 },
              {
                y: o * -0.4,
                ease: "none",
                scrollTrigger: {
                  trigger: projectsSection,
                  start: "top top",
                  end: () => "+=" + getDistance(),
                  scrub: 1,
                },
              }
            );
          });
        }
      });

      // ---------- EXPERIENCE TIMELINE SCRUB ----------
      gsap.from(".exp-line", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((el) => {
        gsap.from(el, {
          x: -60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        const dot = el.querySelector(".exp-dot");
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.6,
            ease: "back.out(3)",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }
      });

      return () => {
        gsap.ticker.remove(tick);
        if (shearTick) gsap.ticker.remove(shearTick);
        heroSplit?.revert();
      };
    }, rootRef);

    // Correct pin-spacer measurements for the settled layout (StrictMode-safe).
    ScrollTrigger.refresh();

    return () => {
      ctx.current?.revert();
      ctx.current = null;
    };
  }, []);

  // Liquid glass sheen: track pointer over glass surfaces (rAF-throttled).
  useEffect(() => {
    const glasses = gsap.utils.toArray<HTMLElement>(".glass-sheen");
    let raf = 0;

    const update = (e: PointerEvent) => {
      raf = 0;
      for (const el of glasses) {
        if (!el.isConnected) continue;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!raf) raf = requestAnimationFrame(() => update(e));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ---------- ACTIVE TAB DETECTION (always on, independent of GSAP) ----------
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.toLowerCase()),
    ).filter((el): el is HTMLElement => !!el);

    const updateActive = () => {
      const mid = window.innerHeight * 0.5;
      let current = "home";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= mid) current = s.id;
        else break;
      }
      setActiveTab((prev) => (prev === current ? prev : current));
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ra-theme", next ? "dark" : "light");
  };

  const scrollToSection = (id: string) => {
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (target: string, opts?: object) => void };
      }
    ).lenis;
    if (lenis) {
      lenis.scrollTo("#" + id, { duration: 1.1 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={rootRef}
      className={`min-h-screen font-sans overflow-x-hidden bg-slate-100 text-slate-900 dark:bg-[#050507] dark:text-slate-100 transition-colors duration-500`}
    >
      <Preloader onComplete={() => undefined} />
      <CustomCursor />
      <div className="grain" />
      <div className="scroll-progress" />
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob-a" />
        <div className="aurora-blob aurora-blob-b" />
        <div className="aurora-blob aurora-blob-c" />
      </div>

      {/* ---------- NAV (floating glass capsule) ---------- */}
      <nav className="ra-nav fixed top-0 inset-x-0 z-50 px-4 pt-4">
        <div className="glass glass-sheen mx-auto flex w-full max-w-3xl h-16 items-center justify-between rounded-full px-5 md:px-7">
          <Magnetic>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="font-display text-2xl font-bold tracking-tight"
            >
              RA<span className="text-blue-600 dark:text-blue-400">.</span>
            </a>
          </Magnetic>

          <div className="hidden md:block">
            <Tabs value={activeTab} onValueChange={scrollToSection}>
              <TabsList tint={0}>
                {NAV_LINKS.map((item) => (
                  <TabsTrigger key={item} value={item.toLowerCase()}>
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            <Magnetic strength={0}>
              <GlassButton
                variant="icon"
                tint={0}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                <span className="hidden dark:inline" aria-hidden="true">
                  <Sun size={18} />
                </span>
                <span className="inline dark:hidden" aria-hidden="true">
                  <Moon size={18} />
                </span>
              </GlassButton>
            </Magnetic>
          </div>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col overflow-hidden pt-20 lg:flex-row lg:items-center lg:gap-12 lg:pb-20 lg:pl-6 lg:pr-10 xl:gap-16 xl:pl-16 xl:pr-20 xl:justify-center"
      >
        {/* ambient gradient glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-l from-transparent via-transparent to-slate-100 dark:to-[#050507]" />
          <div
            data-parallax="12"
            className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-violet-400/20 blur-[120px]"
          />
        </div>

        {/* Developer.tsx — liquid glass "Default Card". Stacks below the intro
            on smaller screens; sits in its own column on desktop so it never
            overlaps the text. */}
        <div className="hero-canvas-layer pointer-events-none relative order-2 z-10 lg:order-2 lg:shrink-0">
          <div className="hero-canvas-wrap mx-auto w-full px-6 pt-1 pb-16 sm:pt-4 lg:mx-0 lg:w-auto lg:px-0 lg:pt-0 lg:pb-0">
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <GlassCard tint={0} className="code-card relative">
                <GlassCardHeader className="mb-3 flex !flex-col items-start justify-between gap-3 sm:!flex-row sm:items-center sm:!gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-xl bg-white/10 text-blue-600 dark:text-blue-400">
                      <CodeXml size={16} />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <GlassCardTitle>Developer.tsx</GlassCardTitle>
                      <GlassCardDescription>
                        Full Stack Software Developer
                      </GlassCardDescription>
                    </div>
                  </div>
                  <span className="glass glass-clear glass-sheen inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    Open to work
                  </span>
                </GlassCardHeader>
                <GlassCardContent>
                  <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <code>
                      <span className="text-purple-500 dark:text-purple-400">const</span>{" "}
                      <span className="text-amber-500 dark:text-yellow-200">Riyas</span>{" "}
                      <span className="text-purple-500 dark:text-purple-400">=</span>{" "}
                      <span className="text-blue-500 dark:text-blue-400">{"{"}</span>
                      {"\n  "}
                      <span className="text-sky-600 dark:text-sky-300">role:</span>{" "}
                      <span className="text-emerald-600 dark:text-green-400">
                        &quot;Full Stack Dev&quot;
                      </span>
                      ,
                      {"\n  "}
                      <span className="text-sky-600 dark:text-sky-300">experience:</span>{" "}
                      <span className="text-emerald-600 dark:text-green-400">&quot;2+ years&quot;</span>,
                      {"\n  "}
                      <span className="text-sky-600 dark:text-sky-300">skills:</span>{" "}
                      <span className="text-blue-500 dark:text-blue-400">[</span>
                      {"\n    "}
                      <span className="text-emerald-600 dark:text-green-400">&quot;React&quot;</span>,{" "}
                      <span className="text-emerald-600 dark:text-green-400">&quot;Next.js&quot;</span>,
                      {"\n    "}
                      <span className="text-emerald-600 dark:text-green-400">&quot;Node&quot;</span>,{" "}
                      <span className="text-emerald-600 dark:text-green-400">&quot;SQL&quot;</span>
                      {"\n  "}
                      <span className="text-blue-500 dark:text-blue-400">]</span>
                      {"\n"}
                      <span className="text-blue-500 dark:text-blue-400">{"}"}</span>;
                    </code>
                  </pre>
                </GlassCardContent>
              </GlassCard>

              {/* status box — glass card */}
              <GlassCard tint={0} className="code-card-badge absolute -bottom-7 right-2 sm:-right-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-green-500/15 text-green-600 dark:text-green-400">
                    <CodeXml size={20} />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/55">
                      Status
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                      Open to Work
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* overlay content */}
        <div className="hero-content relative order-1 z-20 mx-auto w-full min-w-0 px-6 pt-16 md:pt-24 pb-6 flex flex-col justify-center lg:mx-0 lg:flex-1 lg:px-0 lg:pt-0 lg:pb-0 xl:flex-none xl:w-auto">
          <div className="max-w-2xl">
            <p className="hero-badge glass glass-sheen mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Available for work
            </p>

            <h1 className="hero-name shear-target font-display text-[11vw] leading-[0.95] font-bold tracking-tight whitespace-nowrap sm:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-slate-900 dark:text-white">
              RIYAS AHAMED
            </h1>

            <p className="hero-subs mt-6 text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300">
              Full Stack Software Developer
            </p>
            <p className="hero-subs mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
              I build scalable, full-stack applications with{" "}
              <strong className="text-slate-900 dark:text-white">
                React, Next.js, and Node.js
              </strong>{" "}
              that deliver exceptional user experiences — clean code, real
              performance.
            </p>

            <div className="hero-cta mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Magnetic strength={0} className="shrink-0">
                <GlassButton
                  variant="capsule"
                  tint={0}
                  onClick={() => scrollToSection("projects")}
                >
                  View my work <span aria-hidden>→</span>
                </GlassButton>
              </Magnetic>
              <Magnetic strength={0} className="shrink-0">
                <GlassButton
                  variant="capsule"
                  tint={0}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume <Download size={16} />
                </GlassButton>
              </Magnetic>
            </div>

            <div className="hero-socials mt-8 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <Magnetic key={s.label} strength={0}>
                  <GlassButton
                    variant="icon"
                    tint={0}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <s.icon size={18} />
                  </GlassButton>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        {/* scroll down cue (text only, no navigation) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 dark:text-slate-400 md:flex"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.35em]">
            Scroll Down
          </span>
          <ArrowDown size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="glass glass-clear glass-sheen relative z-20 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-12 pr-12 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-12 whitespace-nowrap">
              <span className="marquee-word font-display text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-violet-600 dark:from-sky-300 dark:via-blue-400 dark:to-violet-400">
                {item}
              </span>
              <span className="text-lg text-blue-500">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- SKILLS ---------- */}
      <section id="skills" className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div
            data-parallax="18"
            className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-blue-500/15 blur-[110px]"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center gap-5">
            <span className="section-index text-blue-600 dark:text-blue-400">
              (01)
            </span>
            <h2 className="shear-target font-display text-4xl md:text-6xl font-bold tracking-tight">
              <SplitReveal text="Skills & Technologies" mode="words" />
            </h2>
            <span className="h-px flex-1 bg-slate-900/10 dark:bg-white/10" />
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="reveal font-display text-lg font-semibold text-slate-700 dark:text-slate-300">
                Full Stack Engineering
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {FULLSTACK_SKILLS.map((s) => (
                  <SkillChip key={s.name} {...s} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="reveal font-display text-lg font-semibold text-slate-700 dark:text-slate-300">
                AI &amp; Machine Learning
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {AISKILLS.map((s) => (
                  <SkillChip key={s.name} {...s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROJECTS (PINNED HORIZONTAL) ---------- */}
      <section
        id="projects"
        className="relative h-screen overflow-hidden bg-white/40 dark:bg-white/[0.02] max-md:h-auto max-md:min-h-screen max-md:overflow-visible"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_70%)]" />
          <div
            data-parallax="14"
            className="absolute top-24 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-[100px]"
          />
        </div>

        <div className="projects-scroller flex h-screen flex-col justify-center overflow-visible px-6 md:px-12 max-md:h-auto max-md:min-h-screen max-md:overflow-x-auto max-md:py-6">
          <div className="mb-10 flex flex-wrap items-center gap-5">
            <span className="section-index text-blue-600 dark:text-blue-400">
              (02)
            </span>
            <h2 className="shear-target font-display text-4xl md:text-6xl font-bold tracking-tight">
              <SplitReveal text="Featured Projects" mode="words" />
            </h2>
            <span className="h-px flex-1 bg-slate-900/10 dark:bg-white/10" />
          </div>

          <div className="projects-track flex w-max items-stretch gap-6 md:gap-8 md:will-change-transform">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <span className="w-40 md:w-64 h-px bg-slate-900/10 dark:bg-white/10 overflow-hidden">
              <span className="proj-progress block h-px w-full bg-blue-500 origin-left scale-x-0 max-md:scale-x-100" />
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500">
              <span className="md:hidden">Swipe →</span>
              <span className="hidden md:inline">Keep scrolling →</span>
            </span>
          </div>
        </div>
      </section>

      {/* ---------- EXPERIENCE ---------- */}
      <section id="experience" className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div
            data-parallax="16"
            className="absolute bottom-1/4 -left-24 h-72 w-72 rounded-full bg-blue-400/10 blur-[100px]"
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-6">
          <div className="flex flex-wrap items-center gap-5">
            <span className="section-index text-blue-600 dark:text-blue-400">
              (03)
            </span>
            <h2 className="shear-target font-display text-4xl md:text-6xl font-bold tracking-tight">
              <SplitReveal text="Experience" mode="words" />
            </h2>
            <span className="h-px flex-1 bg-slate-900/10 dark:bg-white/10" />
          </div>

          <div className="relative mt-14 pl-8">
            <div className="exp-line absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-blue-500 to-transparent" />
            <div className="space-y-10">
              {EXPERIENCE.map((exp) => (
                <ExpItem key={exp.company + exp.date} {...exp} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT / CONTACT ---------- */}
      <section
        id="about"
        className="relative overflow-hidden border-t border-slate-900/5 dark:border-white/5 py-24 md:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            data-parallax="20"
            className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-96 w-[720px] rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-[120px]"
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="flex items-center justify-center gap-5 flex-wrap">
            <span className="h-px min-w-8 flex-1 bg-slate-900/10 dark:bg-white/10" />
            <span className="section-index text-blue-600 dark:text-blue-400">
              (04)
            </span>
            <h2 className="shear-target font-display text-4xl md:text-6xl font-bold tracking-tight">
              <SplitReveal text="The Developer" mode="words" />
            </h2>
            <span className="h-px min-w-8 flex-1 bg-slate-900/10 dark:bg-white/10" />
          </div>

          <p className="reveal mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            I&apos;m a passionate developer who started coding out of curiosity
            and turned it into a career. I love building things that work fast,
            look clean, and solve real problems. When I&apos;m not shipping
            code, I&apos;m exploring new AI tools or optimizing my workflow.
          </p>

          <SplitReveal
            text="“I architect secure, scalable solutions that serve thousands of users reliably.”"
            mode="words"
            stagger={0.04}
            className="mt-10 block font-display text-2xl md:text-3xl italic text-blue-700 dark:text-blue-300"
          />

<div className="reveal mt-12 flex flex-col items-center gap-6">
              <Magnetic strength={0} className="shrink-0">
                <GlassButton
                  variant="capsule"
                  tint={0}
                  href="mailto:riyasahamed82478@gmail.com"
                  className="px-4"
                >
                  Let&apos;s work together
                  <ExternalLink size={16} />
                </GlassButton>
              </Magnetic>

              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <Magnetic key={s.label} strength={0}>
                    <GlassButton
                      variant="icon"
                      tint={0}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                    >
                      <s.icon size={18} />
                    </GlassButton>
                  </Magnetic>
                ))}
              </div>

            </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- TYPES ---------- */

type Skill = {
  name: string;
  icon: IconType;
  color: string;
};

/* ---------- SUB COMPONENTS ---------- */

function SkillChip({ name, icon: Icon, color }: Skill) {
  return (
    <div className="skill-chip group transition-[box-shadow,filter] duration-300 hover:-translate-y-1 hover:drop-shadow-lg">
      <GlassSurface
        tint={0}
        radius={16}
        contentClassName="flex items-center gap-3 px-5 py-3.5"
      >
        <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
          <Icon color={color} size={26} />
        </span>
        <span className="relative z-10 text-sm font-medium text-slate-700 dark:text-slate-300">
          {name}
        </span>
      </GlassSurface>
    </div>
  );
}

function ProjectCard({
  title,
  desc,
  tags,
  image,
  links,
  offset,
}: {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  links: { label: string; href: string }[];
  offset: number;
}) {
  const fallback =
    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=80";

  return (
    <article
      data-offset={offset}
      className="project-card group relative flex w-[82vw] md:w-[30rem] shrink-0 flex-col overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* liquid-glass pane — shows through the card's transparent areas */}
      <GlassSurface
        tint={0}
        radius={24}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative flex flex-1 flex-col p-4 md:p-6">
        {/* crisp image window — no frost, the photo stays sharp */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            width={800}
            height={480}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallback;
            }}
            className="max-md:h-44 h-52 md:h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute top-4 left-4 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            0{PROJECTS.findIndex((p) => p.title === title) + 1}
          </span>
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <h3 className="font-display text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {desc}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="glass glass-sheen rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300 max-md:dark:bg-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          {links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-900/10 dark:border-white/10 pt-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-sheen inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 max-md:dark:bg-white/10"
                >
                  {link.label}
                  <ExternalLink size={13} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ExpItem({
  role,
  company,
  date,
  items,
  tech,
}: {
  role: string;
  company: string;
  date: string;
  items: string[];
  tech: string[];
}) {
  return (
    <div className="exp-item relative">
      <span className="exp-dot absolute -left-8 top-6 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-slate-100 dark:bg-[#050507]" />
      <GlassSurface
        tint={0}
        radius={24}
        contentClassName="p-6 transition-all"
        className="transition-all hover:-translate-y-0.5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h4 className="font-display text-lg font-bold">{role}</h4>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {company}
            </p>
          </div>
          <span className="glass glass-sheen rounded-full px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            {date}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
            >
              <span className="mt-1 text-blue-500">•</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="glass glass-sheen rounded-md px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300"
            >
              {t}
            </span>
          ))}
        </div>
      </GlassSurface>
    </div>
  );
}