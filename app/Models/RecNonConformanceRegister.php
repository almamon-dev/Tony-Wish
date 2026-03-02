<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecNonConformanceRegister extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_no',
        'opened_date',
        'nrp_type',
        'issue_summary',
        'root_cause',
        'action_taken',
        'action_person',
        'status',
        'closed',
        'business_owner_id'
    ];

    protected $casts = [
        'opened_date' => 'date',
        'closed' => 'boolean'
    ];
}
