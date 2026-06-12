/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bark: {
          50: "#fdf8f0",
          100: "#f9edd8",
          200: "#f2d9af",
          300: "#e9bf7b",
          400: "#dfa04a",
          500: "#d6882e",
          600: "#c06d24",
          700: "#9f5221",
          800: "#814224",
          900: "#693821",
          950: "#3a1c0e",
        },
        amber: {
          400: "#d4a24e",
          500: "#c4922e",
          600: "#a87620",
        },
        parchment: "#f5f0e6",
        charcoal: "#2c2420",
      },
      fontFamily: {
        display: ['"Noto Serif SC"', '"SimSun"', '"STSong"', "serif"],
        body: ['"Noto Sans SC"', '"Microsoft YaHei"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
