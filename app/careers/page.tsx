import { CareersForm } from "@/components/CareersForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { createMetadata, localBusinessSchema } from "@/lib/site";

export const metadata = createMetadata({
  title: "Careers | Apply As A Technician",
  description:
    "Apply as a technician with Home Fix Solution for garage door, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, and HVAC service work.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/careers")} />

      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="Technician Careers"
        title="Apply As A Technician"
        intro="Home Fix Solution is built around dependable field service. Use this application form to submit experience, licensing information, uploads, availability, and emergency contact details."
      />

      <section className="bg-coal py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="rounded-2xl border border-white/10 bg-coal p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-xl font-black text-slate-900">
                Company Charges
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Company will charge according to the selected service and
                project requirements. Final pricing, payment terms, and work
                details will be discussed after your application has been
                reviewed and approved.
              </p>
            </div>
          </div>

          <CareersForm />
        </div>
      </section>
    </>
  );
}
