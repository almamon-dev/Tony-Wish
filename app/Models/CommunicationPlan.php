<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunicationPlan extends Model
{
    use HasFactory;

    protected $table = 'communication_plans';

    protected $fillable = [
        'record_no',
        'title',
        'revision_date',
        'clauses',
        'company_name',
        'service_description',
        'communication_plans_data',
    ];

    protected $casts = [
        'revision_date' => 'date',
        'communication_plans_data' => 'array',
    ];

    public function getFormattedRevisionDateAttribute()
    {
        return $this->revision_date ? $this->revision_date->format('l, F j, Y') : null;
    }
}
