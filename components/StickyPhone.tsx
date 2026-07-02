import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function StickyPhone() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-5 py-3 text-sm font-black text-white shadow-2xl md:left-auto md:right-6 md:w-auto"
    >
      <Phone size={18} />
      Call Now: <span>{site.phone}</span>
    </a>
  );
}
