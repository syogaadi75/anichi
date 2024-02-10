/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#440041',
        light: '#F9F1D5',
        dark: '#06030a',
        secondary: '#972bd1'
      }
    }
  },
  plugins: []
}
