/** @type {import('tailwindcss').Config} */

const colors = require('./app/(components)/(UI)/NavRE/constants.jsx');


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: 'class',

  theme: {
    // colors,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ...colors,
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
    screens: {
      'vp1': '360px',
      // => @media (min-width: 640px) { ... }

      'vp2': '470px',
      // => @media (min-width: 768px) { ... }

      'vp3': '570px',
      // => @media (min-width: 768px) { ... }

      'vp4': '700px',
      
      'vp5': '1024px',
      // => @media (min-width: 1024px) { ... }

      'vp6': '1120px',
      // => @media (min-width: 1024px) { ... }

      'vp7': '1280px',
      // => @media (min-width: 1280px) { ... }

      'vp8': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("tailwindcss-autofill"),
    require("tailwindcss-shadow-fill"),
    require("tailwindcss-text-fill"),


  ],
}

