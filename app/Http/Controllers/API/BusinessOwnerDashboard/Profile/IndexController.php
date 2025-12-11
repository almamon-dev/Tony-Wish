<?php

namespace App\Http\Controllers\API\BusinessOwnerDashboard\Profile;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\BusinessOwnerDashboard\Profile\UpdateProfileRequest;
use App\Http\Resources\API\BusinessOwnerDashboard\Profile\UpdateProfileResource;
use App\Models\Administrator;
use App\Traits\ApiResponse;
use Exception;
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

            // Get administrator record
            $administrator = Administrator::where('user_id', $user->id)->first();

            if (! $administrator) {
                return $this->sendError('Business profile not found', [], 404);
            }

            return $this->sendResponse(
                new UpdateProfileResource($administrator),
                'Business profile retrieved successfully'
            );

        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve business profile: '.$e->getMessage(), [], 500);
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

            // Get administrator record
            $administrator = Administrator::where('user_id', $user->id)->first();

            if (! $administrator) {
                return $this->sendError('Business profile not found', [], 404);
            }

            // Start with allowed scalar fields from the request
            $updateData = $request->only([
                'company_name',
                'company_type',
                'phone',
                'contact_email',
                'country',
                'registration_number',
                'vat_number',
            ]);

            // Handle avatar upload (file)
            if ($request->hasFile('avatar')) {

                // delete old file if exists
                if (! empty($administrator->avatar)) {
                    Helper::deleteFile($administrator->avatar);
                }

                // upload new avatar
                $avatarPath = Helper::uploadFile('administrators_avatar', $request->file('avatar'));

                // add to update data
                $updateData['avatar'] = $avatarPath;
            }

            // Remove keys with null values so we don't overwrite existing values unintentionally
            $updateData = array_filter($updateData, fn ($value) => ! is_null($value));

            if (! empty($updateData)) {
                $administrator->update($updateData);
            }

            DB::commit();

            return $this->sendResponse(
                new UpdateProfileResource($administrator->fresh()),
                'Business profile updated successfully'
            );
        } catch (\Throwable $e) {
            DB::rollBack();

            return $this->sendError('Failed to update business profile: '.$e->getMessage(), [], 500);
        }
    }
}
