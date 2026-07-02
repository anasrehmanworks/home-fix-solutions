import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ReviewForm } from "@/components/ReviewForm";
import { createMetadata, localBusinessSchema } from "@/lib/site";

export const metadata = createMetadata({
  title: "Leave a Review",
  description: "Leave a review for Home Fix Solution garage door, air duct cleaning, and chimney cleaning services.",
  path: "/leave-a-review"
});

export default function LeaveReviewPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/leave-a-review")} />
      <section className="bg-brand-pale py-10">
        <div className="section-shell"><Breadcrumbs items={[{ label: "Leave a Review" }]} /></div>
      </section>
      <section className="bg-white py-16">
        <div className="section-shell max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase text-brand-red">Customer Reviews</p>
            <h1 className="mt-3 text-4xl font-black">Leave a Review</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Tell us about your Home Fix Solution service experience.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
