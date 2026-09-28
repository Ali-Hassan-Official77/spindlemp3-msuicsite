import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F3ECDD",
        "paper-2": "#EAE1CE",
        "paper-3": "#DDD1B8",
        ink: "#17130E",
        vermilion: "#E4472B",
        mustard: "#E9B44C",
        muted: "#75695A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        spin: { to: { transform: "rotate(360deg)" } },
        rise: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        rise: "rise .6s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
