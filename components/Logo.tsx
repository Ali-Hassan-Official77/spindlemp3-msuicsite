export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <circle cx="32" cy="32" r="29" fill="#17130E" />
      <circle cx="32" cy="32" r="23.5" fill="none" stroke="#F3ECDD" strokeOpacity=".2" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="18.5" fill="none" stroke="#F3ECDD" strokeOpacity=".16" strokeWidth="1.2" />
      <path d="M11 23.5A23 23 0 0 1 26 10.2" fill="none" stroke="#F3ECDD" strokeOpacity=".55" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="11.5" fill="#E4472B" />
      <circle cx="32" cy="32" r="2.6" fill="#F3ECDD" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-display text-[27px] font-semibold leading-none tracking-[-.04em] ${light ? "text-paper" : "text-ink"}`}>
        Spindle<span className="text-vermilion">.</span>
      </span>
    </span>
  );
}
