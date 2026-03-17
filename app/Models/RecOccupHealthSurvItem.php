<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecOccupHealthSurvItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'surv_id',
        'employee_name',
        'staff_no',
        'job_role',
        'exposure_type',
        'assessor',
        'findings',
        'follow_up_required',
        'notes',
        'date_of_assessment',
        'next_due',
    ];

    public function surv()
    {
        return $this->belongsTo(RecOccupHealthSurv::class, 'surv_id');
    }
}
