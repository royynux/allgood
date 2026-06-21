'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSiteSettings } from '@/lib/api'
import type { LoginPageSettings } from '@/lib/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const DEFAULT: LoginPageSettings = {
  background_image: null,
  left_title: 'Selamat Datang!',
  left_description: 'Login dan mulai petualangan private tripmu bersama kami.',
  stat1_num: '50+',  stat1_label: 'Destinasi',
  stat2_num: '4.9★', stat2_label: 'Rating',
  stat3_num: '10K+', stat3_label: 'Traveler',
  right_badge: '👋 Masuk ke akun kamu',
  right_title: 'Halo!',
  right_description: 'Masuk untuk melihat booking dan riwayat tripmu.',
}

const DEFAULT_BG = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80'

function resolveUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${API_URL}/storage/${path}`
}

export default function LoginPage() {
  const [s, setS] = useState<LoginPageSettings>(DEFAULT)

  useEffect(() => {
    getSiteSettings()
      .then(res => { if (res.data?.login_page) setS({ ...DEFAULT, ...res.data.login_page }) })
      .catch(() => {})
  }, [])

  const bgImage = resolveUrl(s.background_image) ?? DEFAULT_BG

  const stats = [
    { num: s.stat1_num ?? DEFAULT.stat1_num, label: s.stat1_label ?? DEFAULT.stat1_label },
    { num: s.stat2_num ?? DEFAULT.stat2_num, label: s.stat2_label ?? DEFAULT.stat2_label },
    { num: s.stat3_num ?? DEFAULT.stat3_num, label: s.stat3_label ?? DEFAULT.stat3_label },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="auth-grid">
      {/* Visual Panel */}
      <div
        style={{ background: 'linear-gradient(160deg,#0F1B2D,#1a3a5c)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 48 }}
        className="hidden md:flex"
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />
        <Link href="/" style={{ position: 'absolute', top: 32, left: 48, zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 19, fontWeight: 800, textDecoration: 'none' }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/logoTrip.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </span>
          All Good Adventure
        </Link>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>{s.left_title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 14.5, lineHeight: 1.7 }}>{s.left_description}</p>
          <div style={{ display: 'flex', gap: 28, marginTop: 28 }}>
            {stats.map(st => (
              <div key={st.label}>
                <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{st.num}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5, marginTop: 2 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: 'var(--white)' }}>
        <div style={{ width: '100%', maxWidth: 390 }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--body)',
            textDecoration: 'none', marginBottom: 32,
            padding: '7px 14px', border: '1.5px solid var(--stroke)',
            borderRadius: 'var(--r-sm)',
          }}>← Kembali ke Beranda</Link>

          <p style={{ fontSize: 12.5, color: 'var(--body-2)', marginBottom: 7 }}>{s.right_badge}</p>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: 'var(--dark)', marginBottom: 7 }}>{s.right_title}</h1>
          <p style={{ fontSize: 14.5, color: 'var(--body)', lineHeight: 1.65, marginBottom: 36 }}>
            {s.right_description}
          </p>

          {/* Google Login Button */}
          <a
            href={`${API_URL}/auth/google/redirect`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              width: '100%', padding: '14px 20px',
              border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)',
              background: 'var(--white)', color: 'var(--dark)',
              fontSize: 15, fontWeight: 700, textDecoration: 'none',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Masuk dengan Google
          </a>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--body-2)', lineHeight: 1.6 }}>
            Dengan masuk, kamu menyetujui syarat & ketentuan<br />layanan All Good Adventure.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
