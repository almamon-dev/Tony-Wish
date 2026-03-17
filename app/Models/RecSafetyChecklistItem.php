<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecSafetyChecklistItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'checklist_id',
        'equipment_type',
        'location',
        'checked_by',
        'condition',
        'action_required',
        'notes',
        'date_checked',
        'next_review_due',
    ];

    public function checklist()
    {
        return $this->belongsTo(RecSafetyChecklist::class, 'checklist_id');
    }
}
