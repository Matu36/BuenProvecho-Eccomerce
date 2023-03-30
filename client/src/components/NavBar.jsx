import React, {useState} from "react";
import DarkMode from "../utils/DarkMode";
import { DB } from "../utils/DB";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaHome
} from "react-icons/fa";
import {
  GiChickenOven,
  GiFishEggs,
  GiFrenchFries,
  GiFullPizza,
  GiChickenLeg
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


export default function NavBar({ setShowAbout, setProducts }) {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const handleClick = (category) => {
    setActiveCategory(category);

  

    // Filtra la base de datos por categoría seleccionada
    const filteredProducts = DB.filter((product) => product.Categoría === category);
    setProducts(filteredProducts);
  };

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
              
              <IconButton marginLeft= {{base: "-4.5rem"}}
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

<Button display= {{md: "none"}}
              variant="ghost"
              marginLeft= "-1rem"
              marginTop= "0.5rem"
              color="white"
              fontSize= "24px"
              onClick={() => window.location.reload()}>
              {<FaHome />}
            </Button>
             

              <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
                <DrawerOverlay />
                <DrawerContent  bg="red.400" p="9" size="xs" maxW="50vw">
                  <DrawerCloseButton />
                  <DrawerHeader color="white">Menú</DrawerHeader>
                  <DrawerBody marginLeft= "-2rem">
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Carnes"); onClose()}}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiChickenOven />}
                    >
                      Carnes
                    </Button>
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Pollo"); onClose()}}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiChickenLeg />}
                    >
                      Pollo
                    </Button>
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Pasta"); onClose()}}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFullPizza />}
                    >
                      Pastas
                    </Button>
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Pescados"); onClose()}}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFishEggs />}
                    >
                      Pescados
                    </Button>
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Ensaladas"); onClose()}}
                      variant="ghost"
                      color="white"
                      leftIcon={<TbSalad />}
                    >
                      Ensaladas
                    </Button>
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Minutas"); onClose()}}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFrenchFries />}
                    >
                      Minutas
                    </Button>
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Platos Frios"); onClose()}}
                    variant="ghost" color="white" leftIcon={<BiDish />}>
                      Platos Frios
                    </Button>
                    <Button as="a"
                     href="#Cartas"
                     onClick={() => {handleClick("Bebidas"); onClose()}}
                      variant="ghost"
                      color="white"
                      leftIcon={<BiDrink />}
                    >
                      Bebidas
                    </Button>
                    <Button
                    as="a"
                    href="#Cartas"
                    onClick={() => {handleClick("Postres"); onClose()}}
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
            <Button as="a"
                     href="#About" display= {{base: "none", md: "inline-flex"}} variant="ghost" color="white" mr={2} onClick= {handleAboutClick}>
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
            <Link to="/sCart">
              <IconButton 
                
                target="_blank"
                aria-label="ShoppingCart"
                fontSize= {{base:"28px", md: "24px"}}
                icon={<GiShoppingCart />}
                mr={{ base: 0, md: 2 }}
                colorScheme={buttonColorScheme}
              />
              </Link>
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
