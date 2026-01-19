<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_review_job_cards', function (Blueprint $table) {
            $table->id();

            // Header Info
            $table->string('record_no')->default('REC-08');
            $table->string('title')->default('Project Review Job Card');
            $table->date('revision_date')->nullable();
            $table->text('clauses')->nullable();

            // Section 1: Project Details (Weld Procedure WP + WPQS)
            $table->string('customer')->nullable();
            $table->string('job_no')->nullable();
            $table->string('drawing_no')->nullable();
            $table->string('rev')->nullable();
            $table->string('en1090')->nullable();
            $table->string('exe_class')->nullable();
            $table->string('design_by')->nullable();
            $table->string('drawings_by')->nullable();
            $table->string('material_grades')->nullable();
            $table->string('weld_types')->nullable();
            $table->string('bolts')->nullable();
            $table->string('weld_inspection')->nullable();
            $table->string('sub_contract')->nullable();
            $table->string('standard_itp')->nullable();
            $table->string('galvanising')->nullable();
            $table->string('ncr_reqd')->nullable();
            $table->string('paint')->nullable();
            $table->string('special_reqt')->nullable();

            $table->json('process_steps')->nullable();

            // Paint Monitoring Fields
            $table->string('wft')->nullable();
            $table->string('dft')->nullable();
            $table->string('temp')->nullable();
            $table->string('humidity')->nullable();

            // Footer Section
            $table->text('comments')->nullable();
            $table->string('office_signature')->nullable();
            $table->date('office_sign_off_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_review_job_cards');
    }
};
