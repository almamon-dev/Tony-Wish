<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use App\Traits\ApiResponse;
use Exception;

class ProcedureController extends Controller
{
    use ApiResponse;

    public function procedureList()
    {
        try {
            Procedure::where('status', 'pending')->update(['status' => 'in_progress']);
            $totalAssigned = Procedure::count();
            $completed = Procedure::where('status', 'completed')->count();
            $inProgress = Procedure::where('status', 'in_progress')->count();
            $procedures = Procedure::withCount([
                'checklistItems as total_tasks',
                'checklistItems as completed_tasks' => function ($query) {
                    $query->where('is_completed', true);
                },
            ])
                ->latest()
                ->get()
                ->map(function ($procedure) {
                    $progress = $procedure->total_tasks > 0
                        ? round(($procedure->completed_tasks / $procedure->total_tasks) * 100)
                        : 0;

                    return [
                        'id' => $procedure->id,
                        'name' => $procedure->name,
                        'iso_standard' => $procedure->iso_standard,
                        'status' => $procedure->status,
                        'progress' => $progress,
                        'tasks_count' => "{$procedure->completed_tasks}/{$procedure->total_tasks}",
                        'due_date' => optional($procedure->due_date)->format('M d'),
                    ];
                });
            $apiResponse = [
                'assign_procedure' => $totalAssigned,
                'complete_procedure' => $completed,
                'in_progress_procedure' => $inProgress,
                'procedures' => $procedures,
            ];

            return $this->sendResponse($apiResponse, 'Status updated and procedures fetched.');

        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    // view procedure
    public function showProcedure($id)
    {
        try {

            $procedure = Procedure::with([
                'checklistItems',
                'milestones',
                'files',
                'members',
            ])
                ->withCount([
                    'checklistItems as total_tasks',
                    'checklistItems as completed_tasks' => function ($query) {
                        $query->where('is_completed', true);
                    },
                ])
                ->findOrFail($id);

            $progress = $procedure->total_tasks > 0
                ? round(($procedure->completed_tasks / $procedure->total_tasks) * 100)
                : 0;

            $data = [
                'id' => $procedure->id,
                'name' => $procedure->name,
                'iso_standard' => $procedure->iso_standard,
                'priority_level' => $procedure->priority_level,
                'category' => $procedure->category,
                'due_date' => optional($procedure->due_date)->format('M d, Y'),
                'description' => $procedure->description,
                'objectives' => $procedure->objectives,
                'scope' => $procedure->scope,
                'status' => $procedure->status,
                'progress' => $progress,
                'tasks_count_text' => "{$procedure->completed_tasks}/{$procedure->total_tasks}",
                'checklists' => $procedure->checklistItems,
                'milestones' => $procedure->milestones,
                'files' => $procedure->files,
                'members' => $procedure->members,
            ];

            return $this->sendResponse($data, 'Procedure details fetched successfully.');

        } catch (Exception $e) {
            return $this->sendError('Procedure not found or Error: '.$e->getMessage());
        }
    }

    // upload task

}
