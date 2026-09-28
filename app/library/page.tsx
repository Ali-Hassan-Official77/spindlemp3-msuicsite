"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TrackGrid from "@/components/TrackGrid";
import { getLikedTracksFromStorage, usePlayer } from "@/components/PlayerProvider";
import { CrateTile } from "@/components/Art";
import { Track } from "@/lib/types";
export const runtime = 'edge';
export default function LibraryPage() {
  const { likedIds } = usePlayer();
  const [tracks, setTracks] = useState<Track[]>([]);
  useEffect(() => {
    const load = () => setTracks(getLikedTracksFromStorage().filter((t) => likedIds.includes(t.id)));
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [likedIds]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="flex flex-col gap-4 border-b-2 border-ink pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="kicker">Your private shelf</p><h1 className="h-display mt-3 text-[clamp(44px,8vw,104px)]">My Crate</h1></div>
        <p className="font-mono text-[11px] uppercase tracking-[.16em] text-muted">{tracks.length} record{tracks.length === 1 ? "" : "s"} saved on this device</p>
      </div>
      <section className="mt-12">
        {tracks.length ? <TrackGrid tracks={tracks} /> : (
          <div className="mx-auto flex max-w-md flex-col items-center py-14 text-center">
            <CrateTile color="#E4472B" className="w-40" />
            <p className="h-display mt-6 text-[34px]">Your crate is empty.</p>
            <p className="mt-2 text-[15px] leading-7 text-muted">Tap the heart on any record and it lands here, saved privately in this browser.</p>
            <Link href="/search" className="btn-ink mt-7">Go digging</Link>
          </div>
        )}
      </section>
    </div>
  );
}
