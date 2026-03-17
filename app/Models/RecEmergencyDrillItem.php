<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecEmergencyDrillItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'drill_id',
        'drill_type',
        'participants',
        'outcome',
        'issues_found',
        'follow_up_action',
        'notes',
        'date',
        'next_drill_due',
    ];

    public function drill()
    {
        return $this->belongsTo(RecEmergencyDrill::class, 'drill_id');
    }
}
