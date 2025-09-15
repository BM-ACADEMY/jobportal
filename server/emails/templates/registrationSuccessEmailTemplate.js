const registrationSuccessEmailTemplate = () => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .header { text-align: center; }
    .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Job Portal!</h2>
      <p>Congratulations! Your account has been successfully created.</p>
    </div>
    <p>Start exploring job opportunities or post jobs based on your role.</p>
    <p><a href="${process.env.CLIENT_URL}/login" style="color: #28a745; text-decoration: none;">Login to your account</a></p>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Job Portal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
module.exports = { registrationSuccessEmailTemplate };