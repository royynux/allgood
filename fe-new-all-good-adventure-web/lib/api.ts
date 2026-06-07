import type { Destination, Guide, BookingPayload, BookingResponse, ApiResponse, Review, SnapTokenResponse, UserBooking, TeamMember, GalleryPhoto, Testimonial, SiteSettings } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function request<T>(path: string, options?: RequestInit & { token?: string }): Promise<T> {
  const isPost = options?.method === 'POST'
  const { token, headers: extraHeaders, ...restOptions } = options ?? {}
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Accept': 'application/json',
      ...(isPost ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(extraHeaders as Record<string, string> ?? {}),
    },
    ...restOptions,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export interface DestinationFilters {
  search?: string
  trip_type?: string
  category?: string
  city?: string
  price_min?: number
  price_max?: number
  featured?: boolean
  featured_home?: boolean
}

export interface GuideFilters {
  search?: string
  specialty?: string
}

export async function getDestinations(filters: DestinationFilters = {}): Promise<ApiResponse<Destination[]>> {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.trip_type) params.set('trip_type', filters.trip_type)
  if (filters.category) params.set('category', filters.category)
  if (filters.city) params.set('city', filters.city)
  if (filters.price_min != null) params.set('price_min', String(filters.price_min))
  if (filters.price_max != null) params.set('price_max', String(filters.price_max))
  if (filters.featured) params.set('featured', '1')
  if (filters.featured_home) params.set('featured_home', '1')
  const qs = params.toString()
  return request<ApiResponse<Destination[]>>(`/api/destinations${qs ? `?${qs}` : ''}`)
}

export async function getDestination(slug: string): Promise<{ data: Destination }> {
  return request<{ data: Destination }>(`/api/destinations/${slug}`)
}

export async function getDestinationReviews(slug: string): Promise<{ data: Review[] }> {
  return request<{ data: Review[] }>(`/api/destinations/${slug}/reviews`)
}

export async function getGuides(filters: GuideFilters = {}): Promise<ApiResponse<Guide[]>> {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.specialty) params.set('specialty', filters.specialty)
  const qs = params.toString()
  return request<ApiResponse<Guide[]>>(`/api/guides${qs ? `?${qs}` : ''}`)
}

export async function getGuide(id: number): Promise<{ data: Guide }> {
  return request<{ data: Guide }>(`/api/guides/${id}`)
}

export async function createBooking(payload: BookingPayload, token: string): Promise<BookingResponse> {
  return request<BookingResponse>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
    token,
  })
}

export async function createSnapToken(bookingCode: string, token: string): Promise<SnapTokenResponse> {
  return request<SnapTokenResponse>('/api/payments/snap-token', {
    method: 'POST',
    body: JSON.stringify({ booking_code: bookingCode }),
    token,
  })
}

export async function getUserBookings(token: string): Promise<{ data: UserBooking[] }> {
  return request<{ data: UserBooking[] }>('/api/bookings', { token })
}

export async function confirmPayment(bookingCode: string, token: string): Promise<{ booking_status: string }> {
  return request<{ booking_status: string }>('/api/payments/confirm', {
    method: 'POST',
    body: JSON.stringify({ booking_code: bookingCode }),
    token,
  })
}

export async function getSiteSettings(): Promise<{ data: SiteSettings }> {
  return request<{ data: SiteSettings }>('/api/settings')
}

export async function getTeamMembers(): Promise<{ data: TeamMember[] }> {
  return request<{ data: TeamMember[] }>('/api/team-members')
}

export async function getGalleryPhotos(): Promise<{ data: GalleryPhoto[] }> {
  return request<{ data: GalleryPhoto[] }>('/api/gallery')
}

export async function getTestimonials(): Promise<{ data: Testimonial[] }> {
  return request<{ data: Testimonial[] }>('/api/testimonials')
}
