import type { Metadata, Viewport } from 'next'
import { AuthProvider } from '@/components/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'LedgerCare — Blockchain-Based Autonomous Charity Fund Tracking and Verification System',
  description: 'Track every rupee from donation to verified impact with LedgerCare.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }]
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0c'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
