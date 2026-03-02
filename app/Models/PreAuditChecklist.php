<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreAuditChecklist extends Model
{
    protected $fillable = [
        'name',
        'iso_standard',
        'audit_type',
        'department',
        'priority',
        'scheduled_date',
        'description',
        'objectives',
        'status',
        'created_by',
    ];

    public function areas()
    {
        return $this->hasMany(AuditArea::class, 'pre_audit_checklist_id');
    }

    public function team()
    {
        return $this->hasMany(AuditTeam::class, 'pre_audit_checklist_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
