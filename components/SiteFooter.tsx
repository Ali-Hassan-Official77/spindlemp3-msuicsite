import Link from "next/link";
import Logo from "./Logo";
import { SITE } from "@/lib/site";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "Listen", links: [["Discover", "/search"], ["My Crate", "/library"], ["Electronic", "/search?genre=Electronic"], ["Hip-Hop", "/search?genre=Hip-Hop%2FRap"]] },
  { title: "Spindle", links: [["Liner Notes", "/about"], ["Membership", "/pricing"], ["Contact", "/contact"]] },
];

export default function SiteFooter() {
  return (
    <footer className="mt-28 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-paper/65">{SITE.description}</p>
            <Link href="/search" className="btn-red mt-7">Start digging</Link>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="kicker">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="font-display text-[20px] tracking-[-.01em] text-paper/85 transition hover:text-vermilion">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-16 select-none font-display text-[clamp(64px,19vw,260px)] font-semibold leading-[.8] tracking-[-.06em] text-paper/[.07]" aria-hidden="true">Spindle</p>
        <div className="mt-8 flex flex-col gap-3 border-t border-paper/20 pt-6 font-mono text-[10px] uppercase tracking-[.16em] text-paper/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Spindle. All rights reserved.</span>
          <span>Music streamed from Audius</span>
        </div>
      </div>
    </footer>
  );
}
