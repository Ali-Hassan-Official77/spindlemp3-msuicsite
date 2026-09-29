export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#14120F"/>
      <circle cx="32" cy="32" r="22" fill="none" stroke="#F5F1E8" strokeOpacity=".18" strokeWidth="1.5"/>
      <circle cx="32" cy="32" r="15.5" fill="none" stroke="#F5F1E8" strokeOpacity=".12" strokeWidth="1.2"/>
      <path d="M12 26C15 16.5 22 11 31 10" fill="none" stroke="#F5F1E8" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="9.5" fill="#FF4D2E"/>
      <circle cx="32" cy="32" r="2.5" fill="#F5F1E8"/>
    </svg>
  );
}
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={34}/>
      <span className={`font-display text-[26px] font-semibold leading-none tracking-[-.045em] sm:text-[28px] ${light ? "text-paper" : "text-ink"}`}>
        Spindle<span className="text-vermilion">.</span>
      </span>
    </span>
  );
}
