import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-jade":    "#008684",
        "jade-strong":   "#007069",
        "volt-green":    "#96D02C",
        "volt-strong":   "#557A12",
        "grid-violet":   "#7C3AED",
        "violet-strong": "#5B21B6",
        "ev-green":      "#7CC242",
        "ev-teal":       "#1A7080",
        topbar:          "#1A1A1A",
        surface:         "#111111",
        "surface-2":     "#1A1A1A",
        "border-subtle": "#2a2a2a",
        "text-secondary":"#a1a1aa",
        "text-muted":    "#52525b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tight: "-0.02em",
        tighter: "-0.04em",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
