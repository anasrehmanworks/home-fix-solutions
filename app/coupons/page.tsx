import { JsonLd } from "@/components/JsonLd";
import { OffersSection } from "@/components/OffersSection";
import { PageHero } from "@/components/PageHero";
import { createMetadata, localBusinessSchema } from "@/lib/site";

export const metadata = createMetadata({
  title: "Coupons & Offers",
  description:
    "Current Home Fix Solution coupons for garage door repair and installation, opener installation, air duct cleaning, chimney cleaning, and new roof installation.",
  path: "/coupons"
});

export default function CouponsPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema("/coupons")} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Coupons" }]}
        eyebrow="Save On Service"
        title="Coupons & Offers"
        intro="Claim a coupon before booking and mention the code with your appointment request. One coupon per service visit."
      />
      <OffersSection />
    </>
  );
}
