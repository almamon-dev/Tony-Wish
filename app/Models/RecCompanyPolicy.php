<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecCompanyPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_owner_id',
        'policy_type',
        'company_name',
        'content',
        'approved_by',
        'signature',
        'position',
        'date',
    ];

    public function businessOwner()
    {
        return $this->belongsTo(User::class, 'business_owner_id');
    }
}
