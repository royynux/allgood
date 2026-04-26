const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const prototype = path.resolve(root, '..', '..', 'Private trip', 'All Good Adventure.html');
const html = fs.readFileSync(prototype, 'utf8');

const tripsSource = html.match(/const TRIPS = ([\s\S]*?);\n\nconst GUIDES =/)[1];
const guidesSource = html.match(/const GUIDES = ([\s\S]*?);\n\n\/\*/)[1];

const context = {};
vm.createContext(context);
vm.runInContext(`TRIPS = ${tripsSource}; GUIDES = ${guidesSource};`, context);

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const tripTypeSlug = (type) => ({
  oneday: 'one-day',
  rinjani: 'rinjani',
  destination: 'custom',
}[type] || type);

const dayMap = {
  Senin: 'monday',
  Selasa: 'tuesday',
  Rabu: 'wednesday',
  Kamis: 'thursday',
  Jumat: 'friday',
  Sabtu: 'saturday',
  Minggu: 'sunday',
};

const normalizeTime = (value) => value.replace('.', ':');

const trips = context.TRIPS.map((trip) => {
  const durationDays = trip.tripType === 'rinjani' ? 3 : (trip.dur || 1);
  return {
    trip_type_slug: tripTypeSlug(trip.tripType),
    category_slug: slugify(trip.cat),
    name: trip.name,
    slug: slugify(trip.name),
    city: trip.city,
    price: trip.price || 0,
    duration_days: durationDays,
    duration_nights: Math.max(0, durationDays - 1),
    description: trip.desc || null,
    tags: trip.tags || [],
    highlights: trip.highlights || [],
    itinerary: trip.itinerary || [],
    image: trip.img || null,
    status: trip.status === 'Tersedia' ? 'available' : 'unavailable',
    is_active: true,
  };
});

const guides = context.GUIDES.map((guide) => ({
  name: guide.name,
  location: guide.location,
  specialty: guide.specialty,
  specialty_label: guide.specialtyLabel,
  bio: guide.bio,
  avatar: guide.avatar,
  cover_image: guide.cover,
  rating: guide.rating,
  review_count: guide.reviewCount,
  trips_done: guide.tripsDone,
  years_experience: guide.yearsExp,
  languages: guide.languages,
  destinations: guide.destinations || [],
  certifications: guide.certifications || [],
  availability: Object.entries(guide.availability || {}).map(([day, time]) => {
    const unavailable = time === 'Tidak tersedia';
    const [start, end] = unavailable ? [null, null] : time.split('–').map(normalizeTime);
    return {
      day: dayMap[day],
      start_time: start,
      end_time: end,
      is_available: !unavailable,
    };
  }),
  is_active: true,
}));

function phpJson(value) {
  return JSON.stringify(value, null, 2).replace(/\$\{/g, '$\\{');
}

function writeSeeder(name, content) {
  fs.writeFileSync(path.join(root, 'database', 'seeders', name), content, 'utf8');
}

writeSeeder('TripTypeSeeder.php', `<?php

namespace Database\\Seeders;

use App\\Models\\TripType;
use Illuminate\\Database\\Seeder;

class TripTypeSeeder extends Seeder
{
    public function run(): void
    {
        $tripTypes = [
            ['name' => 'One Day Trip', 'slug' => 'one-day', 'description' => 'Paket private trip satu hari penuh.'],
            ['name' => 'Pendakian Rinjani', 'slug' => 'rinjani', 'description' => 'Paket pendakian Rinjani fixed 3 hari 2 malam.'],
            ['name' => 'Custom Trip', 'slug' => 'custom', 'description' => 'Trip fleksibel dengan beberapa destinasi dan harga dikonfirmasi admin.'],
        ];

        foreach ($tripTypes as $tripType) {
            TripType::updateOrCreate(
                ['slug' => $tripType['slug']],
                $tripType + ['is_active' => true],
            );
        }
    }
}
`);

writeSeeder('CategorySeeder.php', `<?php

namespace Database\\Seeders;

use App\\Models\\Category;
use Illuminate\\Database\\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Mountain', 'slug' => 'mountain'],
            ['name' => 'Beach', 'slug' => 'beach'],
            ['name' => 'Island', 'slug' => 'island'],
            ['name' => 'Culture', 'slug' => 'culture'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category + ['is_active' => true],
            );
        }
    }
}
`);

writeSeeder('DestinationSeeder.php', `<?php

namespace Database\\Seeders;

use App\\Models\\Category;
use App\\Models\\Destination;
use App\\Models\\TripType;
use Illuminate\\Database\\Seeder;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = json_decode(<<<'JSON'
${phpJson(trips)}
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
`);

writeSeeder('GuideSeeder.php', `<?php

namespace Database\\Seeders;

use App\\Models\\Guide;
use Illuminate\\Database\\Seeder;

class GuideSeeder extends Seeder
{
    public function run(): void
    {
        $guides = json_decode(<<<'JSON'
${phpJson(guides)}
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
`);

writeSeeder('AdminUserSeeder.php', `<?php

namespace Database\\Seeders;

use App\\Models\\User;
use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@allgoodadventure.test'],
            [
                'name' => 'Admin All Good Adventure',
                'phone' => '+6281234567890',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
        );
    }
}
`);

console.log('Seeders generated from prototype data.');
