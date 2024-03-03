/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#440041',
        light: '#FFFBEC',
        dark: '#06030a',
        secondary: '#EF4444'
      }
    }
  },
  plugins: []
}
