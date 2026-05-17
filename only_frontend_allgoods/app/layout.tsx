import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'All Good Adventure — Private Trip Specialist Lombok',
  description: 'Temukan pengalaman private trip terbaik di Lombok — pendakian Rinjani, island hopping Gili, dan private getaway eksklusif.',
  keywords: ['private trip lombok', 'rinjani', 'gili islands', 'tour guide lombok', 'adventure'],
  openGraph: {
    title: 'All Good Adventure',
    description: 'Spesialis private trip di Lombok — 100% eksklusif untuk kamu.',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakartaSans.variable}>
      <body className="min-h-screen flex flex-col antialiased" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
