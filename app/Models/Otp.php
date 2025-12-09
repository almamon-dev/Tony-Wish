<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
     protected $fillable = ['user_id','otp', 'expires_at', 'is_verified', 'verified_at','purpose'];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
