<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcedureAssignMember extends Model
{
    protected $table = 'procedure_assign_members';

    protected $fillable = ['procedure_id', 'user_id'];
}
