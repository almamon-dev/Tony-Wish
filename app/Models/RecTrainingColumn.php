<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecTrainingColumn extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'business_owner_id',
    ];
}
