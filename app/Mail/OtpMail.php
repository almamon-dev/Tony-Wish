<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use  SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $otp,
        public User $user,
        public string $purpose = 'email_verify'
    ) {}

    /**
     * Build the message.
     */
    public function build(): self
    {
        $subject = $this->getSubject();

        return $this->subject($subject)
                    ->markdown('emails.otp')
                    ->with([
                        'otp' => $this->otp,
                        'user' => $this->user,
                        'purpose' => $this->purpose,
                        'expiryMinutes' => config('auth.otp.expiry', 5),
                    ]);
    }

    private function getSubject(): string
    {
        return match($this->purpose) {
            'Verify Your Email Address' => 'Verify Your Email Address',
            'Reset Your Password' => 'Reset Your Password',
            default => 'Your Verification Code'
        };
    }
}
