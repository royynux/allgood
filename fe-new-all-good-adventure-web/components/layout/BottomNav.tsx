'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', icon: '🏠', label: 'Beranda' },
  { href: '/katalog', icon: '🔍', label: 'Katalog' },
  { href: '/booking', icon: '🎒', label: 'Booking' },
  { href: '/profile', icon: '👤', label: 'Profil' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--stroke)', zIndex: 100,
      padding: '8px 0',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {items.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, textDecoration: 'none', padding: '4px 10px',
              color: active ? 'var(--primary)' : 'var(--body-2)',
              fontSize: 10.5, fontWeight: 500, transition: 'color 0.2s',
              position: 'relative',
            }}>
              {active && (
                <span style={{
                  position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                  width: 28, height: 3, background: 'var(--primary)',
                  borderRadius: '0 0 4px 4px',
                }} />
              )}
              <span style={{ fontSize: 19, lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
