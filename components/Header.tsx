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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/98 shadow-crisp backdrop-blur">
      <div className="section-shell flex min-h-24 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Home Fix Solution home">
          <Image src={site.logo} alt="Home Fix Solution" width={270} height={105} priority className="h-16 w-auto object-contain sm:h-[72px]" />
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-black text-slate-700 lg:flex">
          <Link href="/" className="rounded-md px-1 py-2 hover:text-brand-blue">
            Home
          </Link>
          <div className="group relative">
            <button type="button" className="inline-flex items-center gap-1 rounded-md px-1 py-9 hover:text-brand-blue" aria-haspopup="true" suppressHydrationWarning>
              Services <ChevronDown size={16} />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 rounded-md border border-slate-200 bg-white p-3 opacity-0 shadow-crisp transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {serviceCategories.map((category) => (
                <div key={category} className="group/category relative">
                  <Link
                    href={`/services/${getServicesByCategory(category)[0].slug}`}
                    className="flex items-center justify-between rounded-md px-4 py-3 text-base font-black text-ink hover:bg-brand-pale hover:text-brand-blue group-hover/category:bg-brand-pale group-hover/category:text-brand-blue"
                  >
                    <span className="whitespace-nowrap">{category}</span>
                    <ChevronDown size={16} className="-rotate-90" />
                  </Link>
                  <div className="invisible absolute left-full top-0 grid w-[380px] gap-1 rounded-md border border-slate-200 bg-white p-3 opacity-0 shadow-crisp transition before:absolute before:-left-4 before:top-0 before:h-full before:w-4 before:content-[''] group-hover/category:visible group-hover/category:translate-x-3 group-hover/category:opacity-100">
                    {getServicesByCategory(category).map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="rounded-md px-3 py-2 text-sm font-bold text-slate-700 hover:bg-brand-pale hover:text-brand-blue"
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
            <Link key={item.href} href={item.href} className="rounded-md px-1 py-2 hover:text-brand-blue">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={site.phoneHref} className="btn-outline px-5 py-3">
            <Phone size={17} />
            <span>{site.phone}</span>
          </a>
          <Link href="/contact#book" className="btn-primary px-5 py-3">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-slate-300 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          suppressHydrationWarning
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="section-shell grid gap-1 py-4 text-sm font-bold text-slate-700">
            <Link href="/" className="rounded-md px-2 py-3 hover:bg-brand-pale" onClick={() => setOpen(false)}>
              Home
            </Link>
            <details className="rounded-md px-2 py-3">
              <summary className="cursor-pointer text-ink">Services</summary>
              <div className="mt-3 grid gap-4">
                {serviceCategories.map((category) => (
                  <div key={category}>
                    <Link href={`/services/${getServicesByCategory(category)[0].slug}`} className="font-black text-brand-blue" onClick={() => setOpen(false)}>
                      {category}
                    </Link>
                    <div className="mt-2 grid gap-1">
                      {getServicesByCategory(category).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="rounded-md px-2 py-2 text-slate-700 hover:bg-brand-pale"
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
              <Link key={item.href} href={item.href} className="rounded-md px-2 py-3 hover:bg-brand-pale" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-outline mt-2">
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
