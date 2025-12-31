<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreAuditItem extends Model
{
    protected $fillable = ['pre_audit_area_id', 'item_name', 'severity', 'is_required'];

    public function area()
    {
        return $this->belongsTo(PreAuditArea::class, 'pre_audit_area_id');
    }
}
