<?php

namespace App\Http\Controllers\API\Administrator\User;

use App\Http\Controllers\Controller;
use App\Models\AdministratorUser;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
     * Update an existing user
     */
    public function editUser(Request $request, $id)
    {
        // Check if the authenticated user is admin or administrator
        $authUser = auth()->user();

        if (! in_array($authUser->user_type, ['admin', 'administrator'])) {
            return $this->sendError('Unauthorized. Only admin or administrator can edit users.');
        }

        // Find the user to be updated
        $user = User::with('administratorDetails')->find($id);

        if (! $user) {
            return $this->sendError('User not found.');
        }

        // Check if the auth user has permission to edit this user
        // For administrators, they can only edit users they added
        if ($authUser->user_type === 'administrator') {
            $administratorUser = AdministratorUser::where('user_id', $user->id)
                ->where('administrator_id', $authUser->id)
                ->first();

            if (! $administratorUser) {
                return $this->sendError('Unauthorized. You can only edit users you added.');
            }

            // Administrators cannot change email (add this check)
            if ($request->has('email') && $request->email !== $user->email) {
                return $this->sendError('Unauthorized. Administrators cannot change user email.');
            }

            // Administrators cannot change is_active status (add this check)
            if ($request->has('is_active') && $request->is_active != $administratorUser->is_active) {
                return $this->sendError('Unauthorized. Administrators cannot change user active status.');
            }
        }

        // Validation rules for update
        $validator = Validator::make($request->all(), [
            // Basic Info
            'fname' => 'sometimes|required|string|max:100',
            'lname' => 'sometimes|required|string|max:100',
            'email' => 'sometimes|required|email|unique:users,email,'.$id.',id',
            'phone_number' => 'nullable|string|max:20',
            'employee_id' => 'nullable|string|max:50|unique:administrator_users,employee_id,'.$id.',user_id',
            'start_date' => 'nullable|date',

            // Role & Access
            'department' => 'nullable|string|max:100',
            'role' => 'nullable|string|max:100',
            'position_title' => 'nullable|string|max:100',
            'reporting_to' => 'nullable|string|max:100',

            // Access Permissions
            'view_report' => 'sometimes|boolean',
            'upload_document' => 'sometimes|boolean',
            'edit_procedure' => 'sometimes|boolean',
            'manage_task' => 'sometimes|boolean',

            // Additional Info
            'office_location' => 'nullable|string|max:100',
            'time_zone' => 'nullable|string|max:50',
            'preferred_language' => 'nullable|string|max:50',
            'additional_notes' => 'nullable|string',

            // Account Settings
            'is_active' => 'sometimes|boolean',
            'require_password_change' => 'sometimes|boolean',
            'send_welcome_email' => 'sometimes|boolean',
        ], [
            // Custom error messages
            'email.unique' => 'This email is already taken by another user.',
            'employee_id.unique' => 'This employee ID is already assigned to another user.',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation failed: '.$validator->errors()->first());
        }

        try {
            DB::beginTransaction();

            // Only admin can update email and user_type
            $userData = [];
            if ($request->has('fname')) {
                $userData['fname'] = $request->fname;
            }
            if ($request->has('lname')) {
                $userData['lname'] = $request->lname;
            }

            // Check if trying to update email
            if ($request->has('email')) {
                // Only admin can change email
                if ($authUser->user_type === 'admin') {
                    // Check if email is actually changing
                    if ($request->email !== $user->email) {
                        // Verify email doesn't belong to another user
                        $existingUser = User::where('email', $request->email)
                            ->where('id', '!=', $id)
                            ->first();

                        if ($existingUser) {
                            return $this->sendError('This email is already in use by another user.');
                        }

                        $userData['email'] = $request->email;
                        $userData['email_verified_at'] = null; // Require re-verification
                    }
                } else {
                    // For administrators, only allow if email is same as current
                    if ($request->email !== $user->email) {
                        return $this->sendError('Unauthorized. Only admin can change email address.');
                    }
                }
            }

            if (! empty($userData)) {
                $user->update($userData);
            }

            // Find or create administrator user record
            $administratorUser = AdministratorUser::where('user_id', $user->id)->first();

            if (! $administratorUser) {
                // Create if doesn't exist (edge case)
                $administratorUser = new AdministratorUser;
                $administratorUser->user_id = $user->id;
                $administratorUser->administrator_id = $authUser->id;
            }

            // Update administrator user fields
            $administratorData = [];

            // Only update fields that are present in the request
            $fieldsToUpdate = [
                'phone_number',
                'employee_id',
                'start_date',
                'department',
                'role',
                'position_title',
                'reporting_to',
                'office_location',
                'time_zone',
                'preferred_language',
                'additional_notes',
            ];

            foreach ($fieldsToUpdate as $field) {
                if ($request->has($field)) {
                    $administratorData[$field] = $request->$field;
                }
            }

            // Boolean fields - with permission checks
            $booleanFields = [
                'view_report',
                'upload_document',
                'edit_procedure',
                'manage_task',
            ];

            foreach ($booleanFields as $field) {
                if ($request->has($field)) {
                    $administratorData[$field] = $request->boolean($field);
                }
            }

            // is_active - only admin can change
            if ($request->has('is_active')) {
                if ($authUser->user_type === 'admin') {
                    $administratorData['is_active'] = $request->boolean('is_active');
                } else {
                    // Administrators cannot change is_active
                    if ($request->boolean('is_active') != $administratorUser->is_active) {
                        return $this->sendError('Unauthorized. Only admin can change user active status.');
                    }
                }
            }

            // Handle time zone and language defaults if being set to null
            if ($request->has('time_zone') && empty($request->time_zone)) {
                $administratorData['time_zone'] = 'UTC';
            }

            if ($request->has('preferred_language') && empty($request->preferred_language)) {
                $administratorData['preferred_language'] = 'English';
            }

            // Update administrator user
            if (! empty($administratorData)) {
                $administratorUser->update($administratorData);
            }

            // Handle password reset request
            if ($request->boolean('require_password_change', false)) {
                // Only admin can force password change
                if ($authUser->user_type === 'admin') {
                    $administratorUser->update(['password_change_required' => true]);
                }
            }

            // Handle resending welcome email
            if ($request->boolean('send_welcome_email', false)) {
                // Only admin can resend welcome email
                if ($authUser->user_type === 'admin') {
                    $newPassword = Str::random(12);
                    $user->update(['password' => Hash::make($newPassword)]);
                    $this->sendWelcomeEmail($user, $newPassword);
                }
            }

            DB::commit();

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
                    'position_title' => $administratorUser->position_title,
                    'reporting_to' => $administratorUser->reporting_to,
                    'office_location' => $administratorUser->office_location,
                    'start_date' => $administratorUser->start_date,
                    'is_active' => $administratorUser->is_active,
                    'view_report' => $administratorUser->view_report,
                    'upload_document' => $administratorUser->upload_document,
                    'edit_procedure' => $administratorUser->edit_procedure,
                    'manage_task' => $administratorUser->manage_task,
                ],
                'message' => 'User updated successfully',
            ];

            return $this->sendResponse($responseData, 'User updated successfully');

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->sendError('Failed to update user: '.$e->getMessage());
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
