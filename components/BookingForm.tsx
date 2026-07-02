"use client";

import { CalendarClock, Check, ChevronRight, Send } from "lucide-react";
import { useState } from "react";
import { getServicesByCategory, serviceCategories, statesServed } from "@/lib/site";
import type { ServiceCategory } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const slots = ["8 AM - 10 AM", "10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM", "Emergency Service"];
const zipSuggestions: Record<string, string[]> = {
  "77001": ["Houston", "Sugar Land", "Katy", "Pearland", "Pasadena"],
  "23451": ["Virginia Beach", "Norfolk", "Chesapeake", "Portsmouth", "Hampton"],
  "10001": ["New York", "Chelsea", "Hudson Yards", "Midtown", "Union City"],
  "07030": ["Hoboken", "Jersey City", "Weehawken", "Union City", "North Bergen"]
};

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "">("");
  const [service, setService] = useState("");
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [zip, setZip] = useState("");

  const suggestions = zipSuggestions[zip.trim()] ?? [];

  async function submit(formData: FormData) {
    setStatus("sending");
    setMessage("");
    for (const [key, value] of Object.entries(values)) {
      formData.set(key, value);
    }
    const response = await fetch("/api/book", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string };
    setStatus(response.ok ? "sent" : "error");
    setMessage(data.message ?? (response.ok ? "Request received." : "Please check the form and try again."));
  }

  function advance(formData: FormData, nextStep: number) {
    const nextValues = Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, String(value)]));
    setValues((current) => ({ ...current, ...nextValues }));
    if (nextStep === 3) {
      setCategory("");
      setService("");
    }
    setStep(nextStep);
  }

  return (
    <form action={step === 3 ? submit : (formData) => advance(formData, step + 1)} className="premium-form">
      <div className="premium-form-header">
        <span className="premium-icon"><CalendarClock size={22} /></span>
        <div className="min-w-0">
          <p className="step-pill w-fit">Step {step} of 3</p>
          <h2 className="mt-2 text-xl font-black text-ink">Book Service</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black ${step >= item ? "bg-brand-blue text-white" : "bg-brand-pale text-brand-blue"}`}>
              {step > item ? <Check size={15} /> : item}
            </span>
            <span className={`hidden h-1 flex-1 rounded-full sm:block ${step > item ? "bg-brand-blue" : "bg-brand-pale"}`} />
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
          <label className={compact ? "grid gap-1" : "grid gap-1 md:col-span-2"}>
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
        <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
          <label className={compact ? "grid gap-1" : "grid gap-1 md:col-span-2"}>
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
        <>
          {Object.entries(values).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} suppressHydrationWarning />
          ))}
          <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
            <label className="grid gap-1">
              <span className="label">Category</span>
              <select
                className="field"
                name="category"
                required
                value={category}
                suppressHydrationWarning
                onChange={(event) => {
                  setCategory(event.target.value as ServiceCategory);
                  setService("");
                }}
              >
                <option value="">Select Category</option>
                {serviceCategories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            {category && (
              <label className="grid gap-1">
                <span className="label">Service</span>
                <select className="field" name="service" required value={service} onChange={(event) => setService(event.target.value)} suppressHydrationWarning>
                  <option value="" disabled>Select a service</option>
                  {getServicesByCategory(category).map((item) => (
                    <option key={item.slug} value={item.title}>{item.title}</option>
                  ))}
                </select>
              </label>
            )}
            <label className={compact ? "grid gap-1" : "grid gap-1 md:col-span-2"}>
              <span className="label">Preferred Date</span>
              <input className="field" name="preferredDate" type="date" required suppressHydrationWarning />
            </label>
            <fieldset className={compact ? "grid gap-3" : "grid gap-3 md:col-span-2"}>
              <legend className="label mb-2">Available Time Slots</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map((slot) => (
                  <label key={slot} className="slot-card">
                    <input name="appointmentSlot" type="radio" value={slot} required suppressHydrationWarning />
                    {slot}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </>
      )}

      <div className="flex flex-wrap justify-between gap-3">
        {step > 1 ? (
          <button type="button" className="btn-outline" onClick={() => setStep((current) => current - 1)} suppressHydrationWarning>
            Back
          </button>
        ) : <span />}
        <button className={step === 3 ? "btn-primary" : "btn-secondary"} disabled={status === "sending"} suppressHydrationWarning>
          {step === 3 ? (
            <>
              <Send size={17} />
              {status === "sending" ? "Sending..." : "Book Now"}
            </>
          ) : (
            <>
              Next <ChevronRight size={17} />
            </>
          )}
        </button>
      </div>
      {message && (
        <p className={status === "sent" ? "text-sm font-bold text-green-700" : "text-sm font-bold text-brand-red"}>
          {message}
        </p>
      )}
    </form>
  );
}
