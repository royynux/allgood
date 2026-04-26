<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
