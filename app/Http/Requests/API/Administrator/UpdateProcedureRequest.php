<?php

namespace App\Http\Requests\API\Administrator;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProcedureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Change based on your authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'iso_standard' => 'nullable|string|max:100',
            'priority_level' => 'nullable|string|in:low,medium,high,critical',
            'category' => 'nullable|string|max:100',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
            'objectives' => 'nullable|string',
            'scope' => 'nullable|string',
            'status' => 'nullable|string|in:in_progress,completed,pending,cancelled',

            // For checklist items
            'checklist_items' => 'nullable|array',
            'checklist_items.*' => 'string|max:255',

            // For assigned members
            'assigned_members' => 'nullable|array',
            'assigned_members.*' => 'exists:users,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The procedure name is required.',
            'priority_level.in' => 'Priority level must be low, medium, high, or critical.',
            'status.in' => 'Status must be in_progress, completed, pending, or cancelled.',
            'assigned_members.*.exists' => 'Selected user does not exist.',
        ];
    }
}
