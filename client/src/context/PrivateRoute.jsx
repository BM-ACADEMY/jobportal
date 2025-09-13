// src/context/PrivateRoute.jsx (Minor: Improved logging and defaults)
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ allowedRole, children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("PrivateRoute - User:", user, "Loading:", loading, "AllowedRole:", allowedRole);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!user;
  const userRole = user?.role || 'jobseeker'; // Default to jobseeker
  console.log("PrivateRoute - isAuthenticated:", isAuthenticated, "userRole:", userRole);

  // For public routes like login/register
  if (!isAuthenticated && (allowedRole === "public" || allowedRole === "login")) {
    console.log("PrivateRoute - Rendering children for public/login route");
    return children;
  }

  if (isAuthenticated && (allowedRole === "public" || allowedRole === "login")) {
    console.log("PrivateRoute - Redirecting authenticated user to dashboard:", `/${userRole}_dashboard`);
    return <Navigate to={`/${userRole}_dashboard`} replace />;
  }

  // For protected routes
  if (!isAuthenticated) {
    console.log("PrivateRoute - Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (allowedRole !== "any" && userRole !== allowedRole) {
    console.log("PrivateRoute - Role mismatch, redirecting to user dashboard:", `/${userRole}_dashboard`);
    return <Navigate to={`/${userRole}_dashboard`} replace />;
  }

  console.log("PrivateRoute - Rendering children for protected route");
  return children;
};

export default PrivateRoute;