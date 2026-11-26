"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

import { sceneForHref } from "@/lib/scenes";
import type { SceneKey } from "@/lib/scenes";
export { sceneForSlug, sceneForHref } from "@/lib/scenes";
export type { SceneKey } from "@/lib/scenes";

function Scene({ scene }: { scene: SceneKey }) {
  switch (scene) {
    case "garage":
      return (
        <div className="scene sc-garage">
          <div className="panel" /><div className="panel" /><div className="panel" /><div className="panel" /><div className="panel" />
          <div className="glowline" />
        </div>
      );
    case "duct":
    case "dryer":
      return (
        <div className="scene">
          <div className="duct-frame" />
          {[30, 50, 70].map((top, i) => (
            <div key={top} className="stream" style={{ top: `${top}%`, animationDelay: `${i * 0.18}s` }} />
          ))}
          {scene === "dryer" &&
            [18, 34, 52, 68, 82].map((left, i) => (
              <span key={left} className="lint" style={{ left: `${left}%`, top: "58%", animationDelay: `${i * 0.16}s` }} />
            ))}
        </div>
      );
    case "hvac":
      return (
        <div className="scene">
          <div className="fan" />
          {[26, 74].map((top, i) => (
            <div key={top} className="stream" style={{ top: `${top}%`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      );
    case "chimney":
      return (
        <div className="scene">
          <div className="fireglow" />
          {[16, 30, 44, 57, 70, 84].map((left, i) => (
            <span key={left} className="ember" style={{ left: `${left}%`, animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      );
    case "roof":
      return (
        <div className="scene">
          <div className="house" />
          <div className="roofline" />
          {[22, 38, 54, 70].map((left, i) => (
            <span key={left} className="shingle" style={{ left: `${left}%`, bottom: "62%", width: 34, animationDelay: `${0.3 + i * 0.14}s` }} />
          ))}
        </div>
      );
    case "plumbing":
      return (
        <div className="scene">
          <div className="pipe"><div className="water" /></div>
          {[30, 52, 74].map((left, i) => (
            <span key={left} className="drop2" style={{ left: `${left}%`, animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
      );
    case "electric":
      return (
        <div className="scene">
          <svg className="circuit" viewBox="0 0 420 220" style={{ position: "absolute", inset: 0 }}>
            <path d="M20 180 H150 V110 H270 V60 H400" />
            <path d="M20 200 H110 V140 H330 V90 H400" opacity="0.6" />
          </svg>
          <div className="bulb" />
        </div>
      );
    case "lock":
      return (
        <div className="scene">
          <div className="shackle" />
          <div className="lockbody" />
        </div>
      );
    case "appliance":
      return (
        <div className="scene">
          <div className="appl">
            <div className="appl-light" />
            <div className="door" />
          </div>
        </div>
      );
    default:
      return (
        <div className="scene">
          <div className="svc-wipe-bar absolute inset-y-0 w-full bg-gradient-to-r from-night via-brand-blue/50 to-night" />
        </div>
      );
  }
}

const TransitionContext = createContext<{ go: (href: string, scene?: SceneKey) => void }>({
  go: () => {}
});

export function useServiceTransition() {
  return useContext(TransitionContext);
}

export function ServiceTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState<{ scene: SceneKey; label: string; key: number; duration: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const end = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setActive(null);
  }, []);

  const go = useCallback(
    (href: string, scene?: SceneKey) => {
      const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Navigation happens FIRST, synchronously — the overlay can never strand the user.
      router.push(href);
      if (reduce) return;
      const sceneKey = scene ?? sceneForHref(href);
      let seen: string[] = [];
      try {
        seen = JSON.parse(sessionStorage.getItem("hfs-scenes") ?? "[]") as string[];
      } catch {
        seen = [];
      }
      const firstTime = !seen.includes(sceneKey);
      if (firstTime) {
        try {
          sessionStorage.setItem("hfs-scenes", JSON.stringify([...seen, sceneKey]));
        } catch {
          /* session storage unavailable */
        }
      }
      const duration = firstTime ? 1400 : 650;
      const label =
        href.split("/").filter(Boolean).pop()?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";
      setActive({ scene: sceneKey, label, key: Date.now(), duration });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(null), duration + 500);
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      {active && (
        <div
          key={active.key}
          className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center gap-[22px] overflow-hidden bg-night text-white"
          style={{ animation: `svc-fadeout 0.45s ease ${active.duration}ms forwards` }}
          onClick={end}
          role="presentation"
          aria-hidden="true"
        >
          <Scene scene={active.scene} />
          <p className="px-5 text-center font-heading text-[clamp(1.5rem,4vw,2.4rem)] font-black leading-tight tracking-tight">
            {active.label}
          </p>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-sky">Home Fix Solution</p>
          <p className="absolute bottom-[26px] text-[0.8rem] font-bold text-slate-400">Tap anywhere to skip</p>
        </div>
      )}
    </TransitionContext.Provider>
  );
}

/** A link that plays the service's cinematic transition (navigation first). */
export function TransitionLink({
  href,
  scene,
  className,
  children,
  onClick
}: {
  href: string;
  scene?: SceneKey;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { go } = useServiceTransition();
  function handle(e: MouseEvent) {
    e.preventDefault();
    onClick?.();
    go(href, scene);
  }
  return (
    <Link href={href} className={className} onClick={handle}>
      {children}
    </Link>
  );
}
