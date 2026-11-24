"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { getServicesByCategory, serviceCategories, site } from "@/lib/site";

const nav = [
  { href: "/areas-we-serve", label: "Areas We Serve" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/95 shadow-lift backdrop-blur">
      <div className="section-shell flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Home Fix Solution home">
          <Image
            src="/logo-transparent.png"
            alt="Home Fix Solution"
            width={719}
            height={791}
            priority
            className="h-14 w-auto object-contain"
          />
          <span className="hidden flex-col leading-tight min-[420px]:flex">
            <span className="font-heading text-lg font-black tracking-tight text-white">
              Home Fix Solution
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-ice">
              Home Service Specialists
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-bold text-slate-200 lg:flex">
          <Link href="/" className="rounded-md px-1 py-2 transition hover:text-white">
            Home
          </Link>
          <div className="group relative">
            <button type="button" className="inline-flex items-center gap-1 rounded-md px-1 py-7 transition hover:text-white" aria-haspopup="true" suppressHydrationWarning>
              Services <ChevronDown size={16} />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 rounded-xl border border-white/10 bg-smoke p-3 opacity-0 shadow-lift transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {serviceCategories.map((category) => (
                <div key={category} className="group/category relative">
                  <Link
                    href={`/services/${getServicesByCategory(category)[0].slug}`}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-black text-white transition hover:bg-white/10 group-hover/category:bg-white/10"
                  >
                    <span className="whitespace-nowrap">{category}</span>
                    <ChevronDown size={16} className="-rotate-90 text-brand-ice" />
                  </Link>
                  <div className="invisible absolute left-full top-0 grid w-[380px] gap-1 rounded-xl border border-white/10 bg-smoke p-3 opacity-0 shadow-lift transition before:absolute before:-left-4 before:top-0 before:h-full before:w-4 before:content-[''] group-hover/category:visible group-hover/category:translate-x-3 group-hover/category:opacity-100">
                    {getServicesByCategory(category).map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="rounded-lg px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
                      >
                        <span className="whitespace-nowrap">{service.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-1 py-2 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={site.phoneHref} className="btn-ghost-light px-5 py-3">
            <Phone size={17} />
            <span>{site.phone}</span>
          </a>
          <Link href="/contact#book" className="btn-primary px-5 py-3">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          suppressHydrationWarning
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-night lg:hidden">
          <nav className="section-shell grid gap-1 py-4 text-sm font-bold text-slate-200">
            <Link href="/" className="rounded-lg px-2 py-3 hover:bg-white/10" onClick={() => setOpen(false)}>
              Home
            </Link>
            <details className="rounded-lg px-2 py-3">
              <summary className="cursor-pointer text-white">Services</summary>
              <div className="mt-3 grid gap-4">
                {serviceCategories.map((category) => (
                  <div key={category}>
                    <Link href={`/services/${getServicesByCategory(category)[0].slug}`} className="font-black text-brand-ice" onClick={() => setOpen(false)}>
                      {category}
                    </Link>
                    <div className="mt-2 grid gap-1">
                      {getServicesByCategory(category).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="rounded-lg px-2 py-2 text-slate-300 hover:bg-white/10"
                          onClick={() => setOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-2 py-3 hover:bg-white/10" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-ghost-light mt-2">
              <Phone size={17} />
              <span>{site.phone}</span>
            </a>
            <Link href="/contact#book" className="btn-primary" onClick={() => setOpen(false)}>
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
