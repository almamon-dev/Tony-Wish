<?php

namespace App\Http\Resources\API\BusinessOwnerDashboard\Profile;

use App\Helpers\Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpdateProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'company_name' => $this->company_name,
            'company_type' => $this->company_type,
            'phone' => $this->phone,
            'contact_email' => $this->contact_email,
            'country' => $this->country,
            'registration_number' => $this->registration_number,
            'vat_number' => $this->vat_number,

            // Administrator relationship info
            'administrator_id' => $this->id,
            'user_id' => $this->user_id,
            'business_owner_id' => $this->business_owner_id,
            'avatar' => $this->avatar ? Helper::generateURL($this->avatar) : '',
        ];
    }
}
