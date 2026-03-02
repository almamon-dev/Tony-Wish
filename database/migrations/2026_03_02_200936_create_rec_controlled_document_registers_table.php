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
        Schema::create('rec_controlled_document_registers', function (Blueprint $table) {
            $table->id();
            $table->string('document_number');
            $table->string('document_title');
            $table->string('current_revision');
            $table->date('revision_date')->nullable();
            $table->string('location')->nullable();
            $table->string('process_owner')->nullable();
            $table->date('next_review_date')->nullable();
            $table->string('document_link')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_controlled_document_registers');
    }
};
