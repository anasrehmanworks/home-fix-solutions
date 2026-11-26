import { PageHero } from "@/components/PageHero";
import { createMetadata, site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Home Fix Solution website.",
  path: "/terms-and-conditions"
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Terms & Conditions" }]}
        eyebrow="Legal"
        title="Terms & Conditions"
      />
      <section className="bg-coal py-16">
        <div className="section-shell max-w-4xl">
          <div className="grid gap-5 leading-8 text-slate-200">
            <p>By using this website, you agree to use it for lawful service requests, contact submissions, and technician applications related to Home Fix Solution.</p>
            <p>Submitting a form does not guarantee appointment availability, employment, pricing, or service coverage. A representative may contact you at <span className="font-black text-brand-blue">{site.phone}</span> or through the information you provide.</p>
            <p>Website content is provided for general information and may be updated as services, coverage, and business details change.</p>
          </div>
        </div>
      </section>
    </>
  );
}
