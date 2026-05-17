import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'rgba(255,255,255,0.65)', padding: '64px 5% 32px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 44, marginBottom: 44,
      }}>
        <div>
          <h3 style={{ color: '#fff', fontSize: 19, fontWeight: 800, marginBottom: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 28, height: 28, background: 'var(--primary)',
              borderRadius: 6, display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 14,
            }}>🏔️</span>
            All Good Adventure
          </h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, marginBottom: 22 }}>
            Spesialis private trip di Lombok. Kami hadir untuk membuat setiap perjalananmu eksklusif dan tak terlupakan.
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#25D366', color: '#fff', border: 'none',
              fontSize: 13.5, fontWeight: 700, padding: '11px 20px',
              borderRadius: 'var(--r-sm)', textDecoration: 'none',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >📱 Hubungi via WhatsApp</a>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, marginBottom: 14 }}>Layanan</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              { href: '/katalog', label: 'Katalog Destinasi' },
              { href: '/booking', label: 'Booking Layanan' },
              { href: '/guide', label: 'Tour Guide' },
              { href: '/tentang', label: 'Tentang Kami' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 13.5, transition: 'color 0.2s' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, marginBottom: 14 }}>Perusahaan</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {['Profil Perusahaan', 'Blog & Artikel', 'Karir', 'Kemitraan'].map(item => (
              <li key={item}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5, cursor: 'pointer', transition: 'color 0.2s' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, marginBottom: 14 }}>Bantuan</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {['FAQ', 'Hubungi Kami', 'Syarat & Ketentuan', 'Kebijakan Privasi'].map(item => (
              <li key={item}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5, cursor: 'pointer', transition: 'color 0.2s' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12.5, flexWrap: 'wrap', gap: 10,
      }}>
        <span>© 2026 All Good Adventure. Hak cipta dilindungi.</span>
        <span>Dibuat dengan ❤️ di Lombok</span>
      </div>
    </footer>
  )
}
