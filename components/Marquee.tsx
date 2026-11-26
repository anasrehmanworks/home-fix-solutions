const items = [
  "Garage Door",
  "Air Duct Cleaning",
  "Chimney Cleaning",
  "Plumbing",
  "Electrician",
  "Locksmith",
  "Roofing",
  "HVAC",
  "Dryer Vent Cleaning",
  "Appliance Repair"
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-white/10 bg-night py-4 text-white" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-12 whitespace-nowrap px-6 font-heading text-sm font-extrabold uppercase tracking-[0.14em]"
              >
                {item}
                <span className="h-[7px] w-[7px] rotate-45 rounded-[2px] bg-brand-blue" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
