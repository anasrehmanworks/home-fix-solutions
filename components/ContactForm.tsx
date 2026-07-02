"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    const response = await fetch("/api/contact", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string };
    setMessage(data.message ?? "Thanks. Your message has been received.");
  }

  return (
    <form action={submit} className="grid gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-crisp">
      <h2 className="text-xl font-black">Contact Home Fix Solution</h2>
      <label className="grid gap-1">
        <span className="label">Full Name</span>
        <input className="field" name="name" required />
      </label>
      <label className="grid gap-1">
        <span className="label">Phone</span>
        <input className="field" name="phone" required />
      </label>
      <label className="grid gap-1">
        <span className="label">Email</span>
        <input className="field" name="email" type="email" required />
      </label>
      <label className="grid gap-1">
        <span className="label">Message</span>
        <textarea className="field min-h-28" name="message" required />
      </label>
      <button className="btn-secondary">
        <Send size={17} />
        Request a Call
      </button>
      {message && <p className="text-sm font-bold text-green-700">{message}</p>}
    </form>
  );
}
