/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Nunito: "Nunito Sans",
      Oakes: "Oakes",
    },
    extend: {
      colors: {
        primary: "#0E94D7",
        darkInput: "#2B3945",
        darkBackground: "#202C37",
        lightText: "#111517",
        ligthInput: "#858585",
        lightBackground: "#FAFAFA",
        darkText: "#FFFFFF",

        lightGray: "#F2F4F8",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
