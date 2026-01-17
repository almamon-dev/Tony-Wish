<?php

namespace App\Http\Controllers\API\BusinessOwnerDashboard\CompanyManagement;

use App\Http\Controllers\Controller;
use App\Models\JobTitleManage;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobTitleManageController extends Controller
{
    use ApiResponse;

    // -- List all job titles with pagination
    public function index(Request $request)
    {
        // Postman-er Params theke per_page nibe, na thakle default 10
        $perPage = $request->input('per_page', 10);

        $jobTitles = JobTitleManage::latest()->paginate($perPage);

        return $this->sendResponse($jobTitles, 'Job titles retrieved successfully.');
    }

    // -- Create a new job title
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors()->toArray(), 422);
        }

        $jobTitle = JobTitleManage::create($request->all());

        return $this->sendResponse($jobTitle, 'Job title created successfully.', null, 201);
    }

    // -- Update an existing job title
    public function update(Request $request, $id)
    {
        $jobTitle = JobTitleManage::find($id);

        if (! $jobTitle) {
            return $this->sendError('Job title not found.');
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors()->toArray(), 422);
        }

        $jobTitle->update($request->all());

        return $this->sendResponse($jobTitle, 'Job title updated successfully.');
    }

    // -- Delete a job title
    public function destroy($id)
    {
        $jobTitle = JobTitleManage::find($id);

        if (! $jobTitle) {
            return $this->sendError('Job title not found.');
        }

        $jobTitle->delete();

        return $this->sendResponse([], 'Job title deleted successfully.');
    }
}
