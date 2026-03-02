<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditTeam extends Model
{
    protected $table = 'audit_team';

    protected $fillable = [
        'pre_audit_checklist_id',
        'user_id',
        'role',
    ];

    public function checklist()
    {
        return $this->belongsTo(PreAuditChecklist::class, 'pre_audit_checklist_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
