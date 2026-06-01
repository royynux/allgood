'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setAuth } from '@/lib/auth'

export default function AuthCallbackPage() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const token  = params.get('token')
    const id     = params.get('id')
    const name   = params.get('name')
    const email  = params.get('email')
    const avatar = params.get('avatar')
    const error  = params.get('error')

    if (error || !token || !id || !name || !email) {
      router.replace('/auth/login?error=1')
      return
    }

    setAuth(token, {
      id: Number(id),
      name,
      email,
      avatar: avatar || null,
    })

    router.replace('/')
  }, [params, router])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '3px solid var(--primary)', borderTopColor: 'transparent',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ fontSize: 15, color: 'var(--body)', fontWeight: 600 }}>Memproses login...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
