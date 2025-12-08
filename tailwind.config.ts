import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        "pg-jitter": "pg-jitter 0.44s ease-in-out infinite",
        "pg-sweep": "pg-sweep 0.9s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.6s ease-out infinite", // 🟢 new animation
        marquee: "marquee 32s linear infinite",
        scrollRight: "scrollRight 60s linear infinite",
      },
      keyframes: {
        "pg-jitter": {
          "0%": { transform: "translate3d(0,0,0) rotate(0)" },
          "20%": {
            transform:
              "translate3d(calc(-1 * var(--pg-jitter-x)), var(--pg-jitter-y), 0) rotate(calc(-1 * var(--pg-jitter-deg)))",
          },
          "40%": {
            transform:
              "translate3d(var(--pg-jitter-x), calc(-0.75 * var(--pg-jitter-y)), 0) rotate(var(--pg-jitter-deg))",
          },
          "60%": {
            transform:
              "translate3d(calc(-0.6 * var(--pg-jitter-x)), calc(0.5 * var(--pg-jitter-y)), 0) rotate(calc(-0.6 * var(--pg-jitter-deg)))",
          },
          "80%": {
            transform:
              "translate3d(calc(0.6 * var(--pg-jitter-x)), calc(-0.4 * var(--pg-jitter-y)), 0) rotate(calc(0.6 * var(--pg-jitter-deg)))",
          },
          "100%": { transform: "translate3d(0,0,0) rotate(0)" },
        },
        "pg-sweep": {
          "0%": { backgroundPositionX: "150%" },
          "50%": { backgroundPositionX: "-50%" },
          "100%": { backgroundPositionX: "150%" },
        },
        // 🟢 your new keyframes for the online pulse
        "pulse-ring": {
          "0%": { transform: "scale(0.5)", opacity: "0.8" },
          "70%": { transform: "scale(1.1)", opacity: "0" },
          "100%": { transform: "scale(1.1)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "inner-custom": "inset 0px 0px 20px 0px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
