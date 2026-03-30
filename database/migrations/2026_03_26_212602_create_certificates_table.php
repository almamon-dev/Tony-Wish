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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('certificate_id')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('procedure_id')->constrained('procedures')->onDelete('cascade');

            $table->string('iso_standard')->nullable();
            $table->string('certificate_type')->nullable();
            $table->string('compliance_level')->nullable();
            $table->string('issued_to');
            $table->string('email')->nullable();
            $table->string('employee_id')->nullable();
            $table->date('issued_date');
            $table->date('expiry_date');
            $table->string('audit_score')->nullable();
            $table->text('achievements')->nullable();
            $table->text('internal_notes')->nullable();
            $table->string('status')->default('Active');
            $table->foreignId('company_id')->nullable()->constrained('companies')->onDelete('cascade');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
