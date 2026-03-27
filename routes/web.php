<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Administrator\RECFormController;

Route::get('/', function () {
    return Inertia::render('Landing/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = \Illuminate\Support\Facades\Auth::user();

    return match ($user->user_type) {
        'admin' => Inertia::render('Admin/Dashboard'),
        'administrator' => redirect()->route('administrator.dashboard'),
        'business_owner' => Inertia::render('BusinessOwner/Dashboard'),
        'userdashboard' => Inertia::render('User/Dashboard'),
        default => Inertia::render('Dashboard'),
    };
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
        Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
        Route::get('sub-categories', [\App\Http\Controllers\Admin\CategoryController::class, 'subCategories'])->name('sub-categories.index');

        // Settings Routes
        Route::prefix('settings')->name('settings.')->group(function () {
            // General Settings
            Route::prefix('general')->name('general.')->group(function () {
                Route::get('/', function () {
                    return Inertia::render('Admin/Settings/General/General');
                })->name('index');
                Route::get('profile', function () {
                    return Inertia::render('Admin/Settings/General/Profile');
                })->name('profile');
                Route::get('security', function () {
                    return Inertia::render('Admin/Settings/General/Security');
                })->name('security');
                Route::get('notifications', function () {
                    return Inertia::render('Admin/Settings/General/Notifications');
                })->name('notifications');
            });

            // Website Settings
            Route::prefix('website')->name('website.')->group(function () {
                Route::get('system', function () {
                    return Inertia::render('Admin/Settings/Website/System');
                })->name('system');
                Route::get('company', function () {
                    return Inertia::render('Admin/Settings/Website/Company');
                })->name('company');
                Route::get('localization', function () {
                    return Inertia::render('Admin/Settings/Website/Localization');
                })->name('localization');
                Route::get('prefixes', function () {
                    return Inertia::render('Admin/Settings/Website/Prefixes');
                })->name('prefixes');
                Route::get('preference', function () {
                    return Inertia::render('Admin/Settings/Website/Preference');
                })->name('preference');
                Route::get('appearance', function () {
                    return Inertia::render('Admin/Settings/Website/Appearance');
                })->name('appearance');
                Route::get('social-auth', function () {
                    return Inertia::render('Admin/Settings/Website/SocialAuthentication');
                })->name('social-auth');
            });

            // System Settings
            Route::prefix('system')->name('system.')->group(function () {
                Route::get('email', function () {
                    return Inertia::render('Admin/Settings/System/Email');
                })->name('email');
                Route::get('sms', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'SMS Settings']);
                })->name('sms');
                Route::get('otp', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'OTP Settings']);
                })->name('otp');
                Route::get('gdpr', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'GDPR Settings']);
                })->name('gdpr');
            });

            // Financial Settings
            Route::prefix('financial')->name('financial.')->group(function () {
                Route::get('gateway', function () {
                    return Inertia::render('Admin/Settings/Financial/Gateway');
                })->name('gateway');
                Route::get('bank-accounts', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'Bank Accounts']);
                })->name('bank-accounts');
                Route::get('tax-rates', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'Tax Rates']);
                })->name('tax-rates');
                Route::get('currencies', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'Currencies']);
                })->name('currencies');
            });

            // Other Settings
            Route::prefix('other')->name('other.')->group(function () {
                Route::get('storage', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'Storage Settings']);
                })->name('storage');
                Route::get('ban-ip', function () {
                    return Inertia::render('Admin/Settings/Placeholder', ['title' => 'Ban IP Address']);
                })->name('ban-ip');
            });
        });
    });

    // Administrator Routes (Company Owner)
    Route::prefix('administrator')->name('administrator.')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Administrator/Dashboard');
        })->name('dashboard');
        Route::get('/procedures', [\App\Http\Controllers\Administrator\ProcedureController::class, 'index'])->name('procedures.index');
        Route::post('/procedures', [\App\Http\Controllers\Administrator\ProcedureController::class, 'store'])->name('procedures.store');
        Route::get('/pre-audit-checklists', [\App\Http\Controllers\Administrator\PreAuditChecklistController::class, 'index'])->name('pre-audit-checklists.index');
        Route::post('/pre-audit-checklists', [\App\Http\Controllers\Administrator\PreAuditChecklistController::class, 'store'])->name('pre-audit-checklists.store');
        Route::get('/pre-audit-checklists/{id}', [\App\Http\Controllers\Administrator\PreAuditChecklistController::class, 'show'])->name('pre-audit-checklists.show');
        Route::get('/pre-audit-checklists/{id}/edit', [\App\Http\Controllers\Administrator\PreAuditChecklistController::class, 'edit'])->name('pre-audit-checklists.edit');
        Route::put('/pre-audit-checklists/{id}', [\App\Http\Controllers\Administrator\PreAuditChecklistController::class, 'update'])->name('pre-audit-checklists.update');
        Route::get('/certificates', function () {
            return Inertia::render('Administrator/Certificates/Index');
        })->name('certificates.index');
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
        Route::get('/upload-center', function () {
            return Inertia::render('Administrator/UploadCenter/Index');
        })->name('upload-center.index');
        Route::get('/users', [\App\Http\Controllers\Administrator\UserController::class, 'index'])->name('users.index');
        Route::post('/users', [\App\Http\Controllers\Administrator\UserController::class, 'store'])->name('users.store');
        Route::get('/reports', function () {
            return Inertia::render('Administrator/Reports/Index');
        })->name('reports.index');
        Route::get('/settings', function () {
            return Inertia::render('Administrator/Settings/Index');
        })->name('settings.index');
        Route::get('/help', function () {
            return Inertia::render('Administrator/Help/Index');
        })->name('help.index');
    });

    // Business Owner Routes
    Route::prefix('business-owner')->name('business-owner.')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('BusinessOwner/Dashboard');
        })->name('dashboard');
        Route::get('/company', [\App\Http\Controllers\BusinessOwner\CompanyController::class, 'index'])->name('company.index');
        Route::post('/company', [\App\Http\Controllers\BusinessOwner\CompanyController::class, 'store'])->name('company.store');
        
        // Administrator Management
        Route::post('/administrators', [\App\Http\Controllers\BusinessOwner\AdministratorController::class, 'store'])
            ->name('administrators.store')
            ->middleware('can:manage-administrators');
            
        Route::get('/procedures', [\App\Http\Controllers\Administrator\ProcedureController::class, 'index'])->name('procedures.index');
        Route::get('/reports', function () {
            return Inertia::render('BusinessOwner/Reports/Index');
        })->name('reports.index');
        Route::get('/settings', [\App\Http\Controllers\BusinessOwner\SettingsController::class, 'index'])->name('settings.index');
        Route::post('/settings/profile', [\App\Http\Controllers\BusinessOwner\SettingsController::class, 'updateProfile'])->name('settings.profile.update');
        Route::patch('/settings/password', [\App\Http\Controllers\BusinessOwner\SettingsController::class, 'updatePassword'])->name('settings.password.update');
        Route::get('/subscription', function () {
            return Inertia::render('BusinessOwner/Subscription/Index');
        })->name('subscription.index');
        Route::get('/help-support', function () {
            return Inertia::render('BusinessOwner/HelpSupport/Index');
        })->name('help-support.index');
    });
    
    // Administrator Email Verification (outside auth middleware - public link)
    Route::get('/administrator/verify-email/{id}/{hash}', [\App\Http\Controllers\BusinessOwner\AdministratorController::class, 'verifyEmail'])
        ->name('administrator.verify-email');

    // User Email Verification
    Route::get('/user/verify-email/{id}/{hash}', [\App\Http\Controllers\Administrator\UserController::class, 'verifyEmail'])
        ->name('user.verify-email');
});

require __DIR__ . '/auth.php';
