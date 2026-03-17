<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecOccupHealthSurv extends Model
{
    use HasFactory;

    protected $table = 'rec_occup_health_surv';

    protected $fillable = [
        'business_owner_id',
        'last_review_date',
        'default_renewal_period',
        'unit',
        'verified_by',
        'with_date',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(RecOccupHealthSurvItem::class, 'surv_id');
    }
}
