'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSiteSettings } from '@/lib/api'
import type { HeroSettings, SiteStats } from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const DEFAULTS: HeroSettings = {
  background_image: null,
  badge_text: '🌄 Private Trip Specialist — Lombok',
  title_line1: 'Kamu Pusing?',
  title_line2_colored: 'Yuk Healing',
  title_line3: 'Bareng Kami!',
  description: 'Temukan pengalaman private trip terbaik di Lombok — dari pendakian Rinjani, island hopping Gili, hingga private getaway eksklusif untuk kamu dan orang-orang terkasih.',
}

const DEFAULT_STATS: SiteStats = {
  stat1_num: '50+', stat1_label: 'Destinasi Lombok & Bali',
  stat2_num: '10K+', stat2_label: 'Traveler Puas',
  stat3_num: '100%', stat3_label: 'Private Trip',
  stat4_num: '48', stat4_label: 'Tour Guide Aktif',
}

const FALLBACK_BG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80'

function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return FALLBACK_BG
  if (path.startsWith('http')) return path
  return `${BASE_URL}/storage/${path}`
}

export default function HeroSection() {
  const [hero, setHero] = useState<HeroSettings>(DEFAULTS)
  const [stats, setStats] = useState<SiteStats>(DEFAULT_STATS)

  useEffect(() => {
    getSiteSettings()
      .then(res => {
        if (res.data?.hero) setHero({ ...DEFAULTS, ...res.data.hero })
        if (res.data?.hero_stats) setStats({ ...DEFAULT_STATS, ...res.data.hero_stats })
      })
      .catch(() => {})
  }, [])

  const bgImage = resolveImageUrl(hero.background_image)

  return (
    <section style={{ minHeight: 640, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.38,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(15,27,45,0.97) 35%, rgba(15,27,45,0.25) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '90px 5%', maxWidth: 660 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(232,73,15,0.18)', border: '1px solid rgba(232,73,15,0.4)',
          color: '#FF8A65', padding: '6px 14px', borderRadius: 50,
          fontSize: 12.5, fontWeight: 700, marginBottom: 22, letterSpacing: 0.3,
        }}>
          {hero.badge_text}
        </div>

        <h1 style={{
          fontSize: 'clamp(34px, 5vw, 62px)', fontWeight: 800, color: '#fff',
          lineHeight: 1.1, marginBottom: 20,
        }}>
          {hero.title_line1}<br />
          <span style={{ color: 'var(--primary)' }}>{hero.title_line2_colored}</span><br />
          {hero.title_line3}
        </h1>

        <p style={{
          fontSize: 16.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75,
          marginBottom: 34, maxWidth: 460,
        }}>
          {hero.description}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/katalog" style={{
            background: 'var(--primary)', color: '#fff', border: 'none',
            fontSize: 15.5, fontWeight: 700, padding: '14px 28px',
            borderRadius: 'var(--r-sm)', cursor: 'pointer', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'all 0.2s',
          }}>
            Lihat Destinasi →
          </Link>
          <Link href="/booking" style={{
            background: 'rgba(255,255,255,0.1)', color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.3)',
            fontSize: 15.5, fontWeight: 600, padding: '14px 28px',
            borderRadius: 'var(--r-sm)', cursor: 'pointer', textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            Booking Sekarang
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 36, marginTop: 48, flexWrap: 'wrap' }}>
          {[
            { num: stats.stat1_num, label: stats.stat1_label },
            { num: stats.stat2_num, label: stats.stat2_label },
            { num: stats.stat3_num, label: stats.stat3_label },
            { num: stats.stat4_num, label: stats.stat4_label },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{stat.num}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
