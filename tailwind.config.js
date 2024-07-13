/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif']
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7462F4 ',
          100: '#C8B7D5',
          900: '#2e2762'
        },
        secondary: {
          DEFAULT: '#802BD6'
        },
        success: {
          DEFAULT: '#12b669'
        },
        error: {
          DEFAULT: '#f04437'
        },
        alert: { DEFAULT: '#fcb900' },
        warning: {
          DEFAULT: '#ff6900'
        },
        neutrals: {
          DEFAULT: '#81808c',
          100: '#efeff1',
          200: '#e0dfe2',
          300: '#c0bfc5',
          400: '#a1a0a9',
          500: '#81808c',
          600: '#62606f',
          700: '#4e4d59',
          800: '#3b3a43',
          900: '#27262c',
          1000: '#141316'
        },
        white: {
          DEFAULT: '#ffffff'
        },
        black: {
          DEFAULT: '#000000'
        }
      }
    }
  },
  plugins: []
}
