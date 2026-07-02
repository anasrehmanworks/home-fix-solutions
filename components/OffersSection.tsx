import Link from "next/link";
import { BadgePercent } from "lucide-react";
import { offers } from "@/lib/site";

export function OffersSection() {
  return (
    <section className="bg-white py-16">
      <div className="section-shell">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase text-brand-red">Limited-Time Offers</p>
          <h2 className="mt-3 text-3xl font-black">Service Coupons</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Claim a coupon before booking and bring the code with your appointment request.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.slug} className="relative overflow-hidden rounded-md border border-slate-200 bg-brand-pale p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-crisp">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-brand-blue text-white">
                <BadgePercent size={25} />
              </div>
              <h3 className="min-h-16 text-2xl font-black leading-tight">
                {offer.title}
              </h3>
              <p className="mt-4 text-4xl font-black text-brand-red">{offer.discount}</p>
              <p className="mt-2 font-bold text-slate-700">{offer.details}</p>
              <div className="mt-5 rounded-md border border-dashed border-brand-blue bg-white px-4 py-3 text-sm font-black text-brand-blue">
                Code: {offer.code}
              </div>
              <Link href={`/offers/${offer.slug}`} className="btn-primary mt-5 w-full">
                Claim Offer
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
