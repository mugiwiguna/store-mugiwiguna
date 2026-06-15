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
        // Notion palette
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
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        DEFAULT: "0 1px 3px rgba(0,0,0,0.08)",
        hover: "0 2px 8px rgba(0,0,0,0.1)",
        lg: "0 4px 16px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
