import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ReviewForm } from "@/components/ReviewForm";
import { createMetadata, localBusinessSchema } from "@/lib/site";

export const metadata = createMetadata({
  title: "Leave a Review",
  description: "Leave a review for Home Fix Solution garage door, air duct cleaning, chimney cleaning, plumbing, electrician, locksmith, roofing, and HVAC services.",
  path: "/leave-a-review"
});

export default function LeaveReviewPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/leave-a-review")} />
      <PageHero
        crumbs={[{ label: "Leave a Review" }]}
        eyebrow="Customer Reviews"
        title="Leave a Review"
        intro="Tell us about your Home Fix Solution service experience."
      />
      <section className="bg-white py-16">
        <div className="section-shell max-w-6xl">
          <div className="mx-auto max-w-5xl">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
