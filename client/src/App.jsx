import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./Routes/PublicRoutes";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import { adminRoutes } from "./Routes/AdminRoutes";
import { jobseekerRoutes } from "./Routes/JobSeekerRoutes";
import { recruiterRoutes } from "./Routes/RecruiterRoutes";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import Layout from "./Modules/Homepage/Layout/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (Navbar + Pages) */}
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute allowedRole="public">{route.element}</PrivateRoute>
              }
            />
          ))}

          {/* Auth Routes WITH Header */}
          <Route
            path="/login"
            element={
              <PrivateRoute allowedRole="public">
                <Layout>
                  <Login />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute allowedRole="public">
                <Layout>
                  <Register />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PrivateRoute allowedRole="public">
                <Layout>
                  <ForgotPassword />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PrivateRoute allowedRole="public">
                <Layout>
                  <ResetPassword />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Protected Routes */}
          <Route>
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute allowedRole="admin">{route.element}</PrivateRoute>
                }
              />
            ))}
            {jobseekerRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute allowedRole="jobseeker">
                    {route.element}
                  </PrivateRoute>
                }
              />
            ))}
            {recruiterRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute allowedRole="recruiter">
                    {route.element}
                  </PrivateRoute>
                }
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;