import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CareersForm } from "@/components/CareersForm";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata, localBusinessSchema } from "@/lib/site";

export const metadata = createMetadata({
  title: "Careers | Apply As A Technician",
  description:
    "Apply as a technician with Home Fix Solution for garage door, air duct cleaning, and chimney cleaning service work.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/careers")} />

      <section className="bg-brand-pale py-10">
        <div className="section-shell">
          <Breadcrumbs items={[{ label: "Careers" }]} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase text-brand-red">
              Technician Careers
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Apply As A Technician
            </h1>

            <p className="mt-5 leading-8 text-slate-600">
              Home Fix Solution is built around dependable field service. Use
              this application form to submit experience, licensing
              information, uploads, availability, and emergency contact
              details.
            </p>

            <div className="mt-8 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-slate-900">
                Company Charges
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
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