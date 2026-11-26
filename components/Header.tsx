"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getServicesByCategory, serviceCategories, site } from "@/lib/site";
import { TransitionLink } from "@/components/ServiceTransition";

const nav = [
  { href: "/coupons", label: "Coupons" },
  { href: "/results", label: "Results" },
  { href: "/reviews", label: "Reviews" },
  { href: "/areas-we-serve", label: "Areas We Serve" },
  { href: "/faq", label: "FAQ" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* legibility gradient over the hero (fades out once the glass bar takes over) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-night/80 via-night/35 to-transparent transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`}
      />
      {/* glass bar on scroll / when the mobile menu is open */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b transition-all duration-500 ${solid ? "border-white/[0.06] bg-night/85 shadow-lift backdrop-blur-xl" : "border-transparent bg-transparent"}`}
      />

      <div className={`relative flex w-full items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8 lg:px-12 ${solid ? "h-16" : "h-20"}`}>
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Home Fix Solution home">
          <img
            src="/logo-transparent.svg"
            alt="Home Fix Solution"
            className={`w-auto object-contain transition-all duration-500 ${solid ? "h-10" : "h-12"}`}
          />
          <span className="hidden flex-col leading-tight min-[480px]:flex">
            <span className="font-heading text-[1.05rem] font-black tracking-tight text-white">
              Home Fix Solution
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-ice">
              Home Service Specialists
            </span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 text-[13.5px] font-bold text-slate-200 xl:flex" aria-label="Primary">
          <Link href="/" className="whitespace-nowrap rounded-md px-3 py-2 transition hover:text-white">
            Home
          </Link>
          <div className="group relative">
            <button type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 transition hover:text-white" aria-haspopup="true" suppressHydrationWarning>
              Services <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-2 rounded-xl border border-white/10 bg-smoke p-3 opacity-0 shadow-lift transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {serviceCategories.map((category) => (
                <div key={category} className="group/category relative">
                  <TransitionLink
                    href={`/services/${getServicesByCategory(category)[0].slug}`}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-black text-white transition hover:bg-white/10 group-hover/category:bg-white/10"
                  >
                    <span className="whitespace-nowrap">{category}</span>
                    <ChevronDown size={16} className="-rotate-90 text-brand-ice" />
                  </TransitionLink>
                  <div className="invisible absolute left-full top-0 grid w-[380px] gap-1 rounded-xl border border-white/10 bg-smoke p-3 opacity-0 shadow-lift transition before:absolute before:-left-4 before:top-0 before:h-full before:w-4 before:content-[''] group-hover/category:visible group-hover/category:translate-x-3 group-hover/category:opacity-100">
                    {getServicesByCategory(category).map((service) => (
                      <TransitionLink
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
                      >
                        <span className="whitespace-nowrap">{service.title}</span>
                      </TransitionLink>
                    ))}
                  </div>
                </div>
              ))}
              <TransitionLink
                href="/services/appliance-repair"
                className="flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-black text-white transition hover:bg-white/10"
              >
                <span className="whitespace-nowrap">Appliance Repair</span>
              </TransitionLink>
            </div>
          </div>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md px-3 py-2 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <a href={site.phoneHref} className="btn-ghost-light hidden px-4 py-2.5 lg:inline-flex">
            <Phone size={16} />
            <span>{site.phone}</span>
          </a>
          <Link href="/contact#book" className="btn-primary px-4 py-2.5">
            Book Now
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 text-white xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            suppressHydrationWarning
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="relative max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.06] xl:hidden">
          <nav className="grid gap-1 px-5 py-4 text-sm font-bold text-slate-200 sm:px-8" aria-label="Mobile">
            <Link href="/" className="rounded-lg px-2 py-3 hover:bg-white/10" onClick={() => setOpen(false)}>
              Home
            </Link>
            <details className="rounded-lg px-2 py-3">
              <summary className="cursor-pointer text-white">Services</summary>
              <div className="mt-3 grid gap-4">
                {serviceCategories.map((category) => (
                  <div key={category}>
                    <TransitionLink href={`/services/${getServicesByCategory(category)[0].slug}`} className="font-black text-brand-ice" onClick={() => setOpen(false)}>
                      {category}
                    </TransitionLink>
                    <div className="mt-2 grid gap-1">
                      {getServicesByCategory(category).map((service) => (
                        <TransitionLink
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block rounded-lg px-2 py-2 text-slate-300 hover:bg-white/10"
                          onClick={() => setOpen(false)}
                        >
                          {service.title}
                        </TransitionLink>
                      ))}
                    </div>
                  </div>
                ))}
                <TransitionLink href="/services/appliance-repair" className="font-black text-brand-ice" onClick={() => setOpen(false)}>
                  Appliance Repair
                </TransitionLink>
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
