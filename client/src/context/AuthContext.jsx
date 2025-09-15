import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { showToast } from "../toast/customToast";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        const userData = response.data;
        userData.role = userData.role && typeof userData.role === "object"
          ? userData.role.role_name || userData.role.name || "jobseeker"
          : userData.role || "jobseeker";
        setUser(userData);
      } catch (error) {
        console.error("Fetch user error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const userData = response.data.user;
      userData.role = userData.role && typeof userData.role === "object"
        ? userData.role.role_name || userData.role.name || "jobseeker"
        : userData.role || "jobseeker";
      setUser(userData);
      showToast("success", "Login successful");
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      showToast("error", error.response?.data?.message || "Login failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const googleLogin = async (token) => {
    try {
      const response = await axiosInstance.post("/auth/google-login", { token });
      const userData = response.data.user;
      userData.role = userData.role && typeof userData.role === "object"
        ? userData.role.role_name || userData.role.name || "jobseeker"
        : userData.role || "jobseeker";
      setUser(userData);
      showToast("success", "Google login successful");
      return { success: true, user: userData };
    } catch (error) {
      console.error("Google login error:", error);
      showToast("error", error.response?.data?.message || "Google login failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (formData) => {
    try {
      const { role, firstName, lastName, phone, email, password, companyName, gstNumber } = formData;
      const roleResponse = await axiosInstance.get("/roles");
      const roleObj = roleResponse.data.find((r) => r.role_name === role);
      if (!roleObj) {
        throw new Error("Role not found");
      }

      const userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone,
        role_id: roleObj._id,
        company_name: companyName,
        gst_number: gstNumber,
      };

      const registerResponse = await axiosInstance.post("/auth/register", userData);
      const userDataResponse = registerResponse.data.user;
      userDataResponse.role = role;

      // Removed the recruiter profile creation from frontend
      if (role === "jobseeker") {
        try {
          await axiosInstance.post("/seeker-profiles");
        } catch (profileError) {
          console.warn("Seeker profile creation warning:", profileError);
        }
      }

      return { success: true, user: userDataResponse };
    } catch (error) {
      console.error("Register error:", error);
      showToast("error", error.response?.data?.message || "Registration failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const response = await axiosInstance.post("/auth/verify-email", { email, email_otp: otp });
      showToast("success", response.data.message);
      return { success: true };
    } catch (error) {
      console.error("Verify email error:", error);
      showToast("error", error.response?.data?.message || "OTP verification failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", { email });
      showToast("success", response.data.message);
      return { success: true };
    } catch (error) {
      console.error("Forgot password error:", error);
      showToast("error", error.response?.data?.message || "Failed to send OTP");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email,
        email_otp: otp,
        newPassword,
      });
      showToast("success", response.data.message);
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error);
      showToast("error", error.response?.data?.message || "Password reset failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const googleRegister = async (token, role = "jobseeker", companyName = "", gstNumber = "") => {
    try {
      const response = await axiosInstance.post("/auth/google-register", { token, role, company_name: companyName, gst_number: gstNumber });
      const userData = response.data.user;
      userData.role = userData.role && typeof userData.role === "object"
        ? userData.role.role_name || userData.role.name || "jobseeker"
        : userData.role || "jobseeker";
      showToast("success", "Google registration successful! Please log in to continue.");
      return { success: true, user: userData };
    } catch (error) {
      console.error("Google register error:", error);
      showToast("error", error.response?.data?.message || "Google registration failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      showToast("success", "Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      showToast("error", "Logout failed");
    }
  };

  const value = {
    user,
    login,
    googleLogin,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    googleRegister,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};