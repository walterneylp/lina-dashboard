import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lina Dashboard',
  description: 'Dashboard profissional de Mission Control',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
