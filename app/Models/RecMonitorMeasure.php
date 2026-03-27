<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecMonitorMeasure extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_owner_id',
        'last_review_date',
        'renewal_period',
        'renewal_unit',
        'verified_by',
        'with_date',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(RecMonitorMeasureItem::class, 'monitor_measure_id');
    }
}
