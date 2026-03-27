<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecWasteHandling extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_owner_id',
        'last_review_date',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(RecWasteHandlingItem::class, 'waste_handling_id');
    }
}
