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
        Schema::create('rec_legal_compliances', function (Blueprint $table) {
            $table->id();
            $table->string('regulation')->nullable();
            $table->string('department')->nullable();
            $table->string('status')->nullable();
            $table->text('evidence')->nullable();
            $table->string('responsible_person')->nullable();
            $table->text('notes')->nullable();
            $table->string('frequency')->nullable();
            $table->date('next_review')->nullable();
            $table->string('document')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_legal_compliances');
    }
};
