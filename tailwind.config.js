/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        police: {
          50: '#f0f4fc',
          100: '#e1e9f8',
          200: '#c5d5f3',
          300: '#9cb8eb',
          400: '#6c93e0',
          500: '#4871d3',
          600: '#3455c1',
          700: '#2c43a4',
          800: '#283884',
          900: '#1b244d',
          950: '#0d1326',
        },
        navy: {
          800: '#0f172a',
          850: '#0d1527',
          900: '#0a0f1d',
          950: '#060a14',
        },
        cyber: {
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          indigo: '#6366f1',
          purple: '#a855f7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
