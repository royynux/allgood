'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDestinations, getSiteSettings } from '@/lib/api'
import type { Destination, FeaturedSectionSettings } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

const DEFAULT_SECTION: FeaturedSectionSettings = {
  label: 'Destinasi Pilihan',
  title: 'Private Trip Terpopuler di Lombok',
  description: 'Semua perjalanan dirancang khusus untuk kamu — 100% private, no strangers!',
}

function TripCard({ dest, onDetail }: { dest: Destination; onDetail: (d: Destination) => void }) {
  const image = dest.image ?? `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80`
  const isCustom = dest.trip_type?.slug === 'custom'
  const tripLabel = dest.trip_type?.slug === 'one-day' ? 'One Day' : dest.trip_type?.slug === 'rinjani' ? 'Rinjani' : 'Custom'

  return (
    <div
      style={{
        background: 'var(--white)', border: '1px solid var(--stroke)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
        transition: 'all 0.25s', cursor: 'pointer',
      }}
      onClick={() => onDetail(dest)}
    >
      <div style={{ position: 'relative', height: 195, overflow: 'hidden' }}>
        <Image src={image} alt={dest.name} fill style={{ objectFit: 'cover' }} />
        {dest.status && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            fontSize: 11, fontWeight: 700, padding: '4px 10px',
            borderRadius: 50, color: '#fff',
            background: dest.status === 'active' ? 'var(--success)' : 'var(--warning)',
          }}>
            {dest.status === 'active' ? 'Tersedia' : 'Limited'}
          </span>
        )}
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(15,27,45,0.8)', color: '#fff',
          fontSize: 11.5, fontWeight: 700, padding: '4px 10px', borderRadius: 50,
        }}>
          {dest.duration_days}H {dest.duration_nights > 0 ? `${dest.duration_nights}M` : ''}
        </span>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 9 }}>
          {tripLabel && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(232,73,15,0.2)' }}>
              {tripLabel}
            </span>
          )}
          {dest.category && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: 'var(--bg)', color: 'var(--body)', border: '1px solid var(--stroke)' }}>
              {dest.category.name}
            </span>
          )}
        </div>

        <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--dark)', marginBottom: 9, lineHeight: 1.3 }}>
          {dest.name}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 11, borderTop: '1px solid var(--stroke)' }}>
          <div>
            {isCustom || !dest.price ? (
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--body-2)' }}>Harga dikonfirmasi</div>
            ) : (
              <div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--primary)' }}>
                {formatPrice(dest.price)} <small style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--body-2)' }}>/orang</small>
              </div>
            )}
          </div>
          <button style={{
            background: 'var(--primary-light)', color: 'var(--primary)',
            border: 'none', fontSize: 12.5, fontWeight: 700,
            padding: '7px 14px', borderRadius: 'var(--r-sm)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
            Detail →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PopularTrips() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState<FeaturedSectionSettings>(DEFAULT_SECTION)

  useEffect(() => {
    getDestinations({ featured_home: true })
      .then(res => {
        const featured = res.data ?? []
        if (featured.length > 0) {
          setDestinations(featured.slice(0, 4))
        } else {
          // Fallback when admin hasn't picked any "Destinasi Pilihan" yet
          return getDestinations().then(fallback => setDestinations((fallback.data ?? []).slice(0, 4)))
        }
      })
      .catch((err) => { console.error('[PopularTrips] fetch error:', err); setDestinations([]) })
      .finally(() => setLoading(false))

    getSiteSettings()
      .then(res => {
        if (res.data?.featured_destinations_section) {
          setSection({ ...DEFAULT_SECTION, ...res.data.featured_destinations_section })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section style={{ padding: '80px 5%', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
          {section.label}
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.2 }}>
          {section.title}
        </h2>
        <p style={{ fontSize: 16, color: 'var(--body)', marginTop: 12, maxWidth: 480, margin: '12px auto 0', lineHeight: 1.75, textAlign: 'center' }}>
          {section.description}
        </p>
      </div>

      {loading ? (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 22,
        }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: 'var(--white)', borderRadius: 'var(--r-lg)', height: 340, border: '1px solid var(--stroke)' }} />
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--body)' }}>
          Gagal memuat destinasi. Pastikan backend berjalan di {process.env.NEXT_PUBLIC_API_URL}.
        </div>
      ) : (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 22,
        }}>
          {destinations.map(dest => (
            <TripCard key={dest.id} dest={dest} onDetail={() => {}} />
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <Link href="/katalog" style={{
          background: 'var(--primary)', color: '#fff', border: 'none',
          fontSize: 13.5, fontWeight: 700, padding: '9px 20px',
          borderRadius: 'var(--r-sm)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 7,
        }}>
          Lihat Semua Destinasi →
        </Link>
      </div>
    </section>
  )
}
