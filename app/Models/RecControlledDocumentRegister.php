<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecControlledDocumentRegister extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_number',
        'document_title',
        'current_revision',
        'revision_date',
        'location',
        'process_owner',
        'next_review_date',
        'document_link',
        'business_owner_id'
    ];

    protected $casts = [
        'revision_date' => 'date',
        'next_review_date' => 'date',
    ];
}
