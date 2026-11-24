import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14161A",
        steel: "#465564",
        night: "#0A0A0B",
        coal: "#141518",
        smoke: "#1C1E22",
        mist: "#2A2D33",
        brand: {
          blue: "#0050A0",
          deep: "#003D7A",
          sky: "#3E9BFF",
          ice: "#7FB3EC",
          red: "#C22F24",
          gold: "#F4B63F",
          pale: "#EEF3F9"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "var(--font-manrope)", "Arial", "sans-serif"],
        sans: ["var(--font-manrope)", "Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        crisp: "0 12px 32px rgba(10, 20, 40, 0.14)",
        lift: "0 24px 60px rgba(4, 12, 28, 0.35)",
        glow: "0 0 0 1px rgba(62, 155, 255, 0.35), 0 18px 50px rgba(0, 80, 160, 0.35)"
      }
    }
  },
  plugins: [forms]
};

export default config;
