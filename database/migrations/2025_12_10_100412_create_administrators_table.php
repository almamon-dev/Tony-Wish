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
        Schema::create('administrators', function (Blueprint $table) {
            $table->id();
            // Foreign key to users table
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // Foreign key to business_owner who added this administrator
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');

            // Department information
            $table->string('department')->nullable();

            // Access level
            $table->enum('access_level', [
                'full_access', // All permissions
                'limited_access', // Limited permissions
                'read_only', // View only
            ])->default('limited_access');

            // Specific permissions
            $table->json('permissions')->nullable()->comment('JSON array of specific permissions');

            // Invitation status
            $table->enum('invitation_status', ['pending', 'accepted', 'expired'])->default('pending');
            $table->string('invitation_token')->nullable();
            $table->timestamp('invitation_sent_at')->nullable();
            $table->timestamp('invitation_accepted_at')->nullable();

            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            // Indexes
            $table->index('department');
            $table->index('access_level');
            $table->index('invitation_status');
            $table->index('business_owner_id');

            // Unique constraint to ensure one user can only be administrator for one business owner
            $table->unique(['user_id', 'business_owner_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrators');
    }
};
