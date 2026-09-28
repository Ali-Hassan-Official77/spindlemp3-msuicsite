import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
export const runtime = 'edge';
export const metadata: Metadata = { title: "Contact", description: "Get in touch with the Spindle team." };

export default function ContactPage() {
  return (
    <div>
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="kicker">Contact</p>
          <h1 className="h-display mt-4 max-w-4xl text-[clamp(44px,8vw,104px)]">Say <em className="font-normal text-vermilion">hello.</em></h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_.8fr]">
        <div><ContactForm /></div>
        <aside className="h-fit border-2 border-ink bg-paper-2 p-7 shadow-[6px_6px_0_#17130E]">
          <p className="kicker">What to write about</p>
          <ul className="mt-5 space-y-4">
            {["Getting a release featured", "Building a listening space for your catalogue", "Something broken or confusing", "Anything else about the record room"].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] leading-6"><Icon name="check" size={17} className="mt-1 shrink-0 text-vermilion" />{t}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
