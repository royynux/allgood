<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

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
