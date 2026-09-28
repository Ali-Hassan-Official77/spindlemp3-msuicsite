"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function SearchBar({ placeholder = "Search a song, an artist, a sound…" }: { placeholder?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }
  return (
    <form onSubmit={submit} role="search" className="flex w-full border-2 border-ink bg-paper shadow-[5px_5px_0_#17130E] focus-within:bg-white">
      <label htmlFor="hero-search" className="sr-only">Search Spindle</label>
      <span className="grid w-12 shrink-0 place-items-center text-ink"><Icon name="search" size={19} /></span>
      <input id="hero-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent py-4 pr-3 text-[15px] outline-none placeholder:text-muted/70" />
      <button type="submit" className="border-l-2 border-ink bg-ink px-5 font-mono text-[11px] uppercase tracking-[.16em] text-paper transition hover:bg-vermilion sm:px-7">Dig</button>
    </form>
  );
}
