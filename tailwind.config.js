/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF9F2',
          200: '#FFF2E5',
          300: '#FFE6D1',
        },
        peach: {
          50: '#FFF5F2',
          100: '#FFE9E2',
          200: '#FFD4C5',
          300: '#FFB8A1',
          400: '#FF9473',
          500: '#F87550',
        },
        matcha: {
          50: '#F4F8F4',
          100: '#E4EFE4',
          200: '#CCDFCD',
          300: '#ABC9AC',
          400: '#83AB84',
        },
        skyPuff: {
          50: '#F2F8FD',
          100: '#E2F0FB',
          200: '#C7E2F7',
          300: '#A4D0F2',
        },
        capy: {
          100: '#F3ECE7',
          200: '#E4D5CA',
          300: '#CDB6A3',
          400: '#A8876F',
          500: '#7E5F49',
          600: '#5F4635',
        },
        warmGray: {
          700: '#4D443E',
          800: '#3A332E',
          900: '#26211E',
        },
      },
      fontFamily: {
        varela: ['"Varela Round"', '"Rubik"', 'sans-serif'],
        rubik: ['"Rubik"', '"Varela Round"', 'sans-serif'],
      },
      boxShadow: {
        'fluffy': '0 12px 30px -8px rgba(248, 117, 80, 0.12), 0 4px 14px rgba(126, 95, 73, 0.06)',
        'cute-card': '0 18px 45px -12px rgba(168, 135, 111, 0.18), 0 0 0 2px rgba(255, 255, 255, 0.8)',
        'pill-pop': '0 8px 20px -4px rgba(255, 148, 115, 0.3)',
      },
      animation: {
        'wiggle-slow': 'wiggle 4s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'float-cute': 'floatCute 6s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatCute: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-12px) scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
};
