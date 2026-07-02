import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { getServicesByCategory, site, statesServed } from "@/lib/site";

export function Footer() {
  const garage = getServicesByCategory("Garage Door").slice(0, 6);
  const other = [...getServicesByCategory("Air Duct Cleaning").slice(0, 3), ...getServicesByCategory("Chimney Cleaning").slice(0, 3)];

  return (
    <footer className="bg-ink text-white">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src={site.logo} alt="Home Fix Solution" width={210} height={81} className="h-14 w-auto rounded-md bg-white object-contain p-1" />
            <div>
              <p className="text-sm text-slate-300">Garage Door, Air Duct, and Chimney Services</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Professional service across 30+ states for garage doors, air duct cleaning, and chimney care.
          </p>
          <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-red px-4 py-3 text-sm font-black text-white">
            <Phone size={17} />
            <span>{site.phone}</span>
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-black uppercase text-brand-gold">Garage Door</h2>
          <ul className="grid gap-2 text-sm text-slate-300">
            {garage.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-black uppercase text-brand-gold">More Services</h2>
          <ul className="grid gap-2 text-sm text-slate-300">
            {other.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-black uppercase text-brand-gold">Company</h2>
          <ul className="grid gap-2 text-sm text-slate-300">
            <li><Link href="/areas-we-serve" className="hover:text-white">Areas We Serve</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/leave-a-review" className="hover:text-white">Leave a Review</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            Service areas include {statesServed.slice(0, 4).join(", ")} and many more.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        &copy; 2004 Home Fix Solution. All Rights Reserved.
      </div>
    </footer>
  );
}

