'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getGalleryPhotos } from '@/lib/api'
import type { GalleryPhoto } from '@/lib/types'

const FALLBACK_PHOTOS: GalleryPhoto[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=400&q=80', caption: null },
  { id: 2, image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80', caption: null },
  { id: 3, image: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=400&q=80', caption: null },
  { id: 4, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80', caption: null },
  { id: 5, image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&q=80', caption: null },
  { id: 6, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', caption: null },
  { id: 7, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', caption: null },
  { id: 8, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', caption: null },
  { id: 9, image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=400&q=80', caption: null },
  { id: 10, image: 'https://images.unsplash.com/photo-1559521783-1d1599583485?w=400&q=80', caption: null },
]

const PHOTO_COUNT = 10

export default function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(FALLBACK_PHOTOS)

  useEffect(() => {
    getGalleryPhotos()
      .then(res => {
        if (res.data && res.data.length > 0) setPhotos(res.data)
      })
      .catch(() => {})
  }, [])

  const display = photos.slice(0, PHOTO_COUNT)
  while (display.length < PHOTO_COUNT) display.push(FALLBACK_PHOTOS[display.length])

  return (
    <section style={{ padding: '80px 5%' }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
          Galeri
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.2 }}>
          Mereka yang Pernah<br />Private Trip Bersama Kami
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 11,
      }}>
        {display.map((photo, i) => (
          <div key={photo.id ?? i} style={{ borderRadius: 'var(--r-md)', overflow: 'hidden', position: 'relative', height: 220 }}>
            <Image src={photo.image} alt={photo.caption ?? 'Gallery'} fill style={{ objectFit: 'cover' }} unoptimized />
          </div>
        ))}
      </div>
    </section>
  )
}
