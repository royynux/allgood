'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getSiteSettings } from '@/lib/api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=400&q=80',
]

function resolveImageUrl(path: string | null | undefined, fallback: string): string {
  if (!path) return fallback
  if (path.startsWith('http')) return path
  return `${BASE_URL}/storage/${path}`
}

const whyItems = [
  {
    icon: '🗺️',
    title: 'Destinasi Terbaik Lombok',
    desc: 'Dari puncak Rinjani, Gili Islands, Selong Belanak hingga spot tersembunyi yang hanya kami tahu.',
  },
  {
    icon: '👤',
    title: 'Tour Guide Bersertifikat',
    desc: 'Semua guide kami telah tersertifikasi BNSP, berpengalaman, dan siap membuat tripmu luar biasa.',
  },
  {
    icon: '🔒',
    title: '100% Private Trip',
    desc: 'Tripmu hanya untuk kamu dan rombonganmu. Tidak ada orang asing yang ikut serta.',
  },
  {
    icon: '🛡️',
    title: 'Keamanan Terjamin',
    desc: 'Semua trip dilengkapi asuransi perjalanan dan pemandu berlisensi resmi.',
  },
]

export default function WhyUsSection() {
  const [images, setImages] = useState(FALLBACK_IMAGES)

  useEffect(() => {
    getSiteSettings()
      .then(res => {
        const wi = res.data?.whyus_images
        if (wi) {
          setImages([
            resolveImageUrl(wi.image_1, FALLBACK_IMAGES[0]),
            resolveImageUrl(wi.image_2, FALLBACK_IMAGES[1]),
            resolveImageUrl(wi.image_3, FALLBACK_IMAGES[2]),
            resolveImageUrl(wi.image_4, FALLBACK_IMAGES[3]),
          ])
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section style={{ padding: '80px 5%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 64, alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
            Kenapa Kami
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.2 }}>
            Kenapa Memilih<br />All Good Adventure?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--body)', lineHeight: 1.75, marginTop: 14 }}>
            Kami spesialis private trip di Lombok — memastikan setiap perjalananmu eksklusif, aman, dan sesuai keinginanmu.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 32 }}>
            {whyItems.map(item => (
              <div key={item.title} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                padding: 18, borderRadius: 'var(--r-md)', transition: 'all 0.25s',
              }}>
                <div style={{
                  width: 46, height: 46, background: 'var(--primary-light)',
                  borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 21, flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--dark)', marginBottom: 5 }}>{item.title}</h4>
                  <p style={{ fontSize: 13.5, color: 'var(--body)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }} className="hidden lg:grid">
          <div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative', height: 195 }}>
              <Image src={images[0]} alt="Why Us 1" fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </div>
          <div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', marginTop: 38, position: 'relative', height: 248 }}>
              <Image src={images[1]} alt="Why Us 2" fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </div>
          <div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative', height: 195 }}>
              <Image src={images[2]} alt="Why Us 3" fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </div>
          <div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative', height: 195 }}>
              <Image src={images[3]} alt="Why Us 4" fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
