<?php

namespace App\Http\Controllers\API\Administrator\Record;

use App\Http\Controllers\Controller;
use App\Models\WeldingSpecification;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WeldingSpecificationController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $query = WeldingSpecification::query();

            if ($request->search) {
                $query->where('name', 'like', '%'.$request->search.'%');
            }

            $records = $query->latest()->get();

            $records->transform(function ($item) {
                $data = $item->welding_specifications_data;

                if (is_array($data)) {
                    foreach ($data as $key => $value) {
                        if (isset($value['prolongation'])) {
                            $data[$key]['prolongation_status'] = $this->checkDateStatus($value['prolongation']);
                        }
                        if (isset($value['re_test'])) {
                            $data[$key]['re_test_status'] = $this->checkDateStatus($value['re_test']);
                        }
                    }
                }

                $item->welding_specifications_data = $data;

                return $item;
            });

            return $this->sendResponse($records, 'Welding records retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Error fetching data', [$e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'record_no' => 'nullable|string',
            'title' => 'nullable|string',
            'revision_date' => 'nullable|date',
            'clauses' => 'nullable|string',
            'welding_specifications_data' => 'required|array',
        ]);

        try {
            $record = WeldingSpecification::create($request->all());

            return $this->sendResponse($record, 'Welding record created successfully.', null, 201);
        } catch (\Exception $e) {
            return $this->sendError('Failed to store record', [$e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $record = WeldingSpecification::findOrFail($id);
            $record->update($request->all());

            return $this->sendResponse($record, 'Welding record updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Update failed', [$e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {

            $record = WeldingSpecification::find($id);

            if (! $record) {
                return $this->sendError('Record not found', [], 404);
            }

            $record->delete();

            return $this->sendResponse(null, 'Record deleted successfully.');
        } catch (\Exception $e) {

            return $this->sendError('Delete failed', [$e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $record = WeldingSpecification::findOrFail($id);
            $record->delete();

            return $this->sendResponse([], 'Record deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Delete failed', [$e->getMessage()]);
        }
    }

    private function checkDateStatus($dateString)
    {
        if (! $dateString || $dateString == 'N/A') {
            return 'neutral';
        }

        try {
            $date = Carbon::parse($dateString);
            $today = Carbon::today();

            if ($date->isPast()) {
                return 'expired';
            }

            return 'valid';
        } catch (\Exception $e) {
            return 'neutral';
        }
    }
}
