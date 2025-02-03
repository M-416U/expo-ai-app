/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4338ca",
        },
        secondary: {
          DEFAULT: "#4f46e5",
          dark: "#3730a3",
        },
        accent: "#f59e0b",
        surface: {
          DEFAULT: "#ffffff",
          dark: "#1e1e1e",
        },
        error: "#dc2626",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["SpaceMono", "monospace"],
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
      borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
      },
    },
  },
  plugins: [],
};
