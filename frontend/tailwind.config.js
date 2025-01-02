/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: '#BAAFD5',
        'space-cadet': '#151E42',
        'mountbatten-pink': '#8F727D',
        'ghost-white': '#F0F1FA',
        night: '#070B0F',
        'cool-gray': '#877EAC',
        'ghost-white-2': '#F8F7FD',
        'ghost-white-3': '#EDEDF3',
        tekhelet: '#372C7E',
        mauve: '#D1B7EF'
      }
    }
  },
  plugins: [],
}

