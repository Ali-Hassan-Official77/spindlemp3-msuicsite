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
const ticker = ["Free to stream", "Independent artists", "No account needed", "Private crate", "New records every week"];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-xl">
      <div className="overflow-hidden border-b border-paper/20 bg-ink py-1.5 text-paper" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-mono text-[9px] uppercase tracking-[.2em]">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-8">{t}<span className="text-vermilion">●</span></span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid h-[68px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-[76px] sm:px-8">
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`relative py-2 font-mono text-[10px] uppercase tracking-[.16em] transition hover:text-vermilion ${active(l.href) ? "text-vermilion after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-vermilion" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button type="button" className="grid h-10 w-10 place-items-center border-2 border-ink md:hidden"
          onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <Icon name={open ? "close" : "menu"} size={18} />
        </button>

        <Link href="/" aria-label="Spindle home" className="justify-self-center"><Logo /></Link>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link href="/search" aria-label="Search" className="grid h-10 w-10 place-items-center transition hover:text-vermilion"><Icon name="search" size={18} /></Link>
          <Link href="/pricing" className="btn-ink hidden !min-h-10 !px-4 !py-2.5 sm:inline-flex">Work with us</Link>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-paper md:hidden">
          <nav className="mx-auto max-w-7xl px-4 pb-4 pt-1 sm:px-8" aria-label="Mobile">
            {[...links, { href: "/pricing", label: "Work with us" }, { href: "/contact", label: "Contact" }].map(l => (
              <Link key={l.href} href={l.href}
                className={`flex min-h-14 items-center justify-between border-b border-ink/15 py-3 font-display text-[24px] font-medium ${active(l.href) ? "text-vermilion" : ""}`}>
                {l.label}<Icon name="arrow" size={17} />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
