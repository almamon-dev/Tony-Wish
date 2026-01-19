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
        Schema::create('competence_registers', function (Blueprint $table) {
            $table->id();
            $table->string('record_no')->default('REC-03');
            $table->string('title')->default('Training & Competence Register');
            $table->date('revision_date')->nullable();
            $table->string('name');
            $table->string('position');
            $table->string('overall_competence')->default('High');
            $table->text('clauses')->nullable();
            $table->json('register_data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competence_registers');
    }
};
