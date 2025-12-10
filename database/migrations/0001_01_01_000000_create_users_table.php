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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('fname')->nullable();
            $table->string('lname')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            // Foreign key for business owner who added this user
            $table->foreignId('added_by')->nullable()->constrained('users')->onDelete('cascade');

            $table->enum('user_type', ['admin', 'business_owner', 'administrator'])->default('business_owner');
            $table->string('avatar')->nullable();

            // Password reset
            $table->string('reset_password_token', 80)->nullable();
            $table->dateTime('reset_password_token_expire_at')->nullable();

            // terms and conditions
            $table->boolean('terms_and_conditions')->default(false);
            $table->timestamp('terms_and_conditions_at')->nullable();

            // Subscription related
            $table->boolean('is_subscribed')->default(false);

            // User type and verification
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();

            // Remember token
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
