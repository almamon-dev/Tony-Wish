<?php

namespace App\Traits;

use Exception;
use App\Models\User;
use App\Jobs\SendOtpEmailJob;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

trait SendOtp
{
    /**
     * Send OTP to user with rate limiting.
     * Returns array with keys: success (bool), message (string), expires_in (int seconds) and optionally otp (string) when debug is enabled.
     */
    public function sendOtp(User $user, string $purpose = 'email_verify'): array
    {
        $rateLimitKey = "otp:{$user->id}:{$purpose}";
        $intervalKey = "otp_interval:{$user->id}:{$purpose}";

        if ($err = $this->checkRateLimits($rateLimitKey, $intervalKey, $user, $purpose)) {
            return $err;
        }

        $cfg = $this->getOtpConfig();
        $plainOtp = $this->generateOtp($cfg['length']);

        try {
            return DB::transaction(function () use ($user, $plainOtp, $purpose, $cfg, $rateLimitKey, $intervalKey) {
                $this->createOtpRecord($user, $plainOtp, $purpose, $cfg['expiry']);
                $this->applyRateLimits($rateLimitKey, $intervalKey);
                $this->dispatchOtp($user, $plainOtp, $purpose);

                $data = [
                    'success'    => true,
                    'message'    => 'OTP sent successfully',
                    'expires_in' => $cfg['expiry'] * 60,
                ];

                // Show OTP only if explicitly enabled via config('app.debug_otp')
                if (config('app.debug_otp')) {
                    $data['otp'] = $plainOtp;
                }

                return $data;
            });
        } catch (Exception $e) {
            Log::error("OTP send failed for {$user->email}: {$e->getMessage()}");
            return [
                'success' => false,
                'message' => 'Failed to send OTP'
            ];
        }
    }

    public function verifyOtp(User $user, string $inputOtp, string $purpose = 'email_verify'): array
    {
        $verifyLimitKey = "otp_verify:{$user->id}:{$purpose}";

        if ($err = $this->checkVerificationRateLimit($verifyLimitKey, $user, $purpose)) {
            return $err;
        }

        $this->cleanupExpiredOtps($user);
        $otpRecord = $this->findValidOtp($user, $purpose);

        if (! $otpRecord || ! Hash::check($inputOtp, $otpRecord->otp)) {
            return $this->handleInvalidOtp($verifyLimitKey, $user, $purpose);
        }

        $this->markOtpVerified($otpRecord);
        $this->clearRateLimits($user, $purpose);

        Log::info("OTP verified for {$user->email} [{$purpose}]");
        return [
            'success' => true,
            'message' => 'OTP verified successfully'
        ];
    }

    /* ---------- helper methods (kept minimal) ---------- */

    private function checkRateLimits(string $rateLimitKey, string $intervalKey, User $user, string $purpose): ?array
    {
        if (RateLimiter::tooManyAttempts($rateLimitKey, config('auth.otp.max_attempts', 5))) {
            $seconds = RateLimiter::availableIn($rateLimitKey);
            Log::warning("OTP rate limit exceeded for {$user->email} [{$purpose}]");
            return $this->rateLimitError($seconds, 'Too many OTP requests');
        }

        if (RateLimiter::tooManyAttempts($intervalKey, 1)) {
            $seconds = RateLimiter::availableIn($intervalKey);
            return $this->rateLimitError($seconds, 'Please wait before requesting another OTP');
        }

        return null;
    }

    private function checkVerificationRateLimit(string $verifyLimitKey, User $user, string $purpose): ?array
    {
        if (RateLimiter::tooManyAttempts($verifyLimitKey, config('auth.otp.verify_max_attempts', 3))) {
            $seconds = RateLimiter::availableIn($verifyLimitKey);
            Log::warning("OTP verification rate limit exceeded for {$user->email} [{$purpose}]");
            return $this->rateLimitError($seconds, 'Too many verification attempts');
        }
        return null;
    }

    private function createOtpRecord(User $user, string $plainOtp, string $purpose, int $expiryMinutes): void
    {
        $user->otps()
            ->where('purpose', $purpose)
            ->where('is_verified', false)
            ->where('expires_at', '>', now())
            ->update(['expires_at' => now()]);

        $user->otps()->create([
            'otp'        => Hash::make($plainOtp),
            'purpose'    => $purpose,
            'expires_at' => now()->addMinutes($expiryMinutes),
            'is_verified'=> false,
        ]);
    }

    private function applyRateLimits(string $rateLimitKey, string $intervalKey): void
    {
        RateLimiter::hit($rateLimitKey, config('auth.otp.decay_minutes', 15) * 60);
        RateLimiter::hit($intervalKey, config('auth.otp.min_interval', 60));
    }

    private function dispatchOtp(User $user, string $otp, string $purpose): void
    {
        if (config('auth.otp.queue', true)) {
            SendOtpEmailJob::dispatch($user, $otp, $purpose);
            Log::info("OTP queued for {$user->email} [{$purpose}]");
        } else {
            Mail::to($user->email)->send(new \App\Mail\OtpMail($otp, $user, $purpose));
            Log::info("OTP sent directly to {$user->email} [{$purpose}]");
        }
    }

    private function findValidOtp(User $user, string $purpose)
    {
        return $user->otps()
            ->where('purpose', $purpose)
            ->where('is_verified', false)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();
    }

    private function handleInvalidOtp(string $verifyLimitKey, User $user, string $purpose): array
    {
        RateLimiter::hit($verifyLimitKey, config('auth.otp.verify_decay_minutes', 5) * 60);
        $attempts = RateLimiter::attempts($verifyLimitKey);
        $remaining = config('auth.otp.verify_max_attempts', 3) - $attempts;

        Log::warning("Invalid OTP attempt for {$user->email} [{$purpose}]");

        return [
            'success' => false,
            'message' => 'Invalid or expired OTP',
            'attempts_remaining' => max(0, $remaining)
        ];
    }

    private function markOtpVerified($otpRecord): void
    {
        $otpRecord->update([
            'is_verified' => true,
            'verified_at' => now(),
            'otp' => null,
        ]);
    }

    private function clearRateLimits(User $user, string $purpose): void
    {
        RateLimiter::clear("otp:{$user->id}:{$purpose}");
        RateLimiter::clear("otp_verify:{$user->id}:{$purpose}");
    }

    private function generateOtp(int $length): string
    {
        return (string) random_int((int) str_pad('1', $length, '0'), (int) str_pad('9', $length, '9'));
    }

    private function getOtpConfig(): array
    {
        return [
            'length' => (int) config('auth.otp.length', 6),
            'expiry' => (int) config('auth.otp.expiry', 5), // minutes
        ];
    }

    private function rateLimitError(int $seconds, string $message): array
    {
        return [
            'success' => false,
            'message' => $message,
            'retry_after' => $seconds,
            'retry_minutes' => (int) ceil($seconds / 60),
        ];
    }

    private function cleanupExpiredOtps(User $user): void
    {
        $user->otps()->where('expires_at', '<', now()->subDay())->delete();
    }
}
