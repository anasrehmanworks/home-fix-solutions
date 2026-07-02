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
      <section className="bg-brand-pale py-10">
        <div className="section-shell"><Breadcrumbs items={[{ label: "Offers" }, { label: offer.title }]} /></div>
      </section>
      <section className="bg-white py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-brand-blue text-white">
              <BadgePercent size={30} />
            </div>
            <p className="text-sm font-black uppercase text-brand-red">Offer Details</p>
            <h1 className="mt-3 text-4xl font-black leading-tight">
              {offer.title}
            </h1>
            <p className="mt-5 text-5xl font-black text-brand-red">{offer.discount}</p>
            <p className="mt-3 text-xl font-bold text-slate-700">{offer.details}</p>
            <div className="mt-6 rounded-md border border-dashed border-brand-blue bg-brand-pale p-5">
              <h2 className="font-black">Coupon Code</h2>
              <p className="mt-2 text-2xl font-black text-brand-blue">{offer.code}</p>
            </div>
          </div>
          <OfferRedeemForm offer={offer} />
        </div>
      </section>
    </>
  );
}
