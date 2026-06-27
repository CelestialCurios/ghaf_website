import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ghaf — Your Carbon Detox Starts Here',
  description:
    'Ghaf helps UAE residents track, reduce, and reward sustainable living — from DEWA bills to greener swaps.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Space+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
