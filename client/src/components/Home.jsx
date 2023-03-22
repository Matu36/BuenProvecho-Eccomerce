import React from "react";
import { Box, Image } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RandomSlider from "./randomSlider";
import Logo from "../img/LOGO.png";

export default function Home() {
  return (
    <Box>
      <Box position="fixed" top="0" left="0" right="0" zIndex="1">
        <NavBar />
      </Box>
      <Box
        mt="-3rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box maxWidth="400px" maxHeight="200px" margin="auto">
          <Image
            src={Logo}
            alt="Logo de la empresa"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
      </Box>

      <Box marginLeft="14rem" marginTop="-7rem">
        {RandomSlider()}
      </Box>
    </Box>
  );
}
