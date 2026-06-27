import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
      },
      colors: {
        bg: 'var(--color-bg)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-mid': 'var(--color-bg-mid)',
        cream: 'var(--color-cream)',
        'cream-dim': 'var(--color-cream-dim)',
        accent: 'var(--color-accent)',
        muted: 'var(--color-muted)',
        dim: 'var(--color-dim)',
        'dim-bg': 'var(--color-dim-bg)',
        'footer-bg': 'var(--color-footer-bg)',
      },
    },
  },
  plugins: [],
}

export default config
