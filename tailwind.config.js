/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#646cd6',
        'primary-gray': '#7d7e83',
      },
    },
  },
  plugins: [],
}
