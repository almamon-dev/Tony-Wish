<?php

namespace App\Http\Controllers\BusinessOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        return Inertia::render('BusinessOwner/Settings/Index', [
            'user' => $user->load('company'),
        ]);
    }

    public function updateProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'registration_number' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'vat_number' => 'nullable|string|max:255',
            'photo' => 'nullable|image|max:2048',
        ]);

        $userData = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'country' => $request->country,
        ];

        if ($request->hasFile('photo')) {
            // Delete old avatar if exists
            if ($user->avatar) {
                \App\Helpers\Helper::deleteFile($user->avatar);
            }

            $upload = \App\Helpers\Helper::uploadFile('avatars', $request->file('photo'));
            if ($upload) {
                $userData['avatar'] = $upload['original'];
            }
        }

        // Update User
        $user->update($userData);

        // Update Company
        $user->company()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'company_name' => $request->company_name,
                'registration_number' => $request->registration_number,
                'industry' => $request->industry,
                'vat_number' => $request->vat_number,
            ]
        );

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }
}
