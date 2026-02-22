<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        $users = User::where('business_owner_id', $ownerId)
            ->where('user_type', 'userdashboard')
            ->with('creator')
            ->latest()
            ->get();

        return Inertia::render('Administrator/Users/Index', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $admin = Auth::user();
        $ownerId = $admin->user_type === 'business_owner' ? $admin->id : $admin->business_owner_id;

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $newUser = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => 'userdashboard',
            'business_owner_id' => $ownerId,
            'created_by' => $admin->id,
            'phone' => $request->phone,
            'department' => $request->department,
            'access_level' => $request->user_role,
        ]);

        try {
            // Generate signed verification URL
            $verificationUrl = \Illuminate\Support\Facades\URL::temporarySignedRoute(
                'user.verify-email',
                now()->addDays(3),
                ['id' => $newUser->id, 'hash' => sha1($newUser->email)]
            );

            \Illuminate\Support\Facades\Mail::to($newUser->email)->send(
                new \App\Mail\UserCreatedNotification($newUser, $request->password, $verificationUrl)
            );
        } catch (\Exception $e) {
            // Log error or handle gracefully
            \Illuminate\Support\Facades\Log::error("Failed to send welcome email to {$newUser->email}: " . $e->getMessage());
        }

        return back()->with('success', 'User added successfully and verification email sent.');
    }

    public function verifyEmail(Request $request, $id, $hash)
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'Invalid or expired verification link.');
        }

        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403, 'Invalid verification link.');
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->route('login')->with('success', 'Email already verified. Please login.');
        }

        if ($user->markEmailAsVerified()) {
            event(new \Illuminate\Auth\Events\Verified($user));
        }

        Auth::login($user);

        return redirect()->route('dashboard')->with('success', 'Email verified successfully! Welcome to your dashboard.');
    }
}
