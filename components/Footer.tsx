import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

const serviceLinks = [
  { href: "/services/garage-door-repair", label: "Garage Door" },
  { href: "/services/air-duct-cleaning", label: "Air Duct Cleaning" },
  { href: "/services/chimney-cleaning", label: "Chimney Cleaning" },
  { href: "/services/plumbing", label: "Plumbing" },
  { href: "/services/electrician", label: "Electrician" },
  { href: "/services/locksmith", label: "Locksmith" },
  { href: "/services/roofing", label: "Roofing" },
  { href: "/services/hvac", label: "HVAC" }
];

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="section-shell py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src="/logo-transparent.svg"
                alt="Home Fix Solution"
                className="h-14 w-auto object-contain"
              />
              <div>
                <p className="font-heading text-base font-black leading-tight">Home Fix Solution</p>
                <p className="text-sm text-slate-400">Nationwide Home Service Network</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Professional home services across 30+ states — garage doors, air ducts, chimneys, plumbing, electrical, locksmith, roofing, and HVAC.
            </p>
          </div>

          {/* Essentials */}
          <div className="flex flex-col items-start gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-3 text-sm font-black text-white transition hover:bg-brand-deep"
            >
              <Phone size={17} />
              <span>{site.phone}</span>
            </a>
            <a
              href="mailto:sales@homefixsolution.org"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/20"
            >
              <Mail size={17} />
              <span>sales@homefixsolution.org</span>
            </a>
            <p className="inline-flex items-center gap-2 px-1 text-sm font-bold text-slate-300">
              <Clock size={16} className="text-brand-sky" /> Mon–Sat, 8 AM – 7 PM
            </p>
            <div className="flex items-center gap-4 px-1 pt-1">
              <a
                href="https://www.facebook.com/homefixsolution1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-300 transition hover:text-brand-sky"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/homefixsolution1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-300 transition hover:text-brand-sky"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Services — one quiet line */}
        <nav aria-label="Services" className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/[0.07] pt-6 text-[0.83rem] font-bold text-slate-400">
          {serviceLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-blue" />}
              <Link href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>

      <div aria-hidden="true" className="select-none overflow-hidden px-2 pb-2 pt-2">
        <p
          className="whitespace-nowrap text-center font-heading text-[7.2vw] font-black leading-[0.95] tracking-tight text-transparent"
          style={{ WebkitTextStroke: "1px rgba(127, 179, 236, 0.22)" }}
        >
          HOME FIX SOLUTION
        </p>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        &copy; 2026 Home Fix Solution. All Rights Reserved.
      </div>
    </footer>
  );
}
