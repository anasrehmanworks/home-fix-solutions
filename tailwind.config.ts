import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        steel: "#465564",
        brand: {
          blue: "#155EAD",
          sky: "#2F8FE8",
          red: "#D8342A",
          gold: "#F4B63F",
          pale: "#F3F8FE"
        }
      },
      boxShadow: {
        crisp: "0 12px 32px rgba(21, 94, 173, 0.12)"
      }
    }
  },
  plugins: [forms]
};

export default config;
