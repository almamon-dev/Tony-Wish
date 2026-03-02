<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecMaintenanceLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'description',
        'serial_no',
        'location',
        'notes',
        'last_service_date',
        'next_due_date',
        'business_owner_id',
    ];

    protected $casts = [
        'last_service_date' => 'date',
        'next_due_date' => 'date',
    ];
}
