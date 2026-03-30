<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $ownerId = $user->business_owner_id ?? $user->id;

        // Stats calculation
        $totalProcedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', '=', $ownerId, 'and');
            })->count('id');

        $completedProcedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', '=', $ownerId, 'and');
            })->where('status', '=', 'completed', 'and')->count('id');

        $pendingProcedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', '=', $ownerId, 'and');
            })->where('status', '=', 'pending', 'and')->count('id');

        $inProgressProcedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', '=', $ownerId, 'and');
            })->where('status', '=', 'in_progress', 'and')->count('id');

        $activeUsersCount = User::where('business_owner_id', '=', $ownerId, 'and')
            ->orWhere('id', '=', $ownerId)
            ->count('id');

        // Recent Procedures for "Pending Approval" or similar
        $recentProcedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', '=', $ownerId, 'and');
            })
            ->with(['assignedUser:id,first_name,last_name'])
            ->latest('created_at')
            ->limit(5)
            ->get();

        // Team Performance Metrics
        $teamMembers = User::where('business_owner_id', '=', $ownerId, 'and')
            ->orWhere('id', '=', $ownerId)
            ->select('id', 'first_name', 'last_name')
            ->get();

        $teamPerformance = $teamMembers->map(function ($member) {
            $tasks = Procedure::where('assigned_to', '=', $member->id, 'and')->count('id');
            $completed = Procedure::where('assigned_to', '=', $member->id, 'and')->where('status', '=', 'completed', 'and')->count('id');
            $inProgress = Procedure::where('assigned_to', '=', $member->id, 'and')->where('status', '=', 'in_progress', 'and')->count('id');
            
            return [
                'name' => $member->first_name . ' ' . $member->last_name,
                'tasks' => $tasks,
                'completed' => $completed,
                'inProgress' => $inProgress,
                'progress' => $tasks > 0 ? round(($completed / $tasks) * 100) : 0,
                'status' => 'Active',
            ];
        });

        // Monthly Overview for Bar Chart (Last 5 months)
        $monthlyOverview = [];
        for ($i = 4; $i >= 0; $i--) {
            $monthDate = Carbon::now()->startOfMonth()->subMonths($i);
            
            $done = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', $ownerId);
            })
            ->where('status', 'completed')
            ->whereYear('uploaded_at', $monthDate->year)
            ->whereMonth('uploaded_at', $monthDate->month)
            ->count();

            $totalInMonth = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', $ownerId);
            })
            ->whereYear('created_at', $monthDate->year)
            ->whereMonth('created_at', $monthDate->month)
            ->count();

            $pending = max(0, $totalInMonth - $done);

            $monthlyOverview[] = [
                'month' => $monthDate->format('M'),
                'completed' => $done,
                'pending' => $pending,
            ];
        }

        return Inertia::render('Administrator/Dashboard', [
            'stats' => [
                'total' => $totalProcedures,
                'completed' => $completedProcedures,
                'pending' => $pendingProcedures,
                'inProgress' => $inProgressProcedures,
                'activeUsers' => $activeUsersCount,
            ],
            'recentProcedures' => $recentProcedures,
            'teamPerformance' => $teamPerformance,
            'monthlyOverview' => $monthlyOverview,
        ]);
    }
}
