import Link from "next/link";
import { Phone } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCards } from "@/components/ServiceCards";
import { createMetadata, getService, localBusinessSchema, primaryServices, site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Our Services | Home Fix Solution",
  description:
    "Explore Home Fix Solution services: garage door, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, HVAC, dryer vent cleaning, and appliance repair across 30+ states.",
  path: "/services"
});

const dryerVent = getService("dryer-vent-cleaning");

const services = [
  ...primaryServices.map((service) => ({
    title: service.title,
    slug: service.slug,
    image: service.image,
    description: service.description,
    category: service.title
  })),
  {
    title: "Dryer Vent Cleaning",
    slug: "dryer-vent-cleaning",
    image: "/site-images/dryer-vent-cleaning.jpg",
    description: dryerVent?.summary ?? "Dryer vent cleaning that helps improve drying performance and reduce lint restrictions.",
    category: "Air Duct Cleaning"
  },
  {
    title: "Appliance Repair",
    slug: "appliance-repair",
    image: "/site-images/clear-service-options.jpg",
    description: "Household appliance repair requests for homes across our service areas.",
    category: "Appliance Repair"
  }
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/services")} />
      <section className="relative overflow-hidden bg-night pb-20 pt-36 text-white">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-sky/15 blur-3xl" />
        <div className="section-shell relative max-w-3xl">
          <p className="eyebrow text-brand-ice">Our Services</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-6xl">
            Every Service, One Trusted Team
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Choose a service to open its dedicated page — with what&apos;s included, signs it&apos;s time to schedule, answers to common questions, and booking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn-primary">
              <Phone size={17} /> Call {site.phone}
            </a>
            <Link href="/contact#book" className="btn-ghost-light">Book Now</Link>
          </div>
        </div>
      </section>

      <section className="bg-coal py-20">
        <div className="section-shell">
          <ServiceCards items={services} />
        </div>
      </section>
    </>
  );
}
