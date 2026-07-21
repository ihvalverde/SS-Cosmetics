/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mauve': '#D28CA8',
        'mauve-light': '#EAA7C0',
        'mauve-bg': '#FFF7F9',
        'mauve-text': '#333333',
      }
    },
  },
  plugins: [],
}
