import Link from "next/link";
import { Star } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { allReviews } from "@/lib/reviews";
import { createMetadata, localBusinessSchema } from "@/lib/site";

export const metadata = createMetadata({
  title: "Customer Reviews",
  description:
    "Read genuine customer reviews for Home Fix Solution garage door, air duct cleaning, and chimney services, and share your own experience.",
  path: "/reviews"
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/reviews")} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Reviews" }]}
        eyebrow="Customer Feedback"
        title="Customer Reviews"
        intro="Real feedback from Home Fix Solution customers across our service areas."
      />
      <section className="bg-night py-20 text-white">
        <div className="section-shell">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {allReviews.map((review, i) => (
              <Reveal key={`${review.name}-${review.service}`} delay={(i % 3) * 110}>
                <figure className="dark-card h-full p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
                  <div className="mb-4 flex gap-1 text-brand-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="leading-7 text-slate-100">&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4">
                    <span className="block text-sm font-black text-brand-ice">{review.name}</span>
                    <span className="mt-1 block text-xs font-bold text-slate-300">{review.service}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-slate-300">Had a Home Fix Solution service recently?</p>
            <Link href="/leave-a-review" className="btn-primary mt-4">
              Leave a Review
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
