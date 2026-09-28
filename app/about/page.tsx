import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import FAQ from "@/components/FAQ";
export const runtime = 'edge';

export const metadata: Metadata = { title: "Liner Notes", description: "Why Spindle exists, and how the record room works." };

const steps = [
  { icon: "search" as const, title: "Dig", text: "Search by title or artist, or pull a whole genre crate off the shelf." },
  { icon: "play" as const, title: "Drop the needle", text: "One tap starts a record. The player stays put while you keep browsing." },
  { icon: "heart" as const, title: "Keep it", text: "Add favourites to My Crate. They are saved privately on your device." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="kicker">Liner notes</p>
          <h1 className="h-display mt-4 max-w-5xl text-[clamp(44px,8vw,116px)]">A record shop with <em className="font-normal text-vermilion">no walls.</em></h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.7fr_1.3fr]">
        <p className="kicker">Why we built it</p>
        <div className="max-w-2xl space-y-6 text-[18px] leading-8 text-ink/80">
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[84px] first-letter:font-semibold first-letter:leading-[.8] first-letter:text-vermilion">The best part of a good record shop was never the shelves. It was the person behind the counter saying, &ldquo;you should hear this.&rdquo; Most streaming apps lost that. They hand you an endless feed and call it discovery.</p>
          <p>Spindle is our answer: a small, calm room for independent music where the catalogue is the whole point. Artists release directly. Listeners find them directly. Nothing sits in between except a player that gets out of the way.</p>
          <p>We keep it simple on purpose. No ads to dodge, no account to create, no algorithm deciding what you deserve to hear next.</p>
        </div>
      </section>

      <section className="border-y-2 border-ink bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="kicker">How it works</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="border-2 border-ink bg-paper p-7 shadow-[5px_5px_0_#17130E]">
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center border-2 border-ink bg-vermilion text-paper"><Icon name={s.icon} size={20} /></span><span className="font-display text-[44px] font-semibold leading-none text-ink/15">0{i + 1}</span></div>
                <h2 className="mt-6 font-display text-[28px] font-medium tracking-[-.02em]">{s.title}</h2>
                <p className="mt-2 text-[15px] leading-7 text-ink/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="kicker">Small print, in plain words</p>
        <h2 className="h-display mt-3 text-[clamp(36px,5vw,60px)]">Common questions.</h2>
        <div className="mt-10"><FAQ /></div>
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/search" className="btn-ink">Start listening <Icon name="arrow" size={14} /></Link><Link href="/contact" className="btn-outline">Get in touch</Link></div>
      </section>
    </div>
  );
}
