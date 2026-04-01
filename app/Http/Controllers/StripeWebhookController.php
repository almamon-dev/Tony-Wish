<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $stripeSecret = env('STRIPE_SECRET');
        Stripe::setApiKey($stripeSecret);
        
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $this->handleCheckoutSessionCompleted($session);
                break;
        }

        return response()->json(['status' => 'success']);
    }

    protected function handleCheckoutSessionCompleted($session)
    {
        $userId = $session->metadata->user_id ?? null;
        $planId = $session->metadata->plan_id ?? null;

        if (!$userId || !$planId) {
            Log::warning('Stripe Webhook: Missing metadata in session');
            return;
        }

        $user = User::find($userId);
        $plan = Plan::find($planId);

        if ($user && $plan) {
            // Calculate expiry date
            $expiryDate = now();
            if ($plan->duration === 'year') {
                $expiryDate = $expiryDate->addYear();
            } else {
                $expiryDate = $expiryDate->addMonth();
            }

            $user->update([
                'plan_id' => $plan->id,
                'subscription_status' => 'active',
                'expiry_date' => $expiryDate,
            ]);

            Log::info("Successful subscription: User {$user->email} -> Plan {$plan->name}");
        }
    }
}
