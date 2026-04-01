<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owner = User::where('email', 'owner@gmail.com')->first();
        if (! $owner) {
            return;
        }

        $plan = $owner->plan;

        Invoice::updateOrCreate(
            ['invoice_number' => 'INV-2026-001'],
            [
                'user_id' => $owner->id,
                'plan_id' => $plan ? $plan->id : null,
                'amount' => $plan ? $plan->price : 0,
                'vat' => $plan ? ($plan->price * 0.2) : 0,
                'total' => $plan ? ($plan->price * 1.2) : 0,
                'status' => 'paid',
                'paid_at' => now()->subMonth(),
            ]
        );
    }
}
