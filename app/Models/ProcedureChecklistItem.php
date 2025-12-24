<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProcedureChecklistItem extends Model
{
    protected $fillable = ['procedure_id', 'name'];

    public function procedure(): BelongsTo
    {
        return $this->belongsTo(Procedure::class);
    }
}
