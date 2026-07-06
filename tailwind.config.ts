import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-light': '#FAF9F6',
        'theme-dark': '#14181B',
        'theme-text-primary': '#1F2320',
        'theme-text-secondary': '#6B6F6A',
        'theme-accent': '#B8823A',
        'theme-alert-amber': '#C98A3D',
        'theme-alert-red': '#B23B2C',
        'theme-alert-green': '#4A7A5E',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        'std': '10px',
      },
      fontFamily: {
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        sans: ['var(--font-source-sans-3)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      animation: {
        ticker: 'ticker 20s linear infinite',
        'pulse-alert': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
