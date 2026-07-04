import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/lib/site";

export function StickyPhone() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/17579084102?text=Hi%20Home%20Fix%20Solution,%20I%20need%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:w-44 hover:justify-start hover:px-5"
      >
        <FaWhatsapp size={28} />
        <span className="ml-3 hidden whitespace-nowrap text-sm font-semibold group-hover:block">
          WhatsApp
        </span>
      </a>

      {/* Phone */}
      <a
        href={site.phoneHref}
        className="group flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-brand-red text-white shadow-xl transition-all duration-300 hover:w-52 hover:justify-start hover:px-5"
      >
        <Phone size={24} />
        <span className="ml-3 hidden whitespace-nowrap text-sm font-semibold group-hover:block">
          Call Now
        </span>
      </a>
    </div>
  );
}