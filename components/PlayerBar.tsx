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
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-vermilion bg-ink text-paper shadow-[0_-12px_40px_rgba(0,0,0,.18)]">
      <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-6 sm:py-3">
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link href={`/track/${track.id}`} className="relative h-11 w-11 shrink-0 overflow-hidden border border-paper/30 sm:h-14 sm:w-14">
            <SafeImage src={track.artwork} alt="" fill sizes="56px" className="object-cover"/>
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[15px] font-medium sm:text-[17px]">{track.title}</p>
            <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-[.15em] text-paper/50">{track.artist}</p>
          </div>

          <div className="hidden flex-1 flex-col items-center gap-1.5 md:flex">
            <div className="flex items-center gap-3">
              <button onClick={prev} aria-label="Previous track" className="grid h-8 w-8 place-items-center text-paper/60 hover:text-paper"><Icon name="prev" size={16}/></button>
              <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-10 w-10 place-items-center rounded-full bg-vermilion text-paper transition hover:scale-105"><Icon name={isPlaying ? "pause" : "play"} size={16} filled strokeWidth={1}/></button>
              <button onClick={next} aria-label="Next track" className="grid h-8 w-8 place-items-center text-paper/60 hover:text-paper"><Icon name="next" size={16}/></button>
            </div>
            <div className="flex w-full max-w-[520px] items-center gap-2 font-mono text-[9px] text-paper/50">
              <span className="w-8 text-right">{formatDuration(currentTime)}</span>
              <input className="range" style={{"--value":`${progress}%`} as CSSProperties} type="range" min="0" max={duration || 0} step=".1" value={Math.min(currentTime,duration || currentTime)} onChange={e=>seek(Number(e.target.value))} aria-label="Seek"/>
              <span className="w-8">{formatDuration(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => toggleLike(track)} aria-label={liked ? "Remove from My Crate" : "Add to My Crate"} aria-pressed={liked} className={`grid h-9 w-9 place-items-center ${liked ? "text-vermilion" : "text-paper/55 hover:text-paper"}`}><Icon name="heart" size={17} filled={liked}/></button>
            <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-10 w-10 place-items-center rounded-full bg-vermilion text-paper md:hidden"><Icon name={isPlaying ? "pause" : "play"} size={16} filled strokeWidth={1}/></button>
            <span className="hidden text-paper/50 lg:block"><Icon name="volume" size={15}/></span>
            <input aria-label="Volume" className="range hidden w-20 lg:block" style={{"--value":`${volume*100}%`} as CSSProperties} type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(Number(e.target.value))}/>
          </div>
        </div>
        <div className="mt-2 h-0.5 bg-paper/10 md:hidden"><div className="h-full bg-vermilion" style={{width:`${progress}%`}}/></div>
      </div>
    </div>
  );
}
