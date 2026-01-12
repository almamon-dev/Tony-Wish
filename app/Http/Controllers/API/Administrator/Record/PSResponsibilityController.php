<?php

namespace App\Http\Controllers\API\Administrator\Record;

use App\Http\Controllers\Controller;
use App\Models\PersonnelStructureResponsibility;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PSResponsibilityController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $data = PersonnelStructureResponsibility::all();

        if ($data->isEmpty()) {
            return $this->sendError('Personnel responsibilities data not found', [], 404);
        }

        $apiResponse = $data->map(function ($item) {
            return [
                'id' => $item->id,
                'record_no' => $item->record_no,
                'document_title' => $item->title,
                'revision_date' => $item->revision_date ? $item->revision_date->format('Y-m-d') : null,
                'clauses' => $item->clauses,
                'roles' => collect($item->roles)->map(function ($role) {
                    return [
                        'job_title' => $role['job_title'] ?? '',
                        'responsibilities' => $role['responsibilities'] ?? '',
                        'qty' => (int) ($role['qty'] ?? 1),
                    ];
                }),
                'created_at' => $item->created_at->toDateTimeString(),
                'updated_at' => $item->updated_at->toDateTimeString(),
            ];
        });

        return $this->sendResponse(
            $apiResponse,
            'Personnel Structure & Responsibilities retrieved successfully.'
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'job_title' => 'required|string',
            'responsibilities' => 'required|string',
            'qty' => 'required|integer|min:1',
            'clauses' => 'nullable|string',
            'revision_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray());
        }
        $record = PersonnelStructureResponsibility::where('record_no', 'REC-02')->first();
        $newRole = [
            'job_title' => $request->job_title,
            'responsibilities' => $request->responsibilities,
            'qty' => (int) $request->qty,
        ];

        if ($record) {
            $currentRoles = $record->roles;
            $currentRoles[] = $newRole;
            $record->update([
                'roles' => $currentRoles,
                'clauses' => $request->clauses ?? $record->clauses,
                'revision_date' => $request->revision_date ?? $record->revision_date,
            ]);
        } else {
            $record = PersonnelStructureResponsibility::create([
                'record_no' => 'REC-02',
                'title' => 'Personnel Structure & Responsibilities',
                'revision_date' => $request->revision_date ?? '2025-09-01',
                'clauses' => $request->clauses ?? 'EN 1090 FPC, ISO 9001:2015 Clause 5.3',
                'roles' => [$newRole],
            ]);
        }

        return $this->sendResponse([], 'New field added to REC-02 successfully.');
    }

    // -- delete
    public function destroy(Request $request)
    {
        $request->validate([
            'job_title' => 'required|string',
        ]);

        $record = PersonnelStructureResponsibility::where('record_no', 'REC-02')->first();

        if (! $record) {
            return $this->sendError('Record not found', [], 404);
        }
        $currentRoles = collect($record->roles);
        $updatedRoles = $currentRoles->filter(function ($role) use ($request) {
            return $role['job_title'] !== $request->job_title;
        })->values()->all();

        $record->update(['roles' => $updatedRoles]);

        return $this->sendResponse([], 'Job role deleted successfully.');
    }
}
