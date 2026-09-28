"use client";
import { useState } from "react";
import Icon from "./Icon";

const items: [string, string][] = [
  ["What is Spindle?", "Spindle is a free listening room for independent music. You dig through crates by genre, search by artist or title, and play anything straight away from a player that stays with you as you browse."],
  ["Where does the music come from?", "The catalogue is streamed from Audius, an open platform where independent artists publish their own releases. Every track links back to the artist's credit on its page."],
  ["Do I need an account?", "No. Press play and go. When you add a record to My Crate it is saved in your own browser, so it is private to you and there is nothing to sign up for."],
  ["Will my crate follow me to another device?", "Not yet. My Crate lives in the browser you saved it from. Clearing your browser data will empty it."],
  ["I'm an artist or a label. Can we work together?", "Yes. See the Membership page for how we can feature a release, curate a crate, or build a listening space around your catalogue, then get in touch."],
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t-2 border-ink">
      {items.map(([q, a], i) => (
        <div key={q} className="border-b-2 border-ink">
          <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-5 text-left">
            <span className="font-display text-[22px] font-medium leading-tight tracking-[-.02em] sm:text-[26px]">{q}</span>
            <span className={`grid h-9 w-9 shrink-0 place-items-center border-2 border-ink transition ${open === i ? "rotate-45 bg-ink text-paper" : ""}`}><Icon name="plus" size={16} /></span>
          </button>
          {open === i && <p className="max-w-3xl pb-6 text-[16px] leading-7 text-ink/75">{a}</p>}
        </div>
      ))}
    </div>
  );
}
