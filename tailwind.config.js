/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        darkBg: '#ffffff',
        darkCard: '#ffffff',
        cyanNeon: '#000000',
        blueElectric: '#000000',
        purpleSubtle: '#737373',
        borderDark: '#e5e5e5',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'floatDelayed 8s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 0, 0, 0.05), 0 0 10px rgba(0, 0, 0, 0.02)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 0, 0, 0.15), 0 0 30px rgba(0, 0, 0, 0.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        floatDelayed: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-2deg)' },
        },
        textShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
