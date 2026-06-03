'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTestimonials } from '@/lib/api'
import type { Testimonial } from '@/lib/types'

const FALLBACK: Testimonial[] = [
  {
    id: 1,
    reviewer_name: 'Andi Pratama',
    reviewer_role: 'Private Trip Rinjani — Jan 2026',
    reviewer_avatar: 'https://i.pravatar.cc/100?img=1',
    rating: 5,
    comment: '"Trip Rinjani bersama AGA luar biasa! Guide sangat profesional, semua aman dan terjadwal dengan baik. Pengalaman yang tidak akan pernah saya lupakan!"',
  },
  {
    id: 2,
    reviewer_name: 'Sari Dewi',
    reviewer_role: 'Private Trip Gili — Feb 2026',
    reviewer_avatar: 'https://i.pravatar.cc/100?img=5',
    rating: 5,
    comment: '"Private trip Gili buat ulang tahun pacar jadi sangat spesial. Tim AGA sangat detail memperhatikan semua permintaan kami. 10/10!"',
  },
  {
    id: 3,
    reviewer_name: 'Budi Santoso',
    reviewer_role: 'Company Outing Lombok — Mar 2026',
    reviewer_avatar: 'https://i.pravatar.cc/100?img=8',
    rating: 4,
    comment: '"Company outing di Lombok berjalan sangat lancar. Koordinasi dengan tim AGA sangat mudah, semua permintaan dipenuhi dengan cepat."',
  },
]

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK)

  useEffect(() => {
    getTestimonials()
      .then(res => {
        if (res.data && res.data.length > 0) setTestimonials(res.data)
      })
      .catch(() => {})
  }, [])

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
          <div key={t.id} style={{
            background: 'var(--white)', border: '1px solid var(--stroke)',
            borderRadius: 'var(--r-lg)', padding: 26,
          }}>
            <div style={{ color: '#F59E0B', fontSize: 15, marginBottom: 13 }}>
              {'★'.repeat(t.rating)}{'☆'.repeat(Math.max(0, 5 - t.rating))}
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--body)', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>
              {t.comment}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                {t.reviewer_avatar ? (
                  <Image src={t.reviewer_avatar} alt={t.reviewer_name} width={42} height={42} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                ) : (
                  <div style={{ width: 42, height: 42, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>
                    {t.reviewer_name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--dark)' }}>{t.reviewer_name}</div>
                {t.reviewer_role && (
                  <div style={{ fontSize: 12, color: 'var(--body-2)' }}>{t.reviewer_role}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
