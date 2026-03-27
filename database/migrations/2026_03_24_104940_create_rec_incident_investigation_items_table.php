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
        Schema::create('rec_incident_investigation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('incident_id')->constrained('rec_incident_investigations')->onDelete('cascade');
            $table->date('occurrence_date')->nullable();
            $table->string('location')->nullable();
            $table->text('incident_description')->nullable();
            $table->text('immediate_action')->nullable();
            $table->text('root_cause')->nullable();
            $table->text('corrective_action')->nullable();
            $table->text('preventive_action')->nullable();
            $table->text('notes')->nullable();
            $table->date('forecasted_closure_date')->nullable();
            $table->string('closed')->default('No');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_incident_investigation_items');
    }
};
