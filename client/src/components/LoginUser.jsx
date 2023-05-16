import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { getUsers } from "../Redux/actions";
import { useDispatch } from "react-redux";
import chef from "../img/chef.jpg";
import { BarLoader } from "react-spinners";
import "./styles.css"

export default function LoggedInPage() {
  const { user, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //CON ESTA FUNCION UNA VEZ LOGUEADO, SE ENVIA EL USER POR QUERY PARA MATCHEAR
  //CON LA BASE DE DATOS.
  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  // Esperar 5 segundos antes de redirigir
   setTimeout(() => {
    navigate("/");
  }, 4000); 

  return (
     isAuthenticated && (
      <Box
        background="linear-gradient(to bottom, #FF0000, #800000);"
        height="100vh"
      >
        <Flex justifyContent="center" alignItems="center">
          <Box
            textAlign="center"
            marginTop={{ base: "15rem", md: "10rem" }}
            border="solid 1px gray"
            borderRadius="5%"
            padding={{ base: "5px", md: "25px" }}
            alignItems="center"
          >
            <Image
              src={chef}
              mx="auto"
              height="100px"
              width="100px"
              borderRadius="50%"
              alignItems="center"
            ></Image>
            <br />
            <Text
              fontSize={{ base: "1.5rem", md: "2xl" }}
              color="white"
              fontWeight="bold"
              mb={4}
              fontFamily="unset"
              alignItems="center"
            >
              {/* Bienvenido {user.name} */}
            </Text>
          </Box>
          
        </Flex>
        <br />
        <div className="TituloLoguin">
              <h1>Buen Provecho!</h1>
            </div>
        <Box
          sx={{
            position: "fixed",
            bottom: "5rem",
            right: { base: "4rem", md: "11rem" },
          }}
        >
          <BarLoader color={"red"} loading={true} height={10} />
        </Box>
        <Box display={{ base: "flex", md: "none" }} marginTop="4rem"></Box>
      </Box>
    )
   );
}
