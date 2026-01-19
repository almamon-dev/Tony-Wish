<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeldingSpecification extends Model
{
    protected $fillable = [
        'record_no', 'title', 'revision_date', 'name', 'clauses', 'welding_specifications_data',
    ];

    protected $casts = [
        'welding_specifications_data' => 'array',
        'revision_date' => 'date',
    ];

    // Revision Date Format: Monday, September 1, 2025
    public function getFormattedRevisionDateAttribute()
    {
        return $this->revision_date->format('l, F j, Y');
    }
}
