'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { getDestinations, getGuides, createBooking, createSnapToken, confirmPayment } from '@/lib/api'
import type { Destination, Guide, BookingState } from '@/lib/types'
import { formatPrice, today, addDays, formatDate, avatarFallback } from '@/lib/utils'
import { isLoggedIn, getUser, getToken } from '@/lib/auth'

const STEPS = ['Destinasi', 'Tour Guide', 'Detail Perjalanan', 'Data Pemesan', 'Ringkasan']

interface SnapCallbacks {
  onSuccess: (result: unknown) => void
  onPending: (result: unknown) => void
  onError: (result: unknown) => void
  onClose: () => void
}

function getSnap(): { pay: (token: string, cb: SnapCallbacks) => void } | null {
  if (typeof window === 'undefined') return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).snap ?? null
}

function StepBar({ step, onGo }: { step: number; onGo: (s: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, marginBottom: 36 }}>
      {STEPS.map((label, i) => {
        const n = i + 1
        const active = n === step
        const done = n < step
        return (
          <div key={n} onClick={() => done ? onGo(n) : undefined} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            flex: 1, position: 'relative', cursor: done ? 'pointer' : 'default',
          }}>
            {n < STEPS.length && (
              <div style={{
                position: 'absolute', top: 17, left: '50%', width: '100%', height: 2,
                background: done || active ? 'var(--primary)' : 'var(--stroke)', zIndex: 0,
                transition: 'background 0.3s',
              }} />
            )}
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              border: `2px solid ${active || done ? 'var(--primary)' : 'var(--stroke)'}`,
              background: active || done ? 'var(--primary)' : 'var(--white)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700,
              color: active || done ? '#fff' : 'var(--body-2)',
              position: 'relative', zIndex: 1, transition: 'all 0.25s',
              boxShadow: active ? '0 0 0 4px rgba(232,73,15,0.15)' : 'none',
            }}>
              {done ? '✓' : n}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 600,
              color: active || done ? 'var(--primary)' : 'var(--body-2)',
              marginTop: 7, textAlign: 'center', lineHeight: 1.3,
            }} className="hidden sm:block">
              {label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Toast({ msg, onHide }: { msg: string; onHide: () => void }) {
  useEffect(() => {
    const t = setTimeout(onHide, 3000)
    return () => clearTimeout(t)
  }, [onHide])
  return (
    <div style={{
      position: 'fixed', bottom: 76, right: 16, left: 16, background: 'var(--success)',
      color: '#fff', padding: '14px 20px', borderRadius: 'var(--r-sm)',
      fontSize: 14, fontWeight: 600, zIndex: 9999, display: 'flex',
      alignItems: 'center', gap: 10, boxShadow: 'var(--sh-lg)', maxWidth: 400, margin: '0 auto',
    }}>
      ✅ {msg}
    </div>
  )
}

function StepSuccessModal({ stepName, onNext }: { stepName: string; onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(onNext, 1500)
    return () => clearTimeout(t)
  }, [onNext])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
      zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)',
        padding: '32px 40px', textAlign: 'center', maxWidth: 320,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 26 }}>✓</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark)', marginBottom: 6 }}>Langkah Selesai!</div>
        <div style={{ fontSize: 13.5, color: 'var(--body)', lineHeight: 1.6 }}>
          <strong>{stepName}</strong> berhasil diisi. Melanjutkan ke langkah berikutnya...
        </div>
      </div>
    </div>
  )
}

const initialState: BookingState = {
  tripType: null, destination: null, customDestinations: [],
  customDuration: 1, guide: null, startDate: '', participants: 1,
  participantNames: [''], meetingPoint: '', name: '', phone: '', email: '', notes: '',
}

