import { notFound } from "next/navigation";
import { BadgePercent } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { OfferRedeemForm } from "@/components/OfferRedeemForm";
import { createMetadata, getOffer, getService, localBusinessSchema, offers, site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};
  return createMetadata({
    title: `${offer.discount} ${offer.title} Coupon`,
    description: `Claim coupon code ${offer.code} for ${offer.title} from Home Fix Solution.`,
    path: `/offers/${offer.slug}`
  });
}

export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();
  const service = getService(offer.serviceSlug);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(`/offers/${offer.slug}`),
          {
            "@context": "https://schema.org",
            "@type": "Offer",
            name: `${offer.discount} ${offer.title}`,
            url: `${site.url}/offers/${offer.slug}`,
            couponCode: offer.code,
            itemOffered: service?.title ?? offer.title
          }
        ]}
      />
      <section className="relative overflow-hidden bg-night pb-12 pt-32 text-white">
        <div className="absolute -left-24 top-0 h-56 w-56 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="section-shell relative">
          <Breadcrumbs dark items={[{ label: "Offers" }, { label: offer.title }]} />
          <p className="eyebrow mt-8 text-brand-ice">Limited-Time Offer</p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Claim Your Coupon</h2>
        </div>
      </section>
      <section className="bg-coal py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue text-white shadow-crisp">
              <BadgePercent size={30} />
            </div>
            <p className="text-sm font-black uppercase tracking-wide text-brand-blue">Offer Details</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">
              {offer.title}
            </h1>
            <p className="mt-5 font-display text-6xl font-semibold text-brand-blue">{offer.discount}</p>
            <p className="mt-3 text-xl font-bold text-slate-200">{offer.details}</p>
            <div className="mt-6 rounded-xl border border-dashed border-brand-blue bg-coal p-5">
              <h2 className="font-black">Coupon Code</h2>
              <p className="mt-2 text-2xl font-black tracking-wide text-brand-blue">{offer.code}</p>
            </div>
          </div>
          <OfferRedeemForm offer={offer} />
        </div>
      </section>
    </>
  );
}
