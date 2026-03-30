<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $tasks = Procedure::with('creator')
            ->where('assigned_to', $user->id)
            ->latest('created_at')
            ->limit(10)
            ->get(['id', 'name', 'status', 'progress', 'due_date', 'priority', 'checklist', 'description', 'created_by', 'objectives', 'scope'])

            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'name' => $task->name,
                    'status' => match($task->status) {
                        'in_progress' => 'In Progress',
                        'completed' => 'Completed',
                        'pending_review' => 'Pending Review',
                        default => 'Pending',
                    },
                    'raw_status' => $task->status,
                    'progress' => $task->progress,
                    'date' => $task->due_date ? $task->due_date->format('M d, Y') : 'No date',
                    'due' => $task->due_date ? $task->due_date->format('M d, Y') : 'No date',
                    'priority' => ucfirst($task->priority ?? 'medium'),
                    'desc' => $task->description ?? 'No description provided.',
                    'objectives' => $task->objectives ?? 'No objectives specified.',
                    'scope' => $task->scope ?? 'No scope defined.',
                    'assignedBy' => $task->creator ? $task->creator->name : 'System',
                    'tasks' => is_array($task->checklist) ? count($task->checklist) . '/' . count($task->checklist) : '0/0',
                    'checklist' => $task->checklist ?? [],
                ];
            });

        $totalTasks = Procedure::where('assigned_to', $user->id)->count();
        $inProgressTasks = Procedure::where('assigned_to', $user->id)->where('status', 'in_progress')->count();
        $completedTasks = Procedure::where('assigned_to', $user->id)->where('status', 'completed')->count();
        $overdueTasks = Procedure::where('assigned_to', $user->id)
            ->where('status', '!=', 'completed')
            ->where('due_date', '<', now())
            ->count();

        return Inertia::render('User/Dashboard', [
            'stats' => [
                'total' => $totalTasks,
                'inProgress' => $inProgressTasks,
                'completed' => $completedTasks,
                'overdue' => $overdueTasks,
            ],
            'tasks' => $tasks,
        ]);
    }
}
