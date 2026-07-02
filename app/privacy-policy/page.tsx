import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Home Fix Solution.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-16">
      <div className="section-shell max-w-4xl">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
        <h1 className="mt-8 text-4xl font-black">Privacy Policy</h1>
        <div className="mt-6 grid gap-5 leading-8 text-slate-700">
          <p>Home Fix Solution collects information submitted through booking, contact, and technician application forms so we can respond to requests, schedule service, and review applications.</p>
          <p>Information may include names, phone numbers, email addresses, service addresses, appointment preferences, uploaded documents, and application details. This information is used to respond to service requests, customer messages, and technician applications.</p>
          <p>We do not sell personal information. Form data should be connected to your chosen CRM, email inbox, or secure backend before production launch.</p>
        </div>
      </div>
    </section>
  );
}
