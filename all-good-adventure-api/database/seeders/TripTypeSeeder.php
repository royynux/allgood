<?php

namespace Database\Seeders;

use App\Models\TripType;
use Illuminate\Database\Seeder;

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
