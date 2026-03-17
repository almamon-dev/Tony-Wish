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
        Schema::create('rec_safety_checklists', function (Blueprint $table) {
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

        Schema::create('rec_safety_checklist_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('checklist_id')->constrained('rec_safety_checklists')->onDelete('cascade');
            $table->string('equipment_type')->nullable();
            $table->string('location')->nullable();
            $table->string('checked_by')->nullable();
            $table->string('condition')->nullable();
            $table->string('action_required')->nullable();
            $table->text('notes')->nullable();
            $table->date('date_checked')->nullable();
            $table->date('next_review_due')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_safety_checklist_items');
        Schema::dropIfExists('rec_safety_checklists');
    }
};
