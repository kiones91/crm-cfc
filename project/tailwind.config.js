/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6edff',
          100: '#ccdaff',
          200: '#99b6ff',
          300: '#6691ff',
          400: '#336dff',
          500: '#0F52BA', // Primary
          600: '#0c42a1',
          700: '#093179',
          800: '#062151',
          900: '#031028',
        },
        secondary: {
          50: '#e6f7fa',
          100: '#cceff5',
          200: '#99dfeb',
          300: '#66cee1',
          400: '#33bed7',
          500: '#068DA9', // Secondary
          600: '#057187',
          700: '#045465',
          800: '#023844',
          900: '#011c22',
        },
        accent: {
          50: '#fff5e6',
          100: '#ffeacc',
          200: '#ffd699',
          300: '#ffc166',
          400: '#ffad33',
          500: '#FF7D00', // Accent
          600: '#cc6400',
          700: '#994b00',
          800: '#663200',
          900: '#331900',
        },
        success: {
          50: '#e8f7f0',
          100: '#d1efe1',
          200: '#a3dfc3',
          300: '#75d0a4',
          400: '#47c086',
          500: '#36B37E', // Success
          600: '#2a8e62',
          700: '#1f6a4a',
          800: '#154731',
          900: '#0a2319',
        },
        warning: {
          50: '#fff8e6',
          100: '#fff1cc',
          200: '#ffe499',
          300: '#ffd666',
          400: '#ffc933',
          500: '#FFAB00', // Warning
          600: '#cc8900',
          700: '#996700',
          800: '#664400',
          900: '#332200',
        },
        error: {
          50: '#ffeded',
          100: '#ffdadb',
          200: '#ffb5b7',
          300: '#ff9093',
          400: '#ff6b6f',
          500: '#FF5630', // Error
          600: '#cc4526',
          700: '#99341d',
          800: '#662213',
          900: '#33110a',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};