<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    protected $fillable = [
        'name', 'iso_standard', 'priority_level', 'category',
        'due_date', 'description', 'objectives', 'scope', 'status',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    public function checklistItems()
    {
        return $this->hasMany(ProcedureChecklist::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'procedure_assign_members', 'procedure_id', 'user_id');
    }

    public function milestones()
    {
        return $this->hasMany(ProcedureMilestones::class);
    }

    public function files()
    {
        return $this->hasMany(ProcedureFile::class, 'procedure_id');
    }
}
