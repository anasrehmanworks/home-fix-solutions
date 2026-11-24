import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children
}: {
  crumbs: { href?: string; label: string }[];
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand-blue/25 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-brand-sky/15 blur-3xl" />
      <div className="section-shell relative py-14 lg:py-16">
        <Breadcrumbs dark items={crumbs} />
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow text-brand-ice">{eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-6xl">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-8 text-slate-300">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
