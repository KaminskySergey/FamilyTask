/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",

        primary: "#A855F7",
        "primary-dark": "#7C3AED",
        "primary-light": "#EDE9FE",

        success: "#22C55E",
        "success-bg": "#F0FDF4",

        warning: "#F97316",
        "warning-bg": "#FFF7ED",

        danger: "#EF4444",
        "danger-bg": "#FEF2F2",

        pink: "#EC4899",
        "pink-bg": "#FDF2F8",

        gold: "#F59E0B",
        "gold-bg": "#FFFBEB",

        cyan: "#06B6D4",
        "cyan-bg": "#ECFEFF",

        blue: "#3B82F6",
        "blue-bg": "#EFF6FF",

        streak: "#F97316",
        "streak-bg": "#FFF7ED",

        background: "#E9ECF4",
        surface: "#FFFFFF",
        card: "#FFFFFF",

        border: "#E5E7EB",
        divider: "#F1F5F9",

        input: "#F8FAFC",

        text: "#111827",
        "text-secondary": "#4B5563",
        muted: "#6B7280",
        light: "#9CA3AF",
        placeholder: "#9CA3AF",

        overlay: "rgba(0,0,0,0.45)",
      },

      fontSize: {
        h1: "32px",
        h2: "24px",
        h3: "16px",
        body: "14px",
        label: "11px",
        points: "12px",
      },

      borderRadius: {
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.05)",
        modal: "0 10px 40px rgba(0,0,0,0.12)",
      },
    },
  },

  plugins: [],
};
