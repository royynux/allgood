'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [countdown, setCountdown] = useState(0)
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  function handleInput(i: number, val: string) {
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = v
    setOtp(next)
    if (v && i < 3) refs[i + 1].current?.focus()
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus()
  }

  const inputStyle: React.CSSProperties = {
    flex: 1, height: 68, textAlign: 'center', fontSize: 30, fontWeight: 800,
    border: '2px solid var(--stroke)', borderRadius: 'var(--r-md)',
    fontFamily: 'inherit', color: 'var(--dark)', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s', background: 'var(--bg)',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="auth-grid">
      {/* Visual */}
      <div style={{ background: 'linear-gradient(160deg,#0F1B2D,#1a3a5c)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 48 }}
        className="hidden md:flex">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />
        <Link href="/" style={{ position: 'absolute', top: 32, left: 48, zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 19, fontWeight: 800, textDecoration: 'none' }}>
          <span style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏔️</span>
          All Good Adventure
        </Link>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>Satu Langkah Lagi!</h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 14.5, lineHeight: 1.7 }}>Verifikasi akunmu untuk mulai menikmati semua fitur All Good Adventure.</p>
        </div>
      </div>

      {/* OTP Panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: 'var(--white)' }}>
        <div style={{ width: '100%', maxWidth: 390 }}>
          <div style={{ fontSize: 46, textAlign: 'center', marginBottom: 18 }}>🔐</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--dark)', textAlign: 'center', marginBottom: 7 }}>Verifikasi OTP</h1>
          <p style={{ fontSize: 14.5, color: 'var(--body)', textAlign: 'center', lineHeight: 1.65, marginBottom: 32 }}>
            Kode OTP telah dikirimkan ke <strong>+62 812 ****7890</strong>.
          </p>

          <div style={{ display: 'flex', gap: 11, marginBottom: 26 }}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={refs[i]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleInput(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                style={{
                  ...inputStyle,
                  borderColor: digit ? 'var(--primary)' : 'var(--stroke)',
                  background: digit ? 'var(--white)' : 'var(--bg)',
                }}
              />
            ))}
          </div>

          <Link href="/profile" style={{
            display: 'block', width: '100%', background: 'var(--primary)', color: '#fff',
            fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700,
            padding: 13, borderRadius: 'var(--r-sm)', cursor: 'pointer',
            textDecoration: 'none', textAlign: 'center',
          }}>
            Verifikasi & Masuk →
          </Link>

          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13.5, color: 'var(--body)' }}>
            Tidak menerima kode?{' '}
            {countdown > 0 ? (
              <span style={{ color: 'var(--body-2)', fontWeight: 600 }}>Kirim ulang ({countdown}s)</span>
            ) : (
              <button onClick={() => setCountdown(60)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>
                Kirim Ulang OTP
              </button>
            )}
          </p>

          <p style={{ textAlign: 'center', marginTop: 18 }}>
            <Link href="/auth/register" style={{ fontSize: 13.5, color: 'var(--body)', textDecoration: 'none' }}>← Kembali ke Daftar</Link>
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
