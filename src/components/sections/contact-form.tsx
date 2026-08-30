"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const roles = ["Founder / CEO", "CTO / Head of Engineering", "Product / Digital Lead", "Head of Innovation", "Other"];
const needs = [
  "AI Strategy",
  "AI Development",
  "AI Optimization",
  "Digital platform or app",
  "Not sure yet",
];

const field =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-teal";
const label = "text-xs font-medium uppercase tracking-[0.14em] text-ink-muted";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: roles[0],
    need: needs[0],
    message: "",
  });

  const mailtoHref =
    `mailto:${site.email}` +
    `?subject=${encodeURIComponent(`New enquiry — ${form.company || form.name}`)}` +
    `&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nRole: ${form.role}\nInterest: ${form.need}\n\n${form.message}`,
    )}`;

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line bg-paper p-8 text-center"
      >
        <h3 className="font-display text-xl font-semibold">Almost there</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Your email client should now be open with the details filled in. If not,
          write to{" "}
          <a href={`mailto:${site.email}`} className="text-teal underline">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-medium text-ink-faint underline"
        >
          Edit details
        </button>
      </motion.div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref;
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label className={label} htmlFor="name">Name</label>
          <input id="name" required className={field} value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        </div>
        <div className="grid gap-1.5">
          <label className={label} htmlFor="email">Work email</label>
          <input id="email" type="email" required className={field} value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label className={label} htmlFor="company">Company</label>
        <input id="company" className={field} value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label className={label} htmlFor="role">Your role</label>
          <select id="role" className={cn(field, "appearance-none")} value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="grid gap-1.5">
          <label className={label} htmlFor="need">What do you need?</label>
          <select id="need" className={cn(field, "appearance-none")} value={form.need}
            onChange={(e) => setForm({ ...form, need: e.target.value })}>
            {needs.map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <label className={label} htmlFor="message">Tell us about it</label>
        <textarea id="message" rows={4} className={field} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Your objectives, the context, and what you're trying to achieve." />
      </div>

      <button
        type="submit"
        className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.9rem] font-medium text-paper transition-colors duration-300 hover:bg-purple"
      >
        Start the conversation
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
