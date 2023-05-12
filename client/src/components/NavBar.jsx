import React, { useState, useEffect } from "react";
import DarkMode from "../utils/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CiPizza } from "react-icons/ci";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaHome,
} from "react-icons/fa";
import {
  GiChickenOven,
  GiFishEggs,
  GiFullPizza,
  GiChickenLeg,
  GiFrenchFries,
} from "react-icons/gi";
import { TbSalad, TbIceCream } from "react-icons/tb";
import { BiDrink, BiDish } from "react-icons/bi";
import {
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
  Badge,
} from "@chakra-ui/react";
import { BiMessageDetail } from "react-icons/bi";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiShoppingCart } from "react-icons/gi";
import AuthButton from "./Auth0";
import { getUsers } from "../Redux/actions";

export default function NavBar({
  setShowAbout, 
  setProducts,
  handleMostrarFormulario,
  HandleCancelAbout
}) {
  let currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(currentUser));
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);

  const FoodResponsive = useSelector((state) => state.comidas);

  const carrito = useSelector((state) => state.cart);

  const [carritoCount, setCarritoCount] = useState(0);

  useEffect(() => {
    const contador = carrito.length;
    setCarritoCount(contador);
  }, [carrito]);

  const handleClick = (category) => {
    setActiveCategory(category);

    // Filtra la base de datos por categoría seleccionada
    const filteredProducts = FoodResponsive.filter(
      (product) => product.Categoria === category
    );
    setProducts(filteredProducts);
  };

  // FIN DEL FILTRADO

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box>
        <Flex
          bg="yellow.300"
          color="white"
          py={{ base: 2, md: 4 }}
          px={8}
          display={{ base: "flex", md: "flex" }}
          justifyContent={{ base: "space-between" }}
        >
          <Box display="flex" alignItems="center">
            {/* Responsivo icon hamburguer */}
            <Box>
              <IconButton
                marginLeft={{ base: "-4.5rem" }}
                marginTop={{ base: "0rem" }}
                aria-label="Abrir menú"
                icon={<HamburgerIcon />}
                size="md"
                fontSize="24px"
                variant="ghost"
                color="white"
                onClick={onOpen}
                display={{ md: "none" }} // Sólo muestra el botón en modo responsivo
              />

              <Button
                display={{ md: "none" }}
                variant="ghost"
                marginLeft="-1rem"
                marginTop="0.5rem"
                color="white"
                fontSize="24px"
                onClick={() => window.location.reload()}
              >
                {<FaHome />}
              </Button>

              <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg="red.400" p="9" size="xs" maxW="50vw">
                  <DrawerCloseButton />
                  <DrawerHeader color="white">Menú</DrawerHeader>
                  <DrawerBody marginLeft="-2rem">
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Carnes");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiChickenOven />}
                    >
                      Carnes
                    </Button>

                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pollo");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiChickenLeg />}
                    >
                      Pollo
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pasta");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFullPizza />}
                    >
                      Pastas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pizzas");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<CiPizza />}
                    >
                      Pizzas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pescados");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFishEggs />}
                    >
                      Pescados
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Ensaladas");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<TbSalad />}
                    >
                      Ensaladas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Guarniciones");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFrenchFries />}
                    >
                      Guarniciones
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Platos frios");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<BiDish />}
                    >
                      Platos Frios
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Bebidas");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<BiDrink />}
                    >
                      Bebidas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Postres");
                        onClose();
                      }}
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
          </Box>
          <Box marginLeft="-2rem">
            <DarkMode display={{ base: "none", md: "inline-flex" }} />
            <Button
              variant="ghost"
              color="white"
              title="Envianos tu Mensaje!"
              fontSize="22px"
              display={{ base: "none", md: "inline" }}
              marginLeft={{ base: "none", md: "inline-flex" }}
              onClick={handleMostrarFormulario}
            >
              <BiMessageDetail />
            </Button>

            <Button
              title="Home"
              display={{ base: "none", md: "inline-flex" }}
              variant="ghost"
              fontSize="22px"
              color="white"
              mr={2}
              onClick={() => window.location.reload()}
            >
              <FaHome />
            </Button>
            <Button
              as="a"
              href="#About"
              display={{ base: "none", md: "inline-flex" }}
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
          >
            {/* <SearchBar /> */}
          </Box>

          <Box display="flex" alignItems="center" mr={{ base: -11, md: 10.5 }}>
            <Box display="flex" alignItems="center">
              <Link to="/sCart">
                <IconButton
                  target="_blank"
                  aria-label="ShoppingCart"
                  fontSize={{ base: "28px", md: "28px" }}
                  icon={<GiShoppingCart />}
                  mr={{ base: 0, md: 2 }}
                  title="Carrito de Compras"
                  variant="ghost"
                  color="white"
                />
                {carritoCount > 0 && (
                  <Badge
                    marginLeft="-1rem"
                    marginTop="1rem"
                    bg="red"
                    borderRadius="50%"
                    color="white"
                    fontSize="sm"
                    fontWeight="bold"
                    lineHeight="1"
                    minW="1.25rem"
                    minH="1.25rem"
                    textAlign="center"
                  >
                    {carritoCount}
                  </Badge>
                )}
              </Link>

              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://www.instagram.com/"
                target="_blank"
                aria-label="Instagram"
                fontSize={{ base: "28px", md: "22px" }}
                icon={<FaInstagram />}
                mr={2}
                title="Instagram"
                variant="ghost"
                color="white"
              />
              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://www.facebook.com/"
                target="_blank"
                aria-label="Facebook"
                fontSize={{ base: "28px", md: "22px" }}
                icon={<FaFacebook />}
                title="Facebook"
                mr={2}
                variant="ghost"
                color="white"
              />
              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://maps.google.com/"
                target="_blank"
                fontSize={{ base: "28px", md: "22px" }}
                aria-label="Geolocalización"
                title="Geolocalización"
                icon={<FaMapMarkerAlt />}
                mr={2}
                variant="ghost"
                color="white"
              />
              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://wa.me/5492215704647?text=Hola,%20quisiera%20hacerte%20un%20pedido"
                target="_blank"
                fontSize={{ base: "28px", md: "22px" }}
                aria-label="Whatsapp"
                icon={<FaWhatsapp />}
                title="Whatsapp"
                variant="ghost"
                color="white"
              />
            </Box>
          </Box>
          <Box
            display={{ base: "none", md: "flex" }}
            position="absolute"
            ml="56rem"
            mt="0.5rem"
          >
            <AuthButton />
          </Box>
          <Box
            display={{ base: "flex", md: "none" }}
            position="absolute"
            ml="17rem"
            mt="0.5rem"
          >
            <AuthButton />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
