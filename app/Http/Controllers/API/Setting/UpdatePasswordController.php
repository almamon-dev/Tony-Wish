<?php

namespace App\Http\Controllers\API\Setting;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UpdatePasswordController extends Controller
{
    use ApiResponse;

    // change password
    public function updateAdministratorPassword(Request $request)
    {
        try {
            // Validation with custom messages
            $validator = Validator::make($request->all(), [
                'old_password' => 'required',
                'new_password' => 'required|min:8|different:old_password',
                'confirm_password' => 'required|same:new_password',
            ], [
                'old_password.required' => 'Current password is required',
                'new_password.required' => 'New password is required',
                'new_password.min' => 'New password must be at least 8 characters',
                'new_password.different' => 'New password must be different from old password',
                'confirm_password.required' => 'Confirm password is required',
                'confirm_password.same' => 'Confirm password does not match new password',
            ]);

            // Check validation errors
            if ($validator->fails()) {
                return $this->sendError('Validation Error');
            }

            $user = auth()->user();

            // Check current password
            if (! Hash::check($request->old_password, $user->password)) {
                return $this->sendError('Current password is incorrect.');
            }

            // Update password
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);

            return $this->sendResponse([], 'Password changed successfully.');

        } catch (Exception $e) {
            return $this->sendError('Failed to change password. Please try again.');
        }
    }
}
