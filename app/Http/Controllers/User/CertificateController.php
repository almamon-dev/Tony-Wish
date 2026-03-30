<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $certificates = Certificate::with('procedure')
            ->where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($cert) use ($user) {
                return [
                    'id' => $cert->id,
                    'certificate_id' => $cert->certificate_id,
                    'title' => $cert->iso_standard ?? 'ISO Standard',
                    'subtitle' => $cert->procedure ? $cert->procedure->name : 'N/A',
                    'issued' => $cert->issued_date ? \Carbon\Carbon::parse($cert->issued_date)->format('M d, Y') : '',
                    'expires' => $cert->expiry_date ? \Carbon\Carbon::parse($cert->expiry_date)->format('M d, Y') : '',
                    'status' => $cert->status,
                    'recipient_name' => $user->first_name . ' ' . $user->last_name,
                ];
            });

        return Inertia::render('User/Certificates/Index', [
            'certificates' => $certificates,
            'stats' => [
                'total' => $certificates->count(),
                'thisYear' => $certificates->where('created_at', '>=', now()->startOfYear())->count(),
                'expiringSoon' => $certificates->where('status', 'Active')
                    ->filter(function($cert) {
                        return \Carbon\Carbon::parse($cert['expires'])->isFuture() && 
                               \Carbon\Carbon::parse($cert['expires'])->diffInDays(now()) < 30;
                    })->count(),
            ]
        ]);
    }
}
