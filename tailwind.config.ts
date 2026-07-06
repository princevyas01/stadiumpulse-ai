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
        'pitch-green': '#0F3D2E',
        'floodlight-white': '#F5F4EF',
        'concrete-gray': '#565B52',
        'signal-amber': '#E8A33D',
        'signal-red': '#C1442E',
        'chalk-white': '#FFFFFF',
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
