<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecMonitoringItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'monitoring_id',
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

    public function monitoring()
    {
        return $this->belongsTo(RecMonitoring::class, 'monitoring_id');
    }
}
