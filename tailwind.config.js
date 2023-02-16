/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'suomifi-light': '#2A6EBB',
        'suomifi-dark': '#00347A',
        'suomifi-blue-bg': '#EAF2FA',
      },
      borderColor: {
        'suomifi-light': '#2A6EBB',
        'suomifi-dark': '#00347A',
      },
    },
  },
  plugins: [],
};
