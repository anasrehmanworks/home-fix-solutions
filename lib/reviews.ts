/* All 8 genuine customer reviews, verified verbatim from the live site
   (homepage + /leave-a-review, checked 2026-11-25). Never add invented reviews. */
export type Review = { quote: string; name: string; service: string };

export const allReviews: Review[] = [
  {
    quote: "The technician arrived on time, diagnosed the broken roller issue quickly, and had the door running smoothly before dinner.",
    name: "Michael Reynolds",
    service: "Garage Door Repair"
  },
  {
    quote: "Our garage door was stuck halfway open. Home Fix Solution explained the spring replacement clearly and finished the work the same afternoon.",
    name: "Sarah Collins",
    service: "Garage Door Spring Replacement"
  },
  {
    quote: "The new opener is quiet, the remotes were programmed, and the safety sensors were tested before the technician left.",
    name: "Daniel Brooks",
    service: "Garage Door Opener Installation"
  },
  {
    quote: "The installation team helped us choose a clean modern door that looks great with the house and seals much better than the old one.",
    name: "Priya Shah",
    service: "Garage Door Installation"
  },
  {
    quote: "A frayed cable made the door crooked. The repair was neat, professional, and the technician checked the full system afterward.",
    name: "Anthony Miller",
    service: "Garage Door Cable Repair"
  },
  {
    quote: "We needed help after the door came off track. They secured it, repaired it, and made sure it opened evenly again.",
    name: "Lauren Hughes",
    service: "Emergency Garage Door Repair"
  },
  {
    quote: "The vents looked noticeably cleaner and the house felt fresher after the duct cleaning appointment.",
    name: "Jessica Morgan",
    service: "Air Duct Cleaning"
  },
  {
    quote: "The fireplace looks cleaner, the inspection notes were easy to understand, and the technician left the room spotless.",
    name: "Robert Ellis",
    service: "Chimney Cleaning"
  }
];

/** A review genuinely about this exact service wins; otherwise a same-family one. */
export function reviewForService(serviceTitle: string, slug: string): Review | undefined {
  const exact = allReviews.find((r) => r.service === serviceTitle);
  if (exact) return exact;
  if (slug.includes("garage")) return allReviews[0];
  if (slug.includes("duct") || slug.includes("dryer")) return allReviews.find((r) => r.service === "Air Duct Cleaning");
  if (slug.includes("chimney") || slug.includes("fireplace")) return allReviews.find((r) => r.service === "Chimney Cleaning");
  return undefined;
}
