import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{ minHeight: 640, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.38,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(15,27,45,0.97) 35%, rgba(15,27,45,0.25) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '90px 5%', maxWidth: 660 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(232,73,15,0.18)', border: '1px solid rgba(232,73,15,0.4)',
          color: '#FF8A65', padding: '6px 14px', borderRadius: 50,
          fontSize: 12.5, fontWeight: 700, marginBottom: 22, letterSpacing: 0.3,
        }}>
          🌄 Private Trip Specialist — Lombok
        </div>

        <h1 style={{
          fontSize: 'clamp(34px, 5vw, 62px)', fontWeight: 800, color: '#fff',
          lineHeight: 1.1, marginBottom: 20,
        }}>
          Kamu Pusing?<br />
          <span style={{ color: 'var(--primary)' }}>Yuk Healing</span><br />
          Bareng Kami!
        </h1>

        <p style={{
          fontSize: 16.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75,
          marginBottom: 34, maxWidth: 460,
        }}>
          Temukan pengalaman private trip terbaik di Lombok — dari pendakian Rinjani, island hopping Gili, hingga private getaway eksklusif untuk kamu dan orang-orang terkasih.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/katalog" style={{
            background: 'var(--primary)', color: '#fff', border: 'none',
            fontSize: 15.5, fontWeight: 700, padding: '14px 28px',
            borderRadius: 'var(--r-sm)', cursor: 'pointer', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'all 0.2s',
          }}>
            Lihat Destinasi →
          </Link>
          <Link href="/booking" style={{
            background: 'rgba(255,255,255,0.1)', color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.3)',
            fontSize: 15.5, fontWeight: 600, padding: '14px 28px',
            borderRadius: 'var(--r-sm)', cursor: 'pointer', textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            Booking Sekarang
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 36, marginTop: 48, flexWrap: 'wrap' }}>
          {[
            { num: '50+', label: 'Destinasi Lombok & Bali' },
            { num: '10K+', label: 'Traveler Puas' },
            { num: '100%', label: 'Private Trip' },
            { num: '48', label: 'Tour Guide Aktif' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{stat.num}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
