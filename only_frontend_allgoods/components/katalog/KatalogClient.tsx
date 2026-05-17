'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { getDestinations } from '@/lib/api'
import type { Destination } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import DestinationModal from './DestinationModal'

const TRIP_TABS = [
  { key: 'all', label: '🌍 Semua' },
  { key: 'one-day', label: '🌅 One Day Trip' },
  { key: 'custom', label: '🗺️ Custom Destinations' },
]

function TripCard({ dest, onDetail }: { dest: Destination; onDetail: (d: Destination) => void }) {
  const image = dest.image ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80'
  const isCustom = dest.trip_type?.slug === 'custom'

  return (
    <div
      onClick={() => onDetail(dest)}
      style={{
        background: 'var(--white)', border: '1px solid var(--stroke)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
        transition: 'all 0.25s', cursor: 'pointer', position: 'relative',
      }}
    >
      <div style={{ position: 'relative', height: 195, overflow: 'hidden' }}>
        <Image src={image} alt={dest.name} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} />

        {dest.badge && (
          <span style={{
            position: 'absolute', top: 10, left: 10,
            background: 'rgba(232,73,15,0.92)', color: '#fff',
            fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 50,
          }}>
            {dest.badge}
          </span>
        )}

        {!dest.badge && dest.status && (
          <span style={{
            position: 'absolute', top: 12, left: 12, fontSize: 11,
            fontWeight: 700, padding: '4px 10px', borderRadius: 50, color: '#fff',
            background: dest.status === 'available' ? 'var(--success)' : 'var(--warning)',
          }}>
            {dest.status === 'available' ? 'Tersedia' : 'Limited'}
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
        <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--dark)', marginBottom: 9, lineHeight: 1.3 }}>{dest.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 11, borderTop: '1px solid var(--stroke)' }}>
          {isCustom || !dest.price ? (
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--body-2)' }}>Harga dikonfirmasi</div>
          ) : (
            <div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--primary)' }}>
              {formatPrice(dest.price)} <small style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--body-2)' }}>/orang</small>
            </div>
          )}
          <button style={{
            background: 'var(--primary-light)', color: 'var(--primary)', border: 'none',
            fontSize: 12.5, fontWeight: 700, padding: '7px 14px',
            borderRadius: 'var(--r-sm)', cursor: 'pointer',
          }}>
            Detail →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function KatalogClient() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('all')
  const [category, setCategory] = useState('')
  const [tripTypeTab, setTripTypeTab] = useState('all')
  const [sort, setSort] = useState('default')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)

  const fetchDestinations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getDestinations({
        search: search || undefined,
        city: location !== 'all' ? location : undefined,
        category: category || undefined,
        trip_type: tripTypeTab !== 'all' ? tripTypeTab : undefined,
        price_min: priceMin ? Number(priceMin) : undefined,
        price_max: priceMax ? Number(priceMax) : undefined,
      })
      let data = res.data ?? []
      if (sort === 'price-asc') data = [...data].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      if (sort === 'price-desc') data = [...data].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
      setDestinations(data)
    } catch (err) {
      console.error('[KatalogClient] fetch error:', err)
      setDestinations([])
    } finally {
      setLoading(false)
    }
  }, [search, location, category, tripTypeTab, sort, priceMin, priceMax])

  useEffect(() => {
    const t = setTimeout(fetchDestinations, 300)
    return () => clearTimeout(t)
  }, [fetchDestinations])

  const resetFilters = () => {
    setSearch('')
    setLocation('all')
    setCategory('')
    setTripTypeTab('all')
    setSort('default')
    setPriceMin('')
    setPriceMax('')
  }

  const locationPills = [
    { key: 'all', label: '🌍 Semua' },
    { key: 'Lombok', label: '📍 Lombok' },
    { key: 'Bali', label: '🌴 Bali' },
  ]

  return (
    <>
      {/* Mobile filter overlay backdrop */}
      {filterOpen && (
        <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 150 }} />
      )}

      <div style={{ padding: '20px 4% 36px', maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}
        className="katalog-layout">

        {/* Mobile filter toggle button */}
        <div className="katalog-filter-btn" style={{ display: 'none', gridColumn: '1/-1', marginBottom: 4 }}>
          <button onClick={() => setFilterOpen(o => !o)} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            background: 'var(--white)', border: '1.5px solid var(--stroke)',
            borderRadius: 'var(--r-sm)', fontSize: 13.5, fontWeight: 600,
            color: 'var(--dark)', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            🔍 Filter {filterOpen ? '▲' : '▼'}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`katalog-sidebar${filterOpen ? ' open' : ''}`} style={{ position: 'sticky', top: 86, height: 'fit-content' }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--stroke)', borderRadius: 'var(--r-lg)', padding: 22 }}>
            <h3 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--dark)', marginBottom: 18, paddingBottom: 13, borderBottom: '1px solid var(--stroke)' }}>
              🔍 Filter Destinasi
            </h3>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 7 }}>Nama Destinasi</label>
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Cari destinasi..."
                style={{ width: '100%', padding: '10px 13px', border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 7 }}>Lokasi</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {locationPills.map(p => (
                  <button key={p.key} onClick={() => setLocation(p.key)} style={{
                    padding: '7px 13px', border: `1.5px solid ${location === p.key ? 'var(--primary)' : 'var(--stroke)'}`,
                    borderRadius: 50, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    color: location === p.key ? '#fff' : 'var(--body)',
                    background: location === p.key ? 'var(--primary)' : 'var(--white)',
                    fontFamily: 'inherit',
                  }}>{p.label}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 7 }}>Kategori</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '10px 13px', border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5, outline: 'none', background: 'var(--white)' }}>
                <option value="">Semua Kategori</option>
                {[
                  { label: 'Mountain', value: 'mountain' },
                  { label: 'Beach', value: 'beach' },
                  { label: 'Island', value: 'island' },
                  { label: 'Culture', value: 'culture' },
                ].map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            {/* Filter Harga */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 7 }}>Rentang Harga (Rp)</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="number"
                  value={priceMin}
                  onChange={e => setPriceMin(e.target.value)}
                  placeholder="Min"
                  min={0}
                  style={{ width: '50%', padding: '9px 10px', border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 12.5, outline: 'none', boxSizing: 'border-box' }}
                />
                <span style={{ fontSize: 12, color: 'var(--body-2)', flexShrink: 0 }}>—</span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                  placeholder="Max"
                  min={0}
                  style={{ width: '50%', padding: '9px 10px', border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 12.5, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              {(priceMin || priceMax) && (
                <div style={{ fontSize: 11.5, color: 'var(--body-2)', marginTop: 6 }}>
                  {priceMin ? formatPrice(Number(priceMin)) : 'Rp 0'} — {priceMax ? formatPrice(Number(priceMax)) : '∞'}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 7 }}>Jenis Trip</label>
              <span style={{ display: 'inline-block', padding: '7px 13px', background: 'var(--primary-light)', color: 'var(--primary)', border: '1.5px solid var(--primary)', borderRadius: 50, fontSize: 12.5, fontWeight: 600 }}>
                🔒 Private Trip
              </span>
              <div style={{ fontSize: 11.5, color: 'var(--body-2)', marginTop: 8 }}>Semua trip bersifat private eksklusif.</div>
            </div>

            <button onClick={resetFilters} style={{
              width: '100%', background: 'none', border: '1.5px solid var(--stroke)',
              color: 'var(--body)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600,
              padding: 9, cursor: 'pointer', borderRadius: 'var(--r-sm)',
            }}>Reset Filter</button>
          </div>
        </aside>

        {/* Main content */}
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {TRIP_TABS.map(tab => (
              <button key={tab.key} onClick={() => setTripTypeTab(tab.key)} style={{
                padding: '8px 16px', border: `1.5px solid ${tripTypeTab === tab.key ? 'var(--primary)' : 'var(--stroke)'}`,
                borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                color: tripTypeTab === tab.key ? '#fff' : 'var(--body)',
                background: tripTypeTab === tab.key ? 'var(--primary)' : 'var(--white)',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}>{tab.label}</button>
            ))}
          </div>

          {tripTypeTab === 'custom' && (
            <div style={{ background: 'linear-gradient(135deg,#0F1B2D,#1a3a5c)', borderRadius: 'var(--r-lg)', padding: '16px 20px', marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
                🗺️ <strong style={{ color: '#fff' }}>Destinasi untuk Custom Trip</strong> — Pilih satu atau lebih destinasi di bawah ini untuk dikombinasikan dalam trip kamu. Durasi dan harga dikonfirmasi langsung oleh admin setelah kamu kirim permintaan.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 21, fontWeight: 800, color: 'var(--dark)' }}>Destinasi Trip</h2>
              <div style={{ fontSize: 13, color: 'var(--body-2)', marginTop: 2 }}>
                {loading ? 'Memuat...' : `${destinations.length} destinasi ditemukan`}
              </div>
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 13px', border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5, background: 'var(--white)', outline: 'none' }}>
              <option value="default">Terbaru</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(252px, 1fr))', gap: 18 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} style={{ background: 'var(--bg)', borderRadius: 'var(--r-lg)', height: 320, border: '1px solid var(--stroke)' }} />)}
            </div>
          ) : destinations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>🔍</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>Destinasi Tidak Ditemukan</h3>
              <p style={{ fontSize: 14, color: 'var(--body)', maxWidth: 300, margin: '0 auto 20px' }}>Coba ubah filter atau kata pencarian kamu.</p>
              <button onClick={resetFilters} style={{ background: 'var(--primary)', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, padding: '10px 22px', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}>
                Reset Filter
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(252px, 1fr))', gap: 18 }}>
              {destinations.map(dest => <TripCard key={dest.id} dest={dest} onDetail={setSelectedDest} />)}
            </div>
          )}
        </div>
      </div>

      {selectedDest && (
        <DestinationModal dest={selectedDest} onClose={() => setSelectedDest(null)} />
      )}

      <style>{`
        @media (max-width: 1024px) {
          .katalog-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .katalog-filter-btn { display: flex !important; }
          .katalog-sidebar { display: none; }
          .katalog-sidebar.open {
            display: block !important;
            position: fixed !important;
            top: auto !important;
            bottom: 70px !important;
            left: 0 !important; right: 0 !important;
            height: 70vh !important;
            overflow-y: auto !important;
            z-index: 200 !important;
            border-radius: 20px 20px 0 0 !important;
            box-shadow: 0 -8px 40px rgba(0,0,0,0.18) !important;
          }
        }
      `}</style>
    </>
  )
}
