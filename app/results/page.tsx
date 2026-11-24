import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { beforeAfterGallery, createMetadata, localBusinessSchema, site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Before & After Results",
  description:
    "See before and after results from Home Fix Solution garage door, air duct cleaning, and chimney cleaning services. Drag the sliders to compare.",
  path: "/results"
});

export default function ResultsPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/results")} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Results" }]}
        eyebrow="Before & After"
        title="Visible Service Results"
        intro="Drag the handle on each photo to compare the before and after result for garage door, air duct, and chimney service."
      />
      <section className="bg-night py-20 text-white">
        <div className="section-shell">
          <div className="grid gap-5 md:grid-cols-3">
            {beforeAfterGallery.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <BeforeAfterSlider image={item.image} title={item.title} description={item.description} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <div>
              <h2 className="font-display text-2xl font-black">Want results like these?</h2>
              <p className="mt-2 text-slate-300">Book your service online or call {site.phone}.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-ghost-light">Call Now</a>
              <Link href="/contact#book" className="btn-primary">Book Service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
