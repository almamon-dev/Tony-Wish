<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreAuditTeamMember extends Model
{
    protected $fillable = ['pre_audit_checklist_id', 'user_id'];

    public function checklist()
    {
        return $this->belongsTo(PreAuditChecklist::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
