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
        Schema::create('rec_company_policies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->string('policy_type'); // iso_9001, iso_14001, iso_45001
            $table->string('company_name')->nullable();
            $table->text('content')->nullable();
            $table->string('approved_by')->nullable();
            $table->string('signature')->nullable();
            $table->string('position')->nullable();
            $table->date('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_company_policies');
    }
};
