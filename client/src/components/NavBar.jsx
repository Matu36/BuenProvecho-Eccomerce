import React from "react";
import DarkMode from "../utils/DarkMode";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import {
  GiChickenOven,
  GiFishEggs,
  GiFrenchFries,
  GiFullPizza,
} from "react-icons/gi";
import { TbSalad, TbIceCream } from "react-icons/tb";
import { BiDrink, BiDish } from "react-icons/bi";
import {
  useColorMode,
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
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiShoppingCart } from "react-icons/gi";


export default function NavBar({ setShowAbout }) {

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode } = useColorMode();

  const buttonColorScheme = colorMode === "light" ? "#F08080" : "gray";

  
  return (
    <Box>
      <Box>
        <Flex
          bg="yellow.300"
          color="white"
          py={{ base: 2, md: 4 }}
          px={8}
          display={{ base: "flex", md: "flex" }}
          justifyContent={{ base: "space-between", md: "flex-start" }}
        >
          <Box display="flex" alignItems="center">
            {/* Responsivo icon hamburguer */}
            <Box>
              <IconButton marginLeft= {{base: "-2.5rem"}}
              marginTop= {{base: "0rem"}}
                aria-label="Abrir menú"
                icon={<HamburgerIcon />}
                size="md"
                fontSize= "24px"
                variant="ghost"
                color="white"
                onClick={onOpen}
                display={{ md: "none" }} // Sólo muestra el botón en modo responsivo
              />

              <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg="gray.800" p="9" size="xs">
                  <DrawerCloseButton />
                  <DrawerHeader color="white">Menú</DrawerHeader>
                  <DrawerBody>
                    <Button
                      variant="ghost"
                      color="white"
                      leftIcon={<GiChickenOven />}
                    >
                      Carnes
                    </Button>
                    <Button
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFullPizza />}
                    >
                      Pastas
                    </Button>
                    <Button
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFishEggs />}
                    >
                      Pescados
                    </Button>
                    <Button
                      variant="ghost"
                      color="white"
                      leftIcon={<TbSalad />}
                    >
                      Ensaladas
                    </Button>
                    <Button
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFrenchFries />}
                    >
                      Minutas
                    </Button>
                    <Button variant="ghost" color="white" leftIcon={<BiDish />}>
                      Platos Frios
                    </Button>
                    <Button
                      variant="ghost"
                      color="white"
                      leftIcon={<BiDrink />}
                    >
                      Bebidas
                    </Button>
                    <Button
                      variant="ghost"
                      color="white"
                      leftIcon={<TbIceCream />}
                    >
                      Postres
                    </Button>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
            {/* Fin Responsivo icon hamburguer */}

      
      <DarkMode display= {{base: "none", md: "inline-flex"}}/>
    
  
            <Button display= {{base: "none", md: "inline-flex"}}
              variant="ghost"
              color="white"
              mr={2}
              onClick={() => window.location.reload()}
            >
              Inicio
            </Button>
            <Button display= {{base: "none", md: "inline-flex"}} variant="ghost" color="white" mr={2} onClick= {handleAboutClick}>
              Sobre Nosotros
            </Button>
          </Box>

          <Box
            flex="1"
            ml="auto"
            mr="auto"
            maxWidth={{ base: "100px", md: "400px" }}
          >
            {/* <SearchBar /> */}
          </Box>

          <Box display="flex" alignItems="center"  mr={{ base: -12, md: 4 }}
           >
            <Box display="flex" alignItems="center" >
              <IconButton 
                target="_blank"
                aria-label="ShoppingCart"
                fontSize= {{base:"28px", md: "24px"}}
                icon={<GiShoppingCart />}
                mr={{ base: 0, md: 2 }}
                colorScheme={buttonColorScheme}
              />
              <IconButton display= {{base: "none", md: "inline-flex"}}
                as="a"
                href="https://www.instagram.com/"
                target="_blank"
                aria-label="Instagram"
                icon={<FaInstagram />}
                mr={2}
                colorScheme={buttonColorScheme}
              />
              <IconButton display= {{base: "none", md: "inline-flex"}}
                as="a"
                href="https://www.facebook.com/"
                target="_blank"
                aria-label="Facebook"
                icon={<FaFacebook />}
                mr={2}
                colorScheme={buttonColorScheme}
              />
              <IconButton display= {{base: "none", md: "inline-flex"}}
                as="a"
                href="https://maps.google.com/"
                target="_blank"
                aria-label="Geolocalización"
                icon={<FaMapMarkerAlt />}
                mr={2}
                colorScheme={buttonColorScheme}
              />
              <IconButton display= {{base: "none", md: "inline-flex"}}
                as="a"
                href="https://wa.me/5492215704647?text=Hola,%20quisiera%20hacerte%20un%20pedido"
                target="_blank"
                aria-label="Whatsapp"
                icon={<FaWhatsapp />}
                colorScheme={buttonColorScheme}
              />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
