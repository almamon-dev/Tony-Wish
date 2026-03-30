<?php

namespace App\Http\Controllers\User;

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

        $procedures = Procedure::with('creator')
            ->where('assigned_to', $user->id)
            ->orderBy('due_date', 'asc')
            ->get();

        $formattedProcedures = $procedures->map(function ($proc) {
            return [
                'id' => $proc->id,
                'name' => $proc->name,
                'status' => match($proc->status) {
                    'in_progress' => 'In Progress',
                    'completed' => 'Completed',
                    'pending_review' => 'Pending Review',
                    default => 'Pending',
                },
                'raw_status' => $proc->status,
                'progress' => $proc->progress,
                'date' => $proc->due_date ? $proc->due_date->format('M d, Y') : 'No date',
                'due' => $proc->due_date ? $proc->due_date->format('M d, Y') : 'No date',
                'desc' => $proc->description ?? 'No description provided.',
                'objectives' => $proc->objectives ?? 'No objectives specified.',
                'scope' => $proc->scope ?? 'No scope defined.',
                'assignedBy' => $proc->creator ? $proc->creator->name : 'System',
                'tasks' => is_array($proc->checklist) ? count(array_filter($proc->checklist, fn($t) => $t['completed'] ?? false)) . '/' . count($proc->checklist) : '0/0',
                'checklist' => $proc->checklist ?? [],
                'uploaded_file_name' => $proc->uploaded_file_name,
                'uploaded_file_path' => $proc->uploaded_file_path,
                'uploaded_at' => $proc->uploaded_at ? $proc->uploaded_at->format('M d, Y') : null,
            ];
        });

        return Inertia::render('User/Procedures/Index', [
            'procedures' => $formattedProcedures,
        ]);

    }

    public function update(Request $request, Procedure $procedure)
    {
        // Security check: only allow updating assigned procedures
        if ($procedure->assigned_to !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|string|in:pending,in_progress,completed,pending_review',
            'progress' => 'integer|min:0|max:100',
            'file' => 'nullable|file|mimes:pdf,doc,docx,zip|max:10240',
        ]);

        $data = [
            'status' => $request->status,
            'progress' => $request->progress ?? $procedure->progress,
        ];

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('procedures', 'public');
            
            $data['uploaded_file_path'] = $path;
            $data['uploaded_file_name'] = $file->getClientOriginalName();
            $data['uploaded_at'] = now();
            
            // If file is uploaded, set status to pending_review if it was in_progress
            if ($data['status'] === 'in_progress') {
                $data['status'] = 'pending_review';
            }
        }

        $procedure->update($data);

        return redirect()->back()->with('success', 'Procedure updated successfully!');
    }

    public function uploadCenter()
    {
        $user = Auth::user();

        $procedures = Procedure::where('assigned_to', $user->id)
            ->whereNotNull('uploaded_file_path')
            ->orderBy('uploaded_at', 'desc')
            ->get();

        $uploads = $procedures->map(function ($proc) {
            return [
                'id'            => $proc->id,
                'name'          => $proc->uploaded_file_name ?? 'Unknown File',
                'procedure'     => $proc->name,
                'date'          => $proc->uploaded_at ? $proc->uploaded_at->format('M d, Y') : 'N/A',
                'file_path'     => $proc->uploaded_file_path,
                'status'        => match($proc->status) {
                    'completed'      => 'Approved',
                    'pending_review' => 'Pending',
                    default          => 'Pending',
                },
            ];
        });

        $stats = [
            'total'         => $uploads->count(),
            'pending'       => $uploads->where('status', 'Pending')->count(),
            'approved'      => $uploads->where('status', 'Approved')->count(),
            'this_month'    => $procedures->filter(fn($p) => $p->uploaded_at && $p->uploaded_at->isCurrentMonth())->count(),
        ];

        return Inertia::render('User/UploadCenter/Index', [
            'uploads' => $uploads->values(),
            'stats'   => $stats,
        ]);
    }
}
