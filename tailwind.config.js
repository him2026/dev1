/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B004A', // Deep Magenta
          light: '#E6D3DB',   // Soft Lavender
        },
        secondary: {
          DEFAULT: '#A93226', // Reddish Orange
          light: '#F8E8E8',
        },
        background: '#F2EFE7', // Warm Beige
        surface: '#FFFFFF',
        accent: '#D4AF37',   // Gold/Warm Accent
      },
      borderRadius: {
        '4xl': '40px',
        '5xl': '50px',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(139, 0, 74, 0.12)',
        'soft': '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        outfit: ["Outfit"],
        inter: ["Inter"],
      },
    },
  },

  plugins: [],
}
