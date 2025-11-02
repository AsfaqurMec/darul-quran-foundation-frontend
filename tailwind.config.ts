import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SolaimanLipi', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial'],
      },
      colors: {
        brand: {
          primary: '#096f40',
          DEFAULT: '#096f40',
          dark: '#075c35',
        },
        secondary: '#eb9530',
      },
    },
  },
  plugins: [],
}

export default config
