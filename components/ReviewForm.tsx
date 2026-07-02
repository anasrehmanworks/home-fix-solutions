"use client";

import { Star, Send } from "lucide-react";
import { useState } from "react";
import { customerReviews, servicePages } from "@/lib/site";

const initialReviews = customerReviews.map((review) => ({
  name: review.name,
  service: review.service,
  rating: "5",
  review: review.text
}));

export function ReviewForm() {
  const [reviews, setReviews] = useState(initialReviews);
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    const response = await fetch("/api/reviews", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string };
    if (response.ok) {
      setReviews((current) => [
        {
          name: String(formData.get("name") ?? ""),
          service: String(formData.get("service") ?? ""),
          rating: String(formData.get("rating") ?? "5"),
          review: String(formData.get("review") ?? "")
        },
        ...current
      ]);
    }
    setMessage(data.message ?? "Thanks. Your review has been submitted.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
      <form action={submit} className="premium-form">
        <div className="premium-form-header">
          <span className="premium-icon"><Star size={22} /></span>
          <div>
            <p className="step-pill w-fit">Customer Feedback</p>
            <h2 className="mt-2 text-2xl font-black">Write a Review</h2>
          </div>
        </div>
        <div className="premium-grid">
          <label className="grid gap-1">
            <span className="label">Name</span>
            <input className="field" name="name" required autoComplete="name" />
          </label>
          <label className="grid gap-1">
            <span className="label">Email</span>
            <input className="field" name="email" type="email" required autoComplete="email" />
          </label>
          <label className="grid gap-1">
            <span className="label">Rating</span>
            <select className="field" name="rating" required defaultValue="5">
              {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} Stars</option>)}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="label">Service Used</span>
            <select className="field" name="service" required defaultValue="">
              <option value="" disabled>Select a service</option>
              {servicePages.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
            </select>
          </label>
          <label className="grid gap-1 md:col-span-2">
            <span className="label">Review Message</span>
            <textarea className="field min-h-32" name="review" required />
          </label>
        </div>
        <button className="btn-primary">
          <Send size={17} />
          Submit Review
        </button>
        {message && <p className="text-sm font-bold text-green-700">{message}</p>}
      </form>

      <div className="grid gap-4">
        {reviews.map((review, index) => (
          <article key={`${review.name}-${review.service}-${index}`} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex gap-1 text-brand-gold">
              {Array.from({ length: Number(review.rating) }).map((_, starIndex) => <Star key={starIndex} size={17} fill="currentColor" />)}
            </div>
            <p className="leading-7 text-slate-700">"{review.review}"</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-black">{review.name}</p>
              <p className="rounded-md bg-brand-pale px-3 py-2 text-sm font-black text-brand-blue">{review.service}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
