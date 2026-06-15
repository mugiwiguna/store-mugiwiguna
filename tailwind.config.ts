import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Notion-inspired palette
        page: "#FFFFFF",
        surface: "#F7F6F3",
        hover: "#F4F4F0",
        selected: "#E8E8E3",
        "notion-black": "#37352F",
        "notion-gray": "#787774",
        "notion-border": "#E8E8E3",
        "notion-border-hover": "#CFCECA",
        accent: {
          DEFAULT: "#2383E2",
          hover: "#1B6FBF",
          subtle: "#E8F2FC",
        },
        success: "#238636",
        warning: "#D29922",
        error: "#E03E3E",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["20px", { lineHeight: "1.3" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["32px", { lineHeight: "1.2" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "8px",
        xl: "12px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        DEFAULT: "0 1px 3px rgba(0,0,0,0.08)",
        hover: "0 2px 8px rgba(0,0,0,0.1)",
        lg: "0 4px 16px rgba(0,0,0,0.12)",
      },
      transitionDuration: {
        fast: "100ms",
        base: "150ms",
        slow: "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
