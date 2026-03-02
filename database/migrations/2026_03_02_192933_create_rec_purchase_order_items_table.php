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
        Schema::create('rec_purchase_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_order_id')->constrained('rec_purchase_orders')->onDelete('cascade');
            $table->string('item_no')->nullable();
            $table->string('description')->nullable();
            $table->string('unit')->nullable();
            $table->decimal('qty', 10, 2)->nullable();
            $table->decimal('cost_each', 10, 2)->nullable();
            $table->decimal('total_cost', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_purchase_order_items');
    }
};
