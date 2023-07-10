/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Overpass", "sans-serif"],
      },
      colors: {
        cetaceanBlue: "#0E0736",
        oceanBlue: "#3D3AC4",
        russianViolet: "#302A4D",
      },
    },
  },
  plugins: [],
};
