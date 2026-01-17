<?php

namespace Database\Seeders;

use App\Models\JobTitleManage;
use Illuminate\Database\Seeder;

class JobTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobTitles = [
            ['name' => 'Software Engineer', 'description' => 'Handles core software development.', 'status' => 1],
            ['name' => 'UI/UX Designer', 'description' => 'Designs user interfaces and experiences.', 'status' => 1],
            ['name' => 'Project Manager', 'description' => 'Manages project timelines and teams.', 'status' => 1],
            ['name' => 'Business Analyst', 'description' => 'Analyzes business needs and requirements.', 'status' => 1],
            ['name' => 'QA Engineer', 'description' => 'Responsible for software quality testing.', 'status' => 1],
            ['name' => 'Frontend Developer', 'description' => 'Builds the visual parts of applications.', 'status' => 1],
            ['name' => 'Backend Developer', 'description' => 'Manages server-side logic and databases.', 'status' => 1],
            ['name' => 'DevOps Engineer', 'description' => 'Handles deployment and infrastructure.', 'status' => 1],
            ['name' => 'HR Specialist', 'description' => 'Focuses on recruitment and employee care.', 'status' => 1],
            ['name' => 'Accountant', 'description' => 'Manages company finances and payroll.', 'status' => 1],
            ['name' => 'Marketing Manager', 'description' => 'Leads digital marketing strategies.', 'status' => 1],
            ['name' => 'Content Writer', 'description' => 'Creates content for blogs and websites.', 'status' => 1],
            ['name' => 'Data Scientist', 'description' => 'Analyzes data for business insights.', 'status' => 1],
            ['name' => 'Office Admin', 'description' => 'Coordinates daily office operations.', 'status' => 1],
            ['name' => 'Sales Executive', 'description' => 'Handles client acquisition and sales.', 'status' => 1],
        ];

        foreach ($jobTitles as $title) {
            JobTitleManage::create($title);
        }
    }
}
