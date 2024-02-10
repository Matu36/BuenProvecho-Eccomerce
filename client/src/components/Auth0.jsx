import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RiUserFill } from "react-icons/ri";
import {
  IconButton,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Usuario = useSelector((state) => state.users);

  //FUNCION DE LOCAL STORAGE
  useEffect(() => {
    if (isAuthenticated && user) {
      const { email } = user;
      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, [isAuthenticated, user]);

  // FIN LOCAL STORAGE

  //redirige el usuario creado a nuestra propia base de datos; La propiedad
  //user ya viene con Auth0.
  useEffect(() => {
    if (isAuthenticated && user) {
      // Enviar el correo electrónico del usuario autenticado a mi DB
      axios.post(
        `https://pymes-software-integration-production.up.railway.app/users`,
        {
          email: user.email,
        }
      );
    }
  }, [isAuthenticated, user]);

  // finaliza aca el codigo para llevar a nuestro usuario a nuestra base de datos

  //FUNCION DE LOGOUT PARA QUE CUANDO SALIMOS DE LA PAGINA REMUEVA AL USUARIO QUE ENTRO
  const loggingOut = () => {
    localStorage.removeItem("user");
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
      <MenuButton
        as={IconButton}
        icon={<RiUserFill />}
        title={isAuthenticated ? user.email : "Iniciar sesión"}
        aria-label={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
        bg={isAuthenticated ? "gray.300" : "gray.300"}
        _hover={{ bg: isAuthenticated ? "blue.800" : "red.800" }}
        onMouseEnter={() => setIsMenuOpen(true)}
        w="8"
      />
      {isMenuOpen && (
        <MenuList maxW="xs">
          <MenuItem
            color="gray.600"
            fontSize="md"
            px="3"
            py="2"
            mx="auto"
            textAlign="center"
            onClick={() => {
              if (isAuthenticated) {
                loggingOut();
                window.location.reload();
              } else {
                loginWithRedirect();
              }
            }}
          >
            {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
          </MenuItem>
          {Usuario.length > 1 && (
            <Link to="/admin">
              <MenuItem
                color="gray.600"
                fontSize="md"
                px="3"
                py="2"
                mx="auto"
                textAlign="center"
              >
                Admin
              </MenuItem>
            </Link>
          )}
        </MenuList>
      )}
    </Menu>
  );
};

export default AuthButton;
