<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecWelderQualification extends Model
{
    use HasFactory;

    protected $fillable = [
        'welder_id',
        'procedure_id',
        'qual_type',
        'expiry_date',
        'business_owner_id',
    ];

    protected $casts = [
        'expiry_date' => 'date',
    ];
}
