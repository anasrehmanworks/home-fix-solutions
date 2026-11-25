"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarClock, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function StickyPhone() {
  return (
    <>
      {/* Floating labelled pills (v3.1) — hidden on small screens, where the sticky bar takes over */}
      <div className="fixed bottom-[18px] right-[18px] z-[90] hidden flex-col items-end gap-2.5 min-[861px]:flex">
        <a
          id="track-whatsapp"
          href="https://wa.me/17579084102?text=Hi%20Home%20Fix%20Solution,%20I%20need%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="inline-flex min-h-[50px] items-center gap-2.5 rounded-full border border-[#3a3e45] bg-charcoal px-5 py-3 font-heading text-[0.9rem] font-extrabold text-white shadow-lift transition duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
        >
          <Image src="/whatsapp.svg" alt="" width={21} height={21} priority />
          WhatsApp
        </a>
        <a
          id="track-phone"
          href={site.phoneHref}
          aria-label="Call Now"
          className="inline-flex min-h-[50px] items-center gap-2.5 rounded-full bg-brand-blue px-5 py-3 font-heading text-[0.9rem] font-extrabold text-white shadow-lift transition duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-brand-deep"
        >
          <Phone size={20} />
          Call Now
        </a>
      </div>

      {/* Sticky mobile Call / Book bar (v3.1) */}
      <div className="fixed inset-x-0 bottom-0 z-[70] flex gap-2.5 border-t border-white/10 bg-night/95 px-3.5 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_28px_-14px_rgba(10,10,11,0.35)] backdrop-blur-md min-[861px]:hidden">
        <a
          href={site.phoneHref}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[11px] border-[1.5px] border-white/15 bg-smoke font-heading text-[0.92rem] font-extrabold text-white"
        >
          <Phone size={16} /> Call Now
        </a>
        <Link
          href="/contact#book"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[11px] bg-brand-blue font-heading text-[0.92rem] font-extrabold text-white shadow-[0_10px_20px_-10px_rgba(0,80,160,0.55)]"
        >
          <CalendarClock size={16} /> Book Service
        </Link>
      </div>
      {/* spacer so the mobile bar never covers footer content */}
      <div className="h-[68px] min-[861px]:hidden" aria-hidden="true" />
    </>
  );
}
