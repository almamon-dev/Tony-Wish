<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecToolboxTalk extends Model
{
    use HasFactory;

    protected $fillable = [
        'meeting_date',
        'type',
        'topic',
        'facilitator',
        'attendees',
        'actions_raised',
        'notes',
        'next_review_due',
        'business_owner_id',
    ];

    protected $casts = [
        'meeting_date' => 'date',
        'next_review_due' => 'date',
    ];
}
