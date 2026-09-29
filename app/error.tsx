"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <p className="kicker">Playback room error</p>
      <h1 className="h-display mt-4 text-[clamp(44px,8vw,76px)]">Something skipped.</h1>
      <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted">The catalogue or page hit a temporary snag. Try the room again.</p>
      <button onClick={() => reset()} className="btn-red mt-8">Try again</button>
    </main>
  );
}
