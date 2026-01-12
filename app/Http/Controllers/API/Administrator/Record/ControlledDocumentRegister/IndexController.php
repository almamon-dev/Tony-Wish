<?php

namespace App\Http\Controllers\API\Administrator\Record\ControlledDocumentRegister;

use App\Http\Controllers\Controller;
use App\Models\ControlledDocumentRegister;
use App\Traits\ApiResponse;

class IndexController extends Controller
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
                'modification_date' => $item->modification_date,
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
