<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_itp_plans', function (Blueprint $table) {
            $table->id();
            $table->text('operation_activity')->nullable();
            $table->text('controlling_documents')->nullable();
            $table->text('acceptance_criteria')->nullable();
            $table->text('verifying_document')->nullable();
            $table->text('inspection_points_internal')->nullable();
            $table->text('inspection_points_external')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_itp_plans');
    }
};
