<?php

namespace App\Http\Resources\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $email
 * @property mixed $user_type
 * @property mixed $phone_number
 * @property mixed $email_verified_at
 * @property mixed $created_at
 */
class RegisterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fname' => $this->fname,
            'lname' => $this->lname,
            'email' => $this->email,
            'email_verified' => (bool) $this->email_verified_at,
            'terms_and_conditions' => $this->terms_and_conditions,
            'terms_and_conditions_at' => $this->terms_and_conditions_at ? $this->terms_and_conditions_at->toDateTimeString() : '',
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
