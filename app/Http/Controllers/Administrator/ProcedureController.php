<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProcedureController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Scope procedures to the company the administrator belongs to
        // If it's a business owner, they own the company.
        // If it's an administrator, they have a business_owner_id.
        
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;
        
        $procedures = Procedure::with('assignedUser')
            ->whereHas('company', function($query) use ($ownerId) {
                $query->where('user_id', $ownerId);
            })
            ->latest()
            ->get()
            ->map(function($proc) {
                return [
                    'id' => $proc->id,
                    'name' => $proc->name,
                    'assigned' => $proc->assignedUser ? $proc->assignedUser->name : 'Unassigned',
                    'status' => ucfirst(str_replace('_', ' ', $proc->status)),
                    'date' => $proc->due_date ? $proc->due_date->format('M d, Y') : 'No date',
                    'progress' => $proc->progress,
                ];
            });

        return Inertia::render('Administrator/Procedures/Index', [
            'procedures' => $procedures,
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
        ]);

        $procedure = Procedure::create([
            ...$validated,
            'company_id' => $company->id,
            'created_by' => $user->id,
            'status' => 'pending',
            'progress' => 0,
        ]);

        return back()->with('success', 'Procedure created successfully.');
    }
}
