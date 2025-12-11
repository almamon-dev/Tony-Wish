<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrator Invitation</title>

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

            <!-- 🔴 LOGIN CREDENTIALS ADD HERE 🔴 -->
            <div class="credentials-box"
                style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ddd;">
                <h3 style="color: #333; margin-top: 0;">Your Login Credentials:</h3>
                <div class="credential-row" style="margin: 10px 0;">
                    <strong style="display: inline-block; width: 120px;">Email:</strong>
                    <span>{{ $invitationData['invitee_email'] }}</span>
                </div>
                <div class="credential-row" style="margin: 10px 0;">
                    <strong style="display: inline-block; width: 120px;">Password:</strong>
                    <span>12345678</span>
                </div>
                <div class="note" style="color: #666; font-size: 14px; margin-top: 10px;">
                    <small>Please change your password after first login.</small>
                </div>
            </div>
            <!-- 🔴 END LOGIN CREDENTIALS 🔴 -->

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
                    <li>You will be automatically logged in</li>
                    <li>You can change your password from profile settings</li>
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
