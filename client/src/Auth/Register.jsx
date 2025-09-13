// src/Modules/Auth/Register.jsx (Updated: Navigate to /login on success)
import React, { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjusted path assuming structure
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

  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      showToast("error", "Passwords do not match!");
      setLoading(false);
      return;
    }

    const result = await register(formData);
    if (result.success) {
      // Navigate to login since no auth set in context
      navigate("/login", { replace: true });
      console.log("Registration successful - navigated to login");
    }
    setLoading(false);
  };

  const isRecruiter = formData.role === "recruiter";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg py-2 px-3 focus:outline-none"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
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
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
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
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
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
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
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
              />
            </div>
          </div>

          {/* Recruiter fields */}
          {isRecruiter && (
            <>
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
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
                  />
                </div>
              </div>

              {/* GST Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">GST Number</label>
                <div className="flex items-center border rounded-lg px-3">
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST Number"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full py-2 focus:outline-none"
                    required={isRecruiter}
                  />
                </div>
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
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
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
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
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">Or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Register */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg bg-white hover:bg-gray-50 font-medium transition">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}