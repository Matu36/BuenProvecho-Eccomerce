import React, { useState } from "react";
import { Box, Button, Image, Icon, Alert, AlertIcon } from "@chakra-ui/react";
import { GiMoneyStack, GiShoppingCart } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../Redux/actions";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Card({ id, Imagen, Nombre, Efectivo, onClose }) {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const addToCartHandler = () => {
    dispatch({ type: ADD_TO_CART, payload: id });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <Box
      maxW={{ base: "65%", md: "50%" }}
      overflow="hidden"
      boxShadow="md"
      mx="auto"
      mt="3rem"
      border="2px solid #8B4513"
      borderRadius="lg"
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.05)",
        cursor: "pointer",
        // Agrega un fondo con opacidad para el texto
        bg: "rgba(255, 255, 255, 0.8)",
      }}
    >
      {onClose && (
        <Button
          display="flex"
          background="none"
          flexDirection="row-reverse"
          alignContent="flex-end"
          justifyContent="flex-start"
          _hover={{ background: "none", color: "white" }}
          fontSize="30px"
          marginLeft="10.8rem"
          onClick={onClose}
        >
          <AiOutlineCloseCircle />
        </Button>
      )}

      <Image
        src={Imagen}
        maxH="100%"
        maxW="100%"
        width="100%"
        height="200px"
        objectFit="cover"
        borderRadius="lg"
      />
      <Box
        p="4"
        // Agrega un texto con una tipografía adecuada
        fontFamily="Montserrat, sans-serif"
        fontWeight="bold"
        fontSize="xl"
        textAlign="center"
        // Agrega un color de fondo para el texto
        bg="#F6E05E"
        // Agrega una sombra para dar profundidad
        boxShadow="md"
        // Agrega una opacidad para el fondo del texto
        opacity="0.9"
      >
        {Nombre}
      </Box>
      <Box flexDirection="column">
        <Box>
          <Button
            as="a"
            href="https://wa.me/5492215704647"
            target="_blank"
            aria-label="Whatsapp"
            leftIcon={<Icon as={GiMoneyStack} />}
            color="#0077CC"
            textDecor="none"
            padding="5px"
            borderRadius="5px"
            bg="none"
          >
            Efectivo $ {Efectivo}
          </Button>
        </Box>
        <Box>
          <Button
            leftIcon={<Icon as={GiShoppingCart} />}
            color="#0077CC"
            textDecor="none"
            padding="5px"
            borderRadius="5px"
            bg="none"
            onClick={addToCartHandler}
          >
            Añadir al Carrito
          </Button>
          {showAlert && (
            <Alert status="success">
              <AlertIcon />
              El ítem ha sido añadido al carrito.
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
}
