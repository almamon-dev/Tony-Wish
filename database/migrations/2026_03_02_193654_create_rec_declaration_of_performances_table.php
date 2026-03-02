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
        Schema::create('rec_declaration_of_performances', function (Blueprint $table) {
            $table->id();
            $table->string('ukca_mark')->nullable();
            $table->text('manufacturer')->nullable();
            $table->string('product_identification')->nullable();
            $table->text('intended_use')->nullable();
            $table->text('declared_performance')->nullable();
            $table->text('notified_body')->nullable();
            $table->string('dop_reference')->nullable();
            $table->date('date_of_ukca_marking')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_declaration_of_performances');
    }
};
