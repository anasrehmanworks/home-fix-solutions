"use client";

import Image from "next/image";
import { ArrowRight, Wrench } from "lucide-react";
import { useServiceTransition } from "@/components/ServiceTransition";
import { sceneForSlug } from "@/lib/scenes";

export type ServiceCardItem = {
  title: string;
  slug: string;
  image: string;
  description: string;
  category: string;
};

export function ServiceCards({ items, dark = false }: { items: ServiceCardItem[]; dark?: boolean }) {
  const { go } = useServiceTransition();

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((service) => (
        <button
          key={service.slug}
          type="button"
          onClick={() => go(`/services/${service.slug}`, sceneForSlug(service.slug))}
          className={`group overflow-hidden rounded-2xl border text-left shadow-sm transition duration-300 hover:-translate-y-1 ${
            dark
              ? "border-white/10 bg-smoke text-white hover:shadow-glow"
              : "border-slate-200 bg-white hover:shadow-crisp"
          }`}
          aria-label={`Open ${service.title} page`}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={service.image}
              alt={`${service.title} service`}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue text-white shadow-crisp">
              <Wrench size={19} />
            </span>
          </div>
          <div className="p-5">
            <h3 className="flex items-center justify-between gap-2 text-xl font-black">
              {service.title}
              <ArrowRight size={18} className="shrink-0 text-brand-blue transition duration-300 group-hover:translate-x-1" />
            </h3>
            <p className={`mt-2 text-sm leading-6 ${dark ? "text-slate-300" : "text-slate-600"}`}>
              {service.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
