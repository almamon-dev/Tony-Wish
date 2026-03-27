<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'certificate_id',
        'procedure_id',
        'issued_to',
        'issued_date',
        'expiry_date',
        'status',
        'company_id',
        'created_by',
    ];

    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
