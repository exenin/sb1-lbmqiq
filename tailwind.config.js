/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      }
    },
  },
  safelist: [
    'border-blue-600',
    'border-green-600',
    'border-purple-600',
    'border-orange-600',
    'border-red-600',
    'text-blue-600',
    'text-green-600',
    'text-purple-600',
    'text-orange-600',
    'text-red-600',
    'bg-blue-50',
    'bg-green-50',
    'bg-purple-50',
    'bg-orange-50',
    'bg-red-50'
  ],
  plugins: [],
}