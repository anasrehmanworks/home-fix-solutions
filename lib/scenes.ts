export type SceneKey =
  | "garage" | "duct" | "hvac" | "dryer" | "chimney" | "roof"
  | "plumbing" | "electric" | "lock" | "appliance" | "generic";

export function sceneForSlug(slug: string): SceneKey {
  if (slug.includes("garage")) return "garage";
  if (slug === "dryer-vent-cleaning") return "dryer";
  if (slug === "hvac") return "hvac";
  if (slug.includes("duct") || slug.includes("air-vent")) return "duct";
  if (slug.includes("chimney") || slug.includes("fireplace")) return "chimney";
  if (slug === "roofing") return "roof";
  if (slug === "plumbing") return "plumbing";
  if (slug === "electrician") return "electric";
  if (slug === "locksmith") return "lock";
  if (slug === "appliance-repair") return "appliance";
  return "generic";
}

export function sceneForHref(href: string): SceneKey {
  const slug = href.split("/").filter(Boolean).pop() ?? "";
  return sceneForSlug(slug);
}
