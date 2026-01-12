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
        Schema::create('personnel_structure_responsibilities', function (Blueprint $table) {
            $table->id();
            $table->string('record_no')->default('REC-02');
            $table->string('title')->default('Personnel Structure & Responsibilities');
            $table->date('revision_date')->default('2025-09-01');
            $table->text('clauses')->nullable();
            $table->json('roles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnel_structure_responsibilities');
    }
};
