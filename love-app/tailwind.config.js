/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index02.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b81',
        secondary: '#ff4757',
        dark: '#2f3542',
        light: '#f1f2f6',
      },
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
