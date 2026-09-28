"use client";
import { Track } from "@/lib/types";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";

export default function TrackPageControls({ track, queue }: { track: Track; queue?: Track[] }) {
  const { play, togglePlay, track: current, isPlaying, toggleLike, isLiked } = usePlayer();
  const active = current?.id === track.id;
  const liked = isLiked(track.id);
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button className="btn-red" onClick={() => (active ? togglePlay() : play(track, queue))}>
        <Icon name={active && isPlaying ? "pause" : "play"} size={15} filled strokeWidth={1} />
        {active && isPlaying ? "Pause" : "Drop the needle"}
      </button>
      <button className="btn-outline" onClick={() => toggleLike(track)} aria-pressed={liked}>
        <Icon name="heart" size={15} filled={liked} />
        {liked ? "In My Crate" : "Add to My Crate"}
      </button>
    </div>
  );
}
