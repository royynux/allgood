'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Drawer from '@/components/layout/Drawer'
import BottomNav from '@/components/layout/BottomNav'
import BookingClient from '@/components/booking/BookingClient'

export default function BookingPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Navbar onDrawerOpen={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div style={{ padding: '16px 5%', background: 'var(--bg)', borderBottom: '1px solid var(--stroke)' }}>
        <span style={{ fontSize: 13, color: 'var(--body-2)' }}>
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Beranda</Link>
          {' › Booking Layanan'}
        </span>
      </div>

      <main className="page-body">
        <BookingClient />
      </main>

      <BottomNav />
    </>
  )
}
