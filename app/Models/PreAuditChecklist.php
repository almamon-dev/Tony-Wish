<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreAuditChecklist extends Model
{
    protected $fillable = [
        'user_id', 'name', 'iso_standard', 'audit_type', 'department',
        'priority', 'scheduled_date', 'description', 'audit_objectives', 'status',
    ];

    public function areas()
    {
        return $this->hasMany(PreAuditArea::class);
    }

    public function teamMembers()
    {
        return $this->hasMany(PreAuditTeamMember::class);
    }
}
