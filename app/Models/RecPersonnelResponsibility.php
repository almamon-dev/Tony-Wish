<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecPersonnelResponsibility extends Model
{
    use HasFactory;

    protected $fillable = [
        'role',
        'name',
        'responsibility',
        'business_owner_id'
    ];
}
