'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Drawer from '@/components/layout/Drawer'
import BottomNav from '@/components/layout/BottomNav'
import { getUser, getToken, clearAuth, isLoggedIn } from '@/lib/auth'
import { getUserBookings, confirmPayment } from '@/lib/api'
import type { AuthUser } from '@/lib/auth'
import type { UserBooking } from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

type Tab = 'akun' | 'history' | 'bantuan'

const menuItems = [
  { id: 'akun', icon: '👤', label: 'Akun' },
  { id: 'history', icon: '🗺️', label: 'Riwayat Trip' },
  { id: 'bantuan', icon: '❓', label: 'Bantuan' },
]

function statusBadge(status: string) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    pending:   { bg: '#FEF3C7', color: '#D97706', label: 'Menunggu' },
    confirmed: { bg: '#D1FAE5', color: '#059669', label: 'Dikonfirmasi' },
    completed: { bg: '#DBEAFE', color: '#2563EB', label: 'Selesai' },
    cancelled: { bg: '#FEE2E2', color: '#DC2626', label: 'Dibatalkan' },
  }
  const s = map[status] ?? { bg: '#F3F4F6', color: '#6B7280', label: status }
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11.5, fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>
      {s.label}
    </span>
  )
}

function formatRp(n: number | null) {
  if (!n) return '-'
  return 'Rp ' + n.toLocaleString('id-ID')
}

function formatDateStr(s: string | null) {
  if (!s) return '-'
  return new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function AkunTab({ user }: { user: AuthUser }) {
  const rows = [
    { label: 'Nama Lengkap', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Login via', value: 'Google' },
  ]
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Informasi Akun</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>Detail profil akun kamu</p>
      {rows.map(row => (
        <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid var(--stroke)', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: 'var(--body-2)' }}>{row.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--dark)' }}>{row.value}</span>
        </div>
      ))}
    </div>
  )
}

