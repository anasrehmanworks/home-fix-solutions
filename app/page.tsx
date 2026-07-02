import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck, Star, Wrench } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { OffersSection } from "@/components/OffersSection";
import { beforeAfterGallery, createMetadata, customerReviews, getServicesByCategory, localBusinessSchema, primaryServices, serviceCategories, site, statesServed } from "@/lib/site";

export const metadata = createMetadata({
  title: "Home Fix Solution | Garage Door, Air Duct & Chimney Services",
  description:
    "Book professional garage door repair, installation, opener service, air duct cleaning, and chimney cleaning with Home Fix Solution.",
  path: "/"
});

const faqs = [
  {
    q: "What services does Home Fix Solution provide?",
    a: "Home Fix Solution provides garage door services, air duct cleaning, and chimney cleaning for residential and commercial customers."
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
      <section className="relative overflow-hidden bg-white">
        <Image src="/site-images/hero-background.jpg" alt="Bright luxury home with garage door" fill priority className="object-cover" sizes="100vw" />
        <div className="section-shell relative grid min-h-[690px] items-center gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:py-12">
          <div className="max-w-3xl rounded-md bg-white/95 p-7 shadow-crisp md:p-9">
            <p className="mb-5 inline-flex rounded-md bg-brand-gold px-4 py-2 text-xs font-black uppercase text-ink shadow-sm">
              Home Service Specialists
            </p>
            <h1 className="text-5xl font-black leading-[1.02] text-ink md:text-7xl">
              Premium Home Services, Booked With Confidence
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl md:leading-9">
              Professional garage door repair and installation, plus air duct cleaning and chimney cleaning for homes and businesses across 30+ states.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-primary">Call Now: <span>{site.phone}</span></a>
              <Link href="#book" className="btn-secondary">Book Now</Link>
            </div>
            <div className="mt-9 grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-3">
              {["Responsive scheduling", "Residential & commercial", "Licensed technician applicants welcome"].map((item) => (
                <span key={item} className="flex items-center gap-2 rounded-md bg-white p-3 shadow-sm"><CheckCircle2 size={18} className="text-brand-blue" />{item}</span>
              ))}
            </div>
          </div>
          <div id="book" className="w-full">
            <BookingForm compact />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black">Service Highlights</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Choose the service category that fits your home or business request.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {primaryServices.map((service) => (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className={`group rounded-md border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-crisp ${
                  "border-slate-200 bg-white"
                }`}
              >
                <div className="relative -mx-6 -mt-6 mb-5 aspect-[4/3] overflow-hidden rounded-t-md">
                  <Image src={service.image} alt={`${service.title} service`} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-brand-blue text-white">
                  <Wrench size={24} />
                </div>
                <h3 className="text-2xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OffersSection />

      <section className="bg-brand-pale py-16">
        <div className="section-shell">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase text-brand-red">Before & After</p>
            <h2 className="mt-3 text-3xl font-black">Visible Service Results</h2>
            <p className="mt-3 leading-7 text-slate-600">
              See the kind of clean, professional improvements customers expect from garage door, air duct, and chimney service.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {beforeAfterGallery.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-crisp">
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={`${item.title} before and after`} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-pale py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-3xl font-black">Explore Services</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Browse the dedicated service pages for garage door, air duct cleaning, and chimney cleaning requests.
            </p>
            <Link href="/contact#book" className="btn-secondary mt-6">Book Service</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {serviceCategories.map((category) => (
              <div key={category} className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={primaryServices.find((item) => item.title === category)?.image ?? site.heroImage} alt={`${category} services`} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="p-5">
                <h3 className="text-xl font-black">{category}</h3>
                <div className="mt-4 grid gap-2">
                  {getServicesByCategory(category).slice(0, 6).map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-md px-2 py-2 text-sm font-bold leading-5 text-ink transition hover:bg-brand-pale hover:text-brand-blue">
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

      <section className="bg-white py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-3">
          {[
            ["Professional Diagnostics", "We identify the real issue before recommending repair or replacement.", ShieldCheck],
            ["Fast Scheduling", "Urgent service problems are handled as quickly as scheduling allows.", Clock],
            ["Clear Service Options", "Customers get practical explanations and a straightforward service path.", CheckCircle2]
          ].map(([title, text, Icon]) => (
            <div key={String(title)} className="rounded-md border border-slate-200 p-6">
              <Icon className="text-brand-red" size={30} />
              <h3 className="mt-4 text-xl font-black">{title as string}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="section-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black">Customer Reviews</h2>
              <p className="mt-3 text-slate-300">Read recent service feedback or share your own experience.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {customerReviews.slice(0, 3).map((review) => (
              <figure key={`${review.name}-${review.service}`} className="rounded-md border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex gap-1 text-brand-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
                <blockquote className="leading-7 text-slate-100">"{review.text}"</blockquote>
                <figcaption className="mt-4">
                  <span className="block text-sm font-black text-brand-gold">{review.name}</span>
                  <span className="mt-1 block text-xs font-bold text-slate-300">{review.service}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/leave-a-review" className="btn-outline border-white bg-white text-brand-blue hover:bg-brand-pale">
              View More Reviews
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">Areas We Serve</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Home Fix Solution proudly serves customers across 30+ states. City-specific pages are intentionally avoided so the service area stays clear and easy to maintain.
            </p>
            <Link href="/areas-we-serve" className="btn-outline mt-6">View All States</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-bold text-slate-700 md:grid-cols-3">
            {statesServed.slice(0, 12).map((state) => <span key={state} className="rounded-md bg-brand-pale px-3 py-2">{state}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-brand-pale py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black">FAQ</h2>
            <p className="mt-3 leading-7 text-slate-600">Common questions before booking Home Fix Solution.</p>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-md border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer text-lg font-black">{faq.q}</summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">Contact Home Fix Solution</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Ready for garage door service, air duct cleaning, or chimney cleaning? Call <a href={site.phoneHref} className="font-black text-brand-blue">{site.phone}</a> or submit the booking form.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
