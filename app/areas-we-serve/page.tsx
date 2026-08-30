import Link from "next/link";
import { MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata, localBusinessSchema, site, statesServed } from "@/lib/site";

export const metadata = createMetadata({
  title: "Areas We Serve",
  description:
    "Home Fix Solution proudly serves garage door, air duct cleaning, and chimney cleaning customers across 30+ states.",
  path: "/areas-we-serve"
});

export default function AreasWeServePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/areas-we-serve")} />

      <section className="bg-brand-pale py-10">
        <div className="section-shell">
          <Breadcrumbs items={[{ label: "Areas We Serve" }]} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell">
          <p className="text-sm font-black uppercase text-brand-red">
            State-Level Service Areas
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Areas We Serve
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Home Fix Solution proudly serves customers across 30+ states for
            garage door services, air duct cleaning, and chimney cleaning.
            Explore our current service footprint below and access available
            local service pages where applicable.
          </p>

          <a href={site.phoneHref} className="btn-primary mt-7">
            Call <span>{site.phone}</span>
          </a>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {statesServed.map((state) =>
              state === "North Carolina" ? (
                <Link
                  key={state}
                  href="/areas-we-serve/charlotte/garage-door-repair"
                  className="flex items-center gap-3 rounded-md border border-slate-200 p-4 font-bold transition hover:border-brand-blue hover:text-brand-blue"
                >
                  <MapPin className="text-brand-blue" size={20} />
                  <span>{state}</span>
                </Link>
              ) : (
                <div
                  key={state}
                  className="flex items-center gap-3 rounded-md border border-slate-200 p-4 font-bold"
                >
                  <MapPin className="text-brand-blue" size={20} />
                  {state}
                </div>
              )
            )}
          </div>

          <div className="mt-12 rounded-md border border-slate-200 bg-brand-pale p-6">
            <p className="text-sm font-black uppercase text-brand-red">
              Charlotte, North Carolina
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Garage Door Repair in Charlotte
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Home Fix Solution provides professional garage door repair
              services for residential and commercial properties in Charlotte,
              NC. Explore our dedicated service page for more information,
              service details, FAQs, and booking options.
            </p>

            <Link
              href="/areas-we-serve/charlotte/garage-door-repair"
              className="btn-secondary mt-5 inline-flex"
            >
              View Charlotte Garage Door Repair
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}