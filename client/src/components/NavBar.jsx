import React from "react";
import DarkMode from "../utils/DarkMode";
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

export default function NavBar() {
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
            <Text fontSize="xl" fontWeight="bold">
              Pymes Solutions!
            </Text>
          </Box>
          <Box flex="1" ml="auto" mr="auto" maxWidth="300px">
            <SearchBar />
          </Box>

          <Box ml="auto">
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

            <Button ml={4}>Contacto</Button>
            <DarkMode />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
