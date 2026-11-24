import Link from "next/link";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";
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

const companyLinks = [
  { href: "/coupons", label: "Coupons" },
  { href: "/results", label: "Results" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/areas-we-serve", label: "Areas We Serve" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/leave-a-review", label: "Leave a Review" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" }
];

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        {/* Logo & Contact */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img
              src="/logo-transparent.svg"
              alt="Home Fix Solution"
              className="h-16 w-auto object-contain"
            />
            <div>
              <p className="font-heading text-base font-black leading-tight">Home Fix Solution</p>
              <p className="text-sm text-slate-400">
                Nationwide Home Service Network
              </p>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Professional service across 30+ states for garage doors, air duct
            cleaning, chimney care, plumbing, electrical, locksmith, roofing,
            and HVAC requests.
          </p>

          {/* Phone */}
          <a
            href={site.phoneHref}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-3 text-sm font-black text-white transition hover:bg-brand-deep"
          >
            <Phone size={17} />
            <span>{site.phone}</span>
          </a>

          {/* Email */}
          <a
            href="mailto:sales@homefixsolution.org"
            className="ml-3 mt-3 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/20"
          >
            <Mail size={17} />
            <span>sales@homefixsolution.org</span>
          </a>
        </div>

        {/* Services */}
        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-wider text-brand-ice">
            Services
          </h2>

          <ul className="grid gap-3 text-sm text-slate-300">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-wider text-brand-ice">
            Company
          </h2>

          <ul className="grid gap-2 text-sm text-slate-300">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-wider text-brand-ice">
            Follow Us
          </h2>

          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/homefixsolution1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition duration-200 hover:brightness-125"
            >
              <Facebook size={34} className="text-blue-500" />
            </a>

            <a
              href="https://www.instagram.com/homefixsolution1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition duration-200 hover:brightness-125"
            >
              <Instagram size={34} className="text-pink-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        &copy; 2026 Home Fix Solution. All Rights Reserved.
      </div>
    </footer>
  );
}
