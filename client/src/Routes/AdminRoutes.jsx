// src/routes/AdminRoutes.jsx
import PrivateRoute from "../context/PrivateRoute";


export const adminRoutes = [
  {
    path: "/admin_dashboard",
    element: (
      <PrivateRoute allowedRole="admin">
        <>ho</>
      </PrivateRoute>
    ),
  },
  {
    path: "/admin_dashboard/candidates-add",
    element: (
      <PrivateRoute allowedRole="admin">
        <>ho</>{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/admin_dashboard/profile",
    element: (
      <PrivateRoute allowedRole="admin">
        <>ho</>{" "}
      </PrivateRoute>
    ),
  },
];
