<?php

namespace App\Http\Controllers\API\Administrator\Record;

use App\Http\Controllers\Controller;
use App\Models\ProjectReviewJobCard; // মডেলটি ইম্পোর্ট নিশ্চিত করুন
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ProjectReviewJobCardController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $query = ProjectReviewJobCard::query();

            if ($request->search) {
                $query->where('customer', 'like', '%'.$request->search.'%')
                    ->orWhere('job_no', 'like', '%'.$request->search.'%');
            }

            $records = $query->latest()->get();

            return $this->sendResponse($records, 'Project Review Job Cards retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Error fetching records', [$e->getMessage()]);
        }
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'job_no' => 'required|string',
            'customer' => 'nullable|string',
            'record_no' => 'nullable|string',
            'title' => 'nullable|string',
            'revision_date' => 'nullable|date',
            'clauses' => 'nullable|string',
            'process_steps' => 'nullable|array',
        ]);

        try {

            $record = ProjectReviewJobCard::updateOrCreate(
                ['job_no' => $request->job_no],
                $request->all()
            );

            $message = $record->wasRecentlyCreated
                ? 'Project Review Job Card created successfully.'
                : 'Project Review Job Card updated successfully.';

            return $this->sendResponse($record, $message);
        } catch (\Exception $e) {

            return $this->sendError('Operation failed.', [$e->getMessage()]);
        }
    }
}
