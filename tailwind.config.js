/** @type {import('tailwindcss').Config} */
export default {
  content: ['./client/index.html', './client/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Investing Section 8 brand palette — tweak to match the real brand kit.
        brand: {
          DEFAULT: '#0f766e',
          dark: '#0b5650',
          light: '#14b8a6',
        },
        ink: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
