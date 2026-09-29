"use client";

import Link from "next/link";
import { Track } from "@/lib/types";
import { formatDuration } from "@/lib/format";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";
import SafeImage from "./SafeImage";

export default function TrackCard({ track, queue }: { track: Track; queue?: Track[] }) {
  const { play, track: current, isPlaying, toggleLike, isLiked } = usePlayer();
  const active = current?.id === track.id;
  const liked = isLiked(track.id);
  return (
    <article className="group w-full">
      <div className="sleeve relative aspect-square">
        <Link href={`/track/${track.id}`} aria-label={`Open ${track.title}`} className="absolute inset-0 z-[1]" />
        <SafeImage src={track.artwork} alt={track.title} fill sizes="(max-width:640px) 44vw, 220px" className="object-cover" />
        {active && isPlaying && (
          <span className="absolute left-2 top-2 z-[2] inline-flex items-end gap-[3px] border-2 border-ink bg-paper px-2 py-1.5" aria-label="Now spinning">
            <i className="eq-dot" /><i className="eq-dot d1" /><i className="eq-dot d2" />
          </span>
        )}
        <button
          type="button"
          onClick={() => play(track, queue)}
          aria-label={active && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          className="absolute bottom-2 right-2 z-[2] grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-vermilion text-paper shadow-[2px_2px_0_#17130E] transition hover:scale-105 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
        >
          <Icon name={active && isPlaying ? "pause" : "play"} size={17} filled strokeWidth={1.2} />
        </button>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4">
        <div className="min-w-0">
          <Link href={`/track/${track.id}`} className="block truncate font-display text-[15px] sm:text-[18px] font-medium leading-tight tracking-[-.01em] hover:text-vermilion">{track.title}</Link>
          <p className="mt-1 truncate font-mono text-[9px] sm:text-[10px] uppercase tracking-[.14em] text-muted">{track.artist}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[.14em] text-muted/70">{track.genre || "Independent"} · {formatDuration(track.duration)}</p>
        </div>
        <button type="button" onClick={() => toggleLike(track)} aria-label={liked ? `Remove ${track.title} from My Crate` : `Add ${track.title} to My Crate`} aria-pressed={liked} className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center transition ${liked ? "text-vermilion" : "text-ink/45 hover:text-ink"}`}>
          <Icon name="heart" size={17} filled={liked} />
        </button>
      </div>
    </article>
  );
}

export function ChartRow({ track, index, queue }: { track: Track; index: number; queue?: Track[] }) {
  const { play, track: current, isPlaying, toggleLike, isLiked } = usePlayer();
  const active = current?.id === track.id;
  const liked = isLiked(track.id);
  return (
    <div className={`group flex items-center gap-3 border-b-2 border-ink/15 py-3.5 transition hover:bg-paper-2 sm:gap-4 sm:px-2 ${active ? "bg-paper-2" : ""}`}>
      <span className={`w-9 shrink-0 text-right font-display text-[34px] font-semibold leading-none tracking-[-.05em] ${active ? "text-vermilion" : "text-ink/25 group-hover:text-ink"}`}>{String(index).padStart(2, "0")}</span>
      <button type="button" onClick={() => play(track, queue)} aria-label={active && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`} className="relative h-14 w-14 shrink-0 overflow-hidden border-2 border-ink">
        <SafeImage src={track.artwork} alt="" fill sizes="56px" className="object-cover" />
        <span className={`absolute inset-0 grid place-items-center bg-ink/55 text-paper transition ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          <Icon name={active && isPlaying ? "pause" : "play"} size={18} filled strokeWidth={1} />
        </span>
      </button>
      <Link href={`/track/${track.id}`} className="min-w-0 flex-1">
        <p className={`truncate font-display text-[19px] font-medium leading-tight ${active ? "text-vermilion" : ""}`}>{track.title}</p>
        <p className="mt-1 truncate font-mono text-[9px] sm:text-[10px] uppercase tracking-[.14em] text-muted">{track.artist}</p>
      </Link>
      <span className="hidden font-mono text-[10px] uppercase tracking-[.14em] text-muted md:block">{track.genre || "Independent"}</span>
      <button type="button" onClick={() => toggleLike(track)} aria-label={liked ? "Remove from My Crate" : "Add to My Crate"} aria-pressed={liked} className={`grid h-9 w-9 place-items-center ${liked ? "text-vermilion" : "text-ink/40 hover:text-ink"}`}>
        <Icon name="heart" size={17} filled={liked} />
      </button>
      <span className="hidden w-10 text-right font-mono text-[11px] text-muted sm:block">{formatDuration(track.duration)}</span>
    </div>
  );
}
