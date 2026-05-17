'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Destination, Review } from '@/lib/types'
import { formatPrice, formatDate } from '@/lib/utils'
import { getDestinationReviews } from '@/lib/api'

interface Props {
  dest: Destination
  onClose: () => void
}

type Tab = 'deskripsi' | 'itinerary' | 'meeting' | 'ulasan'

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#F59E0B', fontSize: 13 }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  )
}

export default function DestinationModal({ dest, onClose }: Props) {
  const image = dest.image ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=720&q=80'
  const isCustom = dest.trip_type?.slug === 'custom'
  const [activeTab, setActiveTab] = useState<Tab>('deskripsi')
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (activeTab !== 'ulasan') return
    setReviewsLoading(true)
    getDestinationReviews(dest.slug)
      .then(res => setReviews(res.data ?? []))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false))
  }, [activeTab, dest.slug])

  const tabs: { key: Tab; label: string }[] = [
    { key: 'deskripsi', label: 'Deskripsi' },
    { key: 'itinerary', label: 'Itinerary' },
    { key: 'meeting', label: 'Meeting Points' },
    { key: 'ulasan', label: `Ulasan` },
  ]

  const tabStyle = (key: Tab): React.CSSProperties => ({
    flex: 1, padding: '12px 8px', border: 'none', background: 'transparent',
    borderBottom: `2.5px solid ${activeTab === key ? 'var(--primary)' : 'transparent'}`,
    color: activeTab === key ? 'var(--primary)' : 'var(--body)',
    fontFamily: 'inherit', fontSize: 13, fontWeight: activeTab === key ? 700 : 500,
    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
  })

  return (
    <>
    <style>{`
      @media (max-width: 640px) {
        .dest-modal-overlay { align-items: flex-end !important; padding: 0 !important; }
        .dest-modal-box { border-radius: 20px 20px 0 0 !important; max-height: 92vh !important; }
        .dest-modal-pad { padding: 16px 16px !important; }
        .dest-modal-footer { padding: 14px 16px !important; }
        .dest-highlight-grid { grid-template-columns: 1fr !important; }
        .dest-incexc-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="dest-modal-overlay"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        zIndex: 400, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 20, backdropFilter: 'blur(5px)',
      }}
    >
      <div className="animate-slide-up dest-modal-box" style={{
        background: 'var(--white)', borderRadius: 20, maxWidth: 720,
        width: '100%', maxHeight: '90vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Image Header */}
        <div style={{ height: 220, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <Image src={image} alt={dest.name} fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,27,45,0.85) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: 18, left: 24, color: '#fff' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
              {dest.trip_type && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: 'rgba(232,73,15,0.85)', color: '#fff' }}>
                  {dest.trip_type.slug === 'one-day' ? 'One Day' : 'Custom'}
                </span>
              )}
              {dest.category && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                  {dest.category.name}
                </span>
              )}
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                ⏱️ {dest.duration_days}H {dest.duration_nights > 0 ? `${dest.duration_nights}M` : ''}
              </span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 3 }}>{dest.name}</h2>
            <p style={{ fontSize: 13, opacity: 0.8 }}>📍 {dest.city}</p>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14, width: 36, height: 36,
            background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
            color: '#fff', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Tab Bar */}
        <div style={{
          display: 'flex', borderBottom: '1px solid var(--stroke)',
          flexShrink: 0, padding: '0 4px', background: 'var(--white)',
        }}>
          {tabs.map(t => (
            <button key={t.key} style={tabStyle(t.key)} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="dest-modal-pad" style={{ padding: '22px 28px', overflowY: 'auto', flex: 1 }}>

          {/* Tab: Deskripsi */}
          {activeTab === 'deskripsi' && (
            <div>
              {dest.description && (
                <p style={{ fontSize: 13.5, color: 'var(--body)', lineHeight: 1.8, marginBottom: 22 }}>{dest.description}</p>
              )}

              {dest.highlights && dest.highlights.length > 0 && (
                <>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dark)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--stroke)' }}>
                    Highlight
                  </div>
                  <div className="dest-highlight-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
                    {dest.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: 'var(--bg)', borderRadius: 'var(--r-md)' }}>
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{h.icon}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)' }}>{h.text}</div>
                          {h.sub && <div style={{ fontSize: 11.5, color: 'var(--body-2)', marginTop: 2 }}>{h.sub}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {(dest.includes?.length > 0 || dest.excludes?.length > 0) && (
                <div className="dest-incexc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {dest.includes?.length > 0 && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dark)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, paddingBottom: 8, borderBottom: '2px solid var(--stroke)' }}>
                        ✅ Sudah Termasuk
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {dest.includes.map((inc, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--body)' }}>
                            <span style={{ color: 'var(--success)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                            {inc.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {dest.excludes?.length > 0 && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dark)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, paddingBottom: 8, borderBottom: '2px solid var(--stroke)' }}>
                        ❌ Tidak Termasuk
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {dest.excludes.map((exc, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--body)' }}>
                            <span style={{ color: 'var(--danger)', fontWeight: 700, flexShrink: 0 }}>✕</span>
                            {exc.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab: Itinerary */}
          {activeTab === 'itinerary' && (
            <div>
              {dest.itinerary && dest.itinerary.length > 0 ? (
                dest.itinerary.map(day => (
                  <div key={day.day} style={{ marginBottom: 22 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 12px', borderRadius: 50 }}>
                        Hari {day.day}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>{day.title}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 12, borderLeft: '2px solid #E5E7EB' }}>
                      {day.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px dashed rgba(0,0,0,0.06)' }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', minWidth: 44, flexShrink: 0, paddingTop: 1 }}>{item.time}</span>
                          <span style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.5 }}>{item.act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--body-2)' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
                  <p style={{ fontSize: 14 }}>Itinerary belum tersedia untuk destinasi ini.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab: Meeting Points */}
          {activeTab === 'meeting' && (
            <div>
              {dest.meeting_points && dest.meeting_points.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {dest.meeting_points.map((mp, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'var(--bg)', borderRadius: 'var(--r-md)', border: '1px solid var(--stroke)' }}>
                      <div style={{ width: 36, height: 36, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 16 }}>📍</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>{mp.name}</div>
                        {mp.address && <div style={{ fontSize: 12.5, color: 'var(--body-2)', marginTop: 3 }}>{mp.address}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--body-2)' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📍</div>
                  <p style={{ fontSize: 14 }}>Meeting point akan dikonfirmasi saat booking.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab: Ulasan */}
          {activeTab === 'ulasan' && (
            <div>
              {reviewsLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[1, 2, 3].map(i => <div key={i} style={{ background: 'var(--bg)', borderRadius: 'var(--r-md)', height: 90, border: '1px solid var(--stroke)' }} />)}
                </div>
              ) : reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {reviews.map(review => (
                    <div key={review.id} style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--r-md)', border: '1px solid var(--stroke)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>{review.reviewer_name}</div>
                          {review.trip_date && (
                            <div style={{ fontSize: 11.5, color: 'var(--body-2)', marginTop: 2 }}>
                              Trip: {formatDate(review.trip_date)}
                            </div>
                          )}
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      {review.comment && (
                        <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65, margin: 0 }}>{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--body-2)' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>⭐</div>
                  <p style={{ fontSize: 14 }}>Belum ada ulasan untuk destinasi ini.</p>
                  <p style={{ fontSize: 12, marginTop: 6 }}>Jadilah yang pertama booking dan berikan ulasan!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="dest-modal-footer" style={{
          padding: '16px 28px', borderTop: '1px solid var(--stroke)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12, flexShrink: 0, background: 'var(--white)',
        }}>
          <div>
            <div style={{ fontSize: 11.5, color: 'var(--body-2)', marginBottom: 2 }}>Harga mulai dari</div>
            {isCustom || !dest.price ? (
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--body)' }}>Harga dikonfirmasi admin</div>
            ) : (
              <>
                <div style={{ fontSize: 21, fontWeight: 800, color: 'var(--primary)' }}>{formatPrice(dest.price)}</div>
                <div style={{ fontSize: 11.5, color: 'var(--body-2)' }}>per orang</div>
              </>
            )}
          </div>
          <Link href="/booking" style={{
            background: 'var(--primary)', color: '#fff', border: 'none',
            fontSize: 15, fontWeight: 700, padding: '13px 28px',
            borderRadius: 'var(--r-sm)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 9,
          }}>
            Book This Trip →
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
