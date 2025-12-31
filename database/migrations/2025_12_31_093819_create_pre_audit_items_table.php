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
        Schema::create('pre_audit_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pre_audit_area_id')->constrained()->onDelete('cascade');
            $table->string('item_name');
            $table->enum('severity', ['Critical', 'Major', 'Minor'])->default('Major');
            $table->boolean('is_required')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_audit_items');
    }
};
