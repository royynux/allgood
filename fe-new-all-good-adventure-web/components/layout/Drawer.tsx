'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUser, getToken, clearAuth } from '@/lib/auth'
import type { AuthUser } from '@/lib/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const navLinks = [
  { href: '/', label: '🏠 Beranda' },
  { href: '/katalog', label: '🗺️ Katalog' },
  { href: '/booking', label: '🎒 Booking Layanan' },
  { href: '/tentang', label: 'ℹ️ Tentang Kami' },
]

interface DrawerProps {
  open: boolean
  onClose: () => void
}

export default function Drawer({ open, onClose }: DrawerProps) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    setUser(getUser())
    const sync = () => setUser(getUser())
    window.addEventListener('aga-auth-change', sync)
    return () => window.removeEventListener('aga-auth-change', sync)
  }, [])

  async function handleLogout() {
    const token = getToken()
    if (token) {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      }).catch(() => {})
    }
    clearAuth()
    onClose()
    router.push('/')
  }

  return (
    <>
      {open && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
      )}
      <div style={{
        position: 'fixed', right: open ? 0 : -320, top: 0, bottom: 0,
        width: 290, background: 'var(--white)', zIndex: 201,
        padding: 20, transition: 'right 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflowY: 'auto', boxShadow: 'var(--sh-lg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
              <img src="/logoTrip.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            <span style={{ fontWeight: 800, fontSize: 15 }}>All Good Adventure</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--stroke)', width: 32, height: 32, borderRadius: 8, fontSize: 16, cursor: 'pointer', color: 'var(--body)' }}>✕</button>
        </div>

        {/* User info if logged in */}
        {user && (
          <>
          <Link href="/profile" onClick={onClose} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', background: 'var(--primary-light)',
            borderRadius: 'var(--r-sm)', textDecoration: 'none', marginBottom: 8,
            fontSize: 13, fontWeight: 700, color: 'var(--primary)',
          }}>🗺️ Pesanan Saya</Link>
          </>
        )}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--bg)', borderRadius: 'var(--r-md)', marginBottom: 16 }}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--body-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={onClose} style={{
              fontSize: 15, fontWeight: 500, color: 'var(--dark)',
              textDecoration: 'none', padding: '12px 14px',
              borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: 10,
            }}>{link.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--stroke)' }}>
          {user ? (
            <button onClick={handleLogout} style={{
              display: 'block', textAlign: 'center', background: 'none',
              border: '1.5px solid var(--stroke)', color: 'var(--body)',
              fontSize: 13.5, fontWeight: 600, padding: 12,
              borderRadius: 'var(--r-sm)', cursor: 'pointer', width: '100%',
            }}>Keluar</button>
          ) : (
            <Link href="/auth/login" onClick={onClose} style={{
              display: 'block', textAlign: 'center',
              background: 'var(--primary)', color: '#fff',
              fontSize: 13.5, fontWeight: 700, padding: 12,
              borderRadius: 'var(--r-sm)', textDecoration: 'none',
            }}>Login dengan Google</Link>
          )}
        </div>
      </div>
    </>
  )
}
