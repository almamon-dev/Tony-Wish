<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Free Trial
        Plan::updateOrCreate(
            ['name' => 'Free Trial'],
            [
                'price' => 0.00,
                'currency' => 'USD',
                'duration' => 'month',
                'features' => [
                    '7-days free trial',
                    '1 company',
                    'Up to 2 users',
                    'Basic features',
                    'Email support',
                ],
                'is_active' => true,
            ]
        );

        // 2. Professional
        Plan::updateOrCreate(
            ['name' => 'Professional'],
            [
                'price' => 49.00,
                'currency' => 'USD',
                'duration' => 'month',
                'features' => [
                    'Everything in Free Trial',
                    'Up to 5 companies',
                    'Unlimited users',
                    'Full audit tracking',
                    'Advanced reporting',
                    'Priority support',
                ],
                'is_active' => true,
            ]
        );

        // 3. Enterprise (Custom pricing usually handled separately, but seeding for UI)
        Plan::updateOrCreate(
            ['name' => 'Enterprise'],
            [
                'price' => 499.00,
                'currency' => 'USD',
                'duration' => 'month', // or year
                'features' => [
                    'Everything in Professional',
                    'Unlimited companies',
                    'White-labeling',
                    'Custom integrations',
                    '24/7 Phone support',
                    'Dedicated account manager',
                ],
                'is_active' => true,
            ]
        );
    }
}
