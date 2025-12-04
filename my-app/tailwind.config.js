/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tea: {
          deep: '#1A4D38',
          medium: '#2D6A4F',
          light: '#40916C',
          muted: '#D8F3DC',
        },
        accent: {
          golden: '#D4AF37',
          cream: '#FFFDF5',
          sunrise: '#FF9A3C',
        }
      },
      animation: {
        'leaf-float': 'leaf-float 6s ease-in-out infinite',
      },
      keyframes: {
        'leaf-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        }
      }
    },
  },
  plugins: [],
}
