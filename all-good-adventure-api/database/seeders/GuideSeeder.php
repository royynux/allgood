<?php

namespace Database\Seeders;

use App\Models\Guide;
use Illuminate\Database\Seeder;

class GuideSeeder extends Seeder
{
    public function run(): void
    {
        $guides = json_decode(<<<'JSON'
[
  {
    "name": "Bima Arjuna",
    "location": "Lombok, NTB",
    "specialty": "mountain",
    "specialty_label": "Gunung & Trekking",
    "bio": "Spesialis pendakian gunung Lombok. Telah memandu 300+ ekspedisi ke Rinjani dan Sembalun. Bersertifikat BNSP dan SAR.",
    "avatar": "https://i.pravatar.cc/200?img=11",
    "cover_image": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    "rating": 4.9,
    "review_count": 187,
    "trips_done": 312,
    "years_experience": 8,
    "languages": "Indonesia, Inggris",
    "destinations": [
      "Rinjani",
      "Sembalun",
      "Bukit Pergasingan",
      "Sendang Gile"
    ],
    "certifications": [
      "BNSP Level 3",
      "SAR Bersertifikat",
      "P3K Gunung"
    ],
    "availability": [
      {
        "day": "monday",
        "start_time": "08:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "tuesday",
        "start_time": "08:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "wednesday",
        "start_time": null,
        "end_time": null,
        "is_available": false
      },
      {
        "day": "thursday",
        "start_time": "08:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "friday",
        "start_time": "08:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "saturday",
        "start_time": "06:00",
        "end_time": "20:00",
        "is_available": true
      },
      {
        "day": "sunday",
        "start_time": "06:00",
        "end_time": "20:00",
        "is_available": true
      }
    ],
    "is_active": true
  },
  {
    "name": "Rudi Kartono",
    "location": "Lombok, NTB",
    "specialty": "island",
    "specialty_label": "Island Hopping",
    "bio": "Spesialis Gili Islands dan island hopping Lombok. Putra daerah yang mengenal setiap spot snorkeling dan pantai tersembunyi.",
    "avatar": "https://i.pravatar.cc/200?img=59",
    "cover_image": "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=600&q=80",
    "rating": 5,
    "review_count": 143,
    "trips_done": 198,
    "years_experience": 7,
    "languages": "Indonesia, Inggris",
    "destinations": [
      "Gili Trawangan",
      "Gili Meno",
      "Gili Air",
      "Pantai Barat"
    ],
    "certifications": [
      "PADI Divemaster",
      "BNSP Level 2",
      "Boat Captain License"
    ],
    "availability": [
      {
        "day": "monday",
        "start_time": "06:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "tuesday",
        "start_time": "06:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "wednesday",
        "start_time": "06:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "thursday",
        "start_time": "06:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "friday",
        "start_time": "06:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "saturday",
        "start_time": "06:00",
        "end_time": "20:00",
        "is_available": true
      },
      {
        "day": "sunday",
        "start_time": null,
        "end_time": null,
        "is_available": false
      }
    ],
    "is_active": true
  },
  {
    "name": "Siti Nurhaliza",
    "location": "Lombok, NTB",
    "specialty": "beach",
    "specialty_label": "Pantai & Budaya",
    "bio": "Spesialis pantai selatan Lombok. Ahli surfing guide dan wisata budaya Sasak. Sangat direkomendasikan untuk group wanita.",
    "avatar": "https://i.pravatar.cc/200?img=47",
    "cover_image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    "rating": 4.8,
    "review_count": 156,
    "trips_done": 234,
    "years_experience": 5,
    "languages": "Indonesia, Inggris",
    "destinations": [
      "Kuta Lombok",
      "Selong Belanak",
      "Tanjung Aan",
      "Senggigi"
    ],
    "certifications": [
      "BNSP Level 2",
      "Surfing Guide Certified"
    ],
    "availability": [
      {
        "day": "monday",
        "start_time": "08:00",
        "end_time": "17:00",
        "is_available": true
      },
      {
        "day": "tuesday",
        "start_time": "08:00",
        "end_time": "17:00",
        "is_available": true
      },
      {
        "day": "wednesday",
        "start_time": "08:00",
        "end_time": "17:00",
        "is_available": true
      },
      {
        "day": "thursday",
        "start_time": "08:00",
        "end_time": "17:00",
        "is_available": true
      },
      {
        "day": "friday",
        "start_time": "08:00",
        "end_time": "12:00",
        "is_available": true
      },
      {
        "day": "saturday",
        "start_time": "07:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "sunday",
        "start_time": "07:00",
        "end_time": "18:00",
        "is_available": true
      }
    ],
    "is_active": true
  },
  {
    "name": "Eka Wijaya",
    "location": "Lombok, NTB",
    "specialty": "mountain",
    "specialty_label": "Gunung & Alam",
    "bio": "Ahli trekking dan wisata alam Lombok. Fotografer lanskap profesional yang selalu memastikan traveler mendapat momen terbaik.",
    "avatar": "https://i.pravatar.cc/200?img=53",
    "cover_image": "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80",
    "rating": 4.8,
    "review_count": 112,
    "trips_done": 178,
    "years_experience": 6,
    "languages": "Indonesia, Inggris",
    "destinations": [
      "Sembalun",
      "Bukit Pergasingan",
      "Sendang Gile",
      "Air Terjun Tiu Kelep"
    ],
    "certifications": [
      "BNSP Level 2",
      "Mountain Rescue",
      "Photography Guide"
    ],
    "availability": [
      {
        "day": "monday",
        "start_time": "07:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "tuesday",
        "start_time": "07:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "wednesday",
        "start_time": "07:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "thursday",
        "start_time": "07:00",
        "end_time": "18:00",
        "is_available": true
      },
      {
        "day": "friday",
        "start_time": null,
        "end_time": null,
        "is_available": false
      },
      {
        "day": "saturday",
        "start_time": "06:00",
        "end_time": "20:00",
        "is_available": true
      },
      {
        "day": "sunday",
        "start_time": "06:00",
        "end_time": "20:00",
        "is_available": true
      }
    ],
    "is_active": true
  },
  {
    "name": "Hamdan Fauzi",
    "location": "Lombok, NTB",
    "specialty": "beach",
    "specialty_label": "Pantai & Sunset",
    "bio": "Guide muda yang energik dan fun! Spesialis sunset tour dan culinary trip di Lombok. Tahu semua warung seafood terbaik.",
    "avatar": "https://i.pravatar.cc/200?img=68",
    "cover_image": "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=600&q=80",
    "rating": 4.7,
    "review_count": 98,
    "trips_done": 156,
    "years_experience": 4,
    "languages": "Indonesia",
    "destinations": [
      "Malimbu",
      "Senggigi",
      "Sekotong",
      "Gili Nanggu"
    ],
    "certifications": [
      "BNSP Level 1",
      "Food & Culture Guide"
    ],
    "availability": [
      {
        "day": "monday",
        "start_time": "10:00",
        "end_time": "22:00",
        "is_available": true
      },
      {
        "day": "tuesday",
        "start_time": "10:00",
        "end_time": "22:00",
        "is_available": true
      },
      {
        "day": "wednesday",
        "start_time": "10:00",
        "end_time": "22:00",
        "is_available": true
      },
      {
        "day": "thursday",
        "start_time": "10:00",
        "end_time": "22:00",
        "is_available": true
      },
      {
        "day": "friday",
        "start_time": "14:00",
        "end_time": "22:00",
        "is_available": true
      },
      {
        "day": "saturday",
        "start_time": "09:00",
        "end_time": "22:00",
        "is_available": true
      },
      {
        "day": "sunday",
        "start_time": "09:00",
        "end_time": "22:00",
        "is_available": true
      }
    ],
    "is_active": true
  }
]
JSON, true);

        foreach ($guides as $guideData) {
            $guide = Guide::updateOrCreate(
                ['name' => $guideData['name']],
                [
                    'location' => $guideData['location'],
                    'specialty' => $guideData['specialty'],
                    'specialty_label' => $guideData['specialty_label'],
                    'bio' => $guideData['bio'],
                    'avatar' => $guideData['avatar'],
                    'cover_image' => $guideData['cover_image'],
                    'rating' => $guideData['rating'],
                    'review_count' => $guideData['review_count'],
                    'trips_done' => $guideData['trips_done'],
                    'years_experience' => $guideData['years_experience'],
                    'languages' => $guideData['languages'],
                    'destinations' => $guideData['destinations'],
                    'is_active' => $guideData['is_active'],
                ],
            );

            foreach ($guideData['certifications'] as $certification) {
                $guide->certifications()->updateOrCreate(
                    ['name' => $certification],
                    ['name' => $certification],
                );
            }

            foreach ($guideData['availability'] as $availability) {
                $guide->availabilities()->updateOrCreate(
                    ['day' => $availability['day']],
                    [
                        'start_time' => $availability['start_time'],
                        'end_time' => $availability['end_time'],
                        'is_available' => $availability['is_available'],
                    ],
                );
            }
        }
    }
}
