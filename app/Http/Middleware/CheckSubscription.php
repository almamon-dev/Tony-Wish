<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // System Admin is always allowed
        if ($user->user_type === 'admin') {
            return $next($request);
        }

        // Identify the account holder (Business Owner)
        $owner = $user->user_type === 'business_owner' ? $user : $user->businessOwner;

        // If no owner found (shouldn't happen for valid sub-users), something is wrong
        if (! $owner && $user->user_type !== 'business_owner') {
            return $next($request); // Fallback or abort
        }

        // Check if subscription exists and is active
        $isSubscribed = ($owner && $owner->subscription_status === 'active' && $owner->expiry_date > now());

        if (! $isSubscribed) {
            // Update status to expired if date passed
            if ($owner && $owner->expiry_date && $owner->expiry_date < now() && $owner->subscription_status !== 'expired') {
                $owner->update(['subscription_status' => 'expired']);
            }

            // Exclude subscription routes from redirection to avoid infinite loops
            if ($request->routeIs('business-owner.subscription.*') || $request->routeIs('logout')) {
                return $next($request);
            }

            // Redirect account holder to pricing
            if ($user->user_type === 'business_owner') {
                return redirect()->route('business-owner.subscription.index');
            }

            return redirect()->route('business-owner.subscription.index');
        }

        return $next($request);
    }
}
