import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ghaf-green': '#213227',
        'ghaf-dark': '#1b2920',
      },
    },
  },
  plugins: [],
}

export default config
