import React, { useState, useEffect } from "react";
import DarkMode from "../utils/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CiPizza } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import chef from "../img/CHEFICONO.png";
import { FaWhatsapp } from "react-icons/fa";
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
  Image,
  Text,
} from "@chakra-ui/react";
import { BiMessageDetail } from "react-icons/bi";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiShoppingCart } from "react-icons/gi";
import { getUsers } from "../Redux/actions";
import AuthButton from "./Auth0";

export default function NavBar({
  setShowAbout,
  handleMostrarAbout,
  setProducts,
  handleMostrarFormulario,
  handleMostrarCarta,
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
      <Flex
        display={{ base: "flex", md: "none" }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Link
          to="/sCart"
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "2rem",
            marginTop: "2rem",
          }}
        >
          <IconButton
            aria-label="ShoppingCart"
            fontSize={{ base: "28px", md: "28px" }}
            icon={<GiShoppingCart />}
            title="Carrito de Compras"
            variant="ghost"
            color="gray"
          />
          {carritoCount > 0 && (
            <Badge
              position="absolute"
              top="-0.5rem"
              right="-0.5rem"
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
        <Box marginTop={{ base: "2rem", md: "0" }} marginRight="1rem">
          <AuthButton />
        </Box>
      </Flex>
      <Box>
        <Flex
          bg="black"
          color="gray"
          py={{ base: 2, md: 2 }}
          px={{ base: 0, md: 8 }}
          justifyContent={{ base: "center", md: "space-between" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "center" }}
        >
          <Box>
            <Image
              src={chef}
              alt="chef"
              maxW="8rem"
              maxH="8rem"
              borderRadius="50%"
              margin="0 15px"
            />
          </Box>

          {/* Responsivo icon hamburguer */}
          {/* ... Código del menú hamburguesa aquí ... */}

          <Flex
            display={{ base: "flex", md: "flex" }}
            flexWrap="wrap"
            alignItems={{ base: "center", md: "flex-start" }}
            justifyContent="center"
            margin="auto"
          >
            <Box padding="15px">
              <Button
                title="Home"
                display="inline-flex"
                variant="ghost"
                fontSize="22px"
                color="gray"
                onClick={() => window.location.reload()}
              >
                {/* <FaHome /> */}
                Home
              </Button>
            </Box>

            <Box padding="15px">
              <Button
                variant="ghost"
                color="gray"
                title="Envianos tu Mensaje!"
                fontSize="22px"
                onClick={handleMostrarFormulario}
              >
                {/* <BiMessageDetail /> */}
                SendMessage
              </Button>
            </Box>
            <Box padding="15px">
              <Button
                display="inline-flex"
                variant="ghost"
                color="gray"
                onClick={handleMostrarAbout}
              >
                About
              </Button>
              {/* <DarkMode /> */}
            </Box>
            {/* ... Otros botones y enlaces ... */}

            <Box padding="15px">
              <Button
                onClick={handleMostrarCarta}
                display="inline-flex"
                variant="ghost"
                color="gray"
              >
                {" "}
                Menú
              </Button>
            </Box>
            <Box padding="15px">
              <Button
                display="inline-flex"
                variant="ghost"
                color="gray"
                as="a"
                href="https://www.instagram.com/"
                target="_blank"
                aria-label="Instagram"
              >
                INSTA{" "}
              </Button>
            </Box>
            <Box padding="15px">
              {/* IconButton con el texto "WHATS" */}
              <IconButton
                display="inline-flex"
                as="a"
                href="https://wa.me/5492215704647?text=Hola,%20quisiera%20hacerte%20un%20pedido"
                target="_blank"
                fontSize={{ base: "28px", md: "22px" }}
                aria-label="Whatsapp"
                title="Whatsapp"
                variant="ghost"
                color="gray"
                icon={<Text>WHATS</Text>} // Reemplaza el icono con el texto "WHATS"
              />
            </Box>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="center"
            margin="auto"
            display={{ base: "none", md: "flex" }}
          >
            <Box display="flex" alignItems="center">
              <Link
                to="/sCart"
                style={{ position: "relative", display: "inline-block" }}
              >
                <IconButton
                  aria-label="ShoppingCart"
                  fontSize={{ base: "28px", md: "28px" }}
                  icon={<GiShoppingCart />}
                  title="Carrito de Compras"
                  variant="ghost"
                  color="gray"
                />
                {carritoCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-0.5rem"
                    right="-0.5rem"
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

              <Box marginLeft="35px">
                <AuthButton />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
