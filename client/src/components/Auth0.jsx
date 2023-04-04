import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated ? (
    <button onClick={() => logout()}>Cerrar sesión</button>
  ) : (
    <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
  );
};

export default AuthButton;