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
        Schema::create('rec_approved_suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('company')->nullable();
            $table->string('service')->nullable();
            $table->string('en1090')->nullable();
            $table->boolean('iso9001')->default(false);
            $table->boolean('iso14001')->default(false);
            $table->boolean('iso45001')->default(false);
            $table->date('expiry_date')->nullable();
            $table->text('comments')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_approved_suppliers');
    }
};
