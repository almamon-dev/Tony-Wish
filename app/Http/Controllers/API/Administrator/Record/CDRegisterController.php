<?php

namespace App\Http\Controllers\API\Administrator\Record;

use App\Http\Controllers\Controller;
use App\Models\ControlledDocumentRegister;
use App\Traits\ApiResponse;

class CDRegisterController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $data = ControlledDocumentRegister::all();

        if ($data->isEmpty()) {
            return $this->sendError('No data found', [], 404);
        }

        $apiResponse = $data->map(function ($item) {
            return [
                'id' => $item->id,
                'record_no' => $item->record_no,
                'document_title' => $item->document_title,
                'revision_date' => $item->revision_date,
                'en_1090' => (bool) $item->en_1090,
                'iso_9001' => (bool) $item->iso_9001,
                'iso_14001' => (bool) $item->iso_14001,
                'iso_45001' => (bool) $item->iso_45001,
                'en_15085' => (bool) $item->en_15085,
                'nhss_20' => (bool) $item->nhss_20,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ];
        });

        return $this->sendResponse(
            $apiResponse,
            'Controlled Document Register retrieved successfully.'
        );
    }
}
