'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { getGuides } from '@/lib/api'
import type { Guide } from '@/lib/types'
import { avatarFallback } from '@/lib/utils'
import GuideModal from './GuideModal'

const SPECIALTIES = [
  { key: 'all', label: 'Semua' },
  { key: 'mountain', label: 'Gunung' },
  { key: 'beach', label: 'Pantai & Laut' },
  { key: 'culture', label: 'Budaya' },
  { key: 'island', label: 'Island Hopping' },
]

function GuideCard({ guide, onView }: { guide: Guide; onView: (g: Guide) => void }) {
  const avatar = guide.avatar ?? avatarFallback(guide.name)
  const cover = guide.cover_image ?? 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80'

  return (
    <div onClick={() => onView(guide)} style={{
      background: 'var(--white)', border: '1px solid var(--stroke)',
      borderRadius: 'var(--r-lg)', overflow: 'hidden',
      transition: 'all 0.25s', cursor: 'pointer',
    }}>
      <div style={{ height: 140, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#1D2A3A,#0F1B2D)' }}>
        <Image src={cover} alt={guide.name} fill style={{ objectFit: 'cover', opacity: 0.6, transition: 'transform 0.4s' }} />
        <span style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(232,73,15,0.9)', color: '#fff',
          fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 50,
        }}>
          {guide.specialty_label}
        </span>
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: -38, marginBottom: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid #fff', overflow: 'hidden', flexShrink: 0, background: 'var(--bg)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <Image src={avatar} alt={guide.name} width={64} height={64} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ paddingTop: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark)' }}>{guide.name}</span>
              <span style={{ width: 18, height: 18, background: 'var(--success)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}>✓</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--body-2)' }}>
              📍 {guide.location}
              {guide.age != null && <> · 🎂 {guide.age} tahun</>}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span style={{ color: '#F59E0B', fontSize: 13 }}>{'★'.repeat(Math.round(Number(guide.rating)))}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)' }}>{Number(guide.rating).toFixed(1)}</span>
          <span style={{ fontSize: 12, color: 'var(--body-2)' }}>({guide.review_count} ulasan)</span>
        </div>

        {guide.languages && guide.languages.length > 0 && (
          <div style={{ fontSize: 12, color: 'var(--body-2)', marginBottom: 12 }}>
            🗣️ {guide.languages.join(', ')}
          </div>
        )}

        {guide.bio && (
          <div className="line-clamp-2" style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65, marginBottom: 14 }}>
            {guide.bio}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16, padding: 14, background: 'var(--bg)', borderRadius: 'var(--r-sm)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--dark)' }}>{guide.trips_done}</div>
            <div style={{ fontSize: 11, color: 'var(--body-2)', marginTop: 2 }}>Trip</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--dark)' }}>{guide.years_experience}+</div>
            <div style={{ fontSize: 11, color: 'var(--body-2)', marginTop: 2 }}>Tahun</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--dark)' }}>{guide.rating}★</div>
            <div style={{ fontSize: 11, color: 'var(--body-2)', marginTop: 2 }}>Rating</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--stroke)' }}>
          <div />
          <button style={{
            background: 'var(--primary)', color: '#fff', border: 'none',
            fontSize: 13, fontWeight: 700, padding: '9px 18px',
            borderRadius: 'var(--r-sm)', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            Lihat Profil
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GuidePageClient() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [specialty, setSpecialty] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)

  const fetchGuides = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getGuides({
        specialty: specialty !== 'all' ? specialty : undefined,
        search: search || undefined,
      })
      setGuides(res.data ?? [])
    } catch (err) {
      console.error('[GuidePageClient] fetch error:', err)
      setGuides([])
    } finally {
      setLoading(false)
    }
  }, [specialty, search])

  useEffect(() => {
    const t = setTimeout(fetchGuides, 300)
    return () => clearTimeout(t)
  }, [fetchGuides])

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F1B2D 0%,#1a3a5c 100%)', padding: '60px 5% 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,73,15,0.18)', border: '1px solid rgba(232,73,15,0.4)', color: '#FF8A65', padding: '6px 14px', borderRadius: 50, fontSize: 12.5, fontWeight: 700, marginBottom: 18 }}>
            👤 Tim Profesional Kami
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
            Tour Guide Bersertifikat & Berpengalaman
          </h1>
          <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: 520 }}>
            Kenali guide-guide terbaik kami yang siap menemani setiap petualanganmu di Lombok.
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 30, flexWrap: 'wrap' }}>
            {[
              { num: '48', label: 'Guide Aktif' },
              { num: '4.9★', label: 'Rata-rata Rating' },
              { num: '1.200+', label: 'Trip Diselesaikan' },
              { num: '15+', label: 'Tahun Pengalaman' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        padding: '14px 5%', background: 'var(--white)', borderBottom: '1px solid var(--stroke)',
        display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
        position: 'sticky', top: 70, zIndex: 50,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)', whiteSpace: 'nowrap' }}>Filter:</span>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          {SPECIALTIES.map(s => (
            <button key={s.key} onClick={() => setSpecialty(s.key)} style={{
              padding: '6px 12px', border: `1.5px solid ${specialty === s.key ? 'var(--primary)' : 'var(--stroke)'}`,
              borderRadius: 50, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              color: specialty === s.key ? '#fff' : 'var(--body)',
              background: specialty === s.key ? 'var(--primary)' : 'var(--white)',
              fontFamily: 'inherit', transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>{s.label}</button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari nama guide..."
          style={{
            padding: '9px 13px', border: '1.5px solid var(--stroke)',
            borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5,
            outline: 'none', minWidth: 0, flex: '0 1 200px', background: 'var(--white)',
          }}
        />
      </div>

      {/* Grid */}
      <div style={{ padding: '40px 5%', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 20 }}>
          {loading ? 'Memuat guide...' : `${guides.length} guide ditemukan`}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', height: 380, border: '1px solid var(--stroke)' }} />)}
          </div>
        ) : guides.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>👤</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>Guide Tidak Ditemukan</h3>
            <p style={{ fontSize: 14, color: 'var(--body)' }}>Coba ubah filter atau kata pencarian.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
            {guides.map(guide => <GuideCard key={guide.id} guide={guide} onView={setSelectedGuide} />)}
          </div>
        )}
      </div>

      {selectedGuide && <GuideModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />}
    </>
  )
}
