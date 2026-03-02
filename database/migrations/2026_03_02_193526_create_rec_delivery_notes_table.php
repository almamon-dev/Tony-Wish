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
        Schema::create('rec_delivery_notes', function (Blueprint $table) {
            $table->id();
            $table->string('job_number')->nullable();
            $table->string('supplier')->nullable();
            $table->string('customer')->nullable();
            $table->text('description')->nullable();
            $table->string('qty')->nullable();
            $table->date('delivery_date')->nullable();
            $table->string('received_by')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_delivery_notes');
    }
};
