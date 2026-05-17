import Image from 'next/image'

const testimonials = [
  {
    stars: 5,
    text: '"Trip Rinjani bersama AGA luar biasa! Guide sangat profesional, semua aman dan terjadwal dengan baik. Pengalaman yang tidak akan pernah saya lupakan!"',
    name: 'Andi Pratama',
    role: 'Private Trip Rinjani — Jan 2026',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    stars: 5,
    text: '"Private trip Gili buat ulang tahun pacar jadi sangat spesial. Tim AGA sangat detail memperhatikan semua permintaan kami. 10/10!"',
    name: 'Sari Dewi',
    role: 'Private Trip Gili — Feb 2026',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    stars: 4,
    text: '"Company outing di Lombok berjalan sangat lancar. Koordinasi dengan tim AGA sangat mudah, semua permintaan dipenuhi dengan cepat."',
    name: 'Budi Santoso',
    role: 'Company Outing Lombok — Mar 2026',
    avatar: 'https://i.pravatar.cc/100?img=8',
  },
]

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '80px 5%', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
          Testimoni
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--dark)' }}>
          Apa Kata Mereka?
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 22,
      }}>
        {testimonials.map(t => (
          <div key={t.name} style={{
            background: 'var(--white)', border: '1px solid var(--stroke)',
            borderRadius: 'var(--r-lg)', padding: 26,
          }}>
            <div style={{ color: '#F59E0B', fontSize: 15, marginBottom: 13 }}>
              {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--body)', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>
              {t.text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <Image src={t.avatar} alt={t.name} width={42} height={42} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--dark)' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--body-2)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
