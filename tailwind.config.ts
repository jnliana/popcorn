/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#6741d9',
        text: '#dee2e6',
        900: '#212529',
        500: '#2b3035',
        100: '#343a40',
      },
    },
  },
  plugins: [],
};
