<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecSafetyChecklist extends Model
{
    use HasFactory;

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
        return $this->hasMany(RecSafetyChecklistItem::class, 'checklist_id');
    }
}
