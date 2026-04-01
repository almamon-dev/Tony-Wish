<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Plan;
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
                'email_verified_at' => now(),
            ]
        );

        // 2. Create Business Owner (Parent)
        $freePlan = Plan::where('name', 'Free Trial')->first();

        $businessOwner = User::updateOrCreate(
            ['email' => 'owner@gmail.com'],
            [
                'first_name' => 'Account',
                'last_name' => 'Holder',
                'password' => Hash::make('5'),
                'user_type' => 'business_owner',
                'email_verified_at' => now(),
                'plan_id' => $freePlan ? $freePlan->id : null,
                'subscription_status' => $freePlan ? 'active' : 'inactive',
                'expiry_date' => $freePlan ? now()->addDays(7) : null,
            ]
        );
        $businessOwner1 = User::updateOrCreate(
            ['email' => 'owner1@gmail.com'],
            [
                'first_name' => 'Account',
                'last_name' => 'Holder',
                'password' => Hash::make('5'),
                'user_type' => 'business_owner',
                'email_verified_at' => now(),
                'plan_id' => null,
                'subscription_status' => 'inactive',
                'expiry_date' => null,
            ]
        );

        // Create Company for Business Owner
        Company::updateOrCreate(
            ['user_id' => $businessOwner->id],
            [
                'company_name' => 'Tony compliance Ltd.',
                'registration_number' => 'REG-2026-001',
                'industry' => 'Technology',
            ]
        );

        // 3. Create Administrator under Business Owner
        $administrator = User::updateOrCreate(
            ['email' => 'administrator@gmail.com'],
            [
                'first_name' => 'Company',
                'last_name' => 'Administrator',
                'password' => Hash::make('password'),
                'user_type' => 'administrator',
                'business_owner_id' => $businessOwner->id,
                'created_by' => $businessOwner->id,
                'email_verified_at' => now(),
            ]
        );

        // 4. Create 2 Users under the Administrator
        User::updateOrCreate(
            ['email' => 'user1@gmail.com'],
            [
                'first_name' => 'Standard',
                'last_name' => 'User 1',
                'password' => Hash::make('password'),
                'user_type' => 'userdashboard',
                'employee_id' => 'EMP-2026-001',
                'business_owner_id' => $businessOwner->id,
                'created_by' => $administrator->id,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'user2@gmail.com'],
            [
                'first_name' => 'Standard',
                'last_name' => 'User 2',
                'password' => Hash::make('password'),
                'user_type' => 'userdashboard',
                'employee_id' => 'EMP-2026-002',
                'business_owner_id' => $businessOwner->id,
                'created_by' => $administrator->id,
                'email_verified_at' => now(),
            ]
        );

    }
}
