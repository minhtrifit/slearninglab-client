/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-bg": "#16161a",
        "light-bg": "#fffffe",
        "dark-blue": "#1668dc",
        "light-blue": "#287aed",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
