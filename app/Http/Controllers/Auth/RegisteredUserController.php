<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    use \App\Traits\HandlesOtp;

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => 'business_owner',
        ]);

        event(new Registered($user));

        // Send OTP
        $this->sendOtp($request->email);

        // Store email in session
        session(['verification_email' => $request->email]);

        return redirect()->route('register.verify_otp')->with('status', 'verification-link-sent');
    }

    /**
     * Display the OTP verification view.
     */
    public function verifyOtpView(): Response
    {
        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'targetRoute' => 'register.verify_otp.store',
            'resendRoute' => 'register.resend_otp',
        ]);
    }

    /**
     * Handle the OTP verification request.
     */
    public function verifyOtpHandler(Request $request): RedirectResponse
    {
        $request->validate([
            'otp' => 'required|array|size:6',
            'otp.*' => 'required|numeric|digits:1',
        ]);

        $email = session('verification_email');

        if (! $email) {
            return redirect()->route('register')->withErrors(['email' => 'Session expired. Please register again.']);
        }

        $otp = implode('', $request->otp);

        if ($this->verifyOtp($email, $otp)) {
            $user = User::where('email', $email)->firstOrFail();

            if (! $user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
            }

            Auth::login($user);

            return redirect(route('dashboard', absolute: false));
        }

        return back()->withErrors(['otp' => 'Invalid OTP.']);
    }

    /**
     * Resend the OTP.
     */
    public function resendOtp(Request $request): RedirectResponse
    {
        $email = session('verification_email');

        if (! $email) {
            return redirect()->route('register');
        }

        $this->sendOtp($email);

        return back()->with('status', 'OTP has been resent to your email.');
    }
}
