/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Nunito: "Nunito Sans",
    },
    extend: {
      colors: {
        darkInput: "#2B3945",
        darkBackground: "#202C37",
        lightText: "#111517",
        ligthInput: "#858585",
        lightBackground: "#FAFAFA",
        darkText: "#FFFFFF",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
