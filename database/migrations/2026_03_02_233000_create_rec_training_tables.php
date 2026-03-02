<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_training_rows', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->string('competence')->default('Basic');
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('rec_training_columns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('rec_training_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('row_id')->constrained('rec_training_rows')->onDelete('cascade');
            $table->foreignId('column_id')->constrained('rec_training_columns')->onDelete('cascade');
            $table->string('value')->nullable(); // Can be a date string or 'N/A'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_training_values');
        Schema::dropIfExists('rec_training_columns');
        Schema::dropIfExists('rec_training_rows');
    }
};
