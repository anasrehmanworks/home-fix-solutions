import { Clock, MapPinned, Phone } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata, localBusinessSchema, site, statesServed } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Home Fix Solution",
  description:
    "Contact Home Fix Solution for garage door service, air duct cleaning, chimney cleaning, and booking requests.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/contact")} />

      <section className="bg-brand-pale py-10">
        <div className="section-shell">
          <Breadcrumbs items={[{ label: "Contact" }]} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell">
          <h1 className="text-4xl font-black">
            Contact Home Fix Solution
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Call, message, or book service for garage door repair and
            installation, air duct cleaning, or chimney cleaning.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-md border border-slate-200 p-6">
              <Phone className="text-brand-red" />
              <h2 className="mt-4 text-xl font-black">Phone Number</h2>
              <a
                href={site.phoneHref}
                className="mt-2 block text-2xl font-black text-brand-blue"
              >
                {site.phone}
              </a>
            </div>

            <div className="rounded-md border border-slate-200 p-6">
              <Clock className="text-brand-red" />
              <h2 className="mt-4 text-xl font-black">Business Hours</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Monday-Saturday: 8:00 AM-7:00 PM
                <br />
                Emergency service requests handled when available.
              </p>
            </div>

            <div className="rounded-md border border-slate-200 p-6">
              <MapPinned className="text-brand-red" />
              <h2 className="mt-4 text-xl font-black">Service Areas</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Serving 30+ states including{" "}
                {statesServed.slice(0, 5).join(", ")} and more.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <ContactForm />

            <div className="grid gap-6">

              {/* Google Map */}
              <div className="overflow-hidden rounded-md border border-slate-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97028.8562569021!2d-74.46050881240647!3d40.538236232042664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3d37f68bea199%3A0xf22bc5a66f83d4ea!2sEdison%2C%20NJ%2C%20USA!5e0!3m2!1sen!2s!4v1783859796948!5m2!1sen!2s"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Home Fix Solution Service Area"
                />
              </div>

              <div id="book">
                <BookingForm />
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}