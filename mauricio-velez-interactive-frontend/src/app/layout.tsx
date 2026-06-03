import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'La Montaña del Conocimiento | Mauricio Vélez',
  description: 'Experiencia interactiva de la evolución tecnológica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-black overflow-x-hidden">{children}</body>
    </html>
  )
}