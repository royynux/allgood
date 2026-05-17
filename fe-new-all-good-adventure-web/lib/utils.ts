export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Harga dikonfirmasi'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export function today(): string {
  return new Date().toISOString().split('T')[0]
}

export function renderStars(rating: number): string {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

export function getDurationLabel(days: number, nights?: number): string {
  if (days === 1) return '1 Hari'
  const n = nights ?? days - 1
  return `${days} Hari ${n} Malam`
}

export function tripTypeLabel(type: string | null | undefined): string {
  switch (type) {
    case 'one-day': return 'One Day Trip'
    case 'rinjani': return 'Pendakian Rinjani'
    case 'custom': return 'Custom Trip'
    default: return type ?? '-'
  }
}

export function avatarFallback(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E8490F&color=fff&size=200`
}
