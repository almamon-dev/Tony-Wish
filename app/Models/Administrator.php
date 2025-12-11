<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Administrator extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'permissions' => 'array',
        'invitation_sent_at' => 'datetime',
        'invitation_accepted_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Access level constants
     */
    public const ACCESS_FULL = 'full_access';

    public const ACCESS_LIMITED = 'limited_access';

    public const ACCESS_READ_ONLY = 'read_only';

    /**
     * Invitation status constants
     */
    public const INVITATION_PENDING = 'pending';

    public const INVITATION_ACCEPTED = 'accepted';

    public const INVITATION_EXPIRED = 'expired';

    /**
     * Get the user that this administrator belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the business owner who added this administrator.
     */
    public function businessOwner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'business_owner_id');
    }

    /**
     * Scope a query to only include administrators with full access.
     */
    public function scopeFullAccess($query)
    {
        return $query->where('access_level', self::ACCESS_FULL);
    }

    /**
     * Scope a query to only include administrators with limited access.
     */
    public function scopeLimitedAccess($query)
    {
        return $query->where('access_level', self::ACCESS_LIMITED);
    }

    /**
     * Scope a query to only include administrators with read-only access.
     */
    public function scopeReadOnly($query)
    {
        return $query->where('access_level', self::ACCESS_READ_ONLY);
    }

    /**
     * Scope a query to only include pending invitations.
     */
    public function scopePendingInvitations($query)
    {
        return $query->where('invitation_status', self::INVITATION_PENDING);
    }

    /**
     * Scope a query to only include accepted invitations.
     */
    public function scopeAcceptedInvitations($query)
    {
        return $query->where('invitation_status', self::INVITATION_ACCEPTED);
    }

    /**
     * Scope a query to only include expired invitations.
     */
    public function scopeExpiredInvitations($query)
    {
        return $query->where('invitation_status', self::INVITATION_EXPIRED);
    }

    /**
     * Check if the administrator has a specific permission.
     */
    public function hasPermission(string $permission): bool
    {
        // Full access administrators have all permissions
        if ($this->access_level === self::ACCESS_FULL) {
            return true;
        }

        // Read-only administrators have no write permissions
        if ($this->access_level === self::ACCESS_READ_ONLY) {
            return false;
        }

        // For limited access, check the permissions array
        $permissions = $this->permissions ?? [];

        return in_array($permission, $permissions);
    }

    /**
     * Check if the invitation is pending.
     */
    public function isInvitationPending(): bool
    {
        return $this->invitation_status === self::INVITATION_PENDING;
    }

    /**
     * Check if the invitation is accepted.
     */
    public function isInvitationAccepted(): bool
    {
        return $this->invitation_status === self::INVITATION_ACCEPTED;
    }

    /**
     * Check if the invitation is expired.
     */
    public function isInvitationExpired(): bool
    {
        return $this->invitation_status === self::INVITATION_EXPIRED;
    }

    /**
     * Accept the invitation.
     */
    public function acceptInvitation(): void
    {
        $this->update([
            'invitation_status' => self::INVITATION_ACCEPTED,
            'invitation_accepted_at' => now(),
            'invitation_token' => null, // Clear the token after acceptance
        ]);
    }

    /**
     * Expire the invitation.
     */
    public function expireInvitation(): void
    {
        $this->update([
            'invitation_status' => self::INVITATION_EXPIRED,
            'invitation_token' => null, // Clear the token when expired
        ]);
    }

    /**
     * Check if the administrator is active (not deleted and invitation accepted).
     */
    public function isActive(): bool
    {
        return ! $this->trashed() && $this->isInvitationAccepted();
    }

    /**
     * Get the full access level options.
     */
    public static function getAccessLevelOptions(): array
    {
        return [
            self::ACCESS_FULL => 'Full Access',
            self::ACCESS_LIMITED => 'Limited Access',
            self::ACCESS_READ_ONLY => 'Read Only',
        ];
    }

    /**
     * Get the invitation status options.
     */
    public static function getInvitationStatusOptions(): array
    {
        return [
            self::INVITATION_PENDING => 'Pending',
            self::INVITATION_ACCEPTED => 'Accepted',
            self::INVITATION_EXPIRED => 'Expired',
        ];
    }
}
