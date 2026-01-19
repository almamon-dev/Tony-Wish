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
        Schema::create('communication_plans', function (Blueprint $table) {
            $table->id();
            $table->string('record_no')->default('REC-09');
            $table->string('title')->default('Communication Plan');
            $table->date('revision_date')->nullable();
            $table->text('clauses')->nullable();
            // Core Communication Fields
            $table->string('company_name')->nullable();
            $table->text('service_description')->nullable();
            $table->json('communication_plans_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('communication_plans');
    }
};
