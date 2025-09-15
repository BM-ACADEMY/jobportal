const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .header { text-align: center; }
    .otp { font-size: 24px; font-weight: bold; color: #28a745; text-align: center; margin: 20px 0; }
    .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Job Portal</h2>
      <p>Please use the following OTP to verify your email address.</p>
    </div>
    <div class="otp">${otp}</div>
    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Job Portal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;


module.exports = { otpEmailTemplate };