/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
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
        red: "#ffe5de",
        lightGray: "#F2F4F8",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
