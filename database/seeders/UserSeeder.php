<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin users
        $admins = [
            [
                'fname' => 'Super',
                'lname' => 'Admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Admin@123'),
                'user_type' => 'admin',
                'avatar' => null,
                'is_verified' => true,
                'verified_at' => Carbon::now(),
                'is_subscribed' => true,
                'terms_and_conditions' => true,
                'terms_and_conditions_at' => Carbon::now()->subDays(30),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'fname' => 'System',
                'lname' => 'Administrator',
                'email' => 'admin2@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Admin2@456'),
                'user_type' => 'admin',
                'avatar' => null,
                'is_verified' => true,
                'verified_at' => Carbon::now(),
                'is_subscribed' => true,
                'terms_and_conditions' => true,
                'terms_and_conditions_at' => Carbon::now()->subDays(15),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        // Create business owner users with various terms acceptance scenarios
        $businessOwners = [
            [
                'fname' => 'John',
                'lname' => 'Doe',
                'email' => 'john.business@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Business@123'),
                'user_type' => 'business_owner',
                'avatar' => null,
                'is_verified' => true,
                'verified_at' => Carbon::now(),
                'is_subscribed' => true,
                'terms_and_conditions' => true,
                'terms_and_conditions_at' => Carbon::now()->subDays(60),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'fname' => 'Jane',
                'lname' => 'Smith',
                'email' => 'jane.business@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Business2@456'),
                'user_type' => 'business_owner',
                'avatar' => null,
                'is_verified' => true,
                'verified_at' => Carbon::now(),
                'is_subscribed' => false,
                'terms_and_conditions' => true,
                'terms_and_conditions_at' => Carbon::now()->subDays(45),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'fname' => 'Robert',
                'lname' => 'Johnson',
                'email' => 'robert.business@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Business3@789'),
                'user_type' => 'business_owner',
                'avatar' => null,
                'is_verified' => false,
                'verified_at' => null,
                'is_subscribed' => true,
                'terms_and_conditions' => false, // Not accepted terms
                'terms_and_conditions_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'fname' => 'Emily',
                'lname' => 'Williams',
                'email' => 'emily.business@gmail.com',
                'email_verified_at' => null,
                'password' => Hash::make('Business4@012'),
                'user_type' => 'business_owner',
                'avatar' => null,
                'is_verified' => false,
                'verified_at' => null,
                'is_subscribed' => false,
                'terms_and_conditions' => true,
                'terms_and_conditions_at' => Carbon::now()->subDays(7),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        // Insert all users
        foreach ($admins as $admin) {
            User::create($admin);
        }

        foreach ($businessOwners as $businessOwner) {
            User::create($businessOwner);
        }

        // Output success message
        $this->command->info('Successfully seeded 2 admin users and 4 business owner users.');
        $this->command->info('=====================================================');
        $this->command->info('Admin credentials:');
        $this->command->info('1. admin@gmail.com / Admin@123 (Terms accepted 30 days ago)');
        $this->command->info('2. admin2@gmail.com / Admin2@456 (Terms accepted 15 days ago)');
        $this->command->info('');
        $this->command->info('Business owner credentials:');
        $this->command->info('1. john.business@gmail.com / Business@123');
        $this->command->info('   ✓ Verified ✓ Subscribed ✓ Terms accepted (60 days ago)');
        $this->command->info('');
        $this->command->info('2. jane.business@gmail.com / Business2@456');
        $this->command->info('   ✓ Verified ✗ Not subscribed ✓ Terms accepted (45 days ago)');
        $this->command->info('');
        $this->command->info('3. robert.business@gmail.com / Business3@789');
        $this->command->info('   ✗ Not verified ✓ Subscribed ✗ Terms not accepted');
        $this->command->info('');
        $this->command->info('4. emily.business@gmail.com / Business4@012');
        $this->command->info('   ✗ Not verified ✗ Not subscribed ✓ Terms accepted (7 days ago)');
        $this->command->info('');
        $this->command->info('=====================================================');
        $this->command->info('Summary:');
        $this->command->info('- 5 users accepted terms and conditions');
        $this->command->info('- 1 user did NOT accept terms and conditions (Robert)');
        $this->command->info('- Various acceptance dates for realistic testing');
    }
}
