/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)'
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
};


