import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck, Star } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BookingForm } from "@/components/BookingForm";
import { CountUp } from "@/components/CountUp";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { OffersSection } from "@/components/OffersSection";
import { Reveal } from "@/components/Reveal";
import { ServiceRack } from "@/components/ServiceRack";
import type { RackItem } from "@/components/ServiceRack";
import { sceneForSlug } from "@/lib/scenes";
import { Tilt } from "@/components/Tilt";
import { createMetadata, customerReviews, getService, getServicesByCategory, localBusinessSchema, primaryServices, site, statesServed } from "@/lib/site";
import { beforeAfterPairs } from "@/lib/gallery";

export const metadata = createMetadata({
  title: "Home Fix Solution | Home Services Across 30+ States",
  description:
    "Book professional garage door, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, and HVAC services with Home Fix Solution.",
  path: "/"
});

const faqs = [
  {
    q: "What services does Home Fix Solution provide?",
    a: "Home Fix Solution provides garage door services, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, and HVAC services for residential and commercial customers."
  },
  {
    q: "Do you offer booking online?",
    a: "Yes. Use the booking form to request service with your contact details, service category, preferred date, and available appointment slot."
  },
  {
    q: "Do you serve individual cities?",
    a: "The website lists states served rather than creating individual city pages. Home Fix Solution proudly serves customers across 30+ states."
  }
];

const dryerVent = getService("dryer-vent-cleaning");

const homeServices = [
  ...primaryServices.map((service) => ({
    title: service.title,
    slug: service.slug,
    image: service.image,
    description: service.description,
    category: service.title === "Electrician" ? "Electrician" : service.title
  })),
  {
    title: "Dryer Vent Cleaning",
    slug: "dryer-vent-cleaning",
    image: "/site-images/dryer-vent-cleaning.jpg",
    description: dryerVent?.summary ?? "Dryer vent cleaning that helps improve drying performance and reduce lint restrictions.",
    category: "Air Duct Cleaning"
  },
  {
    title: "Appliance Repair",
    slug: "appliance-repair",
    image: "/site-images/clear-service-options.jpg",
    description: "Household appliance repair requests for homes across our service areas.",
    category: "Appliance Repair"
  }
];

const rackItems: RackItem[] = homeServices.map((item) => {
  const svc = getService(item.slug);
  const chips =
    item.slug === "appliance-repair"
      ? ["Refrigerator", "Washer", "Dryer", "Dishwasher", "Oven or range"]
      : item.slug === "dryer-vent-cleaning"
        ? (svc?.services.slice(0, 4) ?? [])
        : getServicesByCategory(item.category as never).slice(0, 4).map((s2) => s2.title);
  return {
    title: item.title,
    href: `/services/${item.slug}`,
    image: item.image,
    blurb: svc?.summary ?? item.description,
    chips,
    scene: sceneForSlug(item.slug),
    category: item.category,
    serviceTitle: item.title
  };
});

const heroStats: Array<{ value: number; suffix: string; label: string }> = [
  { value: 30, suffix: "+", label: "States Served" },
  { value: 10, suffix: "", label: "Core Services" },
  { value: 6, suffix: "", label: "Current Coupons" }
];

