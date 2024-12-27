/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        "log-template": "max-content max-content 1fr",
      },
      animation: {
        showElement: "showElement 0.25s ease-in",
      },
      keyframes: {
        showElement: {
          "0%": { filter: "brightness(0)" },
          "50%": { filter: "brightness(0.5)" },
          "100%": { filter: "brightness(1)" },
        },
      },
    },
  },
  plugins: [],
};
