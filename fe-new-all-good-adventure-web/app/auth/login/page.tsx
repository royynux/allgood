'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

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
