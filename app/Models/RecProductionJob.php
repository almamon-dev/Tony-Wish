<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecProductionJob extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_review_id',
        'process',
        'name',
        'signature',
        'date'
    ];

    public function projectReview()
    {
        return $this->belongsTo(RecProjectReview::class);
    }
}
