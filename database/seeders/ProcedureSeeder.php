<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProcedureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owner = \App\Models\User::where('user_type', 'business_owner')->first();
        if (!$owner) return;
        
        $company = \App\Models\Company::where('user_id', $owner->id)->first();
        if (!$company) return;

        $admin = \App\Models\User::where('user_type', 'administrator')->first();

        \App\Models\Procedure::create([
            'name' => 'ISO 9001 Quality Management',
            'iso_standard' => 'ISO 9001',
            'category' => 'Quality',
            'priority' => 'high',
            'due_date' => now()->addDays(30),
            'description' => 'Standard procedure for quality management.',
            'assigned_to' => $admin ? $admin->id : $owner->id,
            'company_id' => $company->id,
            'created_by' => $owner->id,
            'status' => 'in_progress',
            'progress' => 65,
        ]);

        \App\Models\Procedure::create([
            'name' => 'ISO 14001 Environmental Management',
            'iso_standard' => 'ISO 14001',
            'category' => 'Environmental',
            'priority' => 'medium',
            'due_date' => now()->addDays(45),
            'description' => 'Environmental compliance procedure.',
            'assigned_to' => $admin ? $admin->id : $owner->id,
            'company_id' => $company->id,
            'created_by' => $owner->id,
            'status' => 'pending',
            'progress' => 0,
        ]);
        
        \App\Models\Procedure::create([
            'name' => 'Security Audit Procedure',
            'iso_standard' => 'ISO 27001',
            'category' => 'Security',
            'priority' => 'high',
            'due_date' => now()->subDays(5),
            'description' => 'Internal security audit.',
            'assigned_to' => $admin ? $admin->id : $owner->id,
            'company_id' => $company->id,
            'created_by' => $owner->id,
            'status' => 'completed',
            'progress' => 100,
        ]);
    }
}
