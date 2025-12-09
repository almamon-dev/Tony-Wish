<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'fname',
        'lname',
        'email',
        'password',
        'user_type',
        'is_verified',
        'email_verified_at',
        'verified_at',
        'reset_password_token',
        'reset_password_token_expire_at',
        'otp',
        'purpose',
        'avatar',
        'expires_at',
        'is_subscribed',
        'terms_and_conditions_at',
        'terms_and_conditions',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_verified' => 'boolean',
        'is_subscribed' => 'boolean',
    ];

    public function otps()
    {
        return $this->hasMany(Otp::class);
    }

    public function latestOtp()
    {
        return $this->hasOne(Otp::class)->latestOfMany();
    }
}
