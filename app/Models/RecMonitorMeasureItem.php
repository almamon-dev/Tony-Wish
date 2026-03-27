<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecMonitorMeasureItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'monitor_measure_id',
        'parameter',
        'unit',
        'method',
        'result',
        'limit',
        'action_required',
        'notes',
        'frequency',
        'next_review_due',
    ];

    public function monitorMeasure()
    {
        return $this->belongsTo(RecMonitorMeasure::class, 'monitor_measure_id');
    }
}
