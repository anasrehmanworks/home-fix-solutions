"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function StickyPhone() {
  return (
    <>
      {/* WhatsApp Button */}
      <a
        id="track-whatsapp"
        href="https://wa.me/17579084102?text=Hi%20Home%20Fix%20Solution,%20I%20need%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-coal shadow-lift transition-all duration-300 hover:scale-105 hover:border-brand-sky/60"
      >
        <Image
          src="/whatsapp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
          priority
        />
      </a>

      {/* Call Button */}
      <a
        id="track-phone"
        href={site.phoneHref}
        aria-label="Call Now"
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lift transition-all duration-300 hover:scale-105 hover:bg-brand-deep"
      >
        <Phone size={25} />
      </a>
    </>
  );
}
