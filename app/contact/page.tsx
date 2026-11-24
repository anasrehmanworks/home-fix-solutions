import { Clock, MapPinned, Phone } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { createMetadata, localBusinessSchema, site, statesServed } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Home Fix Solution",
  description:
    "Contact Home Fix Solution for garage door service, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, HVAC, and booking requests.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/contact")} />

      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Contact Home Fix Solution"
        intro="Call, message, or book service for garage door repair and installation, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, or HVAC requests."
      />

      <section className="bg-white py-16">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-0.5 hover:shadow-crisp">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-pale text-brand-blue">
                <Phone size={21} />
              </span>
              <h2 className="mt-4 text-xl font-black">Phone Number</h2>
              <a
                href={site.phoneHref}
                className="mt-2 block text-2xl font-black text-brand-blue"
              >
                {site.phone}
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-0.5 hover:shadow-crisp">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-pale text-brand-blue">
                <Clock size={21} />
              </span>
              <h2 className="mt-4 text-xl font-black">Business Hours</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Monday-Saturday: 8:00 AM-7:00 PM
                <br />
                Emergency service requests handled when available.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-0.5 hover:shadow-crisp">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-pale text-brand-blue">
                <MapPinned size={21} />
              </span>
              <h2 className="mt-4 text-xl font-black">Service Areas</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Serving 30+ states including{" "}
                {statesServed.slice(0, 5).join(", ")} and more.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <ContactForm />

            <div className="grid content-start gap-6">
              {/* Google Map */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208642.4835825671!2d-80.98696864687537!3d35.205502342025646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0x884650e6bf43d164!2sCharlotte%2C%20NC%2C%20USA!5e0!3m2!1sen!2s!4v1786752084025!5m2!1sen!2s"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Home Fix Solution Service Area"
                />
              </div>

              <div id="book" className="scroll-mt-28">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
