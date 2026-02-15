<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
        Route::get('/procedures', function () {
            return Inertia::render('Administrator/Procedures/Index');
        })->name('procedures.index');
        Route::get('/pre-audit-checklists', function () {
            return Inertia::render('Administrator/PreAuditChecklists/Index');
        })->name('pre-audit-checklists.index');
        Route::get('/certificates', function () {
            return Inertia::render('Administrator/Certificates/Index');
        })->name('certificates.index');
        Route::get('/rec-forms', function () {
            return Inertia::render('Administrator/RECForms/Index');
        })->name('rec-forms.index');

        Route::get('/rec-forms/rec-01', function () {
            return Inertia::render('Administrator/RECForms/REC01');
        })->name('rec-forms.rec-01');
        Route::get('/rec-forms/rec-02', function () {
            return Inertia::render('Administrator/RECForms/REC02');
        })->name('rec-forms.rec-02');
        Route::get('/rec-forms/rec-03', function () {
            return Inertia::render('Administrator/RECForms/REC03');
        })->name('rec-forms.rec-03');
        Route::get('/rec-forms/rec-04', function () {
            return Inertia::render('Administrator/RECForms/REC04');
        })->name('rec-forms.rec-04');
        Route::get('/rec-forms/rec-05', function () {
            return Inertia::render('Administrator/RECForms/REC05');
        })->name('rec-forms.rec-05');
        Route::get('/rec-forms/rec-06', function () {
            return Inertia::render('Administrator/RECForms/REC06');
        })->name('rec-forms.rec-06');
        Route::get('/rec-forms/rec-07', function () {
            return Inertia::render('Administrator/RECForms/REC07');
        })->name('rec-forms.rec-07');
        Route::get('/rec-forms/rec-08', function () {
            return Inertia::render('Administrator/RECForms/REC08');
        })->name('rec-forms.rec-08');
        Route::get('/rec-forms/rec-09', function () {
            return Inertia::render('Administrator/RECForms/REC09');
        })->name('rec-forms.rec-09');
        Route::get('/rec-forms/rec-10', function () {
            return Inertia::render('Administrator/RECForms/REC10');
        })->name('rec-forms.rec-10');
        Route::get('/rec-forms/rec-11', function () {
            return Inertia::render('Administrator/RECForms/REC11');
        })->name('rec-forms.rec-11');
        Route::get('/rec-forms/rec-12', function () {
            return Inertia::render('Administrator/RECForms/REC12');
        })->name('rec-forms.rec-12');
        Route::get('/rec-forms/rec-13', function () {
            return Inertia::render('Administrator/RECForms/REC13');
        })->name('rec-forms.rec-13');
        Route::get('/rec-forms/rec-16', function () {
            return Inertia::render('Administrator/RECForms/REC16');
        })->name('rec-forms.rec-16');
        Route::get('/rec-forms/rec-18', function () {
            return Inertia::render('Administrator/RECForms/REC18');
        })->name('rec-forms.rec-18');
        Route::get('/rec-forms/rec-19', function () {
            return Inertia::render('Administrator/RECForms/REC19');
        })->name('rec-forms.rec-19');
        Route::get('/upload-center', function () {
            return Inertia::render('Administrator/UploadCenter/Index');
        })->name('upload-center.index');
        Route::get('/users', function () {
            return Inertia::render('Administrator/Users/Index');
        })->name('users.index');
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
            
        Route::get('/procedures', function () {
            return Inertia::render('BusinessOwner/Procedures/Index');
        })->name('procedures.index');
        Route::get('/reports', function () {
            return Inertia::render('BusinessOwner/Reports/Index');
        })->name('reports.index');
        Route::get('/settings', function () {
            return Inertia::render('BusinessOwner/Settings/Index');
        })->name('settings.index');
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
});

require __DIR__ . '/auth.php';
