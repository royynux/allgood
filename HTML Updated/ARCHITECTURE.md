# All Good Adventure Architecture

## Goal

Convert the current static HTML prototype into a production-ready booking platform with:

- A customer-facing frontend
- A Laravel backend API
- Filament as the admin panel
- PostgreSQL as the database

The current HTML design should become the visual reference for the frontend pages and booking flow.

## Recommended Stack

### Frontend

Use one of these:

- React + Vite
- Next.js
- Vue / Nuxt
- Laravel Inertia + React

Recommended option for fastest full-stack development:

```text
Laravel + Inertia + React + Filament + PostgreSQL
```

Recommended option for cleaner frontend/backend separation:

```text
React or Next.js frontend
Laravel API backend
Filament admin panel
PostgreSQL database
```

## High-Level Architecture

```text
Customer Frontend
        |
        | HTTP / API requests
        v
Laravel Backend
        |
        | Eloquent ORM
        v
PostgreSQL Database
        ^
        |
Filament Admin Panel
```

## Main Applications

### Customer Frontend

The frontend contains the public website and customer booking experience.

Pages:

- Home / Beranda
- Catalog / Katalog
- Destination detail
- Booking flow
- Tour guide list
- Tour guide detail
- About / Tentang
- Login
- Register
- OTP verification
- Profile
- Booking history

### Laravel Backend

The backend owns the business logic and database access.

Responsibilities:

- Authentication
- Destination data
- Tour guide data
- Booking submission
- Booking status management
- User profile data
- Price calculation
- Notifications later, such as WhatsApp or email

### Filament Admin Panel

Filament is used by internal staff/admin.

Admin can manage:

- Destinations
- Trip types
- Tour guides
- Bookings
- Customers/users
- Testimonials
- Gallery images
- Categories
- Admin roles and permissions

## Main Business Rules

### Trip Types

```text
One Day Trip
- Customer chooses one destination
- Customer chooses one guide
- Customer selects one departure date
- Duration is fixed to 1 day
- Price is calculated directly

Rinjani Trip
- Destination is fixed to Pendakian Rinjani
- Customer chooses one guide
- Customer selects one departure date
- Return date is automatically departure date + 2 days
- Duration is fixed to 3 days 2 nights
- Price is calculated directly

Custom Trip
- Customer can choose multiple destinations
- Customer chooses one guide
- Customer enters estimated duration
- Customer selects estimated departure date
- Price is confirmed manually by admin
```

### Guide Pricing

Tour guide cost is included in the destination/trip price.

Do not calculate guide as a separate cost.

```text
Guide price = included
Additional guide fee = 0
```

### Price Calculation

```text
One Day Trip:
total = destination.price * participants_count

Rinjani Trip:
total = rinjani.price * participants_count

Custom Trip:
total = null
admin confirms final price later
```

## Booking Flow

```text
Step 1: Choose trip type
Step 2: Choose destination
Step 3: Choose tour guide
Step 4: Enter trip details
Step 5: Enter customer data and participant names
Step 6: Review summary and submit
```

Detailed flow:

```text
1. Customer selects trip type
   - One Day
   - Rinjani
   - Custom

2. Customer selects destination
   - One Day: one destination
   - Rinjani: fixed Rinjani destination
   - Custom: multiple destinations

3. Customer selects guide
   - Guide is required
   - Guide does not add extra cost

4. Customer enters trip details
   - One Day: departure date + participant count
   - Rinjani: departure date + participant count
   - Custom: estimated duration + departure date + participant count

5. Customer enters contact data
   - Name
   - Phone
   - Email
   - Notes
   - Participant names based on participant count

6. Customer reviews summary
   - Destination
   - Guide
   - Dates
   - Duration
   - Participants
   - Total price or admin-confirmation message
```

## Database Design

### users

Stores customers and admins.

```text
id
name
email
phone
password
role
email_verified_at
created_at
updated_at
```

### trip_types

Stores available trip types.

```text
id
name
slug
description
is_active
created_at
updated_at
```

Example data:

```text
one-day
rinjani
custom
```

### categories

Stores destination categories.

