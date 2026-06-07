'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSiteSettings } from '@/lib/api'
import type { FooterSettings } from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/katalog', label: 'Destinasi' },
  { href: '/booking', label: 'Layanan' },
  { href: '/tentang', label: 'Tentang Kami' },
]

const DEFAULTS: FooterSettings = {
  logo_image: null,
  description: 'Spesialis private trip di Lombok. Kami hadir untuk membuat setiap perjalananmu eksklusif, personal, dan tak terlupakan.',
  whatsapp_number: '6285333043941',
  address: 'Jalan Kampung Inggris No.11, Tetebatu, Kec. Sikur, Kabupaten Lombok Timur, Nusa Tenggara Barat. 83662',
  map_url: 'https://maps.app.goo.gl/tdZaQu93HHejFJg26?g_st=ic',
}

function resolveImageUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${BASE_URL}/storage/${path}`
}

export default function Footer() {
  const [footer, setFooter] = useState<FooterSettings>(DEFAULTS)

  useEffect(() => {
    getSiteSettings()
      .then(res => {
        if (res.data?.footer) setFooter({ ...DEFAULTS, ...res.data.footer })
      })
      .catch(() => {})
  }, [])

  const logoUrl = resolveImageUrl(footer.logo_image)

  return (
    <footer style={{ background: 'var(--dark)', color: 'rgba(255,255,255,0.65)' }}>
      {/* Main footer body */}
      <div style={{ padding: '56px 5% 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '48px 80px',
          alignItems: 'start',
        }} className="footer-grid">

          {/* Brand block */}
          <div style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="All Good Adventure"
                  style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <span style={{
                  width: 36, height: 36, background: 'var(--primary)',
                  borderRadius: 8, display: 'inline-flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18, flexShrink: 0,
                }}>🏔️</span>
              )}
              <span style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>All Good Adventure</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 16, color: 'rgba(255,255,255,0.55)' }}>
              {footer.description}
            </p>

            {footer.address && (
              <a
                href={footer.map_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 9,
                  fontSize: 13.5, lineHeight: 1.6, marginBottom: 24,
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                }}
              >
                <span style={{ flexShrink: 0 }}>📍</span>
                <span>{footer.address}</span>
              </a>
            )}

            <a
              href={`https://wa.me/${footer.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#25D366', color: '#fff',
                fontSize: 13.5, fontWeight: 700, padding: '11px 22px',
                borderRadius: 'var(--r-sm)', textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              📱 Hubungi via WhatsApp
            </a>
          </div>

          {/* Nav links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18, opacity: 0.5 }}>
              Navigasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    fontSize: 14, fontWeight: 500, transition: 'color 0.2s',
                  }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '18px 5%' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12.5, flexWrap: 'wrap', gap: 8,
          color: 'rgba(255,255,255,0.35)',
        }}>
          <span>© 2026 All Good Adventure. Hak cipta dilindungi.</span>
          <span>Dibuat dengan ❤️ di Lombok</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  )
}
