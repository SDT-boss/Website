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
        "volt-strong":   "#7A9E1F",
        "grid-violet":   "#8B5CF6",
        "violet-strong": "#7C3AED",
        "ev-green":      "#7CC242",
        "ev-teal":       "#1A7080",
        topbar:          "#1A1D2E",
        surface:         "#22253A",
        "surface-2":     "#181B2C",
        "border-subtle": "#32375A",
        "text-secondary":"#8B93B5",
        "text-muted":    "#565E80",
        background:      "#1C1F35",
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "ui-serif", "serif"],
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
