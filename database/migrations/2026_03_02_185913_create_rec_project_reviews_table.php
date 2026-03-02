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
        Schema::create('rec_project_reviews', function (Blueprint $table) {
            $table->id();
            $table->string('customer')->nullable();
            $table->string('drawings_no')->nullable();
            $table->string('price')->nullable();
            $table->string('en1090')->nullable();
            $table->string('material_grades')->nullable();
            $table->string('bolts')->nullable();
            $table->string('sub_contract')->nullable();
            $table->string('galvanizing')->nullable();
            $table->string('paint')->nullable();
            $table->string('job_no')->nullable();
            $table->date('order_date')->nullable();
            $table->date('est_completion')->nullable();
            $table->string('weld_types')->nullable();
            $table->string('weld_inspection')->nullable();
            $table->string('module_itp')->nullable();
            $table->string('ncr_reqd')->nullable();
            $table->string('special_reqd')->nullable();
            $table->string('audit_monitoring_mpi')->nullable();
            $table->string('audit_monitoring_dpi')->nullable();
            $table->string('audit_monitoring_mag')->nullable();
            $table->string('audit_monitoring_hardality')->nullable();
            $table->string('workshop_shipping_v1')->nullable();
            $table->string('workshop_shipping_v2')->nullable();
            $table->date('workshop_shipping_date')->nullable();
            $table->text('comments')->nullable();
            $table->string('office_sign_off')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_project_reviews');
    }
};
