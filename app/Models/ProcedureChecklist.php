<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcedureChecklist extends Model
{
    protected $fillable = ['name', 'procedure_id', 'is_completed'];

    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }
}
