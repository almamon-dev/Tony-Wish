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
        Schema::create('rec_management_reviews', function (Blueprint $table) {
            $table->id();
            $table->date('last_review_date')->nullable();
            $table->string('renewal_period')->default("Yearly");
            $table->string('link')->nullable();
            $table->date('next_review_date')->nullable();
            $table->string('verified_by')->nullable();
            $table->date('with_date')->nullable();
            $table->string('verified_status')->default('Draft');
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_management_reviews');
    }
};
