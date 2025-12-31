<?php

namespace App\Http\Resources\API\Administrator;

use Illuminate\Http\Resources\Json\JsonResource;

class PreAuditChecklistResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'procedure_name' => $this->name,
            'procedure' => $this->iso_standard,
            'created_by' => $this->user->name ?? 'Unknown',
            'status' => $this->status,
            'completion' => $this->calculateCompletion(),
            'priority' => $this->priority,
            'scheduled_date' => $this->scheduled_date,
        ];
    }

    private function calculateCompletion()
    {
        if ($this->status === 'completed') {
            return 100;
        }

        return 65;
    }
}
