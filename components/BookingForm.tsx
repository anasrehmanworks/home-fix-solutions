"use client";

import { CalendarClock, Check, ChevronRight, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getServicesByCategory, serviceCategories, statesServed } from "@/lib/site";
import type { ServiceCategory } from "@/lib/site";
import { DUCT_UNITS, followFor } from "@/lib/follow";

type Status = "idle" | "sending" | "sent" | "error";

const slots = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "Emergency Service"
];

const zipSuggestions: Record<string, string[]> = {
  "77001": ["Houston", "Sugar Land", "Katy", "Pearland", "Pasadena"],
  "23451": ["Virginia Beach", "Norfolk", "Chesapeake", "Portsmouth", "Hampton"],
  "10001": ["New York", "Chelsea", "Hudson Yards", "Midtown", "Union City"],
  "07030": ["Hoboken", "Jersey City", "Weehawken", "Union City", "North Bergen"]
};

const reviewLabels: Record<string, string> = {
  fullName: "Name",
  phone: "Phone",
  email: "Email",
  address: "Address",
  state: "State",
  zip: "ZIP",
  city: "Area",
  category: "Category",
  service: "Service",
  followUp: "Details",
  numberOfUnits: "Number of Units",
  preferredDate: "Preferred Date",
  appointmentSlot: "Requested Time"
};

const reviewOrder = [
  "fullName", "phone", "email", "address", "state", "zip", "city",
  "category", "service", "followUp", "numberOfUnits", "preferredDate", "appointmentSlot"
];

