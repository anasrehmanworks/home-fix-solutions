import type { MetadataRoute } from "next";
import { offers, servicePages, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/areas-we-serve",
    "/careers",
    "/contact",
    "/leave-a-review",
    "/privacy-policy",
    "/terms-and-conditions"
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7
    })),
    ...servicePages.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85
    })),
    ...offers.map((offer) => ({
      url: `${site.url}/offers/${offer.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
