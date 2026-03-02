<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecManagementReviewAgenda extends Model
{
    use HasFactory;

    protected $fillable = [
        'management_review_id',
        'desc',
        'link',
        'unique',
        'evidence',
        'owner',
        'status',
    ];
}
