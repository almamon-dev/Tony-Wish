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
        Schema::create('rec_occup_health_surv', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->date('last_review_date')->nullable();
            $table->integer('default_renewal_period')->default(6);
            $table->string('unit')->default('Years');
            $table->string('verified_by')->nullable();
            $table->date('with_date')->nullable();
            $table->string('status')->default('Draft');
            $table->timestamps();
        });

        Schema::create('rec_occup_health_surv_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surv_id')->constrained('rec_occup_health_surv')->onDelete('cascade');
            $table->string('employee_name')->nullable();
            $table->string('staff_no')->nullable();
            $table->string('job_role')->nullable();
            $table->string('exposure_type')->nullable();
            $table->string('assessor')->nullable();
            $table->text('findings')->nullable();
            $table->string('follow_up_required')->nullable();
            $table->text('notes')->nullable();
            $table->date('date_of_assessment')->nullable();
            $table->date('next_due')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_occup_health_surv_items');
        Schema::dropIfExists('rec_occup_health_surv');
    }
};
