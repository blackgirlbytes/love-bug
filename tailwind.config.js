/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        valentine: {
          primary: "#E94D84",    // Modern rose pink
          secondary: "#F178B6",  // Soft pink
          accent: "#FFACC7",     // Light pink
          background: "#FFF0F5", // Very light pink
          deep: "#D44D78",      // Deep rose
          light: "#FCE9F1",     // Lightest pink
          neutral: "#2A0B18",   // Deep burgundy for text
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(233, 77, 132, 0.1)',
        'glow': '0 0 20px rgba(233, 77, 132, 0.2)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}