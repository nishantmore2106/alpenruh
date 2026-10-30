/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#243C32',
        'alpine-green': '#526B4D',
        'warm-ivory': '#F5F2EA',
        'charcoal': '#242720',
        'soft-beige': '#D9CFBD',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        display: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
