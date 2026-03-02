<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditItem extends Model
{
    protected $fillable = [
        'audit_area_id',
        'text',
        'tags',
        'is_completed',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_completed' => 'boolean',
    ];

    public function area()
    {
        return $this->belongsTo(AuditArea::class, 'audit_area_id');
    }
}
