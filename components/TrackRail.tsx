import Link from "next/link";
import { Track } from "@/lib/types";
import TrackCard from "./TrackCard";
import Icon from "./Icon";

export default function TrackRail({ title, kicker, tracks, href }: { title: string; kicker: string; tracks: Track[]; href?: string }) {
  if (!tracks.length) return null;
  return (
    <section className="mx-auto w-full max-w-7xl animate-rise">
      <div className="mb-7 flex items-end justify-between gap-4 border-b-2 border-ink px-5 pb-4 sm:px-8">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 className="h-display mt-2 text-[34px] sm:text-[44px]">{title}</h2>
        </div>
        {href && <Link href={href} className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[.16em] hover:text-vermilion sm:inline-flex">See the crate <Icon name="arrow" size={14} /></Link>}
      </div>
      <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-5 pb-6 pr-8 sm:px-8">
        {tracks.map((track) => (
          <div key={track.id} className="w-[155px] shrink-0 snap-start sm:w-[200px]"><TrackCard track={track} queue={tracks} /></div>
        ))}
      </div>
    </section>
  );
}
