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
        Schema::create('rec_management_review_objectives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('management_review_id')->constrained('rec_management_reviews')->onDelete('cascade');
            $table->text('obj')->nullable();
            $table->string('ref')->nullable();
            $table->string('review')->nullable();
            $table->text('evidence')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_management_review_objectives');
    }
};
