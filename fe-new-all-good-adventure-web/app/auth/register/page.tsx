'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 15px', border: '1.5px solid var(--stroke)',
    borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5,
    color: 'var(--dark)', outline: 'none', transition: 'border-color 0.2s',
    background: 'var(--white)',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="auth-grid">
      {/* Visual */}
      <div style={{ background: 'linear-gradient(160deg,#0F1B2D,#1a3a5c)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 48 }}
        className="hidden md:flex">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />
        <Link href="/" style={{ position: 'absolute', top: 32, left: 48, zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 19, fontWeight: 800, textDecoration: 'none' }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}><img src="/logoTrip.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></span>
          All Good Adventure
        </Link>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 800, lineHeight: 1.25, marginBottom: 10 }}>Mulai Private Trip Impianmu</h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 14.5, lineHeight: 1.7 }}>Bergabung dengan 10.000+ traveler yang sudah mempercayai All Good Adventure.</p>
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

      {/* Form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: 'var(--white)' }}>
        <div style={{ width: '100%', maxWidth: 390 }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--body)',
            textDecoration: 'none', marginBottom: 24,
            padding: '7px 14px', border: '1.5px solid var(--stroke)',
            borderRadius: 'var(--r-sm)', transition: 'all 0.2s',
          }}>← Kembali ke Beranda</Link>

          <p style={{ fontSize: 12.5, color: 'var(--body-2)', marginBottom: 7 }}>✈️ Bergabung sekarang</p>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: 'var(--dark)', marginBottom: 7 }}>Halo! 👋</h1>
          <p style={{ fontSize: 14.5, color: 'var(--body)', lineHeight: 1.65, marginBottom: 32 }}>Daftar dan rasakan kemudahan private trip bersama kami!</p>

          {[
            { label: 'Nama Lengkap', type: 'text', value: name, set: setName, placeholder: 'Nama lengkap kamu' },
            { label: 'Nomor Ponsel atau Email', type: 'text', value: phone, set: setPhone, placeholder: '+62 atau email@kamu.com' },
            { label: 'Kata Sandi', type: 'password', value: password, set: setPassword, placeholder: 'Minimal 8 karakter' },
          ].map(field => (
            <div key={field.label} style={{ marginBottom: 17 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 6 }}>{field.label}</label>
              <input type={field.type} value={field.value} onChange={e => field.set(e.target.value)} placeholder={field.placeholder} style={inputStyle} />
            </div>
          ))}

          <Link href="/auth/otp" style={{
            display: 'block', width: '100%', background: 'var(--primary)', color: '#fff',
            fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700,
            padding: 13, borderRadius: 'var(--r-sm)', cursor: 'pointer',
            marginTop: 6, textDecoration: 'none', textAlign: 'center',
          }}>
            Daftar Sekarang →
          </Link>

          <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13.5, color: 'var(--body)' }}>
            Sudah punya akun? <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Login Sekarang</Link>
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
