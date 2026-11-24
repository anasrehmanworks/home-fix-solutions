import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone, ShieldCheck, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import {
  createMetadata,
  getService,
  getServicesByCategory,
  localBusinessSchema,
  servicePages,
  site
} from "@/lib/site";
import { reviewForService } from "@/lib/reviews";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { TransitionLink } from "@/components/ServiceTransition";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return createMetadata({
    title: `${service.title} | Professional ${service.category} Service`,
    description: `${service.summary} Book ${service.title.toLowerCase()} with Home Fix Solution across 30+ states.`,
    path: `/services/${service.slug}`,
    image: service.image
  });
}

function longServiceCopy(serviceTitle: string, category: string) {
  return [
    `When property owners search for ${serviceTitle.toLowerCase()}, they usually need more than a quick patch. They need a dependable technician who can inspect the issue, explain the likely cause, and complete the work with attention to safety, performance, and long-term value. Home Fix Solution approaches every appointment with that mindset. The goal is to restore confidence in the part of the home or business that is not working correctly, whether that means a garage door that will not open, ductwork that needs attention, a fireplace system that should be cleaned, a plumbing issue, an electrical concern, or a lock and access problem.`,

    `The service begins with a practical conversation about what you noticed, when the problem started, and how the system has been behaving. That context helps the technician focus the inspection without overlooking related components. Garage door, air duct, and chimney visits follow the same clear process already used throughout the site. Plumbing, electrical, and locksmith requests are handled with the same attention to visible symptoms, property access, affected components, and the most practical next step for the customer.`,

    `Clear recommendations matter. Home Fix Solution avoids confusing service language and instead explains what is urgent, what can be planned, and what options are available. If repair is the right fit, the technician can focus on correcting the immediate problem while checking the surrounding system for wear that could cause another breakdown. If replacement or installation is the better choice, the discussion can include size, material, usage, insulation, access needs, scheduling, and budget. This helps customers choose the path that makes sense for the property instead of feeling pressured into a one-size-fits-all answer.`,

    `${category} service also has a strong maintenance component. Many expensive problems begin as small signs: louder movement, slower operation, uneven lifting, dusty vents, weak airflow, smoky fireplace use, water staining, or visible exterior wear. Routine inspection and tune-up work can catch those signals early. For homeowners, that means fewer interruptions and a more comfortable daily routine. For businesses, it can mean better uptime, safer access points, and fewer service surprises during busy hours.`,

    `Home Fix Solution proudly serves customers across 30+ states while keeping the website focused on state-level service areas rather than individual city pages. That structure makes it easier to maintain accurate coverage information and keeps visitors focused on choosing the right service. To request ${serviceTitle.toLowerCase()}, use the booking form or call the highlighted phone number with the property address, preferred date, and an available appointment slot. This helps prepare the request and match it to the right service path.`
  ];
}

const familyBeforeAfter: Record<string, { image: string; label: string }> = {
  "Garage Door": { image: "/site-images/garage-door-before-after.jpg", label: "Garage Door Results" },
  "Air Duct Cleaning": { image: "/site-images/air-duct-before-after.jpg", label: "Air Duct Cleaning Results" },
  "Chimney Cleaning": { image: "/site-images/chimney-cleaning-before-after.jpg", label: "Chimney Cleaning Results" }
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const related = getServicesByCategory(service.category)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 8);

  const paragraphs = service.details ?? longServiceCopy(service.title, service.category);
  const matchedReview = reviewForService(service.title, service.slug);
  const beforeAfter = familyBeforeAfter[service.category];

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(`/services/${service.slug}`),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            serviceType: service.category,
            provider: {
              "@type": "LocalBusiness",
              name: site.name,
              telephone: site.phone
            },
            areaServed: "United States",
            url: `${site.url}/services/${service.slug}`,
            description: service.summary
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: site.url
              },
              {
                "@type": "ListItem",
                position: 2,
                name: service.category,
                item: `${site.url}/services/${service.slug}`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: service.title,
                item: `${site.url}/services/${service.slug}`
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }
        ]}
      />

      {/* CINEMATIC HERO */}
      <section className="relative overflow-hidden bg-night text-white">
        <Image
          src={service.image}
          alt={`${service.title} service`}
          fill
          priority
          className="ken-burns object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" />
        <div className="section-shell relative py-14 lg:py-20">
          <Breadcrumbs
            dark
            items={[
              { label: "Services", href: "/services" },
              { label: service.category },
              { label: service.title }
            ]}
          />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="rise-in max-w-3xl">
              <p className="eyebrow text-brand-ice">{service.category}</p>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
                {service.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={site.phoneHref} className="btn-primary">
                  <Phone size={17} />
                  Call {site.phone}
                </a>
                <Link href="#book" className="btn-ghost-light">
                  Book {service.title}
                </Link>
              </div>
            </div>
            <p className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 font-semibold leading-7 text-slate-100 backdrop-blur lg:mb-2">
              {service.emphasis}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT + BOOKING */}
      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <aside
            id="book"
            className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start"
          >
            <BookingForm compact initialCategory={service.category} initialService={service.title} />
          </aside>

          <article className="order-2 max-w-none lg:order-1">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Professional {service.title}
            </h2>

            <div className="mt-5 grid gap-5 text-base leading-8 text-slate-700">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 font-display text-3xl font-semibold">
              What This Service Can Include
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.services.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-brand-blue/50 hover:shadow-crisp"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-brand-blue"
                    size={20}
                  />
                  <h3 className="font-black">{item}</h3>
                </div>
              ))}
            </div>

            <h2 className="mt-12 font-display text-3xl font-semibold">
              Signs You Should Schedule Service
            </h2>

            <div className="mt-5 grid gap-3">
              {service.signs.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-brand-pale p-4"
                >
                  <ShieldCheck
                    className="mt-0.5 shrink-0 text-brand-blue"
                    size={20}
                  />
                  <h3 className="font-bold leading-7">{item}</h3>
                </div>
              ))}
            </div>

            {beforeAfter && (
              <>
                <h2 className="mt-12 font-display text-3xl font-semibold">
                  {beforeAfter.label}
                </h2>
                <div className="mt-5">
                  <BeforeAfterSlider
                    image={beforeAfter.image}
                    title={beforeAfter.label}
                    description="Drag the handle to compare the before and after result."
                  />
                </div>
              </>
            )}

            {matchedReview && (
              <figure className="mt-12 rounded-2xl bg-night p-7 text-white">
                <div className="mb-4 flex gap-1 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-lg leading-8 text-slate-100">
                  &ldquo;{matchedReview.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  <span className="block text-sm font-black text-brand-ice">{matchedReview.name}</span>
                  <span className="mt-1 block text-xs font-bold text-slate-300">{matchedReview.service}</span>
                </figcaption>
              </figure>
            )}

            <h2 className="mt-12 font-display text-3xl font-semibold">
              Related Services
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <TransitionLink
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="block rounded-xl border border-slate-200 p-4 font-bold transition hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-crisp"
                >
                  {item.title}
                </TransitionLink>
              ))}
            </div>

            <h2 className="mt-12 font-display text-3xl font-semibold">FAQ</h2>

            <div className="mt-5 grid gap-4">
              {service.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3.5 text-lg font-black [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{faq.question}</span>
                    <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-lg font-black text-brand-blue transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-night py-16 text-white">
        <div className="section-shell flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Ready to book {service.title}?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Request your appointment online or call us — responsive scheduling for homes and businesses across 30+ states.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn-ghost-light">
              <Phone size={17} /> {site.phone}
            </a>
            <Link href="#book" className="btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
