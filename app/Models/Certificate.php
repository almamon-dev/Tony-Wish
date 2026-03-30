<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'certificate_id',
        'user_id',
        'procedure_id',

        'iso_standard',
        'certificate_type',
        'compliance_level',
        'audit_score',
        'achievements',
        'internal_notes',
        'issued_to',
        'email',
        'employee_id',
        'issued_date',
        'expiry_date',
        'status',
        'company_id',
        'created_by',
    ];


    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
