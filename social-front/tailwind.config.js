/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        "background": "#2f2f2f",
        "foreground": "#f1f1f1",
        "primary": "#00a055"
      },
    },
  },
  plugins: [],
}