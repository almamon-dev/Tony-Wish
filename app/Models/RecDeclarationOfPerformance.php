<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecDeclarationOfPerformance extends Model
{
    use HasFactory;

    protected $table = 'rec_declaration_of_performances';

    protected $fillable = [
        'ukca_mark',
        'manufacturer',
        'product_identification',
        'intended_use',
        'declared_performance',
        'notified_body',
        'dop_reference',
        'date_of_ukca_marking',
        'business_owner_id'
    ];

    protected $casts = [
        'date_of_ukca_marking' => 'date'
    ];
}
