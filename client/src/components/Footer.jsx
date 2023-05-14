import React from "react";
import { Box, Button, IconButton, useColorMode } from "@chakra-ui/react";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";

export default function Footer({ setShowAbout, handleMostrarFormulario }) {
  const { colorMode } = useColorMode();
  const buttonColorScheme = colorMode === "light" ? "#F08080" : "gray";

  const handleAboutClick = () => {
    setShowAbout(true);
  };
  return (
    <Box backgroundColor="yellow.300">
      <Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" alignItems="center">
            <IconButton
              as="a"
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              mr={2}
              colorScheme={buttonColorScheme}
            />
            <IconButton
              as="a"
              href="https://www.facebook.com/"
              target="_blank"
              aria-label="Facebook"
              icon={<FaFacebook />}
              mr={2}
              colorScheme={buttonColorScheme}
            />
            <IconButton
              as="a"
              href="https://maps.google.com/"
              target="_blank"
              aria-label="Geolocalización"
              icon={<FaMapMarkerAlt />}
              mr={2}
              colorScheme={buttonColorScheme}
            />
            <IconButton
              as="a"
              href="https://wa.me/5492215704647?text=Hola,%20quisiera%20hacerte%20un%20pedido"
              target="_blank"
              aria-label="Whatsapp"
              icon={<FaWhatsapp />}
              colorScheme={buttonColorScheme}
            />
            <Button
              variant="ghost"
              color="white"
              title="Envianos tu Mensaje!"
              fontSize="22px"
              onClick={handleMostrarFormulario}
            >
              <BiMessageDetail />
            </Button>
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box display="flex" alignItems="center">
              <Button
                variant="ghost"
                color="white"
                mr={2}
                onClick={handleAboutClick}
              >
                Sobre Nosotros
              </Button>
            </Box>

            <Box
              flex="1"
              ml="auto"
              mr="auto"
              maxWidth={{ base: "100px", md: "400px" }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
