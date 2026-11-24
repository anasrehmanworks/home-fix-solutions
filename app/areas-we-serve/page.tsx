import Link from "next/link";
import { MapPin } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { createMetadata, localBusinessSchema, site, statesServed } from "@/lib/site";

export const metadata = createMetadata({
  title: "Areas We Serve",
  description:
    "Home Fix Solution proudly serves garage door, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, and HVAC customers across 30+ states.",
  path: "/areas-we-serve"
});

export default function AreasWeServePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/areas-we-serve")} />

      <PageHero
        crumbs={[{ label: "Areas We Serve" }]}
        eyebrow="State-Level Service Areas"
        title="Areas We Serve"
        intro="Home Fix Solution proudly serves customers across 30+ states for garage door services, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, and HVAC requests. Explore our current service footprint below and access available local service pages where applicable."
      >
        <a href={site.phoneHref} className="btn-primary mt-8">
          Call <span>{site.phone}</span>
        </a>
      </PageHero>

      <section className="bg-white py-16">
        <div className="section-shell">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {statesServed.map((state) =>
              state === "North Carolina" ? (
                <Link
                  key={state}
                  href="/areas-we-serve/charlotte/garage-door-repair"
                  className="flex items-center gap-3 rounded-xl border border-brand-blue/40 bg-brand-pale p-4 font-bold transition hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-crisp"
                >
                  <MapPin className="text-brand-blue" size={20} />
                  <span>{state}</span>
                  <span className="ml-auto rounded-full bg-brand-blue px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-white">
                    Charlotte page
                  </span>
                </Link>
              ) : (
                <div
                  key={state}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 font-bold"
                >
                  <MapPin className="text-brand-blue" size={20} />
                  {state}
                </div>
              )
            )}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-night p-7 text-white md:p-9">
            <p className="eyebrow text-brand-ice">
              Charlotte, North Carolina
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold">
              Garage Door Repair in Charlotte
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
              Home Fix Solution provides professional garage door repair
              services for residential and commercial properties in Charlotte,
              NC. Explore our dedicated service page for more information,
              service details, FAQs, and booking options.
            </p>

            <Link
              href="/areas-we-serve/charlotte/garage-door-repair"
              className="btn-primary mt-6 inline-flex"
            >
              View Charlotte Garage Door Repair
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
