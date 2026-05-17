import type { Destination, Guide, BookingPayload, BookingResponse, ApiResponse, Review } from './types'
import { DESTINATIONS } from './data/destinations'
import { GUIDES } from './data/guides'

export interface DestinationFilters {
  search?: string
  trip_type?: string
  category?: string
  city?: string
  price_min?: number
  price_max?: number
  featured?: boolean
}

export interface GuideFilters {
  search?: string
  specialty?: string
}

export async function getDestinations(filters: DestinationFilters = {}): Promise<ApiResponse<Destination[]>> {
  let data = DESTINATIONS.filter(d => d.is_active)

  if (filters.trip_type) {
    data = data.filter(d => d.trip_type?.slug === filters.trip_type)
  }
  if (filters.category) {
    data = data.filter(d => d.category?.slug === filters.category)
  }
  if (filters.city) {
    data = data.filter(d => d.city.toLowerCase() === filters.city!.toLowerCase())
  }
  if (filters.price_min != null) {
    data = data.filter(d => (d.price ?? 0) >= filters.price_min!)
  }
  if (filters.price_max != null) {
    data = data.filter(d => (d.price ?? 0) <= filters.price_max!)
  }
  if (filters.featured) {
    data = data.filter(d => d.badge != null)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    data = data.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    )
  }

  return { data }
}

export async function getDestination(slug: string): Promise<{ data: Destination }> {
  const dest = DESTINATIONS.find(d => d.slug === slug && d.is_active)
  if (!dest) throw new Error('Destination not found')
  return { data: dest }
}

export async function getDestinationReviews(_slug: string): Promise<{ data: Review[] }> {
  return { data: [] }
}

export async function getGuides(filters: GuideFilters = {}): Promise<ApiResponse<Guide[]>> {
  let data = GUIDES.filter(g => g.is_active)

  if (filters.specialty) {
    data = data.filter(g => g.specialty === filters.specialty)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    data = data.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.specialty_label.toLowerCase().includes(q) ||
      g.bio.toLowerCase().includes(q)
    )
  }

  return { data }
}

export async function getGuide(id: number): Promise<{ data: Guide }> {
  const guide = GUIDES.find(g => g.id === id && g.is_active)
  if (!guide) throw new Error('Guide not found')
  return { data: guide }
}

export async function createBooking(_payload: BookingPayload): Promise<BookingResponse> {
  await new Promise(r => setTimeout(r, 800))
  return {
    message: 'Booking berhasil dikirim! Admin akan menghubungi kamu dalam 1x24 jam.',
    data: {
      booking_code: `AGA-${Date.now().toString(36).toUpperCase()}`,
      status: 'pending',
      customer_name: _payload.customer_name,
      start_date: _payload.start_date,
      estimated_total: null,
    },
  }
}
