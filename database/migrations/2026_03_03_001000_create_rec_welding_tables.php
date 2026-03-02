<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Weld Procedures (Columns)
        Schema::create('rec_weld_procedures', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('Fillet Weld');
            $table->string('reference')->nullable();
            $table->string('process')->default('MIG');
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        // 2. Welders (Rows)
        Schema::create('rec_welders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        // 3. Qualifications (Cells)
        Schema::create('rec_welder_qualifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('welder_id')->constrained('rec_welders')->onDelete('cascade');
            $table->foreignId('procedure_id')->constrained('rec_weld_procedures')->onDelete('cascade');
            $table->string('qual_type'); // prolongation or re-test
            $table->date('expiry_date')->nullable();
            $table->foreignId('business_owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rec_welder_qualifications');
        Schema::dropIfExists('rec_welders');
        Schema::dropIfExists('rec_weld_procedures');
    }
};
