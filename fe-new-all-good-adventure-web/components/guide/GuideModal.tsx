'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Guide } from '@/lib/types'
import { avatarFallback } from '@/lib/utils'

interface Props {
  guide: Guide
  onClose: () => void
}

export default function GuideModal({ guide, onClose }: Props) {
  const avatar = guide.avatar ?? avatarFallback(guide.name)
  const cover = guide.cover_image ?? 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=680&q=80'

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        zIndex: 500, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 20, backdropFilter: 'blur(4px)',
      }}
    >
      <div className="animate-slide-up" style={{
        background: 'var(--white)', borderRadius: 'var(--r-xl)',
        maxWidth: 680, width: '100%', maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Cover */}
        <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
          <Image src={cover} alt={guide.name} fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14, width: 34, height: 34,
            background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
            color: '#fff', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {/* Avatar + name */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: -48, marginBottom: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #fff', overflow: 'hidden', flexShrink: 0, boxShadow: 'var(--sh-md)' }}>
              <Image src={avatar} alt={guide.name} width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)' }}>{guide.name}</div>
              <div style={{ fontSize: 13.5, color: 'var(--body-2)' }}>📍 {guide.location}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' }}>
                <span style={{ color: '#F59E0B', fontSize: 13 }}>{'★'.repeat(Math.round(Number(guide.rating)))}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{Number(guide.rating).toFixed(1)}</span>
                <span style={{ fontSize: 12, color: 'var(--body-2)' }}>({guide.review_count} ulasan)</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {guide.bio && (
            <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.75, marginBottom: 16 }}>{guide.bio}</p>
          )}

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, padding: 16, background: 'var(--bg)', borderRadius: 'var(--r-md)', marginBottom: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)' }}>{guide.trips_done}</div>
              <div style={{ fontSize: 11, color: 'var(--body-2)', marginTop: 2 }}>Trip Selesai</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)' }}>{guide.years_experience}+</div>
              <div style={{ fontSize: 11, color: 'var(--body-2)', marginTop: 2 }}>Tahun Pengalaman</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)' }}>{guide.rating}★</div>
              <div style={{ fontSize: 11, color: 'var(--body-2)', marginTop: 2 }}>Rating</div>
            </div>
          </div>

          {/* Languages */}
          {guide.languages && guide.languages.length > 0 && (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', margin: '0 0 10px', paddingBottom: 8, borderBottom: '1px solid var(--stroke)' }}>Bahasa</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {guide.languages.map(lang => (
                  <span key={lang} style={{ padding: '5px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600, background: 'var(--bg)', color: 'var(--body)', border: '1px solid var(--stroke)' }}>
                    {lang}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Certifications */}
          {guide.certifications && guide.certifications.length > 0 && (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', margin: '0 0 10px', paddingBottom: 8, borderBottom: '1px solid var(--stroke)' }}>Sertifikasi</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {guide.certifications.map(cert => (
                  <span key={cert.id} style={{ padding: '5px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600, background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid rgba(232,73,15,0.2)' }}>
                    🏅 {cert.certification_name}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Destinations */}
          {guide.destinations && guide.destinations.length > 0 && (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', margin: '0 0 10px', paddingBottom: 8, borderBottom: '1px solid var(--stroke)' }}>Destinasi Favorit</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {guide.destinations.map(dest => (
                  <span key={dest} style={{ padding: '5px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600, background: 'var(--bg)', color: 'var(--body)', border: '1px solid var(--stroke)' }}>
                    📍 {dest}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Availability */}
          {guide.availabilities && guide.availabilities.length > 0 && (
            <>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', margin: '0 0 10px', paddingBottom: 8, borderBottom: '1px solid var(--stroke)' }}>Ketersediaan</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {guide.availabilities.map(av => (
                  <div key={av.id} style={{ background: 'var(--bg)', borderRadius: 'var(--r-sm)', padding: '12px 14px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--dark)', marginBottom: 3 }}>{av.day_of_week}</div>
                    <div style={{ fontSize: 12, color: 'var(--body-2)' }}>{av.available_from} – {av.available_to}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--stroke)' }}>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{
              background: '#25D366', color: '#fff', border: 'none',
              fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700,
              padding: '12px 20px', borderRadius: 'var(--r-sm)',
              cursor: 'pointer', flex: 1, display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 8,
              textDecoration: 'none',
            }}>
              📱 WhatsApp
            </a>
            <Link href="/booking" style={{
              background: 'var(--primary)', color: '#fff', border: 'none',
              fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700,
              padding: '12px 20px', borderRadius: 'var(--r-sm)',
              cursor: 'pointer', flex: 1, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              Booking dengan Guide Ini
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
