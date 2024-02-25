import React from "react";
import { Navigate } from "react-router-dom";
import AppAdmin from "../AdminDashboard/AppAdmin";

const AdminRoute = ({ isAuthenticated, user }) => {
  // Verifica las condiciones para acceder a la ruta /admin
  const canAccessAdmin =
    isAuthenticated && user?.email === "matipineda857@gmail.com";

  return canAccessAdmin ? <AppAdmin /> : <Navigate to="/" />;
};

export default AdminRoute;
