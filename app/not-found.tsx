import Link from "next/link";
import { Stylus } from "@/components/Art";
export const runtime = 'edge';
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[68vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <Stylus className="h-16 w-16 text-vermilion" />
      <p className="kicker mt-8">Error 404</p>
      <h1 className="h-display mt-3 text-[48px] sm:text-[64px]">Needle skipped.</h1>
      <p className="mt-4 max-w-md text-[16px] leading-7 text-ink/70">That page isn't on the shelf. It may have moved, or the artist may have pulled the record.</p>
      <Link href="/" className="btn-ink mt-8">Back to the record room</Link>
    </div>
  );
}
