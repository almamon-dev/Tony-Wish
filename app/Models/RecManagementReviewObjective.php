<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecManagementReviewObjective extends Model
{
    use HasFactory;

    protected $fillable = [
        'management_review_id',
        'obj',
        'ref',
        'review',
        'evidence',
        'status',
    ];
}
