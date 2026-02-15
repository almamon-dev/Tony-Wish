<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use App\Mail\AdministratorInvitation;

class AdministratorService
{
    /**
     * Create a new administrator and send invitation.
     *
     * @param array $data
     * @return User
     */
    public function createAdministrator(array $data): User
    {
        $plainPassword = Str::password(10);

        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => Hash::make($plainPassword),
            'user_type' => 'administrator',
            'business_owner_id' => $data['business_owner_id'] ?? \Illuminate\Support\Facades\Auth::id(),
            'department' => $data['department'] ?? null,
            'access_level' => $data['access_level'] ?? 'limited_access',
        ]);

        $this->sendInvitation($user, $plainPassword);

        return $user;
    }

    /**
     * Send invitation email to the administrator.
     *
     * @param User $user
     * @param string $plainPassword
     * @return void
     */
    protected function sendInvitation(User $user, string $plainPassword): void
    {
        $verificationUrl = URL::signedRoute(
            'administrator.verify-email',
            ['id' => $user->id, 'hash' => sha1($user->getEmailForVerification())]
        );

        Mail::to($user->email)->send(new AdministratorInvitation($user->email, $plainPassword, $verificationUrl));
    }

    /**
     * Verify administrator email.
     *
     * @param int $id
     * @param string $hash
     * @return User
     * @throws \Exception
     */
    public function verifyAdministrator(int $id, string $hash): User
    {
        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            throw new \Exception('Invalid verification link.');
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }
        
        return $user;
    }
}
