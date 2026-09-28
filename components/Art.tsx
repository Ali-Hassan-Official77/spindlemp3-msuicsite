/* Hand-drawn SVG illustrations used across Spindle. */

export function VinylHero({ className = "" }: { className?: string }) {
  const grooves = [178, 164, 150, 136, 122, 108, 94];
  return (
    <svg viewBox="0 0 560 520" className={className} role="img" aria-label="A record sliding out of a vermilion sleeve, with a tonearm above it">
      <ellipse cx="290" cy="486" rx="230" ry="16" fill="#17130E" opacity=".12" />
      {/* sleeve */}
      <rect x="22" y="70" width="380" height="380" fill="#E4472B" stroke="#17130E" strokeWidth="3" />
      <rect x="38" y="86" width="348" height="348" fill="none" stroke="#17130E" strokeWidth="1.5" opacity=".55" />
      <circle cx="212" cy="222" r="96" fill="none" stroke="#17130E" strokeWidth="1.5" opacity=".5" />
      <circle cx="212" cy="222" r="60" fill="#F3ECDD" stroke="#17130E" strokeWidth="2" />
      <text x="212" y="216" textAnchor="middle" fontSize="15" letterSpacing="4" fill="#17130E" style={{ fontFamily: "var(--font-mono)" }}>SIDE</text>
      <text x="212" y="246" textAnchor="middle" fontSize="34" fill="#17130E" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>A</text>
      <text x="56" y="392" fontSize="42" fill="#F3ECDD" style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-1.5px" }}>Spindle</text>
      <text x="58" y="416" fontSize="11" letterSpacing="3.2" fill="#17130E" style={{ fontFamily: "var(--font-mono)" }}>THE INDEPENDENT RECORD ROOM</text>
      {/* record */}
      <g className="vinyl-spin">
        <circle cx="336" cy="262" r="190" fill="#17130E" />
        {grooves.map((r) => <circle key={r} cx="336" cy="262" r={r} fill="none" stroke="#F3ECDD" strokeOpacity=".075" strokeWidth="1.4" />)}
        <path d="M336 84a178 178 0 0 1 126 52" fill="none" stroke="#F3ECDD" strokeOpacity=".22" strokeWidth="6" strokeLinecap="round" />
        <path d="M336 440a178 178 0 0 1-126-52" fill="none" stroke="#F3ECDD" strokeOpacity=".14" strokeWidth="6" strokeLinecap="round" />
        <circle cx="336" cy="262" r="64" fill="#F3ECDD" />
        <circle cx="336" cy="262" r="55" fill="#E9B44C" stroke="#17130E" strokeWidth="2" />
        <circle cx="336" cy="262" r="40" fill="none" stroke="#17130E" strokeWidth="1.2" strokeDasharray="2 5" />
        <path d="M336 232l18 30h-36z" fill="#17130E" />
        <circle cx="336" cy="262" r="6.5" fill="#F3ECDD" stroke="#17130E" strokeWidth="2" />
      </g>
      {/* tonearm */}
      <g stroke="#17130E" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="516" cy="78" r="26" fill="#F3ECDD" strokeWidth="3" />
        <circle cx="516" cy="78" r="9" fill="#17130E" />
        <path d="M516 78L470 226" fill="none" strokeWidth="7" />
        <path d="M470 226l-14 34" fill="none" strokeWidth="7" />
        <rect x="438" y="252" width="34" height="18" rx="3" fill="#E4472B" strokeWidth="3" transform="rotate(-24 455 261)" />
      </g>
    </svg>
  );
}

export function CrateTile({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true">
      <circle cx="78" cy="42" r="36" fill="#17130E" />
      <circle cx="78" cy="42" r="26" fill="none" stroke="#F3ECDD" strokeOpacity=".16" />
      <circle cx="78" cy="42" r="11" fill={color} stroke="#F3ECDD" strokeOpacity=".5" />
      <circle cx="78" cy="42" r="2" fill="#F3ECDD" />
      <rect x="10" y="12" width="66" height="66" fill={color} stroke="#17130E" strokeWidth="2.5" />
      <rect x="17" y="19" width="52" height="52" fill="none" stroke="#17130E" strokeOpacity=".4" />
      <circle cx="43" cy="45" r="14" fill="none" stroke="#17130E" strokeOpacity=".5" strokeWidth="1.5" />
      <circle cx="43" cy="45" r="4" fill="#F3ECDD" stroke="#17130E" strokeWidth="1.5" />
    </svg>
  );
}

export function Stylus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
      <circle cx="24" cy="24" r="19" />
      <circle cx="24" cy="24" r="12" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path d="M43 5 30 21" />
    </svg>
  );
}
