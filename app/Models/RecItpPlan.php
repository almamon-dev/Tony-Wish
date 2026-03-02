<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecItpPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'operation_activity',
        'controlling_documents',
        'acceptance_criteria',
        'verifying_document',
        'inspection_points_internal',
        'inspection_points_external',
        'business_owner_id',
    ];
}
