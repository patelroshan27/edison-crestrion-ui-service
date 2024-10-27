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
            active: "#ffffff",
            background: '#000000',
            primary: {
              foreground: "#374151",
              DEFAULT: "#ffffff",
            },
            secondary: {
              foreground: "#374151",
              DEFAULT: '#374151',
            }
          },
        },
        light: {
          colors: {
            active: "#000000",
            background: '#ffffff',
            primary: {
              foreground: "#f2f2f2",
              DEFAULT: "#000000",
            },
            secondary: {
              foreground: "#f2f2f2",
              DEFAULT: '#f2f2f2',
            }
          },
        },

      }
    })],
}
