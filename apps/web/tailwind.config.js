const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#030712',
      white: '#ffffff',
      offwhite: '#f9fafb',
      primary: {
        light: '#6366f1',
        DEFAULT: '#4f46e5',
        dark: '#4338ca',
      },
      gray: {
        100: colors.gray[100],
        200: colors.gray[200],
        300: colors.gray[300],
        400: colors.gray[400],
        500: colors.gray[500],
        600: colors.gray[600],
        700: colors.gray[700],
        800: colors.gray[800],
        900: colors.gray[900],
      },
    },
    extend: {},
  },
  plugins: [],
};
