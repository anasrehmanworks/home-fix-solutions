"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { getServicesByCategory, serviceCategories, statesServed } from "@/lib/site";
import type { ServiceCategory } from "@/lib/site";

const slots = ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM", "Emergency Service"];

type OfferFormProps = {
  offer: {
    code: string;
    category: ServiceCategory;
    title: string;
  };
};

export function OfferRedeemForm({ offer }: OfferFormProps) {
  const [category, setCategory] = useState<ServiceCategory>(offer.category);
  const [service, setService] = useState(offer.title);
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    const response = await fetch("/api/book", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string };
    setMessage(data.message ?? "Offer request received.");
  }

  return (
    <form action={submit} className="premium-form">
      <div className="premium-form-header">
        <span className="premium-icon"><Send size={21} /></span>
        <div>
          <p className="step-pill w-fit">Coupon Redemption</p>
          <h2 className="mt-2 text-2xl font-black">Redeem Offer</h2>
        </div>
      </div>
      <label className="grid gap-1">
        <span className="label">Coupon Code</span>
        <input className="field font-black text-brand-blue" name="couponCode" value={offer.code} readOnly />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="label">First Name</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="grid gap-1">
          <span className="label">Last Name</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
        <label className="grid gap-1">
          <span className="label">Phone Number</span>
          <input className="field" name="phone" required autoComplete="tel" />
        </label>
        <label className="grid gap-1">
          <span className="label">Email</span>
          <input className="field" name="email" type="email" required autoComplete="email" />
        </label>
        <label className="grid gap-1 md:col-span-2">
          <span className="label">Address</span>
          <input className="field" name="address" required autoComplete="street-address" />
        </label>
        <label className="grid gap-1">
          <span className="label">State</span>
          <select className="field" name="state" required defaultValue="">
            <option value="" disabled>Select a state</option>
            {statesServed.map((state) => <option key={state}>{state}</option>)}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="label">ZIP Code</span>
          <input className="field" name="zip" required autoComplete="postal-code" />
        </label>
        <label className="grid gap-1">
          <span className="label">Category</span>
          <select
            className="field"
            name="category"
            required
            value={category}
            onChange={(event) => {
              const nextCategory = event.target.value as ServiceCategory;
              setCategory(nextCategory);
              setService("");
            }}
          >
            {serviceCategories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="label">Service</span>
          <select className="field" name="service" required value={service} onChange={(event) => setService(event.target.value)}>
            <option value="" disabled>Select a service</option>
            {getServicesByCategory(category).map((service) => (
              <option key={service.slug} value={service.title}>{service.title}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="label">Preferred Date</span>
          <input className="field" name="preferredDate" type="date" required />
        </label>
        <fieldset className="grid gap-3 md:col-span-2">
          <legend className="label mb-2">Available Appointment Slots</legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map((slot) => (
              <label key={slot} className="slot-card">
                <input name="appointmentSlot" type="radio" value={slot} required />
                {slot}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <button className="btn-primary">
        <Send size={17} />
        Submit Offer Request
      </button>
      {message && <p className="text-sm font-bold text-green-700">{message}</p>}
    </form>
  );
}
