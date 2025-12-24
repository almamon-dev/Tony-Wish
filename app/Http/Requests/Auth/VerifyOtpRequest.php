<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $otpLength = config('auth.otp.length');

        return [
            'email' => 'required|email|exists:users,email',
            'otp' => "required|digits:{$otpLength}",
        ];
    }

    public function messages(): array
    {
        $otpLength = config('auth.otp.length');

        return [
            'email.required' => 'Email address is required.',
            'email.email' => 'Invalid email format.',
            'email.exists' => 'This email is not registered.',
            'otp.required' => 'OTP is required.',
            'otp.digits' => "OTP must be exactly {$otpLength} digits.",
        ];
    }
}
