import Link from 'next/link'

const navLinks = [
  { href: '/katalog', label: 'Katalog Destinasi' },
  { href: '/booking', label: 'Booking Layanan' },
  { href: '/guide', label: 'Tour Guide' },
  { href: '/tentang', label: 'Tentang Kami' },
]

export default function Footer() {
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
              <span style={{
                width: 36, height: 36, background: 'var(--primary)',
                borderRadius: 8, display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18, flexShrink: 0,
              }}>🏔️</span>
              <span style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>All Good Adventure</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 28, color: 'rgba(255,255,255,0.55)' }}>
              Spesialis private trip di Lombok. Kami hadir untuk membuat setiap perjalananmu eksklusif, personal, dan tak terlupakan.
            </p>
            <a
              href="https://wa.me/6281234567890"
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
