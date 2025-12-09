<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResendOtpRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\VerifyEmailRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Http\Resources\Auth\LoginResource;
use App\Http\Resources\Auth\RegisterResource;
use App\Models\User;
use App\Traits\ApiResponse;
use App\Traits\SendOtp;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AuthApiController extends Controller
{
    use ApiResponse, SendOtp;

    private const OTP_PURPOSE_VERIFY_EMAIL = 'Verify Your Email Address';

    private const OTP_PURPOSE_RESET_PASSWORD = 'Reset Your Password';

    /** Login User */
    public function loginApi(Request $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (! $this->isValidLogin($user, $request->password)) {
                return $this->sendError('Invalid credentials.', [], 401);
            }

            if (! $user->email_verified_at) {
                return $this->sendError('Please verify your email first.', [], 403);
            }

            $token = $user->createToken('AuthToken')->plainTextToken;

            return $this->sendResponse(
                new LoginResource($user),
                'Login successful.',
                $token
            );

        } catch (Exception $e) {
            Log::error('Login failed', ['error' => $e->getMessage()]);

            return $this->sendError('Login failed. Please try again.');
        }
    }

    /** Verify Email */
    public function verifyEmailApi(VerifyEmailRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->firstOrFail();

            if ($user->email_verified_at) {
                return $this->sendError('Email already verified.', [], 422);
            }

            $verificationResult = $this->verifyOtp($user, $request->otp, self::OTP_PURPOSE_VERIFY_EMAIL);

            if (! $verificationResult['success']) {
                return $this->sendError($verificationResult['message'], [
                    'attempts_remaining' => $verificationResult['attempts_remaining'] ?? null,
                ], 422);
            }

            $this->markEmailVerified($user);
            $token = $user->createToken('AuthToken')->plainTextToken;

            return $this->sendResponse(
                new LoginResource($user),
                'Email verified successfully.',
                $token
            );

        } catch (Exception $e) {
            Log::error('Email verification failed', ['error' => $e->getMessage()]);

            return $this->sendError('Verification failed. Please try again.');
        }
    }

    /** Register User */
    public function registerApi(RegisterRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            try {
                $user = $this->createUser($request->validated());
                $otpResult = $this->sendOtp($user, self::OTP_PURPOSE_VERIFY_EMAIL);

                if (empty($otpResult['success'])) {
                    DB::rollBack();

                    return $this->sendError($otpResult['message'], $otpResult, 429);
                }

                $message = 'Registration successful. Please check your email to verify your account.';

                // Append OTP to message when debug is enabled and otp exists
                if (config('app.debug_otp') && ! empty($otpResult['otp'])) {
                    $message .= ' OTP: '.$otpResult['otp'];
                    Log::info('OTP (debug) included in register response for '.$user->email, ['otp' => $otpResult['otp']]);
                }

                return $this->sendResponse(
                    new RegisterResource($user),
                    $message
                );
            } catch (Exception $e) {
                Log::error('Registration failed', ['error' => $e->getMessage()]);

                return $this->sendError('Registration failed. Please try again.');
            }
        });
    }

    /** Resend OTP */
    public function resendOtpApi(ResendOtpRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->firstOrFail();
            $otpResult = $this->sendOtp($user, self::OTP_PURPOSE_VERIFY_EMAIL);

            if (empty($otpResult['success'])) {
                return $this->sendError($otpResult['message'], $otpResult, 429);
            }

            $message = 'OTP sent successfully.';

            if (config('app.debug_otp') && ! empty($otpResult['otp'])) {
                $message .= ' OTP: '.$otpResult['otp'];
                Log::info('OTP (debug) included in resend response for '.$user->email, ['otp' => $otpResult['otp']]);
            }

            return $this->sendResponse([], $message);
        } catch (Exception $e) {
            Log::error('Resend OTP failed', ['error' => $e->getMessage()]);

            return $this->sendError('Failed to resend OTP. Please try again.');
        }
    }

    /** Forgot Password */
    public function forgotPasswordApi(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->firstOrFail();
            $otpResult = $this->sendOtp($user, self::OTP_PURPOSE_RESET_PASSWORD);

            if (empty($otpResult['success'])) {
                return $this->sendError($otpResult['message'], $otpResult, 429);
            }

            $message = 'Password reset OTP sent successfully.';

            if (config('app.debug_otp') && ! empty($otpResult['otp'])) {
                $message .= ' OTP: '.$otpResult['otp'];
                Log::info('OTP (debug) included in forgot-password response for '.$user->email, ['otp' => $otpResult['otp']]);
            }

            return $this->sendResponse([], $message);
        } catch (Exception $e) {
            Log::error('Forgot password failed', ['error' => $e->getMessage()]);

            return $this->sendError('Failed to process request. Please try again.');
        }
    }

    /** Verify OTP for Password Reset */
    public function verifyOtpApi(VerifyOtpRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->firstOrFail();
            $verificationResult = $this->verifyOtp($user, $request->otp, self::OTP_PURPOSE_RESET_PASSWORD);

            if (! $verificationResult['success']) {
                return $this->sendError($verificationResult['message'], [
                    'attempts_remaining' => $verificationResult['attempts_remaining'] ?? null,
                ], 422);
            }

            $resetToken = $this->generatePasswordResetToken($user);

            return $this->sendResponse([
                'reset_token' => $resetToken,
            ], 'OTP verified. You can now reset your password.');

        } catch (Exception $e) {
            Log::error('OTP verification failed', ['error' => $e->getMessage()]);

            return $this->sendError('Verification failed. Please try again.');
        }
    }

    /** Reset Password */
    public function resetPasswordApi(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->firstOrFail();

            if (! $this->isValidResetToken($user, $request->token)) {
                return $this->sendError('Invalid or expired reset token.', [], 401);
            }

            $this->updatePassword($user, $request->password);

            return $this->sendResponse([], 'Password reset successfully.');

        } catch (Exception $e) {
            Log::error('Password reset failed', ['error' => $e->getMessage()]);

            return $this->sendError('Failed to reset password. Please try again.');
        }
    }

    /** Logout */
    public function logoutApi(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return $this->sendResponse([], 'Logged out successfully.');

        } catch (Exception $e) {
            Log::error('Logout failed', ['error' => $e->getMessage()]);

            return $this->sendError('Logout failed. Please try again.');
        }
    }

    /** Private helper methods */
    private function createUser(array $data): User
    {
        return User::create([
            'fname' => $data['fname'],
            'lname' => $data['lname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'terms_and_conditions' => $data['terms_and_conditions'],
            'terms_and_conditions_at' => now(),
        ]);
    }

    private function isValidLogin(?User $user, string $password): bool
    {
        return $user && Hash::check($password, $user->password);
    }

    private function markEmailVerified(User $user): void
    {
        $user->update([
            'email_verified_at' => now(),
            'is_verified' => true,
            'verified_at' => now(),
        ]);
    }

    private function generatePasswordResetToken(User $user): string
    {
        $token = Str::random(40);

        $user->update([
            'reset_password_token' => $token,
            'reset_password_token_expire_at' => now()->addHour(),
        ]);

        return $token;
    }

    private function isValidResetToken(User $user, string $token): bool
    {
        return $user->reset_password_token === $token &&
               Carbon::now()->lte($user->reset_password_token_expire_at);
    }

    private function updatePassword(User $user, string $newPassword): void
    {
        $user->update([
            'password' => Hash::make($newPassword),
            'reset_password_token' => null,
            'reset_password_token_expire_at' => null,
        ]);
    }
}
