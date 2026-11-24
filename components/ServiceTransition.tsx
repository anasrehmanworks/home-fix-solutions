"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";

export type ServiceFamily = "garage" | "duct" | "chimney" | "generic";

const TransitionContext = createContext<{ go: (href: string, family?: ServiceFamily) => void }>({
  go: () => {}
});

export function useServiceTransition() {
  return useContext(TransitionContext);
}

export function familyForCategory(category: string): ServiceFamily {
  if (category === "Garage Door") return "garage";
  if (category === "Air Duct Cleaning") return "duct";
  if (category === "Chimney Cleaning") return "chimney";
  return "generic";
}

function Overlay({ family, label }: { family: ServiceFamily; label: string }) {
  return (
    <div className="svc-overlay pointer-events-none fixed inset-0 z-[90] overflow-hidden bg-night" aria-hidden="true">
      {family === "garage" && (
        <>
          <div className="svc-panel-l absolute inset-y-0 left-0 w-1/2 border-r border-white/10 bg-coal" />
          <div className="svc-panel-r absolute inset-y-0 right-0 w-1/2 border-l border-white/10 bg-coal" />
          <div className="absolute inset-x-0 top-1/2 mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-brand-sky/70 to-transparent" />
        </>
      )}
      {family === "duct" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[3px] w-2/3 overflow-hidden rounded-full bg-white/5">
              <div
                className="svc-flow-line h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-brand-sky to-transparent"
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            </div>
          ))}
        </div>
      )}
      {family === "chimney" && (
        <div className="absolute inset-0">
          {[12, 28, 44, 58, 72, 86].map((left, i) => (
            <span
              key={left}
              className="svc-ember-dot absolute bottom-[18%] h-2 w-2 rounded-full bg-brand-gold"
              style={{ left: `${left}%`, animationDelay: `${i * 0.14}s` }}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-gold/15 to-transparent" />
        </div>
      )}
      {family === "generic" && (
        <div className="svc-wipe-bar absolute inset-y-0 w-full bg-gradient-to-r from-night via-brand-blue/50 to-night" />
      )}
      <p className="absolute inset-x-0 bottom-[16%] text-center font-heading text-sm font-black uppercase tracking-[0.3em] text-white/85">
        {label}
      </p>
    </div>
  );
}

export function ServiceTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState<{ family: ServiceFamily; label: string; key: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (href: string, family: ServiceFamily = "generic") => {
      const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Navigation happens FIRST, synchronously — the overlay can never strand the user.
      router.push(href);
      if (reduce) return;
      const label = href
        .split("/")
        .filter(Boolean)
        .pop()
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";
      setActive({ family, label, key: Date.now() });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(null), 1500);
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      {active && <Overlay key={active.key} family={active.family} label={active.label} />}
    </TransitionContext.Provider>
  );
}
