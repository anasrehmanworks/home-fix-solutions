import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { createMetadata, localBusinessSchema, site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about booking Home Fix Solution services, requested time slots, coupons, service areas, and technician careers.",
  path: "/faq"
});

const faqs = [
  {
    q: "What services does Home Fix Solution provide?",
    a: "Home Fix Solution provides garage door services, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, HVAC, and dryer vent cleaning services for residential and commercial customers, plus appliance repair requests."
  },
  {
    q: "How do I book a service?",
    a: "Use the booking form on this website: choose your service, tell us what's happening, pick a preferred date and a requested time slot, and send the request. You can also call us at " + site.phone + "."
  },
  {
    q: "Is my requested time slot guaranteed?",
    a: "Requested time slots are subject to confirmation. We will confirm your appointment by phone — a selected slot is a request, not guaranteed availability."
  },
  {
    q: "Which areas do you serve?",
    a: "Home Fix Solution serves customers across 30+ states, including the District of Columbia. See the Areas We Serve page for the full list of states."
  },
  {
    q: "How do coupons work?",
    a: "Pick a coupon on the Coupons page, open its offer page, and claim it before booking — or mention the code with your appointment request. The $100 OFF New Roof Installation offer has no code; just mention it when booking."
  },
  {
    q: "Do you work on commercial properties?",
    a: "Yes. Home Fix Solution handles residential and commercial requests, including commercial garage door service and commercial duct cleaning."
  },
  {
    q: "Can I apply to work as a technician?",
    a: "Yes — visit the Careers page to apply as a technician. The application takes a couple of minutes."
  }
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/faq")} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "FAQ" }]}
        eyebrow="Good To Know"
        title="Frequently Asked Questions"
        intro="Common questions before booking Home Fix Solution. Still unsure? Call us and we'll walk you through it."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={site.phoneHref} className="btn-primary">Call {site.phone}</a>
          <Link href="/contact#book" className="btn-ghost-light">Book Service</Link>
        </div>
      </PageHero>
      <section className="bg-coal py-20">
        <div className="section-shell max-w-4xl">
          <div className="grid content-start gap-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={Math.min(i, 3) * 80}>
                <details className="group rounded-xl border border-white/10 bg-coal p-5 shadow-sm" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-3.5 text-lg font-black [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{faq.q}</span>
                    <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-white/10 bg-smoke text-lg font-black text-brand-blue transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-7 text-slate-300">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
