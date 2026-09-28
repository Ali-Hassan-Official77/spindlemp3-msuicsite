"use client";

import { Track } from "@/lib/types";
import TrackCard from "./TrackCard";

export default function TrackGrid({ tracks }: { tracks: Track[] }) {
  if (!tracks.length) return null;
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {tracks.map((track) => <TrackCard key={track.id} track={track} queue={tracks} />)}
    </div>
  );
}
