<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcedureMilestones extends Model
{
    protected $fillable = ['procedure_id', 'name', 'date'];
}
