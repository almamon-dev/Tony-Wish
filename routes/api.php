<?php

use App\Http\Controllers\API\Administrator\PreAuditChecklist\IndexController as PreAuditChecklistController;
use App\Http\Controllers\API\Administrator\Record\CDRegisterController;
use App\Http\Controllers\API\Administrator\Record\PSResponsibilityController;
use App\Http\Controllers\API\Administrator\User\IndexController as UserIndexController;
use App\Http\Controllers\API\Auth\AuthApiController;
use App\Http\Controllers\API\BusinessOwnerDashboard\CompanyManagement\IndexController;
use App\Http\Controllers\API\BusinessOwnerDashboard\Profile\IndexController as ProfileIndexController;
use App\Http\Controllers\API\Setting\UpdatePasswordController;
use App\Http\Controllers\API\User\ProcedureController;
use Illuminate\Support\Facades\Route;

// 1. Public Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthApiController::class, 'loginApi']);
    Route::post('register', [AuthApiController::class, 'registerApi']);
    Route::post('verify-email', [AuthApiController::class, 'verifyEmailApi']);
    Route::post('forgot-password', [AuthApiController::class, 'forgotPasswordApi']);
    Route::post('reset-password', [AuthApiController::class, 'resetPasswordApi']);
    Route::post('resend-otp', [AuthApiController::class, 'resendOtpApi']);
    Route::post('verify-otp', [AuthApiController::class, 'verifyOtpApi']);
});

// 2. Authenticated Common Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/update-password', [UpdatePasswordController::class, 'updateAdministratorPassword']);
});

// 3. Administrator Routes
Route::middleware('auth:sanctum')->prefix('administrators')->group(function () {

    // User Management
    Route::get('/accept-invitation/{token}', [IndexController::class, 'acceptInvitation']);
    Route::post('/add-user', [UserIndexController::class, 'addUser']);
    Route::post('/edit-user/{id}', [UserIndexController::class, 'editUser']);
    Route::get('/user-list', [UserIndexController::class, 'getUserList']);

    // Records Management (REC-01, REC-02, etc.)
    Route::prefix('record')->group(function () {
        Route::get('/control-document-register', [CDRegisterController::class, 'index']);

        // REC-02: Personnel Structure & Responsibilities
        Route::get('/personal-responsibilities', [PSResponsibilityController::class, 'index']);
        Route::post('/personal-responsibilities', [PSResponsibilityController::class, 'store']);
        Route::delete('/personal-responsibilities/remove', [PSResponsibilityController::class, 'destroy']);
    });

    // Procedure Management
    Route::prefix('procedures')->group(function () {
        Route::get('/', [ProcedureIndexController::class, 'index']);
        Route::post('/store', [ProcedureIndexController::class, 'store']);
        Route::post('/update/{id}', [ProcedureIndexController::class, 'update']);
        Route::delete('/delete/{id}', [ProcedureIndexController::class, 'destroy']);
    });

    // Pre-Audit Checklist Management
    Route::prefix('pre-audit-checklist')->group(function () {
        Route::get('/', [PreAuditChecklistController::class, 'index']);
        Route::post('/store', [PreAuditChecklistController::class, 'store']);
        Route::post('/update/{id}', [PreAuditChecklistController::class, 'update']);
    });
});

// 4. Regular User Routes
Route::middleware('auth:sanctum')->prefix('users')->group(function () {
    Route::get('/procedure-list', [ProcedureController::class, 'procedureList']);
    Route::get('/procedure-show/{id}', [ProcedureController::class, 'shoWProcedure']);
});

// 5. Business Owner Routes
Route::middleware('auth:sanctum')->prefix('businesses')->group(function () {
    Route::post('/add-administrator', [IndexController::class, 'addAdministrator']);
    Route::get('/list-administrators', [IndexController::class, 'listAdministrators']);
    Route::delete('/remove-administrator', [IndexController::class, 'removeAdministrator']);

    Route::get('/profiles', [ProfileIndexController::class, 'getBusinessProfile']);
    Route::post('/update-profile', [ProfileIndexController::class, 'updateBusinessProfile']);
});
