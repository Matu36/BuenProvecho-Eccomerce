import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import chef from "../img/chef.jpg";
import AuthButton from "./Auth0";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar2 = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Box >
      <Flex 
        bg="red.600"
        color="white"
        py={{ base: 2, md: 2 }}
        px={8}
        display={{ base: "flex", md: "flex" }}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Box flex={1}>
          <Flex alignItems="center">
            <img
              src={chef}
              alt="chef"
              style={{ maxWidth: "3rem", maxHeight: "1%", borderRadius: "50%" }}
            />
            <Box marginLeft="0.5rem">
              <Text
                fontSize={{ base: "14px", md: "22px" }}
                fontWeight="bold"
                color="yellow"
              >
                Hola {isAuthenticated ? user.given_name : null}
              </Text>
              <Text
                maxWidth="70%"
                fontSize={{ base: "12px", md: "16px" }}
                fontFamily="cursive"
                color="black"
              >
                Que quieres comer hoy?
              </Text>
            </Box>
            <div className="Titulo">
              <h1>Buen Provecho!</h1>
            </div>
          </Flex>
        </Box>
        <Box paddingLeft={{ base: "20%", md: "13%" }}>
          <AuthButton />
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar2;
