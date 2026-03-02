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
        Schema::create('rec_aspects_hazards_registers', function (Blueprint $table) {
            $table->id();
            $table->string('aspect')->nullable();
            $table->string('hazard')->nullable();
            $table->string('impact')->nullable();
            $table->string('risk_rating')->nullable();
            $table->string('control_measures')->nullable();
            $table->string('average_risk')->nullable();
            $table->date('date')->nullable();
            $table->date('next_review')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_aspects_hazards_registers');
    }
};
