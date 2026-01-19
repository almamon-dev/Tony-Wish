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
        Schema::create('welding_specifications', function (Blueprint $table) {
            $table->id();
            $table->string('record_no')->default('REC-07');
            $table->string('title')->default('Welding Specifications and Qualifications');
            $table->date('revision_date')->nullable();
            $table->text('clauses')->nullable();
            $table->string('name');
            $table->json('welding_specifications_data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('welding_specifications');
    }
};
