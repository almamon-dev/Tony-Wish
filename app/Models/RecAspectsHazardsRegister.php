<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecAspectsHazardsRegister extends Model
{
    use HasFactory;

    protected $fillable = [
        'aspect',
        'hazard',
        'impact',
        'risk_rating',
        'control_measures',
        'average_risk',
        'date',
        'next_review',
        'business_owner_id'
    ];

    protected $casts = [
        'date' => 'date',
        'next_review' => 'date',
    ];
}
