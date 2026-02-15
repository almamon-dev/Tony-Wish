<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrator Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff; color: #1a1a1a;">
    
    <!-- Main Container -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 60px 20px;">
                
                <!-- Content Card -->
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff;">
                    
                    <!-- Logo/Brand -->
                    <tr>
                        <td style="padding: 0 0 40px 0; text-align: center;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 12px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-size: 24px; font-weight: 700;">A</span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Heading -->
                    <tr>
                        <td style="padding: 0 0 24px 0;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.02em; line-height: 1.2;">
                                You've been invited
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Description -->
                    <tr>
                        <td style="padding: 0 0 32px 0;">
                            <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #525252;">
                                You've been invited to join as an Administrator. Use the credentials below to access your account.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Credentials Box -->
                    <tr>
                        <td style="padding: 0 0 32px 0;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <!-- Email -->
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 0 0 16px 0;">
                                                    <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 500; color: #737373; text-transform: uppercase; letter-spacing: 0.05em;">
                                                        Email
                                                    </p>
                                                    <p style="margin: 0; font-size: 15px; font-weight: 500; color: #0a0a0a; font-family: 'SF Mono', Monaco, 'Courier New', monospace;">
                                                        {{ $email }}
                                                    </p>
                                                </td>
                                            </tr>
                                            <!-- Password -->
                                            <tr>
                                                <td style="padding: 0; border-top: 1px solid #e5e5e5; padding-top: 16px;">
                                                    <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 500; color: #737373; text-transform: uppercase; letter-spacing: 0.05em;">
                                                        Temporary Password
                                                    </p>
                                                    <p style="margin: 0; font-size: 15px; font-weight: 500; color: #0a0a0a; font-family: 'SF Mono', Monaco, 'Courier New', monospace;">
                                                        {{ $password }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 0 32px 0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $verificationUrl }}" style="display: inline-block; padding: 14px 32px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 500; letter-spacing: -0.01em;">
                                            Verify Email & Continue
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Security Note -->
                    <tr>
                        <td style="padding: 0 0 32px 0;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef9e7; border-left: 3px solid #f59e0b; border-radius: 4px;">
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #78350f;">
                                            <strong style="font-weight: 600;">Security reminder:</strong> Change your password after your first login. Never share your credentials with anyone.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 0 24px 0;">
                            <div style="height: 1px; background-color: #e5e5e5;"></div>
                        </td>
                    </tr>
                    
                    <!-- Alternative Link -->
                    <tr>
                        <td style="padding: 0 0 40px 0;">
                            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #a3a3a3;">
                                If the button doesn't work, copy and paste this URL into your browser:
                            </p>
                            <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.6; color: #2563eb; word-break: break-all;">
                                {{ $verificationUrl }}
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 0 0 0; border-top: 1px solid #e5e5e5; text-align: center;">
                            <p style="margin: 0 0 8px 0; font-size: 13px; color: #a3a3a3;">
                                Need help? Contact support
                            </p>
                            <p style="margin: 0; font-size: 13px; color: #d4d4d4;">
                                © {{ date('Y') }} All rights reserved
                            </p>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>

