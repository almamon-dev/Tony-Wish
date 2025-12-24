<?php

namespace App\Http\Controllers\API\BusinessOwnerDashboard\Profile;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\BusinessOwnerDashboard\Profile\UpdateProfileRequest;
use App\Models\BusinessInformation;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    use ApiResponse;

    /**
     * Get business profile
     */
    public function getBusinessProfile(Request $request)
    {
        try {
            $user = auth()->user();

            $business = BusinessInformation::first();

            $data = [
                'id' => $user->id,
                'fname' => $user->fname,
                'lname' => $user->lname,
                'email' => $user->email,
                'company_name' => $business->company_name ?? null,
                'contact_email' => $business->contact_email ?? null,
                'country' => $business->country ?? null,
                'phone' => $business->phone ?? null,
                'avatar' => Helper::generateURL($user->avatar) ?? '',
            ];

            return $this->sendResponse($data, 'Business profile retrieved successfully');

        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve profile: '.$e->getMessage(), [], 500);
        }
    }

    /**
     * Update business profile
     */
    public function updateBusinessProfile(UpdateProfileRequest $request)
    {
        try {
            DB::beginTransaction();

            $user = auth()->user();

            if ($request->hasFile('avatar')) {

                if (! empty($user->avatar)) {
                    Helper::deleteFile($user->avatar);
                }

                $user->avatar = Helper::uploadFile('users_avatars', $request->file('avatar'));
                $user->save();
            }

            $businessInfo = BusinessInformation::updateOrCreate(
                ['contact_email' => $request->contact_email ?? $user->email],
                [
                    'company_name' => $request->company_name,
                    'phone' => $request->phone,
                    'contact_email' => $request->contact_email,
                    'country' => $request->country,
                ]
            );

            DB::commit();

            $apiResponse = [
                'user' => [
                    'id' => $user->id,
                    'fname' => $user->fname,
                    'lname' => $user->lname,
                    'email' => $user->email,
                    'avatar' => Helper::generateURL($user->avatar),
                ],
                'business' => $businessInfo,

            ];

            return $this->sendResponse($apiResponse, 'Business profile updated successfully');

        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->sendError('Failed to update profile: '.$e->getMessage(), [], 500);
        }
    }
}
