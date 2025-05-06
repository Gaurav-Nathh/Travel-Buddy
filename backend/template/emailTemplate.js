export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin-top: 150px; display: flex; justify-content: center; align-content: center; height: 100%; background-image: url(https://drive.google.com/file/d/1Z7bFz7uEfrEC5hSQ--BvvXgvYIZXN2Wj/view?usp=sharing); background-size: fit; background-repeat: no-repeat;">
  <div style="position: absolute; font-family: Arial; background-color: #6F85DF; height: 480px; min-width: 500px; max-width: 500px; border-radius: 10px;">
    <h1 style="color: white; text-align: center;">Verify Your Email</h1>
    <div style="margin:auto; padding: 10px; width: 93%; border-radius: 10px; background-color: #f9f9f9;">
      <p>Hello,</p>
      <p>Thank you for signing up! Your verification code is:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #6F85DF;">{verificationCode}</span>
      </div>
      <p>Enter this code on the verification page to complete your registration.</p>
      <p>This code will expire in 15 minutes for security reasons.</p>
      <p>If you didn't create an account with us, please ignore this email.</p>
      <p>Best regards,<br>TravelBuddy</p>
    </div>
      <p style="font-size: small; text-align: center; color: white;">This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TravelBuddy</title>
</head>
<body style="margin-top: 150px; display: flex; justify-content: center; align-content: center; height: 100%; background-image: url(./Cloud.jpg); background-size: fit; background-repeat: no-repeat;">
  <div style="position: absolute; font-family: Arial; background-color: #6F85DF; height: 350px; min-width: 400px; max-width: 400px; border-radius: 10px;">
    <h1 style="color: white; text-align: center;">Welcome</h1>
    <div style="margin:auto; padding: 8px; width: 93%; border-radius: 10px; background-color: #f9f9f9;">
      <p>Hello, <b>{name}</b></p>
      <p>Welcome to the <b>TravelBuddy</b> family! 🎉 We’re thrilled to have you here and excited to help you discover incredible destinations, exclusive deals, and unforgettable experiences. Your next adventure starts now!</p>
      <p>Best regards,<br>TravelBuddy</p>
    </div>
      <p style="font-size: small; text-align: center; color: white;">This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<html lang="en">
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0074ff, #0074ff); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #0074ff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Team TravelBuddy</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0074ff, #0074ff); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #0074ff; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Team TravelBuddy</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;