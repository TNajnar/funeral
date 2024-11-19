/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#2554bc',
        'blue-secondary': '#646cd6',
        'blue-light': '#f6f9ff',
        'blue-dark': '#4a52b2',

        'gray': '#bbbbbb',
        'gray-light': '#f5f5f5',
        'gray-lighter': '#f2f2f2',
        'gray-dark': '#7d7e83', // Tmavší šedá
        'gray-muted': '#b1b4ba', // Tlumená šedá
        

        'button-primary': {
          'background': '#E5E5E5',
          'text': '#33363f',
          'disabled-background': '#efefef',
          'disabled-text': '#cccccc',
        },
        'button-secondary': {
          'background': '#2554bc',
          'disabled-background': '#efefef',
          'disabled-text': '#cccccc',
        }
      },
      boxShadow: {
        'custom': '0 12px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
