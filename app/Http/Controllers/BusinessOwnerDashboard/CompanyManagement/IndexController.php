<?php

namespace App\Http\Controllers\BusinessOwnerDashboard\CompanyManagement;

use App\Http\Controllers\Controller;
use App\Mail\AdministratorInvitationMail;
use App\Models\Administrator;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class IndexController extends Controller
{
    use ApiResponse;

    /**
     * Add a new administrator
     */
    public function addAdministrator(Request $request)
    {

        // Validate request
        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'department' => 'nullable|string|max:255',
            'access_level' => 'required|in:full_access,limited_access,read_only',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error');
        }

        try {
            DB::beginTransaction();

            // Get the authenticated business owner (from middleware/auth)
            $businessOwner = auth()->user();

            // Check if user exists
            $user = User::where('email', $request->email)->first();

            if (! $user) {
                // Create new user if doesn't exist
                $user = User::create([
                    'fname' => $request->fname,
                    'lname' => $request->lname,
                    'email' => $request->email,
                    'user_type' => 'administrator',
                    'terms_and_conditions' => true,
                    'terms_and_conditions_at' => now(),
                    'addd_by' => $businessOwner->id,
                    'password' => Hash::make(12345678),
                    'email_verified_at' => null, // Will verify when they accept invitation
                ]);
            }

            // Check if administrator already exists for this business owner
            $existingAdmin = Administrator::where('user_id', $user->id)
                ->where('business_owner_id', $businessOwner->id)
                ->first();

            if ($existingAdmin) {
                return $this->sendError('User is already an administrator for your business');
            }

            // Generate invitation token
            $invitationToken = Str::random(60);
            // dd($invitationToken);

            // Create administrator
            $administrator = Administrator::create([
                'user_id' => $user->id,
                'business_owner_id' => $businessOwner->id,
                'department' => $request->department,
                'access_level' => $request->access_level,
                'permissions' => $request->permissions,
                'invitation_status' => Administrator::INVITATION_PENDING,
                'invitation_token' => $invitationToken,
                'invitation_sent_at' => now(),
            ]);

            // Send invitation email (implement this method)
            $this->sendInvitationEmail($user->email, $invitationToken, $businessOwner, $request);
            DB::commit();

            return $this->sendResponse(
                [
                    'administrator' => $administrator,
                    'invitation_link' => url("/accept-invitation/{$invitationToken}"),
                ],
                'Administrator added successfully. Invitation email sent.',
            );

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->sendError('Failed to add administrator: '.$e->getMessage(), [], 500);
        }
    }

    /**
     * List all administrators for the business owner
     */
    public function listAdministrators(Request $request)
    {
        try {
            $businessOwner = auth()->user();

            // Start query
            $query = Administrator::with(['user:id,name,email,profile_photo_url', 'businessOwner:id,name,email'])
                ->where('business_owner_id', $businessOwner->id);

            // Apply filters
            if ($request->has('status')) {
                $query->where('invitation_status', $request->status);
            }

            if ($request->has('access_level')) {
                $query->where('access_level', $request->access_level);
            }

            if ($request->has('department') && $request->department) {
                $query->where('department', 'like', '%'.$request->department.'%');
            }

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%');
                });
            }

            // Apply sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Paginate results
            $perPage = $request->get('per_page', 15);
            $administrators = $query->paginate($perPage);

            // Transform the data for response
            $transformedData = $administrators->map(function ($admin) {
                return [
                    'id' => $admin->id,
                    'user' => [
                        'id' => $admin->user->id,
                        'name' => $admin->user->name,
                        'email' => $admin->user->email,
                        'profile_photo' => $admin->user->profile_photo_url,
                    ],
                    'department' => $admin->department,
                    'access_level' => $admin->access_level,
                    'access_level_label' => Administrator::getAccessLevelOptions()[$admin->access_level] ?? $admin->access_level,
                    'permissions' => $admin->permissions,
                    'invitation_status' => $admin->invitation_status,
                    'invitation_status_label' => Administrator::getInvitationStatusOptions()[$admin->invitation_status] ?? $admin->invitation_status,
                    'invitation_sent_at' => $admin->invitation_sent_at,
                    'invitation_accepted_at' => $admin->invitation_accepted_at,
                    'is_active' => $admin->isActive(),
                    'created_at' => $admin->created_at,
                    'updated_at' => $admin->updated_at,
                ];
            });

            return $this->sendResponse(
                [
                    'administrators' => $transformedData,
                    'filters' => [
                        'status_options' => Administrator::getInvitationStatusOptions(),
                        'access_level_options' => Administrator::getAccessLevelOptions(),
                    ],
                ],
                'Administrators retrieved successfully',
            );

        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve administrators: '.$e->getMessage(), [], 500);
        }
    }

    /**
     * Update administrator
     */
    public function updateAdministrator(Request $request, $id)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'department' => 'nullable|string|max:255',
            'access_level' => 'sometimes|required|in:full_access,limited_access,read_only',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error');
        }

        try {
            DB::beginTransaction();

            $businessOwner = auth()->user();

            // Find administrator belonging to this business owner
            $administrator = Administrator::where('id', $id)
                ->where('business_owner_id', $businessOwner->id)
                ->first();

            if (! $administrator) {
                return $this->sendError('Administrator not found or you do not have permission', [], 404);
            }

            // Only update allowed fields
            $updateData = [];
            if ($request->has('department')) {
                $updateData['department'] = $request->department;
            }
            if ($request->has('access_level')) {
                $updateData['access_level'] = $request->access_level;
            }
            if ($request->has('permissions')) {
                $updateData['permissions'] = $request->permissions;
            }

            // Update administrator
            $administrator->update($updateData);

            DB::commit();

            return $this->sendResponse(
                ['administrator' => $administrator->fresh(['user:id,name,email'])],
                'Administrator updated successfully'
            );

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->sendError('Failed to update administrator: '.$e->getMessage(), [], 500);
        }
    }

    /**
     * Remove administrator
     */
    public function removeAdministrator(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $businessOwner = auth()->user();

            // Find administrator belonging to this business owner
            $administrator = Administrator::where('id', $id)
                ->where('business_owner_id', $businessOwner->id)
                ->first();

            if (! $administrator) {
                return $this->sendError('Administrator not found or you do not have permission', [], 404);
            }

            // Store user email for response message
            $userEmail = $administrator->user->email;

            // Soft delete the administrator
            $administrator->delete();

            DB::commit();

            return $this->sendResponse(
                [],
                "Administrator {$userEmail} has been removed successfully"
            );

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->sendError('Failed to remove administrator: '.$e->getMessage(), [], 500);
        }
    }

    /**
     * Resend invitation email
     * (Optional additional endpoint)
     */
    public function resendInvitation(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $businessOwner = auth()->user();

            // Find administrator belonging to this business owner
            $administrator = Administrator::where('id', $id)
                ->where('business_owner_id', $businessOwner->id)
                ->first();

            if (! $administrator) {
                return $this->sendError('Administrator not found', [], 404);
            }

            // Check if invitation is pending
            if (! $administrator->isInvitationPending()) {
                return $this->sendError('Cannot resend invitation. Invitation is not pending.', [], 400);
            }

            // Generate new token
            $newToken = Str::random(60);

            // Update administrator with new token and resend time
            $administrator->update([
                'invitation_token' => $newToken,
                'invitation_sent_at' => now(),
            ]);

            // Resend invitation email
            // $this->sendInvitationEmail($administrator->user->email, $newToken, $businessOwner);

            DB::commit();

            return $this->sendResponse(
                [
                    'invitation_link' => url("/accept-invitation/{$newToken}"),
                ],
                'Invitation has been resent successfully'
            );

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->sendError('Failed to resend invitation: '.$e->getMessage(), [], 500);
        }
    }

    /**
     * Send invitation email
     * Implement this method based on your email system
     */
    private function sendInvitationEmail($email, $invitation_token, $businessOwner, $request)
    {
        $invitationLink = url("/accept-invitation/{$invitation_token}");

        // Get the user's full name
        $inviteeName = $request->fname.' '.$request->lname;

        // Get business details (you might need to adjust these based on your data structure)
        $businessName = $businessOwner->business_name ?? $businessOwner->name ?? config('app.name');
        $businessLogo = $businessOwner->logo_url ?? $businessOwner->business_logo ?? null;

        try {
            Mail::to($email)->send(new AdministratorInvitationMail(
                $businessOwner->name ?? $businessOwner->email,
                $invitationLink,
                $email,
                $inviteeName,
                $request->access_level,
                $request->department,
                $businessName,
                $businessLogo
            ));

            \Log::info("Invitation email sent to: {$email}");
            \Log::info("Invitation link: {$invitationLink}");

            return true;
        } catch (\Exception $e) {
            \Log::error('Failed to send invitation email: '.$e->getMessage());

            return false;
        }
    }
}
