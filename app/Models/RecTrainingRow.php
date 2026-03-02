<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecTrainingRow extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'competence',
        'business_owner_id',
    ];

    public function values()
    {
        return $this->hasMany(RecTrainingValue::class, 'row_id');
    }
}
