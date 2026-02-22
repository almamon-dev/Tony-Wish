<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    protected $fillable = [
        'name',
        'iso_standard',
        'category',
        'priority',
        'due_date',
        'description',
        'objectives',
        'scope',
        'assigned_to',
        'company_id',
        'created_by',
        'status',
        'progress',
    ];

    protected $casts = [
        'due_date' => 'date',
        'progress' => 'integer',
    ];

    public function assignedUser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function company(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
