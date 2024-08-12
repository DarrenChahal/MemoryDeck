/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const CustomStyle = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective-1000": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-metallic-gray': '#333333', // A darker metallic gray leaning towards black
      },
      backgroundImage: {
        'black-red-gradient': 'linear-gradient(135deg, #000000 0%, #330000 30%, #660000 60%, #ff0000 100%)',
      },
    },
  },
  plugins: [CustomStyle],
}
