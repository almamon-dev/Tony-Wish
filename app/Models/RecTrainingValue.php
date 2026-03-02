<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecTrainingValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'row_id',
        'column_id',
        'value',
    ];

    public function row()
    {
        return $this->belongsTo(RecTrainingRow::class, 'row_id');
    }

    public function column()
    {
        return $this->belongsTo(RecTrainingColumn::class, 'column_id');
    }
}