```text
id
name
slug
created_at
updated_at
```

Example data:

```text
Mountain
Beach
Island
Culture
```

### destinations

Stores trip destinations and packages.

```text
id
trip_type_id
category_id
name
slug
city
price
duration_days
duration_nights
description
status
image
is_active
created_at
updated_at
```

Notes:

- `price` is used for One Day and Rinjani trips.
- For Custom Trip destinations, `price` can be nullable or 0 if admin confirms later.

### destination_highlights

Stores highlight cards for each destination.

```text
id
destination_id
icon
title
subtitle
sort_order
created_at
updated_at
```

### destination_itineraries

Stores itinerary days.

```text
id
destination_id
day_number
title
sort_order
created_at
updated_at
```

### destination_itinerary_items

Stores activities inside each itinerary day.

```text
id
destination_itinerary_id
time
activity
sort_order
created_at
updated_at
```

### guides

Stores tour guide profiles.

```text
id
name
location
specialty
specialty_label
bio
avatar
cover_image
rating
review_count
trips_done
years_experience
languages
is_active
created_at
updated_at
```

Important:

- No guide price column is needed.
- Guide is included in the trip price.

### guide_certifications

Stores guide certifications.

```text
id
guide_id
name
created_at
updated_at
```

### guide_destinations

Pivot table connecting guides and destinations.

```text
guide_id
destination_id
```

### guide_availabilities

Stores guide availability schedule.

```text
id
guide_id
day
start_time
end_time
is_available
created_at
updated_at
```

### bookings

Stores booking requests.

```text
id
user_id nullable
booking_code
trip_type_id
destination_id nullable
guide_id
start_date
end_date nullable
duration_days
participants_count
meeting_point
customer_name
customer_phone
customer_email
notes
status
estimated_total nullable
confirmed_total nullable
created_at
updated_at
```

Booking status examples:

```text
pending
confirmed
cancelled
completed
```

### booking_participants

Stores participant names.

```text
id
booking_id
name
created_at
updated_at
```

### booking_destinations

Used mainly for Custom Trip because one booking can have multiple destinations.

```text
id
booking_id
destination_id
created_at
updated_at
```

For One Day and Rinjani, the main `destination_id` on `bookings` is enough.

For Custom Trip, use `booking_destinations`.

### testimonials

Stores public testimonials.

```text
id
customer_name
customer_role
rating
message
avatar
is_active
created_at
updated_at
```

### gallery_images

Stores gallery images shown on the frontend.

```text
id
title
image
alt_text
sort_order
is_active
created_at
updated_at
```

## API Design

### Public APIs

```text
GET /api/destinations
GET /api/destinations/{slug}
GET /api/guides
GET /api/guides/{id}
GET /api/testimonials
GET /api/gallery
POST /api/bookings
```

### Auth APIs

```text
POST /api/register
POST /api/login
POST /api/logout
POST /api/otp/verify
GET  /api/me
```

### Customer APIs

```text
GET /api/profile
PUT /api/profile
GET /api/profile/bookings
GET /api/profile/bookings/{booking_code}
```

## Booking API Payload

### One Day Trip

```json
{
  "trip_type": "one-day",
  "destination_id": 1,
  "guide_id": 2,
  "start_date": "2026-05-10",
  "participants_count": 2,
  "participant_names": ["Andi", "Budi"],
  "meeting_point": "Bandara Lombok International",
  "customer_name": "Andi",
  "customer_phone": "+62 812 3456 7890",
  "customer_email": "andi@email.com",
  "notes": "Tidak ada"
}
```

### Rinjani Trip

```json
{
  "trip_type": "rinjani",
  "destination_id": 4,
  "guide_id": 1,
  "start_date": "2026-05-10",
  "participants_count": 3,
  "participant_names": ["Andi", "Budi", "Citra"],
  "meeting_point": "Sembalun Lawang",
  "customer_name": "Andi",
  "customer_phone": "+62 812 3456 7890",
  "customer_email": "andi@email.com",
  "notes": "Butuh porter tambahan"
}
```

Backend should automatically set:

