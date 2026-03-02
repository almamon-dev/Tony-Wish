<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecManagementReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'last_review_date',
        'renewal_period',
        'link',
        'next_review_date',
        'verified_by',
        'with_date',
        'verified_status',
        'business_owner_id'
    ];

    protected $casts = [
        'last_review_date' => 'date',
        'next_review_date' => 'date',
        'with_date' => 'date',
    ];

    public function agendas()
    {
        return $this->hasMany(RecManagementReviewAgenda::class, 'management_review_id');
    }

    public function objectives()
    {
        return $this->hasMany(RecManagementReviewObjective::class, 'management_review_id');
    }

    public function risks()
    {
        return $this->hasMany(RecManagementReviewRisk::class, 'management_review_id');
    }
}
