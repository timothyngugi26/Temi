import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        }
      },
      animation: {
        'leaf-float': 'leaf-float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
export default config