export default function BookingClient() {
  const router = useRouter()
  const [state, setState] = useState<BookingState>(initialState)
  const [step, setStep] = useState(0)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [guides, setGuides] = useState<Guide[]>([])
  const [guideSearch, setGuideSearch] = useState('')
  const [destSearch, setDestSearch] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [stepSuccess, setStepSuccess] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<null | 'success' | 'pending' | 'failed'>(null)
  const [createdBookingCode, setCreatedBookingCode] = useState('')

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/auth/login?redirect=/booking')
      return
    }
    const u = getUser()
    if (u) update({ name: u.name, email: u.email })
    getDestinations().then(r => setDestinations(r.data ?? [])).catch(() => {})
  }, [])

  const fetchGuides = useCallback(async () => {
    try {
      const r = await getGuides({ search: guideSearch || undefined })
      setGuides(r.data ?? [])
    } catch { setGuides([]) }
  }, [guideSearch])

  useEffect(() => {
    const t = setTimeout(fetchGuides, 300)
    return () => clearTimeout(t)
  }, [fetchGuides])

  const update = (patch: Partial<BookingState>) => setState(s => ({ ...s, ...patch }))

  const filteredDests = destinations
    .filter(d => !destSearch || d.name.toLowerCase().includes(destSearch.toLowerCase()))

  const tripDuration = state.tripType === 'one-day' ? 1 : state.customDuration
  const endDate = state.startDate ? addDays(state.startDate, tripDuration - 1) : ''

  function selectTripType(type: 'one-day' | 'custom') {
    update({ tripType: type, destination: null, customDestinations: [] })
    setStep(1)
  }

  function goToStep(s: number) { setStep(s) }

  function canGoNext() {
    if (step === 1) {
      if (state.tripType === 'one-day') return !!state.destination
      if (state.tripType === 'custom') return state.customDestinations.length > 0
    }
    if (step === 2) return !!state.guide
    if (step === 3) return !!state.startDate && state.participants > 0
    if (step === 4) return !!state.name && !!state.phone && !!state.email
    return false
  }

  function handleNext() {
    if (!canGoNext()) return
    const stepNames: Record<number, string> = {
      1: 'Pemilihan Destinasi',
      2: 'Pemilihan Tour Guide',
      3: 'Detail Perjalanan',
      4: 'Data Pemesan',
    }
    setStepSuccess(stepNames[step] ?? '')
  }

  function toggleCustomDest(dest: Destination) {
    const exists = state.customDestinations.some(d => d.id === dest.id)
    if (exists) update({ customDestinations: state.customDestinations.filter(d => d.id !== dest.id) })
    else update({ customDestinations: [...state.customDestinations, dest] })
  }

  function handleParticipantChange(val: number) {
    const n = Math.max(1, Math.min(50, val))
    const names = Array.from({ length: n }, (_, i) => state.participantNames[i] ?? '')
    update({ participants: n, participantNames: names })
  }

  function buildPayload(): Parameters<typeof createBooking>[0] {
    const participantNames = state.participantNames.map((name, i) =>
      name.trim() ? name.trim() : (i === 0 ? state.name : `Peserta ${i + 1}`)
    )
    const payload: Parameters<typeof createBooking>[0] = {
      trip_type: state.tripType!,
      guide_id: state.guide!.id,
      start_date: state.startDate,
      duration_days: tripDuration,
      participants_count: state.participants,
      participant_names: participantNames,
      meeting_point: state.meetingPoint || undefined,
      customer_name: state.name,
      customer_phone: state.phone,
      customer_email: state.email,
      notes: state.notes || undefined,
    }
    if (state.tripType === 'one-day' && state.destination) payload.destination_id = state.destination.id
    if (state.tripType === 'custom') payload.destination_ids = state.customDestinations.map(d => d.id)
    return payload
  }

  function openSnapPopup(token: string, bookingCode: string) {
    const snap = getSnap()
    if (!snap) {
      setSubmitError('Halaman pembayaran belum siap. Tunggu beberapa detik lalu coba lagi.')
      return
    }
    snap.pay(token, {
      onSuccess: () => {
        const authToken = getToken() ?? ''
        confirmPayment(bookingCode, authToken).catch(() => {})
        setPaymentStatus('success')
      },
      onPending: () => setPaymentStatus('pending'),
      onError: () => setPaymentStatus('failed'),
      onClose: () => setSubmitError('Pembayaran belum selesai. Klik "Bayar Sekarang" untuk melanjutkan.'),
    })
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError('')
    try {
      const token = getToken() ?? ''
      if (state.tripType === 'custom') {
        const res = await createBooking(buildPayload(), token)
        setToast(`Booking berhasil! Kode: ${res.data?.booking_code ?? ''}`)
        setState(initialState)
        setStep(0)
        setTimeout(() => router.push('/profile'), 2500)
        return
      }

      // One-day trip: create booking (only once) then open Snap
      let code = createdBookingCode
      if (!code) {
        const res = await createBooking(buildPayload(), token)
        code = res.data?.booking_code ?? ''
        setCreatedBookingCode(code)
      }

      const { snap_token } = await createSnapToken(code, token)
      setSubmitting(false)
      openSnapPopup(snap_token, code)
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Gagal memproses. Coba lagi.')
      setSubmitting(false)
    }
  }

  const S = {
    input: {
      width: '100%', padding: '11px 13px', border: '1.5px solid var(--stroke)',
      borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13.5,
      color: 'var(--dark)', background: 'var(--white)', outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    } as React.CSSProperties,
    label: { display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 7 } as React.CSSProperties,
    fGroup: { marginBottom: 18 } as React.CSSProperties,
    btnNext: {
      background: 'var(--primary)', color: '#fff', border: 'none',
      fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700, padding: '12px 32px',
      borderRadius: 'var(--r-sm)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
    } as React.CSSProperties,
    btnBack: {
      background: 'none', border: '1.5px solid var(--stroke)', color: 'var(--body)',
      fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, padding: '11px 24px',
      borderRadius: 'var(--r-sm)', cursor: 'pointer', transition: 'all 0.2s',
    } as React.CSSProperties,
    btnEdit: {
      background: 'none', border: '1.5px solid var(--stroke)', color: 'var(--primary)',
      fontFamily: 'inherit', fontSize: 12, fontWeight: 600, padding: '5px 12px',
      borderRadius: 'var(--r-sm)', cursor: 'pointer', whiteSpace: 'nowrap' as const,
    } as React.CSSProperties,
    stepNav: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--stroke)', flexWrap: 'wrap', gap: 12,
    } as React.CSSProperties,
  }

  const snapUrl = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js'

  return (
    <div style={{ padding: '36px 5%', maxWidth: 900, margin: '0 auto' }}>
      <Script
        src={snapUrl}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />

      {toast && <Toast msg={toast} onHide={() => setToast('')} />}
      {stepSuccess && (
        <StepSuccessModal
          stepName={stepSuccess}
          onNext={() => { setStepSuccess(null); setStep(s => s + 1) }}
        />
      )}

      <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', marginBottom: 6 }}>Booking Private Trip</h2>
      <p style={{ fontSize: 14.5, color: 'var(--body)', marginBottom: 32 }}>
        Pilih jenis trip, lalu isi langkah demi langkah — tim kami akan menghubungimu dalam 1×24 jam.
      </p>

      {step === 0 ? (
        <>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 14 }}>Pilih Jenis Trip:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 28 }}>
            {[
              { type: 'one-day' as const, icon: '🌅', label: 'One Day Trip', sub: 'Pilih satu destinasi, itinerary sudah disiapkan.', badge: 'Harga langsung tampil', badgeStyle: {} },
              { type: 'custom' as const, icon: '🗺️', label: 'Custom Trip', sub: 'Bebas pilih beberapa destinasi & atur durasi sendiri.', badge: 'Harga dikonfirmasi admin', badgeStyle: { background: 'var(--bg)', color: 'var(--body)', borderColor: 'var(--stroke)' } },
            ].map(t => (
              <div key={t.type} onClick={() => selectTripType(t.type)} style={{
                border: '2px solid var(--stroke)', borderRadius: 'var(--r-lg)',
                padding: '22px 16px', cursor: 'pointer', transition: 'all 0.22s',
                textAlign: 'center', background: 'var(--white)',
              }}>
                <div style={{ fontSize: 34, marginBottom: 10 }}>{t.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--dark)', marginBottom: 5 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.55 }}>{t.sub}</div>
                <span style={{
                  display: 'inline-block', background: 'var(--primary-light)', color: 'var(--primary)',
                  fontSize: 10.5, fontWeight: 700, padding: '3px 9px', borderRadius: 50,
                  marginTop: 7, border: '1px solid rgba(232,73,15,0.2)', ...t.badgeStyle,
                }}>{t.badge}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <StepBar step={step} onGo={goToStep} />

          {/* Step 1: Destination */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>
                {state.tripType === 'custom' ? 'Pilih Destinasi (bisa lebih dari 1)' : 'Pilih Destinasi Trip'}
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 18 }}>
                {state.tripType === 'custom' ? 'Centang semua destinasi yang ingin kamu kunjungi' : 'Pilih destinasi yang ingin kamu kunjungi'}
              </div>

              {state.tripType === 'custom' && (
                <div style={{ background: 'var(--bg)', border: '1px solid var(--stroke)', borderRadius: 'var(--r-md)', padding: '14px 16px', fontSize: 13, color: 'var(--body)', lineHeight: 1.65, marginBottom: 18 }}>
                  💡 Untuk <strong style={{ color: 'var(--dark)' }}>Custom Trip</strong>, kamu bebas memilih beberapa destinasi sekaligus. Durasi & harga dikonfirmasi admin.
                </div>
              )}

              <div style={{ position: 'relative', marginBottom: 18 }}>
                <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
                <input
                  type="text" value={destSearch} onChange={e => setDestSearch(e.target.value)}
                  placeholder="Cari nama destinasi..."
                  style={{ ...S.input, paddingLeft: 40 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 16 }}>
                {filteredDests.map(dest => {
                  const img = dest.image ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80'
                  const isSelected = state.tripType === 'one-day'
                    ? state.destination?.id === dest.id
                    : state.customDestinations.some(d => d.id === dest.id)

                  return (
                    <div key={dest.id} onClick={() => {
                      if (state.tripType === 'one-day') update({ destination: isSelected ? null : dest })
                      else toggleCustomDest(dest)
                    }} style={{
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--stroke)'}`,
                      borderRadius: 'var(--r-md)', overflow: 'hidden', cursor: 'pointer',
                      transition: 'all 0.22s', position: 'relative',
                      boxShadow: isSelected ? '0 0 0 3px rgba(232,73,15,0.15)' : 'none',
                    }}>
                      <div style={{ position: 'relative', height: 110 }}>
                        <Image src={img} alt={dest.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      {isSelected && (
                        <span style={{
                          position: 'absolute', top: 8, right: 8, width: 22, height: 22,
                          background: 'var(--primary)', color: '#fff', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 800,
                        }}>✓</span>
                      )}
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)' }}>{dest.name}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--body-2)', marginTop: 1 }}>{dest.city}</div>
                        {state.tripType === 'one-day' && dest.price && <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginTop: 4 }}>{formatPrice(dest.price)}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>

              {state.tripType === 'custom' && state.customDestinations.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>
                  {state.customDestinations.map(d => (
                    <span key={d.id} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'var(--primary-light)', border: '1px solid rgba(232,73,15,0.25)',
                      color: 'var(--primary)', padding: '6px 12px', borderRadius: 50, fontSize: 12.5, fontWeight: 700,
                    }}>
                      {d.name}
                      <span onClick={() => toggleCustomDest(d)} style={{ cursor: 'pointer', fontSize: 12, color: 'var(--body-2)', marginLeft: 4 }}>✕</span>
                    </span>
                  ))}
                </div>
              )}

              <div style={S.stepNav}>
                <button style={S.btnBack} onClick={() => setStep(0)}>← Ganti Jenis Trip</button>
                <button style={{ ...S.btnNext, opacity: canGoNext() ? 1 : 0.5, cursor: canGoNext() ? 'pointer' : 'not-allowed' }} disabled={!canGoNext()} onClick={handleNext}>
                  Pilih Tour Guide →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Guide */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              {state.destination && (
                <div style={{ marginBottom: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary-light)', border: '1px solid rgba(232,73,15,0.25)', color: 'var(--primary)', padding: '6px 14px', borderRadius: 50, fontSize: 12.5, fontWeight: 700 }}>
                    📍 {state.destination.name}
                  </span>
                </div>
              )}
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>Pilih Tour Guide</div>
              <div style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 18 }}>Pilih guide terbaik sesuai spesialisasi dan preferensimu</div>

              <div style={{ position: 'relative', marginBottom: 18 }}>
                <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
                <input type="text" value={guideSearch} onChange={e => setGuideSearch(e.target.value)} placeholder="Cari nama guide..." style={{ ...S.input, paddingLeft: 40 }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
                {guides.map(guide => {
                  const avatar = guide.avatar ?? avatarFallback(guide.name)
                  const isSelected = state.guide?.id === guide.id
                  return (
                    <div key={guide.id} onClick={() => update({ guide: isSelected ? null : guide })} style={{
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--stroke)'}`,
                      borderRadius: 'var(--r-md)', padding: 16, cursor: 'pointer',
                      transition: 'all 0.22s', position: 'relative',
                      background: isSelected ? 'var(--primary-light)' : 'var(--white)',
                    }}>
                      {isSelected && (
                        <span style={{
                          position: 'absolute', top: 10, right: 10, width: 20, height: 20,
                          background: 'var(--primary)', color: '#fff', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800,
                        }}>✓</span>
                      )}
                      <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', marginBottom: 11, border: '2px solid var(--stroke)' }}>
                        <Image src={avatar} alt={guide.name} width={52} height={52} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 3 }}>{guide.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--body-2)', marginBottom: 6 }}>
                        📍 {guide.location}
                        {guide.age != null && <> · 🎂 {guide.age} tahun</>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--body-2)', marginBottom: 6 }}>⭐ {guide.rating} · {guide.review_count} ulasan</div>
                      {guide.years_experience != null && (
                        <div style={{ fontSize: 11.5, color: 'var(--body-2)' }}>🏅 {guide.years_experience} tahun pengalaman</div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={S.stepNav}>
                <button style={S.btnBack} onClick={() => setStep(1)}>← Kembali</button>
                <button style={{ ...S.btnNext, opacity: canGoNext() ? 1 : 0.5 }} disabled={!canGoNext()} onClick={handleNext}>
                  Detail Perjalanan →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Trip Details */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
                {state.destination && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary-light)', border: '1px solid rgba(232,73,15,0.25)', color: 'var(--primary)', padding: '6px 14px', borderRadius: 50, fontSize: 12.5, fontWeight: 700 }}>📍 {state.destination.name}</span>}
                {state.guide && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--primary-light)', border: '1px solid rgba(232,73,15,0.25)', color: 'var(--primary)', padding: '6px 14px', borderRadius: 50, fontSize: 12.5, fontWeight: 700 }}>👤 {state.guide.name}</span>}
              </div>

              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>Detail Perjalanan</div>
              <div style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 22 }}>Tentukan jadwal dan jumlah peserta</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div>
                  {state.tripType === 'custom' && (
                    <div style={S.fGroup}>
                      <label style={S.label}>Berapa hari perkiraan trip? <span style={{ color: 'var(--primary)' }}>*</span></label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                        <input type="number" min={1} max={14} value={state.customDuration}
                          onChange={e => update({ customDuration: Math.max(1, Math.min(14, Number(e.target.value))) })}
                          style={{ ...S.input, width: 90, fontSize: 20, fontWeight: 800, textAlign: 'center' }}
                        />
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--dark)' }}>Hari</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--body-2)' }}>Maks. 14 hari — admin konfirmasi detail.</div>
                    </div>
                  )}

                  <div style={S.fGroup}>
                    <label style={S.label}>Tanggal {state.tripType === 'custom' ? 'Keberangkatan (perkiraan)' : 'Berangkat'} <span style={{ color: 'var(--primary)' }}>*</span></label>
                    <input type="date" min={today()} value={state.startDate}
                      onChange={e => update({ startDate: e.target.value })}
                      style={S.input}
                    />
                  </div>

                  {state.startDate && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary-light)', border: '1px solid rgba(232,73,15,0.25)', color: 'var(--primary)', padding: '10px 16px', borderRadius: 'var(--r-sm)', fontSize: 14, fontWeight: 700 }}>
                      📅 {tripDuration} Hari {tripDuration > 1 ? `${tripDuration - 1} Malam` : ''} — s/d {formatDate(endDate)}
                    </div>
                  )}
                </div>

                <div>
                  <div style={S.fGroup}>
                    <label style={S.label}>Jumlah Peserta <span style={{ color: 'var(--primary)' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--stroke)', borderRadius: 'var(--r-sm)', overflow: 'hidden', width: 'fit-content' }}>
                      <button onClick={() => handleParticipantChange(state.participants - 1)} style={{ width: 42, height: 42, background: 'var(--bg)', border: 'none', fontSize: 20, fontWeight: 700, cursor: 'pointer', color: 'var(--dark)' }}>−</button>
                      <div style={{ padding: '0 20px', fontSize: 16, fontWeight: 800, color: 'var(--dark)', minWidth: 60, textAlign: 'center', borderLeft: '1.5px solid var(--stroke)', borderRight: '1.5px solid var(--stroke)', height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {state.participants}
                      </div>
                      <button onClick={() => handleParticipantChange(state.participants + 1)} style={{ width: 42, height: 42, background: 'var(--bg)', border: 'none', fontSize: 20, fontWeight: 700, cursor: 'pointer', color: 'var(--dark)' }}>+</button>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--body-2)', marginTop: 7 }}>Minimal 1 orang</div>
                  </div>

                  <div style={S.fGroup}>
                    <label style={S.label}>Meeting Point</label>
                    <input type="text" value={state.meetingPoint} onChange={e => update({ meetingPoint: e.target.value })}
                      placeholder="Contoh: Bandara Lombok International" style={S.input}
                    />
                  </div>
                </div>
              </div>

              <div style={S.stepNav}>
                <button style={S.btnBack} onClick={() => setStep(2)}>← Kembali</button>
                <button style={{ ...S.btnNext, opacity: canGoNext() ? 1 : 0.5 }} disabled={!canGoNext()} onClick={handleNext}>
                  Data Pemesan →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Booker Info */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>Data Pemesan</div>
              <div style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 22 }}>Lengkapi informasi kontak kamu</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div>
                  <div style={S.fGroup}>
                    <label style={S.label}>Nama Lengkap <span style={{ color: 'var(--primary)' }}>*</span></label>
                    <input type="text" value={state.name} onChange={e => update({ name: e.target.value })} placeholder="Nama lengkap kamu" style={S.input} />
                  </div>
                  <div style={S.fGroup}>
                    <label style={S.label}>Nomor Ponsel <span style={{ color: 'var(--primary)' }}>*</span></label>
                    <input type="tel" value={state.phone} onChange={e => update({ phone: e.target.value })} placeholder="+62 812 3456 7890" style={S.input} />
                  </div>
                </div>
                <div>
                  <div style={S.fGroup}>
                    <label style={S.label}>Email <span style={{ color: 'var(--primary)' }}>*</span></label>
                    <input type="email" value={state.email} onChange={e => update({ email: e.target.value })} placeholder="nama@email.com" style={S.input} />
                  </div>
                  <div style={S.fGroup}>
                    <label style={S.label}>Catatan / Permintaan Khusus</label>
                    <textarea value={state.notes} onChange={e => update({ notes: e.target.value })}
                      placeholder="Vegetarian, alergi, ulang tahun, dll..."
                      style={{ ...S.input, resize: 'vertical', minHeight: 100 }}
                    />
                  </div>
                </div>
              </div>

              {state.participants > 1 && (
                <div style={{ marginTop: 18 }}>
                  <label style={S.label}>Nama Peserta</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {Array.from({ length: state.participants }, (_, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: 12.5, color: 'var(--body-2)', width: 80, flexShrink: 0 }}>Peserta {i + 1}</span>
                        <input type="text" value={state.participantNames[i] ?? ''} placeholder={`Nama peserta ${i + 1}`}
                          onChange={e => {
                            const names = [...state.participantNames]
                            names[i] = e.target.value
                            update({ participantNames: names })
                          }}
                          style={{ ...S.input }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={S.stepNav}>
                <button style={S.btnBack} onClick={() => setStep(3)}>← Kembali</button>
                <button style={{ ...S.btnNext, opacity: canGoNext() ? 1 : 0.5 }} disabled={!canGoNext()} onClick={handleNext}>
                  Lihat Ringkasan →
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Summary + Payment */}
          {step === 5 && (
            <div className="animate-fade-in-up">

              {/* Payment success screen */}
              {paymentStatus === 'success' && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>✓</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 8 }}>Pembayaran Berhasil!</div>
                  <div style={{ fontSize: 14, color: 'var(--body)', marginBottom: 20, lineHeight: 1.7 }}>
                    Booking kamu sudah dikonfirmasi.<br />
                    <strong style={{ color: 'var(--dark)' }}>Kode booking: {createdBookingCode}</strong><br />
                    Tim kami akan menghubungi kamu segera.
                  </div>
                  <button onClick={() => router.push('/')} style={{ ...S.btnNext, margin: '0 auto', fontSize: 15, padding: '14px 36px' }}>
                    Kembali ke Beranda
                  </button>
                </div>
              )}

              {/* Payment pending screen */}
              {paymentStatus === 'pending' && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>⏳</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 8 }}>Pembayaran Diproses</div>
                  <div style={{ fontSize: 14, color: 'var(--body)', marginBottom: 20, lineHeight: 1.7 }}>
                    Pembayaran kamu sedang diverifikasi.<br />
                    <strong style={{ color: 'var(--dark)' }}>Kode booking: {createdBookingCode}</strong><br />
                    Setelah dikonfirmasi, booking akan aktif otomatis. Cek email kamu.
                  </div>
                  <button onClick={() => router.push('/')} style={{ ...S.btnNext, margin: '0 auto', fontSize: 15, padding: '14px 36px' }}>
                    Kembali ke Beranda
                  </button>
                </div>
              )}

              {/* Payment failed screen */}
              {paymentStatus === 'failed' && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--danger, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>✕</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--dark)', marginBottom: 8 }}>Pembayaran Gagal</div>
                  <div style={{ fontSize: 14, color: 'var(--body)', marginBottom: 20, lineHeight: 1.7 }}>
                    Pembayaran tidak berhasil. Kode booking kamu <strong style={{ color: 'var(--dark)' }}>{createdBookingCode}</strong> masih tersimpan.<br />
                    Silakan coba bayar lagi.
                  </div>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => { setPaymentStatus(null); setSubmitError('') }} style={{ ...S.btnNext, fontSize: 15, padding: '14px 36px' }}>
                      Coba Bayar Lagi
                    </button>
                    <button onClick={() => router.push('/')} style={{ ...S.btnBack, padding: '14px 24px' }}>
                      Kembali ke Beranda
                    </button>
                  </div>
                </div>
              )}

              {/* Normal summary (shown when no payment result yet) */}
              {!paymentStatus && (
                <>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginBottom: 4 }}>Ringkasan & Total Biaya</div>
                  <div style={{ fontSize: 13.5, color: 'var(--body-2)', marginBottom: 22 }}>Periksa detail tripmu sebelum melanjutkan</div>

                  <div style={{ background: 'var(--bg)', border: '1px solid var(--stroke)', borderRadius: 'var(--r-lg)', overflow: 'hidden', marginBottom: 20 }}>
                    <div style={{ background: 'var(--dark)', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>📋</span>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Detail Pemesanan</h3>
                      <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 50 }}>
                        🔒 100% Private
                      </span>
                    </div>
                    <div style={{ padding: '20px 22px' }}>
                      {[
                        { label: 'Jenis Trip', value: state.tripType === 'one-day' ? 'One Day Trip' : 'Custom Trip', editStep: 0 },
                        { label: 'Destinasi', value: state.tripType === 'one-day' ? (state.destination?.name ?? '-') : (state.customDestinations.map(d => d.name).join(', ') || '-'), editStep: 1 },
                        { label: 'Tour Guide', value: state.guide?.name ?? '-', editStep: 2 },
                        { label: 'Tanggal Berangkat', value: state.startDate ? formatDate(state.startDate) : '-', editStep: 3 },
                        { label: 'Tanggal Pulang', value: endDate ? formatDate(endDate) : '-', editStep: 3 },
                        { label: 'Durasi', value: `${tripDuration} Hari ${tripDuration > 1 ? `${tripDuration - 1} Malam` : ''}`, editStep: 3 },
                        { label: 'Jumlah Peserta', value: `${state.participants} orang`, editStep: 3 },
                        { label: 'Meeting Point', value: state.meetingPoint || '-', editStep: 3 },
                        { label: 'Nama Pemesan', value: state.name, editStep: 4 },
                        { label: 'Nomor Ponsel', value: state.phone, editStep: 4 },
                        { label: 'Email', value: state.email, editStep: 4 },
                      ].map(row => (
                        <div key={row.label} className="booking-summary-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid var(--stroke)', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 12.5, color: 'var(--body)', minWidth: 110, flexShrink: 0 }}>{row.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', flex: 1, minWidth: 0, wordBreak: 'break-word' }}>{row.value}</span>
                          <button style={S.btnEdit} onClick={() => goToStep(row.editStep)}>Edit</button>
                        </div>
                      ))}
                      {state.notes && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '11px 0', borderBottom: '1px solid var(--stroke)', gap: 12 }}>
                          <span style={{ fontSize: 13, color: 'var(--body)', minWidth: 130 }}>Catatan</span>
                          <span style={{ fontSize: 13.5, color: 'var(--dark)', flex: 1, textAlign: 'right' }}>{state.notes}</span>
                          <button style={S.btnEdit} onClick={() => goToStep(4)}>Edit</button>
                        </div>
                      )}
                    </div>

                    {state.tripType !== 'custom' && state.destination?.price ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', background: 'var(--primary-light)', borderTop: '2px solid var(--primary)' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>Total Pembayaran</span>
                        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>
                          {formatPrice(state.destination.price * state.participants)}
                        </span>
                      </div>
                    ) : (
                      <div style={{ padding: '12px 22px', borderTop: '1px solid var(--stroke)', background: 'var(--white)' }}>
                        <div style={{ textAlign: 'center', padding: '10px 0' }}>
                          <div style={{ fontSize: 24, marginBottom: 6 }}>💬</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>Harga Dikonfirmasi Admin</div>
                          <div style={{ fontSize: 12, color: 'var(--body-2)' }}>Tim kami akan menghubungimu dalam 1×24 jam dengan penawaran terbaik.</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--r-sm)', padding: '12px 16px', fontSize: 13, color: 'var(--danger, #EF4444)', marginBottom: 16 }}>
                      ❌ {submitError}
                    </div>
                  )}

                  <div style={S.stepNav}>
                    <button style={S.btnBack} onClick={() => setStep(4)}>← Kembali</button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      style={{
                        ...S.btnNext, fontSize: 15, padding: '14px 36px',
                        opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {submitting
                        ? '⏳ Memproses...'
                        : state.tripType === 'one-day'
                          ? (createdBookingCode ? 'Lanjutkan Pembayaran 💳' : 'Bayar Sekarang 💳')
                          : 'Kirim Permintaan ✈️'
                      }
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
