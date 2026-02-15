<?php

namespace App\Http\Controllers\BusinessOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = \Illuminate\Support\Facades\Auth::user();

        // Get all administrators for this business owner
        $administrators = $user->administrators()
            ->select('id', 'first_name', 'last_name', 'email', 'department', 'access_level', 'email_verified_at', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($admin) {
                return [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'department' => $admin->department,
                    'access_level' => $admin->access_level,
                    'status' => $admin->email_verified_at ? 'Active' : 'Pending',
                    'verified' => $admin->email_verified_at !== null,
                    'created_at' => $admin->created_at->format('M d, Y'),
                ];
            });

        return \Inertia\Inertia::render('BusinessOwner/Company/Index', [
            'company' => $user->company,
            'administrators' => $administrators,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'registration_number' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'vat_number' => 'nullable|string|max:255',
        ]);

        /** @var \App\Models\User $user */
        $user = \Illuminate\Support\Facades\Auth::user();

        $company = $user->company()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'company_name' => $request->company_name,
                'registration_number' => $request->registration_number,
                'industry' => $request->industry,
                'vat_number' => $request->vat_number,
            ]
        );

        return back()->with('success', 'Company information updated successfully.');
    }
}
