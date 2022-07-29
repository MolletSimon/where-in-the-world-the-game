/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Oakes: "Oakes",
    },
    extend: {
      backgroundImage: {
        'note': "url('../public/images/note.png')",
        'postit': "url('../public/images/postit.png')",
        'paper': "url('../public/images/paper.png')"
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
