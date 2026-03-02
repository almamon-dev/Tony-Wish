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
        Schema::create('rec_purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('company')->nullable();
            $table->string('supplier')->nullable();
            $table->string('del_address')->nullable();
            $table->string('po_number')->nullable();
            $table->string('job_number')->nullable();
            $table->date('date')->nullable();
            $table->text('notes')->nullable();
            $table->string('ordered_by')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_purchase_orders');
    }
};
