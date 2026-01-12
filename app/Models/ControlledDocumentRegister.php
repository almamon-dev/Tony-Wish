<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ControlledDocumentRegister extends Model
{
    protected $fillable = [
        'record_no',
        'document_title',
        'en_1090',
        'iso_9001',
        'iso_14001',
        'iso_45001',
        'en_15085',
        'nhss_20',
        'revision_date',
    ];
}
