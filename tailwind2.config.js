/** @type {import('tailwindcss').Config} */

const colors = require('./app/(components)/(UI)/NavRE/constants.jsx');

module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  theme: {
    colors,
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',

      // for the gradientBackgroundSwitch to use the css root colors
      // alpha-value to use /50 for example for opacity values
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)'
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'var(--destructive-foreground) / <alpha-value>'
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)'
        }
      },
    },
  },
  plugins: [
    require("tailwindcss-autofill"),
    require("tailwindcss-shadow-fill"),
    require("tailwindcss-text-fill"),


  ],
}

