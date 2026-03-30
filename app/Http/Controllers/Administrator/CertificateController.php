<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Procedure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        $certificates = Certificate::with('procedure')
            ->whereHas('procedure.company', function ($query) use ($ownerId) {
                $query->where('user_id', $ownerId);
            })
            ->latest()
            ->get()
            ->map(function ($cert) {
                return [
                    'id' => $cert->id,
                    'certificate_id' => $cert->certificate_id,
                    'procedure_id' => $cert->procedure_id,
                    'procedure' => $cert->procedure ? $cert->procedure->name : 'N/A',
                    'iso_standard' => $cert->iso_standard,
                    'certificate_type' => $cert->certificate_type,
                    'compliance_level' => $cert->compliance_level,
                    'issuedTo' => $cert->issued_to,
                    'email' => $cert->email,
                    'employee_id' => $cert->employee_id,
                    'issuedDate' => $cert->issued_date ? \Carbon\Carbon::parse($cert->issued_date)->format('M d, Y') : '',
                    'validUntil' => $cert->expiry_date ? \Carbon\Carbon::parse($cert->expiry_date)->format('M d, Y') : '',
                    'raw_issued_date' => $cert->issued_date,
                    'raw_expiry_date' => $cert->expiry_date,
                    'audit_score' => $cert->audit_score,
                    'achievements' => $cert->achievements,
                    'internal_notes' => $cert->internal_notes,
                    'status' => $cert->status,
                ];
            });

        $procedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
            $query->where('user_id', $ownerId);
        })->get(['id', 'name', 'iso_standard']);

        $users = \App\Models\User::where('business_owner_id', $ownerId)
            ->where('user_type', 'userdashboard')
            ->get(['id', 'first_name', 'last_name', 'email', 'employee_id']);

        return Inertia::render('Administrator/Certificates/Index', [
            'certificates' => $certificates,
            'procedures' => $procedures,
            'users' => $users,
            'stats' => [
                'total' => $certificates->count(),
                'thisMonth' => $certificates->where('created_at', '>=', now()->startOfMonth())->count(),
                'pending' => $certificates->where('status', 'Pending')->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;
        $company = \App\Models\Company::where('user_id', $ownerId)->first();

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'procedure_id' => 'required|exists:procedures,id',
            'iso_standard' => 'nullable|string|max:255',
            'certificate_type' => 'nullable|string|max:255',
            'compliance_level' => 'nullable|string|max:255',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'employee_id' => 'nullable|string|max:255',
            'issued_date' => 'required|date',
            'valid_until' => 'required|date',
            'audit_score' => 'nullable|string|max:255',
            'achievements' => 'nullable|string',
            'internal_notes' => 'nullable|string',
        ]);

        if (! $company) {
            return back()->withErrors(['company' => 'Business profile not found. Please setup your company first.']);
        }

        Certificate::create([
            'certificate_id' => 'CRT-'.date('Y').'-'.strtoupper(Str::random(6)),
            'user_id' => $validated['user_id'],
            'procedure_id' => $validated['procedure_id'],
            'iso_standard' => $validated['iso_standard'],
            'certificate_type' => $validated['certificate_type'],
            'compliance_level' => $validated['compliance_level'],
            'issued_to' => $validated['full_name'],
            'email' => $validated['email'],
            'employee_id' => $validated['employee_id'],
            'issued_date' => $validated['issued_date'],
            'expiry_date' => $validated['valid_until'],
            'audit_score' => $validated['audit_score'],
            'achievements' => $validated['achievements'],
            'internal_notes' => $validated['internal_notes'],
            'status' => 'Active',
            'company_id' => $company->id,
            'created_by' => $user->id,
        ]);


        return redirect()->route('administrator.certificates.index')->with('success', 'Certificate issued successfully.');
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'procedure_id' => 'required|exists:procedures,id',
            'iso_standard' => 'nullable|string|max:255',
            'certificate_type' => 'nullable|string|max:255',
            'compliance_level' => 'nullable|string|max:255',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'employee_id' => 'nullable|string|max:255',
            'issued_date' => 'required|date',
            'valid_until' => 'required|date',
            'audit_score' => 'nullable|string|max:255',
            'achievements' => 'nullable|string',
            'internal_notes' => 'nullable|string',
            'status' => 'required|string|max:255',
        ]);

        $certificate->update([
            'procedure_id' => $validated['procedure_id'],
            'iso_standard' => $validated['iso_standard'],
            'certificate_type' => $validated['certificate_type'],
            'compliance_level' => $validated['compliance_level'],
            'issued_to' => $validated['full_name'],
            'email' => $validated['email'],
            'employee_id' => $validated['employee_id'],
            'issued_date' => $validated['issued_date'],
            'expiry_date' => $validated['valid_until'],
            'audit_score' => $validated['audit_score'],
            'achievements' => $validated['achievements'],
            'internal_notes' => $validated['internal_notes'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('administrator.certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return redirect()->route('administrator.certificates.index')->with('success', 'Certificate deleted successfully.');
    }
}
