<?php

namespace App\Http\Controllers\API\BusinessOwnerDashboard\CompanyManagement;

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
            'email' => 'required|email|unique:users,email|max:255',
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
                    'added_by' => $businessOwner->id,
                    'password' => Hash::make(12345678),
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
        $ownerId = auth()->id();

        $administrators = Administrator::with('user')
            ->where('business_owner_id', $ownerId)
            ->latest()
            ->get();
        $data = $administrators->map(function ($admin) {
            return [
                'id' => $admin->id,
                'user_id' => $admin->user_id,
                'full_name' => $admin->user ? trim($admin->user->fname.' '.$admin->user->lname) : 'N/A',
                'email' => $admin->user->email ?? 'N/A',
                'user_rule' => $admin->user->user_type ?? 'N/A',
                'status' => $admin->invitation_status,
            ];
        });

        return $this->sendResponse($data, 'Administrators list for this business owner.');
    }

    // remove administrator
    public function removeAdministrator(Request $request)
    {
        $userId = $request->input('user_id');

        if (! $userId) {
            return $this->sendError('User ID is required.', [], 422);
        }

        $businessOwnerId = auth()->id();

        $admin = Administrator::withTrashed()
            ->where('user_id', $userId)
            ->where('business_owner_id', $businessOwnerId)
            ->first();

        if (! $admin) {
            return $this->sendError('Administrator not found.', [], 404);
        }

        $admin->forceDelete();
        $user = User::find($userId);
        if ($user) {
            $user->delete();
        }

        return $this->sendResponse([], 'Administrator and User permanently deleted.');
    }

    /**
     * Send invitation email
     * Implement this method based on your email system
     */
    private function sendInvitationEmail($email, $invitationToken, $businessOwner, $request)
    {
        $invitationLink = url("/accept-invitation/{$invitationToken}");

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

    public function acceptInvitation($token)
    {
        try {
            // Find administrator by invitation token
            $administrator = Administrator::where('invitation_token', $token)
                ->where('invitation_status', Administrator::INVITATION_PENDING)
                ->first();

            if (! $administrator) {
                // If already accepted or invalid token
                return redirect(config('app.frontend_url').'/invitation/invalid');
            }

            // Check if invitation is expired (7 days)
            $expiryDate = $administrator->invitation_sent_at->addDays(7);
            if (now()->gt($expiryDate)) {
                return redirect(config('app.frontend_url').'/invitation/expired');
            }

            DB::beginTransaction();

            // Update administrator status
            $administrator->update([
                'invitation_status' => Administrator::INVITATION_ACCEPTED,
                'invitation_accepted_at' => now(),
                'invitation_token' => null,
            ]);

            // Verify user email if not already verified
            $user = $administrator->user;
            if (! $user->email_verified_at) {
                $user->update([
                    'email_verified_at' => now(),
                    'is_verified' => true,
                    'verified_at' => now(),
                ]);
            }

            DB::commit();

            // Redirect to frontend with success message
            $redirectUrl = config('app.frontend_url');

            return redirect($redirectUrl);

        } catch (\Exception $e) {
            DB::rollBack();

            return redirect(config('app.frontend_url'));
        }
    }
}
