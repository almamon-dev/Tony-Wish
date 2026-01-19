<?php

namespace App\Http\Controllers\API\Administrator\Record;

use App\Http\Controllers\Controller;
use App\Models\CommunicationPlan;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class CommunicationPlanController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $query = CommunicationPlan::query();

            if ($request->search) {
                $query->where('company_name', 'like', '%'.$request->search.'%');
            }
            $plans = $query->latest()->get();

            $plans->transform(function ($item) {
                $item->expiry_status = $this->getExpiryStatus($item->communication_plans_data);

                return $item;
            });

            return $this->sendResponse($plans, 'Records retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error fetching data', [$e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string',
            'record_no' => 'nullable|string',
            'title' => 'nullable|string',
            'revision_date' => 'nullable|date',
            'clauses' => 'nullable|string',
        ]);

        try {
            $data = $request->all();

            if ($request->has('communication_plans_data')) {
                $data['communication_plans_data'] = is_array($request->communication_plans_data)
                    ? $request->communication_plans_data
                    : json_decode($request->communication_plans_data, true);
            }

            $record = CommunicationPlan::create($data);

            return $this->sendResponse($record, 'Supplier record created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to store record', [$e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        $record = CommunicationPlan::findOrFail($id);

        try {
            $data = $request->all();

            if ($request->has('communication_plans_data')) {
                $data['communication_plans_data'] = is_array($request->communication_plans_data)
                    ? $request->communication_plans_data
                    : json_decode($request->communication_plans_data, true);
            }
            $record->update($data);

            return $this->sendResponse($record, 'Record updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Update failed', [$e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $record = CommunicationPlan::findOrFail($id);
            if (! $record) {
                return $this->sendError('Record not found', [], 404);
            }
            $record->delete();

            return $this->sendResponse([], 'Record deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Delete failed', [$e->getMessage()]);
        }
    }

    private function getExpiryStatus($jsonData)
    {
        if (! isset($jsonData['expiry_date'])) {
            return 'No Date Set';
        }

        $expiryDate = Carbon::parse($jsonData['expiry_date']);
        $today = Carbon::today();

        if ($expiryDate->isPast()) {
            return 'Expired';
        }

        if ($today->diffInDays($expiryDate) <= 30) {
            return 'Expiring Soon';
        }

        return 'Valid';
    }
}
