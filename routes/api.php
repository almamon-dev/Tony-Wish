<?php

use App\Http\Controllers\API\Administrator\User\IndexController as UserIndexController;
use App\Http\Controllers\API\Auth\AuthApiController;
use App\Http\Controllers\API\BusinessOwnerDashboard\CompanyManagement\IndexController;
use App\Http\Controllers\API\BusinessOwnerDashboard\Profile\IndexController as ProfileIndexController;
use App\Http\Controllers\API\Setting\UpdatePasswordController;
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

// Public authentication routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/update-password', [UpdatePasswordController::class, 'updateAdministratorPassword']);
});

Route::middleware('auth:sanctum')->prefix('administrators')->group(function () {
    Route::post('/add', [IndexController::class, 'addAdministrator']);
    Route::get('/list', [IndexController::class, 'listAdministrators']);
    Route::put('/update/{id}', [IndexController::class, 'updateAdministrator']);
    Route::delete('/remove/{id}', [IndexController::class, 'removeAdministrator']);
    // Invitation routes
    Route::get('/accept-invitation/{token}', [IndexController::class, 'acceptInvitation']);

    // update profile
    Route::get('/profiles', [ProfileIndexController::class, 'getBusinessProfile']);
    Route::post('/update-profile', [ProfileIndexController::class, 'updateBusinessProfile']);

    // add user
    Route::post('/add-user', [UserIndexController::class, 'addUser']);
    Route::get('/user-list', [UserIndexController::class, 'getUserList']);

});
