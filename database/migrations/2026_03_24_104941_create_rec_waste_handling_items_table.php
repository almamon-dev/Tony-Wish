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
        Schema::create('rec_waste_handling_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('waste_handling_id')->constrained('rec_waste_handlings')->onDelete('cascade');
            $table->string('waste_type')->nullable();
            $table->string('quantity')->nullable();
            $table->string('disposal_method')->nullable();
            $table->string('contractor')->nullable();
            $table->string('notes_number')->nullable();
            $table->date('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_waste_handling_items');
    }
};
