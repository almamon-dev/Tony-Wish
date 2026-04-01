<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Stripe\Exception\SignatureVerificationException;
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
        } catch (SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $this->handleCheckoutSessionCompleted($session);
                break;
            case 'invoice.paid':
                $invoice = $event->data->object;
                $this->handleInvoicePaid($invoice);
                break;

        }

        return response()->json(['status' => 'success']);
    }

    protected function handleCheckoutSessionCompleted($session)
    {
        $userId = $session->metadata->user_id ?? null;
        $planId = $session->metadata->plan_id ?? null;

        if (! $userId || ! $planId) {
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

            // Create real Invoice Record
            Invoice::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'invoice_number' => 'INV-'.strtoupper(Str::random(10)),
                'amount' => $plan->price,
                'vat' => 0, // No VAT
                'total' => $plan->price,
                'status' => 'paid',
                'stripe_invoice_id' => $session->payment_intent,
                'paid_at' => now(),
            ]);

            Log::info("Successful subscription: User {$user->email} -> Plan {$plan->name}");
        }
    }

    protected function handleInvoicePaid($invoice)
    {
        // This handles recurring subscription payments
        $subscriptionId = $invoice->subscription;
        if (! $subscriptionId) {
            return;
        }

        // Find user by stripe customer ID if we store it, or map metadata
        // For simplicity with your current setup, we wait for checkout.session.completed metadata
    }
}
