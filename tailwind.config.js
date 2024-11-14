/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#646cd6',
        'primary-blue-light': '##f6f9ff',
        'primary-blue-dark': '#4a52b2',
        'blue': '#2554bc',
        'primary-gray': '#7d7e83',
        'gray': '#bbbbbb',
        'gray-dark': '#ddd',
      },
      boxShadow: {
        'custom': '0 12px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
