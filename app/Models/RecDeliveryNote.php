<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecDeliveryNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_number',
        'supplier',
        'customer',
        'description',
        'qty',
        'delivery_date',
        'received_by',
        'notes',
        'business_owner_id'
    ];

    protected $casts = [
        'delivery_date' => 'date'
    ];
}