const heroWords = "Premium Home Services, Booked With Confidence".split(" ");

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          ...localBusinessSchema("/"),
          "@type": "HomeAndConstructionBusiness",
          makesOffer: primaryServices.map((service) => ({ "@type": "Offer", itemOffered: service.title }))
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-night text-white">
        <Image src="/site-images/hero-background.jpg" alt="Bright luxury home with garage door" fill priority className="ken-burns object-cover opacity-45" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/78 to-night/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night to-transparent" />
        <div className="section-shell relative grid items-center gap-10 pb-14 pt-32 lg:grid-cols-[minmax(0,1fr)_540px] lg:pb-20 lg:pt-36">
          <div className="rise-in max-w-3xl">
            <p className="eyebrow rounded-full border border-brand-sky/40 bg-brand-blue/25 px-4 py-2 text-brand-ice backdrop-blur">
              Home Service Specialists
            </p>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.04] tracking-tight md:text-7xl" aria-label="Premium Home Services, Booked With Confidence">
              {heroWords.map((word, i) => (
                <span key={i} className="w" aria-hidden="true">
                  <span style={{ animationDelay: `${0.08 + i * 0.07}s` }}>{word}</span>
                  {i < heroWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl md:leading-9">
              Garage door, duct and chimney cleaning, plumbing, electrical, roofing, HVAC, and locksmith service for homes and businesses across 30+ states.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-primary px-6 py-3.5 text-base">Call Now: <span>{site.phone}</span></a>
              <Link href="#book" className="btn-ghost-light px-6 py-3.5 text-base">Book Now</Link>
            </div>
            <div className="mt-10 grid gap-3 text-sm font-bold text-slate-100 sm:grid-cols-3">
              {["Responsive scheduling", "Residential & commercial", "Licensed technician applicants welcome"].map((item) => (
                <span key={item} className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.06] p-3 backdrop-blur">
                  <CheckCircle2 size={18} className="shrink-0 text-brand-sky" />{item}
                </span>
              ))}
            </div>
            <div className="mt-10 flex max-w-[560px] gap-0 border-t border-white/20 pt-[22px]">
              {heroStats.map((stat, i) => (
                <div key={stat.label} className={`flex-1 ${i > 0 ? "border-l border-white/15 pl-5" : ""}`}>
                  <b className="block font-heading text-[1.55rem] font-black leading-none text-white">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </b>
                  <span className="mt-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.08em] text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div id="book" className="rise-in w-full text-white">
            <BookingForm compact tilt />
          </div>
        </div>
      </section>

      <Marquee />

      {/* SERVICES — the interactive rack with the approved 10-service list */}
      <section className="bg-coal py-20">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">What We Do</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight">Our Services</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Browse the rack — pick a service to see what it covers, book it pre-filled, or open its full page.
            </p>
          </div>
          <Reveal>
            <ServiceRack items={rackItems} />
          </Reveal>
        </div>
      </section>

      <OffersSection />

      {/* BEFORE & AFTER */}
      <section className="bg-night py-20 text-white">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-brand-ice">Before &amp; After</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Visible Service Results</h2>
            <p className="mt-3 leading-7 text-slate-300">
              See the kind of clean, professional improvements customers expect from garage door, air duct, chimney, and roofing service.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {beforeAfterPairs.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <BeforeAfterSlider before={item.before} after={item.after} title={item.title} description={item.description} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-night py-20">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {[
            { title: "Professional Diagnostics", text: "We identify the real issue before recommending repair or replacement.", Icon: ShieldCheck, img: "/site-images/professional-diagnostics.jpg" },
            { title: "Fast Scheduling", text: "Urgent service problems are handled as quickly as scheduling allows.", Icon: Clock, img: "/site-images/fast-scheduling.jpg" },
            { title: "Clear Service Options", text: "Customers get practical explanations and a straightforward service path.", Icon: CheckCircle2, img: "/site-images/clear-service-options.jpg" }
          ].map(({ title, text, Icon, img }, i) => (
            <Reveal key={title} delay={i * 110}>
              <Tilt className="h-full">
                <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-coal shadow-sm transition-shadow duration-300 hover:shadow-lift">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={img} alt={title} fill className="object-cover transition duration-700 group-hover:scale-[1.07]" sizes="(min-width: 1024px) 33vw, 100vw" />
                  </div>
                  <div className="p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-coal text-brand-blue">
                      <Icon size={24} />
                    </span>
                    <h3 className="mt-4 text-xl font-black">{title}</h3>
                    <p className="mt-2.5 leading-7 text-slate-300">{text}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-night py-20 text-white">
        <div className="section-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brand-ice">Reviews</p>
              <h2 className="mt-3 font-display text-4xl font-semibold">Customer Reviews</h2>
              <p className="mt-3 text-slate-300">Read recent service feedback or share your own experience.</p>
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {customerReviews.slice(0, 3).map((review) => (
              <figure key={`${review.name}-${review.service}`} className="dark-card p-6">
                <div className="mb-4 flex gap-1 text-brand-sky">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
                <blockquote className="leading-7 text-slate-100">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="mt-4">
                  <span className="block text-sm font-black text-brand-ice">{review.name}</span>
                  <span className="mt-1 block text-xs font-bold text-slate-300">{review.service}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/reviews" className="btn-ghost-light">
              Read All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="bg-coal py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Coverage</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Areas We Serve</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Home Fix Solution proudly serves customers across 30+ states. City-specific pages are intentionally avoided so the service area stays clear and easy to maintain.
            </p>
            <Link href="/areas-we-serve" className="btn-outline mt-6">View All States</Link>
          </div>
          <div className="grid grid-cols-2 content-start gap-2 text-sm font-bold text-slate-200 md:grid-cols-3">
            {statesServed.slice(0, 12).map((state) => <span key={state} className="rounded-lg border border-white/10 bg-smoke px-3 py-2.5">{state}</span>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-coal py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">FAQ</h2>
            <p className="mt-3 leading-7 text-slate-300">Common questions before booking Home Fix Solution.</p>
          </div>
          <div className="grid content-start gap-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-white/10 bg-coal p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center gap-3.5 text-lg font-black [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{faq.q}</span>
                  <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-white/10 bg-smoke text-lg font-black text-brand-blue transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-7 text-slate-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / BOOK — CTA band */}
      <section className="bg-night py-20">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-coal px-6 py-12 text-white sm:px-10 lg:px-[52px] lg:py-14">
            <Image src="/site-images/fast-scheduling.jpg" alt="" fill className="object-cover opacity-[0.14]" sizes="100vw" />
            <div className="relative grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brand-ice">Get Started</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Contact Home Fix Solution</h2>
            <p className="mt-4 leading-8 text-slate-300">
              Ready for home service support? Call <a href={site.phoneHref} className="font-black text-brand-sky">{site.phone}</a> or submit the booking form for garage door, cleaning, plumbing, electrical, locksmith, roofing, or HVAC service.
            </p>
            <div className="mt-8 grid gap-3 text-sm font-bold sm:grid-cols-2">
              {["Responsive scheduling", "Residential & commercial"].map((item) => (
                <span key={item} className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.06] p-3">
                  <CheckCircle2 size={18} className="shrink-0 text-brand-sky" />{item}
                </span>
              ))}
            </div>
          </div>
              <div className="text-white">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
