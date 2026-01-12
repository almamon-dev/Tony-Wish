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
        Schema::create('controlled_document_registers', function (Blueprint $table) {
            $table->id();
            $table->string('record_no'); // REC-01
            $table->string('document_title');
            $table->boolean('en_1090')->default(false);
            $table->boolean('iso_9001')->default(false);
            $table->boolean('iso_14001')->default(false);
            $table->boolean('iso_45001')->default(false);
            $table->boolean('en_15085')->default(false);
            $table->boolean('nhss_20')->default(false);
            $table->date('modification_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('controlled_document_registers');
    }
};
