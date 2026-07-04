"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function StickyPhone() {
  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/17579084102?text=Hi%20Home%20Fix%20Solution,%20I%20need%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounce"
      >
        <Image
          src="/whatsapp.svg"
          alt="WhatsApp"
          width={30}
          height={30}
          priority
        />
      </a>

      {/* Call Button */}
      <a
        href={site.phoneHref}
        aria-label="Call Now"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse"
      >
        <Phone size={26} />
      </a>
    </>
  );
}