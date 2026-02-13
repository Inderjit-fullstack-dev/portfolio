import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f7ff",
          100: "#e8ebff",
          200: "#cfd6ff",
          300: "#a7b3ff",
          400: "#7a84ff",
          500: "#585cf7",
          600: "#4744e0",
          700: "#3b39b8",
          800: "#2f2f8f",
          900: "#24256a",
          950: "#14143b"
        },
        slateblue: {
          50: "#f1f4ff",
          100: "#e3e8ff",
          200: "#c7d1ff",
          300: "#9fb0ff",
          400: "#6f86ff",
          500: "#4e61ff",
          600: "#3f45f5",
          700: "#3537cf",
          800: "#2d2fa4",
          900: "#262b7f"
        },
        sand: {
          50: "#fff7ee",
          100: "#ffe9d1",
          200: "#ffd2a3",
          300: "#ffb46b",
          400: "#ff9140",
          500: "#ff6d1a",
          600: "#f45709",
          700: "#cc3d06",
          800: "#a12f0b",
          900: "#7f270c"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(78,97,255,0.2), 0 12px 40px rgba(78,97,255,0.25)",
        card: "0 16px 40px rgba(15, 23, 42, 0.08)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
