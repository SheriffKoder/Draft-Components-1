/** @type {import('tailwindcss').Config} */

const colors = require('./app/(components)/(UI)/NavRE/constants.jsx');

module.exports = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  theme: {
    colors,
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

      },
    },
  },
  plugins: [
    require("tailwindcss-autofill"),
    require("tailwindcss-shadow-fill"),
    require("tailwindcss-text-fill"),


  ],
}

