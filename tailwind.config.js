import defaultColors from 'tailwindcss/colors';

// Identidad Benitez Inmobiliaria: rosa coral #F5738A, fondo crema y tipografía serif de alto contraste.
// La paleta "indigo" que usa toda la app se reemplaza por el rosa de la marca.
const benitezPink = {
  50: '#FEF3F5',
  100: '#FDE4E9',
  200: '#FBCAD3',
  300: '#F8A6B5',
  400: '#F68A9D',
  500: '#F5738A',
  600: '#D94F6A',
  700: '#BC3F59',
  800: '#9A3349',
  900: '#77283A',
  950: '#45151F'
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: benitezPink,
        brand: benitezPink,
        // Grises cálidos con base crema, como las piezas de la marca
        slate: {
          ...defaultColors.stone,
          50: '#F6F2EE',
          100: '#EFE9E4'
        },
        cream: '#F3EEEA'
      },
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Bodoni Moda"', 'Didot', '"Playfair Display"', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
