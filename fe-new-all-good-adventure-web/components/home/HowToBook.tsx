'use client'

import { useEffect, useState } from 'react'
import { getSiteSettings } from '@/lib/api'
import type { HowToBookSectionSettings, HowToBookStepSettings } from '@/lib/types'

const DEFAULT_STEPS: HowToBookStepSettings[] = [
  { title: 'Pilih Destinasi', desc: 'Browse destinasi Lombok favorit dari katalog kami.' },
  { title: 'Pilih Tour Guide', desc: 'Pilih tour guide bersertifikat sesuai spesialisasi dan kebutuhan trip.' },
  { title: 'Atur Jadwal', desc: 'Tentukan tanggal, durasi, dan jumlah peserta tripmu.' },
  { title: 'Isi Data Diri', desc: 'Lengkapi informasi kontak dan permintaan khusus.' },
  { title: 'Cek Ringkasan', desc: 'Review total biaya dan detail trip sebelum submit.' },
  { title: 'Siap Berangkat! 🎉', desc: 'Tim kami menghubungimu dalam 1×24 jam untuk konfirmasi.' },
]

const DEFAULT_SECTION: HowToBookSectionSettings = {
  label: 'Cara Pesan',
  title: 'Cara Booking Private Trip Mudah & Cepat',
}

export default function HowToBook() {
  const [section, setSection] = useState<HowToBookSectionSettings>(DEFAULT_SECTION)
  const [steps, setSteps] = useState<HowToBookStepSettings[]>(DEFAULT_STEPS)

  useEffect(() => {
    getSiteSettings()
      .then(res => {
        if (res.data?.how_to_book_section) setSection({ ...DEFAULT_SECTION, ...res.data.how_to_book_section })
        if (res.data?.how_to_book_steps) {
          setSteps(DEFAULT_STEPS.map((def, i) => ({ ...def, ...res.data.how_to_book_steps?.[i] })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section style={{ padding: '80px 5%', background: 'var(--white)' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, display: 'block', textAlign: 'center' }}>
          {section.label}
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.2 }}>
          {section.title}
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
      }} className="how-to-book-grid">
        {steps.map((step, i) => (
          <div key={i} style={{
            background: 'var(--white)', border: '1px solid var(--stroke)',
            borderRadius: 'var(--r-lg)', padding: '26px 22px',
            transition: 'all 0.25s',
          }}>
            <div style={{
              width: 42, height: 42, background: 'var(--primary)',
              color: '#fff', borderRadius: 11, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 17, fontWeight: 800, marginBottom: 14,
            }}>{i + 1}</div>
            <h4 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--dark)', marginBottom: 7 }}>{step.title}</h4>
            <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.65 }}>{step.desc}</p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) { .how-to-book-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .how-to-book-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
