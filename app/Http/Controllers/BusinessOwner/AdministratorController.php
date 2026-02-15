<?php

namespace App\Http\Controllers\BusinessOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdministratorController extends Controller
{
    protected $administratorService;

    public function __construct(\App\Services\AdministratorService $administratorService)
    {
        $this->administratorService = $administratorService;
    }

    public function store(\App\Http\Requests\BusinessOwner\StoreAdministratorRequest $request)
    {
        try {
            $this->administratorService->createAdministrator($request->validated());
            return back()->with('success', 'Administrator invitation sent successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to invite administrator: ' . $e->getMessage());
        }
    }

    public function verifyEmail(\Illuminate\Http\Request $request, $id, $hash)
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'Invalid or expired verification link.');
        }

        try {
            $user = $this->administratorService->verifyAdministrator($id, $hash);
            
            // Auto-login the user after email verification
            \Illuminate\Support\Facades\Auth::login($user);
            
            // Redirect to administrator dashboard with success message
            return redirect()->route('administrator.dashboard')->with('success', 'Email verified successfully! Welcome to your dashboard.');
        } catch (\Exception $e) {
            abort(403, $e->getMessage());
        }
    }
}
