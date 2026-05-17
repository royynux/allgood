'use client'

import Link from 'next/link'

const navLinks = [
  { href: '/', label: '🏠 Beranda' },
  { href: '/katalog', label: '🗺️ Katalog' },
  { href: '/booking', label: '🎒 Booking Layanan' },
  { href: '/tentang', label: 'ℹ️ Tentang Kami' },
]

interface DrawerProps {
  open: boolean
  onClose: () => void
}

export default function Drawer({ open, onClose }: DrawerProps) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 200, display: 'block',
          }}
        />
      )}
      <div style={{
        position: 'fixed', right: open ? 0 : -320, top: 0, bottom: 0,
        width: 290, background: 'var(--white)', zIndex: 201,
        padding: 20, transition: 'right 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflowY: 'auto', boxShadow: 'var(--sh-lg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8, display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden',
            }}>
              <img src="/logoTrip.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></span>
            <span style={{ fontWeight: 800, fontSize: 15 }}>All Good Adventure</span>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid var(--stroke)',
            width: 32, height: 32, borderRadius: 8, fontSize: 16,
            cursor: 'pointer', color: 'var(--body)',
          }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={onClose} style={{
              fontSize: 15, fontWeight: 500, color: 'var(--dark)',
              textDecoration: 'none', padding: '12px 14px',
              borderRadius: 'var(--r-sm)', display: 'flex',
              alignItems: 'center', gap: 10, transition: 'all 0.2s',
            }}>{link.label}</Link>
          ))}
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--stroke)',
        }}>
          <Link href="/auth/register" onClick={onClose} style={{
            display: 'block', textAlign: 'center', background: 'none',
            border: '1.5px solid var(--stroke)', color: 'var(--dark)',
            fontSize: 13.5, fontWeight: 600, padding: 12,
            borderRadius: 'var(--r-sm)', textDecoration: 'none',
          }}>Register</Link>
          <Link href="/auth/login" onClick={onClose} style={{
            display: 'block', textAlign: 'center',
            background: 'var(--primary)', color: '#fff',
            fontSize: 13.5, fontWeight: 700, padding: 12,
            borderRadius: 'var(--r-sm)', textDecoration: 'none',
          }}>✨ Login</Link>
        </div>
      </div>
    </>
  )
}
