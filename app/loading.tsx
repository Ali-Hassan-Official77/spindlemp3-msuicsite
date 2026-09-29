export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24" aria-busy="true">
      <div className="h-3 w-28 animate-pulse bg-paper-3" />
      <div className="mt-5 h-14 w-full max-w-2xl animate-pulse bg-paper-3 sm:h-24" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({length:10}).map((_,i)=><div key={i} className="animate-pulse"><div className="aspect-square bg-paper-3"/><div className="mt-3 h-4 w-3/4 bg-paper-3"/><div className="mt-2 h-3 w-1/2 bg-paper-3"/></div>)}
      </div>
    </div>
  );
}
