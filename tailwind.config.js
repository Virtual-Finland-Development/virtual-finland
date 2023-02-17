/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1024px',
        '2xl': '1024px',
      },
    },
    extend: {
      colors: {
        'suomifi-light': '#2A6EBB',
        'suomifi-dark': '#00347A',
        'suomifi-blue-bg': '#EAF2FA',
        'suomifi-orange': '#e36209',
      },
      borderColor: {
        'suomifi-light': '#2A6EBB',
        'suomifi-dark': '#00347A',
      },
    },
  },
  plugins: [],
};
