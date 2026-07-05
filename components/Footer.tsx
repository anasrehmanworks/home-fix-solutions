import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Facebook, Instagram } from "lucide-react";;
import { site, statesServed } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src={site.logo}
              alt="Home Fix Solution"
              width={210}
              height={81}
              className="h-14 w-auto rounded-md bg-white object-contain p-1"
            />
            <div>
              <p className="text-sm text-slate-300">
                Garage Door, Air Duct, and Chimney Services
              </p>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Professional service across 30+ states for garage doors, air duct
            cleaning, and chimney care.
          </p>

          <a
            href={site.phoneHref}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-red px-4 py-3 text-sm font-black text-white"
          >
            <Phone size={17} />
            <span>{site.phone}</span>
          </a>
        </div>

        {/* Services */}
        <div>
          <h2 className="mb-4 text-sm font-black uppercase text-brand-gold">
            Services
          </h2>

          <ul className="grid gap-3 text-sm text-slate-300">
            <li>
              <Link href="/services/garage-door" className="hover:text-white">
                Garage Door
              </Link>
            </li>

            <li>
              <Link
                href="/services/air-duct-cleaning"
                className="hover:text-white"
              >
                Air Duct Cleaning
              </Link>
            </li>

            <li>
              <Link
                href="/services/chimney-cleaning"
                className="hover:text-white"
              >
                Chimney Cleaning
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="mb-4 text-sm font-black uppercase text-brand-gold">
            Company
          </h2>

          <ul className="grid gap-2 text-sm text-slate-300">
            <li>
              <Link href="/areas-we-serve" className="hover:text-white">
                Areas We Serve
              </Link>
            </li>

            <li>
              <Link href="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>

            <li>
              <Link href="/leave-a-review" className="hover:text-white">
                Leave a Review
              </Link>
            </li>

            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>

          <p className="mt-4 text-xs leading-5 text-slate-400">
            Service areas include {statesServed.slice(0, 4).join(", ")} and many
            more.
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="mb-4 text-sm font-black uppercase text-brand-gold">
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
              <Facebook size={34} className="text-blue-500"  />
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
        &copy; 2004 Home Fix Solution. All Rights Reserved.
      </div>
    </footer>
  );
}