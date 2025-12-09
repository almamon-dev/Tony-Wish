<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'terms_and_conditions' => 'required|boolean', // Add this line
        ];
    }

    public function messages(): array
    {
        return [
            'fname.required' => 'First Name is required.',
            'lname.required' => 'Last Name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Email format is invalid.',
            'email.unique' => 'This email is already registered.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
            'terms_and_conditions.required' => 'You must agree to the terms and conditions.', // Add this line
        ];
    }
}
