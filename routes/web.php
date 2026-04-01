<?php

use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Administrator\CertificateController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\PreAuditChecklistController;
use App\Http\Controllers\Administrator\ProcedureController;
use App\Http\Controllers\Administrator\RECFormController;
use App\Http\Controllers\Administrator\ReportController;
use App\Http\Controllers\BusinessOwner\AdministratorController;
use App\Http\Controllers\BusinessOwner\CompanyController;
use App\Http\Controllers\BusinessOwner\SettingsController;
use App\Http\Controllers\BusinessOwner\SubscriptionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeWebhookController;
use App\Models\Plan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'plans' => Plan::where('is_active', true)->get(),
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();

    return match ($user->user_type) {
        'admin' => Inertia::render('Admin/Dashboard'),
        'administrator' => redirect()->route('administrator.dashboard'),
        'business_owner' => redirect()->route('business-owner.dashboard'),
        'userdashboard' => redirect()->route('user.dashboard'),
        default => Inertia::render('Dashboard'),
    };
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');
        Route::get('/plans/create', [PlanController::class, 'create'])->name('plans.create');
        Route::post('/plans', [PlanController::class, 'store'])->name('plans.store');
        Route::get('/plans/{id}/edit', [PlanController::class, 'edit'])->name('plans.edit');
        Route::post('/plans/{id}', [PlanController::class, 'update'])->name('plans.update');

        Route::resource('users', UserController::class);
    });

    // Administrator Routes (Company Owner)
    Route::prefix('administrator')->name('administrator.')->middleware('check-subscription')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/procedures', [ProcedureController::class, 'index'])->name('procedures.index');
        Route::post('/procedures', [ProcedureController::class, 'store'])->name('procedures.store');
        Route::patch('/procedures/{procedure}', [ProcedureController::class, 'update'])->name('procedures.update');
        Route::get('/pre-audit-checklists', [PreAuditChecklistController::class, 'index'])->name('pre-audit-checklists.index');
        Route::post('/pre-audit-checklists', [PreAuditChecklistController::class, 'store'])->name('pre-audit-checklists.store');
        Route::get('/pre-audit-checklists/{id}', [PreAuditChecklistController::class, 'show'])->name('pre-audit-checklists.show');
        Route::get('/pre-audit-checklists/{id}/edit', [PreAuditChecklistController::class, 'edit'])->name('pre-audit-checklists.edit');
        Route::put('/pre-audit-checklists/{id}', [PreAuditChecklistController::class, 'update'])->name('pre-audit-checklists.update');
        Route::get('/certificates', [CertificateController::class, 'index'])->name('certificates.index');
        Route::post('/certificates', [CertificateController::class, 'store'])->name('certificates.store');
        Route::put('/certificates/{certificate}', [CertificateController::class, 'update'])->name('certificates.update');
        Route::delete('/certificates/{certificate}', [CertificateController::class, 'destroy'])->name('certificates.destroy');

        Route::get('/rec-forms', function () {
            return Inertia::render('Administrator/RECForms/Index');
        })->name('rec-forms.index');

        // REC Forms
        Route::get('/rec-forms/rec-01', [RECFormController::class, 'rec01'])->name('rec-forms.rec-01');
        Route::post('/rec-forms/rec-01', [RECFormController::class, 'rec01Store'])->name('rec-forms.rec-01.store');
        Route::get('/rec-forms/rec-02', [RECFormController::class, 'rec02'])->name('rec-forms.rec-02');
        Route::post('/rec-forms/rec-02', [RECFormController::class, 'rec02Store'])->name('rec-forms.rec-02.store');
        Route::get('/rec-forms/rec-03', [RECFormController::class, 'rec03'])->name('rec-forms.rec-03');
        Route::post('/rec-forms/rec-03', [RECFormController::class, 'rec03Store'])->name('rec-forms.rec-03.store');
        Route::get('/rec-forms/rec-04', [RECFormController::class, 'rec04'])->name('rec-forms.rec-04');
        Route::post('/rec-forms/rec-04', [RECFormController::class, 'rec04Store'])->name('rec-forms.rec-04.store');
        Route::get('/rec-forms/rec-05', [RECFormController::class, 'rec05'])->name('rec-forms.rec-05');
        Route::post('/rec-forms/rec-05', [RECFormController::class, 'rec05Store'])->name('rec-forms.rec-05.store');
        Route::get('/rec-forms/rec-06', [RECFormController::class, 'rec06'])->name('rec-forms.rec-06');
        Route::post('/rec-forms/rec-06', [RECFormController::class, 'rec06Store'])->name('rec-forms.rec-06.store');
        Route::get('/rec-forms/rec-07', [RECFormController::class, 'rec07'])->name('rec-forms.rec-07');
        Route::post('/rec-forms/rec-07', [RECFormController::class, 'rec07Store'])->name('rec-forms.rec-07.store');
        Route::get('/rec-forms/rec-08', [RECFormController::class, 'rec08'])->name('rec-forms.rec-08');
        Route::post('/rec-forms/rec-08', [RECFormController::class, 'rec08Store'])->name('rec-forms.rec-08.store');
        Route::get('/rec-forms/rec-09', [RECFormController::class, 'rec09'])->name('rec-forms.rec-09');
        Route::post('/rec-forms/rec-09', [RECFormController::class, 'rec09Store'])->name('rec-forms.rec-09.store');
        Route::get('/rec-forms/rec-10', [RECFormController::class, 'rec10'])->name('rec-forms.rec-10');
        Route::post('/rec-forms/rec-10', [RECFormController::class, 'rec10Store'])->name('rec-forms.rec-10.store');
        Route::get('/rec-forms/rec-11', [RECFormController::class, 'rec11'])->name('rec-forms.rec-11');
        Route::post('/rec-forms/rec-11', [RECFormController::class, 'rec11Store'])->name('rec-forms.rec-11.store');
        Route::get('/rec-forms/rec-12', [RECFormController::class, 'rec12'])->name('rec-forms.rec-12');
        Route::post('/rec-forms/rec-12', [RECFormController::class, 'rec12Store'])->name('rec-forms.rec-12.store');
        Route::get('/rec-forms/rec-13', [RECFormController::class, 'rec13'])->name('rec-forms.rec-13');
        Route::post('/rec-forms/rec-13', [RECFormController::class, 'rec13Store'])->name('rec-forms.rec-13.store');
        Route::get('/rec-forms/rec-14', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-14');
        Route::get('/rec-forms/rec-15', [RECFormController::class, 'rec15'])->name('rec-forms.rec-15');
        Route::post('/rec-forms/rec-15', [RECFormController::class, 'rec15Store'])->name('rec-forms.rec-15.store');
        Route::get('/rec-forms/rec-22', [RECFormController::class, 'rec22'])->name('rec-forms.rec-22');
        Route::post('/rec-forms/rec-22', [RECFormController::class, 'rec22Store'])->name('rec-forms.rec-22.store');
        Route::get('/rec-forms/rec-23', [RECFormController::class, 'rec23'])->name('rec-forms.rec-23');
        Route::post('/rec-forms/rec-23', [RECFormController::class, 'rec23Store'])->name('rec-forms.rec-23.store');
        Route::get('/rec-forms/rec-24', [RECFormController::class, 'rec24'])->name('rec-forms.rec-24');
        Route::post('/rec-forms/rec-24', [RECFormController::class, 'rec24Store'])->name('rec-forms.rec-24.store');
        Route::get('/rec-forms/rec-16', [RECFormController::class, 'rec16'])->name('rec-forms.rec-16');
        Route::post('/rec-forms/rec-16', [RECFormController::class, 'rec16Store'])->name('rec-forms.rec-16.store');
        Route::get('/rec-forms/rec-17', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-17');
        Route::get('/rec-forms/rec-18', [RECFormController::class, 'rec18'])->name('rec-forms.rec-18');
        Route::post('/rec-forms/rec-18', [RECFormController::class, 'rec18Store'])->name('rec-forms.rec-18.store');
        Route::get('/rec-forms/rec-19', [RECFormController::class, 'rec19'])->name('rec-forms.rec-19');
        Route::post('/rec-forms/rec-19', [RECFormController::class, 'rec19Store'])->name('rec-forms.rec-19.store');
        Route::get('/rec-forms/rec-20', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-20');
        Route::get('/rec-forms/rec-21', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-21');
        Route::get('/rec-forms/rec-22', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-22');
        Route::get('/rec-forms/rec-23', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-23');
        Route::get('/rec-forms/rec-24', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-24');
        Route::get('/rec-forms/rec-25', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-25');
        Route::get('/rec-forms/rec-26', [RECFormController::class, 'rec26'])->name('rec-forms.rec-26');
        Route::post('/rec-forms/rec-26', [RECFormController::class, 'rec26Store'])->name('rec-forms.rec-26.store');
        Route::get('/rec-forms/rec-27', [RECFormController::class, 'rec27'])->name('rec-forms.rec-27');
        Route::post('/rec-forms/rec-27', [RECFormController::class, 'rec27Store'])->name('rec-forms.rec-27.store');
        Route::get('/rec-forms/rec-28', [RECFormController::class, 'rec28'])->name('rec-forms.rec-28');
        Route::post('/rec-forms/rec-28', [RECFormController::class, 'rec28Store'])->name('rec-forms.rec-28.store');
        Route::get('/rec-forms/rec-29', [RECFormController::class, 'rec29'])->name('rec-forms.rec-29');
        Route::post('/rec-forms/rec-29', [RECFormController::class, 'rec29Store'])->name('rec-forms.rec-29.store');
        Route::get('/rec-forms/rec-30', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-30');
        Route::get('/rec-forms/rec-31', function () {
            return Inertia::render('Administrator/RECForms/REC01'); // Placeholder
        })->name('rec-forms.rec-31');
        Route::get('/upload-center', [ProcedureController::class, 'uploadCenter'])->name('upload-center.index');
        Route::get('/users', [App\Http\Controllers\Administrator\UserController::class, 'index'])->name('users.index');
        Route::post('/users', [App\Http\Controllers\Administrator\UserController::class, 'store'])->name('users.store');
        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('/settings', function () {
            return Inertia::render('Administrator/Settings/Index');
        })->name('settings.index');
        Route::get('/help', function () {
            return Inertia::render('Administrator/Help/Index');
        })->name('help.index');
    });

    // Business Owner Routes
    Route::prefix('business-owner')->name('business-owner.')->middleware('check-subscription')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\BusinessOwner\DashboardController::class, 'index'])->name('dashboard');
        Route::get('/company', [CompanyController::class, 'index'])->name('company.index');
        Route::post('/company', [CompanyController::class, 'store'])->name('company.store');

        // Administrator Management
        Route::post('/administrators', [AdministratorController::class, 'store'])
            ->name('administrators.store')
            ->middleware('can:manage-administrators');

        Route::delete('/administrators/{id}', [AdministratorController::class, 'destroy'])
            ->name('administrators.destroy')
            ->middleware('can:manage-administrators');

        Route::get('/procedures', [ProcedureController::class, 'index'])->name('procedures.index');
        Route::get('/reports', function () {
            return Inertia::render('BusinessOwner/Reports/Index');
        })->name('reports.index');
        Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
        Route::post('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile.update');
        Route::patch('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password.update');
        Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
        Route::post('/subscription/checkout/{plan}', [SubscriptionController::class, 'checkout'])->name('subscription.checkout');
        Route::get('/subscription/success', [SubscriptionController::class, 'success'])->name('subscription.success');
        Route::get('/help-support', function () {
            return Inertia::render('BusinessOwner/HelpSupport/Index');
        })->name('help-support.index');
    });

    // User Routes
    Route::prefix('user')->name('user.')->middleware('check-subscription')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\User\DashboardController::class, 'index'])->name('dashboard');
        Route::get('/procedures', [App\Http\Controllers\User\ProcedureController::class, 'index'])->name('procedures.index');
        Route::patch('/procedures/{procedure}', [App\Http\Controllers\User\ProcedureController::class, 'update'])->name('procedures.update');
        Route::get('/upload-center', [App\Http\Controllers\User\ProcedureController::class, 'uploadCenter'])->name('upload-center.index');
        Route::get('/certificates', [App\Http\Controllers\User\CertificateController::class, 'index'])->name('certificates.index');

        Route::get('/reports', [App\Http\Controllers\User\ReportController::class, 'index'])->name('reports.index');
        Route::get('/help', function () {
            return Inertia::render('User/Help/Index');
        })->name('help.index');
    });

});

// Public Routes (No Auth required)
Route::post('/stripe/webhook', [StripeWebhookController::class, 'handle'])->name('stripe.webhook');

// Administrator Email Verification (outside auth middleware - public link)
Route::get('/administrator/verify-email/{id}/{hash}', [AdministratorController::class, 'verifyEmail'])
    ->name('administrator.verify-email');

require __DIR__.'/auth.php';
