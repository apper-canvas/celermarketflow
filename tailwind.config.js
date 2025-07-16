/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9900",
        secondary: "#146EB4",
        accent: "#FF6F00",
        success: "#067D62",
        warning: "#F0AD4E",
        error: "#D13212",
        info: "#0066C0"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'scale-up': 'scale-up 0.2s ease-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 0.3s ease-in-out',
        'fade-in': 'fade-in 0.3s ease-in-out'
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: '200px 0' }
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}