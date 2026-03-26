/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eng-black': '#0a0a0c', // Fundo profundo
        'eng-green': '#10b981', // Status Online
        'eng-cyan': '#06b6d4',  // Telemetria/IA
        'eng-border': '#1e293b', // Bordas de Painel
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}