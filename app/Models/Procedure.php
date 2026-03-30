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
        'checklist',
        'milestones',
        'team_members',
        'uploaded_file_path',
        'uploaded_file_name',
        'uploaded_at',
    ];

    protected $casts = [
        'due_date' => 'date',
        'progress' => 'integer',
        'checklist' => 'array',
        'milestones' => 'array',
        'team_members' => 'array',
        'uploaded_at' => 'datetime',
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
