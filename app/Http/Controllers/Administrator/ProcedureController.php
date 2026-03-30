<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProcedureController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        $procedures = Procedure::with('assignedUser')
            ->whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', $ownerId);
            })
            ->latest()
            ->get()
            ->map(function ($proc) {
                return [
                    'id' => $proc->id,
                    'name' => $proc->name,
                    'assigned' => $proc->assignedUser ? "{$proc->assignedUser->first_name} {$proc->assignedUser->last_name}" : 'Unassigned',
                    'assigned_to' => $proc->assigned_to,
                    'status' => match($proc->status) {
                        'in_progress' => 'In Progress',
                        'completed' => 'Completed',
                        'pending_review' => 'Pending Review',
                        default => 'Pending',
                    },
                    'date' => $proc->due_date ? $proc->due_date->format('M d, Y') : 'No Date',
                    'raw_due_date' => $proc->due_date ? $proc->due_date->format('Y-m-d') : '',
                    'raw_status' => $proc->status,
                    'progress' => $proc->progress,
                    'iso_standard' => $proc->iso_standard,
                    'category' => $proc->category,
                    'priority' => match(strtolower($proc->priority)) {
                        'high' => 'High Priority',
                        'low' => 'Low Priority',
                        default => 'Medium Priority',
                    },
                    'description' => $proc->description,
                    'objectives' => $proc->objectives,
                    'scope' => $proc->scope,
                    'checklist' => $proc->checklist ?? [],
                    'milestones' => $proc->milestones ?? [],
                    'team_members' => $proc->team_members ?? [],
                ];
            });

        if ($user->user_type === 'administrator') {
            $users = \App\Models\User::where('business_owner_id', '=', $user->business_owner_id, 'and')
                ->where('id', '!=', $user->id)
                ->select(['id', 'first_name', 'last_name', 'user_type'])
                ->get(['id', 'first_name', 'last_name', 'user_type']);
        } else {
            $users = \App\Models\User::where('business_owner_id', '=', $ownerId, 'and')
                ->orWhere('id', '=', $ownerId)
                ->select(['id', 'first_name', 'last_name', 'user_type'])
                ->get(['id', 'first_name', 'last_name', 'user_type']);
        }

        $view = $user->user_type === 'business_owner' ? 'BusinessOwner/Procedures/Index' : 'Administrator/Procedures/Index';

        return Inertia::render($view, [
            'procedures' => $procedures,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;
        $company = \App\Models\Company::where('user_id', $ownerId)->first();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'iso_standard' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'priority' => 'nullable|string|max:255',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
            'objectives' => 'nullable|string',
            'scope' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'checklist' => 'nullable|array',
            'milestones' => 'nullable|array',
            'team_members' => 'nullable|array',
        ]);

        if (!$company) {
            return back()->withErrors(['company' => 'Business profile not found. Please setup your company first.']);
        }

        $procedure = Procedure::create([
            ...$validated,
            'company_id' => $company->id,
            'created_by' => $user->id,
            'status' => 'pending',
            'progress' => 0,
        ]);


        return back()->with('success', 'Procedure created successfully.');
    }

    public function update(Request $request, Procedure $procedure)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'iso_standard' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'priority' => 'nullable|string|max:255',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
            'objectives' => 'nullable|string',
            'scope' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'sometimes|string|in:pending,in_progress,completed,pending_review,rejected',
            'progress' => 'sometimes|integer|min:0|max:100',
            'checklist' => 'nullable|array',
            'milestones' => 'nullable|array',
            'team_members' => 'nullable|array',
        ]);

        $procedure->update($validated);

        return back()->with('success', 'Procedure updated successfully.');
    }

    public function uploadCenter()
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        $procedures = Procedure::with('assignedUser')
            ->whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', $ownerId);
            })
            ->whereNotNull('uploaded_file_path')
            ->latest('uploaded_at')
            ->get();

        $uploads = $procedures->map(function ($proc) {
            return [
                'id'            => $proc->id,
                'fileName'      => $proc->uploaded_file_name ?? 'Unknown File',
                'uploadedBy'    => $proc->assignedUser ? "{$proc->assignedUser->first_name} {$proc->assignedUser->last_name}" : 'System',
                'procedure'     => $proc->name,
                'uploadDate'    => $proc->uploaded_at ? $proc->uploaded_at->format('M d, Y') : 'N/A',
                'size'          => 'N/A',
                'status'        => match($proc->status) {
                    'completed'      => 'Approved',
                    'rejected'       => 'Rejected',
                    'pending_review' => 'Pending',
                    default          => 'Pending',
                },
                'file_path'     => $proc->uploaded_file_path,
            ];
        });

        $totalCount = $uploads->count();
        $rejectedCount = $uploads->where('status', 'Rejected')->count();

        $stats = [
            'total'     => $totalCount,
            'pending'   => $uploads->where('status', 'Pending')->count(),
            'approved'  => $uploads->where('status', 'Approved')->count(),
            'rejected'  => $totalCount > 0 ? round(($rejectedCount / $totalCount) * 100) . '%' : '0%',
        ];

        return Inertia::render('Administrator/UploadCenter/Index', [
            'uploads' => $uploads->values(),
            'stats'   => $stats,
        ]);
    }
}
