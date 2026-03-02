<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\PreAuditChecklist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PreAuditChecklistController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        $checklists = PreAuditChecklist::whereHas('creator', function ($query) use ($ownerId) {
                $query->where('business_owner_id', $ownerId);
            })
            ->with(['creator', 'areas.items', 'team.user'])
            ->latest()
            ->get();

        $auditors = User::where('business_owner_id', $ownerId)
            ->where('user_type', 'userdashboard')
            ->get();

        return Inertia::render('Administrator/PreAuditChecklists/Index', [
            'checklists' => $checklists,
            'auditors' => $auditors
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'iso_standard' => 'required|string',
            'audit_type' => 'required|string',
            'scheduled_date' => 'required|date',
            'audit_areas' => 'required|array|min:1',
            'audit_areas.*.name' => 'required|string',
            'audit_areas.*.items' => 'required|array|min:1',
        ]);

        $checklist = PreAuditChecklist::create([
            'name' => $request->name,
            'iso_standard' => $request->iso_standard,
            'audit_type' => $request->audit_type,
            'department' => $request->department,
            'priority' => $request->priority ?? 'Medium',
            'scheduled_date' => $request->scheduled_date,
            'description' => $request->description,
            'objectives' => $request->objectives,
            'status' => 'In Progress',
            'created_by' => $user->id,
        ]);

        foreach ($request->audit_areas as $areaData) {
            $area = $checklist->areas()->create([
                'name' => $areaData['name'],
            ]);

            foreach ($areaData['items'] as $itemData) {
                $area->items()->create([
                    'text' => $itemData['text'],
                    'tags' => $itemData['tags'] ?? [],
                ]);
            }
        }

        if ($request->has('audit_team') && is_array($request->audit_team)) {
            foreach ($request->audit_team as $memberData) {
                if (isset($memberData['user_id'])) {
                    $checklist->team()->create([
                        'user_id' => $memberData['user_id'],
                        'role' => $memberData['role'] ?? 'Auditor',
                    ]);
                }
            }
        }

        return redirect()->route('administrator.pre-audit-checklists.index')->with('success', 'Pre-Audit Checklist created successfully.');
    }

    public function show($id)
    {
        $checklist = PreAuditChecklist::with(['creator', 'areas.items', 'team.user'])
            ->findOrFail($id);

        return Inertia::render('Administrator/PreAuditChecklists/Show', [
            'checklist' => $checklist
        ]);
    }

    public function edit($id)
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        $checklist = PreAuditChecklist::with(['areas.items', 'team.user'])
            ->findOrFail($id);

        $auditors = User::where('business_owner_id', $ownerId)
            ->where('user_type', 'userdashboard')
            ->get();

        return Inertia::render('Administrator/PreAuditChecklists/Edit', [
            'checklist' => $checklist,
            'auditors' => $auditors
        ]);
    }

    public function update(Request $request, $id)
    {
        $checklist = PreAuditChecklist::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'iso_standard' => 'required|string',
            'audit_type' => 'required|string',
            'scheduled_date' => 'required|date',
            'audit_areas' => 'required|array|min:1',
            'audit_areas.*.name' => 'required|string',
        ]);

        $checklist->update([
            'name' => $request->name,
            'iso_standard' => $request->iso_standard,
            'audit_type' => $request->audit_type,
            'department' => $request->department,
            'priority' => $request->priority,
            'scheduled_date' => $request->scheduled_date,
            'description' => $request->description,
            'objectives' => $request->objectives,
        ]);

        // Simple sync for areas and items
        $checklist->areas()->delete();
        foreach ($request->audit_areas as $areaData) {
            $area = $checklist->areas()->create([
                'name' => $areaData['name'],
            ]);

            foreach ($areaData['items'] as $itemData) {
                $area->items()->create([
                    'text' => $itemData['text'],
                    'tags' => $itemData['tags'] ?? [],
                ]);
            }
        }

        // Sync team
        $checklist->team()->delete();
        if ($request->has('audit_team') && is_array($request->audit_team)) {
            foreach ($request->audit_team as $memberData) {
                $checklist->team()->create([
                    'user_id' => $memberData['user_id'],
                    'role' => $memberData['role'] ?? 'Auditor',
                ]);
            }
        }

        return redirect()->route('administrator.pre-audit-checklists.index')->with('success', 'Pre-Audit Checklist updated successfully.');
    }
}
