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
        Schema::create('administrator_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // Foreign key to business_owner who added this administrator
            $table->foreignId('administrator_id')->constrained('users')->onDelete('cascade');

            // Basic Information (from Basic Info tab)
            $table->string('phone_number')->nullable();
            $table->string('employee_id')->nullable()->unique();
            $table->date('start_date')->nullable();

            // Department & Role (from Role & Access tab)
            $table->string('department')->nullable();
            $table->string('role')->nullable();
            $table->string('position_title')->nullable();
            $table->string('reporting_to')->nullable();

            // Access Permissions (from Role & Access tab - as JSON array)
            $table->boolean('view_report')->default(false);
            $table->boolean('upload_document')->default(false);
            $table->boolean('edit_procedure')->default(false);
            $table->boolean('manage_task')->default(false);

            // Location & Preferences (from Additional tab)
            $table->string('office_location')->nullable();
            $table->string('time_zone')->default('UTC');
            $table->string('preferred_language')->default('English');
            $table->text('additional_notes')->nullable();

            // Account Settings
            $table->boolean('welcome_email_sent')->default(false);
            $table->boolean('password_change_required')->default(false);

            // Status tracking
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrator_users');
    }
};
