import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { createMetadata, getService, getServicesByCategory, localBusinessSchema, servicePages, site } from "@/lib/site";

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
    `When property owners search for ${serviceTitle.toLowerCase()}, they usually need more than a quick patch. They need a dependable technician who can inspect the whole system, explain the cause of the issue, and complete the work with attention to safety, performance, and long-term value. Home Fix Solution approaches every appointment with that mindset. The goal is to restore confidence in the part of the home or business that is not working correctly, whether that means a garage door that will not open, ductwork that needs attention, or a fireplace system that should be cleaned and reviewed before use.`,
    `The service begins with a practical conversation about what you noticed, when the problem started, and how the system has been behaving. That context helps the technician focus the inspection without overlooking related components. For garage door work, the visit may include the door sections, springs, cables, rollers, tracks, opener, sensors, wall controls, weather seals, and balance. For air duct and vent work, the focus may include visible buildup, airflow concerns, register condition, and dryer vent restrictions. For chimney and fireplace service, the technician may review the firebox, flue path, cap, crown, masonry, and signs of moisture or blockage.`,
    `Clear recommendations matter. Home Fix Solution avoids confusing service language and instead explains what is urgent, what can be planned, and what options are available. If repair is the right fit, the technician can focus on correcting the immediate problem while checking the surrounding system for wear that could cause another breakdown. If replacement or installation is the better choice, the discussion can include size, material, usage, insulation, access needs, scheduling, and budget. This helps customers choose the path that makes sense for the property instead of feeling pressured into a one-size-fits-all answer.`,
    `${category} service also has a strong maintenance component. Many expensive problems begin as small signs: louder movement, slower operation, uneven lifting, dusty vents, weak airflow, smoky fireplace use, water staining, or visible exterior wear. Routine inspection and tune-up work can catch those signals early. For homeowners, that means fewer interruptions and a more comfortable daily routine. For businesses, it can mean better uptime, safer access points, and fewer service surprises during busy hours.`,
    `Home Fix Solution proudly serves customers across 30+ states while keeping the website focused on state-level service areas rather than individual city pages. That structure makes it easier to maintain accurate coverage information and keeps visitors focused on choosing the right service. To request ${serviceTitle.toLowerCase()}, use the booking form, call the highlighted phone number, and include the property address, preferred date, preferred time, and a short description of the issue. The more detail you provide, the easier it is to prepare for the appointment and match the request to the right service path.`
  ];
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = getServicesByCategory(service.category).filter((item) => item.slug !== service.slug).slice(0, 8);
  const paragraphs = longServiceCopy(service.title, service.category);

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
            provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phone },
            areaServed: "United States",
            url: `${site.url}/services/${service.slug}`,
            description: service.summary
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: service.category, item: `${site.url}/services/${service.slug}` },
              { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/services/${service.slug}` }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer }
            }))
          }
        ]}
      />
      <section className="bg-brand-pale py-10">
        <div className="section-shell">
          <Breadcrumbs items={[{ label: service.category }, { label: service.title }]} />
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-black uppercase text-brand-red">{service.category}</p>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">{service.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{service.summary}</p>
            <p className="mt-5 rounded-md border-l-4 border-brand-red bg-brand-pale p-4 font-bold leading-7 text-ink">
              {service.emphasis}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-primary"><Phone size={17} />Call <span>{site.phone}</span></a>
              <Link href="#book" className="btn-secondary">Book {service.title}</Link>
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-md">
            <Image src={service.image} alt={`${service.title} service`} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <article className="max-w-none">
            <h2 className="text-3xl font-black">Professional {service.title}</h2>
            <div className="mt-5 grid gap-5 text-base leading-8 text-slate-700">
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <h2 className="mt-10 text-3xl font-black">What This Service Can Include</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.services.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-slate-200 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-blue" size={20} />
                  <h3 className="font-black">{item}</h3>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-3xl font-black">Signs You Should Schedule Service</h2>
            <div className="mt-5 grid gap-3">
              {service.signs.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md bg-brand-pale p-4">
                  <ShieldCheck className="mt-0.5 shrink-0 text-brand-red" size={20} />
                  <h3 className="font-bold leading-7">{item}</h3>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-3xl font-black">Related Services</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-md border border-slate-200 p-4 font-bold hover:border-brand-blue">
                  {item.title}
                </Link>
              ))}
            </div>

            <h2 className="mt-10 text-3xl font-black">FAQ</h2>
            <div className="mt-5 grid gap-4">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="rounded-md border border-slate-200 p-5">
                  <summary className="cursor-pointer text-lg font-black">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </article>

          <aside id="book" className="lg:sticky lg:top-28 lg:self-start">
            <BookingForm compact />
          </aside>
        </div>
      </section>
    </>
  );
}
