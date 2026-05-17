'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { getDestinations } from '@/lib/api'
import type { Destination } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import DestinationModal from '@/components/katalog/DestinationModal'

function TrendingCard({ dest, onDetail }: { dest: Destination; onDetail: (d: Destination) => void }) {
  const image = dest.image ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80'
  const isCustom = dest.trip_type?.slug === 'custom'

  return (
    <div
      onClick={() => onDetail(dest)}
      style={{
        background: 'var(--white)', border: '1px solid var(--stroke)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
        transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = ''
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = ''
      }}
    >
      <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
        <Image src={image} alt={dest.name} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,27,45,0.55) 0%, transparent 60%)' }} />

        {dest.badge && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(232,73,15,0.92)', color: '#fff',
            fontSize: 12, fontWeight: 800, padding: '5px 12px',
            borderRadius: 50, backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(232,73,15,0.4)',
          }}>
            {dest.badge}
          </span>
        )}

        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(15,27,45,0.75)', color: '#fff',
          fontSize: 11.5, fontWeight: 700, padding: '4px 10px', borderRadius: 50,
          backdropFilter: 'blur(4px)',
        }}>
          {dest.duration_days}H {dest.duration_nights > 0 ? `${dest.duration_nights}M` : ''}
        </span>

        <div style={{ position: 'absolute', bottom: 14, left: 16, color: '#fff' }}>
          <div style={{ fontSize: 15.5, fontWeight: 800, lineHeight: 1.25 }}>{dest.name}</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>📍 {dest.city}</div>
        </div>
      </div>

      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {dest.trip_type && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(232,73,15,0.2)' }}>
              {dest.trip_type.slug === 'one-day' ? 'One Day' : 'Custom'}
            </span>
          )}
          {dest.category && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: 'var(--bg)', color: 'var(--body)', border: '1px solid var(--stroke)' }}>
              {dest.category.name}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isCustom || !dest.price ? (
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--body-2)' }}>Harga dikonfirmasi</div>
          ) : (
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>{formatPrice(dest.price)}</div>
              <div style={{ fontSize: 11, color: 'var(--body-2)' }}>per orang</div>
            </div>
          )}
          <button style={{
            background: 'var(--primary)', color: '#fff', border: 'none',
            fontSize: 12.5, fontWeight: 700, padding: '8px 16px',
            borderRadius: 'var(--r-sm)', cursor: 'pointer',
          }}>
            Detail →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TrendingTrips() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null)

  const fetch = useCallback(async () => {
    try {
      const res = await getDestinations({ featured: true })
      setDestinations((res.data ?? []).slice(0, 4))
    } catch {
      setDestinations([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  if (!loading && destinations.length === 0) return null

  return (
    <>
      <section style={{ padding: '80px 5%', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
              Sedang Trending
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.2 }}>
              Trip Lagi Viral 🔥
            </h2>
            <p style={{ fontSize: 16, color: 'var(--body)', marginTop: 12, maxWidth: 480, margin: '12px auto 0', lineHeight: 1.75 }}>
              Destinasi yang paling banyak dipesan minggu ini — jangan sampai kehabisan slot!
            </p>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 22 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', height: 360, border: '1px solid var(--stroke)' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 22 }}>
              {destinations.map(dest => (
                <TrendingCard key={dest.id} dest={dest} onDetail={setSelectedDest} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedDest && (
        <DestinationModal dest={selectedDest} onClose={() => setSelectedDest(null)} />
      )}
    </>
  )
}
