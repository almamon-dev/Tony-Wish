<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecManagementReviewRisk extends Model
{
    use HasFactory;

    protected $fillable = [
        'management_review_id',
        'desc',
        'link',
        'unique',
        'risk_opp',
        'evidence',
        'owner',
        'status',
    ];
}
