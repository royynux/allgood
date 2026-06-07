export interface Destination {
  id: number
  name: string
  slug: string
  city: string
  price: number | null
  duration_days: number
  duration_nights: number
  description: string
  tags: string[]
  badge: string | null
  includes: IncludeItem[]
  excludes: ExcludeItem[]
  meeting_points: MeetingPoint[]
  highlights: HighlightItem[]
  itinerary: ItineraryDay[]
  image: string | null
  is_active: boolean
  status: string
  trip_type: TripType | null
  category: Category | null
}

export interface IncludeItem {
  item: string
}

export interface ExcludeItem {
  item: string
}

export interface MeetingPoint {
  name: string
  address?: string
}

export interface HighlightItem {
  icon: string
  text: string
  sub: string
}

export interface ItineraryDay {
  day: number
  title: string
  items: ItineraryItem[]
}

export interface ItineraryItem {
  time: string
  act: string
}

export interface TripType {
  id: number
  name: string
  slug: string
  description?: string
  is_active?: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

export interface Review {
  id: number
  reviewer_name: string
  rating: number
  comment: string | null
  trip_date: string | null
  created_at: string
}

export interface Guide {
  id: number
  name: string
  location: string
  specialty: string
  specialty_label: string
  bio: string
  avatar: string | null
  cover_image: string | null
  rating: number
  review_count: number
  trips_done: number
  years_experience: number
  languages: string[]
  destinations: string[]
  is_active: boolean
  certifications: GuideCertification[]
  availabilities: GuideAvailability[]
}

export interface GuideCertification {
  id: number
  certification_name: string
  issued_date: string
}

export interface GuideAvailability {
  id: number
  day_of_week: string
  available_from: string
  available_to: string
}

export interface BookingPayload {
  trip_type: 'one-day' | 'custom'
  destination_id?: number
  destination_ids?: number[]
  guide_id: number
  start_date: string
  duration_days: number
  participants_count: number
  participant_names: string[]
  meeting_point?: string
  customer_name: string
  customer_phone: string
  customer_email: string
  notes?: string
}

export interface BookingResponse {
  message: string
  data: {
    booking_code: string
    status: string
    customer_name: string
    start_date: string
    estimated_total: number | null
  }
}

export interface ApiResponse<T> {
  data: T
  meta?: {
    current_page: number
    last_page: number
    total: number
    per_page: number
  }
}

export interface SnapTokenResponse {
  snap_token: string
  order_id: string
}

export interface UserBooking {
  id: number
  booking_code: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  trip_type: { id: number; name: string; slug: string } | null
  destination: { name: string } | null
  guide: { name: string } | null
  start_date: string | null
  end_date: string | null
  duration_days: number
  participants_count: number
  customer_name: string
  estimated_total: number | null
  confirmed_total: number | null
  created_at: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string | null
  avatar: string | null
  cover_image: string | null
}

export interface GalleryPhoto {
  id: number
  image: string
  caption: string | null
}

export interface Testimonial {
  id: number
  reviewer_name: string
  reviewer_role: string | null
  reviewer_avatar: string | null
  rating: number
  comment: string
}

export interface HeroSettings {
  background_image?: string | null
  badge_text?: string
  title_line1?: string
  title_line2_colored?: string
  title_line3?: string
  description?: string
}

export interface AboutHeroSettings {
  background_image?: string | null
  badge_text?: string
  headline?: string
  description?: string
}

export interface AboutStorySettings {
  image?: string | null
  title?: string
  description1?: string
  description2?: string
}

export interface WhyusImages {
  image_1?: string | null
  image_2?: string | null
  image_3?: string | null
  image_4?: string | null
}

export interface SiteStats {
  stat1_num?: string
  stat1_label?: string
  stat2_num?: string
  stat2_label?: string
  stat3_num?: string
  stat3_label?: string
  stat4_num?: string
  stat4_label?: string
}

export interface SiteSettings {
  hero?: HeroSettings
  about_hero?: AboutHeroSettings
  about_story?: AboutStorySettings
  whyus_images?: WhyusImages
  hero_stats?: SiteStats
  about_stats?: SiteStats
  [key: string]: unknown
}

export interface BookingState {
  tripType: 'one-day' | 'custom' | null
  destination: Destination | null
  customDestinations: Destination[]
  customDuration: number
  guide: Guide | null
  startDate: string
  participants: number
  participantNames: string[]
  meetingPoint: string
  name: string
  phone: string
  email: string
  notes: string
}
