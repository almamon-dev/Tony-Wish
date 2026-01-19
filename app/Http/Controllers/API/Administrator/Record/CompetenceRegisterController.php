<?php

namespace App\Http\Controllers\API\Administrator\Record;

use App\Http\Controllers\Controller;
use App\Models\CompetenceRegister;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CompetenceRegisterController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $query = CompetenceRegister::query();

            if ($request->search) {
                $query->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('position', 'like', '%'.$request->search.'%');
            }

            $records = $query->latest()->get();

            $records->transform(function ($record) {
                $data = $record->register_data;
                if (is_array($data)) {
                    foreach ($data as $key => $date) {
                        $record->{$key.'_status'} = $this->calculateStatus($date);
                    }
                }

                return $record;
            });

            return $this->sendResponse($records, 'Competence Register retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Error fetching data', [$e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'position' => 'required|string',
            'register_data' => 'required|array',
        ]);

        try {

            $record = CompetenceRegister::updateOrCreate(
                ['name' => $request->name],
                $request->all()
            );

            return $this->sendResponse($record, 'Record saved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Store failed', [$e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $record = CompetenceRegister::find($id);
            if (! $record) {
                return $this->sendError('Record not found', [], 404);
            }

            $record->update($request->all());

            return $this->sendResponse($record, 'Record updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Update failed', [$e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $record = CompetenceRegister::find($id);
            if (! $record) {
                return $this->sendError('Record not found', [], 404);
            }

            $record->delete();

            return $this->sendResponse([], 'Record deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Delete failed', [$e->getMessage()]);
        }
    }

    private function calculateStatus($date)
    {
        if (! $date || $date == 'N/A' || $date == 'DD-MMM-YY') {
            return 'neutral';
        }

        try {
            $expiryDate = Carbon::parse($date);
            if ($expiryDate->isPast()) {
                return 'expired';
            }

            return 'valid';
        } catch (\Exception $e) {
            return 'neutral';
        }
    }
}
