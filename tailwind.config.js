/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Oakes: "Oakes",
    },
    extend: {
      backgroundImage: {
        paper: "url('../public/images/paper.png')",
        darkPaper: "url('../public/images/darkPaper.png')",
      },
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
        validGreen: "#3AB795",
        wrongRed: "#A40606",
        mandarin: "#EF8354",
        lightMandarin: "#f5b69a",
        pink: "#EE4B6A",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
