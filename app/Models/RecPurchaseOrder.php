<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecPurchaseOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'supplier',
        'del_address',
        'po_number',
        'job_number',
        'date',
        'notes',
        'ordered_by',
        'business_owner_id'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    public function items()
    {
        return $this->hasMany(RecPurchaseOrderItem::class, 'purchase_order_id');
    }
}
