import type { Metadata } from "next";

export const site = {
  name: "Home Fix Solution",
  phone: "757-908-4102",
  phoneHref: "tel:+17579084102",
  url: "https://homefixsolution.com",
  description:
    "Professional garage door services, air duct cleaning, and chimney cleaning for homeowners and businesses across 30+ states.",
  primaryCity: "Virginia Beach",
  primaryState: "VA",
  logo: "/logo-horizontal.png",
  logoIcon: "/logo-icon.png",
  heroImage:
    "/site-images/garage-door-new-installation.jpg"
};

export const statesServed = [
  "Alabama",
  "Arizona",
  "California",
  "Colorado",
  "Connecticut",
  "Florida",
  "Georgia",
  "Hawaii",
  "Illinois",
  "Indiana",
  "Louisiana",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Missouri",
  "Nevada",
  "New Jersey",
  "New York",
  "North Carolina",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "South Carolina",
  "Tennessee",
  "Texas",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "District of Columbia (Washington, DC)"
];

export type ServiceCategory = "Garage Door" | "Air Duct Cleaning" | "Chimney Cleaning";

export type ServicePage = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  emphasis: string;
  image: string;
  services: string[];
  signs: string[];
  faqs: { question: string; answer: string }[];
};

const garageImage = "/site-images/garage-door-repair.jpg";
const ductImage = "/site-images/air-duct-cleaning.jpg";
const chimneyImage = "/site-images/chimney-cleaning.jpg";

const serviceImageOverrides: Record<string, string> = {
  "garage-door-repair": "/site-images/garage-door-repair.jpg",
  "garage-door-installation": "/site-images/garage-door-installation.jpg",
  "garage-door-opener-repair": "/site-images/garage-door-opener-repair.jpg",
  "garage-door-opener-installation": "/site-images/garage-door-opener-installation.jpg",
  "garage-door-spring-repair": "/site-images/garage-door-spring-repair.jpg",
  "garage-door-spring-replacement": "/site-images/garage-door-spring-replacement.jpg",
  "garage-door-cable-repair": "/site-images/garage-door-cable-repair.jpg",
  "garage-door-panel-replacement": "/site-images/garage-panel-replacement.jpg",
  "garage-door-maintenance": "/site-images/garage-door-maintenance.jpg",
  "garage-door-tune-up": "/site-images/garage-door-maintenance.jpg",
  "emergency-garage-door-repair": "/site-images/garage-door-repair.jpg",
  "commercial-garage-door-repair": "/site-images/garage-door-new-installation.jpg",
  "air-duct-cleaning": "/site-images/air-duct-cleaning.jpg",
  "dryer-vent-cleaning": "/site-images/dryer-vent-cleaning.jpg",
  "hvac-duct-cleaning": "/site-images/hvac-duct-cleaning.jpg",
  "air-vent-sanitizing": "/site-images/air-vent-sanitizing.jpg",
  "residential-duct-cleaning": "/site-images/residential-duct-cleaning.jpg",
  "commercial-duct-cleaning": "/site-images/commercial-duct-cleaning.jpg",
  "chimney-cleaning": "/site-images/chimney-cleaning.jpg",
  "chimney-inspection": "/site-images/chimney-inspection.jpg",
  "chimney-repair": "/site-images/chimney-repair.jpg",
  "chimney-cap-installation": "/site-images/chimney-cap-installation.jpg",
  "chimney-waterproofing": "/site-images/chimney-waterproofing.jpg",
  "fireplace-cleaning": "/site-images/fireplace-cleaning.jpg"
};

const garageSigns = [
  "The door is noisy, uneven, stuck, or moving slower than usual.",
  "Springs, cables, rollers, tracks, hinges, or panels show visible wear.",
  "The opener hums, reverses unexpectedly, or loses remote connection.",
  "You need a safer door system for a home, rental, shop, or commercial bay."
];

