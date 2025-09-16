/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary': '#4A90E2',
        'primary-light': '#E8F4FD',
        'text-dark': '#2C3E50',
        'text-medium': '#6C757D',
        'success': '#28A745',
        'warning': '#FFC107',
        'dark-bg': '#101727',
        'dark-card': '#1f2937',
      },
    },
  },
  plugins: [],
}
