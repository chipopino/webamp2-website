/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        accent: '#0A0',
        error: '#e3342f',
        success: '#0A0',
        Warning: '#0A0',
        Info: '#0A0',
      },
    },
  },
  plugins: [],
}

