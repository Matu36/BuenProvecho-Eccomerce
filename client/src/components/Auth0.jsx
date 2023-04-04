import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RiUserFill } from "react-icons/ri";
import { IconButton } from "@chakra-ui/react";

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <IconButton
    icon={<RiUserFill />}
    title={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
    aria-label={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
    onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
    bg={isAuthenticated ? "red.500" : "gray.500"}
    _hover={{ bg: isAuthenticated ? "red.600" : "gray.600" }}
  />
  );
};

export default AuthButton;