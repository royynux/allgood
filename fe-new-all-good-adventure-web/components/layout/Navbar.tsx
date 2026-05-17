'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/katalog', label: 'Destinasi' },
  { href: '/booking', label: 'Layanan' },
  { href: '/tentang', label: 'Tentang Kami' },
]

interface NavbarProps {
  onDrawerOpen?: () => void
}

export default function Navbar({ onDrawerOpen }: NavbarProps) {
  const pathname = usePathname()

  return (
    <>
      <style>{`
        .nav-links-desktop { display: flex; }
        .nav-auth-desktop  { display: flex; }
        .nav-hamburger     { display: none; }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none; }
          .nav-auth-desktop  { display: none; }
          .nav-hamburger     { display: flex; }
          .nav-logo-text     { display: none; }
        }
      `}</style>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--stroke)', padding: '0 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 70, gap: 16,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 19, fontWeight: 800, color: 'var(--dark)',
          textDecoration: 'none', flexShrink: 0,
        }}>
          <span style={{
            width: 38, height: 38, borderRadius: 8, display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0, overflow: 'hidden',
          }}>
            <img src="/logoTrip.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </span>
          <span className="nav-logo-text">All Good Adventure</span>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links-desktop" style={{ alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              fontSize: 13.5, fontWeight: 500,
              color: pathname === link.href ? 'var(--primary)' : 'var(--body)',
              background: pathname === link.href ? 'var(--primary-light)' : 'none',
              textDecoration: 'none', padding: '8px 11px',
              borderRadius: 'var(--r-sm)', whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}>{link.label}</Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="nav-auth-desktop" style={{ alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <Link href="/auth/register" style={{
            background: 'none', border: '1.5px solid var(--stroke)',
            color: 'var(--dark)', fontSize: 13.5, fontWeight: 600,
            padding: '8px 18px', borderRadius: 'var(--r-sm)', textDecoration: 'none',
            transition: 'all 0.2s', cursor: 'pointer',
          }}>Register</Link>
          <Link href="/auth/login" style={{
            background: 'var(--primary)', border: 'none',
            color: '#fff', fontSize: 13.5, fontWeight: 700,
            padding: '9px 20px', borderRadius: 'var(--r-sm)',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7,
            transition: 'all 0.2s',
          }}>Login →</Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={onDrawerOpen}
          className="nav-hamburger"
          aria-label="Menu"
          style={{
            flexDirection: 'column', gap: 5, padding: 8,
            cursor: 'pointer', background: 'transparent', border: 'none',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ display: 'block', width: 24, height: 2.5, background: 'var(--dark)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 24, height: 2.5, background: 'var(--dark)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 24, height: 2.5, background: 'var(--dark)', borderRadius: 2 }} />
        </button>
      </nav>
    </>
  )
}
