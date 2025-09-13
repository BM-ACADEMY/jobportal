// src/context/AuthContext.jsx (Fixed: Typo in last_name assignment)
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
        // Normalize role to string
        userData.role = userData.role && typeof userData.role === 'object'
          ? userData.role.role_name || userData.role.name || 'jobseeker'
          : userData.role || 'jobseeker';
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
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const userData = response.data.user;
      // Normalize role to string
      userData.role = userData.role && typeof userData.role === 'object'
        ? userData.role.role_name || userData.role.name || 'jobseeker'
        : userData.role || 'jobseeker';
      setUser(userData);
      showToast("success", "Login successful");
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      showToast("error", error.response?.data?.message || "Login failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (formData) => {
    try {
      const {
        role,
        firstName,
        lastName,
        phone,
        email,
        password,
        companyName,
        gstNumber,
      } = formData;

      // Register the user
      const userData = {
        first_name: firstName,
        last_name: lastName,  // Fixed: Changed from 'LastName' to 'lastName'
        email,
        password,
        phone,
      };

      // Get role_id for the role
      const roleResponse = await axiosInstance.get("/roles");
      const roleObj = roleResponse.data.find((r) => r.role_name === role);
      if (!roleObj) {
        throw new Error("Role not found");
      }
      userData.role_id = roleObj._id;

      const registerResponse = await axiosInstance.post("/auth/register", userData);

      // DON'T set user in context - keep unauthenticated to go to login
      const userDataResponse = registerResponse.data.user;
      userDataResponse.role = role; // For return value only

      // Create profile based on role (non-blocking)
      try {
        if (role === "recruiter") {
          await axiosInstance.post("/recruiter-profiles", {
            company_name: companyName,
            gst_number: gstNumber,
          });
        } else if (role === "jobseeker") {
          await axiosInstance.post("/seeker-profiles");
        }
      } catch (profileError) {
        console.warn("Profile creation warning:", profileError);
      }

      showToast("success", "Registration successful! Please log in to continue.");
      return { success: true, user: userDataResponse };
    } catch (error) {
      console.error("Register error:", error);
      showToast("error", error.response?.data?.message || "Registration failed");
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
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};