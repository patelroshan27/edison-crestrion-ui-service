/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  darkMode: "class",
  plugins: [
    require('tailwindcss-animated'),
    nextui({
      themes: {
        dark: {
          colors: {
            active: "#F5A524",
            primary: {
              foreground: "#000000",
              DEFAULT: "#F5A524",
            },
            secondary: {
              foreground: "#3f3f46",
              DEFAULT: '#FEFCE8',
            }
          },
        }
      }
    })],
}
