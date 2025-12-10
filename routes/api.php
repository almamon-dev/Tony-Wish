<?php

use App\Http\Controllers\API\Auth\AuthApiController;
use App\Http\Controllers\BusinessOwnerDashboard\CompanyManagement\IndexController;
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

Route::middleware('auth:sanctum')->prefix('administrators')->group(function () {
    Route::post('/add', [IndexController::class, 'addAdministrator']);
    Route::get('/list', [IndexController::class, 'listAdministrators']);
    Route::put('/update/{id}', [IndexController::class, 'updateAdministrator']);
    Route::delete('/remove/{id}', [IndexController::class, 'removeAdministrator']);
});
