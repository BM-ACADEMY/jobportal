const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const SeekerProfile = require("../models/SeekerProfile");
const RecruiterProfile = require("../models/RecruiterProfile");
const { OAuth2Client } = require("google-auth-library");
const { sendEmail } = require("../utils/mailer");
const { otpEmailTemplate } = require("../emails/templates/otpEmailTemplate");
const { forgotPasswordEmailTemplate } = require("../emails/templates/forgotPasswordEmailTemplate");
const { registrationSuccessEmailTemplate } = require("../emails/templates/registrationSuccessEmailTemplate");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const { first_name, last_name, email, password, phone, role_id, company_name, gst_number } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const role = await Role.findById(role_id);
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
      role_id: role._id,
      email_otp: otp,
      otp_expires: otpExpires,
    });

    await user.save();

    // Create profile based on role
    if (role.role_name.toLowerCase() === "jobseeker") {
      const seekerProfile = new SeekerProfile({
        user_id: user._id,
      });
      await seekerProfile.save();
    } else if (role.role_name.toLowerCase() === "recruiter") {
      const recruiterProfile = new RecruiterProfile({
        user_id: user._id,
        company_name: company_name || "Unknown Company",
        gst_number: gst_number || "",
      });
      await recruiterProfile.save();
    }

    await sendEmail(email, "Verify Your Email - Job Portal", otpEmailTemplate(otp));

    res.status(201).json({
      message: "User registered. Please verify your email with the OTP sent.",
      user: { id: user._id, email, role: role.role_name },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const googleRegister = async (req, res) => {
  try {
    const { token, role, company_name, gst_number } = req.body;

    // Validate token
    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub: googleId } = payload;

    // Validate googleId
    if (!googleId || typeof googleId !== "string") {
      return res.status(400).json({ message: "Invalid Google ID" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Find role
    const roleDoc = await Role.findOne({ role_name: role });
    if (!roleDoc) {
      return res.status(400).json({ message: "Role not found" });
    }

    // Create new user
    user = new User({
      first_name: given_name || "Unknown",
      last_name: family_name || "Unknown",
      email,
      password: await bcrypt.hash(googleId, 10),
      phone: "N/A",
      role_id: roleDoc._id,
      email_verified: true,
    });

    await user.save();

    // Create profile based on role
    if (roleDoc.role_name.toLowerCase() === "jobseeker") {
      const seekerProfile = new SeekerProfile({
        user_id: user._id,
      });
      await seekerProfile.save();
    } else if (roleDoc.role_name.toLowerCase() === "recruiter") {
      const recruiterProfile = new RecruiterProfile({
        user_id: user._id,
        company_name: company_name || "Unknown Company",
        gst_number: gst_number || "",
      });
      await recruiterProfile.save();
    }

    await sendEmail(
      email,
      "Welcome to Job Portal!",
      registrationSuccessEmailTemplate()
    );

    const jwtToken = jwt.sign(
      { id: user._id, role: roleDoc.role_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: { id: user._id, email, role: roleDoc.role_name },
    });
  } catch (error) {
    console.error("Google register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const { email, email_otp } = req.body;
    const user = await User.findOne({ email, email_otp }).populate("role_id");

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otp_expires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.email_verified = true;
    user.email_otp = null;
    user.otp_expires = null;
    await user.save();

    await sendEmail(email, "Welcome to Job Portal!", registrationSuccessEmailTemplate());

    const token = jwt.sign(
      { id: user._id, role: user.role_id.role_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.email_otp = otp;
    user.otp_expires = otpExpires;
    await user.save();

    // Send OTP email
    await sendEmail(
      email,
      "Reset Your Password - Job Portal",
      forgotPasswordEmailTemplate(otp)
    );

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, email_otp, newPassword } = req.body;
    const user = await User.findOne({ email, email_otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otp_expires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.email_otp = null;
    user.otp_expires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).populate("role_id");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role_id.role_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email, role: user.role_id.role_name },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("role_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      role: user.role_id.role_name,
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Validate token
    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google payload:", payload); // Debug
    const { email, given_name, family_name, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findOne({ email }).populate("role_id");
    if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role_id.role_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Set cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: { id: user._id, email, role: user.role_id.role_name },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { register, login, logout, verifyEmail, getMe, googleLogin, googleRegister, forgotPassword, resetPassword };