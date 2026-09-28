"use client";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePlayer } from "./PlayerProvider";
import { formatDuration } from "@/lib/format";
import Icon from "./Icon";
import SafeImage from "./SafeImage";

export default function PlayerBar() {
  const { track, isPlaying, currentTime, duration, volume, togglePlay, seek, setVolume, next, prev, isLiked, toggleLike } = usePlayer();
  if (!track) return null;
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const liked = isLiked(track.id);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-vermilion bg-ink text-paper" role="region" aria-label="Player">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:gap-5 sm:px-8">
        <Link href={`/track/${track.id}`} className="relative h-12 w-12 shrink-0 overflow-hidden border border-paper/40 sm:h-14 sm:w-14">
          <SafeImage src={track.artwork} alt="" fill sizes="56px" className="object-cover" />
        </Link>
        <div className="min-w-0 flex-1 sm:w-56 sm:flex-none">
          <p className="truncate font-display text-[16px] font-medium leading-tight">{track.title}</p>
          <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[.14em] text-paper/55">{track.artist}</p>
        </div>
        <div className="hidden flex-1 flex-col items-center gap-2 sm:flex">
          <div className="flex items-center gap-3">
            <button onClick={prev} aria-label="Previous track" className="grid h-9 w-9 place-items-center text-paper/70 transition hover:text-paper"><Icon name="prev" size={18} /></button>
            <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-11 w-11 place-items-center rounded-full bg-vermilion text-paper transition hover:scale-105"><Icon name={isPlaying ? "pause" : "play"} size={17} filled strokeWidth={1} /></button>
            <button onClick={next} aria-label="Next track" className="grid h-9 w-9 place-items-center text-paper/70 transition hover:text-paper"><Icon name="next" size={18} /></button>
          </div>
          <div className="flex w-full max-w-[560px] items-center gap-3 font-mono text-[10px] text-paper/60">
            <span className="w-9 text-right">{formatDuration(currentTime)}</span>
            <input className="range" style={{ "--value": `${progress}%` } as CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || currentTime)} onChange={(e) => seek(Number(e.target.value))} aria-label="Seek" />
            <span className="w-9">{formatDuration(duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:w-56 sm:justify-end">
          <button onClick={() => toggleLike(track)} aria-label={liked ? "Remove from My Crate" : "Add to My Crate"} aria-pressed={liked} className={`grid h-9 w-9 place-items-center ${liked ? "text-vermilion" : "text-paper/60 hover:text-paper"}`}><Icon name="heart" size={17} filled={liked} /></button>
          <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-11 w-11 place-items-center rounded-full bg-vermilion text-paper sm:hidden"><Icon name={isPlaying ? "pause" : "play"} size={17} filled strokeWidth={1} /></button>
          <span className="hidden text-paper/60 lg:block"><Icon name="volume" size={16} /></span>
          <input aria-label="Volume" className="range hidden w-24 lg:block" style={{ "--value": `${volume * 100}%` } as CSSProperties} type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
        </div>
      </div>
      <div className="h-[3px] bg-paper/15 sm:hidden"><div className="h-full bg-vermilion" style={{ width: `${progress}%` }} /></div>
    </div>
  );
}
