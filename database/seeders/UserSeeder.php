<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create System Admin
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'first_name' => 'System',
                'last_name' => 'Admin',
                'password' => Hash::make('password'),
                'user_type' => 'admin',
            ]
        );

        // 2. Create Company Administrator
        User::updateOrCreate(
            ['email' => 'administrator@gmail.com'],
            [
                'first_name' => 'Company',
                'last_name' => 'Administrator',
                'password' => Hash::make('password'),
                'user_type' => 'administrator',
            ]
        );

        // 2. Create Business Owner
        User::updateOrCreate(
            ['email' => 'owner@gmail.com'],
            [
                'first_name' => 'Business',
                'last_name' => 'Owner',
                'password' => Hash::make('password'),
                'user_type' => 'business_owner',
            ]
        );

        // 3. Create Standard User
        User::updateOrCreate(
            ['email' => 'user@gmail.com'],
            [
                'first_name' => 'Standard',
                'last_name' => 'User',
                'password' => Hash::make('password'),
                'user_type' => 'userdashboard',
            ]
        );
    }
}
