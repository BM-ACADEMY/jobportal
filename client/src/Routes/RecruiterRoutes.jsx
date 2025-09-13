// src/routes/RecruiterRoutes.jsx
import PrivateRoute from "../context/PrivateRoute";

// Add more as needed

export const recruiterRoutes = [
  {
    path: '/recruiter_dashboard',
    element: (
      <PrivateRoute allowedRole="recruiter">
               <>ho</>
      </PrivateRoute>
    ),
  },
  {
    path: '/recruiter_dashboard/profile',
    element: (
      <PrivateRoute allowedRole="recruiter">
                <>ho</>
      </PrivateRoute>
    ),
  },
  // Add more routes for recruiter
];