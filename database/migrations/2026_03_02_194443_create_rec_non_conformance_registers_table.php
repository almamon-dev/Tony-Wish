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
        Schema::create('rec_non_conformance_registers', function (Blueprint $table) {
            $table->id();
            $table->string('job_no')->nullable();
            $table->date('opened_date')->nullable();
            $table->string('nrp_type')->nullable(); // Supplier, Internal, etc.
            $table->text('issue_summary')->nullable();
            $table->text('root_cause')->nullable();
            $table->text('action_taken')->nullable();
            $table->string('action_person')->nullable();
            $table->string('status')->nullable();
            $table->boolean('closed')->default(false);
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_non_conformance_registers');
    }
};
