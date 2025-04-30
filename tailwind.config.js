/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: '#1995AD',      // Primary teal
        lightblue: '#A1D6E2',  // Light blue
        lightgray: '#F1F1F2',  // Light gray
        red: '#F52549',        // Red
        pink: '#FA6775',       // Pink
        offwhite: '#F1F1F2',   // Using light gray as background
      },
    },
  },
  plugins: [],
} 