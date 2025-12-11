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
        'added_by',
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

    public function managedAdministrators()
    {
        return $this->belongsToMany(User::class, 'business_owner_administrators',
            'business_owner_id', 'administrator_id')
            ->withPivot(['role', 'is_active', 'assigned_at', 'removed_at'])
            ->withTimestamps()
            ->wherePivot('is_active', true); // Only active relationships
    }

    /**
     * Get administrator details
     */
    public function administratorDetails()
    {
        return $this->hasOne(Administrator::class, 'user_id');
    }

    /**
     * Get business owners managed by this administrator
     */
    public function managedBusinessOwners()
    {
        return $this->belongsToMany(User::class, 'business_owner_administrators',
            'administrator_id', 'business_owner_id')
            ->withPivot(['role', 'is_active', 'assigned_at', 'removed_at'])
            ->withTimestamps()
            ->wherePivot('is_active', true);
    }

    /**
     * Check if user is regular user
     */
    public function isRegularUser(): bool
    {
        return $this->user_type === 'user';
    }

    /**
     * Get the administrator profile for this user
     */
    public function administratorProfile()
    {
        return $this->hasOne(AdministratorUser::class, 'user_id');
    }
}
