<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectReviewJobCard extends Model
{
    use HasFactory;

    protected $table = 'project_review_job_cards';

    protected $fillable = [
        'record_no',
        'title',
        'revision_date',
        'clauses',
        'customer',
        'job_no',
        'drawing_no',
        'rev',
        'en1090',
        'exe_class',
        'design_by',
        'drawings_by',
        'material_grades',
        'weld_types',
        'bolts',
        'weld_inspection',
        'sub_contract',
        'standard_itp',
        'galvanising',
        'ncr_reqd',
        'paint',
        'special_reqt',
        'process_steps',
        'wft',
        'dft',
        'temp',
        'humidity',
        'comments',
        'office_signature',
        'office_sign_off_date',
    ];

    protected $casts = [
        'revision_date' => 'date',
        'office_sign_off_date' => 'date',
        'process_steps' => 'array',
    ];

    public function getFormattedRevisionDateAttribute()
    {
        return $this->revision_date ? $this->revision_date->format('l, F j, Y') : null;
    }
}
