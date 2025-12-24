<?php

namespace App\Http\Controllers\API\Administrator\Procedure;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Procedure;
use App\Traits\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class IndexController extends Controller
{
    use ApiResponse;

    /**
     * Display procedures.
     */
    public function index()
    {
        $procedures = Procedure::with(['members:id,fname,lname', 'files'])
            ->latest()
            ->get();

        $formatted = $procedures->map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'assigned_to' => $p->members->map(fn ($m) => trim($m->fname.' '.$m->lname))->implode(', ') ?: 'Unassigned',
                'status' => $p->status,
                'due_date' => $p->due_date ? date('M d, Y', strtotime($p->due_date)) : 'N/A',
            ];
        });

        return $this->sendResponse($formatted, 'Procedures retrieved successfully.');
    }

    /**
     * Store procedure with member validation (added_by logic).
     */
    public function store(Request $request)
    {
        $authUserId = auth()->id();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'checklist_items' => 'nullable|array',
            'assigned_members' => 'nullable|array',
            'assigned_members.*' => [
                'exists:users,id',
                Rule::exists('users', 'id')->where(function ($query) use ($authUserId) {
                    $query->where(function ($q) use ($authUserId) {
                        $q->where('added_by', $authUserId)->orWhere('id', $authUserId);
                    })->where('user_type', 'user');
                }),
            ],
            'milestones' => 'nullable|array',
            'milestones.*.name' => 'required|string',
            'milestones.*.date' => 'required|date',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:pdf,doc,docx,jpg,png|max:20048',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        try {
            return DB::transaction(function () use ($request) {
                // 1. Create Procedure
                $procedure = Procedure::create([
                    'name' => $request->name,
                    'iso_standard' => $request->iso_standard,
                    'priority_level' => $request->priority_level,
                    'category' => $request->category,
                    'due_date' => $request->due_date,
                    'description' => $request->description,
                    'objectives' => $request->objectives,
                    'scope' => $request->scope,
                    'status' => $request->status ?? 'pending',
                ]);

                // 2. Checklist (Relationship use korle id auto bose)
                if ($request->has('checklist_items')) {
                    foreach ($request->checklist_items as $item) {
                        $procedure->checklistItems()->create(['name' => $item]);
                    }
                }

                // 3. Members
                if ($request->has('assigned_members')) {
                    $procedure->members()->sync($request->assigned_members);
                }

                // 4. Milestones (Fixing your procedure_id error)
                if ($request->has('milestones')) {
                    foreach ($request->milestones as $ms) {
                        $procedure->milestones()->create([
                            'name' => $ms['name'],
                            'date' => $ms['date'],
                        ]);
                    }
                }

                // 5. File Upload Logic
                if ($request->hasFile('files')) {
                    foreach ($request->file('files') as $file) {
                        // 1. Capture the data FIRST
                        $fileName = $file->getClientOriginalName();
                        $fileSize = number_format($file->getSize() / 1024, 2).' KB';

                        // 2. NOW move/upload the file
                        $path = Helper::uploadFile('procedures', $file);

                        // 3. Save to database
                        $procedure->files()->create([
                            'file_name' => $fileName,
                            'file_path' => $path,
                            'file_size' => $fileSize,
                        ]);
                    }
                }

                return $this->sendResponse(
                    [], 'Procedure created successfully.',
                );
            });
        } catch (Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }

    /**
     * Update procedure.
     */
    public function update(Request $request, $id)
    {
        $authUserId = auth()->id();
        $procedure = Procedure::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'checklist_items' => 'nullable|array',
            'assigned_members' => 'nullable|array',
            'assigned_members.*' => [
                'exists:users,id',
                Rule::exists('users', 'id')->where(function ($query) use ($authUserId) {
                    $query->where(function ($q) use ($authUserId) {
                        $q->where('added_by', $authUserId)->orWhere('id', $authUserId);
                    })->where('user_type', 'user');
                }),
            ],
            'milestones' => 'nullable|array',
            'milestones.*.name' => 'required|string',
            'milestones.*.date' => 'required|date',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:pdf,doc,docx,jpg,png|max:20480',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        try {
            return DB::transaction(function () use ($request, $procedure) {
                $procedure->update([
                    'name' => $request->name,
                    'iso_standard' => $request->iso_standard,
                    'priority_level' => $request->priority_level,
                    'category' => $request->category,
                    'due_date' => $request->due_date,
                    'description' => $request->description,
                    'objectives' => $request->objectives,
                    'scope' => $request->scope,
                    'status' => $request->status ?? $procedure->status,
                ]);

                if ($request->has('checklist_items')) {
                    $procedure->checklistItems()->delete();
                    foreach ($request->checklist_items as $item) {
                        $procedure->checklistItems()->create(['name' => $item]);
                    }
                }

                if ($request->has('assigned_members')) {
                    $procedure->members()->sync($request->assigned_members);
                }

                if ($request->has('milestones')) {
                    $procedure->milestones()->delete();
                    foreach ($request->milestones as $ms) {
                        $procedure->milestones()->create([
                            'name' => $ms['name'],
                            'date' => $ms['date'],
                        ]);
                    }
                }
                if ($request->hasFile('files')) {
                    foreach ($procedure->files as $oldFile) {
                        Helper::deleteFile($oldFile->file_path);
                    }
                    $procedure->files()->delete();
                    foreach ($request->file('files') as $file) {
                        $fileName = $file->getClientOriginalName();
                        $fileSize = number_format($file->getSize() / 1024, 2).' KB';
                        $path = Helper::uploadFile('procedures', $file);

                        $procedure->files()->create([
                            'file_name' => $fileName,
                            'file_path' => $path,
                            'file_size' => $fileSize,
                        ]);
                    }
                }

                return $this->sendResponse(
                    [],
                    'Procedure updated successfully.'
                );
            });
        } catch (Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }

    /**
     * Delete procedure.
     */
    public function destroy($id)
    {
        $procedure = Procedure::find($id);
        if ($procedure) {
            $procedure->delete();

            return $this->sendResponse([], 'Deleted successfully.');
        }

        return $this->sendError('Not found');
    }
}
