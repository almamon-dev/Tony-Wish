<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Procedure;
use App\Models\User;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $ownerId = $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id;

        // 1. Average Completion Rate & Total Completed Tasks
        $procedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
            $query->where('user_id', $ownerId);
        })->get();

        $totalProcedures = $procedures->count();
        $completedProcedures = $procedures->where('status', 'completed')->count();
        
        $avgCompletionRate = $totalProcedures > 0 ? round(($completedProcedures / $totalProcedures) * 100) : 0;

        // 2. Active Users
        $activeUsersCount = User::where('business_owner_id', $ownerId)
            ->orWhere('id', $ownerId)
            ->count();

        // 3. Compliance Scores by Standard (e.g., ISO 9001)
        $complianceScores = $procedures->groupBy('iso_standard')
            ->map(function ($group, $standard) {
                $total = $group->count();
                if ($total === 0 || empty($standard)) return null;
                $completed = $group->where('status', 'completed')->count();
                return [
                    'standard' => $standard,
                    'score' => round(($completed / $total) * 100)
                ];
            })
            ->filter()
            ->values();

        // 4. Monthly Completion Rates (Last 9 months)
        $monthlyRates = [];
        for ($i = 8; $i >= 0; $i--) {
            $monthDate = Carbon::now()->startOfMonth()->subMonths($i);
            
            $monthlyProcedures = Procedure::whereHas('company', function ($query) use ($ownerId) {
                $query->where('user_id', $ownerId);
            })
            ->where(function ($query) use ($monthDate) {
                $query->whereYear('uploaded_at', $monthDate->year)
                      ->whereMonth('uploaded_at', $monthDate->month);
            })->get();

            $totalM = $monthlyProcedures->count();
            $completedM = $monthlyProcedures->where('status', 'completed')->count();
            
            $rate = $totalM > 0 ? round(($completedM / $totalM) * 100) : 0;

            $monthlyRates[] = [
                'month' => $monthDate->format('M'),
                'rate' => $rate
            ];
        }

        return Inertia::render('Administrator/Reports/Index', [
            'stats' => [
                'avgCompletionRate' => $avgCompletionRate . '%',
                'tasksCompleted' => $completedProcedures,
                'activeUsers' => $activeUsersCount,
            ],
            'complianceScores' => $complianceScores,
            'monthlyRates' => $monthlyRates,
        ]);
    }
}
