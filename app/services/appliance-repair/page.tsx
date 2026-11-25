import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata, localBusinessSchema, site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Appliance Repair | Home Fix Solution",
  description:
    "Request appliance repair with Home Fix Solution. Professional diagnostics, clear service options, and responsive scheduling across 30+ states.",
  path: "/services/appliance-repair",
  image: "/site-images/clear-service-options.jpg"
});

const includes = [
  "Appliance inspection and diagnostics",
  "Clear explanation of the likely issue",
  "Repair options discussed before work begins",
  "Follow-up guidance if replacement makes more sense"
];

const signs = [
  "An appliance has stopped working or works inconsistently.",
  "You notice unusual noises, leaks, or error indicators.",
  "Performance has dropped — longer cycles, poor cooling, or weak cleaning results.",
  "The issue is affecting daily routines at home."
];

const faqs = [
  {
    question: "How do I request appliance repair?",
    answer:
      "Use the booking form or call 757-908-4102 with the appliance type, what you have noticed, your address, and a preferred date and time slot."
  },
  {
    question: "What should I prepare before the visit?",
    answer:
      "Note the appliance brand and model if available, when the problem started, and anything that changed before it began. Clear access to the appliance helps the visit go smoothly."
  },
  {
    question: "Which areas do you serve?",
    answer:
      "Home Fix Solution serves customers across 30+ states. See the Areas We Serve page for the full list of states."
  }
];

export default function ApplianceRepairPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/services/appliance-repair")} />

      <section className="relative overflow-hidden bg-night text-white">
        <Image
          src="/site-images/clear-service-options.jpg"
          alt="Appliance repair service"
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/30" />
        <div className="section-shell relative pb-16 pt-32 lg:pb-20 lg:pt-36">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Appliance Repair" }]} dark />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow text-brand-ice">Appliance Repair</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-6xl">
              Appliance Repair
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              Household appliance repair requests handled with professional diagnostics and clear service options, for homes across 30+ states.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-primary">
                <Phone size={17} /> Call {site.phone}
              </a>
              <Link href="#book" className="btn-ghost-light">
                Book Appliance Repair
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-coal py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <aside id="book" className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <BookingForm compact />
          </aside>

          <article className="order-2 lg:order-1">
            <h2 className="font-display text-3xl font-semibold">Professional Appliance Repair</h2>
            <p className="mt-5 leading-8 text-slate-200">
              When a household appliance stops working the way it should, the first step is a proper diagnosis. Home Fix Solution approaches appliance repair requests the same way as every other service on this site: inspect the issue, explain the likely cause in clear language, and discuss the most practical next step before any work begins.
            </p>

            <h2 className="mt-10 font-display text-3xl font-semibold">What This Service Can Include</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-blue" size={20} />
                  <h3 className="font-black">{item}</h3>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-3xl font-semibold">Signs You Should Schedule Service</h2>
            <div className="mt-5 grid gap-3">
              {signs.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-coal p-4">
                  <ShieldCheck className="mt-0.5 shrink-0 text-brand-blue" size={20} />
                  <h3 className="font-bold leading-7">{item}</h3>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-3xl font-semibold">FAQ</h2>
            <div className="mt-5 grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-white/10 p-5">
                  <summary className="cursor-pointer text-lg font-black">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
