import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
export const runtime = 'edge';
export const metadata: Metadata = { title: "Membership", description: "Ways to use Spindle as a listener, an artist or a label." };

const plans = [
  { name: "Listener", tag: "Side A", price: "Free", desc: "The whole record room, with nothing to sign up for.", items: ["Full catalogue search and genre crates", "Player that follows you around", "Private My Crate on your device"], cta: "Start listening", href: "/search" },
  { name: "Artist", tag: "The Press", price: "Let's talk", desc: "A proper home for your release inside the room.", items: ["Featured spot in a genre crate", "Release presentation and credit", "Direct line to the Spindle team"], cta: "Pitch a release", href: "/contact", featured: true },
  { name: "Label", tag: "The Pressing Plant", price: "Let's talk", desc: "A listening space built around your whole catalogue.", items: ["Custom curated crates", "Branded listening experience", "Scoped, integrated launch support"], cta: "Discuss a project", href: "/contact" },
];

export default function PricingPage() {
  return (
    <div>
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="kicker">Membership</p>
          <h1 className="h-display mt-4 max-w-4xl text-[clamp(44px,8vw,104px)]">Free to listen. <em className="font-normal text-vermilion">Made to work with.</em></h1>
          <p className="mt-6 max-w-xl text-[17px] leading-8 text-ink/75">Listening is open to everyone. Artists and labels can work with us on something more tailored.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <article key={p.name} className={`flex flex-col border-2 border-ink p-7 shadow-[6px_6px_0_#17130E] ${p.featured ? "bg-ink text-paper" : "bg-paper"}`}>
              <div className="flex items-center justify-between"><span className={`font-mono text-[11px] uppercase tracking-[.18em] ${p.featured ? "text-mustard" : "text-vermilion"}`}>{p.tag}</span>{p.featured && <span className="bg-vermilion px-2 py-1 font-mono text-[10px] uppercase tracking-[.16em] text-paper">Most requested</span>}</div>
              <h2 className="mt-6 font-display text-[40px] font-semibold tracking-[-.03em]">{p.name}</h2>
              <p className={`mt-2 text-[15px] leading-7 ${p.featured ? "text-paper/70" : "text-ink/70"}`}>{p.desc}</p>
              <p className="mt-6 font-display text-[34px] font-medium tracking-[-.02em]">{p.price}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.items.map((i) => <li key={i} className="flex gap-3 text-[15px] leading-6"><Icon name="check" size={17} className="mt-1 shrink-0 text-vermilion" />{i}</li>)}
              </ul>
              <Link href={p.href} className={`mt-8 ${p.featured ? "btn-red" : "btn-ink"}`}>{p.cta}<Icon name="arrow" size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
