/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          dark: '#0f172a',
          card: '#1e293b',
          accent: '#6366f1',
          gold: '#f59e0b',
          emerald: '#10b981',
          rose: '#f43f5e'
        }
      },
      animation: {
        'bounce-short': 'bounce 0.6s ease-in-out 1',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
