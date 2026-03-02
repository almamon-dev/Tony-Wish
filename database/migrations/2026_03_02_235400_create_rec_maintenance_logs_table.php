<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_maintenance_logs', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // Service or Calibration
            $table->string('description')->nullable();
            $table->string('serial_no')->nullable();
            $table->string('location')->nullable();
            $table->text('notes')->nullable();
            $table->date('last_service_date')->nullable();
            $table->date('next_due_date')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_maintenance_logs');
    }
};
