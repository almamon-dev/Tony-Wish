<?php

namespace App\Http\Requests\API\Administrator;

use Illuminate\Foundation\Http\FormRequest;

class PreAuditChecklistRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'iso_standard' => 'nullable|string|max:100',
            'audit_type' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'priority' => 'required|in:Low,Medium,High',
            'scheduled_date' => 'required|date',
            'description' => 'nullable|string',
            'audit_objectives' => 'nullable|string',
            'audit_areas' => 'required|array|min:1',
            'audit_areas.*.area_name' => 'required|string|max:255',
            'audit_areas.*.items' => 'required|array|min:1',
            'audit_areas.*.items.*.item_name' => 'required|string|max:255',
            'audit_areas.*.items.*.severity' => 'required|in:Critical,Major,Minor',
            'audit_areas.*.items.*.is_required' => 'boolean',
        ];
    }
}
