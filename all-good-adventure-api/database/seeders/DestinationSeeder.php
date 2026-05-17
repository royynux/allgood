<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Destination;
use App\Models\TripType;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = json_decode(<<<'JSON'
[
  {
    "trip_type_slug": "one-day",
    "category_slug": "beach",
    "name": "Mandalika",
    "slug": "mandalika",
    "city": "Lombok",
    "price": 350000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi pesisir selatan Lombok dalam satu hari penuh — dari Kuta Lombok, Bukit Merese, hingga Tanjung Aan. Itinerary sudah disiapkan agar kamu menikmati banyak spot terbaik dalam 1 hari.",
    "tags": ["Pantai", "Surfing"],
    "highlights": [
      {"icon": "🏖️", "text": "Kuta Lombok", "sub": "Pantai eksotis & surfing spot"},
      {"icon": "📸", "text": "Bukit Merese", "sub": "Spot foto viral Lombok"},
      {"icon": "🌊", "text": "Tanjung Aan", "sub": "Pasir bintang yang unik"},
      {"icon": "🍽️", "text": "Makan Siang Lokal", "sub": "Seafood segar pinggir pantai"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Mandalika & Pesisir Selatan",
        "items": [
          {"time": "07.00", "act": "Penjemputan di meeting point (Bandara/Hotel)"},
          {"time": "08.30", "act": "Tiba di Kuta Lombok — eksplorasi pantai & surfing spot"},
          {"time": "10.00", "act": "Naik ke Bukit Merese — foto panorama & view bukit hijau"},
          {"time": "11.30", "act": "Tanjung Aan — bermain di pasir bintang & berenang"},
          {"time": "13.00", "act": "Makan siang di warung seafood lokal"},
          {"time": "14.30", "act": "Pantai Seger & area Mandalika Circuit"},
          {"time": "16.30", "act": "Sunset di Bukit Merese atau Kuta Lombok"},
          {"time": "18.00", "act": "Perjalanan kembali ke meeting point"},
          {"time": "19.30", "act": "Selesai — tiba di titik awal"}
        ]
      }
    ],
    "image": "destinations/lombok-explore-mandalika.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "island",
    "name": "Gili Trawangan",
    "slug": "gili-trawangan",
    "city": "Lombok",
    "price": 420000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Satu hari penuh menjelajahi Gili Trawangan — pulau paling terkenal di kepulauan Gili. Snorkeling dengan penyu, bersepeda keliling pulau, dan sunset ikonik.",
    "tags": ["Pulau", "Snorkeling"],
    "highlights": [
      {"icon": "🐢", "text": "Snorkeling dengan penyu", "sub": "Spot terbaik di sekitar Gili"},
      {"icon": "🚲", "text": "Bersepeda keliling pulau", "sub": "Transportasi khas Gili"},
      {"icon": "🌅", "text": "Sunset ikonik", "sub": "View terbaik di ujung barat"},
      {"icon": "🏖️", "text": "Pantai berpasir putih", "sub": "Air jernih & bersih"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Gili Trawangan Full Day",
        "items": [
          {"time": "07.00", "act": "Penjemputan di hotel/meeting point"},
          {"time": "08.00", "act": "Perjalanan ke pelabuhan Bangsal"},
          {"time": "08.45", "act": "Fast boat ke Gili Trawangan (~30 menit)"},
          {"time": "09.30", "act": "Snorkeling — spot penyu terbaik"},
          {"time": "11.30", "act": "Naik ke darat — sewa sepeda & keliling pulau"},
          {"time": "13.00", "act": "Makan siang di warung tepi pantai"},
          {"time": "14.30", "act": "Free time — pantai & bersantai"},
          {"time": "16.30", "act": "Sunset di sisi barat Gili Trawangan"},
          {"time": "17.30", "act": "Fast boat kembali ke Bangsal"},
          {"time": "19.00", "act": "Tiba kembali di meeting point"}
        ]
      }
    ],
    "image": "destinations/lombok-tour-3-gili.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "beach",
    "name": "Senggigi & Malimbu",
    "slug": "senggigi-and-malimbu",
    "city": "Lombok",
    "price": 280000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi pesisir barat Lombok dalam satu hari — dari Senggigi yang ramai hingga Malimbu dengan sunset terbaik dan view Gunung Agung Bali di kejauhan.",
    "tags": ["Pantai", "Sunset"],
    "highlights": [
      {"icon": "🌇", "text": "Sunset Malimbu", "sub": "View Gunung Agung Bali"},
      {"icon": "🏨", "text": "Senggigi Beach", "sub": "Pantai ikonik Lombok"},
      {"icon": "🛍️", "text": "Pasar Seni Senggigi", "sub": "Souvenir & kerajinan lokal"},
      {"icon": "🍽️", "text": "Kuliner pinggir pantai", "sub": "Seafood & masakan lokal"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Senggigi & Malimbu",
        "items": [
          {"time": "09.00", "act": "Penjemputan di meeting point"},
          {"time": "10.00", "act": "Senggigi Beach — eksplorasi & foto"},
          {"time": "11.00", "act": "Pasar Seni & souvenir shopping"},
          {"time": "12.00", "act": "Makan siang di restoran tepi pantai Senggigi"},
          {"time": "13.30", "act": "Perjalanan ke Malimbu — mampir di Nipah & Kerandangan"},
          {"time": "15.00", "act": "Malimbu Hill — panorama laut & Gunung Agung Bali"},
          {"time": "17.00", "act": "Nikmati sunset spektakuler di Malimbu"},
          {"time": "18.30", "act": "Perjalanan kembali"},
          {"time": "19.30", "act": "Selesai di meeting point"}
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "culture",
    "name": "Tanah Lot & Uluwatu",
    "slug": "tanah-lot-and-uluwatu",
    "city": "Bali",
    "price": 380000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Kunjungi dua pura paling ikonik di Bali — Tanah Lot yang berdiri di atas batu karang, dan Uluwatu dengan pertunjukan Kecak di tepi tebing saat sunset.",
    "tags": ["Budaya", "Sunset"],
    "highlights": [
      {"icon": "🛕", "text": "Tanah Lot", "sub": "Pura di atas batu karang"},
      {"icon": "🌅", "text": "Uluwatu Sunset", "sub": "Tari Kecak di tepi tebing"},
      {"icon": "🌊", "text": "Pantai Padang Padang", "sub": "Pantai tersembunyi di Uluwatu"},
      {"icon": "🍽️", "text": "Seafood Jimbaran", "sub": "Makan malam romantis di pantai"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Tanah Lot & Uluwatu",
        "items": [
          {"time": "08.00", "act": "Penjemputan di hotel"},
          {"time": "09.30", "act": "Tanah Lot — pura ikonik di atas karang"},
          {"time": "11.30", "act": "Perjalanan ke Uluwatu"},
          {"time": "13.00", "act": "Makan siang di Jimbaran area"},
          {"time": "14.30", "act": "Pantai Padang Padang & Bingin"},
          {"time": "17.00", "act": "Uluwatu — Kecak Dance saat sunset"},
          {"time": "19.00", "act": "Makan malam seafood Jimbaran"},
          {"time": "21.00", "act": "Kembali ke hotel"}
        ]
      }
    ],
    "image": "destinations/bali-pura-tanah-lot.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "culture",
    "name": "Ubud & Alam Tegallalang",
    "slug": "ubud-and-alam-tegallalang",
    "city": "Bali",
    "price": 320000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi pusat budaya Bali di Ubud — dari sawah terasering Tegallalang, Monkey Forest, Pasar Ubud, hingga pertunjukan tari Barong yang memukau.",
    "tags": ["Budaya", "Alam"],
    "highlights": [
      {"icon": "🌾", "text": "Sawah Tegallalang", "sub": "Rice terrace ikonik Bali"},
      {"icon": "🐒", "text": "Sacred Monkey Forest", "sub": "Hutan kera suci Ubud"},
      {"icon": "🛕", "text": "Pura Tirta Empul", "sub": "Ritual pemandian suci"},
      {"icon": "🎭", "text": "Tari Barong", "sub": "Pertunjukan seni tradisional"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Ubud & Alam Bali",
        "items": [
          {"time": "08.00", "act": "Penjemputan di hotel"},
          {"time": "09.00", "act": "Sawah Tegallalang — foto & swing"},
          {"time": "11.00", "act": "Pura Tirta Empul"},
          {"time": "12.30", "act": "Makan siang di Ubud"},
          {"time": "14.00", "act": "Pasar Ubud & toko seni"},
          {"time": "15.30", "act": "Sacred Monkey Forest"},
          {"time": "17.00", "act": "Tari Barong atau Kecak"},
          {"time": "19.00", "act": "Kembali ke hotel"}
        ]
      }
    ],
    "image": "destinations/bali-tegalalang-rice-terrace.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "island",
    "name": "Gili Islands (Trawangan, Meno & Air)",
    "slug": "gili-islands-trawangan-meno-and-air",
    "city": "Lombok",
    "price": 950000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi tiga pulau Gili yang ikonik — Trawangan, Meno, dan Air. Snorkeling dengan penyu, bersantai di pantai berpasir putih, dan nikmati sunset terbaik.",
    "tags": ["Pulau", "Snorkeling"],
    "highlights": [
      {"icon": "🐢", "text": "Snorkeling dengan penyu", "sub": "Spot terbaik di Gili Meno"},
      {"icon": "🏖️", "text": "3 Pulau Gili", "sub": "Trawangan, Meno & Air"},
      {"icon": "🌊", "text": "Pantai berpasir putih", "sub": "Air jernih & bersih"},
      {"icon": "🌅", "text": "Sunset terbaik", "sub": "Dari Gili Trawangan"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Gili Trawangan",
        "items": [
          {"time": "08.00", "act": "Penjemputan di meeting point"},
          {"time": "09.00", "act": "Perjalanan ke Pelabuhan Bangsal"},
          {"time": "10.00", "act": "Fast boat ke Gili Trawangan"},
          {"time": "11.00", "act": "Check in & eksplorasi Gili Trawangan"},
          {"time": "13.00", "act": "Makan siang di warung tepi pantai"},
          {"time": "15.00", "act": "Snorkeling di spot terbaik"},
          {"time": "17.30", "act": "Sunset di sisi barat Gili Trawangan"},
          {"time": "19.00", "act": "Makan malam & istirahat"}
        ]
      },
      {
        "day": 2,
        "title": "Gili Meno & Gili Air",
        "items": [
          {"time": "07.00", "act": "Sarapan"},
          {"time": "08.00", "act": "Perahu ke Gili Meno — snorkeling dengan penyu"},
          {"time": "11.00", "act": "Island hopping ke Gili Air"},
          {"time": "13.00", "act": "Makan siang di Gili Air"},
          {"time": "14.00", "act": "Eksplorasi & berenang di Gili Air"},
          {"time": "16.00", "act": "Kembali ke Gili Trawangan atau direct ke darat"},
          {"time": "19.00", "act": "Makan malam"}
        ]
      },
      {
        "day": 3,
        "title": "Kepulangan",
        "items": [
          {"time": "07.00", "act": "Sarapan & check out"},
          {"time": "09.00", "act": "Fast boat kembali ke Bangsal"},
          {"time": "10.00", "act": "Perjalanan kembali ke hotel/Mataram"},
          {"time": "12.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/lombok-tour-3-gili.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "beach",
    "name": "Selong Belanak & Kuta Lombok",
    "slug": "selong-belanak-and-kuta-lombok",
    "city": "Lombok",
    "price": 650000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Eksplorasi pantai-pantai eksotis di pesisir selatan Lombok — dari Selong Belanak yang tenang hingga Kuta Lombok yang spektakuler dengan ombak surfing.",
    "tags": ["Pantai", "Surfing"],
    "highlights": [
      {"icon": "🏄", "text": "Surfing Kuta Lombok", "sub": "Ombak kelas dunia"},
      {"icon": "🏖️", "text": "Selong Belanak", "sub": "Pantai terpanjang di Lombok"},
      {"icon": "📸", "text": "Spot foto viral", "sub": "Bukit Merese & Tanjung Aan"},
      {"icon": "🦀", "text": "Seafood lokal", "sub": "Fresh dari nelayan langsung"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Eksplorasi",
        "items": [
          {"time": "08.00", "act": "Penjemputan di meeting point"},
          {"time": "10.00", "act": "Perjalanan menuju destinasi"},
          {"time": "12.00", "act": "Makan siang di restoran lokal"},
          {"time": "14.00", "act": "Eksplorasi spot utama"},
          {"time": "17.00", "act": "Sunset & foto-foto"},
          {"time": "19.00", "act": "Makan malam & istirahat"}
        ]
      },
      {
        "day": 2,
        "title": "Eksplorasi Lanjutan",
        "items": [
          {"time": "07.00", "act": "Sarapan"},
          {"time": "08.00", "act": "Aktivitas utama (surfing / snorkeling / tour)"},
          {"time": "12.00", "act": "Makan siang"},
          {"time": "14.00", "act": "Free time / aktivitas opsional"},
          {"time": "16.00", "act": "Perjalanan kembali ke meeting point"},
          {"time": "17.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "mountain",
    "name": "Sembalun & Bukit Pergasingan",
    "slug": "sembalun-and-bukit-pergasingan",
    "city": "Lombok",
    "price": 780000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Trekking di lembah Sembalun yang hijau dan mendaki Bukit Pergasingan untuk view Rinjani dari bawah yang tak kalah memukau.",
    "tags": ["Trekking", "View"],
    "highlights": [
      {"icon": "🌿", "text": "Lembah Sembalun", "sub": "Perkebunan & alam hijau"},
      {"icon": "🏔️", "text": "Bukit Pergasingan", "sub": "View Rinjani dari bawah"},
      {"icon": "🌄", "text": "Savana Propok", "sub": "Padang rumput luas"},
      {"icon": "📸", "text": "Foto landscape", "sub": "Terbaik di Lombok Timur"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Trek Bukit Pergasingan",
        "items": [
          {"time": "07.00", "act": "Penjemputan di meeting point"},
          {"time": "09.00", "act": "Tiba di Sembalun — briefing & persiapan"},
          {"time": "10.00", "act": "Mulai trekking ke Bukit Pergasingan"},
          {"time": "12.00", "act": "Tiba di puncak — makan siang & foto panorama Rinjani"},
          {"time": "14.00", "act": "Turun dari bukit"},
          {"time": "16.00", "act": "Eksplorasi Lembah Sembalun & ladang bawang"},
          {"time": "18.00", "act": "Makan malam & istirahat"}
        ]
      },
      {
        "day": 2,
        "title": "Savana & Kepulangan",
        "items": [
          {"time": "06.00", "act": "Sunrise walk di Savana Propok"},
          {"time": "08.00", "act": "Sarapan"},
          {"time": "09.00", "act": "Eksplorasi area Sembalun & beli oleh-oleh"},
          {"time": "11.00", "act": "Perjalanan kembali ke Mataram/hotel"},
          {"time": "13.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/lombok-sembalun-village.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "mountain",
    "name": "Air Terjun & Hidden Gems Lombok",
    "slug": "air-terjun-and-hidden-gems-lombok",
    "city": "Lombok",
    "price": 580000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Temukan keindahan tersembunyi Lombok — air terjun Sendang Gile, Tiu Kelep, dan spot-spot rahasia yang hanya diketahui guide lokal kami.",
    "tags": ["Alam", "Tersembunyi"],
    "highlights": [
      {"icon": "💦", "text": "Air Terjun Sendang Gile", "sub": "Air sejuk & kolam alami"},
      {"icon": "🌊", "text": "Tiu Kelep", "sub": "Dibalik Sendang Gile"},
      {"icon": "🦋", "text": "Hutan tropis lebat", "sub": "Flora & fauna langka"},
      {"icon": "🗺️", "text": "Hidden spots rahasia", "sub": "Hanya guide lokal yang tahu"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Air Terjun",
        "items": [
          {"time": "08.00", "act": "Penjemputan di meeting point"},
          {"time": "10.00", "act": "Tiba di Senaru — Sendang Gile waterfall"},
          {"time": "11.30", "act": "Trek ke Tiu Kelep (30 menit trekking)"},
          {"time": "13.00", "act": "Makan siang & istirahat"},
          {"time": "14.30", "act": "Kunjungi hidden spots rahasia"},
          {"time": "17.00", "act": "Kembali ke penginapan"},
          {"time": "19.00", "act": "Makan malam"}
        ]
      },
      {
        "day": 2,
        "title": "Hidden Gems & Kepulangan",
        "items": [
          {"time": "07.00", "act": "Sarapan"},
          {"time": "08.00", "act": "Eksplorasi hidden gems tambahan"},
          {"time": "11.00", "act": "Perjalanan kembali"},
          {"time": "13.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/lombok-air-terjun-sendang-gile-tiu-kelep.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "beach",
    "name": "Senggigi & Pantai Barat",
    "slug": "senggigi-and-pantai-barat",
    "city": "Lombok",
    "price": 550000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi pesisir barat Lombok yang memesona — dari Senggigi yang ramai hingga Malimbu dengan sunset terbaik dan view Gunung Agung Bali di kejauhan.",
    "tags": ["Pantai", "Sunset"],
    "highlights": [
      {"icon": "🌇", "text": "Sunset Malimbu", "sub": "View Gunung Agung Bali"},
      {"icon": "🏨", "text": "Senggigi Beach", "sub": "Pantai ikonik Lombok"},
      {"icon": "🛥️", "text": "Sunset cruise", "sub": "Perahu tradisional Lombok"},
      {"icon": "🍽️", "text": "Kuliner pinggir pantai", "sub": "Seafood & masakan lokal"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Senggigi & Eksplorasi",
        "items": [
          {"time": "09.00", "act": "Penjemputan di meeting point"},
          {"time": "10.00", "act": "Senggigi Beach — eksplorasi & bersantai"},
          {"time": "12.00", "act": "Makan siang seafood di tepi pantai"},
          {"time": "14.00", "act": "Pantai Barat — Nipah & Kerandangan"},
          {"time": "17.00", "act": "Sunset di Malimbu Hill"},
          {"time": "19.00", "act": "Makan malam & istirahat"}
        ]
      },
      {
        "day": 2,
        "title": "Eksplorasi Lanjutan & Kepulangan",
        "items": [
          {"time": "07.00", "act": "Sarapan"},
          {"time": "08.00", "act": "Snorkeling di pantai barat"},
          {"time": "11.00", "act": "Free time & bersantai"},
          {"time": "13.00", "act": "Makan siang & persiapan pulang"},
          {"time": "15.00", "act": "Perjalanan kembali ke meeting point"},
          {"time": "17.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "island",
    "name": "Nusa Penida",
    "slug": "nusa-penida",
    "city": "Bali",
    "price": 0,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi pulau surga Nusa Penida dengan tebing-tebing dramatis, pantai tersembunyi, dan spot snorkeling terbaik di Bali. Manta Point, Kelingking Beach, dan Angel Billabong menanti.",
    "tags": ["Pulau", "Snorkeling"],
    "highlights": [
      {"icon": "🦈", "text": "Manta Point", "sub": "Berenang dengan pari manta"},
      {"icon": "📸", "text": "Kelingking Beach", "sub": "Tebing ikonik Nusa Penida"},
      {"icon": "💧", "text": "Angel Billabong", "sub": "Kolam alami di tebing"},
      {"icon": "🌊", "text": "Broken Beach", "sub": "Lengkung batu karang natural"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Nusa Penida Barat",
        "items": [
          {"time": "07.00", "act": "Fast boat dari Sanur ke Nusa Penida"},
          {"time": "09.00", "act": "Kelingking Beach & view point"},
          {"time": "11.30", "act": "Angel Billabong & Broken Beach"},
          {"time": "13.00", "act": "Makan siang lokal"},
          {"time": "14.30", "act": "Crystal Bay — snorkeling"},
          {"time": "17.00", "act": "Kembali ke penginapan"}
        ]
      },
      {
        "day": 2,
        "title": "Nusa Penida Timur & Kepulangan",
        "items": [
          {"time": "07.00", "act": "Sarapan"},
          {"time": "08.00", "act": "Manta Point — berenang bersama manta ray"},
          {"time": "11.00", "act": "Atuh Beach & Diamond Beach"},
          {"time": "13.00", "act": "Makan siang"},
          {"time": "15.00", "act": "Fast boat kembali ke Sanur"},
          {"time": "17.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/bali-nusa-penida.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "culture",
    "name": "Ubud & Kintamani",
    "slug": "ubud-and-kintamani",
    "city": "Bali",
    "price": 0,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Eksplorasi mendalam Ubud — pusat seni dan budaya Bali — hingga kawasan vulkanik Kintamani dengan Gunung Batur dan Danau Batur yang memukau.",
    "tags": ["Budaya", "Alam"],
    "highlights": [
      {"icon": "🌾", "text": "Sawah Tegallalang", "sub": "Rice terrace ikonik Bali"},
      {"icon": "🌋", "text": "Gunung Batur", "sub": "Sunrise trekking aktif"},
      {"icon": "💧", "text": "Danau Batur", "sub": "Kaldera vulkanik indah"},
      {"icon": "🎭", "text": "Seni & Budaya Ubud", "sub": "Tari, lukisan, kerajinan"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Ubud Art & Culture",
        "items": [
          {"time": "08.00", "act": "Penjemputan di hotel"},
          {"time": "09.00", "act": "Sawah Tegallalang & Ceking rice terrace"},
          {"time": "11.00", "act": "Pasar Ubud & Puri Agung Ubud"},
          {"time": "13.00", "act": "Makan siang di Ubud"},
          {"time": "14.30", "act": "Sacred Monkey Forest"},
          {"time": "16.00", "act": "Pura Tirta Empul"},
          {"time": "19.00", "act": "Tari Legong / Kecak malam"}
        ]
      },
      {
        "day": 2,
        "title": "Kintamani & Gunung Batur",
        "items": [
          {"time": "06.00", "act": "Trekking Gunung Batur — sunrise"},
          {"time": "09.00", "act": "Sarapan sambil menikmati view kaldera"},
          {"time": "11.00", "act": "Danau Batur — perahu tradisional"},
          {"time": "13.00", "act": "Makan siang di Kintamani"},
          {"time": "15.00", "act": "Perjalanan kembali ke hotel"},
          {"time": "17.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/bali-explore-kintamani.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "beach",
    "name": "Seminyak & Canggu",
    "slug": "seminyak-and-canggu",
    "city": "Bali",
    "price": 0,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Nikmati sisi Bali yang trendi dan kosmopolitan — dari pantai Seminyak yang stylish hingga Canggu dengan vibes surf dan kafe-kafe instagramable.",
    "tags": ["Pantai", "Lifestyle"],
    "highlights": [
      {"icon": "🏄", "text": "Surfing Canggu", "sub": "Ombak terbaik untuk pemula"},
      {"icon": "🌅", "text": "Sunset Seminyak", "sub": "Ku De Ta & Potato Head"},
      {"icon": "☕", "text": "Café Culture Canggu", "sub": "Kafe-kafe terbaik Bali"},
      {"icon": "🛍️", "text": "Shopping & Spa", "sub": "Seminyak Square & spa lokal"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Seminyak Beach & Lifestyle",
        "items": [
          {"time": "09.00", "act": "Penjemputan di hotel"},
          {"time": "10.00", "act": "Seminyak Beach — bersantai & foto"},
          {"time": "12.00", "act": "Makan siang di Seminyak"},
          {"time": "14.00", "act": "Petitenget & Batu Belig Beach"},
          {"time": "17.00", "act": "Sunset di Ku De Ta / Potato Head"},
          {"time": "19.30", "act": "Makan malam di Seminyak"}
        ]
      },
      {
        "day": 2,
        "title": "Canggu Surf & Vibes",
        "items": [
          {"time": "07.00", "act": "Surf lesson di Canggu"},
          {"time": "09.30", "act": "Sarapan di beach café"},
          {"time": "11.00", "act": "Explore Old Man's & Pererenan"},
          {"time": "13.00", "act": "Makan siang & kafe hopping Canggu"},
          {"time": "15.00", "act": "Free time & belanja"},
          {"time": "17.00", "act": "Sunset di Echo Beach"},
          {"time": "19.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/bali-pantai-canggu.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "mountain",
    "name": "Air Terjun Sekumpul",
    "slug": "air-terjun-sekumpul",
    "city": "Bali",
    "price": 420000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Air terjun paling indah di Bali, tersembunyi di hutan lebat Singaraja utara. Trekking melewati sawah, sungai, dan hutan tropis untuk menyaksikan tujuh air terjun yang megah sekaligus.",
    "tags": ["Alam", "Trekking"],
    "highlights": [
      {"icon": "💦", "text": "7 Air Terjun Sekaligus", "sub": "Panorama air terjun terlengkap di Bali"},
      {"icon": "🌿", "text": "Hutan Tropis Lebat", "sub": "Trek melewati sawah & sungai"},
      {"icon": "🏞️", "text": "Kolam Alami", "sub": "Berenang di air sejuk pegunungan"},
      {"icon": "📸", "text": "Spot Foto Premium", "sub": "Pemandangan terbaik Bali Utara"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Air Terjun Sekumpul",
        "items": [
          {"time": "07.00", "act": "Penjemputan di hotel / meeting point"},
          {"time": "09.30", "act": "Tiba di pintu masuk Sekumpul — briefing & persiapan"},
          {"time": "10.00", "act": "Mulai trekking melewati sawah & hutan tropis"},
          {"time": "11.00", "act": "Tiba di Air Terjun Sekumpul — foto & berenang"},
          {"time": "13.00", "act": "Makan siang di warung lokal"},
          {"time": "14.30", "act": "Trekking kembali ke pintu masuk"},
          {"time": "15.30", "act": "Perjalanan kembali"},
          {"time": "17.30", "act": "Selesai di meeting point"}
        ]
      }
    ],
    "image": "destinations/bali-air-terjun-sekumpul.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "culture",
    "name": "Monkey Forest Ubud",
    "slug": "monkey-forest-ubud",
    "city": "Bali",
    "price": 250000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi Hutan Kera Suci Ubud yang sakral — kawasan hutan lindung dengan lebih dari 700 monyet Bali yang hidup bebas di antara pura-pura kuno berusia ratusan tahun.",
    "tags": ["Budaya", "Alam"],
    "highlights": [
      {"icon": "🐒", "text": "700+ Monyet Bali", "sub": "Berinteraksi di habitat aslinya"},
      {"icon": "🛕", "text": "Pura Dalem Agung", "sub": "Pura kuno abad ke-14"},
      {"icon": "🌳", "text": "Hutan Lindung 12 Ha", "sub": "Ekosistem tropis yang terjaga"},
      {"icon": "📸", "text": "Spot Foto Ikonik", "sub": "Momen unik bersama monyet"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Monkey Forest & Ubud",
        "items": [
          {"time": "08.00", "act": "Penjemputan di hotel"},
          {"time": "09.00", "act": "Tiba di Monkey Forest — eksplorasi & foto"},
          {"time": "11.00", "act": "Pasar Ubud & toko seni"},
          {"time": "12.30", "act": "Makan siang di Ubud"},
          {"time": "14.00", "act": "Pura Tirta Empul"},
          {"time": "16.00", "act": "Sawah Tegallalang"},
          {"time": "17.30", "act": "Perjalanan kembali"},
          {"time": "19.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/bali-monkey-forest-ubud.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "beach",
    "name": "Pantai Lovina & Dolphin Spot",
    "slug": "pantai-lovina-dolphin-spot",
    "city": "Bali",
    "price": 280000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Saksikan lumba-lumba liar di habitat aslinya saat fajar di Pantai Lovina, Bali Utara. Pengalaman tak terlupakan bersama lumba-lumba spinner dan bottlenose yang berlompatan bebas di lautan.",
    "tags": ["Pantai", "Dolphin"],
    "highlights": [
      {"icon": "🐬", "text": "Dolphin Watching", "sub": "Lumba-lumba liar di alam bebas"},
      {"icon": "🌅", "text": "Sunrise di Laut", "sub": "Fajar spektakuler dari perahu"},
      {"icon": "🏖️", "text": "Pantai Lovina", "sub": "Pasir hitam eksotis Bali Utara"},
      {"icon": "🤿", "text": "Snorkeling", "sub": "Terumbu karang & ikan tropis"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Pantai Lovina & Dolphin Tour",
        "items": [
          {"time": "05.30", "act": "Penjemputan di hotel — perjalanan ke Lovina"},
          {"time": "06.30", "act": "Naik perahu — dolphin watching saat sunrise"},
          {"time": "08.30", "act": "Kembali ke pantai — sarapan"},
          {"time": "10.00", "act": "Snorkeling di perairan Lovina"},
          {"time": "12.00", "act": "Makan siang di restoran lokal"},
          {"time": "14.00", "act": "Eksplorasi Lovina & pantai sekitarnya"},
          {"time": "16.00", "act": "Perjalanan kembali ke hotel"},
          {"time": "18.30", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/bali-pantai-lovina-dolphin-spot.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "culture",
    "name": "Pura Uluwatu & Tari Kecak",
    "slug": "pura-uluwatu-tari-kecak",
    "city": "Bali",
    "price": 300000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Kunjungi Pura Uluwatu yang megah di tepi tebing 70 meter di atas Samudra Hindia, lalu saksikan pertunjukan Tari Kecak yang memukau saat matahari terbenam — pengalaman budaya Bali yang sesungguhnya.",
    "tags": ["Budaya", "Sunset"],
    "highlights": [
      {"icon": "🛕", "text": "Pura Uluwatu", "sub": "Pura di tebing 70 meter"},
      {"icon": "🎭", "text": "Tari Kecak", "sub": "Pertunjukan sunset ikonik Bali"},
      {"icon": "🌅", "text": "Sunset Spektakuler", "sub": "View Samudra Hindia"},
      {"icon": "🐒", "text": "Monyet Uluwatu", "sub": "Penjaga pura yang unik"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Pura Uluwatu & Kecak",
        "items": [
          {"time": "13.00", "act": "Penjemputan di hotel"},
          {"time": "14.30", "act": "Tiba di Pura Uluwatu — eksplorasi & foto"},
          {"time": "15.30", "act": "Pantai Padang Padang & Bingin"},
          {"time": "17.00", "act": "Kecak Dance performance saat sunset"},
          {"time": "19.00", "act": "Makan malam seafood Jimbaran"},
          {"time": "21.00", "act": "Kembali ke hotel"}
        ]
      }
    ],
    "image": "destinations/bali-pura-uluwatu-tari-kecak.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "culture",
    "name": "Tour Nuanu Creative City",
    "slug": "tour-nuanu-creative-city",
    "city": "Bali",
    "price": 200000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Eksplorasi Nuanu Creative City — kawasan kreatif terbaru Bali yang memadukan seni, teknologi, dan keberlanjutan dalam satu ekosistem inovatif di Tabanan. Galeri seni, ruang kolaborasi, dan kuliner unik menanti.",
    "tags": ["Budaya", "Modern"],
    "highlights": [
      {"icon": "🎨", "text": "Galeri Seni Modern", "sub": "Instalasi seni kontemporer"},
      {"icon": "🌱", "text": "Eco Living", "sub": "Konsep hidup berkelanjutan"},
      {"icon": "☕", "text": "Kuliner Unik", "sub": "Restoran & kafe kreatif"},
      {"icon": "🏛️", "text": "Arsitektur Inovatif", "sub": "Desain futuristik di tengah alam"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Nuanu Creative City Tour",
        "items": [
          {"time": "09.00", "act": "Penjemputan di hotel"},
          {"time": "10.30", "act": "Tiba di Nuanu — welcome tour & orientation"},
          {"time": "11.00", "act": "Eksplorasi galeri seni & instalasi"},
          {"time": "12.30", "act": "Makan siang di restoran Nuanu"},
          {"time": "14.00", "act": "Workshop kreatif atau free exploration"},
          {"time": "16.00", "act": "Kunjungi taman & area eco living"},
          {"time": "17.00", "act": "Perjalanan kembali"},
          {"time": "18.30", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/bali-tour-nuanu-creative-city.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "mountain",
    "name": "Anak Dara Hill (Day Hiking)",
    "slug": "anak-dara-hill-day-hiking",
    "city": "Lombok",
    "price": 320000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Day hiking ke Bukit Anak Dara di Lombok Timur dengan panorama 360° yang menakjubkan — Gunung Rinjani di utara, Selat Alas di timur, dan hamparan alam Lombok yang hijau membentang.",
    "tags": ["Hiking", "View"],
    "highlights": [
      {"icon": "🏔️", "text": "View 360° Spektakuler", "sub": "Rinjani, laut & hamparan hijau"},
      {"icon": "🌄", "text": "Sunrise Trekking", "sub": "Pendakian pagi yang menakjubkan"},
      {"icon": "🌿", "text": "Jalur Alam", "sub": "Melewati hutan & savana"},
      {"icon": "📸", "text": "Foto Landscape", "sub": "Terbaik di Lombok Timur"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Anak Dara Hill Hiking",
        "items": [
          {"time": "05.00", "act": "Penjemputan di meeting point"},
          {"time": "07.00", "act": "Tiba di basecamp — briefing & persiapan"},
          {"time": "07.30", "act": "Mulai trekking menuju puncak Anak Dara"},
          {"time": "09.30", "act": "Tiba di puncak — foto & nikmati panorama 360°"},
          {"time": "11.00", "act": "Turun dari puncak"},
          {"time": "12.30", "act": "Makan siang di basecamp"},
          {"time": "14.00", "act": "Perjalanan kembali ke meeting point"},
          {"time": "16.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/lombok-anak-dara-hill-day-hiking.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "mountain",
    "name": "Benang Kelambu & Benang Stokel",
    "slug": "benang-kelambu-and-benang-stokel",
    "city": "Lombok",
    "price": 290000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Jelajahi dua air terjun cantik di kaki Gunung Rinjani — Benang Kelambu dengan airnya yang mengalir seperti tirai kelambu dari bebatuan berlumut, dan Benang Stokel dengan kolam alaminya yang menyegarkan.",
    "tags": ["Alam", "Air Terjun"],
    "highlights": [
      {"icon": "💦", "text": "Benang Kelambu", "sub": "Air terjun tirai berlumut hijau"},
      {"icon": "🏊", "text": "Benang Stokel", "sub": "Kolam alami untuk berenang"},
      {"icon": "🌿", "text": "Hutan Rinjani", "sub": "Trek di kaki gunung tertinggi"},
      {"icon": "🦋", "text": "Flora & Fauna", "sub": "Keanekaragaman hayati Rinjani"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Benang Kelambu & Stokel",
        "items": [
          {"time": "07.00", "act": "Penjemputan di meeting point"},
          {"time": "09.00", "act": "Tiba di Aik Berik — start trekking"},
          {"time": "10.00", "act": "Air Terjun Benang Stokel — berenang & foto"},
          {"time": "11.30", "act": "Lanjut ke Benang Kelambu — trekking 30 menit"},
          {"time": "12.30", "act": "Benang Kelambu — foto & bersantai"},
          {"time": "13.30", "act": "Makan siang di warung lokal"},
          {"time": "15.00", "act": "Perjalanan kembali ke meeting point"},
          {"time": "17.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/lombok-benang-kelambu-stokel.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "island",
    "name": "Pesona Pulau Kenawa",
    "slug": "pesona-pulau-kenawa",
    "city": "Lombok",
    "price": 0,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Pulau tak berpenghuni yang menakjubkan di perairan antara Lombok dan Sumbawa — pasir putih halus, bukit savana hijau, dan snorkeling di perairan kristal jernih. Pengalaman pulau privat yang tak terlupakan.",
    "tags": ["Pulau", "Snorkeling"],
    "highlights": [
      {"icon": "🏝️", "text": "Pulau Tak Berpenghuni", "sub": "Privat & alami tanpa keramaian"},
      {"icon": "🤿", "text": "Snorkeling Premium", "sub": "Terumbu karang sehat & ikan warna-warni"},
      {"icon": "🌿", "text": "Bukit Savana", "sub": "Trekking singkat & view laut indah"},
      {"icon": "🌊", "text": "Perairan Kristal", "sub": "Kejernihan air terbaik Nusa Tenggara"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Perjalanan ke Pulau Kenawa",
        "items": [
          {"time": "07.00", "act": "Penjemputan di meeting point Mataram"},
          {"time": "09.00", "act": "Tiba di Pelabuhan Poto Tano"},
          {"time": "09.30", "act": "Naik perahu menuju Pulau Kenawa (~15 menit)"},
          {"time": "10.00", "act": "Tiba di Kenawa — eksplorasi pantai"},
          {"time": "11.00", "act": "Snorkeling di spot terbaik"},
          {"time": "13.00", "act": "Makan siang di tepi pantai"},
          {"time": "14.00", "act": "Trekking bukit savana — foto panorama"},
          {"time": "16.00", "act": "Free time & berenang"},
          {"time": "17.00", "act": "Kembali ke Poto Tano"}
        ]
      },
      {
        "day": 2,
        "title": "Eksplorasi & Kepulangan",
        "items": [
          {"time": "06.00", "act": "Sunrise di tepi pantai Kenawa"},
          {"time": "08.00", "act": "Sarapan & free time"},
          {"time": "10.00", "act": "Snorkeling terakhir"},
          {"time": "12.00", "act": "Kembali ke Poto Tano"},
          {"time": "14.00", "act": "Perjalanan ke Mataram"},
          {"time": "16.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/lombok-pesona-pulau-kenawa.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "beach",
    "name": "Pink Beach Lombok",
    "slug": "pink-beach-lombok",
    "city": "Lombok",
    "price": 380000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Saksikan keajaiban alam Pink Beach di Lombok Timur — satu dari hanya 7 pantai berpasir merah muda di seluruh dunia. Snorkeling di perairan jernih dengan terumbu karang yang kaya warna.",
    "tags": ["Pantai", "Snorkeling"],
    "highlights": [
      {"icon": "🌸", "text": "Pasir Merah Muda", "sub": "Satu dari 7 di dunia"},
      {"icon": "🤿", "text": "Snorkeling Eksotis", "sub": "Terumbu karang & ikan tropis"},
      {"icon": "🏖️", "text": "Pantai Terpencil", "sub": "Alami & belum banyak wisatawan"},
      {"icon": "📸", "text": "Spot Foto Langka", "sub": "Keunikan warna pasir merah muda"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Pink Beach Lombok",
        "items": [
          {"time": "07.00", "act": "Penjemputan di meeting point"},
          {"time": "09.30", "act": "Perjalanan menuju Pink Beach (via Jerowaru)"},
          {"time": "11.00", "act": "Tiba di Pink Beach — foto & eksplorasi"},
          {"time": "12.00", "act": "Snorkeling di sekitar Pink Beach"},
          {"time": "13.30", "act": "Makan siang di warung lokal"},
          {"time": "15.00", "act": "Free time — berenang & bersantai"},
          {"time": "16.30", "act": "Perjalanan kembali"},
          {"time": "18.30", "act": "Selesai di meeting point"}
        ]
      }
    ],
    "image": "destinations/lombok-pink-beach-lombok.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "one-day",
    "category_slug": "island",
    "name": "Snorkeling Tour Gili Kondo",
    "slug": "snorkeling-tour-gili-kondo",
    "city": "Lombok",
    "price": 350000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Paket snorkeling eksklusif di Gili Kondo — pulau kecil tak berpenghuni di Lombok Timur dengan perairan supersjernih, terumbu karang sehat, dan beragam biota laut yang menakjubkan.",
    "tags": ["Snorkeling", "Pulau"],
    "highlights": [
      {"icon": "🤿", "text": "Snorkeling Kelas Dunia", "sub": "Visibilitas hingga 20 meter"},
      {"icon": "🐠", "text": "Biota Laut Kaya", "sub": "Penyu, nemo & karang sehat"},
      {"icon": "🏝️", "text": "Pulau Terpencil", "sub": "Tanpa keramaian, sangat privat"},
      {"icon": "🌊", "text": "Perairan Jernih", "sub": "Air terbersih di Lombok Timur"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Gili Kondo Snorkeling",
        "items": [
          {"time": "07.00", "act": "Penjemputan di meeting point"},
          {"time": "08.30", "act": "Tiba di Pelabuhan Kayangan / Labuhan Lombok"},
          {"time": "09.00", "act": "Naik perahu menuju Gili Kondo (~30 menit)"},
          {"time": "09.30", "act": "Tiba di Gili Kondo — briefing snorkeling"},
          {"time": "10.00", "act": "Snorkeling sesi 1 — spot terumbu karang"},
          {"time": "12.00", "act": "Makan siang di perahu / tepi pantai"},
          {"time": "13.00", "act": "Snorkeling sesi 2 — spot penyu & ikan"},
          {"time": "15.00", "act": "Free time — bersantai di pulau"},
          {"time": "16.00", "act": "Kembali ke pelabuhan"},
          {"time": "18.00", "act": "Selesai di meeting point"}
        ]
      }
    ],
    "image": "destinations/lombok-snorkeling-tour-gili-kondo.jpg",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "culture",
    "name": "Tetebatu Village",
    "slug": "tetebatu-village",
    "city": "Lombok",
    "price": 0,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Rasakan ketenangan desa Tetebatu di kaki selatan Gunung Rinjani — sawah hijau membentang luas, air terjun tersembunyi, hutan kera, dan kehidupan desa tradisional Lombok yang autentik dan menyejukkan.",
    "tags": ["Desa", "Alam"],
    "highlights": [
      {"icon": "🌾", "text": "Sawah Hijau Tetebatu", "sub": "Hamparan padi di kaki Rinjani"},
      {"icon": "🐒", "text": "Hutan Kera", "sub": "Monyet hitam liar di hutan"},
      {"icon": "💦", "text": "Air Terjun Jeruk Manis", "sub": "Air terjun tersembunyi nan segar"},
      {"icon": "🏡", "text": "Kehidupan Desa", "sub": "Tradisi Sasak yang autentik"}
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Desa Tetebatu",
        "items": [
          {"time": "08.00", "act": "Penjemputan di meeting point"},
          {"time": "10.00", "act": "Tiba di Tetebatu — welcome & orientasi"},
          {"time": "11.00", "act": "Trekking sawah & hutan kera"},
          {"time": "13.00", "act": "Makan siang masakan lokal Sasak"},
          {"time": "14.30", "act": "Air Terjun Jeruk Manis — trekking & berenang"},
          {"time": "17.00", "act": "Kembali ke penginapan & istirahat"},
          {"time": "19.00", "act": "Makan malam — menikmati suasana desa"}
        ]
      },
      {
        "day": 2,
        "title": "Sunrise & Kepulangan",
        "items": [
          {"time": "05.30", "act": "Sunrise walk di hamparan sawah Tetebatu"},
          {"time": "07.30", "act": "Sarapan"},
          {"time": "09.00", "act": "Kunjungi pengrajin lokal & pasar desa"},
          {"time": "11.00", "act": "Perjalanan kembali ke Mataram"},
          {"time": "13.00", "act": "Selesai"}
        ]
      }
    ],
    "image": "destinations/lombok-tetebatu-village.jpg",
    "status": "available",
    "is_active": true
  }
]
JSON, true);

        foreach ($destinations as $destination) {
            $tripType = TripType::where('slug', $destination['trip_type_slug'])->firstOrFail();
            $category = Category::where('slug', $destination['category_slug'])->first();

            Destination::updateOrCreate(
                ['slug' => $destination['slug']],
                [
                    'trip_type_id' => $tripType->id,
                    'category_id' => $category?->id,
                    'name' => $destination['name'],
                    'city' => $destination['city'],
                    'price' => $destination['price'],
                    'duration_days' => $destination['duration_days'],
                    'duration_nights' => $destination['duration_nights'],
                    'description' => $destination['description'],
                    'tags' => $destination['tags'],
                    'highlights' => $destination['highlights'],
                    'itinerary' => $destination['itinerary'],
                    'image' => $destination['image'],
                    'status' => $destination['status'],
                    'is_active' => $destination['is_active'],
                ],
            );
        }
    }
}
