<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\RecWelderQualification;

class RecWelder extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'business_owner_id',
    ];

    public function qualifications()
    {
        return $this->hasMany(RecWelderQualification::class, 'welder_id');
    }
}
