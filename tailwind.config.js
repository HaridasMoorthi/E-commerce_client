/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nykaa: {
          pink: '#fc2779',
          darkPink: '#e01664',
          lightPink: '#fff0f5',
          gold: '#d4af37',
          dark: '#1e1e24',
          charcoal: '#2e2e38',
          border: '#e5e7eb',
          subtext: '#6b7280'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif']
      },
      aspectRatio: {
        '3/4': '3 / 4',
      }
    },
  },
  plugins: [],
}
