/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        aura: "#0ff",   // glowing cyan aura
        ritual: "#ff0", // ceremonial yellow
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 200, 255, 0.6)", // motif-driven glow
      },
    },
  },
  plugins: [],
};
