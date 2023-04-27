import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RiUserFill } from "react-icons/ri";
import { IconButton,  MenuItem, 
  Menu, MenuButton, MenuList} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../Redux/actions";

  const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  //LOCALSTORAGE --> USO LA PROPIEDAD "user" DE 
  //ESTA FORMA let currentUser = JSON.parse(localStorage.getItem("user")); PARA
  //EL RESTO DE LOS COMPONENTES.
  let currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(currentUser))
    }, []);

  const Usuario = useSelector (state => state.users);


  useEffect(() => {
    if (isAuthenticated && user) {
      const {email } = user;
      const userData = { email }; // utiliza sub como el id del usuario
      localStorage.setItem("user", JSON.stringify(userData)); // almacenar los datos del usuario usando su sub como clave
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
    bg={isAuthenticated ? "red.500" : "gray.500"}
    _hover={{ bg: isAuthenticated ? "red.600" : "gray.600" }}
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
            window.location.reload();
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

  )
      }
  
    

export default AuthButton;