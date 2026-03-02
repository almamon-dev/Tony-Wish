<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecApprovedSupplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'service',
        'en1090',
        'iso9001',
        'iso14001',
        'iso45001',
        'expiry_date',
        'comments',
        'business_owner_id'
    ];

    protected $casts = [
        'iso9001' => 'boolean',
        'iso14001' => 'boolean',
        'iso45001' => 'boolean',
        'expiry_date' => 'date'
    ];
}
