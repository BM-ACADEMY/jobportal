import React, { useState, useRef } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaBuilding,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../toast/customToast";

export default function Register() {
  const [formData, setFormData] = useState({
    role: "jobseeker",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    gstNumber: "",
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, verifyEmail, googleRegister } = useAuth();
  const navigate = useNavigate();
  const isSubmitting = useRef(false); // Prevent duplicate submissions
  const googleRegisterRef = useRef(false); // Prevent duplicate Google registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setLoading(true);

    console.log("Submitting registration form"); // Debug
    if (formData.password !== formData.confirmPassword) {
      showToast("error", "Passwords do not match!");
      setLoading(false);
      isSubmitting.current = false;
      return;
    }

    const result = await register(formData);
    if (result.success) {
      setShowOtpInput(true);
      showToast("success", "OTP sent to your email");
    } else {
      showToast("error", result.error || "Registration failed");
    }
    setLoading(false);
    isSubmitting.current = false;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setLoading(true);

    console.log("Verifying OTP:", otp); // Debug
    const result = await verifyEmail(formData.email, otp);
    if (result.success) {
      showToast("success", "Email verified successfully");
      navigate("/login", { replace: true });
    } else {
      showToast("error", result.error || "OTP verification failed");
    }
    setLoading(false);
    isSubmitting.current = false;
  };

  const handleGoogleRegister = async (credentialResponse) => {
    if (isSubmitting.current || googleRegisterRef.current) {
      console.log("Duplicate Google registration prevented"); // Debug
      return;
    }
    googleRegisterRef.current = true;
    isSubmitting.current = true;
    setLoading(true);

    console.log("Google registration triggered with credential:", credentialResponse.credential); // Debug
    try {
      const result = await googleRegister(
        credentialResponse.credential,
        formData.role,
        formData.companyName,
        formData.gstNumber
      );
      if (result.success) {
        showToast("success", "Google registration successful! Please log in to continue.");
        navigate("/login", { replace: true });
      } else {
        showToast("error", result.error || "Google registration failed");
      }
    } catch (error) {
      console.error("Google registration error:", error);
      showToast("error", "Google registration failed");
    } finally {
      setLoading(false);
      isSubmitting.current = false;
      googleRegisterRef.current = false;
    }
  };

  const isRecruiter = formData.role === "recruiter";

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {showOtpInput ? "Verify Your Email" : "Create Your Account"}
          </h2>

          {!showOtpInput ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-2 px-3 focus:outline-none"
                  disabled={loading}
                >
                  <option value="jobseeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      First Name
                    </label>
                    <div className="flex items-center border rounded-lg px-3">
                      <FaUser className="text-gray-400 mr-2" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full py-2 focus:outline-none"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Last Name
                    </label>
                    <div className="flex items-center border rounded-lg px-3">
                      <FaUser className="text-gray-400 mr-2" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full py-2 focus:outline-none"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center border rounded-lg px-3">
                    <FaPhone className="text-gray-400 mr-2" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full py-2 focus:outline-none"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <div className="flex items-center border rounded-lg px-3">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-2 focus:outline-none"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {isRecruiter && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Company Name
                      </label>
                      <div className="flex items-center border rounded-lg px-3">
                        <FaBuilding className="text-gray-400 mr-2" />
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full py-2 focus:outline-none"
                          required={isRecruiter}
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        GST Number
                      </label>
                      <div className="flex items-center border rounded-lg px-3">
                        <input
                          type="text"
                          name="gstNumber"
                          placeholder="Enter GST Number"
                          value={formData.gstNumber}
                          onChange={handleChange}
                          className="w-full py-2 focus:outline-none"
                          required={isRecruiter}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="flex items-center border rounded-lg px-3">
                    <FaLock className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full py-2 focus:outline-none"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Confirm Password
                  </label>
                  <div className="flex items-center border rounded-lg px-3">
                    <FaLock className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full py-2 focus:outline-none"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              {!isRecruiter && (
                <>
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500">Or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  <div className="w-full flex items-center justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleRegister}
                      onError={() => {
                        console.log("Google registration error"); // Debug
                        showToast("error", "Google registration failed");
                      }}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Enter OTP
                </label>
                <div className="flex items-center border rounded-lg px-3">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full py-2 focus:outline-none"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}