"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/ServiceTransition";
import type { SceneKey } from "@/lib/scenes";

export type RackItem = {
  title: string;
  href: string;
  image: string;
  blurb: string;
  chips: string[];
  scene: SceneKey;
  category: string;
  serviceTitle: string;
};

export function ServiceRack({ items }: { items: RackItem[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  function select(i: number) {
    setActive(i);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 12000);
  }

  function book(item: RackItem) {
    window.dispatchEvent(
      new CustomEvent("hfs:book", { detail: { category: item.category, service: item.serviceTitle } })
    );
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const current = items[active];

  return (
    <div
      className="grid items-start gap-6 lg:grid-cols-[340px_1fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-2">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => select(i)}
            aria-pressed={i === active}
            className={`flex items-center gap-3.5 rounded-xl border-[1.5px] px-4 py-3.5 text-left transition-all duration-300 lg:w-full ${
              i === active
                ? "border-charcoal bg-charcoal text-white shadow-lift lg:translate-x-1"
                : "border-slate-200 bg-white text-ink hover:border-slate-400 lg:hover:translate-x-1"
            }`}
          >
            <span className={`hidden w-6 shrink-0 font-heading text-[0.8rem] font-black lg:block ${i === active ? "text-brand-sky" : "text-slate-400"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-heading text-[0.95rem] font-extrabold">{item.title}</span>
            <ArrowRight size={16} className={`shrink-0 transition-all ${i === active ? "translate-x-0 text-brand-sky opacity-100" : "-translate-x-1 opacity-0"}`} />
          </button>
        ))}
      </div>

      <div className="relative min-h-[520px] overflow-hidden rounded-3xl bg-night text-white shadow-lift">
        {items.map((item, i) => (
          <Image
            key={item.title}
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className={`object-cover transition-all duration-[1200ms] ${i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/45 to-night/10" />
        <div key={active} className="rack-in absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <h3 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-black">{current.title}</h3>
          <p className="mt-2 max-w-xl leading-7 text-slate-200">{current.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {current.chips.map((chip) => (
              <span key={chip} className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.8rem] font-bold backdrop-blur">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => book(current)}
              className="btn-primary px-6 py-3 text-[0.95rem]"
            >
              Book {current.title}
            </button>
            <TransitionLink
              href={current.href}
              scene={current.scene}
              className="inline-flex items-center gap-1.5 border-b-2 border-brand-blue pb-0.5 font-heading text-[0.92rem] font-extrabold text-white transition hover:text-brand-sky"
            >
              View service page <ArrowUpRight size={16} />
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