const ductSigns = [
  "Dust returns quickly after cleaning or vents have visible buildup.",
  "Rooms feel stuffy, airflow is weak, or allergy symptoms are worse indoors.",
  "A dryer takes too long to dry clothes or the laundry area feels hot.",
  "You recently remodeled, moved in, or want a cleaner HVAC system."
];

const chimneySigns = [
  "The fireplace smells smoky, drafts poorly, or leaves excessive soot.",
  "Brick, mortar, flashing, caps, or crowns show cracking or moisture damage.",
  "You need an annual inspection before the burn season.",
  "Animals, leaves, nests, or debris may be blocking the flue."
];

const garageFaqs = [
  {
    question: "Can you help with same-day garage door problems?",
    answer:
      "Yes. Availability depends on your state, city, and schedule, but urgent garage door calls are handled as quickly as scheduling allows because a stuck or damaged door can affect safety and access."
  },
  {
    question: "Should I repair or replace my garage door?",
    answer:
      "A technician can compare the condition of the panels, track, hardware, opener, and safety systems. Minor component failures often make sense to repair, while severe panel damage or an aging system may be better replaced."
  }
];

const ductFaqs = [
  {
    question: "How often should air ducts be cleaned?",
    answer:
      "Many homes benefit from service every few years, but pets, remodeling dust, moisture concerns, and allergies can make a shorter interval reasonable."
  },
  {
    question: "Do you clean dryer vents too?",
    answer:
      "Yes. Dryer vent cleaning is available as a focused service or as part of a broader indoor air quality visit."
  }
];

const chimneyFaqs = [
  {
    question: "Do chimneys need an annual inspection?",
    answer:
      "Annual inspection is strongly recommended before regular fireplace use, especially after storms, long periods without use, or visible exterior damage."
  },
  {
    question: "Can chimney cleaning help with smoke issues?",
    answer:
      "Cleaning can remove soot and debris that restrict draft. If the smoke issue has another cause, the technician can document likely next steps."
  }
];

