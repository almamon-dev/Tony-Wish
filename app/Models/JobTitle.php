<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobTitle extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'business_owner_id',
    ];

    public function businessOwner()
    {
        return $this->belongsTo(User::class, 'business_owner_id');
    }
}
