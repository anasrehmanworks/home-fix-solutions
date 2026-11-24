/* Per-service booking follow-up questions — ported exactly from the approved v3.1 design. */
export const FOLLOW: Record<string, { label: string; options: string[] }> = {
  "Garage Door": {
    label: "What's happening with the door?",
    options: ["Stuck or won't open", "Broken spring", "Opener not working", "New door installation", "Noisy or off track", "Something else"]
  },
  "Air Duct Cleaning": {
    label: "What Happens With Your Duct?",
    options: [
      "Dust returns quickly / visible vent build-up",
      "Weak airflow or stuffy rooms",
      "Allergy symptoms worse indoors",
      "Recent remodel or move-in",
      "Air Duct Repair",
      "Air Duct Installation"
    ]
  },
  "Dryer Vent Cleaning": {
    label: "How is the dryer behaving?",
    options: ["Clothes take too long to dry", "Vent has never been cleaned", "Visible lint build-up", "Routine cleaning"]
  },
  "Chimney Cleaning": {
    label: "When was the chimney last swept?",
    options: ["Within the last year", "1–3 years ago", "More than 3 years ago", "Never / not sure"]
  },
  Plumbing: {
    label: "What's the plumbing issue?",
    options: ["Leak", "Clog or drain backup", "Fixture install or repair", "Water heater", "Something else"]
  },
  Electrician: {
    label: "What needs attention?",
    options: ["Outlet or switch", "Lighting", "Breaker or panel", "Fixture install", "Something else"]
  },
  Locksmith: {
    label: "What do you need?",
    options: ["I'm locked out", "Rekey the locks", "Replace the locks", "Smart lock install"]
  },
  Roofing: {
    label: "What does the roof need?",
    options: ["Leak repair", "Inspection", "General repair", "Full replacement", "New roof installation"]
  },
  HVAC: {
    label: "What does the system need?",
    options: ["Cooling repair", "Heating repair", "Maintenance / tune-up", "New system quote"]
  },
  "Appliance Repair": {
    label: "Which appliance needs repair?",
    options: ["Refrigerator", "Washer", "Dryer", "Dishwasher", "Oven or range", "Something else"]
  }
};

export const DUCT_UNITS = ["1", "1–2", "2–6", "More than 10"];

export function followFor(serviceTitle: string, category: string) {
  return FOLLOW[serviceTitle] ?? FOLLOW[category];
}
