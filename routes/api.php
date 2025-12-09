<?php

use App\Http\Controllers\API\Auth\AuthApiController;
use Illuminate\Support\Facades\Route;

// Public authentication routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthApiController::class, 'loginApi']);
    Route::post('register', [AuthApiController::class, 'registerApi']);
    Route::post('verify-email', [AuthApiController::class, 'verifyEmailApi']);
    Route::post('forgot-password', [AuthApiController::class, 'forgotPasswordApi']);
    Route::post('reset-password', [AuthApiController::class, 'resetPasswordApi']);
    Route::post('resend-otp', [AuthApiController::class, 'resendOtpApi']);
    Route::post('verify-otp', [AuthApiController::class, 'verifyOtpApi']);
});

Route::get('/test-email', function () {
    try {
        Mail::raw('Test email from Laravel', function ($message) {
            $message->to('mamon193p@gmail.com')
                    ->subject('Test Email');
        });

        return 'Email sent successfully!';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});
