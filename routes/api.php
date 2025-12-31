<?php

use App\Http\Controllers\API\Administrator\PreAuditChecklist\IndexController as PreAuditChecklistController;
use App\Http\Controllers\API\Administrator\Procedure\IndexController as ProcedureIndexController;
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

    // Invitation routes
    Route::get('/accept-invitation/{token}', [IndexController::class, 'acceptInvitation']);
    // add user
    Route::post('/add-user', [UserIndexController::class, 'addUser']);
    Route::post('/edit-user/{id}', [UserIndexController::class, 'editUser']);
    Route::get('/user-list', [UserIndexController::class, 'getUserList']);

});

// business owner authentication routes
Route::middleware('auth:sanctum')->prefix('businesses')->group(function () {
    Route::post('/add-administrator', [IndexController::class, 'addAdministrator']);
    Route::get('/list-administrators', [IndexController::class, 'listAdministrators']);
    Route::delete('/remove-administrator', [IndexController::class, 'removeAdministrator']);

    // update profile
    Route::get('/profiles', [ProfileIndexController::class, 'getBusinessProfile']);
    Route::post('/update-profile', [ProfileIndexController::class, 'updateBusinessProfile']);

});

// procedure routes
Route::middleware('auth:sanctum')->prefix('administrators')->group(function () {
    Route::get('/procedures', [ProcedureIndexController::class, 'index']);
    Route::post('/procedure-store', [ProcedureIndexController::class, 'store']);
    Route::post('/procedure-update/{id}', [ProcedureIndexController::class, 'update']);
    Route::delete('/procedure-delete/{id}', [ProcedureIndexController::class, 'destroy']);
});

// pre audit checklist routes
Route::middleware('auth:sanctum')->prefix('administrators')->group(function () {
    Route::get('/pre-audit-checklist', [PreAuditChecklistController::class, 'index']);
    Route::post('/pre-audit-checklist-store', [PreAuditChecklistController::class, 'store']);
    Route::post('/pre-audit-checklist-update/{id}', [PreAuditChecklistController::class, 'update']);
});
