/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "title-font-01": ["Amatic SC", "Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
