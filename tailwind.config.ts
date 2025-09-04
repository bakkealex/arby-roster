import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Better Business inspired professional palette
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98', // Main primary color (muted blue-gray)
          600: '#486581',
          700: '#334e68', // Darker blue for headers
          800: '#243b53',
          900: '#1a2332',
        },
        secondary: {
          50: '#f7f9fa',
          100: '#eef2f5',
          200: '#dae1e7',
          300: '#c1ced6',
          400: '#a3b4c0',
          500: '#829ab1', // Muted blue-gray
          600: '#627d98',
          700: '#486581',
          800: '#334e68',
          900: '#243b53',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Professional gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Subtle green for success states
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
    },
  },
  plugins: [  ],
} satisfies Config;
