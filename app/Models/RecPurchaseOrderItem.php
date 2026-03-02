<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecPurchaseOrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_order_id',
        'item_no',
        'description',
        'unit',
        'qty',
        'cost_each',
        'total_cost'
    ];

    public function purchaseOrder()
    {
        return $this->belongsTo(RecPurchaseOrder::class, 'purchase_order_id');
    }
}
