/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': 'hsl(168, 75%, 52%)',
        primary: 'hsl(168, 75%, 42%)',
        'primary-600': 'hsl(168, 75%, 32%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}