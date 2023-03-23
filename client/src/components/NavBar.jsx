import React from "react";
import DarkMode from "../utils/DarkMode";
import { FaInstagram, FaFacebook, FaMapMarkerAlt, FaWhatsapp   } from "react-icons/fa"
import {
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";

export default function NavBar({ handleSelectFood }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <IconButton
        aria-label="Abrir menú"
        icon={<HamburgerIcon />}
        size="md"
        variant="ghost"
        color="white"
        onClick={onOpen}
        display={{ md: "none" }} // Sólo muestra el botón en modo responsivo
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton />
          <DrawerHeader color="white">Menú</DrawerHeader>
          <DrawerBody>{/* Agrega aquí los elementos del menú */}</DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box>
        <Flex
          bg="blue.500"
          color="white"
          py={4}
          px={8}
          display={{ base: "none", md: "flex" }}
        >
          <Box>
          <DarkMode />
          </Box>
          <Box flex="1" ml="auto" mr="auto" maxWidth="500px">
          <SearchBar handleSelectFood= {handleSelectFood} />
          </Box>

          <Box display="flex" alignItems="center" mr={4}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Categorias
              </MenuButton>
              <MenuList>
                <MenuItem>Carnes</MenuItem>
                <MenuItem>Pastas</MenuItem>
                <MenuItem>Pescados</MenuItem>
                <MenuItem>Ensaladas</MenuItem>
                <MenuItem>Minutas</MenuItem>
                <MenuItem>Platos Frios</MenuItem>
                <MenuItem>Bebidas</MenuItem>
              </MenuList>
            </Menu>

            <Box display="flex" alignItems="center">
  <IconButton
    as="a"
    href="https://www.instagram.com/"
    target="_blank"
    aria-label="Instagram"
    icon={<FaInstagram />}
    mr={2}
  />
  <IconButton
    as="a"
    href="https://www.facebook.com/"
    target="_blank"
    aria-label="Facebook"
    icon={<FaFacebook />}
    mr={2}
  />
  <IconButton
    as="a"
    href="https://maps.google.com/"
    target="_blank"
    aria-label="Geolocalización"
    icon={<FaMapMarkerAlt />}
    mr={2}
  />
  <IconButton
    as="a"
    href="https://wa.me/5492215704647"
    target="_blank"
    aria-label="Whatsapp"
    icon={<FaWhatsapp />}
  />
</Box>
            
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
