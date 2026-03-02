<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecPersonnelStructure extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'responsibilities',
        'quantity',
        'business_owner_id',
    ];

    public function businessOwner()
    {
        return $this->belongsTo(User::class, 'business_owner_id');
    }
}
