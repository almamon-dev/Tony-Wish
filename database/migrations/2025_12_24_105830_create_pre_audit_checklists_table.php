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
        Schema::create('pre_audit_checklists', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., ISO 9001 Pre-Audit Q4
            $table->string('iso_standard')->nullable();
            $table->string('audit_type')->nullable();
            $table->string('department')->nullable();
            $table->string('priority_level');
            $table->date('scheduled_date');
            $table->text('description')->nullable();
            $table->text('audit_objectives')->nullable();
            $table->timestamps();
            $table->enum('status', ['in_progress', 'completed', '', 'cancelled'])->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_audit_checklists');
    }
};
