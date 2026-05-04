/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF7096',
          light: '#FFF0F3',
        },
        secondary: {
          DEFAULT: '#9B8EC0',
          light: '#F3EEFF',
        },
        sage: '#7CB69E',
        mint: '#E8FFEF',
        warning: '#F4A261',
      },
      fontFamily: {
        outfit: ["Outfit"],
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
}
