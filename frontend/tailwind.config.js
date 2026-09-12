/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gn-bg': '#000000',
        'gn-surface': '#5C4E4E',
        'gn-accent': '#988686',
        'gn-text': '#D1D0D0',
        'gn-highlight': '#FFFFFF',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}