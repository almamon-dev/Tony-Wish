<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecIncidentInvestigationItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'incident_id',
        'occurrence_date',
        'location',
        'incident_description',
        'immediate_action',
        'root_cause',
        'corrective_action',
        'preventive_action',
        'notes',
        'forecasted_closure_date',
        'closed',
    ];

    public function investigation()
    {
        return $this->belongsTo(RecIncidentInvestigation::class, 'incident_id');
    }
}
