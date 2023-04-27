import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RiUserFill } from "react-icons/ri";
import { IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";


const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  /* const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); */

  //LOCALSTORAGE

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isAuthenticated, user]);

  // FIN LOCAL STORAGE

  
  //redirige el usuario creado a nuestra propia base de datos; La prpiedad
  //user ya viene con Auth0.
  useEffect(() => {
    if (isAuthenticated && user) {
      // Enviar el correo electrónico del usuario autenticado a tu propia API
      axios.post("http://localhost:3001/users", {
        email: user.email,
      });
    }
  }, [isAuthenticated, user]);

  // finaliza aca el codigo para llevar a nuestro usuario a nuestra base de datos

  /* useEffect(() => {
    const checkIsAdmin = async () => {
      if (isAuthenticated && user) {
        try {
          const res = await axios.get(`http://localhost:3001/users?email=${user.email}`);
          setIsAdmin(res.data[0].role === "false");
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkIsAdmin();
  }, [isAuthenticated, user]); */

  

  return (
    <IconButton
      icon={<RiUserFill />}
      title={isAuthenticated ? user.email : "Iniciar sesión"}
      aria-label={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
      onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
      bg={isAuthenticated ? "red.500" : "gray.500"}
      _hover={{ bg: isAuthenticated ? "red.600" : "gray.600" }}
    />
  );
};

export default AuthButton;