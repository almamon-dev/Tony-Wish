<?php

namespace Database\Seeders;

use App\Models\PersonnelStructureResponsibility;
use Illuminate\Database\Seeder;

class PersonnelStructureResponsibilitySeeder extends Seeder
{
    public function run(): void
    {
        PersonnelStructureResponsibility::create([
            'record_no' => 'REC-02',
            'title' => 'Personnel Structure & Responsibilities',
            'revision_date' => '2025-09-01',
            'clauses' => 'EN 1090 FPC, ISO 9001:2015 Clause 5.3, ISO 14001:2015 Clause 5.3, ISO 45001:2018 Clause 5.3',
            'roles' => [
                [
                    'job_title' => 'Managing Director (MD)',
                    'responsibilities' => 'Leads company strategy, governance, and high-level decision-making. Oversees financial performance, stakeholder engagement, and regulatory compliance. Sets long-term goals and ensures alignment across departments.',
                    'qty' => 1,
                ],
                [
                    'job_title' => 'Production Manager',
                    'responsibilities' => 'Oversees all production activities, manages teams, ensures output meets quality and delivery standards, and resolves operational issues. Implements production plans, monitors KPIs, and drives continuous improvement. Coordinates with QA, planning, and commercial departments to ensure alignment.',
                    'qty' => 1,
                ],
                [
                    'job_title' => 'Admin',
                    'responsibilities' => 'Provides administrative support across departments, including document handling, scheduling, filing, and internal communications. Maintains controlled records, assists with audit preparation, updates registers, and supports coordination between teams. Ensures documentation is correctly formatted, stored, and retrievable in line with PR-01 Document Control.',
                    'qty' => 2,
                ],
                [
                    'job_title' => 'Responsible Welding Coordinator (RWC)',
                    'responsibilities' => 'Manages welding compliance, oversees welder qualifications, maintains WPQR/PQRs, and ensures adherence to EN 1090 and ISO 3834. Supports inspections and repairs.',
                    'qty' => 1,
                ],
                [
                    'job_title' => 'Inspection Technician',
                    'responsibilities' => 'Performs quality inspections using visual, dimensional, and instrument-based methods. Verifies compliance with specifications, records results, and flags non-conformances. Supports PR-05 and PR-06 inspection stages.',
                    'qty' => 1,
                ],
                [
                    'job_title' => 'Responsible Welding Coordinator',
                    'responsibilities' => 'Manages welding compliance, oversees welder qualifications, maintains WPQR/PQRs, and ensures adherence to EN 1090 and ISO 3834. Supports inspections and repairs.',
                    'qty' => 1,
                ],
                [
                    'job_title' => 'Plater',
                    'responsibilities' => 'Positions and aligns steel plates for welding or assembly. Reads drawings, prepares surfaces, and ensures correct fit-up. Supports fabrication teams and contributes to structural integrity.',
                    'qty' => 4,
                ],
                [
                    'job_title' => 'Welder (MIG/TIG/MMA)',
                    'responsibilities' => 'Welds components using MIG, TIG, and MMA techniques. Follows WPS, inspects own work, and ensures weld quality and traceability.',
                    'qty' => 3,
                ],
            ],
        ]);
    }
}
