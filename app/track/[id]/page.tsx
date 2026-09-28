import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { ChartRow } from "@/components/TrackCard";
import TrackPageControls from "@/components/TrackPageControls";
import { getTrack, getTrending } from "@/lib/audius";
import { formatDuration, formatPlays } from "@/lib/format";
export const runtime = 'edge';
export const revalidate = 120;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) return { title: "Track not found" };
  return { title: `${track.title} — ${track.artist}`, description: `Listen to ${track.title} by ${track.artist} on Spindle.` };
}

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) notFound();
  const related = (await getTrending(track.genre).catch(() => [])).filter((t) => t.id !== track.id).slice(0, 8);
  const notes: [string, string][] = [
    ["Artist", track.artist],
    ["Genre", track.genre || "Independent"],
    ["Mood", track.mood || "—"],
    ["Released", track.releaseDate ? new Date(track.releaseDate).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }) : "—"],
    ["Length", formatDuration(track.duration)],
    ["Plays", formatPlays(track.playCount)],
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-16">
        <div className="relative">
          <svg viewBox="0 0 100 100" className="absolute -right-10 top-4 hidden h-[92%] w-[92%] sm:block" aria-hidden="true">
            <circle cx="50" cy="50" r="48" fill="#17130E" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F3ECDD" strokeOpacity=".12" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#F3ECDD" strokeOpacity=".1" />
            <circle cx="50" cy="50" r="14" fill="#E4472B" />
            <circle cx="50" cy="50" r="2.4" fill="#F3ECDD" />
          </svg>
          <div className="sleeve relative aspect-square w-full sm:w-[88%]"><SafeImage src={track.artwork} alt={`${track.title} cover art`} fill sizes="460px" className="object-cover" priority /></div>
        </div>
        <div className="min-w-0 self-center">
          <p className="kicker">{track.genre || "Independent"}</p>
          <h1 className="h-display mt-3 break-words text-[clamp(38px,6vw,84px)]">{track.title}</h1>
          <p className="mt-4 font-mono text-[13px] uppercase tracking-[.16em] text-muted">by {track.artist}</p>
          <TrackPageControls track={track} queue={[track, ...related]} />
          <dl className="mt-10 grid grid-cols-2 border-t-2 border-ink sm:grid-cols-3">
            {notes.map(([k, v]) => (
              <div key={k} className="border-b-2 border-ink/20 py-4 pr-4">
                <dt className="font-mono text-[10px] uppercase tracking-[.18em] text-vermilion">{k}</dt>
                <dd className="mt-1 truncate font-display text-[20px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          {track.description && <p className="mt-8 max-w-2xl whitespace-pre-line text-[15px] leading-7 text-ink/75">{track.description}</p>}
          {track.tags && track.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">{track.tags.slice(0, 8).map((t) => <li key={t} className="border-2 border-ink/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-muted">#{t.trim()}</li>)}</ul>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-4 border-b-2 border-ink pb-4"><p className="kicker">Flip it over</p><h2 className="h-display mt-2 text-[34px] sm:text-[48px]">Side B</h2></div>
          <div className="grid gap-x-14 lg:grid-cols-2">
            {related.map((t, i) => <ChartRow key={t.id} track={t} index={i + 1} queue={related} />)}
          </div>
        </section>
      )}
    </div>
  );
}
