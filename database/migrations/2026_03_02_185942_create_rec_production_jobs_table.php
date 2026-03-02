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
        Schema::create('rec_production_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_review_id')->constrained('rec_project_reviews')->onDelete('cascade');
            $table->string('process');
            $table->string('name')->nullable();
            $table->string('signature')->nullable();
            $table->date('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_production_jobs');
    }
};
