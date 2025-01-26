import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D9CDB",
          light: "#4DABDD",
          dark: "#2280B9",
        },
        background: {
          DEFAULT: "#F9FAFB",
          dark: "#1F2937",
        },
        text: {
          DEFAULT: "#4F4F4F",
          light: "#6B7280",
          dark: "#1F2937",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#374151",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
