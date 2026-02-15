<?php

namespace App\Policies;

use App\Models\User;

class AdministratorPolicy
{
    /**
     * Determine if the user can manage administrators.
     * Only business owners can add administrators.
     */
    public function manageAdministrators(User $user): bool
    {
        return $user->user_type === 'business_owner';
    }
}
