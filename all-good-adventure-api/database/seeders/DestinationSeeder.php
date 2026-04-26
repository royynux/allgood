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
    "tags": [
      "Pantai",
      "Surfing"
    ],
    "highlights": [
      {
        "icon": "🏖️",
        "text": "Kuta Lombok",
        "sub": "Pantai eksotis & surfing spot"
      },
      {
        "icon": "📸",
        "text": "Bukit Merese",
        "sub": "Spot foto viral Lombok"
      },
      {
        "icon": "🌊",
        "text": "Tanjung Aan",
        "sub": "Pasir bintang yang unik"
      },
      {
        "icon": "🍽️",
        "text": "Makan Siang Lokal",
        "sub": "Seafood segar pinggir pantai"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Mandalika & Pesisir Selatan",
        "items": [
          {
            "time": "07.00",
            "act": "Penjemputan di meeting point (Bandara/Hotel)"
          },
          {
            "time": "08.30",
            "act": "Tiba di Kuta Lombok — eksplorasi pantai & surfing spot"
          },
          {
            "time": "10.00",
            "act": "Naik ke Bukit Merese — foto panorama & view bukit hijau"
          },
          {
            "time": "11.30",
            "act": "Tanjung Aan — bermain di pasir bintang & berenang"
          },
          {
            "time": "13.00",
            "act": "Makan siang di warung seafood lokal"
          },
          {
            "time": "14.30",
            "act": "Pantai Seger & area Mandalika Circuit"
          },
          {
            "time": "16.30",
            "act": "Sunset di Bukit Merese atau Kuta Lombok"
          },
          {
            "time": "18.00",
            "act": "Perjalanan kembali ke meeting point"
          },
          {
            "time": "19.30",
            "act": "Selesai — tiba di titik awal"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80",
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
    "tags": [
      "Pulau",
      "Snorkeling"
    ],
    "highlights": [
      {
        "icon": "🐢",
        "text": "Snorkeling dengan penyu",
        "sub": "Spot terbaik di sekitar Gili"
      },
      {
        "icon": "🚲",
        "text": "Bersepeda keliling pulau",
        "sub": "Transportasi khas Gili"
      },
      {
        "icon": "🌅",
        "text": "Sunset ikonik",
        "sub": "View terbaik di ujung barat"
      },
      {
        "icon": "🏖️",
        "text": "Pantai berpasir putih",
        "sub": "Air jernih & bersih"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Gili Trawangan Full Day",
        "items": [
          {
            "time": "07.00",
            "act": "Penjemputan di hotel/meeting point"
          },
          {
            "time": "08.00",
            "act": "Perjalanan ke pelabuhan Bangsal"
          },
          {
            "time": "08.45",
            "act": "Fast boat ke Gili Trawangan (~30 menit)"
          },
          {
            "time": "09.30",
            "act": "Snorkeling — spot penyu terbaik"
          },
          {
            "time": "11.30",
            "act": "Naik ke darat — sewa sepeda & keliling pulau"
          },
          {
            "time": "13.00",
            "act": "Makan siang di warung tepi pantai"
          },
          {
            "time": "14.30",
            "act": "Free time — pantai & bersantai"
          },
          {
            "time": "16.30",
            "act": "Sunset di sisi barat Gili Trawangan"
          },
          {
            "time": "17.30",
            "act": "Fast boat kembali ke Bangsal"
          },
          {
            "time": "19.00",
            "act": "Tiba kembali di meeting point"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=500&q=80",
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
    "tags": [
      "Pantai",
      "Sunset"
    ],
    "highlights": [
      {
        "icon": "🌇",
        "text": "Sunset Malimbu",
        "sub": "View Gunung Agung Bali"
      },
      {
        "icon": "🏨",
        "text": "Senggigi Beach",
        "sub": "Pantai ikonik Lombok"
      },
      {
        "icon": "🛍️",
        "text": "Pasar Seni Senggigi",
        "sub": "Souvenir & kerajinan lokal"
      },
      {
        "icon": "🍽️",
        "text": "Kuliner pinggir pantai",
        "sub": "Seafood & masakan lokal"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Senggigi & Malimbu",
        "items": [
          {
            "time": "09.00",
            "act": "Penjemputan di meeting point"
          },
          {
            "time": "10.00",
            "act": "Senggigi Beach — eksplorasi & foto"
          },
          {
            "time": "11.00",
            "act": "Pasar Seni & souvenir shopping"
          },
          {
            "time": "12.00",
            "act": "Makan siang di restoran tepi pantai Senggigi"
          },
          {
            "time": "13.30",
            "act": "Perjalanan ke Malimbu — mampir di Nipah & Kerandangan"
          },
          {
            "time": "15.00",
            "act": "Malimbu Hill — panorama laut & Gunung Agung Bali"
          },
          {
            "time": "17.00",
            "act": "Nikmati sunset spektakuler di Malimbu"
          },
          {
            "time": "18.30",
            "act": "Perjalanan kembali"
          },
          {
            "time": "19.30",
            "act": "Selesai di meeting point"
          }
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
    "tags": [
      "Budaya",
      "Sunset"
    ],
    "highlights": [
      {
        "icon": "🛕",
        "text": "Tanah Lot",
        "sub": "Pura di atas batu karang"
      },
      {
        "icon": "🌅",
        "text": "Uluwatu Sunset",
        "sub": "Tari Kecak di tepi tebing"
      },
      {
        "icon": "🌊",
        "text": "Pantai Padang Padang",
        "sub": "Pantai tersembunyi di Uluwatu"
      },
      {
        "icon": "🍽️",
        "text": "Seafood Jimbaran",
        "sub": "Makan malam romantis di pantai"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Tanah Lot & Uluwatu",
        "items": [
          {
            "time": "08.00",
            "act": "Penjemputan di hotel"
          },
          {
            "time": "09.30",
            "act": "Tanah Lot — pura ikonik di atas karang"
          },
          {
            "time": "11.30",
            "act": "Perjalanan ke Uluwatu"
          },
          {
            "time": "13.00",
            "act": "Makan siang di Jimbaran area"
          },
          {
            "time": "14.30",
            "act": "Pantai Padang Padang & Bingin"
          },
          {
            "time": "17.00",
            "act": "Uluwatu — Kecak Dance saat sunset"
          },
          {
            "time": "19.00",
            "act": "Makan malam seafood Jimbaran"
          },
          {
            "time": "21.00",
            "act": "Kembali ke hotel"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=500&q=80",
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
    "tags": [
      "Budaya",
      "Alam"
    ],
    "highlights": [
      {
        "icon": "🌾",
        "text": "Sawah Tegallalang",
        "sub": "Rice terrace ikonik Bali"
      },
      {
        "icon": "🐒",
        "text": "Sacred Monkey Forest",
        "sub": "Hutan kera suci Ubud"
      },
      {
        "icon": "🛕",
        "text": "Pura Tirta Empul",
        "sub": "Ritual pemandian suci"
      },
      {
        "icon": "🎭",
        "text": "Tari Barong",
        "sub": "Pertunjukan seni tradisional"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Ubud & Alam Bali",
        "items": [
          {
            "time": "08.00",
            "act": "Penjemputan di hotel"
          },
          {
            "time": "09.00",
            "act": "Sawah Tegallalang — foto & swing"
          },
          {
            "time": "11.00",
            "act": "Pura Tirta Empul"
          },
          {
            "time": "12.30",
            "act": "Makan siang di Ubud"
          },
          {
            "time": "14.00",
            "act": "Pasar Ubud & toko seni"
          },
          {
            "time": "15.30",
            "act": "Sacred Monkey Forest"
          },
          {
            "time": "17.00",
            "act": "Tari Barong atau Kecak"
          },
          {
            "time": "19.00",
            "act": "Kembali ke hotel"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1531592937781-344ad608fabf?w=500&q=80",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "rinjani",
    "category_slug": "mountain",
    "name": "Pendakian Rinjani",
    "slug": "pendakian-rinjani",
    "city": "Lombok",
    "price": 1200000,
    "duration_days": 3,
    "duration_nights": 2,
    "description": "Mendaki puncak tertinggi kedua di Indonesia setinggi 3.726 mdpl. Rasakan keajaiban Danau Segara Anak yang memukau di dalam kaldera Rinjani. Durasi minimum 3 hari 2 malam.",
    "tags": [
      "Gunung",
      "Trekking",
      "3D2N"
    ],
    "highlights": [
      {
        "icon": "⛰️",
        "text": "Puncak 3.726 mdpl",
        "sub": "Summit tertinggi di NTB"
      },
      {
        "icon": "💧",
        "text": "Danau Segara Anak",
        "sub": "Danau kawah yang menakjubkan"
      },
      {
        "icon": "🌅",
        "text": "Sunrise spektakuler",
        "sub": "Golden hour dari puncak"
      },
      {
        "icon": "🛡️",
        "text": "Guide SAR bersertifikat",
        "sub": "Keamanan terjamin"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Trek Awal",
        "items": [
          {
            "time": "06.00",
            "act": "Kumpul di Sembalun Lawang / Senaru (meeting point)"
          },
          {
            "time": "07.00",
            "act": "Briefing & persiapan perlengkapan"
          },
          {
            "time": "08.00",
            "act": "Mulai pendakian dari pos awal"
          },
          {
            "time": "12.00",
            "act": "Makan siang di Pos 1 atau Pos 2"
          },
          {
            "time": "17.00",
            "act": "Tiba di camp area Pos 2 / Pos 3"
          },
          {
            "time": "18.00",
            "act": "Setup tenda & makan malam"
          },
          {
            "time": "20.00",
            "act": "Istirahat — persiapan summit attack besok"
          }
        ]
      },
      {
        "day": 2,
        "title": "Summit Attack & Danau Segara Anak",
        "items": [
          {
            "time": "02.00",
            "act": "Bangun & persiapan summit attack"
          },
          {
            "time": "03.00",
            "act": "Mulai pendakian ke puncak (jalur curam)"
          },
          {
            "time": "06.00",
            "act": "Tiba di Puncak Rinjani 3.726 mdpl — SUNRISE!"
          },
          {
            "time": "07.30",
            "act": "Dokumentasi & nikmati pemandangan 360°"
          },
          {
            "time": "09.00",
            "act": "Turun dari puncak ke Plawangan Sembalun"
          },
          {
            "time": "11.00",
            "act": "Turun ke Danau Segara Anak & berendam air panas"
          },
          {
            "time": "13.00",
            "act": "Camp di tepi danau — makan siang"
          },
          {
            "time": "18.00",
            "act": "Makan malam & istirahat"
          }
        ]
      },
      {
        "day": 3,
        "title": "Trek Turun & Kepulangan",
        "items": [
          {
            "time": "06.00",
            "act": "Sarapan & packing"
          },
          {
            "time": "07.00",
            "act": "Trek turun via jalur Senaru"
          },
          {
            "time": "10.30",
            "act": "Tiba di Pos Senaru (finish point)"
          },
          {
            "time": "11.00",
            "act": "Sertifikat pendakian & foto bersama"
          },
          {
            "time": "12.00",
            "act": "Makan siang"
          },
          {
            "time": "14.00",
            "act": "Perjalanan kembali ke hotel / Mataram"
          },
          {
            "time": "17.00",
            "act": "Tiba di meeting point — pendakian selesai 🎉"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
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
    "tags": [
      "Pulau",
      "Snorkeling"
    ],
    "highlights": [
      {
        "icon": "🐢",
        "text": "Snorkeling dengan penyu",
        "sub": "Spot terbaik di Gili Meno"
      },
      {
        "icon": "🏖️",
        "text": "3 Pulau Gili",
        "sub": "Trawangan, Meno & Air"
      },
      {
        "icon": "🌊",
        "text": "Pantai berpasir putih",
        "sub": "Air jernih & bersih"
      },
      {
        "icon": "🌅",
        "text": "Sunset terbaik",
        "sub": "Dari Gili Trawangan"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Gili Trawangan",
        "items": [
          {
            "time": "08.00",
            "act": "Penjemputan di meeting point"
          },
          {
            "time": "09.00",
            "act": "Perjalanan ke Pelabuhan Bangsal"
          },
          {
            "time": "10.00",
            "act": "Fast boat ke Gili Trawangan"
          },
          {
            "time": "11.00",
            "act": "Check in & eksplorasi Gili Trawangan"
          },
          {
            "time": "13.00",
            "act": "Makan siang di warung tepi pantai"
          },
          {
            "time": "15.00",
            "act": "Snorkeling di spot terbaik"
          },
          {
            "time": "17.30",
            "act": "Sunset di sisi barat Gili Trawangan"
          },
          {
            "time": "19.00",
            "act": "Makan malam & istirahat"
          }
        ]
      },
      {
        "day": 2,
        "title": "Gili Meno & Gili Air",
        "items": [
          {
            "time": "07.00",
            "act": "Sarapan"
          },
          {
            "time": "08.00",
            "act": "Perahu ke Gili Meno — snorkeling dengan penyu"
          },
          {
            "time": "11.00",
            "act": "Island hopping ke Gili Air"
          },
          {
            "time": "13.00",
            "act": "Makan siang di Gili Air"
          },
          {
            "time": "14.00",
            "act": "Eksplorasi & berenang di Gili Air"
          },
          {
            "time": "16.00",
            "act": "Kembali ke Gili Trawangan atau direct ke darat"
          },
          {
            "time": "19.00",
            "act": "Makan malam"
          }
        ]
      },
      {
        "day": 3,
        "title": "Kepulangan",
        "items": [
          {
            "time": "07.00",
            "act": "Sarapan & check out"
          },
          {
            "time": "09.00",
            "act": "Fast boat kembali ke Bangsal"
          },
          {
            "time": "10.00",
            "act": "Perjalanan kembali ke hotel/Mataram"
          },
          {
            "time": "12.00",
            "act": "Selesai"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=500&q=80",
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
    "tags": [
      "Pantai",
      "Surfing"
    ],
    "highlights": [
      {
        "icon": "🏄",
        "text": "Surfing Kuta Lombok",
        "sub": "Ombak kelas dunia"
      },
      {
        "icon": "🏖️",
        "text": "Selong Belanak",
        "sub": "Pantai terpanjang di Lombok"
      },
      {
        "icon": "📸",
        "text": "Spot foto viral",
        "sub": "Bukit Merese & Tanjung Aan"
      },
      {
        "icon": "🦀",
        "text": "Seafood lokal",
        "sub": "Fresh dari nelayan langsung"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Eksplorasi",
        "items": [
          {
            "time": "08.00",
            "act": "Penjemputan di meeting point"
          },
          {
            "time": "10.00",
            "act": "Perjalanan menuju destinasi"
          },
          {
            "time": "12.00",
            "act": "Makan siang di restoran lokal"
          },
          {
            "time": "14.00",
            "act": "Eksplorasi spot utama"
          },
          {
            "time": "17.00",
            "act": "Sunset & foto-foto"
          },
          {
            "time": "19.00",
            "act": "Makan malam & istirahat"
          }
        ]
      },
      {
        "day": 2,
        "title": "Eksplorasi Lanjutan",
        "items": [
          {
            "time": "07.00",
            "act": "Sarapan"
          },
          {
            "time": "08.00",
            "act": "Aktivitas utama (surfing / snorkeling / tour)"
          },
          {
            "time": "12.00",
            "act": "Makan siang"
          },
          {
            "time": "14.00",
            "act": "Free time / aktivitas opsional"
          },
          {
            "time": "16.00",
            "act": "Perjalanan kembali ke meeting point"
          },
          {
            "time": "17.00",
            "act": "Selesai"
          }
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
    "tags": [
      "Trekking",
      "View"
    ],
    "highlights": [
      {
        "icon": "🌿",
        "text": "Lembah Sembalun",
        "sub": "Perkebunan & alam hijau"
      },
      {
        "icon": "🏔️",
        "text": "Bukit Pergasingan",
        "sub": "View Rinjani dari bawah"
      },
      {
        "icon": "🌄",
        "text": "Savana Propok",
        "sub": "Padang rumput luas"
      },
      {
        "icon": "📸",
        "text": "Foto landscape",
        "sub": "Terbaik di Lombok Timur"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Trek Bukit Pergasingan",
        "items": [
          {
            "time": "07.00",
            "act": "Penjemputan di meeting point"
          },
          {
            "time": "09.00",
            "act": "Tiba di Sembalun — briefing & persiapan"
          },
          {
            "time": "10.00",
            "act": "Mulai trekking ke Bukit Pergasingan"
          },
          {
            "time": "12.00",
            "act": "Tiba di puncak — makan siang & foto panorama Rinjani"
          },
          {
            "time": "14.00",
            "act": "Turun dari bukit"
          },
          {
            "time": "16.00",
            "act": "Eksplorasi Lembah Sembalun & ladang bawang"
          },
          {
            "time": "18.00",
            "act": "Makan malam & istirahat"
          }
        ]
      },
      {
        "day": 2,
        "title": "Savana & Kepulangan",
        "items": [
          {
            "time": "06.00",
            "act": "Sunrise walk di Savana Propok"
          },
          {
            "time": "08.00",
            "act": "Sarapan"
          },
          {
            "time": "09.00",
            "act": "Eksplorasi area Sembalun & beli oleh-oleh"
          },
          {
            "time": "11.00",
            "act": "Perjalanan kembali ke Mataram/hotel"
          },
          {
            "time": "13.00",
            "act": "Selesai"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&q=80",
    "status": "available",
    "is_active": true
  },
  {
    "trip_type_slug": "custom",
    "category_slug": "culture",
    "name": "Air Terjun & Hidden Gems Lombok",
    "slug": "air-terjun-and-hidden-gems-lombok",
    "city": "Lombok",
    "price": 580000,
    "duration_days": 1,
    "duration_nights": 0,
    "description": "Temukan keindahan tersembunyi Lombok — air terjun Sendang Gile, Tiu Kelep, dan spot-spot rahasia yang hanya diketahui guide lokal kami.",
    "tags": [
      "Alam",
      "Tersembunyi"
    ],
    "highlights": [
      {
        "icon": "💦",
        "text": "Air Terjun Sendang Gile",
        "sub": "Air sejuk & kolam alami"
      },
      {
        "icon": "🌊",
        "text": "Tiu Kelep",
        "sub": "Dibalik Sendang Gile"
      },
      {
        "icon": "🦋",
        "text": "Hutan tropis lebat",
        "sub": "Flora & fauna langka"
      },
      {
        "icon": "🗺️",
        "text": "Hidden spots rahasia",
        "sub": "Hanya guide lokal yang tahu"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kedatangan & Air Terjun",
        "items": [
          {
            "time": "08.00",
            "act": "Penjemputan di meeting point"
          },
          {
            "time": "10.00",
            "act": "Tiba di Senaru — Sendang Gile waterfall"
          },
          {
            "time": "11.30",
            "act": "Trek ke Tiu Kelep (30 menit trekking)"
          },
          {
            "time": "13.00",
            "act": "Makan siang & istirahat"
          },
          {
            "time": "14.30",
            "act": "Kunjungi hidden spots rahasia"
          },
          {
            "time": "17.00",
            "act": "Kembali ke penginapan"
          },
          {
            "time": "19.00",
            "act": "Makan malam"
          }
        ]
      },
      {
        "day": 2,
        "title": "Hidden Gems & Kepulangan",
        "items": [
          {
            "time": "07.00",
            "act": "Sarapan"
          },
          {
            "time": "08.00",
            "act": "Eksplorasi hidden gems tambahan"
          },
          {
            "time": "11.00",
            "act": "Perjalanan kembali"
          },
          {
            "time": "13.00",
            "act": "Selesai"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
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
    "tags": [
      "Pantai",
      "Sunset"
    ],
    "highlights": [
      {
        "icon": "🌇",
        "text": "Sunset Malimbu",
        "sub": "View Gunung Agung Bali"
      },
      {
        "icon": "🏨",
        "text": "Senggigi Beach",
        "sub": "Pantai ikonik Lombok"
      },
      {
        "icon": "🛥️",
        "text": "Sunset cruise",
        "sub": "Perahu tradisional Lombok"
      },
      {
        "icon": "🍽️",
        "text": "Kuliner pinggir pantai",
        "sub": "Seafood & masakan lokal"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Senggigi & Eksplorasi",
        "items": [
          {
            "time": "09.00",
            "act": "Penjemputan di meeting point"
          },
          {
            "time": "10.00",
            "act": "Senggigi Beach — eksplorasi & bersantai"
          },
          {
            "time": "12.00",
            "act": "Makan siang seafood di tepi pantai"
          },
          {
            "time": "14.00",
            "act": "Pantai Barat — Nipah & Kerandangan"
          },
          {
            "time": "17.00",
            "act": "Sunset di Malimbu Hill"
          },
          {
            "time": "19.00",
            "act": "Makan malam & istirahat"
          }
        ]
      },
      {
        "day": 2,
        "title": "Eksplorasi Lanjutan & Kepulangan",
        "items": [
          {
            "time": "07.00",
            "act": "Sarapan"
          },
          {
            "time": "08.00",
            "act": "Snorkeling di pantai barat"
          },
          {
            "time": "11.00",
            "act": "Free time & bersantai"
          },
          {
            "time": "13.00",
            "act": "Makan siang & persiapan pulang"
          },
          {
            "time": "15.00",
            "act": "Perjalanan kembali ke meeting point"
          },
          {
            "time": "17.00",
            "act": "Selesai"
          }
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
    "tags": [
      "Pulau",
      "Snorkeling"
    ],
    "highlights": [
      {
        "icon": "🦈",
        "text": "Manta Point",
        "sub": "Berenang dengan pari manta"
      },
      {
        "icon": "📸",
        "text": "Kelingking Beach",
        "sub": "Tebing ikonik Nusa Penida"
      },
      {
        "icon": "💧",
        "text": "Angel Billabong",
        "sub": "Kolam alami di tebing"
      },
      {
        "icon": "🌊",
        "text": "Broken Beach",
        "sub": "Lengkung batu karang natural"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Nusa Penida Barat",
        "items": [
          {
            "time": "07.00",
            "act": "Fast boat dari Sanur ke Nusa Penida"
          },
          {
            "time": "09.00",
            "act": "Kelingking Beach & view point"
          },
          {
            "time": "11.30",
            "act": "Angel Billabong & Broken Beach"
          },
          {
            "time": "13.00",
            "act": "Makan siang lokal"
          },
          {
            "time": "14.30",
            "act": "Crystal Bay — snorkeling"
          },
          {
            "time": "17.00",
            "act": "Kembali ke penginapan"
          }
        ]
      },
      {
        "day": 2,
        "title": "Nusa Penida Timur & Kepulangan",
        "items": [
          {
            "time": "07.00",
            "act": "Sarapan"
          },
          {
            "time": "08.00",
            "act": "Manta Point — berenang bersama manta ray"
          },
          {
            "time": "11.00",
            "act": "Atuh Beach & Diamond Beach"
          },
          {
            "time": "13.00",
            "act": "Makan siang"
          },
          {
            "time": "15.00",
            "act": "Fast boat kembali ke Sanur"
          },
          {
            "time": "17.00",
            "act": "Selesai"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1604608672516-f1b9cf8e2a8b?w=500&q=80",
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
    "tags": [
      "Budaya",
      "Alam"
    ],
    "highlights": [
      {
        "icon": "🌾",
        "text": "Sawah Tegallalang",
        "sub": "Rice terrace ikonik Bali"
      },
      {
        "icon": "🌋",
        "text": "Gunung Batur",
        "sub": "Sunrise trekking aktif"
      },
      {
        "icon": "💧",
        "text": "Danau Batur",
        "sub": "Kaldera vulkanik indah"
      },
      {
        "icon": "🎭",
        "text": "Seni & Budaya Ubud",
        "sub": "Tari, lukisan, kerajinan"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Ubud Art & Culture",
        "items": [
          {
            "time": "08.00",
            "act": "Penjemputan di hotel"
          },
          {
            "time": "09.00",
            "act": "Sawah Tegallalang & Ceking rice terrace"
          },
          {
            "time": "11.00",
            "act": "Pasar Ubud & Puri Agung Ubud"
          },
          {
            "time": "13.00",
            "act": "Makan siang di Ubud"
          },
          {
            "time": "14.30",
            "act": "Sacred Monkey Forest"
          },
          {
            "time": "16.00",
            "act": "Pura Tirta Empul"
          },
          {
            "time": "19.00",
            "act": "Tari Legong / Kecak malam"
          }
        ]
      },
      {
        "day": 2,
        "title": "Kintamani & Gunung Batur",
        "items": [
          {
            "time": "06.00",
            "act": "Trekking Gunung Batur — sunrise"
          },
          {
            "time": "09.00",
            "act": "Sarapan sambil menikmati view kaldera"
          },
          {
            "time": "11.00",
            "act": "Danau Batur — perahu tradisional"
          },
          {
            "time": "13.00",
            "act": "Makan siang di Kintamani"
          },
          {
            "time": "15.00",
            "act": "Perjalanan kembali ke hotel"
          },
          {
            "time": "17.00",
            "act": "Selesai"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1531592937781-344ad608fabf?w=500&q=80",
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
    "tags": [
      "Pantai",
      "Lifestyle"
    ],
    "highlights": [
      {
        "icon": "🏄",
        "text": "Surfing Canggu",
        "sub": "Ombak terbaik untuk pemula"
      },
      {
        "icon": "🌅",
        "text": "Sunset Seminyak",
        "sub": "Ku De Ta & Potato Head"
      },
      {
        "icon": "☕",
        "text": "Café Culture Canggu",
        "sub": "Kafe-kafe terbaik Bali"
      },
      {
        "icon": "🛍️",
        "text": "Shopping & Spa",
        "sub": "Seminyak Square & spa lokal"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Seminyak Beach & Lifestyle",
        "items": [
          {
            "time": "09.00",
            "act": "Penjemputan di hotel"
          },
          {
            "time": "10.00",
            "act": "Seminyak Beach — bersantai & foto"
          },
          {
            "time": "12.00",
            "act": "Makan siang di Seminyak"
          },
          {
            "time": "14.00",
            "act": "Petitenget & Batu Belig Beach"
          },
          {
            "time": "17.00",
            "act": "Sunset di Ku De Ta / Potato Head"
          },
          {
            "time": "19.30",
            "act": "Makan malam di Seminyak"
          }
        ]
      },
      {
        "day": 2,
        "title": "Canggu Surf & Vibes",
        "items": [
          {
            "time": "07.00",
            "act": "Surf lesson di Canggu"
          },
          {
            "time": "09.30",
            "act": "Sarapan di beach café"
          },
          {
            "time": "11.00",
            "act": "Explore Old Man's & Pererenan"
          },
          {
            "time": "13.00",
            "act": "Makan siang & kafe hopping Canggu"
          },
          {
            "time": "15.00",
            "act": "Free time & belanja"
          },
          {
            "time": "17.00",
            "act": "Sunset di Echo Beach"
          },
          {
            "time": "19.00",
            "act": "Selesai"
          }
        ]
      }
    ],
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80",
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
