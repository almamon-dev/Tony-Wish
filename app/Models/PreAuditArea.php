<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreAuditArea extends Model
{
    protected $fillable = ['pre_audit_checklist_id', 'area_name'];

    public function checklist()
    {
        return $this->belongsTo(PreAuditChecklist::class, 'pre_audit_checklist_id');
    }

    public function items()
    {
        return $this->hasMany(PreAuditItem::class);
    }
}
