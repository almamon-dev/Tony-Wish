<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Tony Wish</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2185d5;
            padding: 32px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            padding: 32px;
        }
        .welcome-text {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 24px;
        }
        .credentials {
            background-color: #f1f5f9;
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 24px;
        }
        .credential-item {
            margin-bottom: 12px;
        }
        .label {
            font-size: 12px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .value {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }
        .footer {
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2185d5;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin-top: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Tony Wish</h1>
        </div>
        <div class="content">
            <div class="welcome-text">Hi {{ $user->first_name }},</div>
            <p>You have been added to the <strong>Tony Wish</strong> platform. Here are your login credentials:</p>
            
            <div class="credentials">
                <div class="credential-item">
                    <div class="label">Email Address</div>
                    <div class="value">{{ $user->email }}</div>
                </div>
                <div class="credential-item">
                    <div class="label">Initial Password</div>
                    <div class="value">{{ $password }}</div>
                </div>
            </div>

            <p>Please click the button below to verify your email address and secure your account.</p>
            
            <div style="text-align: center;">
                <a href="{{ $verificationUrl }}" class="button">Verify Now</a>
            </div>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Tony Wish. All rights reserved.
        </div>
    </div>
</body>
</html>
