<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetOtp;
use Carbon\Carbon;

trait HandlesOtp
{
    /**
     * Generate and send OTP to the given email.
     *
     * @param string $email
     * @param string $mailableClazz
     * @return void
     */
    public function sendOtp($email, $mailableClass = PasswordResetOtp::class)
    {
        // Generate a 6-digit OTP
        $otp = rand(100000, 999999);

        // Store OTP in database (hashed)
        \App\Models\Otp::updateOrCreate(
            ['email' => $email],
            [
                'otp' => \Illuminate\Support\Facades\Hash::make((string)$otp),
                'expires_at' => now()->addMinutes(15),
            ]
        );

        // specific email sending logic
        try {
             Mail::to($email)->send(new $mailableClass($otp));
        } catch (\Exception $e) {
            // Handle mail sending failure if necessary
        }
    }

    /**
     * Verify the OTP for the given email.
     *
     * @param string $email
     * @param string $otp
     * @return bool
     */
    public function verifyOtp($email, $otp)
    {
        $otpRecord = \App\Models\Otp::where('email', $email)
            ->where('expires_at', '>', now())
            ->first();

        // Check if record exists and hash matches
        if ($otpRecord && \Illuminate\Support\Facades\Hash::check((string)$otp, $otpRecord->otp)) {
            // OTP is valid
            $otpRecord->delete();
            return true;
        }

        return false;
    }
}
