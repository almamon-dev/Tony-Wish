<?php

namespace App\Http\Controllers\API\Administrator\User;

use App\Http\Controllers\Controller;
use App\Models\AdministratorUser;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class IndexController extends Controller
{
    use ApiResponse;

    public function addUser(Request $request)
    {
        $authUser = auth()->user();

        if (! in_array($authUser->user_type, ['admin', 'administrator', 'business_owner'])) {
            return $this->sendError('Unauthorized. You do not have permission to add users.', [], 403);
        }

        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|max:100',
            'lname' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'nullable|string|max:20',
            'employee_id' => 'nullable|string|max:50|unique:administrator_users,employee_id',
            'department' => 'nullable|string|max:100',
            'role' => 'nullable|string|max:100',
            'office_location' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), $validator->errors()->toArray(), 422);
        }
        try {

            DB::beginTransaction();

            $randomPassword = Str::random(12);

            $user = User::create([
                'fname' => $request->fname,
                'lname' => $request->lname,
                'email' => $request->email,
                'password' => Hash::make($randomPassword),
                'added_by' => $authUser->id,
                'user_type' => 'user',
                'is_verified' => false,
                'terms_and_conditions' => false,
                'email_verified_at' => now(),
                'is_subscribed' => false,
            ]);

            AdministratorUser::create([
                'user_id' => $user->id,
                'administrator_id' => $authUser->id,
                'phone_number' => $request->phone_number,
                'employee_id' => $request->employee_id,
                'department' => $request->department,
                'role' => $request->role,
                'office_location' => $request->office_location,
                'is_active' => true,
                'time_zone' => $request->time_zone ?? 'UTC',
                'preferred_language' => $request->preferred_language ?? 'English',
            ]);

            DB::commit();

            $responseData = [
                'user' => [
                    'id' => $user->id,
                    'name' => trim($user->fname.' '.$user->lname),
                    'email' => $user->email,
                ],
                'temporary_password' => $randomPassword,
            ];

            return $this->sendResponse($responseData, 'User and profile created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return $this->sendError('Failed to add user: '.$e->getMessage(), [], 500);
        }
    }

    /**
     * Update an existing user
     */
    public function editUser(Request $request, $id) {}

    // edit user

    /**
     * Helper method to get user list (optional)
     */
    public function getUserList(Request $request)
    {
        $authUser = auth()->user();

        if (! in_array($authUser->user_type, ['admin', 'administrator'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // -------------------------
        // 🔹 CARD DATA
        // -------------------------
        $totalUsers = User::where('user_type', 'user')->count();

        $activeToday = User::where('user_type', 'user')
            ->whereDate('created_at', today())
            ->count();

        $tasksAssigned = User::count(); // your tasks table

        $avgCompletion = User::count(); // adjust based on your DB column

        // -------------------------
        // 🔹 USER LIST
        // -------------------------
        $users = User::with('administratorProfile')
            ->where('user_type', 'user')
            ->when($authUser->user_type == 'administrator', function ($query) use ($authUser) {
                return $query->where('added_by', $authUser->id);
            })
            ->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 15);

        $formattedUsers = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->fname.' '.$user->lname,
                'email' => $user->email,
                'tasks' => $user->tasks_count ?? 0,
                'completed' => $user->completed_tasks ?? 0,
                'updated_at' => $user->updated_at->diffForHumans(),
                'status' => $user->status ?? 'Active',
            ];
        });
        $apiResponse = [
            'stats' => [
                'total_users' => $totalUsers,
                'active_today' => $activeToday,
                'tasks_assigned' => $tasksAssigned,
                'avg_completion' => $avgCompletion,
            ],
            'users' => $formattedUsers,
        ];

        return $this->sendResponse($apiResponse, 'Users retrieved successfully');
    }
}
