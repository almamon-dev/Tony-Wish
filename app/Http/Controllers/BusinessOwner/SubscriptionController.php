<?php

namespace App\Http\Controllers\BusinessOwner;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class SubscriptionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $owner = $user->user_type === 'business_owner' ? $user : $user->businessOwner;
        
        return Inertia::render('BusinessOwner/Subscription/Index', [
            'plans' => Plan::where('is_active', true)->get(),
            'user' => $owner?->load('plan'),
            'usage' => [
                'users' => [
                    'used' => \App\Models\User::where('business_owner_id', $owner?->id)->count() + 1, // +1 for the owner
                    'limit' => 50,
                ],
                'procedures' => [
                    'used' => 0, // Placeholder for real procedure count
                    'limit' => 100,
                ]
            ],
            'invoices' => \App\Models\Invoice::where('user_id', $owner?->id)->latest()->get(),
        ]);
    }

    public function checkout(Plan $plan)
    {
        $user = Auth::user();
        $stripeSecret = env('STRIPE_SECRET');
        if (! $stripeSecret || $stripeSecret === 'sk_test_...') {
            return back()->with('error', 'Stripe is not configured. Please add STRIPE_SECRET to your .env file.');
        }

        Stripe::setApiKey($stripeSecret);

        // Handle Free Plans (Price = 0)
        if ($plan->price <= 0) {
            // Assign the plan to the account owner (the Business Owner)
            $owner = $user->user_type === 'business_owner' ? $user : $user->businessOwner;

            if ($owner) {
                $owner->update([
                    'plan_id' => $plan->id,
                    'subscription_status' => 'active',
                    'expiry_date' => now()->addDays(7),
                ]);

                return redirect()->route('business-owner.dashboard')->with('success', 'Plan activated successfully! Welcome to your free trial.');
            }

            return back()->with('error', 'Could not locate account owner to activate plan.');
        }

        try {
            $checkout_session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => strtolower($plan->currency),
                        'product_data' => [
                            'name' => $plan->name,
                        ],
                        'unit_amount' => (int) ($plan->price * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('business-owner.subscription.success').'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('business-owner.subscription.index'),
                'metadata' => [
                    'user_id' => $user->user_type === 'business_owner' ? $user->id : $user->business_owner_id,
                    'plan_id' => $plan->id,
                ],
            ]);

            return Inertia::location($checkout_session->url);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function success(Request $request)
    {
        $sessionId = $request->get('session_id');
        if (!$sessionId) {
            return redirect()->route('business-owner.subscription.index');
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));
        
        try {
            $session = Session::retrieve($sessionId);
            $userId = $session->metadata->user_id;
            $planId = $session->metadata->plan_id;
            
            $user = \App\Models\User::find($userId);
            $plan = \App\Models\Plan::find($planId);

            if ($user && $plan) {
                $user->update([
                    'plan_id' => $plan->id,
                    'subscription_status' => 'active',
                    'expiry_date' => now()->addMonth(),
                ]);

                // Create real Invoice
                \App\Models\Invoice::create([
                    'user_id' => $user->id,
                    'plan_id' => $plan->id,
                    'invoice_number' => 'INV-' . strtoupper(\Illuminate\Support\Str::random(10)),
                    'amount' => $plan->price,
                    'vat' => ($plan->price * 0.2),
                    'total' => ($plan->price * 1.2),
                    'status' => 'paid',
                    'stripe_invoice_id' => $session->payment_intent,
                    'paid_at' => now(),
                ]);

                return Inertia::render('BusinessOwner/Subscription/Success', [
                    'plan' => $plan
                ]);
            }
        } catch (\Exception $e) {
            return redirect()->route('business-owner.subscription.index')->with('error', 'Could not confirm payment: ' . $e->getMessage());
        }

        return redirect()->route('business-owner.subscription.index');
    }
}