export const servicePages: ServicePage[] = [
  {
    slug: "garage-door-repair",
    title: "Garage Door Repair",
    category: "Garage Door",
    summary:
      "Responsive repair for stuck, loud, crooked, off-track, or unreliable garage doors.",
    emphasis:
      "Every garage door repair visit focuses on restoring safe movement, dependable access, and long-term hardware performance.",
    image: garageImage,
    services: ["Track alignment", "Roller and hinge repair", "Safety sensor checks", "Hardware replacement"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-installation",
    title: "Garage Door Installation",
    category: "Garage Door",
    summary:
      "Professional installation for new garage doors with careful sizing, balance, and finish selection.",
    emphasis:
      "A new garage door should look sharp, operate quietly, seal well, and match the way your household or business uses the space every day.",
    image: garageImage,
    services: ["Door sizing", "Insulated options", "Track setup", "Final safety testing"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-opener-repair",
    title: "Garage Door Opener Repair",
    category: "Garage Door",
    summary:
      "Troubleshooting and repair for openers, remotes, wall controls, keypads, sensors, and drive systems.",
    emphasis:
      "Opener problems can look simple from the outside, but correct diagnosis protects the motor, door balance, photo eyes, and force settings.",
    image: garageImage,
    services: ["Motor diagnostics", "Remote programming", "Sensor alignment", "Drive adjustment"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-opener-installation",
    title: "Garage Door Opener Installation",
    category: "Garage Door",
    summary:
      "Installation of quiet, reliable garage door openers matched to your door size and usage.",
    emphasis:
      "The best opener is not just strong enough; it is properly mounted, calibrated, tested, and easy for everyone in the property to use.",
    image: garageImage,
    services: ["Opener selection", "Rail installation", "Smart setup", "Safety reversal testing"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-spring-repair",
    title: "Garage Door Spring Repair",
    category: "Garage Door",
    summary:
      "Repair for worn, noisy, stretched, or failing garage door spring systems.",
    emphasis:
      "Springs carry the door's weight, so spring issues should be handled by trained technicians with careful safety checks.",
    image: garageImage,
    services: ["Spring inspection", "Balance testing", "Bearing checks", "Cable review"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-spring-replacement",
    title: "Garage Door Spring Replacement",
    category: "Garage Door",
    summary:
      "Replacement of broken or exhausted garage door springs with proper balancing and cycle testing.",
    emphasis:
      "A broken spring can trap vehicles, overload openers, and make the door dangerous to lift. Replacement restores controlled movement.",
    image: garageImage,
    services: ["Torsion springs", "Extension springs", "Door balancing", "Lubrication"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-cable-repair",
    title: "Garage Door Cable Repair",
    category: "Garage Door",
    summary:
      "Cable repair for frayed, loose, snapped, or drum-wrapped garage door cables.",
    emphasis:
      "Cables work with springs to lift the door evenly. A damaged cable can quickly turn a minor issue into an off-track door.",
    image: garageImage,
    services: ["Cable replacement", "Drum inspection", "Track review", "Spring balance checks"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-panel-replacement",
    title: "Garage Door Panel Replacement",
    category: "Garage Door",
    summary:
      "Panel replacement for dented, cracked, weather-damaged, or impact-damaged garage doors.",
    emphasis:
      "When the rest of the door is in good condition, targeted panel replacement can restore appearance and performance without a full door change.",
    image: garageImage,
    services: ["Panel matching", "Section replacement", "Seal review", "Hardware checks"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-maintenance",
    title: "Garage Door Maintenance",
    category: "Garage Door",
    summary:
      "Preventive maintenance that keeps residential and commercial garage doors safer, quieter, and smoother.",
    emphasis:
      "Maintenance catches loose hardware, dry rollers, weak springs, and small alignment issues before they interrupt your day.",
    image: garageImage,
    services: ["Lubrication", "Fastener tightening", "Balance testing", "Weather seal checks"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "garage-door-tune-up",
    title: "Garage Door Tune-Up",
    category: "Garage Door",
    summary:
      "Focused garage door tune-up service for noise reduction, smoother movement, and safety checks.",
    emphasis:
      "A tune-up is ideal when the door still works but feels rough, loud, shaky, or overdue for professional attention.",
    image: garageImage,
    services: ["Noise reduction", "Roller inspection", "Sensor testing", "Opener force review"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "emergency-garage-door-repair",
    title: "Emergency Garage Door Repair",
    category: "Garage Door",
    summary:
      "Responsive support for garage doors that are stuck open, stuck closed, damaged, or unsafe.",
    emphasis:
      "Emergency garage door issues affect security and daily access, so the goal is fast stabilization followed by a clear repair path.",
    image: garageImage,
    services: ["Stuck door service", "Off-track correction", "Broken spring response", "Security-focused repairs"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "commercial-garage-door-repair",
    title: "Commercial Garage Door Repair",
    category: "Garage Door",
    summary:
      "Repair support for commercial garage doors, shop doors, rolling doors, and busy access points.",
    emphasis:
      "Commercial doors need dependable uptime, clear scheduling, and repairs that respect business operations and safety requirements.",
    image: garageImage,
    services: ["Sectional doors", "Rolling doors", "High-use hardware", "Preventive service"],
    signs: garageSigns,
    faqs: garageFaqs
  },
  {
    slug: "air-duct-cleaning",
    title: "Air Duct Cleaning",
    category: "Air Duct Cleaning",
    summary:
      "Detailed duct cleaning to reduce buildup inside supply and return ductwork.",
    emphasis:
      "Clean ducts support better airflow, fresher rooms, and a more comfortable indoor environment throughout the property.",
    image: ductImage,
    services: ["Supply vents", "Return ducts", "Register cleaning", "System review"],
    signs: ductSigns,
    faqs: ductFaqs
  },
  {
    slug: "dryer-vent-cleaning",
    title: "Dryer Vent Cleaning",
    category: "Air Duct Cleaning",
    summary:
      "Dryer vent cleaning that helps improve drying performance and reduce lint restrictions.",
    emphasis:
      "Lint buildup can waste energy, slow laundry routines, and create avoidable safety concerns around the dryer.",
    image: ductImage,
    services: ["Vent clearing", "Exterior hood checks", "Airflow review", "Lint removal"],
    signs: ductSigns,
    faqs: ductFaqs
  },
  {
    slug: "hvac-duct-cleaning",
    title: "HVAC Duct Cleaning",
    category: "Air Duct Cleaning",
    summary:
      "HVAC duct cleaning for heating and cooling systems with dusty or restricted ductwork.",
    emphasis:
      "A cleaner duct system helps conditioned air move more freely and supports a cleaner living or work environment.",
    image: ductImage,
    services: ["HVAC duct review", "Vent cleaning", "Dust removal", "Airflow observations"],
    signs: ductSigns,
    faqs: ductFaqs
  },
  {
    slug: "air-vent-sanitizing",
    title: "Air Vent Sanitizing",
    category: "Air Duct Cleaning",
    summary:
      "Air vent sanitizing for homes and businesses that want a cleaner, fresher indoor air pathway.",
    emphasis:
      "Sanitizing is often chosen after cleaning, remodeling, odor events, moisture concerns, or tenant turnover.",
    image: ductImage,
    services: ["Vent treatment", "Odor support", "Post-cleaning application", "Register care"],
    signs: ductSigns,
    faqs: ductFaqs
  },
  {
    slug: "residential-duct-cleaning",
    title: "Residential Duct Cleaning",
    category: "Air Duct Cleaning",
    summary:
      "Residential duct cleaning for houses, townhomes, condos, and rental properties.",
    emphasis:
      "Your home should feel comfortable from room to room, and clean ductwork can be one practical part of that maintenance plan.",
    image: ductImage,
    services: ["Home duct cleaning", "Pet dust support", "Move-in cleaning", "Vent inspection"],
    signs: ductSigns,
    faqs: ductFaqs
  },
  {
    slug: "commercial-duct-cleaning",
    title: "Commercial Duct Cleaning",
    category: "Air Duct Cleaning",
    summary:
      "Commercial duct cleaning for offices, shops, service locations, and shared facilities.",
    emphasis:
      "Businesses need clean, efficient air pathways with scheduling that respects staff, customers, tenants, and operating hours.",
    image: ductImage,
    services: ["Office ducts", "Retail spaces", "Facility scheduling", "Airflow review"],
    signs: ductSigns,
    faqs: ductFaqs
  },
  {
    slug: "chimney-cleaning",
    title: "Chimney Cleaning",
    category: "Chimney Cleaning",
    summary:
      "Chimney cleaning to remove soot, residue, and debris before regular fireplace use.",
    emphasis:
      "A clean chimney supports safer fires, better draft, and fewer smoky surprises when temperatures drop.",
    image: chimneyImage,
    services: ["Soot removal", "Flue cleaning", "Firebox care", "Draft observations"],
    signs: chimneySigns,
    faqs: chimneyFaqs
  },
  {
    slug: "chimney-inspection",
    title: "Chimney Inspection",
    category: "Chimney Cleaning",
    summary:
      "Chimney inspection for homeowners who want clear documentation before using or repairing a fireplace.",
    emphasis:
      "Inspection helps identify cracks, blockage, moisture entry, cap problems, and other issues before they become expensive.",
    image: chimneyImage,
    services: ["Visual inspection", "Flue review", "Exterior observations", "Repair recommendations"],
    signs: chimneySigns,
    faqs: chimneyFaqs
  },
  {
    slug: "chimney-repair",
    title: "Chimney Repair",
    category: "Chimney Cleaning",
    summary:
      "Chimney repair support for masonry, caps, flashing, crowns, moisture issues, and visible wear.",
    emphasis:
      "Timely chimney repair protects the roofline, fireplace system, and surrounding structure from ongoing deterioration.",
    image: chimneyImage,
    services: ["Masonry repair", "Flashing support", "Crown repair", "Moisture troubleshooting"],
    signs: chimneySigns,
    faqs: chimneyFaqs
  },
  {
    slug: "chimney-cap-installation",
    title: "Chimney Cap Installation",
    category: "Chimney Cleaning",
    summary:
      "Chimney cap installation to help keep out rain, leaves, animals, sparks, and debris.",
    emphasis:
      "A properly fitted chimney cap is a small upgrade that can prevent recurring blockages and moisture problems.",
    image: chimneyImage,
    services: ["Cap sizing", "Spark arrestor options", "Rain protection", "Debris prevention"],
    signs: chimneySigns,
    faqs: chimneyFaqs
  },
  {
    slug: "chimney-waterproofing",
    title: "Chimney Waterproofing",
    category: "Chimney Cleaning",
    summary:
      "Chimney waterproofing to help reduce water absorption and exterior masonry damage.",
    emphasis:
      "Water is one of the biggest long-term threats to chimney masonry, crowns, flashing, and nearby building materials.",
    image: chimneyImage,
    services: ["Masonry protection", "Leak observations", "Crown review", "Exterior treatment"],
    signs: chimneySigns,
    faqs: chimneyFaqs
  },
  {
    slug: "fireplace-cleaning",
    title: "Fireplace Cleaning",
    category: "Chimney Cleaning",
    summary:
      "Fireplace cleaning for cleaner fireboxes, better presentation, and seasonal readiness.",
    emphasis:
      "A clean fireplace is easier to inspect, more pleasant to use, and better prepared for comfortable nights at home.",
    image: chimneyImage,
    services: ["Firebox cleaning", "Ash and soot removal", "Damper review", "Seasonal preparation"],
    signs: chimneySigns,
    faqs: chimneyFaqs
  }
].map((service) => ({
  ...service,
  image: serviceImageOverrides[service.slug] ?? service.image
} as ServicePage));

export const beforeAfterGallery = [
  {
    title: "Garage Door",
    image: "/site-images/garage-door-before-after.jpg",
    description: "Clean garage door upgrades that improve curb appeal and daily access."
  },
  {
    title: "Air Duct Cleaning",
    image: "/site-images/air-duct-before-after.jpg",
    description: "Visible duct cleaning results for fresher airflow and cleaner vents."
  },
  {
    title: "Chimney Cleaning",
    image: "/site-images/chimney-cleaning-before-after.jpg",
    description: "Fireplace and chimney cleaning that prepares the system for safer use."
  }
];

export const couponShowcase = [
  { title: "Garage Door", image: "/site-images/garage-door-new-installation.jpg" },
  { title: "Air Duct Cleaning", image: "/site-images/air-duct.jpg" },
  { title: "Chimney Cleaning", image: "/site-images/chimney-cleaning.jpg" }
];

export const customerReviews = [
  {
    name: "Michael Reynolds",
    service: "Garage Door Repair",
    text: "The technician arrived on time, diagnosed the broken roller issue quickly, and had the door running smoothly before dinner."
  },
  {
    name: "Sarah Collins",
    service: "Garage Door Spring Replacement",
    text: "Our garage door was stuck halfway open. Home Fix Solution explained the spring replacement clearly and finished the work the same afternoon."
  },
  {
    name: "Daniel Brooks",
    service: "Garage Door Opener Installation",
    text: "The new opener is quiet, the remotes were programmed, and the safety sensors were tested before the technician left."
  },
  {
    name: "Priya Shah",
    service: "Garage Door Installation",
    text: "The installation team helped us choose a clean modern door that looks great with the house and seals much better than the old one."
  },
  {
    name: "Anthony Miller",
    service: "Garage Door Cable Repair",
    text: "A frayed cable made the door crooked. The repair was neat, professional, and the technician checked the full system afterward."
  },
  {
    name: "Lauren Hughes",
    service: "Emergency Garage Door Repair",
    text: "We needed help after the door came off track. They secured it, repaired it, and made sure it opened evenly again."
  },
  {
    name: "Jessica Morgan",
    service: "Air Duct Cleaning",
    text: "The vents looked noticeably cleaner and the house felt fresher after the duct cleaning appointment."
  },
  {
    name: "Robert Ellis",
    service: "Chimney Cleaning",
    text: "The fireplace looks cleaner, the inspection notes were easy to understand, and the technician left the room spotless."
  }
];

export const primaryServices = [
  {
    title: "Garage Door",
    slug: "garage-door-repair",
    image: "/site-images/garage-door-new-installation.jpg",
    description:
      "Repair, installation, openers, springs, cables, panels, maintenance, tune-ups, emergency service, and commercial support.",
    featured: false
  },
  {
    title: "Air Duct Cleaning",
    slug: "air-duct-cleaning",
    image: "/site-images/air-duct.jpg",
    description:
      "Duct cleaning, dryer vent cleaning, HVAC duct cleaning, sanitizing, and residential or commercial service.",
    featured: false
  },
  {
    title: "Chimney Cleaning",
    slug: "chimney-cleaning",
    image: "/site-images/chimney-cleaning.jpg",
    description:
      "Cleaning, inspections, repair support, cap installation, waterproofing, and fireplace preparation.",
    featured: false
  }
];

export function getServicesByCategory(category: ServiceCategory) {
  return servicePages.filter((service) => service.category === category);
}

export function getService(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}

export const serviceCategories: ServiceCategory[] = ["Garage Door", "Air Duct Cleaning", "Chimney Cleaning"];

export const offers = [
  {
    slug: "garage-door-repair-10-off",
    title: "Garage Door Repair",
    discount: "$10 OFF",
    details: "Repairs up to $150",
    code: "HFSREPAIR10",
    category: "Garage Door" as ServiceCategory,
    serviceSlug: "garage-door-repair"
  },
  {
    slug: "garage-door-installation-80-off",
    title: "New Garage Door Installation",
    discount: "$80 OFF",
    details: "Minimum purchase: $2,000",
    code: "HFSINSTALL80",
    category: "Garage Door" as ServiceCategory,
    serviceSlug: "garage-door-installation"
  },
  {
    slug: "garage-door-opener-installation-25-off",
    title: "Garage Door Opener Installation",
    discount: "$25 OFF",
    details: "Minimum purchase: $500",
    code: "HFSOPENER25",
    category: "Garage Door" as ServiceCategory,
    serviceSlug: "garage-door-opener-installation"
  },
  {
    slug: "air-duct-cleaning-10-off",
    title: "Air Duct Cleaning",
    discount: "$10 OFF",
    details: "Air duct cleaning service",
    code: "HFSDUCT10",
    category: "Air Duct Cleaning" as ServiceCategory,
    serviceSlug: "air-duct-cleaning"
  },
  {
    slug: "chimney-cleaning-10-off",
    title: "Chimney Cleaning",
    discount: "$10 OFF",
    details: "Chimney cleaning service",
    code: "HFSCHIMNEY10",
    category: "Chimney Cleaning" as ServiceCategory,
    serviceSlug: "chimney-cleaning"
  }
];

export function getOffer(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = site.heroImage
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export function localBusinessSchema(path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${site.url}${path}`,
    telephone: site.phone,
    image: site.heroImage,
    areaServed: statesServed.map((state) => ({ "@type": "State", name: state })),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.primaryCity,
      addressRegion: site.primaryState,
      addressCountry: "US"
    },
    serviceType: ["Garage Door Services", "Air Duct Cleaning", "Chimney Cleaning"]
  };
}
