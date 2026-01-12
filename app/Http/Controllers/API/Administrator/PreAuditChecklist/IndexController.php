<?php

namespace App\Http\Controllers\API\Administrator\PreAuditChecklist;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Administrator\PreAuditChecklistRequest;
use App\Http\Resources\API\Administrator\PreAuditChecklistResource;
use App\Models\PreAuditChecklist;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class IndexController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $checklists = PreAuditChecklist::all();

        $summary = [
            'total_checklist' => $checklists->count(),
            'completed' => $checklists->where('status', 'completed')->count(),
            'in_progress' => $checklists->where('status', 'in_progress')->count(),
        ];

        return $this->sendResponse([
            'summary' => $summary,
            'list' => PreAuditChecklistResource::collection($checklists),
        ], 'Data retrieved successfully');
    }

    public function store(PreAuditChecklistRequest $request)
    {
        try {
            $checklist = DB::transaction(function () use ($request) {
                $checklist = PreAuditChecklist::create(array_merge(
                    $request->validated(),
                    ['user_id' => auth()->id()]
                ));

                foreach ($request->audit_areas as $areaData) {
                    $area = $checklist->areas()->create([
                        'area_name' => $areaData['area_name'],
                    ]);

                    $area->items()->createMany($areaData['items']);
                }

                return $checklist;
            });

            return $this->sendResponse($checklist, 'Checklist created successfully');

        } catch (\Exception $e) {
            Log::error('Failed to create checklist', ['error' => $e->getMessage()]);

            return $this->sendError('Failed to create checklist');
        }
    }

    public function update(PreAuditChecklistRequest $request, $id)
    {
        try {

            $checklist = PreAuditChecklist::findOrFail($id);

            $updatedChecklist = DB::transaction(function () use ($request, $checklist) {
                $checklist->update($request->validated());

                if ($request->has('audit_areas')) {
                    $checklist->areas()->delete();

                    foreach ($request->audit_areas as $areaData) {
                        $area = $checklist->areas()->create([
                            'area_name' => $areaData['area_name'],
                        ]);

                        if (! empty($areaData['items'])) {
                            $area->items()->createMany($areaData['items']);
                        }
                    }
                }

                return $checklist;
            });

            return $this->sendResponse(
                new PreAuditChecklistResource($updatedChecklist->load('areas.items')),
                'Pre-Audit Checklist updated successfully'
            );

        } catch (\Exception $e) {
            Log::error('Update Failed', ['error' => $e->getMessage()]);

            return $this->sendError('Failed to update checklist');
        }
    }
}
