<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdministratorInvitationMail extends Mailable
{
    use SerializesModels;

    public array $invitationData;

    /**
     * Create a new message instance.
     */
    public function __construct(
        string $businessOwnerName,
        string $invitationLink,
        string $inviteeEmail,
        string $inviteeName,
        string $accessLevel,
        ?string $department = null,
        ?string $businessName = null,
        ?string $businessLogo = null
    ) {
        $this->invitationData = [
            'inviter_name' => $businessOwnerName,
            'inviter_email' => $businessOwnerName, // You might want to pass actual email separately
            'invitee_name' => $inviteeName,
            'invitee_email' => $inviteeEmail,
            'accept_url' => $invitationLink,
            'access_level' => $accessLevel,
            'access_level_label' => $this->getAccessLevelLabel($accessLevel),
            'department' => $department,
            'business_name' => $businessName ?? config('app.name'),
            'business_logo' => $businessLogo,
            'invitation_date' => now()->format('F j, Y'),
            'expiry_days' => 7, // Default expiry days
            'support_email' => config('mail.from.address', 'support@example.com'),
        ];
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Invitation to Join as Administrator')
            ->markdown('emails.administrator-invitation')
            ->with(['invitationData' => $this->invitationData]);
    }

    /**
     * Convert access level to human readable label
     */
    private function getAccessLevelLabel(string $accessLevel): string
    {
        return match ($accessLevel) {
            'full_access' => 'Full Access',
            'limited_access' => 'Limited Access',
            'read_only' => 'Read Only',
            default => ucfirst(str_replace('_', ' ', $accessLevel)),
        };
    }
}
