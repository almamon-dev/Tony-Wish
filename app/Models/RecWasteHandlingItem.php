<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecWasteHandlingItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'waste_handling_id',
        'waste_type',
        'quantity',
        'disposal_method',
        'contractor',
        'notes_number',
        'date',
    ];

    public function wasteHandling()
    {
        return $this->belongsTo(RecWasteHandling::class, 'waste_handling_id');
    }
}
