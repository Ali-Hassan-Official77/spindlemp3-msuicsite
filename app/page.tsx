import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import TrackRail from "@/components/TrackRail";
import { ChartRow } from "@/components/TrackCard";
import FAQ from "@/components/FAQ";
import Icon from "@/components/Icon";
import { VinylHero, CrateTile } from "@/components/Art";
import { getTrending } from "@/lib/audius";
import { GENRES } from "@/lib/genres";
export const runtime = 'edge';
export const revalidate = 60;

const principles = [
  { n: "01", title: "Listen first", text: "No feeds to scroll, no pop-ups, no noise. Find a record, press play, and the player follows you through the whole room." },
  { n: "02", title: "Keep what you love", text: "Add any record to My Crate with one tap. It is saved privately in your browser, so there is nothing to sign up for." },
  { n: "03", title: "Straight from the artist", text: "Everything here is released by independent artists. You hear the record the way it was pressed, credited to the person who made it." },
];

export default async function HomePage() {
  const [trending, electronic, hiphop, pop, rnb, lofi] = await Promise.all([
    getTrending().catch(() => []),
    getTrending("Electronic").catch(() => []),
    getTrending("Hip-Hop/Rap").catch(() => []),
    getTrending("Pop").catch(() => []),
    getTrending("R&B").catch(() => []),
    getTrending("Lo-Fi").catch(() => []),
  ]);
  const chart = trending.slice(0, 10);

  return (
    <div>
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-vermilion/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:py-20">
          <div className="animate-rise">
            <p className="kicker">Vol. 01 — The independent record room</p>
            <h1 className="h-display mt-5 text-[clamp(48px,8.4vw,112px)]">
              Records worth <em className="font-normal text-vermilion">staying up</em> for.
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-ink/75 sm:text-[17px] sm:leading-8">
              A free listening room for music that never needed a label. Dig through the crates, drop the needle on something new, and keep the ones that stick.
            </p>
            <div className="mt-9 max-w-xl"><SearchBar /></div>
            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-[.16em] text-muted">
              <li className="inline-flex items-center gap-2"><Icon name="check" size={13} />Free to stream</li>
              <li className="inline-flex items-center gap-2"><Icon name="check" size={13} />No account</li>
              <li className="inline-flex items-center gap-2"><Icon name="check" size={13} />Private crate</li>
            </ul>
          </div>
          <VinylHero className="mx-auto w-full max-w-[500px] lg:max-w-[560px]" />
        </div>
      </section>

      <div className="overflow-hidden border-b-2 border-ink bg-vermilion py-3 text-paper" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-[26px] font-medium italic tracking-[-.02em]">
          {[...GENRES, ...GENRES, ...GENRES].map((g, i) => <span key={i} className="inline-flex items-center gap-8">{g.name}<span className="not-italic">✦</span></span>)}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-24 py-16 sm:gap-28 sm:py-24">
        {chart.length > 0 && (
          <section className="px-5 sm:px-8">
            <div className="mb-8 flex items-end justify-between gap-4 border-b-2 border-ink pb-4">
              <div><p className="kicker">Updated weekly</p><h2 className="h-display mt-2 text-[34px] sm:text-[52px]">The Chart</h2></div>
              <p className="hidden max-w-xs text-right text-[14px] leading-6 text-muted sm:block">The ten records most people are spinning right now.</p>
            </div>
            <div className="grid gap-x-14 lg:grid-cols-2">
              <div>{chart.slice(0, 5).map((t, i) => <ChartRow key={t.id} track={t} index={i + 1} queue={chart} />)}</div>
              <div>{chart.slice(5, 10).map((t, i) => <ChartRow key={t.id} track={t} index={i + 6} queue={chart} />)}</div>
            </div>
          </section>
        )}

        <section className="px-5 sm:px-8">
          <div className="mb-8 flex items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <div><p className="kicker">Pick a shelf</p><h2 className="h-display mt-2 text-[34px] sm:text-[52px]">Browse the crates</h2></div>
            <Link href="/search" className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[.16em] hover:text-vermilion sm:inline-flex">All music <Icon name="arrow" size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {GENRES.map((g) => (
              <Link key={g.name} href={`/search?genre=${encodeURIComponent(g.query)}`} className="group border-2 border-ink bg-paper-2 p-4 transition hover:-translate-y-1 hover:bg-paper-3 hover:shadow-[5px_5px_0_#17130E]">
                <CrateTile color={g.color} className="w-full" />
                <div className="mt-3 flex items-center justify-between"><span className="font-display text-[21px] font-medium tracking-[-.02em]">{g.name}</span><Icon name="arrow" size={16} className="transition group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        </section>

        <TrackRail kicker="On the turntable" title="Trending this week" tracks={trending} href="/search" />
        <TrackRail kicker="Side A · synths & pulse" title="Electronic" tracks={electronic} href="/search?genre=Electronic" />
        <TrackRail kicker="Bars & basslines" title="Hip-Hop" tracks={hiphop} href="/search?genre=Hip-Hop%2FRap" />
        <TrackRail kicker="Hooks, pressed" title="Pop" tracks={pop} href="/search?genre=Pop" />
        <TrackRail kicker="Slow-burn soul" title="R&B" tracks={rnb} href="/search?genre=R%26B" />
        <TrackRail kicker="For late nights" title="Lo-Fi" tracks={lofi} href="/search?genre=Lo-Fi" />

        {!trending.length && (
          <div className="mx-5 border-2 border-dashed border-ink p-10 text-center sm:mx-8">
            <p className="h-display text-[32px]">The crates are being restocked.</p>
            <p className="mt-2 text-[15px] text-muted">Try searching for an artist, or check back in a moment.</p>
          </div>
        )}
      </div>

      <section className="border-y-2 border-ink bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="kicker">House rules</p>
          <h2 className="h-display mt-3 max-w-3xl text-[clamp(40px,6vw,84px)]">Small room. <em className="font-normal text-mustard">Loud records.</em></h2>
          <div className="mt-14 grid gap-px bg-paper/20 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.n} className="bg-ink p-7 md:p-9">
                <span className="font-display text-[56px] font-semibold leading-none tracking-[-.05em] text-vermilion">{p.n}</span>
                <h3 className="mt-6 font-display text-[28px] font-medium tracking-[-.02em]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-paper/65">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28" id="faq">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="kicker">Before you dig in</p><h2 className="h-display mt-3 text-[clamp(38px,5vw,64px)]">Good questions.</h2><p className="mt-5 max-w-sm text-[16px] leading-7 text-ink/70">The short version of how Spindle works.</p></div>
          <FAQ />
        </div>
      </section>
    </div>
  );
}
