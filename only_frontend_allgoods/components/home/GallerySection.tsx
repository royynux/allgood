import Link from 'next/link'
import Image from 'next/image'

const gallery = [
  { src: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=400&q=80', tall: true },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=400&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&q=80', tall: false },
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', tall: true },
]

export default function GallerySection() {
  return (
    <section style={{ padding: '80px 5%' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 40, flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
            Galeri
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.2 }}>
            Mereka yang Pernah<br />Private Trip Bersama Kami
          </h2>
        </div>
        <Link href="/katalog" style={{
          background: 'none', border: '1.5px solid var(--stroke)',
          color: 'var(--dark)', fontSize: 13.5, fontWeight: 600,
          padding: '9px 20px', borderRadius: 'var(--r-sm)',
          textDecoration: 'none', transition: 'all 0.2s',
        }}>
          Lihat Semua Destinasi
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 11,
      }}>
        <div style={{ borderRadius: 'var(--r-md)', overflow: 'hidden', gridRow: 'span 2' }}>
          <Image src={gallery[0].src} alt="Gallery" width={400} height={366} style={{ width: '100%', height: 366, objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={{ borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
            <Image src={gallery[1].src} alt="Gallery" width={400} height={178} style={{ width: '100%', height: 178, objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
            <Image src={gallery[2].src} alt="Gallery" width={400} height={178} style={{ width: '100%', height: 178, objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={{ borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
            <Image src={gallery[3].src} alt="Gallery" width={400} height={178} style={{ width: '100%', height: 178, objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
            <Image src={gallery[4].src} alt="Gallery" width={400} height={178} style={{ width: '100%', height: 178, objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
        <div style={{ borderRadius: 'var(--r-md)', overflow: 'hidden', gridRow: 'span 2' }}>
          <Image src={gallery[5].src} alt="Gallery" width={400} height={366} style={{ width: '100%', height: 366, objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}
