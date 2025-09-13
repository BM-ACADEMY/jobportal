// src/routes/JobSeekerRoutes.jsx
import PrivateRoute from "../context/PrivateRoute";
import UserDashboard from "../Modules/Jobseeker/Page/Dashboard";

// Add more as needed

export const jobseekerRoutes = [
  {
    path: '/jobseeker_dashboard',
    element: (
      <PrivateRoute allowedRole="jobseeker">
        <UserDashboard/>
      </PrivateRoute>
    ),
  },
  {
    path: '/jobseeker_dashboard/profile',
    element: (
      <PrivateRoute allowedRole="jobseeker">
        <>ho</>
      </PrivateRoute>
    ),
  },
  // Add more routes for jobseeker
];