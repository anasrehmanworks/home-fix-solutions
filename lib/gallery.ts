/* Before/after pairs for the comparison sliders.
   Garage, duct and roofing pairs are matched-scene images (same view, before
   state vs after state). Chimney uses the site's own before/after photo,
   split into its two halves. Images ship as SVG-wrapped JPEGs so they can be
   delivered through the same text-based pipeline as the logo. */
export type GalleryItem = {
  title: string;
  before: string;
  after: string;
  description: string;
};

export const beforeAfterPairs: GalleryItem[] = [
  {
    title: "Garage Door",
    before: "/site-images/garage-before.svg",
    after: "/site-images/garage-after.svg",
    description: "Clean garage door upgrades that improve curb appeal and daily access."
  },
  {
    title: "Air Duct Cleaning",
    before: "/site-images/duct-before.svg",
    after: "/site-images/duct-after.svg",
    description: "Visible duct cleaning results for fresher airflow and cleaner vents."
  },
  {
    title: "Chimney Cleaning",
    before: "/site-images/chimney-before.svg",
    after: "/site-images/chimney-after.svg",
    description: "Fireplace and chimney cleaning that prepares the system for safer use."
  },
  {
    title: "Roofing",
    before: "/site-images/roof-before.svg",
    after: "/site-images/roof-after.svg",
    description: "Worn, damaged shingles replaced with a clean, watertight new roof."
  }
];

export const familyPairs: Record<string, { before: string; after: string; label: string }> = {
  "Garage Door": { before: "/site-images/garage-before.svg", after: "/site-images/garage-after.svg", label: "Garage Door Results" },
  "Air Duct Cleaning": { before: "/site-images/duct-before.svg", after: "/site-images/duct-after.svg", label: "Air Duct Cleaning Results" },
  "Chimney Cleaning": { before: "/site-images/chimney-before.svg", after: "/site-images/chimney-after.svg", label: "Chimney Cleaning Results" },
  Roofing: { before: "/site-images/roof-before.svg", after: "/site-images/roof-after.svg", label: "Roofing Results" }
};
