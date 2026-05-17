'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Drawer from '@/components/layout/Drawer'
import BottomNav from '@/components/layout/BottomNav'

type Tab = 'akun' | 'history' | 'wallet' | 'keamanan' | 'bantuan'

const menuItems = [
  { id: 'akun', icon: '👤', label: 'Akun' },
  { id: 'history', icon: '🗺️', label: 'Riwayat Trip' },
  { id: 'wallet', icon: '💳', label: 'Wallet & Poin' },
  { id: 'keamanan', icon: '🛡️', label: 'Keamanan' },
  { id: 'bantuan', icon: '❓', label: 'Bantuan' },
]

function AkunTab() {
  const rows = [
    { label: 'Nama Lengkap', value: 'Indra Permana' },
    { label: 'Email', value: 'indra@gmail.com' },
    { label: 'Nomor Ponsel', value: '+62 812 3456 7890' },
    { label: 'Member Sejak', value: 'Januari 2024' },
    { label: 'Status', value: '✅ Terverifikasi' },
  ]
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Informasi Akun</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>Kelola informasi profil kamu</p>
      {rows.map(row => (
        <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid var(--stroke)', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: 'var(--body-2)' }}>{row.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--dark)' }}>{row.value}</span>
        </div>
      ))}
      <button style={{ marginTop: 20, background: 'var(--primary)', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, padding: '10px 22px', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}>
        Edit Profil
      </button>
    </div>
  )
}

function HistoryTab() {
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Riwayat Trip</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>Semua trip yang pernah kamu jalani</p>
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>🗺️</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>Belum Ada Trip</h3>
        <p style={{ fontSize: 14, color: 'var(--body)', maxWidth: 300, margin: '0 auto 20px' }}>Mulai petualanganmu dengan booking trip pertama!</p>
        <Link href="/katalog" style={{ background: 'var(--primary)', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, padding: '10px 22px', borderRadius: 'var(--r-sm)', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Lihat Destinasi
        </Link>
      </div>
    </div>
  )
}

function WalletTab() {
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Wallet & Poin</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>Kelola saldo dan poin reward kamu</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 30 }}>
        <div style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', borderRadius: 'var(--r-lg)', padding: 24, color: '#fff' }}>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>Saldo Wallet</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>Rp 0</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#0F1B2D,#1a3a5c)', borderRadius: 'var(--r-lg)', padding: 24, color: '#fff' }}>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>Poin Reward</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>0 Poin</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ fontSize: 14, color: 'var(--body)', marginBottom: 16 }}>Kumpulkan poin dengan setiap booking trip!</p>
        <Link href="/booking" style={{ background: 'var(--primary)', color: '#fff', textDecoration: 'none', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, padding: '10px 22px', borderRadius: 'var(--r-sm)', display: 'inline-block' }}>
          Booking Sekarang
        </Link>
      </div>
    </div>
  )
}

function KeamananTab() {
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Keamanan</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>Jaga keamanan akunmu</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        {['Kata Sandi Lama', 'Kata Sandi Baru', 'Konfirmasi Kata Sandi Baru'].map(label => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 7 }}>{label}</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '11px 13px', border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5, outline: 'none', background: 'var(--white)', color: 'var(--dark)' }} />
          </div>
        ))}
        <button style={{ background: 'var(--primary)', color: '#fff', border: 'none', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, padding: '11px 22px', borderRadius: 'var(--r-sm)', cursor: 'pointer', width: 'fit-content' }}>
          Simpan Perubahan
        </button>
      </div>
    </div>
  )
}

function BantuanTab() {
  const options = [
    { icon: '📱', label: 'Chat via WhatsApp', desc: 'Respon cepat 24/7', action: 'wa.me/6281234567890' },
    { icon: '📧', label: 'Email Support', desc: 'admin@allgoodadventure.com', action: '#' },
    { icon: '❓', label: 'FAQ', desc: 'Pertanyaan yang sering ditanyakan', action: '#' },
  ]
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>Bantuan</h2>
      <p style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--stroke)' }}>Kami siap membantu kamu</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {options.map(opt => (
          <a key={opt.label} href={opt.action} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--bg)', borderRadius: 'var(--r-md)', textDecoration: 'none', border: '1px solid var(--stroke)' }}>
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('akun')

  const tabContent = {
    akun: <AkunTab />,
    history: <HistoryTab />,
    wallet: <WalletTab />,
    keamanan: <KeamananTab />,
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
                <div style={{ width: 76, height: 76, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 11px', border: '3px solid var(--primary-light)' }}>
                  <Image src="https://i.pravatar.cc/200?img=12" alt="Profile" width={76} height={76} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark)' }}>Indra Permana</div>
                <div style={{ fontSize: 12.5, color: 'var(--body-2)', marginTop: 4 }}>indra@gmail.com</div>
                <div style={{ fontSize: 12.5, color: 'var(--body-2)', marginTop: 3 }}>+62 812 3456 7890</div>
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
                <Link href="/auth/login" style={{
                  display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px',
                  borderRadius: 'var(--r-sm)', cursor: 'pointer', fontSize: 13.5,
                  fontWeight: 500, color: 'var(--danger)', background: 'none',
                  border: 'none', fontFamily: 'inherit', width: '100%', textDecoration: 'none',
                }}>
                  <span style={{ fontSize: 17, width: 22, textAlign: 'center' }}>🚪</span>
                  Keluar
                </Link>
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
