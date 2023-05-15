import { Box, Flex} from "@chakra-ui/layout";
import React from "react";
import chef from "../img/chef.jpg";
import AuthButton from "./Auth0";


const NavBar2 = () => {
  

  return (
    <Box >
      <Flex 
        bg="red.600"
        color="white"
        py={{ base: 2, md: 2 }}
        px={8}
        display={{ base: "flex", md: "flex" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box flex={1}>
          <Flex alignItems="center">
            <img
              src={chef}
              alt="chef"
              style={{ maxWidth: "3rem", maxHeight: "1%", borderRadius: "50%" }}
            />
            
            <div className="Titulo">
              <h1>Buen Provecho!</h1>
            </div>
          </Flex>
        </Box>
        <Box >
          <AuthButton />
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar2;
