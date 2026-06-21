/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cinematic near-black canvas + electric accent ramp.
        void: '#06070D',
        ink: '#0A0C16',
        panel: '#0E1120',
        cyan: {
          DEFAULT: '#22D3EE',
          glow: '#67E8F9',
        },
        indigo: {
          DEFAULT: '#6366F1',
        },
        violet: {
          DEFAULT: '#A78BFA',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient':
          'linear-gradient(120deg, #22D3EE 0%, #6366F1 50%, #A78BFA 100%)',
        grid: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'draw-line': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.8s ease forwards',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
