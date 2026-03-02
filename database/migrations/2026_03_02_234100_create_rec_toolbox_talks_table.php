<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rec_toolbox_talks', function (Blueprint $table) {
            $table->id();
            $table->date('meeting_date');
            $table->string('type');
            $table->string('topic')->nullable();
            $table->string('facilitator')->nullable();
            $table->integer('attendees')->default(0);
            $table->integer('actions_raised')->default(0);
            $table->text('notes')->nullable();
            $table->date('next_review_due')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_toolbox_talks');
    }
};