function HistoryTab() {
  const [bookings, setBookings] = useState<UserBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const token = getToken()
    if (!token) { setLoading(false); setError('Not authenticated'); return }
    getUserBookings(token)
      .then(r => {
        const data = r.data ?? []
        setBookings(data)
        // Auto-check every pending booking silently on load
        const pending = data.filter(b => b.status === 'pending')
        pending.forEach(b => {
          confirmPayment(b.booking_code, token)
            .then(res => {
              if (res.booking_status !== 'pending') {
                setBookings(prev => prev.map(x =>
                  x.booking_code === b.booking_code ? { ...x, status: res.booking_status as UserBooking['status'] } : x
                ))
              }
            })
            .catch(() => {})
        })
      })
      .catch(() => setError('Gagal memuat riwayat. Coba refresh halaman.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCheckStatus(bookingCode: string) {
    const token = getToken()
    if (!token) return
    setChecking(prev => ({ ...prev, [bookingCode]: true }))
    try {
      const res = await confirmPayment(bookingCode, token)
      setBookings(prev => prev.map(b =>
        b.booking_code === bookingCode ? { ...b, status: res.booking_status as UserBooking['status'] } : b
      ))
    } catch {
      // fail silently
    } finally {
      setChecking(prev => ({ ...prev, [bookingCode]: false }))
    }
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--primary)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
      <p style={{ fontSize: 13.5, color: 'var(--body-2)' }}>Memuat riwayat trip...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (error) return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 13.5, color: 'var(--danger, #EF4444)' }}>{error}</div>
    </div>
  )

  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Riwayat Trip</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>
        Semua trip yang pernah kamu pesan ({bookings.length} booking)
      </p>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>🗺️</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>Belum Ada Booking</h3>
          <p style={{ fontSize: 14, color: 'var(--body)', maxWidth: 300, margin: '0 auto 20px' }}>Mulai petualanganmu dengan booking trip pertama!</p>
          <Link href="/booking" style={{ background: 'var(--primary)', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, padding: '10px 22px', borderRadius: 'var(--r-sm)', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Booking Sekarang
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {bookings.map(b => (
            <div key={b.id} style={{ border: '1px solid var(--stroke)', borderRadius: 'var(--r-md)', padding: '16px 20px', background: 'var(--white)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--dark)', marginBottom: 2 }}>{b.booking_code}</div>
                  <div style={{ fontSize: 12, color: 'var(--body-2)' }}>Dipesan {formatDateStr(b.created_at)}</div>
                </div>
                {statusBadge(b.status)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '6px 20px', fontSize: 13 }}>
                <div><span style={{ color: 'var(--body-2)' }}>Jenis: </span><strong>{b.trip_type?.name ?? '-'}</strong></div>
                <div><span style={{ color: 'var(--body-2)' }}>Destinasi: </span><strong>{b.destination?.name ?? 'Custom'}</strong></div>
                <div><span style={{ color: 'var(--body-2)' }}>Guide: </span><strong>{b.guide?.name ?? '-'}</strong></div>
                <div><span style={{ color: 'var(--body-2)' }}>Berangkat: </span><strong>{formatDateStr(b.start_date)}</strong></div>
                <div><span style={{ color: 'var(--body-2)' }}>Durasi: </span><strong>{b.duration_days} hari</strong></div>
                <div><span style={{ color: 'var(--body-2)' }}>Peserta: </span><strong>{b.participants_count} orang</strong></div>
              </div>
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--stroke)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div>
                  {b.confirmed_total ? (
                    <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)' }}>{formatRp(b.confirmed_total)}</span>
                  ) : b.estimated_total ? (
                    <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)' }}>{formatRp(b.estimated_total)}</span>
                  ) : (
                    <span style={{ fontSize: 12.5, color: 'var(--body-2)' }}>Harga dikonfirmasi admin</span>
                  )}
                </div>
                {b.status === 'pending' && (
                  <button
                    onClick={() => handleCheckStatus(b.booking_code)}
                    disabled={checking[b.booking_code]}
                    style={{
                      background: 'none', border: '1.5px solid var(--primary)',
                      color: 'var(--primary)', fontSize: 12, fontWeight: 700,
                      padding: '6px 14px', borderRadius: 'var(--r-sm)',
                      cursor: checking[b.booking_code] ? 'not-allowed' : 'pointer',
                      opacity: checking[b.booking_code] ? 0.6 : 1,
                      fontFamily: 'inherit', transition: 'all 0.2s',
                    }}
                  >
                    {checking[b.booking_code] ? '⏳ Mengecek...' : '🔄 Cek Status Pembayaran'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BantuanTab() {
  const options = [
    { icon: '📱', label: 'Chat via WhatsApp', desc: 'Respon cepat 24/7', href: 'https://wa.me/6281234567890' },
    { icon: '📧', label: 'Email Support', desc: 'admin@allgoodadventure.com', href: 'mailto:admin@allgoodadventure.com' },
  ]
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Bantuan</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>Kami siap membantu kamu</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {options.map(opt => (
          <a key={opt.label} href={opt.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--bg)', borderRadius: 'var(--r-md)', textDecoration: 'none', border: '1px solid var(--stroke)' }}>
            <span style={{ fontSize: 24 }}>{opt.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)' }}>{opt.label}</div>
              <div style={{ fontSize: 12.5, color: 'var(--body-2)' }}>{opt.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('akun')
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/auth/login?redirect=/profile')
      return
    }
    setUser(getUser())
    const sync = () => setUser(getUser())
    window.addEventListener('aga-auth-change', sync)
    return () => window.removeEventListener('aga-auth-change', sync)
  }, [router])

  async function handleLogout() {
    const token = getToken()
    if (token) {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      }).catch(() => {})
    }
    clearAuth()
    router.push('/')
  }

  if (!user) return null

  const tabContent: Record<Tab, React.ReactNode> = {
    akun: <AkunTab user={user} />,
    history: <HistoryTab />,
    bantuan: <BantuanTab />,
  }

  return (
    <>
      <Navbar onDrawerOpen={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="page-body" style={{ padding: '36px 5%', maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '272px 1fr', gap: 28 }} className="profile-grid">
          {/* Sidebar */}
          <aside>
            <div style={{ background: 'var(--white)', border: '1px solid var(--stroke)', borderRadius: 'var(--r-lg)', padding: '26px 18px', position: 'sticky', top: 86 }}>
              <div style={{ textAlign: 'center', paddingBottom: 22, borderBottom: '1px solid var(--stroke)', marginBottom: 18 }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 11px', border: '3px solid var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', flexShrink: 0 }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark)' }}>{user.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--body-2)', marginTop: 4 }}>{user.email}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {menuItems.map(item => (
                  <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} style={{
                    display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px',
                    borderRadius: 'var(--r-sm)', cursor: 'pointer', fontSize: 13.5, fontWeight: 500,
                    color: activeTab === item.id ? 'var(--primary)' : 'var(--body)',
                    background: activeTab === item.id ? 'var(--primary-light)' : 'none',
                    border: 'none', fontFamily: 'inherit', width: '100%', textAlign: 'left',
                    transition: 'all 0.2s',
                  }}>
                    <span style={{ fontSize: 17, width: 22, textAlign: 'center' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <div style={{ height: 1, background: 'var(--stroke)', margin: '10px 0' }} />
                <button onClick={handleLogout} style={{
                  display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px',
                  borderRadius: 'var(--r-sm)', cursor: 'pointer', fontSize: 13.5,
                  fontWeight: 500, color: 'var(--danger, #EF4444)', background: 'none',
                  border: 'none', fontFamily: 'inherit', width: '100%', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 17, width: 22, textAlign: 'center' }}>🚪</span>
                  Keluar
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--stroke)', borderRadius: 'var(--r-lg)', padding: 28 }}>
            {tabContent[activeTab]}
          </div>
        </div>
      </main>
      <BottomNav />

      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
