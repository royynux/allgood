'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Drawer from '@/components/layout/Drawer'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'

const values = [
  { icon: '🌿', title: 'Cinta Lingkungan', desc: 'Setiap trip dirancang untuk menghormati kelestarian alam dan budaya Lombok.' },
  { icon: '🛡️', title: 'Keselamatan Utama', desc: 'Standar keselamatan ketat, asuransi perjalanan, dan guide bersertifikat.' },
  { icon: '🔒', title: '100% Private', desc: 'Tripmu eksklusif hanya untuk kamu dan rombongan. Tidak ada stranger yang ikut.' },
  { icon: '⭐', title: 'Pengalaman Terbaik', desc: 'Setiap detail dirancang untuk kenangan yang tak terlupakan seumur hidup.' },
]

const team = [
  { name: 'Reza Mahendra', role: 'Founder & CEO', bio: 'Pendaki berpengalaman, membangun AGA dari nol.', cover: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80', avatar: 'https://i.pravatar.cc/200?img=11' },
  { name: 'Dita Rahayu', role: 'Head of Operations', bio: 'Memastikan setiap operasional trip berjalan sempurna.', cover: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=400&q=80', avatar: 'https://i.pravatar.cc/200?img=9' },
  { name: 'Agus Setiawan', role: 'Head of Guide Training', bio: 'Melatih dan mensertifikasi seluruh tour guide AGA.', cover: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&q=80', avatar: 'https://i.pravatar.cc/200?img=15' },
  { name: 'Putri Handayani', role: 'Customer Experience', bio: 'Memastikan setiap pelanggan puas dari awal hingga akhir.', cover: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80', avatar: 'https://i.pravatar.cc/200?img=20' },
]

export default function TentangPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Navbar onDrawerOpen={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="page-body">
        {/* Hero */}
        <div style={{ background: 'linear-gradient(155deg,#0F1B2D 0%,#1a3a5c 60%,#0F1B2D 100%)', padding: '80px 5% 72px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,73,15,0.18)', border: '1px solid rgba(232,73,15,0.4)', color: '#FF8A65', padding: '6px 14px', borderRadius: 50, fontSize: 12.5, fontWeight: 700, margin: '0 auto 20px' }}>
              🏔️ Sejak 2018 — Lombok
            </div>
            <h1 style={{ fontSize: 'clamp(30px,4.5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              Kami adalah <span style={{ color: 'var(--primary)' }}>All Good</span> Adventure
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 36px' }}>
              Berawal dari kecintaan terhadap alam Lombok, kami hadir sebagai spesialis private trip terpercaya untuk setiap perjalananmu.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
              {[{ num: '7+', label: 'Tahun Berpengalaman' }, { num: '10K+', label: 'Traveler Puas' }, { num: '50+', label: 'Destinasi' }, { num: '48', label: 'Guide Aktif' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story */}
        <div style={{ padding: '80px 5%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>
            <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--sh-lg)' }}>
              <Image src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" alt="Our Story" width={800} height={420} style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Cerita Kami</div>
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,36px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.25, marginBottom: 16 }}>Dari Hobi Menjadi Misi</h2>
              <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.85, marginBottom: 18 }}>
                All Good Adventure lahir pada tahun 2018 dari sebuah grup pendakian kecil di Lombok. Kami percaya bahwa setiap orang berhak merasakan keajaiban alam Lombok — tanpa kerumitan dan rasa khawatir.
              </p>
              <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.85, marginBottom: 18 }}>
                Selama 7 tahun, kami telah menemani lebih dari 10.000 traveler dari seluruh Indonesia dan dunia menjelajahi keindahan Lombok — dari puncak Rinjani, kepulauan Gili, hingga pantai-pantai tersembunyi.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 24, flexWrap: 'wrap' }}>
                <Link href="/katalog" style={{ background: 'var(--primary)', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '12px 22px', borderRadius: 'var(--r-sm)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  Jelajahi Destinasi →
                </Link>
                <Link href="/guide" style={{ background: 'none', border: '1.5px solid var(--stroke)', color: 'var(--dark)', textDecoration: 'none', fontWeight: 600, padding: '12px 22px', borderRadius: 'var(--r-sm)' }}>
                  Kenali Guide Kami
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ background: 'var(--bg)', padding: '80px 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Nilai Kami</div>
            <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: 'var(--dark)' }}>Yang Kami Pegang Teguh</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 22 }}>
            {values.map(v => (
              <div key={v.title} style={{ background: 'var(--white)', border: '1px solid var(--stroke)', borderRadius: 'var(--r-lg)', padding: '28px 24px', textAlign: 'center', transition: 'all 0.25s' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{v.title}</h4>
                <p style={{ fontSize: 13.5, color: 'var(--body)', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ padding: '80px 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Tim Kami</div>
            <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: 'var(--dark)' }}>Orang-orang di Balik AGA</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
            {team.map(member => (
              <div key={member.name} style={{ background: 'var(--white)', border: '1px solid var(--stroke)', borderRadius: 'var(--r-lg)', overflow: 'hidden', textAlign: 'center', paddingBottom: 22, transition: 'all 0.25s' }}>
                <div style={{ height: 100, overflow: 'hidden' }}>
                  <Image src={member.cover} alt={member.name} width={400} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid #fff', overflow: 'hidden', margin: '-36px auto 12px', position: 'relative' }}>
                  <Image src={member.avatar} alt={member.name} width={72} height={72} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--primary)', fontWeight: 600, marginBottom: 8 }}>{member.role}</div>
                <div style={{ fontSize: 12.5, color: 'var(--body)', lineHeight: 1.6, padding: '0 16px' }}>{member.bio}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--primary)', padding: '64px 5%', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>Siap Memulai Petualanganmu?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 30 }}>Bergabunglah dengan 10.000+ traveler yang sudah mempercayai All Good Adventure.</p>
          <Link href="/katalog" style={{
            background: '#fff', color: 'var(--primary)', border: 'none',
            fontSize: 15, fontWeight: 700, padding: '14px 32px', borderRadius: 'var(--r-sm)',
            cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Jelajahi Destinasi Sekarang →
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
