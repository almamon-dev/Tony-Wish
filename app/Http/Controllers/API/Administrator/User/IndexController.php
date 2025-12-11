<?php

namespace App\Http\Controllers\API\Administrator\User;

use App\Http\Controllers\Controller;
use App\Models\AdministratorUser;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class IndexController extends Controller
{
    use ApiResponse;

    // Add new user (only admin and administrator can add)
    public function addUser(Request $request)
    {
        // Check if the authenticated user is admin or administrator
        $authUser = auth()->user();

        if (! in_array($authUser->user_type, ['admin', 'administrator'])) {
            return $this->sendError('Unauthorized. Only admin or administrator can add users.');
        }

        // Validation rules
        $validator = Validator::make($request->all(), [
            // Basic Info
            'fname' => 'required|string|max:100',
            'lname' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'nullable|string|max:20',
            'employee_id' => 'nullable|string|max:50|unique:administrator_users,employee_id',
            'start_date' => 'nullable|date',

            // Role & Access
            'department' => 'nullable|string|max:100',
            'role' => 'nullable|string|max:100',
            'position_title' => 'nullable|string|max:100',
            'reporting_to' => 'nullable|string|max:100',

            // Access Permissions
            'view_report' => 'boolean',
            'upload_document' => 'boolean',
            'edit_procedure' => 'boolean',
            'manage_task' => 'boolean',

            // Additional Info
            'office_location' => 'nullable|string|max:100',
            'time_zone' => 'nullable|string|max:50',
            'preferred_language' => 'nullable|string|max:50',
            'additional_notes' => 'nullable|string',

            // Account Settings
            'send_welcome_email' => 'boolean',
            'require_password_change' => 'boolean',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        try {
            // Generate random password
            $randomPassword = Str::random(12);

            // Create user in users table
            $user = User::create([
                'fname' => $request->fname,
                'lname' => $request->lname,
                'email' => $request->email,
                'password' => Hash::make($randomPassword),
                'added_by' => $authUser->id,
                'user_type' => 'user',
                'is_verified' => false,
                'terms_and_conditions' => false,
                'is_subscribed' => false,
            ]);

            // Create administrator user record
            $administratorUser = AdministratorUser::create([
                'user_id' => $user->id,
                'administrator_id' => $authUser->id,
                'phone_number' => $request->phone_number,
                'employee_id' => $request->employee_id,
                'start_date' => $request->start_date,
                'department' => $request->department,
                'role' => $request->role,
                'position_title' => $request->position_title,
                'reporting_to' => $request->reporting_to,
                'view_report' => $request->view_report,
                'edit_procedure' => $request->edit_procedure,
                'upload_document' => $request->upload_document,
                'manage_task' => $request->manage_task,
                'office_location' => $request->office_location,
                'time_zone' => $request->time_zone ?? 'UTC',
                'preferred_language' => $request->preferred_language ?? 'English',
                'additional_notes' => $request->additional_notes,
                'welcome_email_sent' => $request->boolean('send_welcome_email', false),
                'password_change_required' => $request->boolean('require_password_change', true),
                'is_active' => true,
            ]);

            // Send welcome email if requested
            if ($request->boolean('send_welcome_email')) {
                $this->sendWelcomeEmail($user, $randomPassword);
            }

            // Prepare response data
            $responseData = [
                'user' => [
                    'id' => $user->id,
                    'fname' => $user->fname,
                    'lname' => $user->lname,
                    'email' => $user->email,
                    'user_type' => $user->user_type,
                    'is_verified' => $user->is_verified,
                ],
                'administrator_details' => [
                    'employee_id' => $administratorUser->employee_id,
                    'department' => $administratorUser->department,
                    'role' => $administratorUser->role,
                    'office_location' => $administratorUser->office_location,
                    'start_date' => $administratorUser->start_date,
                ],
                'temporary_password' => $randomPassword,
                'message' => 'User created successfully',
            ];

            return $this->sendResponse($responseData, 'User added successfully', 201);

        } catch (\Exception $e) {
            return $this->sendError('Failed to add user: '.$e->getMessage());
        }
    }

    /**
     * Send welcome email to new user
     */
    private function sendWelcomeEmail($user, $password)
    {
        try {
            // This is a placeholder implementation
            $data = [
                'name' => $user->fname.' '.$user->lname,
                'email' => $user->email,
                'password' => $password,
                'login_url' => url('/login'),
            ];

            // Example using Laravel Mail
            // Mail::to($user->email)->send(new WelcomeEmail($data));

            Log::info('Welcome email would be sent to: '.$user->email);

            // Update welcome email sent status
            AdministratorUser::where('user_id', $user->id)->update([
                'welcome_email_sent' => true,
            ]);

        } catch (\Exception $e) {
            \Log::error('Failed to send welcome email: '.$e->getMessage());
        }
    }

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
