<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'first_name' => $request->user()->first_name,
                    'last_name' => $request->user()->last_name,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'user_type' => $request->user()->user_type,
                    'phone' => $request->user()->phone,
                    'country' => $request->user()->country,
                    'avatar' => $request->user()->avatar,
                    'company' => $request->user()->loadMissing('company')->company,
                    'subscription' => ($owner = ($request->user()->user_type === 'business_owner' ? $request->user() : $request->user()->businessOwner)) ? [
                        'status' => $owner->subscription_status,
                        'is_active' => (bool) ($owner->plan_id && $owner->subscription_status === 'active' && $owner->expiry_date?->isFuture()),
                        'expiry_date' => $owner->expiry_date?->format('M d, Y'),
                        'plan' => $owner->loadMissing('plan')->plan?->name ?? 'None',
                        'has_plan' => (bool) $owner->plan_id,
                        'started_at' => $owner->created_at->format('M d, Y'),
                    ] : null,
                ] : null,
            ],
            'settings' => [
                'site_name' => config('app.name', 'Admin Panel'),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
