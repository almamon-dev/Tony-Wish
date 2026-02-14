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
     * @return void
     */
    public function sendOtp($email)
    {
        // Generate a 6-digit OTP
        $otp = rand(100000, 999999);

        // Store OTP in database
        \App\Models\Otp::updateOrCreate(
            ['email' => $email],
            [
                'otp' => $otp,
                'expires_at' => now()->addMinutes(15),
            ]
        );

        // specific email sending logic
        try {
             Mail::to($email)->send(new PasswordResetOtp($otp));
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
            ->where('otp', $otp)
            ->where('expires_at', '>', now())
            ->first();

        if ($otpRecord) {
            // OTP is valid
            $otpRecord->delete();
            return true;
        }

        return false;
    }
}
