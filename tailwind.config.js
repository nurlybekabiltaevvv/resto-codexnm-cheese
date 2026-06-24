/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-secondary': '#FFFFFF',
        'accent': '#FF6B00',
        'text-primary': '#FFFFFF',
        'text-secondary': '#000000',
        'dim': '#333333',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}