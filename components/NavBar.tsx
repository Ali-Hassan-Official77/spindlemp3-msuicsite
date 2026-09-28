"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Discover" },
  { href: "/library", label: "My Crate" },
  { href: "/about", label: "Liner Notes" },
];

const ticker = ["Free to stream", "Independent artists only", "No account needed", "Your crate stays on your device", "New charts every week"];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="overflow-hidden bg-ink py-1.5 text-paper" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[.22em]">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-10">{t}<span className="text-vermilion">●</span></span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-3.5 sm:px-8">
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`font-mono text-[11px] uppercase tracking-[.16em] transition hover:text-vermilion ${active(l.href) ? "text-vermilion underline decoration-2 underline-offset-[10px]" : ""}`}>{l.label}</Link>
          ))}
        </nav>
        <button type="button" className="grid h-10 w-10 place-items-center border-2 border-ink lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <Icon name={open ? "close" : "menu"} size={18} />
        </button>
        <Link href="/" aria-label="Spindle home" className="justify-self-center"><Logo /></Link>
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link href="/search" aria-label="Search" className="grid h-10 w-10 place-items-center transition hover:text-vermilion"><Icon name="search" size={19} /></Link>
          <Link href="/pricing" className="btn-ink hidden !px-4 !py-2.5 sm:inline-flex">Membership</Link>
        </div>
      </div>
      {open && (
        <div className="border-t-2 border-ink bg-paper lg:hidden">
          <div className="mx-auto max-w-7xl px-5 pb-5 pt-2 sm:px-8">
            {[...links, { href: "/pricing", label: "Membership" }, { href: "/contact", label: "Contact" }].map((l) => (
              <Link key={l.href} href={l.href} className={`flex items-center justify-between border-b-2 border-ink/15 py-4 font-display text-[26px] font-medium tracking-[-.02em] ${active(l.href) ? "text-vermilion" : ""}`}>{l.label}<Icon name="arrow" size={18} /></Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
