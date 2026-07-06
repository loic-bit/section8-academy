/** @type {import('tailwindcss').Config} */
export default {
  content: ['./client/index.html', './client/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Investing Section 8 brand palette.
        brand: {
          DEFAULT: '#0f766e',
          dark: '#0b5650',
          light: '#14b8a6',
        },
        ink: '#0f172a',
        // Semantic colors tuned to sit beside the teal brand.
        success: { DEFAULT: '#047857', soft: '#ecfdf5' },
        warning: { DEFAULT: '#b45309', soft: '#fffbeb' },
        danger: { DEFAULT: '#be123c', soft: '#fff1f2' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.625rem', // 10px, small elements
        '2xl': '1rem', // 16px, surfaces
      },
      boxShadow: {
        // Subtle, layered depth. Three levels only.
        sm: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.05)',
        md: '0 4px 14px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)',
        lg: '0 16px 40px rgba(15, 23, 42, 0.10), 0 4px 12px rgba(15, 23, 42, 0.05)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
      },
      transitionDuration: {
        160: '160ms',
        280: '280ms',
      },
    },
  },
  plugins: [],
};
