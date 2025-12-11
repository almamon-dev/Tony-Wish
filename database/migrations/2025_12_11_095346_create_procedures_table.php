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
        Schema::create('procedures', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('iso_standard')->nullable();
            $table->string('priority_level')->nullable();
            $table->text('description')->nullable();
            $table->text('objectives')->nullable();
            $table->text('scope')->nullable();

            // Milestones as JSON array
            $table->json('milestones')->nullable();

            // Checklist items as JSON array
            $table->json('checklist_items')->nullable();

            // Assigned team members as JSON array (user IDs or names)
            $table->json('assigned_team_members')->nullable();

            // Attached files info as JSON
            $table->string('attached_files')->nullable();

            $table->string('category')->nullable();
            $table->date('due_date')->nullable();
            $table->integer('progress')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procedures');
    }
};
