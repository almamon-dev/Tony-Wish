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
        Schema::create('rec_emergency_drills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->date('last_review_date')->nullable();
            $table->integer('default_renewal_period')->default(6);
            $table->string('unit')->default('Months');
            $table->string('verified_by')->nullable();
            $table->date('with_date')->nullable();
            $table->string('status')->default('Draft');
            $table->timestamps();
        });

        Schema::create('rec_emergency_drill_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('drill_id')->constrained('rec_emergency_drills')->onDelete('cascade');
            $table->string('drill_type')->nullable();
            $table->integer('participants')->nullable();
            $table->string('outcome')->nullable();
            $table->text('issues_found')->nullable();
            $table->text('follow_up_action')->nullable();
            $table->text('notes')->nullable();
            $table->date('date')->nullable();
            $table->date('next_drill_due')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_emergency_drill_items');
        Schema::dropIfExists('rec_emergency_drills');
    }
};
