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
        Schema::create('pre_audit_areas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pre_audit_checklist_id')->constrained()->onDelete('cascade');
            $table->string('area_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_audit_areas');
    }
};
