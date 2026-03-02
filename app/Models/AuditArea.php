<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditArea extends Model
{
    protected $fillable = [
        'pre_audit_checklist_id',
        'name',
    ];

    public function checklist()
    {
        return $this->belongsTo(PreAuditChecklist::class, 'pre_audit_checklist_id');
    }

    public function items()
    {
        return $this->hasMany(AuditItem::class, 'audit_area_id');
    }
}
