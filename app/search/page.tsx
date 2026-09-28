"use client";

import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TrackGrid from "@/components/TrackGrid";
import Icon from "@/components/Icon";
import { Stylus } from "@/components/Art";
import { Track } from "@/lib/types";
export const runtime = 'edge';
const genres = ["All", "Electronic", "Hip-Hop/Rap", "Pop", "R&B", "Lo-Fi", "House", "Rock", "Jazz"];

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="h-12 w-72 animate-pulse bg-paper-3" /></div>}>
      <SearchInner />
    </Suspense>
  );
}

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const urlQuery = params.get("q") || "";
  const urlGenre = params.get("genre") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    const q = urlQuery.trim();
    const genre = urlGenre.trim();
    if (!q && !genre) { setTracks([]); setStatus("idle"); return; }
    const controller = new AbortController();
    setStatus("loading");
    (async () => {
      try {
        const endpoint = q ? `/api/audius/search?q=${encodeURIComponent(q)}` : `/api/audius/trending?genre=${encodeURIComponent(genre)}`;
        const res = await fetch(endpoint, { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        if (controller.signal.aborted) return;
        setTracks(Array.isArray(data.tracks) ? data.tracks : []);
        setStatus("done");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!controller.signal.aborted) { setTracks([]); setStatus("error"); }
      }
    })();
    return () => controller.abort();
  }, [urlQuery, urlGenre]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim() || "";
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }
  const chooseGenre = (v: string) => router.push(v === "All" ? "/search" : `/search?genre=${encodeURIComponent(v)}`);
  const selected = urlGenre || "All";
  const heading = urlGenre ? urlGenre : urlQuery ? `“${urlQuery}”` : "Dig deeper.";

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
      <p className="kicker">{urlQuery ? "Search results" : urlGenre ? "Crate" : "Discover"}</p>
      <h1 className="h-display mt-3 break-words text-[clamp(44px,8vw,104px)]">{heading}</h1>

      <form onSubmit={submit} role="search" className="mt-9 flex max-w-2xl border-2 border-ink bg-paper shadow-[5px_5px_0_#17130E] focus-within:bg-white">
        <span className="grid w-12 place-items-center"><Icon name="search" size={19} /></span>
        <input ref={inputRef} key={urlQuery} defaultValue={urlQuery} placeholder="Song, artist or sound" aria-label="Search music" className="min-w-0 flex-1 bg-transparent py-4 pr-3 text-[15px] outline-none placeholder:text-muted/70" />
        <button type="submit" className="border-l-2 border-ink bg-ink px-6 font-mono text-[11px] uppercase tracking-[.16em] text-paper transition hover:bg-vermilion">Dig</button>
      </form>

      <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by genre">
        {genres.map((g) => <button type="button" key={g} onClick={() => chooseGenre(g)} className={`chip ${selected === g ? "selected" : ""}`} aria-pressed={selected === g}>{g}</button>)}
      </div>

      <div className="mt-12 border-t-2 border-ink pt-10">
        {status === "idle" && (
          <div className="flex flex-col items-center py-16 text-center">
            <Stylus className="h-14 w-14 text-vermilion" />
            <p className="h-display mt-6 text-[34px]">Pick a crate, or type a name.</p>
            <p className="mt-2 text-[15px] text-muted">Search any artist or title, or choose a genre above.</p>
          </div>
        )}
        {status === "loading" && (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-busy="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse"><div className="aspect-square border-2 border-ink/20 bg-paper-3" /><div className="mt-4 h-4 w-3/4 bg-paper-3" /><div className="mt-2 h-3 w-1/2 bg-paper-3" /></div>
            ))}
          </div>
        )}
        {status === "error" && (
          <div className="py-16 text-center"><p className="h-display text-[34px]">The shelf is stuck.</p><p className="mt-2 text-[15px] text-muted">The catalogue didn't respond. Give it a moment and try again.</p></div>
        )}
        {status === "done" && !tracks.length && (
          <div className="py-16 text-center"><p className="h-display text-[34px]">Nothing on that shelf.</p><p className="mt-2 text-[15px] text-muted">Try a broader title, a different artist, or another genre.</p></div>
        )}
        {status === "done" && tracks.length > 0 && (
          <>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[.16em] text-muted">{tracks.length} records</p>
            <TrackGrid tracks={tracks} />
          </>
        )}
      </div>
    </div>
  );
}
