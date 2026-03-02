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
            $table->string('name');
            $table->string('iso_standard');
            $table->string('audit_type');
            $table->string('department')->nullable();
            $table->string('priority')->default('Medium');
            $table->date('scheduled_date');
            $table->text('description')->nullable();
            $table->text('objectives')->nullable();
            $table->string('status')->default('In Progress');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
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
