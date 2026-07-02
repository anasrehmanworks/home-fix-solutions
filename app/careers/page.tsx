import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CareersForm } from "@/components/CareersForm";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata, localBusinessSchema } from "@/lib/site";

const commissions = [
  { service: "Garage Door", rate: "40%" },
  { service: "Air Duct Cleaning", rate: "45%" },
  { service: "Chimney Cleaning", rate: "45%" }
];

export const metadata = createMetadata({
  title: "Careers | Apply As A Technician",
  description: "Apply as a technician with Home Fix Solution for garage door, air duct cleaning, and chimney cleaning service work.",
  path: "/careers"
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/careers")} />
      <section className="bg-brand-pale py-10">
        <div className="section-shell"><Breadcrumbs items={[{ label: "Careers" }]} /></div>
      </section>
      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase text-brand-red">Technician Careers</p>
            <h1 className="mt-3 text-4xl font-black">Apply As A Technician</h1>
            <p className="mt-5 leading-8 text-slate-600">
              Home Fix Solution is built around dependable field service. Use this application form to submit experience, licensing information, uploads, availability, and emergency contact details.
            </p>
            <div className="mt-8 grid gap-3">
              {commissions.map((item) => (
                <div key={item.service} className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="font-black">{item.service}</span>
                  <span className="rounded-md bg-brand-pale px-3 py-2 text-xl font-black text-brand-blue">{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
          <CareersForm />
        </div>
      </section>
    </>
  );
}
