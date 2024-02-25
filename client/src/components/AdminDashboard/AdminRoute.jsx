import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AdminRoute = ({ element }) => {
  const { isAuthenticated, user } = useAuth0();

  // Verificar las condiciones para acceder a la ruta de administrador
  const canAccessAdmin =
    isAuthenticated && user?.email === "matipineda857@gmail.com";

  return canAccessAdmin ? <Route element={element} /> : <Navigate to="/" />;
};

export default AdminRoute;
