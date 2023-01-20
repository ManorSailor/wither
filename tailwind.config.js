/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js}', './dist/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'Quicksand', ...defaultTheme.fontFamily.sans],
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
