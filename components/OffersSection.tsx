import Link from "next/link";
import { BadgePercent } from "lucide-react";
import { offers } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function OffersSection() {
  return (
    <section className="bg-night py-20">
      <div className="section-shell">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Limited-Time Offers</p>
          <h2 className="mt-3 font-display text-4xl font-semibold">Service Coupons</h2>
          <p className="mt-3 leading-7 text-slate-300">
            Claim a coupon before booking and bring the code with your appointment request.
          </p>
        </div>
        <Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.slug} className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-coal p-6 text-white shadow-lift transition duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute -left-[13px] top-1/2 z-10 h-[26px] w-[26px] -translate-y-1/2 rounded-full bg-night" />
              <span aria-hidden="true" className="absolute -right-[13px] top-1/2 z-10 h-[26px] w-[26px] -translate-y-1/2 rounded-full bg-night" />
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-blue/30 blur-2xl transition duration-500 group-hover:bg-brand-blue/50" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue text-white">
                  <BadgePercent size={25} />
                </div>
                <h3 className="min-h-16 text-2xl font-black leading-tight">
                  {offer.title}
                </h3>
                <p className="mt-4 font-display text-5xl font-semibold text-brand-sky">{offer.discount}</p>
                <p className="mt-2 font-bold text-slate-300">{offer.details}</p>
                <div className="mt-5 rounded-lg border border-dashed border-brand-sky/60 bg-white/[0.06] px-4 py-3 text-sm font-black tracking-wide text-brand-ice">
                  Code: {offer.code}
                </div>
                <Link href={`/offers/${offer.slug}`} className="btn-primary mt-5 w-full">
                  Claim Offer
                </Link>
              </div>
            </article>
          ))}

          {/* User-added coupon (2026-11-25): no code, no invented conditions */}
          <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-coal p-6 text-white shadow-lift transition duration-300 hover:-translate-y-1">
            <span aria-hidden="true" className="absolute -left-[13px] top-1/2 z-10 h-[26px] w-[26px] -translate-y-1/2 rounded-full bg-night" />
            <span aria-hidden="true" className="absolute -right-[13px] top-1/2 z-10 h-[26px] w-[26px] -translate-y-1/2 rounded-full bg-night" />
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-blue/30 blur-2xl transition duration-500 group-hover:bg-brand-blue/50" />
            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue text-white">
                <BadgePercent size={25} />
              </div>
              <h3 className="min-h-16 text-2xl font-black leading-tight">
                New Roof Installation
              </h3>
              <p className="mt-4 font-display text-5xl font-semibold text-brand-sky">$100 OFF</p>
              <p className="mt-2 font-bold text-slate-300">New roof installation service</p>
              <div className="mt-5 rounded-lg border border-dashed border-brand-sky/60 bg-white/[0.06] px-4 py-3 text-sm font-black tracking-wide text-brand-ice">
                Mention this offer when booking
              </div>
              <Link href="/services/roofing#book" className="btn-primary mt-5 w-full">
                Book Roofing Service
              </Link>
            </div>
          </article>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
