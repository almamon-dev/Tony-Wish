<?php

namespace App\Http\Controllers\BusinessOwner;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Procedure;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $ownerId = $user->id;
        
        $company = Company::where('user_id', '=', $ownerId)->first();
        $companyId = $company ? $company->id : null;

        $totalUsers = User::where('business_owner_id', '=', $ownerId)->count('*') + 1; // +1 for the owner
        $totalProcedures = 0;
        
        if ($companyId) {
            $totalProcedures = Procedure::where('company_id', '=', $companyId)->count('*');
        }
        
        // Recent Activities
        $recentUsers = User::where('business_owner_id', '=', $ownerId)
            ->latest('created_at')
            ->limit(4)
            ->get(['*'])
            ->map(function($u) {
                return [
                    'name' => $u->name,
                    'action' => 'Joined as ' . ucfirst(str_replace('_', ' ', $u->user_type)),
                    'time' => $u->created_at->diffForHumans(),
                    'img' => $u->avatar ? '/' . $u->avatar : "https://ui-avatars.com/api/?name=" . urlencode($u->name) . "&background=3b82f6&color=fff",
                ];
            });

        $recentProcedures = collect();
        if ($companyId) {
            $recentProcedures = Procedure::where('company_id', '=', $companyId)
                ->with('assignedUser')
                ->latest('updated_at')
                ->limit(4)
                ->get(['*'])
                ->map(function($p) {
                    $assignedName = $p->assignedUser ? $p->assignedUser->name : 'Unassigned';
                    return [
                        'name' => $assignedName,
                        'action' => 'Modified procedure: ' . $p->name,
                        'time' => $p->updated_at->diffForHumans(),
                        'img' => $p->assignedUser && $p->assignedUser->avatar ? '/' . $p->assignedUser->avatar : "https://ui-avatars.com/api/?name=" . urlencode($assignedName) . "&background=10b981&color=fff",
                    ];
                });
        }

        $activities = $recentUsers->concat($recentProcedures)
            ->sortByDesc(function($item) {
                return $item['time'];
            })
            ->values()
            ->take(4);

        // Fallback if no activities
        if ($activities->isEmpty()) {
            $activities = collect([
                [
                    'name' => $user->name,
                    'action' => 'Started managing company dashboard',
                    'time' => 'Just now',
                    'img' => $user->avatar ? '/' . $user->avatar : "https://ui-avatars.com/api/?name=" . urlencode($user->name) . "&background=10b981&color=fff",
                ]
            ]);
        }

        // Mock subscription data since table doesn't exist yet
        $subscription = [
            'plan' => 'Professional Plan',
            'monthly_cost' => 130.00,
            'vat' => 6.50,
            'total' => 136.50,
            'quota_used' => $totalUsers,
            'quota_total' => 50,
            'procedures_used' => $totalProcedures,
            'procedures_total' => 100,
        ];

        // Mock invoices
        $invoices = [
            [
                'id' => 'INV-0023-001',
                'date' => 'Oct 15, 2023',
                'amount' => '$250.00',
                'status' => 'Paid',
            ],
            [
                'id' => 'INV-0023-002',
                'date' => 'Sep 15, 2023',
                'amount' => '$136.50',
                'status' => 'Paid',
            ],
        ];

        return Inertia::render('BusinessOwner/Dashboard', [
            'stats' => [
                'total_users' => $totalUsers,
                'active_procedures' => $totalProcedures,
                'billing_cycle' => 'Monthly',
                'company_status' => 'Active',
            ],
            'company' => $company,
            'activities' => $activities,
            'subscription' => $subscription,
            'invoices' => $invoices,
        ]);
    }
}
