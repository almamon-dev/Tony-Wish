<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    use \App\Traits\HandlesOtp;

    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Send OTP
        $this->sendOtp($request->email);

        // Store email in session to verify OTP later
        session(['reset_password_email' => $request->email]);

        return redirect()->route('password.verify_otp');
    }

    /**
     * Display the OTP verification view.
     */
    public function verifyOtpView(): Response
    {
        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'targetRoute' => 'password.verify_otp.store',
            'resendRoute' => 'password.resend_otp',
            'pageTitle' => 'Reset Password OTP',
            'heading' => 'Check your email for OTP',
            'subheading' => 'We have sent a 6-digit confirmation code to your email. Please enter it below to verify your identity and reset your password.',
        ]);
    }

    /**
     * Handle the OTP verification request.
     */
    public function verifyOtpHandler(Request $request): RedirectResponse
    {
        $request->validate([
            // 'otp' expected as array of 6 digits from the frontend
            'otp' => 'required|array|size:6',
            'otp.*' => 'required|numeric|digits:1',
        ]);

        $email = session('reset_password_email');

        if (! $email) {
            return redirect()->route('password.request')->withErrors(['email' => 'Session expired. Please try again.']);
        }

        $otp = implode('', $request->otp);

        if ($this->verifyOtp($email, $otp)) {
            // OTP is valid.
            $user = \App\Models\User::where('email', $email)->first();

            if (! $user) {
                return back()->withErrors(['otp' => 'User not found.']);
            }

            $token = Password::createToken($user);

            return redirect()->route('password.reset', ['token' => $token, 'email' => $email]);
        }

        return back()->withErrors(['otp' => 'Invalid OTP.']);
    }

    /**
     * Resend the OTP.
     */
    public function resendOtp(Request $request): RedirectResponse
    {
        $email = session('reset_password_email');

        if (! $email) {
            return redirect()->route('password.request');
        }

        $this->sendOtp($email);

        return back()->with('status', 'OTP has been resent to your email.');
    }
}