export function BookingForm({
  compact = false,
  tilt = false,
  initialCategory = "",
  initialService = ""
}: {
  compact?: boolean;
  tilt?: boolean;
  initialCategory?: ServiceCategory | "";
  initialService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [service, setService] = useState(initialService);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [zip, setZip] = useState("");
  const [tiltStyle, setTiltStyle] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const suggestions = zipSuggestions[zip.trim()] ?? [];
  const follow = followFor(service, category);
  const displayStep = step === 4 ? 3 : step;

  /* The service rack (and other in-page shortcuts) can pre-fill this form. */
  useEffect(() => {
    function onBook(event: Event) {
      const detail = (event as CustomEvent<{ category?: string; service?: string }>).detail;
      if (detail?.category) setCategory(detail.category);
      if (detail?.service) setService(detail.service);
    }
    window.addEventListener("hfs:book", onBook);
    return () => window.removeEventListener("hfs:book", onBook);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(id);
  }, [toast]);

  async function submit() {
    setStatus("sending");
    setMessage("");
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.set(key, value);
    }
    const response = await fetch("/api/book", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string };
    setStatus(response.ok ? "sent" : "error");
    const text = data.message ?? (response.ok ? "Request received." : "Please check the form and try again.");
    setMessage(text);
    setToast(text);
    if (response.ok) {
      const w = window as Window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "lead_form_success" });
    }
  }

  function handleAction(formData: FormData) {
    const stepValues = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
    );
    if (step < 4) {
      setValues((current) => ({ ...current, ...stepValues }));
      setStep(step + 1);
    } else {
      void submit();
    }
  }

  function onTiltMove(e: React.PointerEvent) {
    if (!tilt || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = formRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle(`perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`);
  }

  const gridCls = compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2";
  const wideCls = compact ? "grid gap-1" : "grid gap-1 md:col-span-2";

  return (
    <>
      <form
        ref={formRef}
        action={handleAction}
        className="premium-form"
        style={tilt ? { transform: tiltStyle, transformStyle: "preserve-3d", transition: "transform 0.25s ease-out" } : undefined}
        onPointerMove={onTiltMove}
        onPointerLeave={() => setTiltStyle("")}
      >
        <div className="premium-form-header">
          <span className="premium-icon"><CalendarClock size={22} /></span>
          <div className="min-w-0">
            <p className="step-pill w-fit">{step === 4 ? "Review" : `Step ${step} of 3`}</p>
            <h2 className="mt-2 text-xl font-black text-white">Book Service</h2>
          </div>
        </div>

        <div className="flex items-center gap-0" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-1 items-center last:flex-none">
              <span className={`grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border-2 font-heading text-[0.82rem] font-extrabold transition-all duration-300 ${displayStep > item ? "border-brand-blue bg-brand-blue text-white" : displayStep === item ? "border-brand-blue bg-brand-blue text-white shadow-[0_6px_14px_-6px_rgba(0,80,160,0.55)]" : "border-transparent bg-white/10 text-slate-400"}`}>
                {displayStep > item ? <Check size={15} /> : item}
              </span>
              {item < 3 && (
                <span className="mx-[7px] h-[3px] flex-1 overflow-hidden rounded bg-white/10">
                  <span className={`block h-full bg-brand-blue transition-all duration-500 ${displayStep > item ? "w-full" : "w-0"}`} />
                </span>
              )}
            </div>
          ))}
        </div>

        <div key={step} className="step-in">
          {step === 1 && (
            <div className={gridCls}>
              <label className={wideCls}>
                <span className="label">Full Name</span>
                <input className="field" name="fullName" required autoComplete="name" defaultValue={values.fullName ?? ""} suppressHydrationWarning />
              </label>
              <label className="grid gap-1">
                <span className="label">Phone Number</span>
                <input className="field" name="phone" required autoComplete="tel" defaultValue={values.phone ?? ""} suppressHydrationWarning />
              </label>
              <label className="grid gap-1">
                <span className="label">Email Address</span>
                <input className="field" name="email" type="email" required autoComplete="email" defaultValue={values.email ?? ""} suppressHydrationWarning />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className={gridCls}>
              <label className={wideCls}>
                <span className="label">Address</span>
                <input className="field" name="address" required autoComplete="street-address" defaultValue={values.address ?? ""} suppressHydrationWarning />
              </label>
              <label className="grid gap-1">
                <span className="label">State</span>
                <select className="field" name="state" required defaultValue={values.state ?? ""} suppressHydrationWarning>
                  <option value="" disabled>Select a state</option>
                  {statesServed.map((state) => <option key={state}>{state}</option>)}
                </select>
              </label>
              <label className="grid gap-1">
                <span className="label">ZIP Code</span>
                <input className="field" name="zip" required autoComplete="postal-code" value={zip || values.zip || ""} onChange={(event) => setZip(event.target.value)} suppressHydrationWarning />
              </label>
              {suggestions.length > 0 && (
                <fieldset className={compact ? "grid gap-3" : "grid gap-3 md:col-span-2"}>
                  <legend className="label mb-2">Nearby Cities / Areas</legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {suggestions.map((city) => (
                      <label key={city} className="slot-card">
                        <input name="city" type="radio" value={city} required suppressHydrationWarning />
                        {city}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          )}

          {step === 3 && (
            <div className={gridCls}>
              <label className="grid gap-1">
                <span className="label">Category</span>
                <select
                  className="field"
                  name="category"
                  required
                  value={category}
                  suppressHydrationWarning
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setService("");
                  }}
                >
                  <option value="">Select Category</option>
                  {serviceCategories.map((item) => <option key={item} value={item}>{item}</option>)}
                  {category === "Appliance Repair" && <option value="Appliance Repair">Appliance Repair</option>}
                </select>
              </label>
              {category && (
                <label className="grid gap-1">
                  <span className="label">Service</span>
                  <select className="field" name="service" required value={service} onChange={(event) => setService(event.target.value)} suppressHydrationWarning>
                    <option value="" disabled>Select a service</option>
                    {getServicesByCategory(category as ServiceCategory).map((item) => (
                      <option key={item.slug} value={item.title}>{item.title}</option>
                    ))}
                    {category === "Appliance Repair" && <option value="Appliance Repair">Appliance Repair</option>}
                  </select>
                </label>
              )}

              {follow && service && (
                <label className={wideCls}>
                  <span className="label">{follow.label}</span>
                  <select className="field" name="followUp" defaultValue={values.followUp ?? ""} suppressHydrationWarning>
                    <option value="">Select…</option>
                    {follow.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              )}

              {category === "Air Duct Cleaning" && (
                <fieldset className={compact ? "grid gap-3" : "grid gap-3 md:col-span-2"}>
                  <legend className="label mb-2">Number of Units</legend>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {DUCT_UNITS.map((unit) => (
                      <label key={unit} className="slot-card">
                        <input name="numberOfUnits" type="radio" value={unit} suppressHydrationWarning />
                        {unit}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <label className={wideCls}>
                <span className="label">Preferred Date</span>
                <input className="field" name="preferredDate" type="date" required defaultValue={values.preferredDate ?? ""} suppressHydrationWarning />
              </label>
              <fieldset className={compact ? "grid gap-3" : "grid gap-3 md:col-span-2"}>
                <legend className="label mb-2">Requested Time Slot</legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {slots.map((slot) => (
                    <label key={slot} className="slot-card">
                      <input name="appointmentSlot" type="radio" value={slot} required suppressHydrationWarning />
                      {slot}
                    </label>
                  ))}
                </div>
                <p className="text-xs font-semibold leading-5 text-slate-400">
                  Your requested time is subject to confirmation — we&apos;ll confirm your appointment by phone. Slots are requests, not guaranteed availability.
                </p>
              </fieldset>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-xl border border-white/10 bg-smoke p-4 sm:p-5">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                {reviewOrder
                  .filter((key) => values[key])
                  .map((key) => (
                    <div key={key} className="contents">
                      <dt className="pt-0.5 text-[0.74rem] font-extrabold uppercase tracking-[0.08em] text-slate-400">{reviewLabels[key]}</dt>
                      <dd className="font-bold text-white">{values[key]}</dd>
                    </div>
                  ))}
              </dl>
              <p className="mt-4 text-xs font-semibold leading-5 text-slate-400">
                Your requested time is subject to confirmation — we&apos;ll confirm your appointment by phone.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          {step > 1 ? (
            <button type="button" className="btn-outline" onClick={() => setStep((current) => current - 1)} suppressHydrationWarning>
              Back
            </button>
          ) : <span />}
          <button className={step >= 3 ? "btn-primary" : "btn-secondary"} disabled={status === "sending"} suppressHydrationWarning>
            {step === 4 ? (
              <>
                <Send size={17} />
                {status === "sending" ? "Sending..." : "Confirm Booking"}
              </>
            ) : step === 3 ? (
              <>
                Review Booking <ChevronRight size={17} />
              </>
            ) : (
              <>
                Next <ChevronRight size={17} />
              </>
            )}
          </button>
        </div>
        {message && step === 4 && (
          <p className={status === "sent" ? "text-sm font-bold text-brand-sky" : "text-sm font-bold text-brand-red"}>
            {message}
          </p>
        )}
      </form>

      {toast && (
        <div className="toast-in fixed bottom-6 left-1/2 z-[300] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2.5 rounded-xl bg-charcoal px-5 py-3.5 text-center text-[0.92rem] font-bold text-white shadow-lift" role="status">
          <Check size={17} className="shrink-0 text-brand-sky" />
          {toast}
        </div>
      )}
    </>
  );
}
