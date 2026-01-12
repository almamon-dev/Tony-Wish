<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonnelStructureResponsibility extends Model
{
    protected $table = 'personnel_structure_responsibilities';

    protected $fillable = [
        'record_no',
        'title',
        'revision_date',
        'clauses',
        'roles',
    ];

    protected $casts = [
        'roles' => 'array',
        'revision_date' => 'date',
    ];
}
