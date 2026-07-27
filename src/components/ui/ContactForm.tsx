"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold text-navy">Send a message</h2>
      <div className="mt-4 grid gap-3">
        <input
          name="name"
          required
          placeholder="Name"
          className="rounded-lg border border-navy/15 px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-lg border border-navy/15 px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="phone"
          placeholder="Phone / WhatsApp"
          className="rounded-lg border border-navy/15 px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className="rounded-lg border border-navy/15 px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
        <button type="submit" className="btn-yellow">
          Send message
        </button>
        <a
          href={SITE.whatsapp}
          className="btn-navy text-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          Or WhatsApp us
        </a>
        {status === "sent" && (
          <p className="text-sm font-semibold text-green-700">
            Message sent — we will reply soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-semibold text-red-600">
            Could not send. Please email {SITE.email} or WhatsApp us.
          </p>
        )}
      </div>
    </form>
  );
}
