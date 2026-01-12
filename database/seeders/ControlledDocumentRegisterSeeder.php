<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ControlledDocumentRegisterSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['record_no' => 'REC-01', 'document_title' => 'Controlled Document Register'],
            ['record_no' => 'REC-02', 'document_title' => 'Personnel Structure & Responsibilities'],
            ['record_no' => 'REC-03', 'document_title' => 'Training & Competence Register'],
            ['record_no' => 'REC-05', 'document_title' => 'Maintenance & Calibration'],
            ['record_no' => 'REC-06', 'document_title' => 'Inspection & Test Plan'],
            ['record_no' => 'REC-07', 'document_title' => 'Welding Specifications and Qualifications'],
            ['record_no' => 'REC-08', 'document_title' => 'Project Review & Job Card'],
            ['record_no' => 'REC-09', 'document_title' => 'Approved Supplier'],
            ['record_no' => 'REC-10', 'document_title' => 'Purchase Order'],
            ['record_no' => 'REC-11', 'document_title' => 'Delivery Note'],
            ['record_no' => 'REC-12', 'document_title' => 'Declaration of Performance (DoP)'],
            ['record_no' => 'REC-13', 'document_title' => 'Non-Conformance Register'],
            ['record_no' => 'REC-14', 'document_title' => 'Customer Feedback'],
            ['record_no' => 'REC-15', 'document_title' => 'Company Policies'],
            ['record_no' => 'REC-16', 'document_title' => 'Compliance Register'],
            ['record_no' => 'REC-17', 'document_title' => 'Internal Audit'],
            ['record_no' => 'REC-18', 'document_title' => 'Management Review & Risk Objectives Record'],
            ['record_no' => 'REC-19', 'document_title' => 'Aspects, Hazards, and Impacts Register'],
            ['record_no' => 'REC-20', 'document_title' => 'Significant Procedures'],
            ['record_no' => 'REC-21', 'document_title' => 'Emergency Readiness'],
            ['record_no' => 'REC-22', 'document_title' => 'Monitor & Measure'],
            ['record_no' => 'REC-23', 'document_title' => 'Incident Investigation Report'],
            ['record_no' => 'REC-24', 'document_title' => 'Waste Handling'],
            ['record_no' => 'REC-25', 'document_title' => 'Permit to Work'],
            ['record_no' => 'REC-26', 'document_title' => 'Emergency Drill'],
            ['record_no' => 'REC-27', 'document_title' => 'Monitoring'],
            ['record_no' => 'REC-28', 'document_title' => 'Occupational Health Survey Log'],
            ['record_no' => 'REC-29', 'document_title' => 'Safety Equipment Checklist'],
            ['record_no' => 'REC-30', 'document_title' => 'Project Folders'],
        ];

        foreach ($data as $item) {
            DB::table('controlled_document_registers')->insert([
                'record_no' => $item['record_no'],
                'document_title' => $item['document_title'],

                // standards (default false)
                'en_1090' => false,
                'iso_9001' => false,
                'iso_14001' => false,
                'iso_45001' => false,
                'en_15085' => false,
                'nhss_20' => false,
                'modification_date' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
