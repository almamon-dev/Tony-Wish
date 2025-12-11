<?php

use App\Http\Controllers\API\BusinessOwnerDashboard\CompanyManagement\IndexController;
use App\Livewire\Admin\Products\CreateComponent as ProductsCreateComponent;
use App\Livewire\Admin\Products\IndexComponent as ProductsIndexComponent;
use App\Livewire\Admin\Profile\IndexComponent as ProfileIndexComponent;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('welcome');
});

Route::get('/accept-invitation/{token}', [IndexController::class, 'acceptInvitation'])
    ->name('accept.administrator.invitation');

Route::get('/admin/products', ProductsIndexComponent::class)->name('admin.products.index');
Route::get('/admin/product/create', ProductsCreateComponent::class)->name('admin.products.create');
Route::get('/admin/profile', ProfileIndexComponent::class)->name('admin.profile.index');
