<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\RecWelderQualification;

class RecWeldProcedure extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'reference',
        'process',
        'business_owner_id',
    ];

    public function qualifications()
    {
        return $this->hasMany(RecWelderQualification::class, 'procedure_id');
    }
}
