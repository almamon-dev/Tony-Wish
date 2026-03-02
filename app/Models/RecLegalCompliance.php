<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecLegalCompliance extends Model
{
    use HasFactory;

    protected $fillable = [
        'regulation',
        'department',
        'status',
        'evidence',
        'responsible_person',
        'notes',
        'frequency',
        'next_review',
        'document',
        'business_owner_id'
    ];

    protected $casts = [
        'next_review' => 'date'
    ];
}
