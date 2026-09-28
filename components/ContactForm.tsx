"use client";
import { FormEvent, useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const email = SITE.contactEmail;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    const f = new FormData(e.currentTarget);
    const subject = `[${SITE.name}] ${f.get("topic")} — ${f.get("name")}`;
    const body = `${f.get("message")}\n\n—\n${f.get("name")}\n${f.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block"><span className="mb-2 block font-mono text-[11px] uppercase tracking-[.16em]">Name</span><input name="name" required className="field" autoComplete="name" /></label>
        <label className="block"><span className="mb-2 block font-mono text-[11px] uppercase tracking-[.16em]">Email</span><input name="email" type="email" required className="field" autoComplete="email" /></label>
      </div>
      <label className="block"><span className="mb-2 block font-mono text-[11px] uppercase tracking-[.16em]">Topic</span>
        <select name="topic" className="field"><option>General question</option><option>Artist feature</option><option>Label / partnership</option><option>Report a problem</option></select>
      </label>
      <label className="block"><span className="mb-2 block font-mono text-[11px] uppercase tracking-[.16em]">Message</span><textarea name="message" required rows={6} className="field resize-y" /></label>
      <button type="submit" disabled={!email} className="btn-red disabled:cursor-not-allowed disabled:opacity-50">Send message</button>
      {!email && <p className="text-[13px] text-muted">The contact form is not connected yet. Set <code>NEXT_PUBLIC_CONTACT_EMAIL</code> to enable it.</p>}
      {sent && <p role="status" className="text-[14px] text-ink/70">Your email app should open with the message ready to send.</p>}
    </form>
  );
}
