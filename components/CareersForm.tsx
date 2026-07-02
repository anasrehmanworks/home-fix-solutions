"use client";

import { ArrowLeft, ArrowRight, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { serviceCategories, servicePages } from "@/lib/site";

const states = [
  "AL", "AZ", "CA", "CO", "CT", "FL", "GA", "HI", "IL", "IN", "LA", "MD", "MA", "MI", "MN",
  "MO", "NV", "NJ", "NY", "NC", "OH", "OK", "OR", "PA", "SC", "TN", "TX", "VA", "WA", "WV", "WI", "DC"
];

const commissions = [
  { service: "Garage Door", rate: "40%" },
  { service: "Air Duct Cleaning", rate: "45%" },
  { service: "Chimney Cleaning", rate: "45%" }
];

export function CareersForm() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [stepOneValues, setStepOneValues] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(formData: FormData) {
    const response = await fetch("/api/careers", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string };
    setMessage(data.message ?? "Application received.");
  }

  return (
    <form ref={formRef} action={submit} className="premium-form">
      <div className="premium-form-header">
        <span className="premium-icon"><UploadCloud size={22} /></span>
        <div>
          <p className="step-pill w-fit">Step {step} of 2</p>
          <h2 className="mt-2 text-2xl font-black">Apply As A Technician</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Submit your technician application for garage door, air duct cleaning, and chimney service work.
          </p>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-brand-pale">
        <div className="h-full rounded-full bg-brand-blue transition-all duration-300" style={{ width: step === 1 ? "50%" : "100%" }} />
      </div>

      {step === 1 ? (
        <div className="premium-grid" data-step="1">
          {[
            ["First Name", "firstName", "given-name"],
            ["Last Name", "lastName", "family-name"],
            ["Phone", "phone", "tel"],
            ["Email", "email", "email"],
            ["Address", "address", "street-address"],
            ["City", "city", "address-level2"],
            ["ZIP Code", "zip", "postal-code"]
          ].map(([label, name, autoComplete]) => (
            <label key={name} className={name === "address" ? "grid gap-1 md:col-span-2" : "grid gap-1"}>
              <span className="label">{label}</span>
              <input className="field" name={name} required type={name === "email" ? "email" : "text"} autoComplete={autoComplete} />
            </label>
          ))}
          <label className="grid gap-1">
            <span className="label">State</span>
            <select className="field" name="state" required defaultValue="">
              <option value="" disabled>Select</option>
              {states.map((state) => <option key={state}>{state}</option>)}
            </select>
          </label>
        </div>
      ) : (
        <div className="grid gap-5">
          {Object.entries(stepOneValues).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <div className="premium-grid">
            <label className="grid gap-1">
              <span className="label">Years of Experience</span>
              <input className="field" name="experience" required />
            </label>
            <label className="grid gap-1">
              <span className="label">License Number</span>
              <input className="field" name="licenseNumber" required />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span className="label">Service Expertise</span>
              <select className="field" name="expertise" required defaultValue="">
                <option value="" disabled>Select expertise</option>
                {serviceCategories.map((category) => (
                  <optgroup key={category} label={category === "Garage Door" ? "Garage Door Services" : category}>
                    {servicePages
                      .filter((service) => service.category === category)
                      .map((service) => (
                        <option key={service.slug} value={service.title}>{service.title}</option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span className="label">License Upload</span>
              <input className="field file:mr-3 file:rounded-md file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-sm file:font-bold file:text-white" name="licenseUpload" type="file" required />
            </label>
          </div>
          <div className="rounded-md border border-slate-200 bg-brand-pale p-4">
            <h3 className="font-black">Technician Commission Information</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {commissions.map((item) => (
                <div key={item.service} className="rounded-md bg-white p-4 text-center shadow-sm">
                  <p className="text-sm font-black text-slate-600">{item.service}</p>
                  <p className="mt-2 text-3xl font-black text-brand-blue">{item.rate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-3">
        {step === 2 ? (
          <button type="button" className="btn-outline" onClick={() => setStep(1)}>
            <ArrowLeft size={17} />
            Back
          </button>
        ) : <span />}
        {step === 1 ? (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              const fields = Array.from(formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-step="1"] input, [data-step="1"] select') ?? []);
              if (!fields.every((field) => field.reportValidity())) return;
              setStepOneValues(Object.fromEntries(fields.map((field) => [field.name, field.value])));
              setStep(2);
            }}
          >
            Continue
            <ArrowRight size={17} />
          </button>
        ) : (
          <button className="btn-primary">
            <UploadCloud size={18} />
            Submit Application
          </button>
        )}
      </div>
      {message && <p className="text-sm font-bold text-green-700">{message}</p>}
    </form>
  );
}