```text
end_date = start_date + 2 days
duration_days = 3
```

### Custom Trip

```json
{
  "trip_type": "custom",
  "destination_ids": [5, 6, 9],
  "guide_id": 3,
  "start_date": "2026-05-10",
  "duration_days": 4,
  "participants_count": 2,
  "participant_names": ["Andi", "Budi"],
  "meeting_point": "Hotel di Mataram",
  "customer_name": "Andi",
  "customer_phone": "+62 812 3456 7890",
  "customer_email": "andi@email.com",
  "notes": "Ingin itinerary santai"
}
```

## Filament Admin Resources

Create these Filament resources:

```text
DestinationResource
GuideResource
BookingResource
UserResource
TripTypeResource
CategoryResource
TestimonialResource
GalleryImageResource
```

### BookingResource

Admin should be able to:

- View booking details
- See customer contact
- See participant names
- See selected destination(s)
- See selected guide
- Change booking status
- Add confirmed total for Custom Trip
- Add internal notes

### DestinationResource

Admin should be able to:

- Create/edit destinations
- Upload image
- Set city
- Set category
- Set trip type
- Set price
- Set duration
- Add highlights
- Add itinerary days and activities
- Activate/deactivate destination

### GuideResource

Admin should be able to:

- Create/edit guide profile
- Upload avatar and cover image
- Set specialty
- Set languages
- Add certifications
- Connect guide to destinations
- Manage availability
- Activate/deactivate guide

## Frontend Component Plan

Convert the current HTML into components.

Suggested components:

```text
Layout
Navbar
MobileDrawer
BottomNav
Footer
Toast

HomeHero
DestinationCard
DestinationModal
CatalogFilters
TripTypeTabs

BookingTripTypeSelector
BookingStepBar
BookingDestinationStep
BookingGuideStep
BookingDetailStep
BookingCustomerStep
BookingSummaryStep
ParticipantNameFields

GuideCard
GuideModal
ProfileTabs
AuthLayout
```

## Suggested Folder Structure

For Laravel + Inertia + React:

```text
app/
  Models/
  Http/
    Controllers/
      Api/
      Web/
  Filament/
    Resources/

database/
  migrations/
  seeders/

resources/
  js/
    Components/
    Layouts/
    Pages/
      Home.jsx
      Catalog.jsx
      Booking.jsx
      TourGuides.jsx
      About.jsx
      Profile.jsx

routes/
  web.php
  api.php

storage/
  app/public/
```

For separate React frontend + Laravel API:

```text
frontend/
  src/
    components/
    pages/
    services/
    hooks/
    styles/

backend/
  app/
  database/
  routes/
  config/
```

## Implementation Roadmap

### Phase 1: Backend Foundation

1. Create Laravel project.
2. Configure PostgreSQL.
3. Create migrations.
4. Create models and relationships.
5. Seed sample destinations and guides from the current HTML data.

### Phase 2: Filament Admin

1. Install Filament.
2. Create admin user.
3. Create resources for destinations, guides, bookings, categories, trip types.
4. Add file upload for images.
5. Add booking status management.

### Phase 3: Frontend Conversion

1. Break the HTML into reusable components.
2. Rebuild the pages using frontend framework.
3. Replace hardcoded arrays with API calls.
4. Keep the current visual design as close as possible.

### Phase 4: Booking Integration

1. Submit booking form to backend.
2. Store booking in PostgreSQL.
3. Store participant names.
4. Store custom trip destinations.
5. Return booking code after successful submit.

### Phase 5: Customer Account

1. Add register/login.
2. Add profile page.
3. Add booking history.
4. Add OTP later if needed.

### Phase 6: Notifications

1. Email admin after new booking.
2. Email customer booking confirmation.
3. Add WhatsApp notification integration later.

## Important Notes

- Do not store guide pricing.
- Guide is included in the trip price.
- Rinjani is fixed to 3 days 2 nights unless the business later supports more packages.
- Custom Trip pricing should be confirmed manually by admin.
- Participant names should be stored separately in `booking_participants`.
- Custom Trip destinations should be stored in `booking_destinations`.

