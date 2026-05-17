'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 15px', border: '1.5px solid var(--stroke)',
    borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5,
    color: 'var(--dark)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    background: 'var(--white)',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="auth-grid">
      {/* Visual Panel */}
      <div style={{ background: 'linear-gradient(160deg,#0F1B2D,#1a3a5c)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 48 }}
        className="hidden md:flex">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />
        <Link href="/" style={{ position: 'absolute', top: 32, left: 48, zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 19, fontWeight: 800, textDecoration: 'none' }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}><img src="/logoTrip.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></span>
          All Good Adventure
        </Link>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>Selamat Datang Kembali!</h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 14.5, lineHeight: 1.7 }}>Login dan lanjutkan petualangan private tripmu bersama kami.</p>
          <div style={{ display: 'flex', gap: 28, marginTop: 28 }}>
            {[{ num: '50+', label: 'Destinasi' }, { num: '4.9★', label: 'Rating' }, { num: '10K+', label: 'Traveler' }].map(s => (
              <div key={s.label}>
                <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{s.num}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: 'var(--white)' }}>
        <div style={{ width: '100%', maxWidth: 390 }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--body)',
            textDecoration: 'none', marginBottom: 24,
            padding: '7px 14px', border: '1.5px solid var(--stroke)',
            borderRadius: 'var(--r-sm)', transition: 'all 0.2s',
          }}>← Kembali ke Beranda</Link>

          <p style={{ fontSize: 12.5, color: 'var(--body-2)', marginBottom: 7 }}>👋 Masuk ke akun kamu</p>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: 'var(--dark)', marginBottom: 7 }}>Halo!</h1>
          <p style={{ fontSize: 14.5, color: 'var(--body)', lineHeight: 1.65, marginBottom: 32 }}>Masuk untuk melihat booking dan riwayat tripmu.</p>

          <div style={{ marginBottom: 17 }}>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 6 }}>Nomor Ponsel atau Email</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+62 atau email@kamu.com" style={inputStyle} />
          </div>

          <div style={{ marginBottom: 17 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--dark)' }}>Kata Sandi</label>
              <a href="#" style={{ fontSize: 12.5, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Lupa Kata Sandi?</a>
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Kata sandi kamu" style={inputStyle} />
          </div>

          <Link href="/profile" style={{
            display: 'block', width: '100%', background: 'var(--primary)', color: '#fff',
            border: 'none', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700,
            padding: 13, borderRadius: 'var(--r-sm)', cursor: 'pointer',
            marginTop: 6, textDecoration: 'none', textAlign: 'center',
          }}>
            Login →
          </Link>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--stroke)' }} />
            <span style={{ fontSize: 12.5, color: 'var(--body-2)', fontWeight: 500, whiteSpace: 'nowrap' }}>atau masuk dengan</span>
            <div style={{ flex: 1, height: 1, background: 'var(--stroke)' }} />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            disabled={googleLoading}
            onClick={() => {
              setGoogleLoading(true)
              setTimeout(() => router.push('/profile'), 1500)
            }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', padding: '11px 16px',
              background: '#fff', color: googleLoading ? '#aaa' : '#3c4043',
              border: '1.5px solid #dadce0', borderRadius: 'var(--r-sm)',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
              cursor: googleLoading ? 'not-allowed' : 'pointer',
              transition: 'box-shadow 0.2s, border-color 0.2s',
              opacity: googleLoading ? 0.7 : 1,
            }}
            onMouseEnter={e => {
              if (googleLoading) return
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.12)'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#c6c6c6'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#dadce0'
            }}
          >
            {googleLoading ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="#dadce0" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#4285F4" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Menghubungkan ke Google...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                Masuk dengan Google
              </>
            )}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

          <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13.5, color: 'var(--body)' }}>
            Belum punya akun? <Link href="/auth/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Daftar Sekarang</Link>
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
