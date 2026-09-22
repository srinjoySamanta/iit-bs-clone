/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kgp: {
          crimson: '#800000',
          darkred: '#5e0000',
          lightred: '#a31515',
          gold: '#c59b27',
          lightgold: '#e6be53',
          navy: '#0b1d3a',
          darknavy: '#061022',
          lightnavy: '#1a335e',
          slate: '#1e293b',
          bg: '#f8fafc'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
