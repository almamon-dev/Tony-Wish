<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ControlledDocumentRegisterSeeder extends Seeder
{
    public function run(): void
    {
        $revisionDate = Carbon::create(2025, 9, 1);

        $data = [
            ['record_no' => 'REC-01', 'title' => 'Controlled Document Register', 'standards' => ['en_1090', 'iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-02', 'title' => 'Personnel Structure & Responsibilities', 'standards' => ['en_1090', 'iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-03', 'title' => 'Training & Competence Register', 'standards' => ['en_1090', 'iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-04', 'title' => 'Toolbox Talks & Meetings', 'standards' => ['en_1090', 'iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-05', 'title' => 'Maintenance & Calibration', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-06', 'title' => 'Inspection & Test Plan', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-07', 'title' => 'Welding Specifications and Qualifications', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-08', 'title' => 'Project Review & Job Card', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-09', 'title' => 'Approved Supplier', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-10', 'title' => 'Purchase Order', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-11', 'title' => 'Delivery Note', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-12', 'title' => 'Declaration of Performance (DoP)', 'standards' => ['en_1090', 'iso_9001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-13', 'title' => 'Non-Conformance Reg', 'standards' => ['en_1090', 'iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-14', 'title' => 'Customer Feedback', 'standards' => ['en_1090', 'iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-15', 'title' => 'Company Policies', 'standards' => ['iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-16', 'title' => 'Compliance Register', 'standards' => ['iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-17', 'title' => 'Internal Audit', 'standards' => ['iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-18', 'title' => 'Management Review & Risk Objectives Record', 'standards' => ['iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
            ['record_no' => 'REC-19', 'title' => 'Aspects, Hazards, and Impacts Register', 'standards' => ['iso_14001', 'iso_45001']],
            ['record_no' => 'REC-20', 'title' => 'Significant Procedures', 'standards' => ['iso_14001', 'iso_45001']],
            ['record_no' => 'REC-21', 'title' => 'Emergency Readiness', 'standards' => ['iso_45001']],
            ['record_no' => 'REC-22', 'title' => 'Monitor & Measure', 'standards' => ['iso_45001']],
            ['record_no' => 'REC-23', 'title' => 'Incident Investigation Report', 'standards' => ['iso_14001', 'iso_45001']],
            ['record_no' => 'REC-24', 'title' => 'Waste Handling', 'standards' => ['iso_14001']],
            ['record_no' => 'REC-25', 'title' => 'Permit to Work', 'standards' => ['iso_14001']],
            ['record_no' => 'REC-26', 'title' => 'Emergency Drill', 'standards' => ['iso_14001', 'iso_45001']],
            ['record_no' => 'REC-27', 'title' => 'Monitoring', 'standards' => ['iso_45001']],
            ['record_no' => 'REC-28', 'title' => 'Occup Health Surv Log', 'standards' => ['iso_45001']],
            ['record_no' => 'REC-29', 'title' => 'Safety Equipment Checklist', 'standards' => ['iso_45001']],
            ['record_no' => 'REC-30', 'title' => 'Project Folders', 'standards' => ['en_1090', 'iso_9001', 'iso_14001', 'iso_45001', 'en_15085', 'nhss_20']],
        ];

        foreach ($data as $item) {
            DB::table('controlled_document_registers')->insert([
                'record_no' => $item['record_no'],
                'document_title' => $item['title'],
                'en_1090' => in_array('en_1090', $item['standards']),
                'iso_9001' => in_array('iso_9001', $item['standards']),
                'iso_14001' => in_array('iso_14001', $item['standards']),
                'iso_45001' => in_array('iso_45001', $item['standards']),
                'en_15085' => in_array('en_15085', $item['standards']),
                'nhss_20' => in_array('nhss_20', $item['standards']),
                'revision_date' => $revisionDate,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
