<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProcedureFile extends Model
{
    protected $fillable = ['procedure_id', 'file_name', 'file_path', 'file_size'];

    public function procedure(): BelongsTo
    {
        return $this->belongsTo(Procedure::class);
    }
}
