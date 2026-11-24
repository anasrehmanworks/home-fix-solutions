import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck, Star } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { OffersSection } from "@/components/OffersSection";
import { ServiceCards } from "@/components/ServiceCards";
import { beforeAfterGallery, createMetadata, customerReviews, getService, getServicesByCategory, localBusinessSchema, primaryServices, serviceCategories, site, statesServed } from "@/lib/site";

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
        <div className="section-shell relative grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_540px] lg:py-20">
          <div className="rise-in max-w-3xl">
            <p className="eyebrow rounded-full border border-brand-sky/40 bg-brand-blue/25 px-4 py-2 text-brand-ice backdrop-blur">
              Home Service Specialists
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.04] md:text-7xl">
              Premium Home Services, Booked With Confidence
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
          </div>
          <div id="book" className="rise-in w-full text-ink">
            <BookingForm compact />
          </div>
        </div>
      </section>

      {/* SERVICES — the approved 10-service list */}
      <section className="bg-white py-20">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">What We Do</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Service Highlights</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Choose the service category that fits your home or business request.
            </p>
          </div>
          <ServiceCards items={homeServices} />
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
              See the kind of clean, professional improvements customers expect from garage door, air duct, and chimney service.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {beforeAfterGallery.map((item) => (
              <article key={item.title} className="dark-card group overflow-hidden hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={`${item.title} before and after`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE SERVICES */}
      <section className="bg-brand-pale py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Browse</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Explore Services</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Browse dedicated pages for garage door, air duct cleaning, chimney cleaning, plumbing, electrical, locksmith, roofing, and HVAC requests.
            </p>
            <Link href="/contact#book" className="btn-primary mt-6">Book Service</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {serviceCategories.map((category) => (
              <div key={category} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={primaryServices.find((item) => item.title === category)?.image ?? site.heroImage} alt={`${category} services`} fill className="object-cover" sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black">{category}</h3>
                  <div className="mt-4 grid gap-2">
                    {getServicesByCategory(category).slice(0, 6).map((service) => (
                      <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-lg px-2 py-2 text-sm font-bold leading-5 text-ink transition hover:bg-brand-pale hover:text-brand-blue">
                        <span className="break-words">{service.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-white py-20">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {[
            ["Professional Diagnostics", "We identify the real issue before recommending repair or replacement.", ShieldCheck],
            ["Fast Scheduling", "Urgent service problems are handled as quickly as scheduling allows.", Clock],
            ["Clear Service Options", "Customers get practical explanations and a straightforward service path.", CheckCircle2]
          ].map(([title, text, Icon]) => (
            <div key={String(title)} className="rounded-2xl border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-crisp">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-pale text-brand-blue">
                <Icon size={26} />
              </span>
              <h3 className="mt-5 text-xl font-black">{title as string}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text as string}</p>
            </div>
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
                <div className="mb-4 flex gap-1 text-brand-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
                <blockquote className="leading-7 text-slate-100">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="mt-4">
                  <span className="block text-sm font-black text-brand-ice">{review.name}</span>
                  <span className="mt-1 block text-xs font-bold text-slate-300">{review.service}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/leave-a-review" className="btn-ghost-light">
              View More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="bg-white py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Coverage</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Areas We Serve</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Home Fix Solution proudly serves customers across 30+ states. City-specific pages are intentionally avoided so the service area stays clear and easy to maintain.
            </p>
            <Link href="/areas-we-serve" className="btn-outline mt-6">View All States</Link>
          </div>
          <div className="grid grid-cols-2 content-start gap-2 text-sm font-bold text-slate-700 md:grid-cols-3">
            {statesServed.slice(0, 12).map((state) => <span key={state} className="rounded-lg bg-brand-pale px-3 py-2.5">{state}</span>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-pale py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">FAQ</h2>
            <p className="mt-3 leading-7 text-slate-600">Common questions before booking Home Fix Solution.</p>
          </div>
          <div className="grid content-start gap-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-lg font-black">{faq.q}</summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / BOOK */}
      <section className="bg-night py-20 text-white">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
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
          <div className="text-ink">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
