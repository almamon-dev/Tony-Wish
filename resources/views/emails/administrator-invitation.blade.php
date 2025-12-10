<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrator Invitation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f9fafb;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            border-bottom: 1px solid #e5e7eb;
            padding: 24px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            color: #111827;
        }

        .content {
            padding: 32px;
        }

        .welcome-text {
            margin-bottom: 24px;
            font-size: 15px;
            color: #374151;
        }

        .details-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin: 24px 0;
        }

        .detail-row {
            margin: 12px 0;
            display: flex;
            align-items: flex-start;
        }

        .detail-label {
            font-weight: 500;
            width: 140px;
            flex-shrink: 0;
            color: #6b7280;
        }

        .detail-value {
            color: #111827;
        }

        .button-container {
            margin: 32px 0;
            text-align: center;
        }

        .accept-button {
            display: inline-block;
            background-color: #111827;
            color: white;
            text-decoration: none;
            padding: 12px 32px;
            border-radius: 6px;
            font-weight: 500;
            font-size: 15px;
            border: none;
            cursor: pointer;
        }

        .invitation-link {
            background: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            padding: 16px;
            margin: 24px 0;
            word-break: break-all;
            font-size: 14px;
            color: #4b5563;
            font-family: 'SF Mono', Monaco, 'Courier New', monospace;
        }

        .instructions {
            margin: 32px 0;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
        }

        .instructions h3 {
            margin-top: 0;
            margin-bottom: 16px;
            font-size: 16px;
            font-weight: 600;
            color: #111827;
        }

        .instructions ol {
            margin: 0;
            padding-left: 20px;
            color: #4b5563;
        }

        .instructions li {
            margin-bottom: 8px;
        }

        .footer {
            padding: 24px;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
        }

        .footer a {
            color: #374151;
            text-decoration: none;
        }

        @media (max-width: 600px) {
            .content {
                padding: 24px;
            }

            .detail-row {
                flex-direction: column;
            }

            .detail-label {
                width: 100%;
                margin-bottom: 4px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>Administrator Invitation</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Welcome Message -->
            <div class="welcome-text">
                <p>Hello <strong>{{ $invitationData['invitee_name'] ?? $invitationData['invitee_email'] }}</strong>,</p>
                <p>You have been invited by
                    <strong>{{ $invitationData['inviter_name'] ?? $invitationData['inviter_email'] }}</strong> to join
                    as an administrator.
                </p>
            </div>

            <!-- Invitation Details -->
            <div class="details-box">
                <div class="detail-row">
                    <div class="detail-label">Invited By:</div>
                    <div class="detail-value">{{ $invitationData['inviter_name'] ?? $invitationData['inviter_email'] }}
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-label">Business:</div>
                    <div class="detail-value">{{ $invitationData['business_name'] ?? 'Business Platform' }}</div>
                </div>

                <div class="detail-row">
                    <div class="detail-label">Access Level:</div>
                    <div class="detail-value">
                        {{ $invitationData['access_level_label'] ?? ($invitationData['access_level'] ?? 'Limited Access') }}
                    </div>
                </div>

                @if (isset($invitationData['department']) && $invitationData['department'])
                    <div class="detail-row">
                        <div class="detail-label">Department:</div>
                        <div class="detail-value">{{ $invitationData['department'] }}</div>
                    </div>
                @endif

                <div class="detail-row">
                    <div class="detail-label">Invitation Date:</div>
                    <div class="detail-value">{{ $invitationData['invitation_date'] ?? now()->format('F j, Y') }}</div>
                </div>
            </div>

            <!-- Accept Button -->
            <div class="button-container">
                <a href="{{ $invitationData['accept_url'] }}" class="accept-button">
                    Accept Invitation
                </a>
            </div>

            <!-- Alternative Link -->
            <div class="invitation-link">
                {{ $invitationData['accept_url'] }}
            </div>

            <!-- Instructions -->
            <div class="instructions">
                <h3>How to accept:</h3>
                <ol>
                    <li>Click the "Accept Invitation" button</li>
                    <li>Create your account password</li>
                    <li>Complete your profile setup</li>
                </ol>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>This invitation was sent by {{ $invitationData['business_name'] ?? 'Business Platform' }}</p>
            <p>If you have any questions, contact <a
                    href="mailto:{{ $invitationData['support_email'] ?? 'support@example.com' }}">{{ $invitationData['support_email'] ?? 'support@example.com' }}</a>
            </p>
            <p style="margin-top: 16px; font-size: 13px; color: #9ca3af;">
                &copy; {{ date('Y') }} {{ $invitationData['business_name'] ?? 'Business Platform' }}
            </p>
        </div>
    </div>
</body>

</html>
