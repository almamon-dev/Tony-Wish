<?php

namespace App\Http\Requests\API\BusinessOwnerDashboard\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_name' => 'nullable|string|max:255',
            'company_type' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'country' => 'nullable|string|max:100',
            'registration_number' => 'nullable|string|max:100',
            'vat_number' => 'nullable|string|max:100',

            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }
}
